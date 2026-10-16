# references/phase_progress.md — Phase Progress

> Last updated: 2026-10-17 (init-references, PLANS-ONLY mode)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

## Current Phase

**Faz 0 — Proje Kurulumu: in progress** (tasks 1–2 done). Next unblocked phase
after Faz 0 closes: Faz 1. Overall: tasks 2/70 · acceptance 2/47.

## Open Questions

| # | Question | Answer | Date | Decided by |
|---|---|---|---|---|
| S1 | Which projects get pages? | LockBox Mobile only (no macOS); Shifter Pro/Lite in profile experience | 2026-10-17 | lead |
| S2 | Contact channels besides GitHub? | GitHub + LinkedIn; no e-mail/phone — LinkedIn URL ⏳ pending (Faz 2) | 2026-10-17 | lead |
| S3 | Profile image? | Monogram (UE) SVG; no photo | 2026-10-17 | lead |
| S4 | English version? | Yes, after v1 (Faz 6, `/en/`) | 2026-10-17 | lead |
| S5 | Custom domain? | No; `ulascanerturk.github.io` | 2026-10-17 | lead |
| S6 | ADR-001 (Astro)? | Accepted | 2026-10-17 | lead |

Pending lead inputs: LinkedIn URL (Faz 2), profile footnote decision (Faz 2 task 7),
LockBox Mobile publication status + text approval (Faz 3), robots.txt AI crawler
policy (Faz 4 task 5), Lighthouse CI in CI (Faz 4 task 10).

## Faz 0 — Proje Kurulumu   (plans/fazlar/faz-0-proje-kurulumu.md)
Status: in progress
### Tasks
- [x] 1. ADR-001 approval — `plans/ekler/karar-kayitlari.md` "Kabul edildi (2026-10-17)", commit 640534e
- [x] 2. Reference maps — `references/*.md` created by init-references (PLANS-ONLY), uncommitted
- [ ] 3. Verify Astro + Node LTS versions; `.nvmrc`, `engines`, ADR-008
- [ ] 4. Astro skeleton (temp dir, then move; placeholder index page)
- [ ] 5. `astro.config.mjs`
- [ ] 6. TypeScript config
- [ ] 7. ESLint + Prettier + `.editorconfig`
- [ ] 8. Vitest + `src/lib/slug.ts` and test
- [ ] 9. npm scripts
- [ ] 10. CI workflow
- [ ] 11. Deploy workflow (`workflow_dispatch` only)
- [ ] 12. Documentation (AGENTS.md commands, methodology versions)
### Acceptance Criteria
- [x] ADR-001 accepted — karar-kayitlari.md
- [x] `references/` exists with four map files — this run
- [ ] `.nvmrc` and `engines` show the verified Node LTS
- [ ] All quality-gate commands pass with zero errors/warnings
- [ ] CI workflow syntax valid (actionlint, or noted for first push in Faz 5)
- [ ] `dist/`, `.astro/`, `node_modules/` not committed
- [ ] Checklist: Genel, Dağıtım reviewed

## Faz 1 — Tasarım Sistemi ve Layout   (plans/fazlar/faz-1-tasarim-sistemi-ve-layout.md)
Status: not started (blocked by Faz 0)
### Tasks
- [ ] 1. Tokens — `src/styles/tokens.css`
- [ ] 2. Global styles — `src/styles/global.css`
- [ ] 3. Contrast verification → table in `references/site_map.md`
- [ ] 4. `src/data/site.ts`
- [ ] 5. `BaseLayout.astro`
- [ ] 6. Layout components (SkipLink, SiteHeader, SiteFooter, ThemeToggle)
- [ ] 7. UI components (Section, Tag, ExternalLink, Callout)
- [ ] 8. Monogram avatar + favicon (S3 decided: monogram)
- [ ] 9. `404.astro`
- [ ] 10. (Optional) dev-only style guide
### Acceptance Criteria
- [ ] All token pairs meet contrast thresholds
- [ ] Light/dark toggle without FOUC, preference persisted
- [ ] Site readable and navigable without JS
- [ ] ≤ 1 KB client JS per page (theme script only)
- [ ] No horizontal scroll at 360 px
- [ ] Quality gate PASS (`site`)
- [ ] Checklist: Genel, Erişilebilirlik, Performans reviewed

## Faz 2 — Profil Sayfası   (plans/fazlar/faz-2-profil-sayfasi.md)
Status: not started (blocked by Faz 1)
### Tasks
- [ ] 1. LinkedIn URL from lead → `ulascanerturk.md` §10 + `profile.ts` (⏳ URL pending)
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
Status: not started (blocked by Faz 1)
### Tasks
- [ ] 1. LockBox Mobile facts from lead → `ulascanerturk.md` §6
- [ ] 2. Collection schema — `src/content.config.ts`
- [ ] 3. `src/lib/projects.ts`
- [ ] 4. Project components
- [ ] 5. `ProjectLayout.astro`
- [ ] 6. Pages (`/projeler/`, `/projeler/[slug]/`)
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
| — | not run | not run | — | no site yet |

## Follow-ups

- Profile type needs a field for §6 work areas (`WorkAreas` component) — init-references, see `content_schema.md`.
- Confirm ADR-003 … ADR-010 ("Önerildi") with the lead when their phases start — init-references.
- Faz 0 task 2 text says "DOCS-ONLY"; mode name is "PLANS-ONLY" — cosmetic plan fix — init-references.
- `Seo.astro` folder (`src/components/` root vs a subfolder) not fixed in plans — decide in Faz 4 planning.
