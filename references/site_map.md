# references/site_map.md — Site Map

> Last updated: 2026-10-17 (Faz 2 — feat/faz-2-profile-page)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

Faz 2 state: design tokens, global styles, theme (inline script + `src/lib/theme.ts`),
`BaseLayout`, layout and UI components, `/404.html` and the monogram favicon exist (Faz 1);
`/` is the profile page built from `src/data/profile.ts` with the profile components (Faz 2).
Projects and SEO are planned.

## Site Overview (`astro.config.mjs` ✅)

| Setting | Value |
|---|---|
| Generator | Astro 7.4, static output (ADR-001 — accepted 2026-10-17) |
| Site URL | `https://ulascanerturk.github.io` (no custom domain — S5) |
| `base` | not set (user site served at root) |
| `trailingSlash` | `'always'` |
| `build.format` | `'directory'` |
| Integrations | none yet — `@astrojs/sitemap` [PLANNED — Faz 4]; `i18n` [PLANNED — Faz 6] |
| Language | `tr-TR`; `/en/` after v1 (S4) |

## Routes

| URL | File | Layout | Data source | Status |
|---|---|---|---|---|
| `/` | `src/pages/index.astro` | BaseLayout (`description` = `profilePage.description`, title = site name) | `profile`, `profilePage` (`src/data/profile.ts`); `formatDate` | ✅ profile page — ProfileHero (only h1) → Section × 7 → footnote ("Son güncelleme" `<time>`); hero actions resolved from `profile.links` by `kind` |
| `/projeler/` | `src/pages/projeler/index.astro` | BaseLayout | `getCollection('projects')` | [PLANNED — faz-3 §2 task 6] |
| `/projeler/{slug}/` | `src/pages/projeler/[slug].astro` | ProjectLayout | `getStaticPaths` + `render()`; v1 slug: `lockbox-mobile` | [PLANNED — faz-3 §2 task 6] |
| `/404.html` | `src/pages/404.astro` | BaseLayout (`noindex`, no canonical) | `site.notFound` | ✅ h1, message, "Ana sayfaya dön"; projects link added in Faz 3 task 6 |
| `/sitemap-index.xml` | `@astrojs/sitemap` | — | all pages except 404/drafts | [PLANNED — faz-4 §2 task 4] |
| `/en/`, `/en/projects/`, `/en/projects/{slug}/` | i18n routes | — | `profile.en.ts`, English entries | [PLANNED — faz-6 §2.1] |

Home page anchors ✅ (order on the page; ids from `profilePage.*.id`): `#hakkimda`,
`#yetkinlikler`, `#deneyim`, `#egitim`, `#girisimcilik`, `#odak-alanlari`, `#baglantilar`.
`#odak-alanlari` is an addition to plans/02-icerik-ve-tasarim.md §2 (lead approval 2026-10-17).
`#projeler` [PLANNED — faz-3 task 8] goes between `#deneyim` and `#egitim`, with the
"Projeleri gör" hero action (deferred from Faz 2 task 5).
Header nav (✅ `site.nav`): Hakkımda (`/#hakkimda`) · GitHub · LinkedIn · theme toggle.
Projeler (`/projeler/`) is added in Faz 3 task 6 — the route does not exist yet and would
be a broken internal link (lead decision 2026-10-17).

## Layouts

### BaseLayout.astro ✅ (`src/layouts/BaseLayout.astro`)
- Props: `title?` (page name; omitted on `/` → title is just the site name),
  `description?` (default `site.description`), `noindex?` (adds `robots: noindex`, drops canonical).
- Head: charset, viewport, `<title>` `"{title} · Ulaşcan Ertürk"`, description, canonical
  (`Astro.url.pathname` on `Astro.site`), favicon (`/favicon.svg`), `color-scheme: light dark`,
  inline theme script (`themeScript` from `src/lib/theme.ts`, before the stylesheet → no FOUC).
  `Seo` component replaces the meta block in Faz 4.
- Body: SkipLink → SiteHeader → `<main id="icerik" tabindex="-1">` (slot) → SiteFooter.
- Imports `src/styles/global.css`; main width `min(100% - 2rem, var(--container))`, `p` max `--measure`.

### ProjectLayout.astro [PLANNED — faz-3 §2 task 5]
- Extends BaseLayout: title, ProjectMeta, cover (optional), `<article>` content,
  `disclaimer` Callout, "Tüm projeler" back link, previous/next navigation.

## Components

