# references/site_map.md — Site Map

> Last updated: 2026-10-17 (init-references, PLANS-ONLY mode)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

No site code exists yet (`src/`, `public/`, config files and workflows are absent).
Every entry below is planned.

## Site Overview [PLANNED — plans/01-mimari.md §1, §5]

| Setting | Planned value |
|---|---|
| Generator | Astro, static output (ADR-001 — accepted 2026-10-17) |
| Site URL | `https://ulascanerturk.github.io` (no custom domain — S5) |
| `base` | not set (user site served at root) |
| `trailingSlash` | `'always'` |
| `build.format` | `'directory'` |
| Integrations | `@astrojs/sitemap` (Faz 4); `i18n` config (Faz 6) |
| Language | `tr-TR`; `/en/` after v1 (S4) |

## Routes

| URL | File | Layout | Data source | Status |
|---|---|---|---|---|
| `/` | `src/pages/index.astro` | BaseLayout | `src/data/profile.ts`, featured projects | [PLANNED — faz-2 §2] |
| `/projeler/` | `src/pages/projeler/index.astro` | BaseLayout | `getCollection('projects')` | [PLANNED — faz-3 §2 task 6] |
| `/projeler/{slug}/` | `src/pages/projeler/[slug].astro` | ProjectLayout | `getStaticPaths` + `render()`; v1 slug: `lockbox-mobile` | [PLANNED — faz-3 §2 task 6] |
| `/404.html` | `src/pages/404.astro` | BaseLayout (`noindex`) | — | [PLANNED — faz-1 §2 task 9] |
| `/sitemap-index.xml` | `@astrojs/sitemap` | — | all pages except 404/drafts | [PLANNED — faz-4 §2 task 4] |
| `/en/`, `/en/projects/`, `/en/projects/{slug}/` | i18n routes | — | `profile.en.ts`, English entries | [PLANNED — faz-6 §2.1] |

Home page anchors [PLANNED — plans/02-icerik-ve-tasarim.md §2]: `#hakkimda`,
`#yetkinlikler`, `#deneyim`, `#projeler`, `#egitim`, `#girisimcilik`, `#baglantilar`.
Header nav: Hakkımda (`/#hakkimda`) · Projeler (`/projeler/`) · GitHub · LinkedIn · theme toggle.

## Layouts

### BaseLayout.astro [PLANNED — faz-1 §2 task 5]
- Head: charset, viewport, title template `"{page} · Ulaşcan Ertürk"`, description,
  canonical, favicon, `color-scheme` meta, inline theme script (≤ 1 KB, FOUC-free);
  `Seo` component from Faz 4.
- Body: SkipLink → SiteHeader → `<main id="icerik">` (slot) → SiteFooter.
- Props: [REVIEW NEEDED — defined during Faz 1 planning]

### ProjectLayout.astro [PLANNED — faz-3 §2 task 5]
- Extends BaseLayout: title, ProjectMeta, cover (optional), `<article>` content,
  `disclaimer` Callout, "Tüm projeler" back link, previous/next navigation.

## Components

| Component | File | Props | Used by | Status |
|---|---|---|---|---|
| SkipLink | `src/components/layout/SkipLink.astro` | — | BaseLayout | [PLANNED — faz-1 task 6] |
| SiteHeader | `src/components/layout/SiteHeader.astro` | current path (`aria-current`) | BaseLayout | [PLANNED — faz-1 task 6] |
| SiteFooter | `src/components/layout/SiteFooter.astro` | — (© year, GitHub, LinkedIn, source link) | BaseLayout | [PLANNED — faz-1 task 6] |
| ThemeToggle | `src/components/layout/ThemeToggle.astro` | — (`<button aria-pressed>`, hidden without JS) | SiteHeader | [PLANNED — faz-1 task 6] |
| Section | `src/components/ui/Section.astro` | title, id | profile page | [PLANNED — faz-1 task 7] |
| Tag | `src/components/ui/Tag.astro` | label | skills, projects | [PLANNED — faz-1 task 7] |
| ExternalLink | `src/components/ui/ExternalLink.astro` | href, label | everywhere | [PLANNED — faz-1 task 7] |
| Callout | `src/components/ui/Callout.astro` | variant (note/warning) | experience, projects | [PLANNED — faz-1 task 7] |
| Monogram | `src/components/ui/Monogram.astro` | — (`role="img"`, `aria-label`) | ProfileHero, favicon design | [PLANNED — faz-1 task 8] |
| ProfileHero | `src/components/profile/ProfileHero.astro` | profile subset | `/` | [PLANNED — faz-2 task 4] |
| SkillsGrid | `src/components/profile/SkillsGrid.astro` | skills | `/` | [PLANNED — faz-2 task 4] |
| ExperienceList | `src/components/profile/ExperienceList.astro` | experience (incl. Shifter Pro/Lite) | `/` | [PLANNED — faz-2 task 4] |
| WorkAreas | `src/components/profile/WorkAreas.astro` | work areas (§6 note) | `/` | [PLANNED — faz-2 task 4] |
| EducationList | `src/components/profile/EducationList.astro` | education (degree vs training) | `/` | [PLANNED — faz-2 task 4] |
| EcosystemNote | `src/components/profile/EcosystemNote.astro` | ecosystem | `/` | [PLANNED — faz-2 task 4] |
| FocusAreas | `src/components/profile/FocusAreas.astro` | focusAreas | `/` | [PLANNED — faz-2 task 4] |
| LinkList | `src/components/profile/LinkList.astro` | links | `/` | [PLANNED — faz-2 task 4] |
| ProjectCard | `src/components/projects/ProjectCard.astro` | project data (linked title, summary, status, tech) | `/projeler/`, `/` featured | [PLANNED — faz-3 task 4] |
| ProjectMeta | `src/components/projects/ProjectMeta.astro` | role, period, status (`<dl>`) | ProjectLayout | [PLANNED — faz-3 task 4] |
| ProjectLinks | `src/components/projects/ProjectLinks.astro` | links | ProjectLayout | [PLANNED — faz-3 task 4] |
| Seo | `src/components/Seo.astro` [REVIEW NEEDED — folder not fixed in plans] | title, description, canonical, OG, Twitter, JSON-LD | BaseLayout | [PLANNED — faz-4 task 1] |

