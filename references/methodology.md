# references/methodology.md — Methodology and Conventions

> Last updated: 2026-10-17 (Faz 6 — chore/faz-6-maintenance)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

Tooling exists since Faz 0 (Astro skeleton, ESLint, Prettier, Vitest, CI). The design
system and page shell exist since Faz 1 (tokens, theme, BaseLayout, layout/UI components, 404);
the profile page since Faz 2 (`src/data/profile.ts`, `src/components/profile/`);
the project collection and pages since Faz 3 (`src/content.config.ts`, `src/content/projects/`,
`src/components/projects/`, `ProjectLayout`); SEO, sharing, CSP and the dist/Lighthouse/axe checks since
Faz 4 (`Seo.astro`, `src/lib/seo.ts`, `scripts/check-dist.mjs`, `lighthouserc.json`); the English
version under `/en/` since Faz 6 (`src/lib/i18n.ts`, per-locale data, `HomeLayout`, `ProjectListLayout`).

## Core Philosophy

- Static, fast, accessible personal site; public professional information only.
- `plans/` is the spec; phases run in order 0 → 1 → (2 ∥ 3) → 4 → 5 → 6 (`plans/README.md` §3).
- `ulascanerturk.md` is the content source; no claim without a source or lead approval.
  Approved new facts (e.g. LockBox Mobile, LinkedIn) are added to `ulascanerturk.md` too.
- The lead (Ulaşcan) approves plans, wording, commits, merges and branch deletions.

## Invariants (Değişmez Kurallar)

From `plans/README.md` §4.

| # | Rule | Enforced by |
|---|---|---|
| 1 | Public professional info only — nothing from `ulascanerturk.md` §11's excluded list in content, meta, JSON-LD, EXIF or repo; §9 never published | `test-lint` §6 a–d, g (privacy scan); `git-commit` diff scan + EXIF check; review |
| 2 | Content accuracy — every claim backed by `ulascanerturk.md` or lead approval; keep §3/§5/§7 distinctions | `plan-feature` source column; `test-lint` §6 content accuracy review (manual); lead wording approval |
| 3 | Static and tracker-free — no server code, cookies, analytics, third-party runtime scripts; no secrets | `test-lint` §6 e, f, j; ADR required for exceptions |
| 4 | Accessible and fast — WCAG 2.2 AA; Lighthouse mobile ≥ 95; ≤ 10 KB client JS (gzip)/page | ESLint `astro/jsx-a11y/*` (via `eslint-plugin-jsx-a11y-x`) ✅; `test-lint` §7 dist checks (budget, headings, alt, links); §11 Lighthouse + axe |
| 5 | Generated output never committed; deploy only from `main` via Actions | `.gitignore` ✅; `merge-main` §2 grep; `git-commit` filter |
| 6 | No phase closes without acceptance criteria + quality gate | `phase_progress.md` evidence; `dev-workflow` |

## Layering

From `plans/01-mimari.md` §3. Enforced by review and `test-lint` §6 manual review (in use since Faz 1).

| Layer | Paths | May import | Must not import |
|---|---|---|---|
| Page | `src/pages/**` (incl. `src/pages/_shared/`) | layouts, components, data, lib, `astro:content`, `astro:assets` | — |
| Layout | `src/layouts/**` | components, data, lib | pages |
| Component | `src/components/**` | other components, lib | pages, layouts, `astro:content` |
| Data | `src/data/**`, `src/content/**` | lib (types only) | pages, layouts, components |
| Helper | `src/lib/**` | other lib modules | `.astro` components, `astro:*` modules |

## Astro / TypeScript Standards

Config in place (✅): `tsconfig.json`, `eslint.config.js`, `.prettierrc.json`, `.editorconfig`.
Rules not tied to config are enforced from Faz 1 onward.

- TypeScript `astro/tsconfigs/strict` + `noUncheckedIndexedAccess`; alias `@/*` → `src/*` (`paths` only — `baseUrl` is deprecated in TS 6) ✅.
- Prettier: `singleQuote`, `printWidth: 100`, `prettier-plugin-astro`; hand-written docs (`plans/`, `references/`, skills, root `*.md`) are excluded via `.prettierignore` ✅.
- `getCollection` / `getEntry` only in `src/pages`; components receive data via props.
- No hard-coded UI text in components — text lives in `src/data/*` or content files (prerequisite for Faz 6 `/en/`).
- Styles: tokens from `src/styles/tokens.css`; Astro scoped `<style>`; no CSS framework (ADR-003).
- Client JS: no UI framework (ADR-004); only the inline theme script (≤ 1 KB).
- UI text reaches components only as props: `BaseLayout` (or the page) reads `src/data/site.ts`
  and passes labels down; components never import `src/data/*` (Faz 1, e.g. `SiteHeader`).
  Components declare their own structural prop interfaces instead of importing data types.
