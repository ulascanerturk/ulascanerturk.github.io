# references/methodology.md — Methodology and Conventions

> Last updated: 2026-10-17 (init-references, PLANS-ONLY mode)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

No code or config exists yet. Rules below come from `plans/`; tooling that
enforces them is `[PLANNED — plans/fazlar/faz-0-proje-kurulumu.md §3]`.

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
| 4 | Accessible and fast — WCAG 2.2 AA; Lighthouse mobile ≥ 95; ≤ 10 KB client JS (gzip)/page | ESLint jsx-a11y [PLANNED]; `test-lint` §7 dist checks (budget, headings, alt, links); §11 Lighthouse + axe |
| 5 | Generated output never committed; deploy only from `main` via Actions | `.gitignore` ✅; `merge-main` §2 grep; `git-commit` filter |
| 6 | No phase closes without acceptance criteria + quality gate | `phase_progress.md` evidence; `dev-workflow` |

## Layering

From `plans/01-mimari.md` §3. Enforced by review and `test-lint` §6 manual review. [PLANNED]

| Layer | Paths | May import | Must not import |
|---|---|---|---|
| Page | `src/pages/**` | layouts, components, data, lib, `astro:content` | — |
| Layout | `src/layouts/**` | components, data, lib | pages |
| Component | `src/components/**` | other components, lib | pages, layouts, `astro:content` |
| Data | `src/data/**`, `src/content/**` | lib (types only) | pages, layouts, components |
| Helper | `src/lib/**` | other lib modules | `.astro` components, `astro:*` modules |

## Astro / TypeScript Standards [PLANNED — plans/01-mimari.md §1–§3, faz-0 §3]

- TypeScript `astro/tsconfigs/strict` + `noUncheckedIndexedAccess`; alias `@/*` → `src/*`.
- `getCollection` / `getEntry` only in `src/pages`; components receive data via props.
- No hard-coded UI text in components — text lives in `src/data/*` or content files (prerequisite for Faz 6 `/en/`).
- Styles: tokens from `src/styles/tokens.css`; Astro scoped `<style>`; no CSS framework (ADR-003).
- Client JS: no UI framework (ADR-004); only the inline theme script (≤ 1 KB).
- External links through `ExternalLink` (`rel="noopener noreferrer"`).
- `console.*` only in `scripts/` (ESLint `no-console: error`).
- Slugs/URLs: ASCII lowercase with hyphens (ç→c, ğ→g, ı/İ→i, ö→o, ş→s, ü→u), trailing slash.
- Accessibility: semantic landmarks; one `<h1>` per page; no skipped heading levels;
  meaningful `alt` (decorative → `alt=""`); visible `:focus-visible`; buttons for
  actions, links for navigation; targets ≥ 44×44 px; `prefers-reduced-motion`;
  contrast ≥ 4.5:1 text, ≥ 3:1 large text/UI.
- Fonts: system font stack (ADR-009); no external font/CDN/iframe requests.

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
- **Decisions (2026-10-17):** projects = LockBox Mobile only (S1); contact = GitHub + LinkedIn,
  no e-mail/phone (S2); monogram avatar, no photo (S3).
- **Images:** via `astro:assets` with width/height; metadata stripped
  (`exiftool -all= {file}`) and verified; usage rights confirmed; screenshots
  only with sample data.

## Documented Exceptions

| Rule | Exception | Location | Reason | Approved |
|---|---|---|---|---|
| — | none yet | — | — | — |

## Versions [REVIEW NEEDED — verify in Faz 0 task 3]

| Tool | Version | Verified | Source |
|---|---|---|---|
| Astro | current stable — not pinned | ⬜ | astro.build |
| Node.js | current Active LTS — not pinned (`.nvmrc` [PLANNED]) | ⬜ | nodejs.org |
| npm | bundled with Node | ⬜ | — |

## Git Conventions

- Repository: initialized on `main`; no remote until Faz 5 (lead creates it).
- Branches: `{type}/faz-{N}-{desc}` for phase work, `{type}/{domain}/{desc}` otherwise (`git-start`).
  Types: feat · fix · refactor · test · chore · content · perf · docs · release.
- Conventional Commits; scope = domain from the branch; English, imperative, ≤ 72 chars.
- Stage files explicitly (never `git add -A` / `.`); commit only after lead approval.
- Local squash merge into `main` (`merge-main`), branch deleted after tree-equality proof (`delete-branch`).
- The workflow never pushes. After Faz 5, pushing `main` deploys the site — the lead pushes.
- Bootstrap exception: the initial commits (plans, skills, S1–S6 decisions) were made directly on `main` with lead approval.

## Testing Conventions [PLANNED — plans/01-mimari.md §6, faz-0 §4, faz-4 §2]

- Vitest for `src/lib` (`*.test.ts` beside the module).
- `astro build` = content schema validation.
- Built-HTML checks: `scripts/check-dist.mjs` from Faz 4; until then the Python fallback in `test-lint` §7.
- Lighthouse ≥ 0.95 (mobile, every category) and axe 0 violations at phase close from Faz 4.
- Agent skills: `.claude/skills/` (Claude Code, `/skill`) and `.agents/skills/` (Codex, `$skill`) — kept in sync.

## Commands [PLANNED — plans/01-mimari.md §6.1]

| Purpose | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Typecheck | `npm run check` |
| Lint | `npm run lint -- --max-warnings 0` |
| Format | `npm run format` / `npm run format:check` |
| Unit tests | `npm test` |
| Dist checks | `npm run check:dist` (Faz 4) |
| Lighthouse CI | `npm run lhci` (Faz 4) |

## Release and Rollback [PLANNED — plans/fazlar/faz-5-yayin-ve-dagitim.md §2 task 10]

Site URL `https://ulascanerturk.github.io` (no custom domain — S5). Rollback:
`git revert {hash}` + push, or re-run the last successful deploy workflow.

## Known Gaps / Review Needed

- [REVIEW NEEDED] Astro / Node versions unverified (Faz 0 task 3).
- [REVIEW NEEDED] ADR-003 … ADR-010 are "Önerildi"; confirm with the lead when the relevant phase starts.
- [PLAN DRIFT — plans/fazlar/faz-0-proje-kurulumu.md §3 task 2 says "DOCS-ONLY"; the skill's mode name is "PLANS-ONLY"] naming only.
