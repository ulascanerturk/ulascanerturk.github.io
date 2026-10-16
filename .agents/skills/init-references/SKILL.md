---
name: init-references
description: >
  One-time bootstrap skill for ulascanerturk.github.io. Analyzes the plans/
  specification, the content source ulascanerturk.md and whatever code
  exists, then generates the missing references/ files (methodology.md,
  site_map.md, content_schema.md, phase_progress.md). Works before Faz 0
  (plans-only, entries marked [PLANNED]) and on an existing codebase. Skips
  files that already exist. Never run as part of the regular dev-workflow —
  use update-references.
---

# Skill: $init-references

## Usage

```
$init-references
```

No arguments. Run once from the project root when `references/` files do not
yet exist. The skill reads the plans, detects how much of the site is
implemented, explores the real code, and writes only the missing files.

---

## Cardinal Rules

1. **One-time only.** If all four reference files exist, report that the
   project is bootstrapped and exit. Do not overwrite.
2. **Read before write.** Explore every relevant plan and source file BEFORE
   generating output. Never invent content — every entry must be traceable to
   a file on disk (code), a plan section (design) or a `ulascanerturk.md`
   section (content).
3. **Implemented vs planned.** An entry backed by code gets its real path and
   signature/props. An entry known only from `plans/` is marked
   `[PLANNED — plans/{file} §{section}]`. Never present a planned item as implemented.
4. **Approval before write.** Present a complete generation plan. Write
   nothing until the lead approves.
5. **Accurate over complete.** If something cannot be determined reliably,
   mark it `[REVIEW NEEDED]`.
6. **Never touch existing files.** Skip any reference file that already exists.
7. **No private data.** References are committed to a public repo — they follow
   Değişmez Kural 1 like the site itself.

---

## Phase 1 — Pre-flight

### 1A. Check `references/`

```bash
ls references/ 2>/dev/null || echo "references/ does not exist"
```

```
PRE-FLIGHT CHECK:
──────────────────────────────────────────────────────────────
  references/methodology.md     → exists ✅ (SKIP) | missing ⬜ (GENERATE)
  references/site_map.md        → exists ✅ (SKIP) | missing ⬜ (GENERATE)
  references/content_schema.md  → exists ✅ (SKIP) | missing ⬜ (GENERATE)
  references/phase_progress.md  → exists ✅ (SKIP) | missing ⬜ (GENERATE)
──────────────────────────────────────────────────────────────
```

If all four exist:
```
✅ All reference files already exist. Project is fully bootstrapped.
   Use $update-references after each validated change to keep them current.
```
Then stop.

### 1B. Project State Detection

```bash
test -f package.json && grep -E '"astro"' package.json
ls astro.config.mjs astro.config.ts tsconfig.json eslint.config.js vitest.config.ts 2>/dev/null
ls -d src/pages src/layouts src/components src/content src/data src/lib src/styles public scripts .github/workflows 2>/dev/null
find src -type f \( -name '*.astro' -o -name '*.ts' -o -name '*.md' -o -name '*.css' \) 2>/dev/null | wc -l
git rev-parse --is-inside-work-tree 2>/dev/null && git log --oneline -20
```

```
PROJECT STATE:
──────────────────────────────────────────────────────────────
  Astro project     : detected ✅ (Astro {N}) | not bootstrapped ─
  src/pages         : {N} files | none
  src/components    : {N} files | none
  Projects content  : {N} entries | none
  CI workflows      : {list} | none
  Git repository    : yes ({N} commits) | no
  Mode              : PLANS-ONLY (pre-Faz 0) | PARTIAL | IMPLEMENTED
──────────────────────────────────────────────────────────────
```

All four files are always relevant for this project.

---

## Phase 2 — Deep Exploration

Complete ALL exploration before writing anything.

### Exploration A: Specification (always)

Read in full:
```
plans/README.md                      → invariants, phase graph, open questions S1–S6
plans/01-mimari.md                   → stack, folders, layering, content model, routing, scripts, CI/CD
plans/02-icerik-ve-tasarim.md        → audience, site map, content inventory, design direction
plans/fazlar/faz-0 … faz-6           → task lists, tests, acceptance criteria
plans/ekler/karar-kayitlari.md       → ADR-001 … ADR-0NN and their status
plans/ekler/kontrol-listesi.md       → checklist sections
ulascanerturk.md                     → content source; note §9 and §11 (never published)
```

### Exploration B: Content (for `content_schema.md`)

