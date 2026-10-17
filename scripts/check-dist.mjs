// Built-output checks (faz-4 §2 task 7): accessibility, SEO, sharing, privacy and
// budget rules for every HTML page in dist/; per-language `lang`/`og:locale` and
// reciprocal hreflang alternates since faz-6 §3. No dependencies — a small tokenizer is
// enough for the HTML Astro generates. Pure functions are exported for
// scripts/check-dist.test.ts; the CLI runs when the file is executed directly.
//
//   npm run check:dist            (after npm run build)
//   node scripts/check-dist.mjs --dist dist --site https://ulascanerturk.github.io
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

export const JS_BUDGET = 10 * 1024; // bytes gzip per page (Değişmez Kural 4)
export const DESCRIPTION_MAX = 160; // kontrol-listesi "SEO ve Paylaşım"
// Mirror of FORBIDDEN_JSON_LD_KEYS in src/lib/seo.ts (Değişmez Kural 1).
export const FORBIDDEN_JSON_LD_KEYS = [
  'email',
  'telephone',
  'faxNumber',
  'address',
  'homeLocation',
  'birthDate',
  'birthPlace',
  'gender',
  'nationality',
  'taxID',
  'vatID',
  'spouse',
  'parent',
  'children',
  'sibling',
  'relatedTo',
];
// Mirror of LOCALE_META in src/lib/i18n.ts: `<html lang>` → og:locale. English pages live
// under /en/, everything else is Turkish.
export const OG_LOCALES = { tr: 'tr_TR', en: 'en_US' };

/** Language a page at this URL path must declare. */
export function expectedLang(path) {
  return path === '/en/' || path.startsWith('/en/') ? 'en' : 'tr';
}

const RAW_TEXT = new Set(['script', 'style', 'title']);
const VOID_TAG_END = /\s*\/?>$/;

/** Parses `name="value"`, `name='value'`, `name=value` and bare `name` attributes. */
function parseAttributes(source) {
  const attrs = {};
  const pattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/** Finds the end of a start tag, skipping `>` inside quoted attribute values. */
function tagEnd(html, from) {
  let quote = null;
  for (let i = from; i < html.length; i++) {
    const char = html[i];
    if (quote) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '>') {
      return i;
    }
  }
  return html.length - 1;
}

/** Tokenizes HTML into start tags (with raw text for script/style/title). */
export function tokenize(html) {
  const tags = [];
  let i = 0;
  while (i < html.length) {
    const open = html.indexOf('<', i);
    if (open === -1) break;
    if (html.startsWith('<!--', open)) {
      const close = html.indexOf('-->', open + 4);
      i = close === -1 ? html.length : close + 3;
      continue;
    }
    if (html[open + 1] === '!' || html[open + 1] === '?' || html[open + 1] === '/') {
      i = tagEnd(html, open) + 1;
      continue;
    }
    const nameMatch = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(open, open + 64));
    if (!nameMatch) {
      i = open + 1;
      continue;
    }
    const name = nameMatch[1].toLowerCase();
    const end = tagEnd(html, open);
    const rawAttrs = html.slice(open + nameMatch[0].length, end + 1).replace(VOID_TAG_END, '');
    const tag = { name, attrs: parseAttributes(rawAttrs), text: '' };
    i = end + 1;
    if (RAW_TEXT.has(name)) {
      // Case-insensitive search without lowercasing the whole document: toLowerCase()
      // changes the length of strings with "İ" and would shift every index.
      const close = new RegExp(`</${name}`, 'gi');
      close.lastIndex = i;
      const stop = close.exec(html)?.index ?? html.length;
      tag.text = html.slice(i, stop);
      i = stop;
    }
    tags.push(tag);
  }
  return tags;
}

