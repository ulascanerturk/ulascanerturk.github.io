// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// User site (ulascanerturk/ulascanerturk.github.io) is served from the root,
// so `base` is intentionally not set. See plans/01-mimari.md §5.
export default defineConfig({
  site: 'https://ulascanerturk.github.io',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Sitemap (faz-4 §2 task 4, ADR-012): every built page except the 404;
  // drafts are never built in production.
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/404') })],
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
