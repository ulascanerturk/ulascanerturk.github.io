# references/phase_progress.md — Phase Progress

> Last updated: 2026-10-17 (Faz 1 — feat/faz-1-design-system-layout)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

## Current Phase

**Faz 1 — Tasarım Sistemi ve Layout: closed** (branch `feat/faz-1-design-system-layout`).
Next unblocked phases: **Faz 2 — Profil Sayfası** ∥ **Faz 3 — Proje Sayfaları**.
Overall: tasks 21/70 (+1 optional skipped) · acceptance 14/47.

## Open Questions

| # | Question | Answer | Date | Decided by |
|---|---|---|---|---|
| S1 | Which projects get pages? | LockBox Mobile only (no macOS); Shifter Pro/Lite in profile experience | 2026-10-17 | lead |
| S2 | Contact channels besides GitHub? | GitHub + LinkedIn; no e-mail/phone — LinkedIn URL in `ulascanerturk.md` §10 (commit 578d8e0), used in header/footer | 2026-10-17 | lead |
| S3 | Profile image? | Monogram (UE) SVG; no photo | 2026-10-17 | lead |
| S4 | English version? | Yes, after v1 (Faz 6, `/en/`) | 2026-10-17 | lead |
| S5 | Custom domain? | No; `ulascanerturk.github.io` | 2026-10-17 | lead |
| S6 | ADR-001 (Astro)? | Accepted | 2026-10-17 | lead |

Pending lead inputs: profile footnote decision (Faz 2 task 7),
LockBox Mobile publication status + text approval (Faz 3), robots.txt AI crawler
policy (Faz 4 task 5), Lighthouse CI in CI (Faz 4 task 10).

## Faz 0 — Proje Kurulumu   (plans/fazlar/faz-0-proje-kurulumu.md)
Status: closed (2026-10-17)
### Tasks
- [x] 1. ADR-001 approval — `plans/ekler/karar-kayitlari.md` "Kabul edildi (2026-10-17)", commit 640534e
- [x] 2. Reference maps — `references/*.md` created by init-references (PLANS-ONLY), commit 83acbc0
- [x] 3. Versions verified 2026-10-17 (Astro 7.4.0, Node 24 Active LTS) — `.nvmrc` 24, `engines >=22.22.0`, ADR-008 accepted
- [x] 4. Astro skeleton — hand-written minimal setup (no `npm create`), placeholder `src/pages/index.astro` (text approved by lead)
- [x] 5. `astro.config.mjs`
- [x] 6. `tsconfig.json`
- [x] 7. `eslint.config.js` (jsx-a11y-x, ADR-010 deviation), `.prettierrc.json`, `.prettierignore`, `.editorconfig`
- [x] 8. `vitest.config.ts`, `src/lib/slug.ts` + `slug.test.ts` (5 tests)
- [x] 9. npm scripts (dev, build, preview, check, lint, format, format:check, test)
- [x] 10. `.github/workflows/ci.yml`
- [x] 11. `.github/workflows/deploy.yml` (`workflow_dispatch` only)
- [x] 12. AGENTS.md Commands; `references/methodology.md` Versions + Commands
### Acceptance Criteria
- [x] ADR-001 accepted — karar-kayitlari.md
- [x] `references/` exists with four map files — this run
- [x] `.nvmrc` and `engines` show the verified Node LTS — `.nvmrc` 24; `engines >=22.22.0` (lead-approved deviation: Astro minimum, keeps local Node 22 working)
- [x] All quality-gate commands pass with zero errors/warnings — `test-lint all` PASS 2026-10-17 (2nd run, after fix: prettier, defineConfig, telemetry env)
- [x] CI workflow syntax valid — actionlint not installed; YAML parses, permissions explicit; **verify on first push in Faz 5**
- [x] `dist/`, `.astro/`, `node_modules/` not committed — ignored by `.gitignore`, absent from the change set
- [x] Checklist: Genel ✅ (plan-only changes + approved fixes; new deps covered by ADR-010; audit 0 vulnerabilities; references updated), Dağıtım ✅ (explicit permissions; actions from GitHub/withastro on major tags; no build output)