| Component | File | Props | Used by | Status |
|---|---|---|---|---|
| SkipLink | `src/components/layout/SkipLink.astro` | `label`, `target` (main id) | BaseLayout | ✅ hidden until focused; first focusable element |
| SiteHeader | `src/components/layout/SiteHeader.astro` | `siteName`, `navLabel`, `items: NavItem[]`, `currentPath`, `themeToggleLabel` | BaseLayout | ✅ brand link (decorative Monogram + name), nav, ThemeToggle; `aria-current="page"` only for exact non-anchor matches; wraps at 360 px |
| SiteFooter | `src/components/layout/SiteFooter.astro` | `label`, `copyrightHolder`, `links: FooterLink[]` | BaseLayout | ✅ © build year, GitHub, LinkedIn, Kaynak kodu |
| ThemeToggle | `src/components/layout/ThemeToggle.astro` | `label` | SiteHeader | ✅ `<button data-theme-toggle aria-pressed>`, moon/sun icon by `data-theme`; hidden when `:root` has no `data-theme` (JS off) |
| Section | `src/components/ui/Section.astro` | `id`, `title`, `level?: 2 \| 3` (default 2) | `/` (7 sections) | ✅ `<section id aria-labelledby>`; heading id `{id}-baslik` |
| Tag | `src/components/ui/Tag.astro` | `label` | SkillsGrid (Faz 3: project tech) | ✅ `nowrap`; longest skill tag fits at 360 px (checked Faz 2) |
| ExternalLink | `src/components/ui/ExternalLink.astro` | `href`, `newTab?`, `newTabHint?`, other `<a>` attrs (no `rel`/`target`) | SiteHeader, SiteFooter, ProfileHero, ExperienceList, LinkList | ✅ always `rel="noopener noreferrer"`; new tab only when `newTab` (hint read by screen readers) |
| Callout | `src/components/ui/Callout.astro` | `variant?: 'note' \| 'warning'`, `title?` | `/` (experience note), ExperienceList, WorkAreas, EducationList, EcosystemNote | ✅ `role="note"`, accent / warning border |
| Monogram | `src/components/ui/Monogram.astro` | `label?` (→ `role="img"` + `aria-label`; absent → `aria-hidden`), `size?` (64) | SiteHeader, ProfileHero (both decorative — the name is next to it) | ✅ same drawing as `public/favicon.svg` |
| ProfileHero | `src/components/profile/ProfileHero.astro` | `name`, `headline`, `location`, `tagline`, `actions: { label, href }[]` | `/` | ✅ `<header>` in main: decorative Monogram (88), the page's only `<h1>`, headline, location, tagline, action links (ExternalLink, 44 px, outlined) |
| SkillsGrid | `src/components/profile/SkillsGrid.astro` | `groups: { category, items[], note? }[]` | `/` | ✅ auto-fill grid; `<h3>` per category, `<ul>` of Tag, muted note (Java) |
| ExperienceList | `src/components/profile/ExperienceList.astro` | `items: { organization, role?, url?, highlights[], note?, products?[] }[]`, `problemsLabel` | `/` | ✅ `<article>` per organization, `<h3>` (linked when `url`), highlights list, products as surface boxes with `<h4>` + description + problems list (Shifter Pro/Lite, S1), optional per-entry Callout |
| WorkAreas | `src/components/profile/WorkAreas.astro` | `title`, `items[]`, `note` | `/` (inside `#deneyim`) | ✅ `<h3>`, list, §6 note as Callout |
| EducationList | `src/components/profile/EducationList.astro` | `items: { institution, program, kind }[]`, `groups`, `kindLabels` (`Record<'degree' \| 'training', string>`), `note` | `/` | ✅ one `<h3>` group per kind (degree first), kind badge (degree = accent border/text, training = muted), §3 note as Callout |
| EcosystemNote | `src/components/profile/EcosystemNote.astro` | `context`, `programs[]`, `note` | `/` | ✅ `<h3>` context ("Shifter girişimi bağlamında…"), list, §7 note as Callout |
| FocusAreas | `src/components/profile/FocusAreas.astro` | `items: { title, description }[]` | `/` | ✅ `<dl>` grid of surface cards (`dt` bold, `dd` muted) |
| LinkList | `src/components/profile/LinkList.astro` | `links: { label, url }[]` | `/` | ✅ auto-fill grid of ExternalLink (44 px) |
| ProjectCard | `src/components/projects/ProjectCard.astro` | project data (linked title, summary, status, tech) | `/projeler/`, `/` featured | [PLANNED — faz-3 task 4] |
| ProjectMeta | `src/components/projects/ProjectMeta.astro` | role, period, status (`<dl>`) | ProjectLayout | [PLANNED — faz-3 task 4] |
| ProjectLinks | `src/components/projects/ProjectLinks.astro` | links | ProjectLayout | [PLANNED — faz-3 task 4] |
| Seo | `src/components/Seo.astro` [REVIEW NEEDED — folder not fixed in plans] | title, description, canonical, OG, Twitter, JSON-LD | BaseLayout | [PLANNED — faz-4 task 1] |