- Page-level text (section titles, `id` anchors, intros, labels, notes, meta description) sits
  next to the page's facts in the same data file as a separate `{name}Page` object
  (`profile` + `profilePage` in `src/data/profile.{tr,en}.ts`, Faz 2 / Faz 6).
- **Languages (Faz 6, ADR-006).** `src/lib/i18n.ts` is the single route map (`routePath`,
  `projectPath`, `translatePath`, `alternatePaths`, `LOCALE_META`); never hard-code `/projeler/` or
  `/en/…` in layouts or pages — data files hold nav hrefs per locale. Text is keyed by `Locale`
  (`Record<Locale, …>` or one file per locale with the same type), so a missing translation is a
  type error; list parity is a Vitest test. Every page passes `locale` to its layout and
  `BaseLayout`, which sets `<html lang>`, `og:locale`, hreflang and the language link. Text in
  another language inside a page carries `lang` (404's English part). Project entries: Turkish at
  the collection root, English in `en/`; `loadProjects` fails the build on a missing translation.
  `astro.config.mjs` imports `src/lib/i18n.ts` (sitemap alternates) — keep that module free of
  path aliases and `astro:*` imports.
- **Shared page logic (Faz 6).** Pages of the two locales share their bodies through layouts
  (`HomeLayout`, `ProjectListLayout`, `ProjectLayout`) and their collection code through
  `src/pages/_shared/*.ts` (the `_` prefix keeps it out of routing; it is page layer, so it may use
  `astro:content` / `astro:assets`). Page files only pick the locale, load data and render a layout.
- Inline scripts that cannot be bundled live as a static string in `src/lib` and are executed by
  a Vitest test against a fake DOM, next to the pure function they mirror
  (`src/lib/theme.ts` `themeScript` ↔ `resolveTheme`). Rationale: tested + size-checked, no FOUC,
  CSP-hashable (ADR-004, ADR-011).
- Collection entries: pages call `getCollection('projects', ({ data }) => isPublished(data,
  import.meta.env.PROD))`, sort with `sortProjects` and map entries to plain props; layouts and
  components declare structural props and never import `astro:content` or `CollectionEntry`
  (`ProjectLayout`, `ProjectCard`, Faz 3). Enums used by the schema live in `src/lib`
  (`PROJECT_KINDS`, `PROJECT_STATUSES`) so helpers and schema share one source.
- Library helpers never contain UI text: wording is passed in (`formatPeriod(period, ongoing)`).
- Internal vs external actions: data marks an internal action with `href` and an external one with
  `kind` (resolved from `profile.links`); components get `external: boolean` and choose `<a>` or
  `ExternalLink` (ProfileHero, Faz 3).
- Styling child components: pass `class` and spread the remaining props onto the root element
  (Astro passes the parent's scope attribute that way — see `ExternalLink`).
- Theme selectors in scoped styles use `:global([data-theme='dark'])` /
  `:global(:root:not([data-theme]))`; colors come only from tokens (no hex outside `tokens.css`,
  except the self-contained `public/favicon.svg`).
- External links through `ExternalLink` (`rel="noopener noreferrer"`).
- `console.*` only in `scripts/` (ESLint `no-console: error`, off for `scripts/**`) ✅.
- Slugs/URLs: ASCII lowercase with hyphens (ç→c, ğ→g, ı/İ→i, ö→o, ş→s, ü→u), trailing slash.
- Accessibility: semantic landmarks; one `<h1>` per page; no skipped heading levels;
  meaningful `alt` (decorative → `alt=""`); visible `:focus-visible`; buttons for
  actions, links for navigation; targets ≥ 44×44 px; `prefers-reduced-motion`;
  contrast ≥ 4.5:1 text, ≥ 3:1 large text/UI.
- Fonts: system font stack (ADR-009); no external font/CDN/iframe requests.
- SEO (Faz 4): every page goes through `BaseLayout` → `Seo`; pages pass `title`/`description`
  (≤ 160) and optionally `ogType`, `image`, `jsonLd`. Titles and descriptions must be unique across
  pages (`check:dist`). JSON-LD is built in pages with the `src/lib/seo.ts` builders — never
  hand-written objects — and may not contain `FORBIDDEN_JSON_LD_KEYS`.
- CSP (ADR-011): Astro emits the meta policy with hashes for the `<script>`/`<style>` it renders.
  No `style="…"` attributes, no event-handler attributes, no third-party origins; Shiki stays off.
  CSP only exists in `build`/`preview` — check the browser console there after touching head/scripts.

## Content Rules

- **Source mapping:** every profile field names its `ulascanerturk.md` section
  (comment in `src/data/profile.ts`); project texts name their source and lead approval date
  (`references/content_schema.md`).
- **Wording distinctions** (`ulascanerturk.md`):
  - §3 — degree is International Relations (ESOGÜ, English); BAU/Wissen Java and
    ODTÜ Software Engineering are *training programs*, not degrees.
  - §5 — Insapption: "listed as Technology Officer on the company's public team page";
    titles may change.
  - §6 — "other work areas" are not presented as independent published products.
  - §7 — accelerator/program participations are in the Shifter context, not personal awards.
- **Never published:** §9 (agent working preferences) and everything §11 excludes.
  `ulascanerturk.md` is never copied to `public/` or `dist/`.
- **Translations (Faz 6):** English is a translation of the Turkish data — no new facts; the §3/§5/§6/§7
  distinctions are kept in English ("bachelor's degree" vs "training program", "in the context of
  the Shifter startup", "listed as Technology Officer…", "not an independent published product");
  every English text change needs lead approval like Turkish (approved 2026-10-17).
- **Decisions (2026-10-17):** projects = Lockbox (mobile) only (S1; page title uses the store name
  "Lockbox", slug `lockbox-mobile`, status "geliştirme aşamasında", no store/repo link); contact = GitHub + LinkedIn,
  no e-mail/phone (S2); monogram avatar, no photo (S3); profile text in the first person (Faz 2).
- **Images:** via `astro:assets` with width/height; metadata stripped
  (`exiftool -all= {file}`) and verified; usage rights confirmed; screenshots
  only with sample data.

## Documented Exceptions

| Rule | Exception | Location | Reason | Approved |
|---|---|---|---|---|
| Tokens only (no hex outside `tokens.css`) | Hard-coded light-theme hex colors | `scripts/images/*.html` (share image + touch icon sources), `public/favicon.svg` | Self-contained image sources rendered to PNG; they mirror `tokens.css` | Faz 1 (favicon), Faz 4 plan approval 2026-10-17 |
| Invariant 1 / S2 (no e-mail) — `test-lint` §6 a, b | Public app-support address `ulascanerturk@gmail.com` + `mailto:` | `src/data/projectDocs.ts › projectContacts` → rendered only by `ProjectDocLayout` on the six Lockbox document pages (`/projeler/lockbox-mobile/{gizlilik,destek,guvenlik}/`, `/en/projects/lockbox-mobile/{privacy,support,security}/`) | App Store / Google Play require a public privacy and support contact (ADR-014). Profile, header/footer and JSON-LD still carry no e-mail (`profile.test.ts`). Any other hit is still a FAIL | lead, 2026-10-17 |

## Versions (verified 2026-10-17 — npm registry, nodejs.org dist index)

| Tool | Version | Notes |
|---|---|---|
| Node.js | `.nvmrc` = 24 (Active LTS Krypton); `engines.node` = `>=22.22.0` | CI/deploy on 24; local dev on Node 22.23.1 is supported (Astro minimum) |
| npm | 10.9.8 (local) | lockfile committed; CI uses `npm ci` |
| astro | ^7.4.0 | |
| @astrojs/check | ^0.9.10 | peer TS `^5 \|\| ^6` |
| typescript | ~6.0.3 | pinned below 7 — `typescript-eslint` needs `<6.1.0` (ADR-010) |
| eslint / @eslint/js | ^10.13.0 / ^10.0.1 | config via `defineConfig` from `eslint/config` |
| typescript-eslint | ^8.71.2 | |
| eslint-plugin-astro | ^3.2.1 | loads `eslint-plugin-jsx-a11y-x` automatically |
| eslint-plugin-jsx-a11y-x | ^0.2.0 | replaces `eslint-plugin-jsx-a11y` (no ESLint 10 support) — ADR-010 |
| globals | ^17.13.0 | |
| prettier / prettier-plugin-astro | ^3.9.10 / ^1.1.1 | |
| vitest | ^5.0.5 | config via `getViteConfig` from `astro/config` |
| @astrojs/sitemap | ^3.7.4 | `dependencies`; ADR-012 (verified 2026-10-17, npm registry) |
| @lhci/cli | ^0.15.1 | `devDependencies`, bundles lighthouse 12.6.1 + axe-core 4.14.0; ADR-013; local only |
| GitHub Actions | `actions/checkout@v7`, `actions/setup-node@v7`, `withastro/action@v6`, `actions/deploy-pages@v5` | latest major tags 2026-10-17 |

### Environment Notes
- If `NODE_ENV=production` is set (it is in the lead's current environment), npm omits
  devDependencies: install with `npm install --include=dev`.
- Astro CLI telemetry: disabled in CI/deploy via `ASTRO_TELEMETRY_DISABLED=1`;
  locally run `npx astro telemetry disable` once (machine setting).

## Git Conventions

- Repository: `main`; remote `origin` = `github.com/ulascanerturk/ulascanerturk.github.io` (created by the lead 2026-10-17 — Faz 5 task 3).
- Branches: `{type}/faz-{N}-{desc}` for phase work, `{type}/{domain}/{desc}` otherwise (`git-start`).
  Types: feat · fix · refactor · test · chore · content · perf · docs · release.
- Conventional Commits; scope = domain from the branch; English, imperative, ≤ 72 chars.
- Stage files explicitly (never `git add -A` / `.`); commit only after lead approval.
- Local squash merge into `main` (`merge-main`), branch deleted after tree-equality proof (`delete-branch`).
- The workflow never pushes. Since Faz 5, pushing `main` deploys the site (after the CI gate) — the lead pushes.
- `main` ruleset (lead, Faz 5 task 5): block force pushes and deletion only — no required status
  checks and no required PRs, because local squash merges are pushed directly (a new commit has no
  status yet, so a required check would reject the push). The gate lives in `deploy.yml`.
- Bootstrap exception: the initial commits (plans, skills, S1–S6 decisions) were made directly on `main` with lead approval.

## Testing Conventions

- Vitest for `src/lib` (`*.test.ts` beside the module; `vitest.config.ts` includes `src/**/*.test.ts`) ✅ — first suite: `src/lib/slug.test.ts`.
- `astro build` = content schema validation.
- Vitest also includes `scripts/**/*.test.ts` (Faz 4): `scripts/check-dist.test.ts` tests the checker itself.
- Built-HTML checks: `npm run check:dist` (`scripts/check-dist.mjs`, no dependencies, CI step after build).
  Per page: `lang`, non-empty `<title>`, description present and ≤ 160, exactly one `<h1>`, no skipped
  heading level, `<img>` alt + width/height, internal links resolve in `dist/`, `target=_blank` has
  `noopener`, canonical = `{site}{path}` (none on noindex pages), `og:type/title/description/url/image/
  image:alt/locale` + `twitter:card=summary_large_image` on indexable pages, `og:image` exists in
  `dist/`, JSON-LD parses / schema.org context / no forbidden keys, CSP meta with `default-src 'self'`,
  client JS ≤ 10 KB gzip. Languages (Faz 6): `lang` = `en` under `/en/`, else `tr`; `og:locale`
  matches `lang` (`OG_LOCALES`, mirror of `LOCALE_META`); indexable pages have hreflang alternates
  incl. themselves and `x-default`, every target built, `og:locale:alternate` present; noindex pages
  have none. Site: unique titles and descriptions (site-wide, across languages), reciprocal hreflang
  pairs whose targets declare that `lang`, sitemap lists every indexable page and no noindex page and
  nothing unbuilt, robots.txt has the `Sitemap:` line. The tokenizer searches raw
  text case-insensitively without `toLowerCase()` ("İ" changes string length).
- Lighthouse ≥ 0.95 (mobile, every category; 404 without SEO because of `noindex`) via `npm run lhci`
  at phase close / on request — local only (ADR-013).
- axe 0 violations at phase close: `npx @axe-core/cli` needs a ChromeDriver matching local Chrome
  (`npx browser-driver-manager install chrome`). Without it (Faz 4): copy
  `node_modules/axe-core/axe.min.js` into `dist/` temporarily, open each page via `astro preview`, load it
  with a `<script src>` (allowed by CSP `'self'`), run `axe.run` with wcag2a/aa, wcag21a/aa, wcag22aa,
  best-practice in both themes, then delete the copy. axe reports `color-contrast` as *incomplete* for
  off-screen text in a hidden browser pane — cross-check with a computed-style contrast pass.
- Agent skills: `.claude/skills/` (Claude Code, `/skill`) and `.agents/skills/` (Codex, `$skill`) — kept in sync.

## Commands

| Purpose | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Typecheck | `npm run check` |
| Lint | `npm run lint -- --max-warnings 0` |
| Format | `npm run format` / `npm run format:check` |
| Unit tests | `npm test` |
| Dist checks | `npm run check:dist` (after `npm run build`) |
| Lighthouse CI | `npm run lhci` (local Chrome; reports in `.lighthouseci/`) |
| Share image / touch icon | `npm run images` (local Chrome + ImageMagick) |

## Release and Rollback (Faz 5 task 10)

Site URL `https://ulascanerturk.github.io/` (no custom domain — S5; no `CNAME`). Repository
`ulascanerturk/ulascanerturk.github.io` (public), Pages source "GitHub Actions" (ADR-002).

**Release.** The workflow ends with a local squash merge into `main`; the lead pushes
(`git push origin main`). `deploy.yml` then runs `quality-gate` (the whole `ci.yml` via
`workflow_call`) → `build` (`withastro/action`) → `deploy` (`actions/deploy-pages`). A failing gate
stops the run before anything is published; the previous deployment stays live. Runs are queued, not
cancelled (`concurrency: pages`). After each push: run status green
(`gh run list --workflow deploy.yml --limit 1`) and the live check below.

**Live check.** `curl -sI https://ulascanerturk.github.io/` → `200` + `content-type: text/html`;
every route in `sitemap-0.xml` → `200`; `/olmayan-sayfa/` → `404` with the custom page;
`http://` redirects to `https://`. Lighthouse on live URLs at phase close.

**Rollback** (faulty release is live):
1. Fastest — re-deploy the last good build: *Actions → Deploy to GitHub Pages →* last successful run
   → *Re-run all jobs* (`gh run rerun {run-id}`; possible up to 30 days after the run). Re-runs use that run's commit, so this only
   restores the site; `main` still holds the faulty commit and the next push publishes it again.
2. Permanent — revert on `main`: `git revert {hash}` (squash merges are single commits) → quality gate
   locally → lead pushes → deploy runs as usual. Use this after step 1 or instead of it.
3. Never `git push --force` / `git reset` on the remote `main` (ruleset blocks force pushes and
   deletion; history is the audit trail).
4. Afterwards: live check, then record the incident and the fix in `references/phase_progress.md`
   → Follow-ups.

## Maintenance (Faz 6 §2.2 tasks 7 and 9)

Content updates (profile, projects, translations): `references/content_schema.md` → How to Update
the Profile / How to Add a Project. Everything below runs through the normal `dev-workflow` unless
noted.

### Dependabot (`.github/dependabot.yml`)

- **What it does:** monthly, for `npm` and `github-actions`, after a 7-day cooldown (fresh releases
  are not picked up at once). npm minor + patch updates arrive as one grouped pull request
  (`npm-minor-patch`), majors one by one; GitHub Actions updates as one group. Commit messages are
  `chore(deps): …` / `chore(deps-dev): …`. `typescript` minor/major updates are ignored (ADR-010:
  `typescript-eslint` needs `< 6.1`) — remove the `ignore` entry once it supports a newer TypeScript.
- **Pull requests run `ci.yml`** (`pull_request` trigger; read-only token, no secrets needed).
- **Merging (lead, on GitHub):** CI green → read the release notes/changelog of each bump (breaking
  changes, Astro/integration notes, Node requirement) → *Squash and merge*. Merging pushes `main`
  and deploys after the `deploy.yml` quality gate; do the live check afterwards
  (Release and Rollback above).
- **Local sync afterwards:** `git checkout main && git pull --ff-only origin main` before the next
  branch. If local `main` has unpushed commits, push them first (or `git pull --rebase origin main`
  — never force-push; the ruleset blocks it).
- **Majors** (Astro, ESLint, Vitest, TypeScript, actions): not merged straight from the PR — plan
  them as a `chore/deps/{name}-{major}` task (migration guide, `test-lint all`, Lighthouse), update
  the Versions table above and the ADR that names the tool. Close the Dependabot PR afterwards.
- **Repository settings (lead):** Dependabot status under *Insights → Dependency graph → Dependabot*
  (shows config errors). Dependabot alerts / security updates are a repository security setting
  (*Settings → Code security*) — the lead's decision; security updates were **disabled** on 2026-10-17.

### Quarterly Checklist (January, April, July, October)

Run on `main` after `git pull --ff-only`; record the results as a row in
`references/phase_progress.md` → Audits and new problems under Follow-ups.

1. **Links** — internal links/anchors and external links in the built site:
   ```bash
   npm run build
   lychee --no-progress --root-dir "$PWD/dist" --index-files index.html --include-fragments \
     --exclude '^https://ulascanerturk\.github\.io/' --max-concurrency 4 \
     --accept '200..=299,999' 'dist/**/*.html'
   ```
   lychee is a local tool (`brew install lychee`; 0.24.2 verified 2026-10-17), not a project
   dependency. The site's own absolute URLs (canonical, hreflang, `og:url`) are excluded — they are
   covered by `check:dist` and the live check (before a deploy they would 404). LinkedIn answers bots
   with `999` (accepted): open `https://www.linkedin.com/in/ulascanerturk` in a browser instead.
   A dead external link is a content change (lead approval), not a code fix.
2. **Lighthouse and axe** — `npm run lhci` (local, all 7 URLs) and once against the live URLs
   (Faz 5 method); axe per Testing Conventions. Thresholds: ≥ 0.95 every category, 0 violations.
3. **Dependencies** — merge or plan the open Dependabot PRs; `npm outdated`;
   `npm audit --omit=dev --audit-level=high`; Node: is `.nvmrc` still the Active LTS
   (nodejs.org release schedule) and does Astro still accept `engines.node`?; TypeScript pin
   (ADR-010) still needed?; GitHub Actions on current major tags. Version changes → Versions table.
4. **Content consistency** — `ulascanerturk.md` `last_updated` vs `profile.lastUpdated` in
   `profile.tr.ts` and `profile.en.ts`; read the sections mapped in `references/content_schema.md`
   against the site (titles, roles, links, Lockbox status — store links once published); English
   text still a faithful translation; nothing from §9/§11 (`test-lint` §6 scan).
5. **Live check** — every sitemap URL `200`, custom 404, `http` → `https`; Google Rich Results Test
   and a share preview (LinkedIn Post Inspector) for `/` and `/en/`.
6. **Record** — Audits row (date, Lighthouse, axe, max JS, links result) + Follow-ups.

## Known Gaps / Review Needed

- `@axe-core/cli` 4.14's ChromeDriver supports Chrome 152; local Chrome is 155 — see Testing Conventions for the axe fallback.
- `actionlint` and `exiftool` are not installed locally (`lychee` is, since Faz 6 — Homebrew): workflow changes are verified by their first GitHub run (first deploy run green, Faz 5); image metadata checks need `exiftool` (or `mdls` on macOS) once images are added.
- [REVIEW NEEDED] ADR-007 is "Önerildi"; confirm with the lead when analytics is discussed (ADR-003, ADR-004, ADR-009 accepted 2026-10-17 with the Faz 1 plan; ADR-005 with the Faz 2 plan; ADR-006 with the Faz 6 plan).
- The browser pane's screenshot tool injects inline styles that the CSP blocks — "Applying inline style violates…" console errors after a screenshot are not from the site. Check the console in a fresh tab without screenshots (Faz 6).
- `localhost:4321` may be taken by another local project (IPv4) while `astro preview` binds IPv6 — use `npx astro preview --port 4329` for browser checks (Faz 6).
- [PLAN DRIFT — plans/fazlar/faz-0-proje-kurulumu.md §3 task 2 says "DOCS-ONLY"; the skill's mode name is "PLANS-ONLY"] naming only.
