import { describe, expect, it } from 'vitest';

import { FORBIDDEN_JSON_LD_KEYS as LIB_FORBIDDEN_KEYS } from '../src/lib/seo';
import {
  FORBIDDEN_JSON_LD_KEYS,
  checkPage,
  checkSite,
  expectedLang,
  parsePage,
  tokenize,
  urlPath,
} from './check-dist.mjs';

const site = 'https://example.github.io';

const ctx = {
  site,
  exists: (path: string) => ['/', '/projeler/', '/en/projects/', '/og/default.png'].includes(path),
  readAsset: () => undefined,
};

function html({ head = '', body = '<h1>Başlık</h1>' } = {}) {
  return `<!doctype html><html lang="tr"><head>
    <title>Sayfa · Ada</title>
    <meta name="description" content="Kısa açıklama.">
    <link rel="canonical" href="${site}/projeler/">
    <link rel="alternate" hreflang="tr" href="${site}/projeler/">
    <link rel="alternate" hreflang="en" href="${site}/en/projects/">
    <link rel="alternate" hreflang="x-default" href="${site}/projeler/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Sayfa · Ada">
    <meta property="og:description" content="Kısa açıklama.">
    <meta property="og:url" content="${site}/projeler/">
    <meta property="og:image" content="${site}/og/default.png">
    <meta property="og:image:alt" content="Ada">
    <meta property="og:locale" content="tr_TR">
    <meta property="og:locale:alternate" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta http-equiv="content-security-policy" content="default-src 'self'; script-src 'self'">
    ${head}</head><body>${body}</body></html>`;
}

const errorsOf = (source: string, path = '/projeler/') =>
  checkPage(path, parsePage(source), ctx).errors;

describe('tokenize / parsePage', () => {
  it('keeps ">" inside quoted attribute values', () => {
    const [tag] = tokenize('<a href="/x" title="a > b">x</a>');
    expect(tag).toMatchObject({ name: 'a', attrs: { href: '/x', title: 'a > b' } });
  });

  it('reads raw script text and skips comments', () => {
    const page = parsePage('<!-- <h1>no</h1> --><script>if (a < b) {}</script><h2>x</h2>');
    expect(page.scripts).toEqual([{ src: undefined, text: 'if (a < b) {}' }]);
    expect(page.headings).toEqual([2]);
  });

  it('finds the end of raw text after "İ" (toLowerCase changes string length)', () => {
    const page = parsePage(
      '<p>İİİ</p><script type="application/ld+json">{"a":1}</script><h1>x</h1>',
    );
    expect(page.jsonLd).toEqual(['{"a":1}']);
    expect(page.headings).toEqual([1]);
  });

  it('decodes entities in attribute values', () => {
    const page = parsePage('<meta name="description" content="A &amp; B &#39;C&#39;">');
    expect(page.meta.description).toBe("A & B 'C'");
  });
});

describe('checkPage', () => {
  it('passes a complete page', () => {
    expect(errorsOf(html())).toEqual([]);
  });

  it('requires exactly one h1 and no skipped heading levels', () => {
    expect(errorsOf(html({ body: '<h2>x</h2>' }))).toEqual(
      expect.arrayContaining([
        '/projeler/: 0 <h1> (expected 1)',
        '/projeler/: heading level skips h0 → h2',
      ]),
    );
    expect(errorsOf(html({ body: '<h1>a</h1><h3>b</h3>' }))).toContain(
      '/projeler/: heading level skips h1 → h3',
    );
  });

  it('flags images without alt or dimensions', () => {
    const errors = errorsOf(html({ body: '<h1>x</h1><img src="/a.png">' }));
    expect(errors).toContain('/projeler/: <img> without alt (/a.png)');
    expect(errors).toContain('/projeler/: <img> without width/height (/a.png)');
  });

  it('flags broken internal links and target=_blank without noopener', () => {
    const errors = errorsOf(
      html({
        body: '<h1>x</h1><a href="/yok/">a</a><a href="../">b</a><a href="https://x.dev" target="_blank">c</a>',
      }),
    );
    expect(errors).toContain('/projeler/: broken internal link /yok/');
    expect(errors).not.toContain('/projeler/: broken internal link ../');
    expect(errors).toContain('/projeler/: target="_blank" without rel="noopener" (https://x.dev)');
  });

  it('checks description length and canonical URL', () => {
    const long = html().replace('Kısa açıklama.', 'a'.repeat(161));
    expect(errorsOf(long)).toContain('/projeler/: meta description is 161 characters (max 160)');
    expect(errorsOf(html(), '/')).toContain(`/: canonical ${site}/projeler/ ≠ ${site}/`);
  });

  it('flags personal fields and invalid JSON in JSON-LD', () => {
    const personal = html({
      head: '<script type="application/ld+json">{"@context":"https://schema.org","author":{"email":"x"}}</script>',
    });
    expect(errorsOf(personal)).toContain('/projeler/: JSON-LD contains personal fields: email');
    const broken = html({ head: '<script type="application/ld+json">{</script>' });
    expect(errorsOf(broken).some((error) => error.includes('invalid JSON-LD'))).toBe(true);
  });

  it('requires a CSP meta tag', () => {
    const source = html().replace(/<meta http-equiv[^>]+>/, '');
    expect(errorsOf(source)).toContain('/projeler/: no Content-Security-Policy meta');
  });

  it('skips sharing checks on noindex pages but rejects a canonical and hreflang there', () => {
    const source = html({ head: '<meta name="robots" content="noindex">' });
    expect(errorsOf(source)).toEqual([
      '/projeler/: noindex page has a canonical link',
      '/projeler/: noindex page has hreflang alternates',
    ]);
  });

  it('expects lang and og:locale to match the URL language', () => {
    expect(expectedLang('/')).toBe('tr');
    expect(expectedLang('/en/')).toBe('en');
    expect(expectedLang('/en/projects/x/')).toBe('en');
    const errors = errorsOf(html().replace('<html lang="tr">', '<html lang="en">'));
    expect(errors).toContain('/projeler/: <html lang="en"> (expected tr)');
    expect(errors).toContain('/projeler/: og:locale is tr_TR (expected en_US)');
  });

  it('requires complete hreflang alternates on indexable pages', () => {
    const none = html().replace(/<link rel="alternate"[^>]+>/g, '');
    expect(errorsOf(none)).toContain('/projeler/: no hreflang alternates');

    const partial = html()
      .replace(/<link rel="alternate" hreflang="(tr|x-default)"[^>]+>/g, '')
      .replace(/<meta property="og:locale:alternate"[^>]+>/, '')
      .replace(`${site}/en/projects/`, `${site}/en/yok/`);
    expect(errorsOf(partial)).toEqual([
      '/projeler/: hreflang alternates do not include the page itself',
      '/projeler/: no hreflang x-default',
      `/projeler/: hreflang en target missing in dist (${site}/en/yok/)`,
      '/projeler/: missing og:locale:alternate',
    ]);
  });

  it('enforces the JS budget', () => {
    const random = Array.from({ length: 20_000 }, (_, i) => ((i * 7919) % 65_521).toString(36));
    const source = html({ body: `<h1>x</h1><script>${random.join('')}</script>` });
    const result = checkPage('/projeler/', parsePage(source), ctx);
    expect(result.jsBytes).toBeGreaterThan(10 * 1024);
    expect(result.errors.some((error) => error.includes('budget'))).toBe(true);
  });
});