## Styles and Theme ✅ (faz-1 §2 tasks 1–3, plans/02-icerik-ve-tasarim.md §5)

- `src/styles/tokens.css`: `--color-*` (bg, surface, text, text-muted, border, accent,
  accent-contrast, focus, warning), `--font-sans` / `--font-mono` (ADR-009),
  `--line-height-body/heading`, `--step--1 … --step-5` (fluid `clamp()`, ≈ 1.25, 360 → 1280 px),
  `--space-3xs … --space-2xl`, `--radius-s/m/full`, `--shadow-s/m`, `--measure` (68ch),
  `--container` (48rem), `--tap-target` (44px), `--focus-ring-width` (3px).
- Light theme on `:root`; dark on `:root[data-theme='dark']`; with no `data-theme`
  (JavaScript off) `@media (prefers-color-scheme: dark)` applies. The dark palette is
  written twice (attribute + media block) — keep both in sync.
- `src/styles/global.css` (imports tokens): reset, body flex column (footer at bottom),
  heading scale, link styles, `:focus-visible` outline (`--color-focus`), `.visually-hidden`,
  smooth scroll only with `prefers-reduced-motion: no-preference`, reduced-motion overrides.
- Choice persisted in `localStorage['theme']` (`'light' | 'dark'`); no stored value → system.

### Contrast Table (WCAG 2.x relative luminance, computed 2026-10-17)

| Pair | Light | Dark | Threshold | Result |
|---|---|---|---|---|
| text / bg | 17.49 | 18.11 | 4.5 | ✅ |
| text / surface | 16.03 | 16.03 | 4.5 | ✅ |
| text-muted / bg | 7.63 | 7.83 | 4.5 | ✅ |
| text-muted / surface | 6.99 | 6.93 | 4.5 | ✅ |
| accent (links) / bg | 6.70 | 10.96 | 4.5 | ✅ |
| accent / surface | 6.14 | 9.70 | 4.5 | ✅ |
| accent-contrast / accent (skip link, monogram, selection) | 6.70 | 10.96 | 4.5 | ✅ |
| focus ring / bg | 6.70 | 10.96 | 3 (UI) | ✅ |
| focus ring / surface | 6.14 | 9.70 | 3 (UI) | ✅ |
| warning (Callout border) / bg | 5.02 | 11.83 | 3 (UI) | ✅ |
| warning / surface | 4.60 | 10.48 | 3 (UI) | ✅ |
| border / bg | 1.49 | 1.92 | — | decorative only; no control is identified by its border alone |

Palette — light: bg `#ffffff`, surface `#f5f5f4`, text `#1c1917`, text-muted `#57534e`,
border `#d6d3d1`, accent/focus `#1d4ed8`, accent-contrast `#ffffff`, warning `#b45309`.
Dark: bg `#0c0a09`, surface `#1c1917`, text `#f5f5f4`, text-muted `#a8a29e`, border `#44403c`,
accent/focus `#93c5fd`, accent-contrast `#0c0a09`, warning `#fbbf24`.
Any token change → recompute this table.

## Client JavaScript

| Script | Pages | Purpose | Size |
|---|---|---|---|
| Theme script (`themeScript`, `src/lib/theme.ts`; inline in `<head>` via `set:html`) | all | apply stored/system theme before paint; toggle via delegated click on `[data-theme-toggle]`; sync `aria-pressed`; persist choice; follow system changes while nothing is stored | 996 B raw / 480 B gzip (test asserts ≤ 1024 B raw) |

Budget: ≤ 10 KB gzip per page (Değişmez Kural 4); Faz 1 target ≤ 1 KB (theme script only).
The script is a static string (no interpolation) so a CSP hash stays valid (Faz 4, ADR-011).

## src/lib

