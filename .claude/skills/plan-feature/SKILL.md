---
name: plan-feature
description: >
  Produces a structured implementation plan for an ulascanerturk.github.io
  phase task, feature, content update, or bug fix after reading reference
  files and plans. Read-only — no files are written. Maps the task to its
  phase acceptance criteria, the content source and the change checklist.
  Requires lead approval before implementation. Step 3 of the dev-workflow.
---

# Skill: /plan-feature

## Usage

```
/plan-feature "{task_description}"
```

**Examples:**
```
/plan-feature "faz-1 görev 5–6: BaseLayout + SiteHeader/SiteFooter/ThemeToggle"
/plan-feature "faz-3 görev 2: projects content collection schema"
/plan-feature "fix: active nav item missing aria-current on /projeler/{slug}/"
```

## Prerequisites

- `/read-references` must have been executed in this session
- If reference context is missing, invoke `/read-references` first

## Mode: READ-ONLY

In this step you MAY:
- Read any file on disk
- Run `grep`, `find`, `cat`, `ls`, `git log`, `git diff` to explore
- Ask the lead clarifying questions

You MUST NOT:
- Write, edit, or delete any file
- Install packages or run npm scripts that write files (`build`, `format`)
- Make any git operation that changes state

---

## Planning Process

### Phase 1: Task Analysis

```
TASK UNDERSTOOD:
Type        : feature | update | fix
Description : {restatement in 1–2 sentences}
Phase       : Faz {N} — görev {M} / §{section} | not phase work
Scope       : content | site | config | docs | mixed
Complexity  : low | medium | high (justify in 1 sentence)
Spec source : {plan + section that defines the expected behavior}
Content src : {ulascanerturk.md §… | lead-provided text | n/a}
```

If the task is ambiguous, the plans are silent/contradictory, or an open
question (S1–S6) blocks it, ask ONE clarifying question and wait for the
answer before proceeding.

---

### Phase 2: Impact Analysis

```
IMPACT ANALYSIS:
─────────────────────────────────────────
Profile data (src/data/profile.ts)   : yes / no  → sections: [list]
Projects collection                  : yes / no  → entries: [slugs]
  Schema (src/content.config.ts)     : yes / no  → fields added/changed: [list]
User-facing text                     : yes / no  → needs lead wording approval: yes / no
Images / assets                      : yes / no  → EXIF check + alt text + rights
Pages / routes (src/pages)           : yes / no  → URLs: [list]
Layouts                              : yes / no
Components                           : yes / no  → [list]
Styles / tokens                      : yes / no  → contrast re-check needed: yes / no
Client JS                            : yes / no  → size estimate vs ≤ 10 KB budget
SEO meta / JSON-LD / sitemap         : yes / no
Config (astro.config, tsconfig, lint): yes / no
CI / deploy workflows                : yes / no  → permissions changed: yes / no
Dependencies                         : yes / no  → [package, why, ADR needed]
Tests                                : vitest unit / dist checks / manual a11y
Plans / ADR                          : yes / no  → [sections to update]
─────────────────────────────────────────
```

---

### Phase 3: Implementation Plan

List every file to be created, modified or deleted:

```
📝 CREATE  src/components/projects/ProjectCard.astro
   → Card with linked title, summary, status and tech tags; data via props.
   → Used by: src/pages/projeler/index.astro, src/pages/index.astro (featured)

📝 CREATE  src/lib/projects.test.ts
   → sortProjects order/status/title; draft filtering (faz-3 §3).

✏️  MODIFY  references/site_map.md                      ← ALWAYS in plan
   → Add ProjectCard to Components.

✏️  MODIFY  references/phase_progress.md                ← ALWAYS for phase work
   → Mark faz-3 görev 4 done.
```

Format:
```
{icon} {CREATE|MODIFY|DELETE}  {file_path}
   → {what changes and why, 1–2 lines}
   → {callers / dependencies / plan reference}
```

Icons: 📝 = new file, ✏️ = modify, 🗑️ = delete

**Rules for the file list:**
- List files in dependency order: config / dependencies → `src/styles` →
  `src/lib` → `src/content.config.ts` → `src/data` / `src/content` →
  `src/components/ui` → `src/components/{layout,profile,projects}` →
  `src/layouts` → `src/pages` → `public/` → tests → `scripts/` →
  `.github/workflows` → references / plans
- Every new or changed `src/lib/**` module has a test entry
- Every user-facing text item names its `ulascanerturk.md` source section, or is
  flagged "needs lead wording approval"
- Always include the affected `references/*.md` as MODIFY entries
- Content schema change → update every existing entry in the same plan
- New dependency → `npm install` (exact package), justification, and an ADR
  entry in `plans/ekler/karar-kayitlari.md`
- Never include `node_modules/`, `dist/`, `.astro/`, `.env*`, `coverage/`

---

### Phase 4: Risk Assessment

```
RISK ASSESSMENT:
──────────────────────────────────────
Overall risk    : low | medium | high
Breaking change : yes / no
  If yes → what breaks (URLs, anchors, component props, schema fields)
URL change      : none | {old → new} (live links/SEO impact after Faz 5)

Content risk    : none | wording | new claim | personal data
  new claim     → source in ulascanerturk.md or explicit lead approval
  personal data → BLOCKER unless it is public professional info (Kural 1)

Invariants      : all respected | AT RISK → {which rule and why}
Checklist       : Genel / İçerik ve Gizlilik / Erişilebilirlik / SEO ve
                  Paylaşım / Performans / Güvenlik / Dağıtım → [applicable ones]
JS budget       : unchanged | +{N} KB on {pages}
Plan deviation  : none | {plan §section} says X, plan does Y because Z
──────────────────────────────────────
```

Any "AT RISK" invariant or plan deviation must be resolved with the lead in
this step — never deferred to implementation.

---

### Phase 5: Approval Request

```
──────────────────────────────────────────────────────────────
  PLAN READY — AWAITING APPROVAL
──────────────────────────────────────────────────────────────
Phase / task    : {Faz N — görev M | n/a}
Files to create : {count}
Files to modify : {count}
Files to delete : {count}
Tests           : {unit / dist / manual counts}
Risk level      : {level}
Text to approve : {count of user-facing text blocks needing wording approval}
Acceptance      : {phase acceptance criteria this plan closes}

Respond with:
  ✅  approve     — proceed to /implement-plan
  ✏️   revise {N}  — clarify or change item N in the plan
  ❌  reject      — cancel and explain why
──────────────────────────────────────────────────────────────
```

Do NOT proceed to implementation until the lead explicitly approves.