```bash
cat src/content.config.ts 2>/dev/null
find src/content src/data src/assets -type f 2>/dev/null | sort
```

Extract: every collection with its loader and zod schema (field, type,
constraints, default); every entry with slug, `kind`, `status`, `featured`,
`draft`; the `Profile` type and which `ulascanerturk.md` section each field
comes from; images and whether their metadata was checked.

Where code differs from plans, record the code as truth and add a
`[PLAN DRIFT — plans/{file} §{section} says …]` note.

### Exploration C: Site (for `site_map.md`)

```bash
find src/pages src/layouts src/components src/styles src/lib public -type f 2>/dev/null | sort
```

- Route table from `src/pages` (`[slug].astro` = dynamic via `getStaticPaths`)
- Layouts: props, slots, what goes into `<head>`
- Components: name, file, props, where used
- Tokens: groups in `tokens.css`; light/dark mapping; contrast table if present
- Client JS: every `<script>` (inline or bundled) and its purpose/size
- `src/lib`: exported functions with signatures and their tests

### Exploration D: Config and CI/CD (for `site_map.md`)

```bash
cat astro.config.mjs tsconfig.json 2>/dev/null
cat package.json 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps({k:d.get(k) for k in ('scripts','engines','dependencies','devDependencies')}, indent=2))"
ls .github/workflows 2>/dev/null && cat .github/workflows/*.yml 2>/dev/null
cat .nvmrc 2>/dev/null
```

Extract: `site`, `trailingSlash`, `build.format`, integrations; scripts;
Node version; workflows (triggers, permissions, jobs, action versions).

### Exploration E: Conventions (for `methodology.md`)

```bash
cat eslint.config.js .prettierrc* .prettierignore .editorconfig vitest.config.ts 2>/dev/null
find src -name '*.test.ts' | head -10
git log --oneline -20 2>/dev/null
```

Existing config files are authoritative; where they are missing, take the
rules from `plans/01-mimari.md` §3, §6 and Faz 0, marked `[PLANNED]`.

### Exploration F: Progress (for `phase_progress.md`)

For each phase document, list its **Görev Listesi** and **Kabul Kriterleri**.
Mark an item done only with evidence (file exists + check passes, or a
recorded lead decision). Otherwise leave it open. When in doubt: open +
`[REVIEW NEEDED]`. Record S1–S6 as open unless the lead has answered them.

---

## Phase 3 — Generation Plan

```
══════════════════════════════════════════════════════════════════
  INIT-REFERENCES — GENERATION PLAN
══════════════════════════════════════════════════════════════════
Mode                  : {PLANS-ONLY | PARTIAL | IMPLEMENTED}
Files to generate     : {N}
Files already present : {N} (skipped)

FILE 1: references/methodology.md
  Sources   : {config files | plan sections}
  Sections  : invariants, layering, standards, content rules, git, testing, exceptions, commands
FILE 2: references/site_map.md
  Routes    : {implemented N} / {planned N}   Components: {N}   Workflows: {N}
FILE 3: references/content_schema.md
  Collections: {N}   Entries: {N}   Profile fields mapped: {N}
  Planned   : {N} entries   Drift notes: {N}
FILE 4: references/phase_progress.md
  Phases    : 7   Tasks: {done}/{total}   Acceptance: {done}/{total}   Open questions: {N}
Review needed : {N} items — {short list}
══════════════════════════════════════════════════════════════════
Respond with:  ✅ approve  |  ✏️ revise {FILE N}  |  ❌ cancel
```

Wait for explicit approval.

---

## Phase 4 — File Generation

Every file starts with:

```markdown
# references/{file} — {Title}

> Last updated: {YYYY-MM-DD} ({reason, e.g. "init-references, PLANS-ONLY mode"})
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans
```

### Output Format: `references/methodology.md`

