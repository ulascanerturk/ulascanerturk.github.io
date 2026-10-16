---
name: update-references
description: >
  Updates all affected ulascanerturk.github.io reference files
  (references/*.md) and phase progress after a validated implementation and
  before the scoped local commit. Stale maps cause AI hallucinations in future
  tasks. Step 9 of the dev-workflow. MUST NOT be skipped.
---

# Skill: /update-references

## Usage

```
/update-references {scope}
```

**scope**: `content` | `site` | `config` | `docs` | `all`

---

## Why This Step Cannot Be Skipped

The reference files are the AI's map of the project; `plans/` is the target
design. If code or content changes but the map does not, the next developer
(human or AI) will:
- Look for components or pages that no longer exist as described
- Miss components that already exist and duplicate them
- Pass outdated props or schema fields
- Re-publish wording the lead already corrected, or re-open closed tasks

**Skipping this step is the #1 cause of compounding errors in AI-assisted development.**

---

## Reference Files

| File | Holds |
|---|---|
| `references/methodology.md` | Standards, layering, invariants, content rules, documented exceptions, versions, git/test conventions, commands |
| `references/site_map.md` | Routes, layouts, components, tokens + contrast table, client JS, `src/lib`, public assets, config, CI/CD |
| `references/content_schema.md` | Profile field ↔ `ulascanerturk.md` mapping, collection schemas, project entries, images, how-to guides |
| `references/phase_progress.md` | Faz 0–6 task + acceptance status, open-question answers (S1–S6), audits, follow-ups |

Entries for code that does not exist yet are marked `[PLANNED]`. When a
planned item is implemented, replace the marker with the real file path and
props/signature — never leave both.

---

## Update Process

### 1. Diff the Validated Change Set

```bash
git diff --name-only main...HEAD
git diff --name-only
git diff --cached --name-only
git ls-files --others --exclude-standard
```

Use the union: committed branch work + uncommitted (tracked and new) changes.
This is the authoritative list of files to reflect in the maps.

---

### 2. `references/content_schema.md` (if content or schema changed)

**Trigger**: `src/content.config.ts`, `src/content/**`, `src/data/profile.ts`,
`src/assets/**`, or `ulascanerturk.md`.

Update:
- Collection schema tables:

```markdown
### projects  (src/content/projects, glob loader)
| Field    | Type                                   | Constraints | Required | Notes                |
|----------|----------------------------------------|-------------|----------|----------------------|
| title    | string                                 | 1–80        | ✅       |                      |
| summary  | string                                 | 50–200      | ✅       | also meta description |
| status   | 'active' \| 'completed' \| 'archived'  | enum        | ✅       |                      |
```

- Project entries table (slug, kind, status, featured, draft, source section,
  lead approval date)
- Profile field ↔ `ulascanerturk.md` section mapping
- Images table (metadata stripped, rights, alt)
- If `ulascanerturk.md` changed: list profile/project fields now out of sync
  as follow-ups (do not silently rewrite site text)

---

### 3. `references/site_map.md` (if site, styles or config changed)

**Routes** — new or changed pages:
```markdown
| URL                 | File                            | Layout        | Data source                | Status |
|---------------------|---------------------------------|---------------|----------------------------|--------|
| /projeler/{slug}/   | src/pages/projeler/[slug].astro | ProjectLayout | getCollection('projects')  | ✅     |
```

**Components** — name, file, props, used by:
```markdown
| Component   | File                                       | Props                                    | Used by              |
|-------------|--------------------------------------------|------------------------------------------|----------------------|
| ProjectCard | src/components/projects/ProjectCard.astro | project: ProjectData; headingLevel?: 2\|3 | /, /projeler/        |
```

Also keep current: layouts (props, slots, head contents), tokens and the
contrast table, client JS inventory with gzip sizes, `src/lib` exports and
tests, public assets, config highlights, CI/CD workflows (triggers,
permissions, action versions).

---

### 4. `references/phase_progress.md` (always for phase work)

- Tick completed tasks and **verified** acceptance criteria (only those the
  quality gate or a recorded manual check proved — note how)
- Record lead decisions: S1–S6 answers, wording approvals (date)
- Record audit results (Lighthouse, axe, max JS) when they were run
- Record the branch that closed them (commit hash only if the lead asks)
- Add follow-ups discovered during the task
- Update the "Current phase" line

---

### 5. `references/methodology.md` (only if a pattern changed)

**Trigger**: the task introduced a NEW convention, an approved exception to
an invariant, a version change, or an architectural decision not documented yet.

```markdown
### {Pattern Name}
- When to use: {condition}
- Example    : {file reference}
- Rationale  : {why — link the ADR if one exists}
```

---

### 6. Plans (only when the approved plan says so)

- `plans/ekler/karar-kayitlari.md` — new ADR or status change (e.g. ADR-001
  "Önerildi" → "Kabul edildi", verified versions in ADR-008)
- `plans/README.md` §6 — mark answered open questions
- Any plan section the plan flagged as "Plan deviation"

Never rewrite plans to match code silently — plan changes must be in the approved plan.

---

### 7. Hand Off for the Scoped Commit

Do not stage or commit here. Leave reference and plan updates beside the
implementation so `/git-commit` reviews and commits the complete change set
after explicit lead approval.

---

### 8. Confirm

```
──────────────────────────────────────────────────────────────
  REFERENCE FILES UPDATED ✅
──────────────────────────────────────────────────────────────
Files updated:
  {✅ | ─} references/methodology.md
  {✅ | ─} references/site_map.md
  {✅ | ─} references/content_schema.md
  {✅ | ─} references/phase_progress.md
  {✅ | ─} plans/… ({list})

Commit : pending — created by /git-commit

Next step: /git-commit
──────────────────────────────────────────────────────────────
```

(✅ = updated, ─ = not applicable for this task)