## Faz 1 — Tasarım Sistemi ve Layout   (plans/fazlar/faz-1-tasarim-sistemi-ve-layout.md)
Status: closed (2026-10-17, branch `feat/faz-1-design-system-layout`)
### Tasks
- [x] 1. Tokens — `src/styles/tokens.css` (light `:root`, dark `[data-theme='dark']` + `prefers-color-scheme` without a theme)
- [x] 2. Global styles — `src/styles/global.css`
- [x] 3. Contrast verification → table in `references/site_map.md` (all pairs pass; lowest UI pair 4.60)
- [x] 4. `src/data/site.ts` (wording approved by lead 2026-10-17)
- [x] 5. `BaseLayout.astro` (props `title?`, `description?`, `noindex?`)
- [x] 6. Layout components (SkipLink, SiteHeader, SiteFooter, ThemeToggle)
- [x] 7. UI components (Section, Tag, ExternalLink, Callout)
- [x] 8. Monogram avatar + favicon (S3: monogram) — `Monogram.astro`, `public/favicon.svg`
- [x] 9. `404.astro` (noindex; home link — projects link deferred to Faz 3 task 6, lead decision)
- [—] 10. (Optional) dev-only style guide — skipped (lead decision 2026-10-17)
### Acceptance Criteria
- [x] All token pairs meet contrast thresholds — table in `site_map.md` → Contrast Table
- [x] Light/dark toggle without FOUC, preference persisted — script runs in `<head>` before the stylesheet; browser check: toggle → `data-theme=dark`, `localStorage.theme=dark`, kept on `/404.html`; Vitest parity tests
- [x] Site readable and navigable without JS — all content and links are static HTML; simulated no-JS state (no `data-theme`): toggle hidden, system theme applied in light and dark. Not tested with JS disabled in a real browser
- [x] ≤ 1 KB client JS per page (theme script only) — 996 B raw / 480 B gzip on `/` and `/404.html`
- [x] No horizontal scroll at 360 px — `scrollWidth = 360` on `/` and `/404.html`
- [x] Quality gate PASS (`site`) — `test-lint site` 2nd run 2026-10-17 (1st run: Prettier only)
- [x] Checklist: Genel ✅ (approved files + listed small additions; no new deps; layering kept — components get text via props), Erişilebilirlik ✅ (one h1, skip link first focusable, visible focus ring, 44 px targets, reduced motion, contrast table), Performans ✅ (no external fonts/CDN, 480 B gzip JS)
### Notes
- Plan deviation (lead decision 2026-10-17): "Projeler" nav item and the 404 projects link are added in Faz 3 task 6, when `/projeler/` exists.
- ADR-003, ADR-004, ADR-009 accepted 2026-10-17.
- Small additions during implementation: `--container` token, footer nav label "Alt bağlantılar", `--color-warning` (Callout).

## Faz 2 — Profil Sayfası   (plans/fazlar/faz-2-profil-sayfasi.md)
Status: not started (unblocked)
### Tasks
- [ ] 1. LinkedIn URL from lead → `ulascanerturk.md` §10 ✅ (commit 578d8e0) + `profile.ts` (pending)
- [ ] 2. `src/data/profile.ts` with source comments
- [ ] 3. Text draft + lead approval
- [ ] 4. Profile components
- [ ] 5. Featured projects section
- [ ] 6. `src/pages/index.astro`
- [ ] 7. Footnote decision ([REVIEW NEEDED] — lead)
### Acceptance Criteria
- [ ] Profile texts approved by lead (date recorded here)
- [ ] LinkedIn URL in `ulascanerturk.md` §10 and on the site
- [ ] Shifter Pro / Lite in experience; no separate project page
- [ ] Every section consistent with `ulascanerturk.md`; nothing from §9/§11
- [ ] Education and entrepreneurship wording follows §3 and §7
- [ ] Page fully readable without JS
- [ ] Quality gate PASS (`all`)
- [ ] Checklist: İçerik ve Gizlilik, Erişilebilirlik reviewed

## Faz 3 — Proje Sayfaları   (plans/fazlar/faz-3-proje-sayfalari.md)
Status: not started (unblocked)
### Tasks
- [ ] 1. LockBox Mobile facts from lead → `ulascanerturk.md` §6
- [ ] 2. Collection schema — `src/content.config.ts`
- [ ] 3. `src/lib/projects.ts`
- [ ] 4. Project components
- [ ] 5. `ProjectLayout.astro`
- [ ] 6. Pages (`/projeler/`, `/projeler/[slug]/`) — also add "Projeler" to `site.nav.items` and "Projelere göz at" to `site.notFound.links` (deferred from Faz 1)
- [ ] 7. `lockbox-mobile.md`
- [ ] 8. Profile integration (featured)
- [ ] 9. "How to add a project" guide in `references/content_schema.md`
### Acceptance Criteria
- [ ] Adding a project requires only one `.md` file
- [ ] LockBox Mobile text approved and added to `ulascanerturk.md` §6
- [ ] Publication status correct; no store link unless published; no repo link
- [ ] No confidential details, internal doc paths or unverified metrics
- [ ] Images (if any) metadata-free, with alt and dimensions
- [ ] Quality gate PASS (`all`)
- [ ] Checklist: İçerik ve Gizlilik, Erişilebilirlik, SEO reviewed

