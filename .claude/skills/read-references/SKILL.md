---
name: read-references
description: >
  Reads and summarizes the ulascanerturk.github.io reference maps
  (references/*.md) plus the governing plans (phase document, architecture,
  content & design, ADRs, checklist) and the content source ulascanerturk.md
  before any development work begins. Grounds the agent in the real project
  state. Always invoke before planning. Step 2 of the dev-workflow.
---

# Skill: /read-references

## Usage

```
/read-references {scope}
```

**scope**:

| Scope | Covers |
|---|---|
| `content` | `src/content/**`, `src/content.config.ts`, `src/data/**`, `src/assets/**`, `ulascanerturk.md` |
| `site` | `src/pages/**`, `src/layouts/**`, `src/components/**`, `src/styles/**`, `src/lib/**`, `public/**` |
| `config` | `astro.config.mjs`, `package.json`, `tsconfig.json`, lint/format/test config, `.github/workflows/**`, `scripts/**` |
| `docs` | `plans/**`, `references/**`, `AGENTS.md`, `CLAUDE.md` only |
| `all` | Everything above |

## Purpose

Reference files are the AI's map of the project; `plans/` is the
specification; `ulascanerturk.md` is the content source. Reading all three
before planning ensures the agent uses real files, real component names and
approved wording — not hallucinated ones.

## Steps

### 1. Load the Universal References (always)

```
references/methodology.md     → Coding standards, layering, invariants, git/test conventions
references/phase_progress.md  → Which phases / tasks / acceptance criteria are done; S1–S6 answers
plans/README.md               → Değişmez Kurallar + phase dependency graph + open questions
```

For each, output a short confirmation:
```
📄 references/methodology.md — loaded. Key conventions: [3–5 bullets]
📄 references/phase_progress.md — loaded. Current phase: Faz {N}; open tasks: [list]
📄 plans/README.md — loaded. Invariants: 6 · Open questions: [S# still open]
```

---

### 2. Load Scope-Specific References

#### If scope = `content` or `all`

```
references/content_schema.md
plans/01-mimari.md §4            (content model)
plans/02-icerik-ve-tasarim.md §3–§4 (content inventory)
ulascanerturk.md                 (sections the task touches; always §11)
```

Summary:
```
📄 references/content_schema.md — loaded.
  Collections   : [projects (N entries, M drafts)]
  Profile data  : src/data/profile.ts — sections [list]
  Source mapping: [profile field → ulascanerturk.md §]
  Exceptions    : [approved public contact data, if any]
```

#### If scope = `site` or `all`

```
references/site_map.md
plans/01-mimari.md §2–§3, §5     (folders, layering, routing)
plans/02-icerik-ve-tasarim.md §2, §5 (site map, design direction)
```

Summary:
```
📄 references/site_map.md — loaded.
  Routes      : [/, /projeler/, /projeler/{slug}/, 404]
  Layouts     : [BaseLayout, ProjectLayout]
  Components  : [list by folder]
  Tokens      : [token groups; contrast table present yes/no]
  Client JS   : [scripts and sizes]
```

#### If scope = `config` or `all`

```
references/site_map.md      (Config, CI/CD sections)
references/methodology.md   (Commands, versions)
plans/01-mimari.md §6       (scripts, CI, deploy)
plans/fazlar/faz-0-proje-kurulumu.md / faz-5-yayin-ve-dagitim.md (as relevant)
```

#### If scope = `docs`

```
plans/README.md, the plans being changed, and every plan that links to them
```

---

### 3. Load Task-Specific Docs (always)

- The phase document for the task (`plans/fazlar/faz-{N}-*.md`): its task list,
  the relevant section, and **Kabul Kriterleri**.
- Every ADR in `plans/ekler/karar-kayitlari.md` the task touches (note its status:
  a task built on an ADR still "Önerildi" needs lead confirmation).
- `plans/ekler/kontrol-listesi.md` — note which sections apply.
- For any user-facing text: the exact `ulascanerturk.md` sections it derives from.

---

### 4. Spot-check Actual Files

Verify that 2–3 key files named in the maps actually exist:

```bash
ls -la {path_from_map}
```

If a file mapped as implemented does NOT exist:
```
⚠️  WARNING: references/site_map.md lists {file} as implemented but it does not exist.
    The reference file may be stale. Flag to lead before planning.
```

Entries marked `[PLANNED]` are expected to be missing — do not warn for them.

---

### 5. Produce a Context Summary

```
──────────────────────────────────────
  CONTEXT LOADED — READY FOR PLANNING
──────────────────────────────────────
Scope          : {scope}
Phase          : Faz {N} — {task}  (prerequisites: closed ✅ | open ⚠️)
Content schema : {loaded | n/a}
Site map       : {loaded | n/a}
Methodology    : loaded
Phase doc      : plans/fazlar/{file} §{sections}
ADRs           : {list with status}
Checklist      : {applicable sections}
Content source : ulascanerturk.md §{sections} | n/a
Open questions : {S# relevant to this task and their answers | none}

Key constraints for this task:
• {constraint 1 — e.g. "components receive data via props; no getCollection outside pages"}
• {constraint 2 — e.g. "education wording: training program ≠ degree (§3)"}
• {constraint 3}

Proceed with /plan-feature to design the implementation.
──────────────────────────────────────
```

---

## What NOT to Do

- Do NOT start planning or writing code in this step
- Do NOT assume a file exists because a plan describes it — plans describe the
  target design; maps describe the current state; verify on disk
- Do NOT summarize from memory — read the actual files every time
- Do NOT skip this step even for "small" fixes or text edits
