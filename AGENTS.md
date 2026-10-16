# ulascanerturk.github.io — Agent Instructions

## Project Overview

Personal site of **Ulaşcan Ertürk** published at `https://ulascanerturk.github.io`:
a profile page (`/`) and one static page per project (`/projeler/{slug}/`).
Planned stack: **Astro (static output) · TypeScript strict · native CSS ·
GitHub Pages via GitHub Actions** — no client framework, no analytics.

The specification lives in `plans/` (Turkish) and is the source of truth:

| Doc | Content |
|---|---|
| `plans/README.md` | Index, phase graph, **Değişmez Kurallar** (invariants), open questions S1–S6 |
| `plans/01-mimari.md` | Stack, folder structure, layering, content model, routing, scripts, CI/CD |
| `plans/02-icerik-ve-tasarim.md` | Audience, site map, content inventory, design direction |
| `plans/fazlar/faz-0 … faz-6` | Phases with task lists and acceptance criteria |
| `plans/ekler/` | ADRs (`karar-kayitlari.md`), per-change checklist (`kontrol-listesi.md`) |

Content source: `ulascanerturk.md` (profile facts, wording distinctions, and
§11 — what must never be published). Phases run in order:
0 → 1 → (2 ∥ 3) → 4 → 5 → 6. Current state of the code and phases: `references/`.

## Invariants (never violate)

1. Public professional information only — nothing from `ulascanerturk.md` §11's excluded list
   (private e-mail/phone, address detail, birth date, family, health, finance, IDs, IP/SSH,
   credentials, client contracts) in content, meta tags, JSON-LD, image EXIF or the repo. §9 is never published.
2. Content accuracy — every claim is backed by `ulascanerturk.md` or the lead's approval; keep its
   distinctions (degree = International Relations; software courses are training programs;
   accelerator programs are in the Shifter context; titles may change). No invented metrics, clients, awards.
3. Static and tracker-free — no server code, cookies, analytics or third-party runtime scripts
   (exceptions only via ADR); no secrets in the repo.
4. Accessible and fast — WCAG 2.2 AA; Lighthouse (mobile) ≥ 95 in every category; ≤ 10 KB client JS (gzip) per page.
5. Generated output is never committed (`dist/`, `.astro/`, `node_modules/`); deploys happen only from `main` via GitHub Actions.
6. A phase is not closed until its acceptance criteria and quality gate are complete.

Per-change checklist: `plans/ekler/kontrol-listesi.md`.

## Architecture Rules

- Dependencies point one way: `src/pages` → `src/layouts` → `src/components` → `src/lib`;
  data comes from `src/data/*` and `astro:content`.
- `getCollection` / `getEntry` only in `src/pages`; components receive data via props.
- `src/lib` is pure TypeScript (no `astro:*`, no `.astro` imports) and is unit-tested with Vitest.
- No hard-coded UI text in components — it lives in `src/data/*` or content files.
- Styles use tokens from `src/styles/tokens.css`; no CSS framework (ADR-003); no client framework (ADR-004).
- External links via `ExternalLink` (`rel="noopener noreferrer"`); images via `astro:assets`
  with metadata stripped.
- Every new dependency gets an ADR in `plans/ekler/karar-kayitlari.md`.

## Commands (available after Faz 0)

```bash
npm install
npm run dev            # astro dev
npm run build          # astro build (validates content schemas)
npm run preview        # astro preview
npm run check          # astro check
npm run lint           # eslint . (run with --max-warnings 0)
npm run format:check   # prettier --check .
npm test               # vitest run
npm run check:dist     # built-HTML checks (from Faz 4)
npm run lhci           # Lighthouse CI (from Faz 4)
```

The git repository is initialized on `main` with no remote; the remote and
GitHub Pages are set up in Faz 5 by the lead. Pushing `main` deploys the site.

## Development Workflow (13 steps)

Every change goes through the `dev-workflow` skill — the entry point:

| Step | Skill | Purpose |
|---|---|---|
| — | `init-references` | One-time: generate `references/*.md` (works before Faz 0) |
| 1 | `git-start` | Branch: `{type}/faz-{N}-{desc}` or `{type}/{domain}/{desc}` |
| 2 | `read-references` | Load maps + phase doc + ADRs + checklist + content source |
| 3 | `plan-feature` | Read-only plan → lead approval |
| 4 | `implement-plan` | Implement exactly the approved plan |
| 5 | `test-lint` | astro check, lint, format, Vitest, build, privacy/content scan, dist checks |
| 6 | `fix-plan` | Root-cause fix plan → lead approval (only on FAIL) |
| 7 | `implement-fix` | Apply approved fixes only |
| 8 | `test-lint` | Re-run gate (max 3 fix cycles, then escalate) |
| 9 | `update-references` | Update maps + phase progress (mandatory) |
| 10 | `git-commit` | Conventional Commit after approval |
| 11 | `merge-main` | Local squash merge into `main` after approval (no push) |
| 12 | `delete-branch` | Delete branch after tree-equality proof + approval |
| 13 | — | Completion report |

Skills live in `.agents/skills/` (Codex, invoke as `$skill-name`) and
`.claude/skills/` (Claude Code, invoke as `/skill-name`); both sets have the same content.

## Reference Maps (`references/`)

| File | Holds |
|---|---|
| `methodology.md` | Standards, layering, invariants + documented exceptions, content rules, versions, git/test conventions |
| `site_map.md` | Routes, layouts, components, tokens + contrast, client JS, `src/lib`, config, CI/CD |
| `content_schema.md` | Profile ↔ `ulascanerturk.md` mapping, collection schemas, project entries, images |
| `phase_progress.md` | Faz 0–6 task and acceptance-criteria status, S1–S6 answers, audits |

`references/` does not exist yet — run `init-references` before the first task.
Read the maps before planning; update them after every validated change.

## Communication

The lead (Ulaşcan) prefers Turkish for conversation; code, identifiers, commit
messages and skill files are in English. Be analytical: state costs, risks and
limitations alongside benefits, and separate assumptions from verified facts.