/** Collects what the checks need from one page. */
export function parsePage(html) {
  const tags = tokenize(html);
  const page = {
    lang: undefined,
    title: '',
    /** @type {Record<string, string>} */
    meta: {},
    /** @type {Record<string, string>} */
    property: {},
    /** @type {Record<string, string>} */
    httpEquiv: {},
    canonical: undefined,
    /** @type {{ hreflang: string, href: string }[]} */
    alternates: [],
    headings: [],
    images: [],
    anchors: [],
    scripts: [],
    jsonLd: [],
  };
  for (const { name, attrs, text } of tags) {
    if (name === 'html') page.lang = attrs.lang;
    else if (name === 'title') page.title = decodeEntities(text).trim();
    else if (name === 'meta') {
      if (attrs.name) page.meta[attrs.name.toLowerCase()] = attrs.content ?? '';
      if (attrs.property) page.property[attrs.property.toLowerCase()] = attrs.content ?? '';
      if (attrs['http-equiv'])
        page.httpEquiv[attrs['http-equiv'].toLowerCase()] = attrs.content ?? '';
    } else if (name === 'link' && (attrs.rel ?? '').split(/\s+/).includes('canonical')) {
      page.canonical = attrs.href;
    } else if (
      name === 'link' &&
      attrs.hreflang &&
      (attrs.rel ?? '').split(/\s+/).includes('alternate')
    ) {
      page.alternates.push({ hreflang: attrs.hreflang, href: attrs.href ?? '' });
    } else if (/^h[1-6]$/.test(name)) page.headings.push(Number(name[1]));
    else if (name === 'img') page.images.push(attrs);
    else if (name === 'a') page.anchors.push(attrs);
    else if (name === 'script') {
      if (attrs.type === 'application/ld+json') page.jsonLd.push(text);
      else if (attrs.type !== 'application/json') page.scripts.push({ src: attrs.src, text });
    }
  }
  return page;
}

/** Lists every forbidden key found anywhere in a JSON value. */
export function findForbiddenKeys(value) {
  if (Array.isArray(value)) return value.flatMap(findForbiddenKeys);
  if (value === null || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => [
    ...(FORBIDDEN_JSON_LD_KEYS.includes(key) ? [key] : []),
    ...findForbiddenKeys(child),
  ]);
}

/**
 * hreflang on an indexable page (faz-6 §3): every page has its language versions, itself
 * included, plus `x-default`; every target is built; `og:locale:alternate` names the others.
 * Reciprocity across pages is checked in `checkSite`.
 */
function checkAlternates(page, ctx, add) {
  if (page.alternates.length === 0) {
    add('no hreflang alternates');
    return;
  }
  if (!page.alternates.some((a) => a.hreflang === page.lang && a.href === page.canonical))
    add('hreflang alternates do not include the page itself');
  if (!page.alternates.some((a) => a.hreflang === 'x-default')) add('no hreflang x-default');
  for (const { hreflang, href } of page.alternates) {
    if (!href.startsWith(`${new URL(ctx.site).origin}/`) || !ctx.exists(new URL(href).pathname))
      add(`hreflang ${hreflang} target missing in dist (${href})`);
  }
  if (
    page.alternates.some((a) => a.hreflang !== 'x-default' && a.hreflang !== page.lang) &&
    !page.property['og:locale:alternate']
  )
    add('missing og:locale:alternate');
}

/**
 * Checks one page. `path` is the public URL path ("/projeler/"); `ctx.exists(urlPath)`
 * tells whether a URL path resolves to a file in dist; `ctx.readAsset(urlPath)`
 * returns a local script's bytes. Returns `{ errors, jsBytes }`.
 */
