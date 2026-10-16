// @ts-check
import { defineConfig } from 'astro/config';

// User site (ulascanerturk/ulascanerturk.github.io) is served from the root,
// so `base` is intentionally not set. See plans/01-mimari.md §5.
export default defineConfig({
  site: 'https://ulascanerturk.github.io',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