## Faz 4 — SEO, Erişilebilirlik ve Performans   (plans/fazlar/faz-4-seo-erisilebilirlik-performans.md)
Status: not started (blocked by Faz 2 and Faz 3)
### Tasks
- [ ] 1. `Seo.astro`
- [ ] 2. OG images
- [ ] 3. JSON-LD (`Person`, project schema)
- [ ] 4. Sitemap
- [ ] 5. `robots.txt` (AI crawler policy — [REVIEW NEEDED] lead)
- [ ] 6. Favicon set
- [ ] 7. `scripts/check-dist.mjs` + `npm run check:dist` in CI
- [ ] 8. axe / pa11y audit
- [ ] 9. Manual a11y audit
- [ ] 10. Lighthouse CI (in CI or not — [REVIEW NEEDED] lead)
- [ ] 11. Image optimization
- [ ] 12. CSP decision (ADR-011)
- [ ] 13. Dependency audit
### Acceptance Criteria
- [ ] Unique title + description + canonical on every page
- [ ] JSON-LD valid, public info only
- [ ] `sitemap-index.xml` and `robots.txt` generated
- [ ] check:dist, axe and Lighthouse thresholds met
- [ ] ≤ 10 KB client JS per page (measurement recorded in Audits)
- [ ] CSP decision recorded as ADR
- [ ] Checklist: all sections reviewed

## Faz 5 — Yayın ve Dağıtım   (plans/fazlar/faz-5-yayin-ve-dagitim.md)
Status: not started (blocked by Faz 4)
### Tasks
- [ ] 1. Domain — decided: no custom domain (S5); nothing to implement beyond confirming no `CNAME`
- [ ] 2. Enable deploy on push to `main`
- [ ] 3. Create public remote repo (lead)
- [ ] 4. Pages source: GitHub Actions (lead)
- [ ] 5. Branch protection (lead, optional)
- [ ] 6. First push (lead)
- [ ] 7. Live verification
- [ ] 8. Search console registration (optional, lead)
- [ ] 9. GitHub profile website link (optional, lead)
- [ ] 10. Rollback procedure in `references/methodology.md`
### Acceptance Criteria
- [ ] Site live, all pages reachable
- [ ] Push to `main` deploys automatically
- [ ] Live Lighthouse thresholds met
- [ ] Rollback procedure documented
- [ ] No secrets, `.env` or `dist/` in the repo
- [ ] Checklist: Dağıtım reviewed

## Faz 6 — İngilizce Sürüm ve Bakım   (plans/fazlar/faz-6-ingilizce-surum-ve-bakim.md)
Status: not started (blocked by Faz 5) — English version confirmed (S4)
### Tasks
- [ ] 1. Astro i18n config
- [ ] 2. Translatable data (`profile.tr.ts` / `profile.en.ts`)
- [ ] 3. English project entries (schema decision in plan)
- [ ] 4. `/en/` pages
- [ ] 5. Language switch + hreflang + sitemap i18n
- [ ] 6. Translation approval (lead)
- [ ] 7. Dependabot
- [ ] 8. Content update guide
- [ ] 9. Quarterly maintenance checklist
### Acceptance Criteria
- [ ] English version live; every Turkish page has a counterpart
- [ ] Translations approved by lead
- [ ] Dependabot enabled
- [ ] Maintenance guide in `references/`
- [ ] Quality gate PASS (`all`)

## Audits

| Date | Lighthouse (perf/a11y/bp/seo) | axe | Max JS (gzip) | Notes |
|---|---|---|---|---|
| 2026-10-17 | not run | not run | 0 B (placeholder page) | Faz 0 dist check: 1 page, 0 errors |
| 2026-10-17 | not run | not run | 480 B gzip (theme script, 996 B raw) | Faz 1 dist check: 2 pages, 0 errors, 0 warnings; 360 px, keyboard, theme checks in browser (macOS) |

## Follow-ups

- Profile type needs a field for §6 work areas (`WorkAreas` component) — init-references, see `content_schema.md`.
- Confirm ADR-005 … ADR-007 ("Önerildi") with the lead when their phases start — init-references (ADR-008, ADR-010 accepted in Faz 0; ADR-003, ADR-004, ADR-009 in Faz 1).
- Verify CI/deploy workflow syntax on the first push (actionlint not installed locally) — Faz 0.
- Optional for the lead: install Node 24 locally to match CI; run `npx astro telemetry disable` once — Faz 0.
- `NODE_ENV=production` in the lead's environment makes npm skip devDependencies; use `npm install --include=dev` (documented in ADR-008, AGENTS.md) — Faz 0.
- Faz 0 task 2 text says "DOCS-ONLY"; mode name is "PLANS-ONLY" — cosmetic plan fix — init-references.
- `Seo.astro` folder (`src/components/` root vs a subfolder) not fixed in plans — decide in Faz 4 planning.
- Faz 1 risk table: check rendering on Windows and Android (system font stack) — only macOS was checked — Faz 1.
- Verify the site with JavaScript actually disabled in a browser (only simulated in Faz 1) — Faz 4 manual a11y audit.
- `/#hakkimda` nav anchor resolves once Faz 2 adds the `#hakkimda` section — Faz 1.
- Faz 0 phase doc acceptance checkboxes are still unticked in `plans/fazlar/faz-0-proje-kurulumu.md` (progress lives here) — Faz 1.