describe('checkSite', () => {
  const page = (path: string, title: string, indexable = true) => ({
    path,
    indexable,
    page: { ...parsePage(html()), title },
  });

  it('flags duplicate titles/descriptions, sitemap gaps and a missing robots line', () => {
    const errors = checkSite({
      pages: [page('/', 'Ada'), page('/projeler/', 'Ada'), page('/404.html', '404', false)],
      sitemapUrls: [`${site}/`, `${site}/404.html`, `${site}/eski/`],
      robots: 'User-agent: *\nAllow: /\n',
      site,
    });
    expect(errors).toEqual(
      expect.arrayContaining([
        'duplicate <title> "Ada" on /, /projeler/',
        'duplicate meta description "Kısa açıklama." on /, /projeler/',
        '/projeler/: not in the sitemap',
        '/404.html: noindex page is in the sitemap',
        `sitemap lists ${site}/eski/, which was not built`,
        `robots.txt has no "Sitemap: ${site}/sitemap-index.xml" line`,
      ]),
    );
  });

  it('requires reciprocal hreflang pairs with the right lang', () => {
    const tr = { path: '/projeler/', indexable: true, page: parsePage(html()) };
    const en = (source: string) => ({
      path: '/en/projects/',
      indexable: true,
      page: { ...parsePage(source), title: 'Projects · Ada' },
    });
    const reciprocal = html()
      .replace('<html lang="tr">', '<html lang="en">')
      .replace(
        `<link rel="canonical" href="${site}/projeler/">`,
        `<link rel="canonical" href="${site}/en/projects/">`,
      );
    const pairErrors = (other: ReturnType<typeof en>) =>
      checkSite({ pages: [tr, other], sitemapUrls: [], robots: undefined, site }).filter((error) =>
        error.includes('hreflang'),
      );

    expect(pairErrors(en(reciprocal))).toEqual([]);
    expect(
      pairErrors(en(reciprocal.replace(/<link rel="alternate" hreflang="tr"[^>]+>/, ''))),
    ).toEqual([`/projeler/: hreflang en → ${site}/en/projects/ is not reciprocal`]);
    expect(pairErrors(en(html()))).toEqual(
      expect.arrayContaining([`/projeler/: hreflang en → ${site}/en/projects/, whose lang is tr`]),
    );
    expect(pairErrors({ ...en(reciprocal), indexable: false })).toEqual([
      `/projeler/: hreflang en → ${site}/en/projects/ is not an indexable page`,
    ]);
  });

  it('reports a missing sitemap and robots.txt', () => {
    const errors = checkSite({ pages: [], sitemapUrls: undefined, robots: undefined, site });
    expect(errors).toEqual(['sitemap-index.xml missing', 'robots.txt missing']);
  });
});

describe('urlPath', () => {
  it('maps built files to public paths', () => {
    expect(urlPath('index.html')).toBe('/');
    expect(urlPath('projeler/lockbox-mobile/index.html')).toBe('/projeler/lockbox-mobile/');
    expect(urlPath('404.html')).toBe('/404.html');
  });
});

describe('FORBIDDEN_JSON_LD_KEYS', () => {
  it('matches the list in src/lib/seo.ts', () => {
    expect(FORBIDDEN_JSON_LD_KEYS).toEqual(LIB_FORBIDDEN_KEYS);
  });
});