export function checkPage(path, page, ctx) {
  const errors = [];
  const add = (message) => errors.push(`${path}: ${message}`);
  const indexable = !/\bnoindex\b/.test(page.meta.robots ?? '');

  // Document basics
  if (!page.lang) add('<html> has no lang');
  else if (page.lang !== expectedLang(path))
    add(`<html lang="${page.lang}"> (expected ${expectedLang(path)})`);
  if (!page.title) add('empty <title>');
  const description = page.meta.description?.trim();
  if (!description) add('no meta description');
  else if (description.length > DESCRIPTION_MAX)
    add(`meta description is ${description.length} characters (max ${DESCRIPTION_MAX})`);

  // Headings: exactly one h1, no skipped levels (starting from h1)
  const h1Count = page.headings.filter((level) => level === 1).length;
  if (h1Count !== 1) add(`${h1Count} <h1> (expected 1)`);
  page.headings.reduce((previous, level) => {
    if (level > previous + 1) add(`heading level skips h${previous || 0} → h${level}`);
    return level;
  }, 0);

  // Images
  page.images.forEach((img, index) => {
    const label = img.src ?? `#${index + 1}`;
    if (!('alt' in img)) add(`<img> without alt (${label})`);
    if (!img.width || !img.height) add(`<img> without width/height (${label})`);
  });

  // Links
  for (const a of page.anchors) {
    const href = a.href ?? '';
    if (a.target === '_blank' && !(a.rel ?? '').split(/\s+/).includes('noopener'))
      add(`target="_blank" without rel="noopener" (${href})`);
    const target = href.split('#')[0].split('?')[0];
    if (!target || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(target)) continue;
    const resolved = posix.resolve(posix.dirname(path.endsWith('/') ? `${path}x` : path), target);
    const withSlash = target.endsWith('/') && !resolved.endsWith('/') ? `${resolved}/` : resolved;
    if (!ctx.exists(withSlash)) add(`broken internal link ${href}`);
  }

  // Canonical, Open Graph, Twitter
  const expectedUrl = new URL(path, ctx.site).href;
  if (indexable) {
    if (!page.canonical) add('no canonical link');
    else if (page.canonical !== expectedUrl) add(`canonical ${page.canonical} ≠ ${expectedUrl}`);
    for (const key of [
      'og:type',
      'og:title',
      'og:description',
      'og:url',
      'og:image',
      'og:image:alt',
      'og:locale',
    ]) {
      if (!page.property[key]?.trim()) add(`missing ${key}`);
    }
    if (page.property['og:url'] && page.property['og:url'] !== page.canonical)
      add('og:url differs from canonical');
    const ogLocale = OG_LOCALES[page.lang];
    if (page.property['og:locale'] && page.property['og:locale'] !== ogLocale)
      add(`og:locale is ${page.property['og:locale']} (expected ${ogLocale})`);
    const image = page.property['og:image'];
    if (image) {
      if (!image.startsWith(`${new URL(ctx.site).origin}/`))
        add(`og:image not on the site (${image})`);
      else if (!ctx.exists(new URL(image).pathname)) add(`og:image missing in dist (${image})`);
    }
    if (page.meta['twitter:card'] !== 'summary_large_image')
      add('twitter:card is not summary_large_image');
    checkAlternates(page, ctx, add);
  } else {
    if (page.canonical) add('noindex page has a canonical link');
    if (page.alternates.length > 0) add('noindex page has hreflang alternates');
  }

  // JSON-LD: valid JSON, schema.org, public fields only
  for (const block of page.jsonLd) {
    let data;
    try {
      data = JSON.parse(block);
    } catch (error) {
      add(`invalid JSON-LD (${error.message})`);
      continue;
    }
    if (data['@context'] !== 'https://schema.org')
      add('JSON-LD @context is not https://schema.org');
    const forbidden = findForbiddenKeys(data);
    if (forbidden.length > 0) add(`JSON-LD contains personal fields: ${forbidden.join(', ')}`);
  }

  // Content Security Policy (ADR-011)
  const csp = page.httpEquiv['content-security-policy'];
  if (!csp) add('no Content-Security-Policy meta');
  else if (!/default-src 'self'/.test(csp)) add("CSP has no default-src 'self'");

  // Client JS budget
  const js = Buffer.concat(
    page.scripts.map(({ src, text }) =>
      src ? (ctx.readAsset(src) ?? Buffer.alloc(0)) : Buffer.from(text),
    ),
  );
  const jsBytes = js.length > 0 ? gzipSync(js).length : 0;
  if (jsBytes > JS_BUDGET) add(`client JS ${jsBytes} B gzip > ${JS_BUDGET} B budget`);

  return { errors, jsBytes, indexable };
}

/**
 * Cross-page checks: unique titles and descriptions, reciprocal hreflang, sitemap coverage
 * and robots.txt.
 * `pages` = `{ path, page, indexable }[]`; `sitemapUrls` = absolute URLs from the sitemap.
 */