| Export | Signature | Tests | Status |
|---|---|---|---|
| `slugify` (`src/lib/slug.ts`) | `(input: string): string` — explicit Turkish map (ı İ ğ ş ç ö ü), NFKD accent strip, lowercase, non-alphanumerics → single `-`, trimmed | `src/lib/slug.test.ts` (5 tests) | ✅ |
| `resolveTheme`, `isTheme`, `THEME_STORAGE_KEY`, `DEFAULT_THEME`, `THEMES`, `themeScript` (`src/lib/theme.ts`) | `resolveTheme(stored: string \| null \| undefined, systemPrefersDark: boolean): Theme` — stored > system > `'light'`; `themeScript`: inline script string mirroring it | `src/lib/theme.test.ts` (14 tests: precedence, script parity on a fake DOM, toggle/persist/aria-pressed, system change, blocked storage, ≤ 1 KB) | ✅ |
| `sortProjects`, `isPublished`, `formatPeriod` | project helpers | `src/lib/projects.test.ts` | [PLANNED — faz-3 task 3] |
| `formatDate` (`src/lib/date.ts`) | `(iso: string, locale = 'tr-TR'): string` — `YYYY-MM-DD` → "17 Ekim 2026" (Intl, UTC); throws `RangeError` on invalid input | `src/lib/date.test.ts` (4 tests) | ✅ |
| profile structural tests (data in `src/data/profile.ts`) | — | `src/lib/profile.test.ts` (11 tests: no empty text/lists, https links, no e-mail/phone/mailto/tel, GitHub + LinkedIn, one degree = Uluslararası İlişkiler, Shifter context, `since` in hero/summary, unique ASCII anchors incl. `hakkimda`, description ≤ 160, ISO `lastUpdated`) | ✅ |

## Public Assets

| File | Purpose | Phase |
|---|---|---|
| `public/favicon.svg` ✅ | "UE" monogram (same paths as `Monogram.astro`); colors switch with `prefers-color-scheme` inside the SVG | Faz 1 |
| `public/apple-touch-icon.png` | 180×180 icon | Faz 4 |
| `public/og/default.png` | 1200×630 share image | Faz 4 |
| `public/robots.txt` | allow all + sitemap (AI crawler policy [REVIEW NEEDED]) | Faz 4 |

## Config

| File | Key settings |
|---|---|
| `astro.config.mjs` ✅ | `site`, `trailingSlash: 'always'`, `build.format: 'directory'`; no `base` |
| `tsconfig.json` ✅ | extends `astro/tsconfigs/strict`; `noUncheckedIndexedAccess`; `paths` `@/*` → `./src/*`; include `.astro/types.d.ts`, `**/*`; exclude `dist` |
| `eslint.config.js` ✅ | `defineConfig` (eslint/config): `@eslint/js` recommended, `typescript-eslint` recommended, astro `flat/recommended` + `flat/jsx-a11y-recommended` (jsx-a11y-x); browser globals; node globals for `scripts/**` and `*.config.*`; `no-console: error` except `scripts/**`; ignores dist, .astro, node_modules, coverage, .lighthouseci |
| `.prettierrc.json` ✅ | `singleQuote`, `printWidth: 100`, `prettier-plugin-astro` |
| `.prettierignore` ✅ | generated output, lockfile, `plans/`, `references/`, `.claude/`, `.agents/`, root `*.md` |
| `vitest.config.ts` ✅ | `getViteConfig` from `astro/config`; include `src/**/*.test.ts` |
| `.nvmrc` ✅ / `package.json#engines` ✅ | `24` / `node >=22.22.0` |
| `package.json` scripts ✅ | dev, build, preview, check, lint, format, format:check, test |
| `.editorconfig` ✅ | utf-8, lf, 2 spaces, final newline; no trailing-space trim for `*.md` |
| `.gitignore` | ✅ exists — node_modules, dist, .astro, coverage, .lighthouseci, logs, env files, keys, OS/editor noise, `.claude/settings.local.json` |

## CI/CD

| Workflow | Trigger | Permissions | Jobs | Actions |
|---|---|---|---|---|
| `.github/workflows/ci.yml` ✅ | `pull_request`; push with `branches-ignore: main` | `contents: read`; env `ASTRO_TELEMETRY_DISABLED=1`; concurrency per ref (cancel in progress) | `quality-gate`: npm ci → check → lint `--max-warnings 0` → format:check → test → build (check:dist [PLANNED — Faz 4]) | `actions/checkout@v7`, `actions/setup-node@v7` (`node-version-file: .nvmrc`, npm cache) |
| `.github/workflows/deploy.yml` ✅ | `workflow_dispatch` only; push to `main` [PLANNED — Faz 5 task 2] | `contents: read`, `pages: write`, `id-token: write`; env `ASTRO_TELEMETRY_DISABLED=1`; `concurrency: pages` (no cancel) | `build` (withastro/action, Node 24) → `deploy` (environment `github-pages`) | `actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5` |

Workflow syntax not yet validated by actionlint (not installed); YAML parses. First real run in Faz 5.

## Known Issues / Gotchas

- GitHub Pages cannot set HTTP headers; CSP only via `<meta>` (ADR-011, decided in Faz 4).
- Repository name must be exactly `ulascanerturk.github.io`, otherwise the site is served under `/{repo}/`.
