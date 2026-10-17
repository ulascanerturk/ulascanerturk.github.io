// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { DEFAULT_LOCALE, LOCALES, LOCALE_META, alternatePaths } from './src/lib/i18n.ts';

const site = 'https://ulascanerturk.github.io';

// User site (ulascanerturk/ulascanerturk.github.io) is served from the root,
// so `base` is intentionally not set. See plans/01-mimari.md §5.
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Turkish keeps its unprefixed URLs; English lives under /en/ (faz-6 §2.1 task 1, ADR-006).
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: { prefixDefaultLocale: false },
  },
  // Sitemap (faz-4 §2 task 4, ADR-012): every built page except the 404;
  // drafts are never built in production. Language alternates (faz-6 §2.1 task 5) come
  // from the route map in src/lib/i18n.ts — the integration's own `i18n` option only
  // pairs identical paths (/projeler/ ≠ /en/projects/).
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/404'),
      serialize: (item) => {
        const versions = alternatePaths(new URL(item.url).pathname);
        if (versions.length > 0) {
          item.links = versions.map(({ locale, path }) => ({
            lang: LOCALE_META[locale].lang,
            url: new URL(path, site).href,
          }));
        }
        return item;
      },
    }),
  ],
  // Shiki's inline styles break the CSP below; no project uses code blocks yet
  // (switch to 'prism' if one does — ADR-011).
  markdown: { syntaxHighlight: false },
  // Content Security Policy as a <meta> tag (faz-4 §2 task 12, ADR-011). Astro adds
  // `script-src` / `style-src` with sha256 hashes of every inline script and style;
  // build + preview only (not applied in `astro dev`).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