export function checkSite({ pages, sitemapUrls, robots, site }) {
  const errors = [];
  const duplicates = (values) =>
    [...values.entries()]
      .filter(([, paths]) => paths.length > 1)
      .map(([value, paths]) => ({ value, paths }));
  const group = (list, key) => {
    const map = new Map();
    for (const item of list) {
      const value = key(item);
      if (value) map.set(value, [...(map.get(value) ?? []), item.path]);
    }
    return map;
  };

  for (const { value, paths } of duplicates(group(pages, (p) => p.page.title)))
    errors.push(`duplicate <title> "${value}" on ${paths.join(', ')}`);
  for (const { value, paths } of duplicates(
    group(
      pages.filter((p) => p.indexable),
      (p) => p.page.meta.description,
    ),
  ))
    errors.push(`duplicate meta description "${value}" on ${paths.join(', ')}`);

  // hreflang pairs are reciprocal: A → B (lang L) needs B with lang L and B → A.
  const byUrl = new Map(pages.map((item) => [new URL(item.path, site).href, item]));
  for (const { path, page, indexable } of pages) {
    if (!indexable) continue;
    const self = new URL(path, site).href;
    for (const { hreflang, href } of page.alternates) {
      if (hreflang === 'x-default' || href === self) continue;
      const target = byUrl.get(href);
      if (!target?.indexable) {
        errors.push(`${path}: hreflang ${hreflang} → ${href} is not an indexable page`);
        continue;
      }
      if (target.page.lang !== hreflang)
        errors.push(`${path}: hreflang ${hreflang} → ${href}, whose lang is ${target.page.lang}`);
      if (!target.page.alternates.some((a) => a.href === self && a.hreflang === page.lang))
        errors.push(`${path}: hreflang ${hreflang} → ${href} is not reciprocal`);
    }
  }

  if (sitemapUrls === undefined) errors.push('sitemap-index.xml missing');
  else {
    const listed = new Set(sitemapUrls);
    for (const { path, indexable } of pages) {
      const url = new URL(path, site).href;
      if (indexable && !listed.has(url)) errors.push(`${path}: not in the sitemap`);
      if (!indexable && listed.has(url)) errors.push(`${path}: noindex page is in the sitemap`);
    }
    const built = new Set(pages.map(({ path }) => new URL(path, site).href));
    for (const url of sitemapUrls)
      if (!built.has(url)) errors.push(`sitemap lists ${url}, which was not built`);
  }

  const sitemapLine = `Sitemap: ${new URL('/sitemap-index.xml', site).href}`;
  if (robots === undefined) errors.push('robots.txt missing');
  else if (!robots.split(/\r?\n/).some((line) => line.trim() === sitemapLine))
    errors.push(`robots.txt has no "${sitemapLine}" line`);

  return errors;
}

/** URL path of a built HTML file: index.html → "/", projeler/index.html → "/projeler/". */
export function urlPath(file) {
  const path = `/${file.split(sep).join('/')}`;
  return path.endsWith('/index.html') ? path.slice(0, -'index.html'.length) : path;
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function main(argv) {
  const option = (flag, fallback) => {
    const index = argv.indexOf(flag);
    return index === -1 ? fallback : argv[index + 1];
  };
  const dist = option('--dist', 'dist');
  const site = option('--site', 'https://ulascanerturk.github.io');

  if (!existsSync(dist)) {
    console.error(`${dist}/ missing — run npm run build first`);
    return 1;
  }

  const inDist = (urlPathname) => join(dist, decodeURIComponent(urlPathname).replace(/^\/+/, ''));
  const ctx = {
    site,
    exists: (urlPathname) => {
      const file = inDist(urlPathname);
      return (existsSync(file) && statSync(file).isFile()) || existsSync(join(file, 'index.html'));
    },
    readAsset: (src) => {
      if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(src)) return undefined;
      const file = inDist(src);
      return existsSync(file) ? readFileSync(file) : undefined;
    },
  };

  const files = walk(dist).filter((file) => file.endsWith('.html'));
  const errors = [];
  const pages = [];
  let maxJs = 0;
  for (const file of files.sort()) {
    const path = urlPath(relative(dist, file));
    const page = parsePage(readFileSync(file, 'utf8'));
    const result = checkPage(path, page, ctx);
    errors.push(...result.errors);
    maxJs = Math.max(maxJs, result.jsBytes);
    pages.push({ path, page, indexable: result.indexable });
  }

  const read = (name) =>
    existsSync(join(dist, name)) ? readFileSync(join(dist, name), 'utf8') : undefined;
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const index = read('sitemap-index.xml');
  const sitemapUrls =
    index === undefined
      ? undefined
      : locs(index).flatMap((url) => {
          const xml = read(new URL(url).pathname.replace(/^\//, ''));
          return xml === undefined ? [] : locs(xml);
        });
  errors.push(...checkSite({ pages, sitemapUrls, robots: read('robots.txt'), site }));

  for (const error of errors) console.log(`ERROR ${error}`);
  console.log(
    `${pages.length} pages, ${errors.length} errors · max client JS ${maxJs} B gzip (budget ${JS_BUDGET} B)`,
  );
  return errors.length > 0 ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  process.exitCode = main(process.argv.slice(2));
}
