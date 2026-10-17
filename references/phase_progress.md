# references/phase_progress.md — Phase Progress

> Last updated: 2026-10-17 (Faz 6 — feat/faz-6-english-version)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

## Current Phase

**Faz 5 — Yayın ve Dağıtım: acceptance criteria met** (2026-10-17) — site live at `https://ulascanerturk.github.io/`;
task 7 partly open (OG preview — lead); optional tasks 8–9 with the lead.
Faz 4: acceptance criteria met; task 9 VoiceOver still open (lead approved starting Faz 5 with it open, 2026-10-17).
**Faz 6 — İngilizce Sürüm ve Bakım: in progress** — part (a) English version done on
`feat/faz-6-english-version` (tasks 1–6; live check after the lead's push); part (b) maintenance
(tasks 7–9) next on `chore/faz-6-maintenance` (lead decision 2026-10-17: two branches, (a) first).
Overall: tasks 61/70 (+1 optional skipped; Faz 2 task 5 done in Faz 3 task 8; Faz 4 task 9 and Faz 5 task 7 partial) · acceptance 43/47.

## Open Questions

| # | Question | Answer | Date | Decided by |
|---|---|---|---|---|
| S1 | Which projects get pages? | LockBox Mobile only (no macOS); Shifter Pro/Lite in profile experience. Faz 3: page title "Lockbox" (store name), status "geliştirme aşamasında", security at plan level | 2026-10-17 | lead |
| S2 | Contact channels besides GitHub? | GitHub + LinkedIn; no e-mail/phone — LinkedIn URL in `ulascanerturk.md` §10 (commit 578d8e0), used in header/footer | 2026-10-17 | lead |
| S3 | Profile image? | Monogram (UE) SVG; no photo | 2026-10-17 | lead |
| S4 | English version? | Yes, after v1 (Faz 6, `/en/`) | 2026-10-17 | lead |
| S5 | Custom domain? | No; `ulascanerturk.github.io` | 2026-10-17 | lead |
| S6 | ADR-001 (Astro)? | Accepted | 2026-10-17 | lead |

Decided in Faz 4 (lead, 2026-10-17): robots.txt allows all crawlers incl. AI crawlers; Lighthouse CI local
only (not in CI); JSON-LD without `worksFor`; CSP via Astro `security.csp` (ADR-011).
Pending lead inputs: VoiceOver check (Faz 4 task 9); Lockbox store links once the app is published
(content update, not a phase task).

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
- [x] CI workflow syntax valid — actionlint not installed; YAML parses, permissions explicit; verified by the first GitHub run in Faz 5 (run 38984069624, green)
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
Status: closed (2026-10-17, branch `feat/faz-2-profile-page`)
### Tasks
- [x] 1. LinkedIn URL — `ulascanerturk.md` §10 (commit 578d8e0) + `profile.links` (`kind: 'linkedin'`); no e-mail/phone
- [x] 2. `src/data/profile.ts` — `Profile` + `profilePage`, `// kaynak: ulascanerturk.md §N` comment per field
- [x] 3. Text draft + lead approval — first person (lead decision), approved 2026-10-17
- [x] 4. Profile components — `src/components/profile/` (8 components)
- [—] 5. Featured projects section — deferred to Faz 3 task 8 (lead decision 2026-10-17): no `#projeler` section and no "Projeleri gör" hero action until `/projeler/` exists (no broken internal link) → **done in Faz 3 task 8**
- [x] 6. `src/pages/index.astro` — sections in 02 §2 order with `id` anchors; meta description from the profile summary
- [x] 7. Footnote — lead decision 2026-10-17: at the end of `/` (not in the footer): §11 self-declaration note + "Son güncelleme" (`<time>`, `formatDate`)
### Acceptance Criteria
- [x] Profile texts approved by lead — 2026-10-17 (first person; plan + revised draft approved)
- [x] LinkedIn URL in `ulascanerturk.md` §10 and on the site — §10, header/footer (Faz 1), hero action, Bağlantılar
- [x] Shifter Pro / Lite in experience; no separate project page — `ExperienceList` products (h4), no `/projeler/` route
- [x] Every section consistent with `ulascanerturk.md`; nothing from §9/§11 — source comments per field; privacy scan a–j 0 hits; content review of every keyword hit
- [x] Education and entrepreneurship wording follows §3 and §7 — degree/training grouped and labelled + §3 note; programs under "Shifter girişimi bağlamında…" + §7 note; Vitest asserts one degree (Uluslararası İlişkiler) and Shifter context
- [x] Page fully readable without JS — all content is static HTML; only the theme script (480 B gzip) runs
- [x] Quality gate PASS (`all`) — `test-lint all` 2nd run 2026-10-17 (1st run: Prettier only, 11 files)
- [x] Checklist: İçerik ve Gizlilik ✅ (sources, §9/§11, §3/§7 wording, no invented claims, work areas not presented as products), Erişilebilirlik ✅ (one h1, h1→h4 without skips, meaningful link text, 44 px targets for hero/link-list links, tokens only, no horizontal scroll at 360 px)
### Notes
- Plan deviations approved 2026-10-17: `Profile` gains `tagline`, `skills[].note`, `experience[].products`, `workAreas`, `lastUpdated` (`plans/01-mimari.md` §4.1 updated); page text lives in `profilePage`; extra anchor `#odak-alanlari`; one section-level "titles may change" Callout instead of per-entry notes.
- ADR-005 accepted 2026-10-17.
- `Tag.astro` change (planned "only if needed") was not needed: `scrollWidth = 360` at 360 px.

## Faz 3 — Proje Sayfaları   (plans/fazlar/faz-3-proje-sayfalari.md)
Status: closed (2026-10-17, branch `feat/faz-3-project-pages`)
### Tasks
- [x] 1. Lockbox facts → `ulascanerturk.md` §6 "Lockbox — Çevrimdışı Parola Kasası" — status verified in the `lockbox-mobile` repo (iOS 1.0.0 (1) uploaded to App Store Connect / TestFlight 2026-10-16; not published; no remote) and confirmed by the lead; text approved 2026-10-17
- [x] 2. Collection schema — `src/content.config.ts` (glob loader, zod 4 from `astro/zod`, `image()`; `summary` 50–160, `coverAlt` required with `cover` — approved deviations, plans/01-mimari.md §4.2 updated)
- [x] 3. `src/lib/projects.ts` — `sortProjects`, `isPublished`, `formatPeriod` + approved additions `adjacentProjects`, `groupByKind`; enums shared with the schema
- [x] 4. Project components — `ProjectCard` (only the title links), `ProjectMeta` (`<dl>`), `ProjectLinks` (hidden when empty)
- [x] 5. `ProjectLayout.astro` — h1, summary, meta, tech, cover (`astro:assets`), `<article>` content, disclaimer Callout, links, prev/next nav + "Tüm projeler"
- [x] 6. Pages — `/projeler/` (grouping by `kind` only with ≥ 2 kinds), `/projeler/[slug]/` (`getStaticPaths` + `render()`); "Projeler" in `site.nav.items`, "Projelere göz at" in `site.notFound.links`
- [x] 7. `src/content/projects/lockbox-mobile.md` — title "Lockbox — Çevrimdışı Parola Kasası" (lead: store name), `kind: product`, `status: active`, `featured: true`, `order: 1`, no `links`, no cover; claims checked against the `lockbox-mobile` docs and Faz 2–6 commits
- [x] 8. Profile integration — `#projeler` "Öne çıkan projeler" between `#deneyim` and `#egitim` (featured cards, h3, + "Tüm projeler"); hero action "Projeleri gör" first (internal link; `ProfileHero` `external` flag)
- [x] 9. "How to Add a Project" guide in `references/content_schema.md`
### Acceptance Criteria
- [x] Adding a project requires only one `.md` file — verified 2026-10-17 by following the guide with a temporary second entry (`kind: open-source`, `links`, `period` 2024–2025): 5 pages built, `/projeler/` switched to kind groups, prev/next links appeared, link had `rel="noopener noreferrer"`, dist checks 0 errors; file deleted afterwards
- [x] Lockbox text approved and added to `ulascanerturk.md` §6 — lead approval 2026-10-17 (plan texts A/B/C)
- [x] Publication status correct; no store link; no repo link — `status: active` + "Geliştirme aşamasında; App Store ve Google Play yayını hazırlanıyor"; no `links`; dist grep: no apps.apple / play.google / repo URL
- [x] No confidential details, internal doc paths or unverified metrics — dist grep for `docs/`, `.lockbox`, TestFlight, console, XChaCha/HKDF, metrics: 0 hits; performance/coverage targets left out (source path only in a YAML comment of the source file — not published, same path as in plans/02)
- [x] Images (if any) metadata-free, with alt and dimensions — no images in v1; schema requires `coverAlt` with `cover`; `<Image>` sets width/height
- [x] Quality gate PASS (`all`) — `test-lint all` 1st run 2026-10-17: check 0/0/0, lint 0, format OK, 47 tests, build 4 pages, invariants 0 hits, dist 0 errors / 0 warnings, audit 0, docs links OK
- [x] Checklist: İçerik ve Gizlilik ✅ (§6 source + lead approval, §9/§11 clean, no invented metrics/clients), Erişilebilirlik ✅ (one h1 per page, h1→h2(→h3) without skips, title-only card links, 44 px targets, `<dl>` meta, tag lists labelled, 360 px `scrollWidth = 360` on all pages, dark theme checked), SEO ✅ (unique title + description ≤ 160 + canonical with trailing slash on `/projeler/` and `/projeler/lockbox-mobile/`; OG/JSON-LD/sitemap are Faz 4)
### Notes
- Plan deviations approved 2026-10-17: title "Lockbox" (plans/02 §4 updated), `summary` ≤ 160 + `coverAlt` (plans/01 §4.2 updated), extra lib helpers, `HeroAction` union (`href` | `kind`), body sections without "Öğrenimler".
- Schema check (faz-3 §3): temporary entry without `summary` and with `status: live` → `InvalidContentEntryDataError` naming both fields; file deleted.
- `src/data/projects.ts` (`projectsPage`) holds the project UI text; status label for `active` is "Aktif geliştirmede".

## Faz 4 — SEO, Erişilebilirlik ve Performans   (plans/fazlar/faz-4-seo-erisilebilirlik-performans.md)
Status: acceptance criteria met (2026-10-17, branch `feat/faz-4-seo-a11y-perf`) — task 9 VoiceOver pending (lead)
### Tasks
- [x] 1. `Seo.astro` — `src/components/layout/Seo.astro` (folder decided: layout); title, description, canonical, robots, OG (+ `og:site_name`, image size/alt), Twitter `summary_large_image`, JSON-LD
- [x] 2. OG images — `public/og/default.png` 1200×630 (text approved by lead); project pages: cover → 1200 px JPEG via `getImage`, else default (verified with a temporary cover entry, deleted)
- [x] 3. JSON-LD — `/`: ProfilePage → Person (no `worksFor`, lead decision); projects: CreativeWork; builders in `src/lib/seo.ts`, forbidden personal keys tested
- [x] 4. Sitemap — `@astrojs/sitemap` (ADR-012), `/404` filtered; 3 URLs
- [x] 5. `robots.txt` — allow all incl. AI crawlers (lead decision) + `Sitemap:` line
- [x] 6. Favicon set — `favicon.svg` (Faz 1) + `apple-touch-icon.png` 180×180 + `<link rel="apple-touch-icon">`
- [x] 7. `scripts/check-dist.mjs` + `npm run check:dist` in CI — plan list + uniqueness, OG/Twitter, JSON-LD privacy, CSP, img size, sitemap/robots; 18 checker tests
- [x] 8. axe audit — axe-core 4.14.0 in the browser on `astro preview`: 4 pages × 2 themes, 0 violations (`@axe-core/cli` ChromeDriver mismatch — methodology)
- [~] 9. Manual a11y audit — done: keyboard (skip link first, 3 px focus ring, skip → `main`), 360 px and 640 px (= 200 % zoom at 1280) `scrollWidth` = viewport on all pages, no positive tabindex, no target < 24 px, reduced-motion rules present, theme toggle under CSP; computed-style contrast min 6.14 (light) / 6.93 (dark). **Open: VoiceOver on `/` and a project page (lead); JS-disabled browser check**
- [x] 10. Lighthouse CI — `lighthouserc.json`, `npm run lhci`, local only (lead decision, ADR-013)
- [x] 11. Image optimization — cover via `<Picture>` AVIF/WebP + widths, eager/high priority (hero); no other images
- [x] 12. CSP decision — ADR-011 accepted: Astro `security.csp`, hashes for scripts and styles, no `'unsafe-inline'`; Shiki off
- [x] 13. Dependency audit — `npm audit --omit=dev --audit-level=high`: 0 (full audit 0 too)
### Acceptance Criteria
- [x] Unique title + description + canonical on every page — `check:dist` site checks; titles: "Ulaşcan Ertürk", "Projeler · …", "Lockbox — Çevrimdışı Parola Kasası · …", "Sayfa bulunamadı · …"
- [x] JSON-LD valid, public info only — parses, schema.org context, no forbidden keys (Vitest + `check:dist`); Rich Results Test after publishing (Faz 5)
- [x] `sitemap-index.xml` and `robots.txt` generated — `dist/sitemap-index.xml` → `sitemap-0.xml` (3 URLs, no 404); `dist/robots.txt`
- [x] check:dist, axe and Lighthouse thresholds met — 0 errors; 0 violations; median 100/100/100/100 (404: 100/100/100, SEO excluded)
- [x] ≤ 10 KB client JS per page — 478 B gzip max (Audits)
- [x] CSP decision recorded as ADR — ADR-011 (accepted, applied)
- [x] Checklist: all sections reviewed — Genel ✅ (approved files + 1 approved fix; new deps with ADR-012/013, audit 0; layering: Seo gets props, `src/lib/seo.ts` pure; console only in scripts/), İçerik ve Gizlilik ✅ (OG text/alt from the title line, approved; JSON-LD public fields only, no `worksFor`; generated PNGs metadata-free), Erişilebilirlik ✅ (axe, contrast, keyboard, 360 px, 200 %), SEO ve Paylaşım ✅, Performans ✅ (478 B JS, `<Picture>`, no external resources), Güvenlik ✅ (CSP enforced, injected inline script blocked), Dağıtım ✅ (CI step added, permissions unchanged)
### Notes
- Plan deviations approved 2026-10-17: CSP via Astro `security.csp` instead of a hand-maintained hash and `style-src 'unsafe-inline'`; ProfilePage/CreativeWork JSON-LD types; extra `check:dist` rules + checker tests (`vitest` include `scripts/**`); `scripts/images/` + `npm run images`; `og:type` per page.
- Fix cycle 1 (approved): `astro check` error — JSDoc `Record<string, string>` on `parsePage` maps in `check-dist.mjs`.
- Temporary verification files (cover entry + image) were created and deleted; nothing left in `src/`.

## Faz 5 — Yayın ve Dağıtım   (plans/fazlar/faz-5-yayin-ve-dagitim.md)
Status: acceptance criteria met (2026-10-17; branch `chore/faz-5-deploy-pipeline` → 0b56ab1, live verification on `docs/faz-5-live-verification`) — task 7 OG preview and optional 8–9 with the lead
### Tasks
- [x] 1. Domain — no custom domain (S5); no `CNAME` in the repo or `public/` (checked 2026-10-17)
- [x] 2. Deploy on push to `main` — `deploy.yml` `push: branches: [main]` + `workflow_dispatch`; `quality-gate` job calls `ci.yml` (`workflow_call`) and `build` needs it; `pages`/`id-token` write only on the `deploy` job (approved plan deviation)
- [x] 3. Public remote repo (lead) — `ulascanerturk/ulascanerturk.github.io`, PUBLIC, remote `origin`
- [x] 4. Pages source: GitHub Actions (lead, `gh api … /pages -f build_type=workflow` on the empty repo — worked) — `html_url` `https://ulascanerturk.github.io/`, `https_enforced: true`, no `cname`
- [x] 5. Branch protection (lead) — ruleset `main` (active, `~DEFAULT_BRANCH`): `deletion` + `non_fast_forward` only; no required status checks / PRs (approved 2026-10-17)
- [x] 6. First push (lead) — `git push -u origin main` (0b56ab1); deploy run 38984069624 green: quality-gate 36 s → build → deploy; deployment `github-pages` @ 0b56ab1
- [~] 7. Live verification — done: `/`, `/projeler/`, `/projeler/lockbox-mobile/` 200 (`content-type: text/html; charset=utf-8`); `/olmayan-sayfa/` 404 with the custom page (noindex); `http://` → 301 `https://`; `/projeler` → 301 `/projeler/`; robots, favicons, OG image 200; `sitemap-index.xml` valid XML (xmllint) → 3 URLs; `ulascanerturk.md` 404; JSON-LD (ProfilePage, CreativeWork) parses, schema.org, no forbidden keys; canonical/`og:url` = live URL; CSP meta present; Lighthouse live 100/100/100/100. **Open: OG preview (LinkedIn Post Inspector) and Google Rich Results Test — lead**
- [ ] 8. Search console registration (optional, lead)
- [ ] 9. GitHub profile website link (optional, lead)
- [x] 10. Rollback procedure — `references/methodology.md` → Release and Rollback (re-run last good deploy, `git revert` + push, no force push)
### Acceptance Criteria
- [x] Site live, all pages reachable — every sitemap URL 200, custom 404 (Task 7)
- [x] Push to `main` deploys automatically — run 38984069624 triggered by `push`, no manual step
- [x] Live Lighthouse thresholds met — LHCI 0.15.1 against the live URLs, 3 runs each: 100/100/100/100 on `/`, `/projeler/`, `/projeler/lockbox-mobile/`; `/404.html` 100/100/100 (SEO excluded: noindex); LCP ≈ 0.8 s
- [x] Rollback procedure documented — methodology.md → Release and Rollback
- [x] No secrets, `.env` or `dist/` in the repo — `git ls-files` (113 files): no `.env*`, `dist/`, `.astro/`, `node_modules/`, keys, `CNAME`; secret grep (test-lint 6f) 0 hits; remote `origin/main` = local `main` (0b56ab1), remote tree 113 files, same check clean
- [x] Checklist: Dağıtım reviewed — no build output, explicit least-privilege permissions, actions from GitHub/withastro on major tags, live verification after the first push ✅
### Notes
- Gap found while planning: `ci.yml` ignores pushes to `main` and feature branches are never pushed, so CI would never run;
  `withastro/action` only builds. Fix (lead-approved): deploy is gated by `ci.yml` via `workflow_call`.
  `plans/01-mimari.md` §6.2–6.3 and faz-5 §2 tasks 2 and 5 updated.
- Quality gate 2026-10-17 (1st run): check 0/0/0, lint 0, format OK, 74 tests, build 4 pages, dist 0 errors (478 B gzip JS),
  invariants a–j 0 hits, docs links OK, actionlint skipped (not installed).

## Faz 6 — İngilizce Sürüm ve Bakım   (plans/fazlar/faz-6-ingilizce-surum-ve-bakim.md)
Status: in progress — (a) English version implemented (branch `feat/faz-6-english-version`, 2026-10-17);
(b) maintenance next. Started with Faz 4 task 9 and Faz 5 task 7 open (lead decision 2026-10-17);
ADR-006 accepted with the plan.
### Tasks
- [x] 1. Astro i18n config — `astro.config.mjs` `i18n` (`defaultLocale: 'tr'`, `locales: ['tr', 'en']`, `prefixDefaultLocale: false`); Turkish URLs unchanged
- [x] 2. Translatable data — `profile.ts` (types + `profiles: Record<Locale, …>`), `profile.tr.ts` (moved, `git mv`), `profile.en.ts`; `siteText` / `projectsPage` keyed by `Locale` (missing locale/field = type error); parity tests in `profile.test.ts`
- [x] 3. English project entries — schema decision: `src/content/projects/en/{slug}.md`, same schema, locale from the id; `translationProblems` fails the build on a missing translation or differing `kind/status/featured/order/period`; `en/lockbox-mobile.md`
- [x] 4. `/en/` pages — `/en/`, `/en/projects/`, `/en/projects/{slug}/` via `HomeLayout`, `ProjectListLayout`, `ProjectLayout` + `src/pages/_shared/projects.ts`; `/404.html` gets an English part (`lang="en"`)
- [x] 5. Language switch + hreflang + sitemap — header link "English"/"Türkçe" (`lang`, `hreflang`, same page in the other locale); `<link rel="alternate" hreflang>` tr/en/x-default, `og:locale` + `og:locale:alternate`; sitemap `xhtml:link` via `serialize` (plan deviation: the integration's `i18n` option only pairs identical paths); English share image `public/og/default-en.png`
- [x] 6. Translation approval (lead) — glossary approved with the plan, full English text approved 2026-10-17 (incl. EN home title "Software Developer · Ulaşcan Ertürk", fix cycle 1)
- [ ] 7. Dependabot — `chore/faz-6-maintenance`
- [ ] 8. Content update guide — `chore/faz-6-maintenance`
- [ ] 9. Quarterly maintenance checklist — `chore/faz-6-maintenance`
### Acceptance Criteria
- [ ] English version live; every Turkish page has a counterpart — built and verified locally: 3 TR ↔ 3 EN pages, every pair reciprocal (`check:dist`), 404 bilingual; **open: live check after the lead's push**
- [x] Translations approved by lead — 2026-10-17
- [ ] Dependabot enabled — maintenance branch + lead (GitHub Insights → Dependency graph)
- [ ] Maintenance guide in `references/` — maintenance branch
- [ ] Quality gate PASS (`all`) — PASS on the English branch 2026-10-17 (2nd run); re-run on the maintenance branch to close
### Notes
- Plan deviations approved 2026-10-17: sitemap alternates via `serialize` instead of the integration's `i18n` option; bilingual `/404.html` (GitHub Pages serves one 404); page helpers in `src/pages/_shared/` (plans/01-mimari.md §2–§3 updated); English home page title "Software Developer · Ulaşcan Ertürk" (`profilePage.title`) so titles stay unique site-wide (fix cycle 1, lead chose a separate title over per-language uniqueness).
- Quality gate 2026-10-17: 1st run FAIL (`check:dist`: duplicate `<title>` "Ulaşcan Ertürk" on `/` and `/en/`); 2nd run PASS — check 0/0/0, lint 0, format OK, 100 tests, build 7 pages, dist 0 errors (478 B gzip JS), invariants a–j 0 hits, content review OK (§3/§7 wording in English), audit 0, docs links OK.
- Browser (astro preview, 2026-10-17): language links, brand/home and "All projects" links per locale, dates ("October 17, 2026"); 360 px `scrollWidth = 360` on all 7 pages, no target < 24 px; fresh-tab console without CSP errors.
- Turkish share image and touch icon re-rendered byte-identical; `default-en.png` chunks IHDR/IDAT/IEND only.

## Audits

| Date | Lighthouse (perf/a11y/bp/seo) | axe | Max JS (gzip) | Notes |
|---|---|---|---|---|
| 2026-10-17 | not run | not run | 0 B (placeholder page) | Faz 0 dist check: 1 page, 0 errors |
| 2026-10-17 | not run | not run | 480 B gzip (theme script, 996 B raw) | Faz 1 dist check: 2 pages, 0 errors, 0 warnings; 360 px, keyboard, theme checks in browser (macOS) |
| 2026-10-17 | not run | not run | 480 B gzip (theme script only) | Faz 2 dist check: 2 pages, 0 errors, 0 warnings; `/` has 1 h1, 27 headings without skips, all section anchors; 360 px `scrollWidth = 360` (browser) |
| 2026-10-17 | 100/100/100/100 (`/`, `/projeler/`, `/projeler/lockbox-mobile/`); 404: 100/100/100 (SEO n/a) — median of 3, LHCI 0.15.1 / Lighthouse 12.6.1, local Chrome 155 | 0 violations (axe-core 4.14.0, 4 pages × 2 themes) | 478 B gzip (theme script only) | Faz 4 `check:dist`: 4 pages, 0 errors; CSP enforced, no console violations |
| 2026-10-17 | 100/100/100/100 live (`/`, `/projeler/`, `/projeler/lockbox-mobile/`); 404: 100/100/100 — median of 3, LHCI 0.15.1 / Lighthouse 12.6.1 against `https://ulascanerturk.github.io` | not run (unchanged since Faz 4) | 478 B gzip | Faz 5 live verification: all sitemap URLs 200, custom 404, HTTPS redirect, JSON-LD valid |
| 2026-10-17 | 100/100/100/100 on `/`, `/en/`, `/projeler/`, `/en/projects/`, `/projeler/lockbox-mobile/`, `/en/projects/lockbox-mobile/`; 404: 100/100/100 (SEO n/a) — median of 3, LHCI 0.15.1, local | 0 violations (axe-core 4.14.0, 7 pages × 2 themes) | 478 B gzip | Faz 6 (a) `check:dist`: 7 pages, 0 errors; hreflang pairs reciprocal; sitemap 6 URLs with alternates |
| 2026-10-17 | not run | not run | 480 B gzip (theme script only) | Faz 3 dist check: 4 pages, 0 errors, 0 warnings; one h1 per page; all internal links resolve; 360 px `scrollWidth = 360` on `/`, `/projeler/`, `/projeler/lockbox-mobile/`, `/404.html` (browser, dark theme) |

## Follow-ups

- Confirm ADR-007 ("Önerildi") with the lead when analytics comes up — init-references (ADR-008, ADR-010 accepted in Faz 0; ADR-003, ADR-004, ADR-009 in Faz 1; ADR-005 in Faz 2; ADR-006 in Faz 6).
- After the lead's push: live check of `/en/`, `/en/projects/`, `/en/projects/lockbox-mobile/` (200, hreflang, sitemap 6 URLs) and the LinkedIn Post Inspector for the English share image — Faz 6 acceptance "English version live".
- Lockbox store links (when published) must be added to both `lockbox-mobile.md` and `en/lockbox-mobile.md` — Faz 6.
- `ulascanerturk.md` stays Turkish-only; English site text is maintained as a translation in `profile.en.ts` — revisit if an English source document is wanted — Faz 6.
- Optional for the lead: install Node 24 locally to match CI; run `npx astro telemetry disable` once — Faz 0.
- `NODE_ENV=production` in the lead's environment makes npm skip devDependencies; use `npm install --include=dev` (documented in ADR-008, AGENTS.md) — Faz 0.
- Faz 0 task 2 text says "DOCS-ONLY"; mode name is "PLANS-ONLY" — cosmetic plan fix — init-references.
- Faz 1 risk table: check rendering on Windows and Android (system font stack) — only macOS was checked — Faz 1.
- Verify the site with JavaScript actually disabled in a browser (only simulated in Faz 1; the browser pane cannot disable JS) — lead, Faz 4 task 9.
- Faz 0 phase doc acceptance checkboxes are still unticked in `plans/fazlar/faz-0-proje-kurulumu.md` (progress lives here) — Faz 1.
- Lockbox: when the app is published, add the store `links`, update "Durum", `summary` and `ulascanerturk.md` §6 together (lead provides URLs) — Faz 3.
- VoiceOver check of `/` and `/projeler/lockbox-mobile/` (Faz 4 task 9) — lead.
- `site.description` (Faz 1, default meta for pages without their own — since Faz 4 no page uses it; 404 passes its message) is third person ("…geliştirir"); the profile text is first person (lead decision) — align when Faz 3/4 touches meta descriptions — Faz 2.
- `plans/01-mimari.md` §2 folder tree / §6.1 scripts do not yet show `src/components/layout/Seo.astro`, `scripts/images/`, `scripts/render-images.mjs`, `lighthouserc.json` and `npm run images` [PLAN DRIFT — cosmetic] — Faz 4.
- Google Rich Results Test and the LinkedIn Post Inspector on the live URLs (Lighthouse re-run on the live site done in Faz 5) — lead, Faz 4 §3 / Faz 5 task 7.
- Optional: Search Console / Bing Webmaster verification (Faz 5 task 8 — a verification file or meta tag is a separate small task) and the GitHub profile "Website" field (task 9) — lead.