## Styles and Theme [PLANNED — faz-1 §2 tasks 1–3, plans/02-icerik-ve-tasarim.md §5]

- `src/styles/tokens.css`: `--color-*` (bg, surface, text, text-muted, border,
  accent, accent-contrast, focus), `--font-*`, `--step-*` (fluid type scale ≈ 1.25),
  `--space-*`, `--radius-*`, `--shadow-*`, `--measure` (~68ch).
- Light theme on `:root`; dark via `[data-theme='dark']` and
  `@media (prefers-color-scheme: dark)` when no manual choice; choice persisted in `localStorage`.
- `src/styles/global.css`: reset, base typography, `:focus-visible`, `.visually-hidden`, reduced motion.

### Contrast Table
| Pair | Light | Dark | Threshold |
|---|---|---|---|
| — | [PLANNED — faz-1 task 3] | — | ≥ 4.5:1 text · ≥ 3:1 large text/UI |

## Client JavaScript

| Script | Pages | Purpose | Size (gzip) |
|---|---|---|---|
| Theme script (inline, `<head>`) | all | resolve stored/system theme before paint; toggle | [PLANNED — budget ≤ 1 KB] |

Budget: ≤ 10 KB gzip per page (Değişmez Kural 4).

## src/lib

| Export | Signature | Tests | Status |
|---|---|---|---|
| `slugify` [REVIEW NEEDED — name] | `(input: string) → string` (Turkish → ASCII) | `src/lib/slug.test.ts` | [PLANNED — faz-0 task 8] |
| theme resolver | stored > system > default | `src/lib/theme.test.ts` | [PLANNED — faz-1 §3] |
| `sortProjects`, `isPublished`, `formatPeriod` | project helpers | `src/lib/projects.test.ts` | [PLANNED — faz-3 task 3] |
| profile structural tests | — | `src/lib/profile.test.ts` | [PLANNED — faz-2 §3] |

## Public Assets [PLANNED]

| File | Purpose | Phase |
|---|---|---|
| `public/favicon.svg` | monogram favicon | Faz 1 |
| `public/apple-touch-icon.png` | 180×180 icon | Faz 4 |
| `public/og/default.png` | 1200×630 share image | Faz 4 |
| `public/robots.txt` | allow all + sitemap (AI crawler policy [REVIEW NEEDED]) | Faz 4 |

## Config [PLANNED — faz-0 §3 tasks 5–9]

| File | Key settings |
|---|---|
| `astro.config.mjs` | site, trailingSlash, build.format (see Site Overview) |
| `tsconfig.json` | `astro/tsconfigs/strict`, `noUncheckedIndexedAccess`, `@/*` alias |
| `eslint.config.js` | flat config: `eslint-plugin-astro`, `eslint-plugin-jsx-a11y`, `typescript-eslint`; `no-console: error` (except `scripts/`) |
| `.prettierrc` | `prettier-plugin-astro` |
| `vitest.config.ts` | `getViteConfig` |
| `.nvmrc`, `package.json#engines` | verified Node LTS |
| `.editorconfig` | — |
| `.gitignore` | ✅ exists — node_modules, dist, .astro, coverage, .lighthouseci, logs, env files, keys, OS/editor noise, `.claude/settings.local.json` |

## CI/CD [PLANNED — plans/01-mimari.md §6.2–§6.3]

| Workflow | Trigger | Permissions | Jobs | Actions |
|---|---|---|---|---|
| `.github/workflows/ci.yml` | `pull_request`; push to non-`main` branches | `contents: read` | npm ci → check → lint → format:check → test → build → check:dist (Faz 4) | `actions/checkout`, `actions/setup-node` (versions verified in Faz 0) |
| `.github/workflows/deploy.yml` | `workflow_dispatch` only (Faz 0); + push to `main` (Faz 5) | `contents: read`, `pages: write`, `id-token: write`; `concurrency: pages` | build + deploy | `withastro/action`, `actions/deploy-pages` |

## Known Issues / Gotchas

- GitHub Pages cannot set HTTP headers; CSP only via `<meta>` (ADR-011, decided in Faz 4).
- Repository name must be exactly `ulascanerturk.github.io`, otherwise the site is served under `/{repo}/`.