```markdown
## Core Philosophy
- Static, fast, accessible personal site; public professional information only.
- plans/ is the spec; phases run in order (graph in plans/README.md).
- ulascanerturk.md is the content source; no claim without a source or lead approval.

## Invariants (Değişmez Kurallar)
1–6 from plans/README.md, each with how it is enforced (ESLint rule / test-lint scan / dist check / review).

## Layering
| Layer | Paths | May import | Must not import |
(from plans/01-mimari.md §3; enforced by review + test-lint manual review)

## Astro / TypeScript Standards
- strict + noUncheckedIndexedAccess; alias @/* → src/*
- Data via props; getCollection only in pages; no hard-coded UI text in components
- Styles: tokens only; scoped <style>; no CSS framework
- Accessibility rules (headings, alt, focus, targets, reduced motion)

## Content Rules
- Source mapping principle; wording distinctions (§3 education, §5 titles, §7 programs)
- What is never published (§9, §11)
- Image rules (astro:assets, metadata stripped, rights confirmed)

## Documented Exceptions
| Rule | Exception | Location | Reason | Approved |

## Versions
Astro, Node (.nvmrc), key integrations — verified dates.

## Git Conventions
- Branches: {type}/faz-{N}-{desc} for phase work, {type}/{domain}/{desc} otherwise
- Conventional Commits; scope = domain; local squash merge into main; no push from the workflow
- Pushing main deploys the site (after Faz 5) — the lead pushes

## Testing Conventions
- Vitest for src/lib (*.test.ts beside the module)
- Build = content schema validation; dist checks (scripts/check-dist.mjs)
- Lighthouse ≥ 95 (mobile), axe 0 violations at phase close from Faz 4

## Commands
| Purpose | Command |
(npm run dev / build / preview / check / lint / format / format:check / test / check:dist / lhci)

## Release and Rollback
(from Faz 5 — [PLANNED] until then)

## Known Gaps / Review Needed
```

### Output Format: `references/site_map.md`

```markdown
## Site Overview
Astro version, output: static, site URL, trailingSlash, build.format, integrations.

## Routes
| URL | File | Layout | Data source | Status |

## Layouts
### BaseLayout.astro | ProjectLayout.astro
- Props / Slots / Head contents / Scripts

## Components
| Component | File | Props | Used by | Notes |
(grouped: layout / profile / projects / ui)

## Styles and Theme
Token groups (tokens.css), light/dark mapping, contrast table (pair · ratio · threshold).

## Client JavaScript
| Script | Pages | Purpose | Size (gzip) |

## src/lib
| Export | Signature | Tests |

## Public Assets
favicon, robots.txt, og/ images.

## Config
astro.config.mjs, tsconfig, eslint, prettier, vitest — key settings.

## CI/CD
| Workflow | Trigger | Permissions | Jobs | Actions (versions) |

## Known Issues / Gotchas
```

### Output Format: `references/content_schema.md`

```markdown
## Content Sources
ulascanerturk.md (source) → src/data/profile.ts, src/content/projects/*.md (site).

## Profile (src/data/profile.ts)
| Field | Type | Source (ulascanerturk.md §) | Notes |

## Collections
### projects  (src/content/projects, glob loader)
| Field | Type | Constraints | Required | Notes |

## Project Entries
| Slug | Title | kind | status | featured | draft | Source | Approved |

## Images
| File | Used by | Metadata stripped | Rights | alt |

## Never Published
§9 and §11 of ulascanerturk.md; any approved exceptions → methodology.md.

## How to Add a Project
(steps — [PLANNED — plans/fazlar/faz-3 §2 görev 9] until Faz 3)

## How to Update the Profile
(steps — [PLANNED — plans/fazlar/faz-6 §2.2] until Faz 6)

## Known Issues / Gotchas
```

### Output Format: `references/phase_progress.md`

```markdown
## Current Phase
Faz {N} — {name}; next unblocked phases: {list}

## Open Questions
| # | Question | Answer | Date | Decided by |
(S1–S6 from plans/README.md §6)

## Faz {N} — {name}   (plans/fazlar/faz-{N}-*.md)
Status: not started | in progress | closed
### Tasks
- [ ] 1. {task} — {evidence / branch}
### Acceptance Criteria
- [ ] {criterion} — {evidence}

(repeat for Faz 0–6)

## Audits
| Date | Lighthouse (perf/a11y/bp/seo) | axe | Max JS (gzip) | Notes |

## Follow-ups
- {item} — {origin}
```

---

## Phase 5 — Write

After approval:

```bash
mkdir -p references
```

Write each approved file. Do not stage or commit — the lead decides whether
to commit them on their own (`docs(references): bootstrap reference maps`)
via `$git-commit`, or as part of the first Faz 0 commit.

---

## Phase 6 — Completion Report

```
──────────────────────────────────────────────────────────────
  INIT-REFERENCES COMPLETE
──────────────────────────────────────────────────────────────
Mode     : {mode}
Created  : {list}
Skipped  : {list}
Planned entries : {N}    Review needed : {N}    Plan drift : {N}

Next: review the [REVIEW NEEDED] items, then start work with
      $dev-workflow {task_type} "{description}"
──────────────────────────────────────────────────────────────
```
