---
name: fix-plan
description: >
  Analyzes errors from the ulascanerturk.github.io test-lint quality gate and
  produces a targeted fix plan grouped by root cause. Privacy, content and
  accessibility violations are fixed at the source, never suppressed.
  Read-only until approved. Requires lead approval before implementation.
  Step 6 of the dev-workflow.
---

# Skill: $fix-plan

## Usage

```
$fix-plan
```

Invoke with no arguments. Uses the error report from the most recent
`$test-lint` run as input.

## Prerequisites

- `$test-lint` must have produced a FAIL result in this session
- If the error report is not in context, run `$test-lint` again first

---

## Mode: READ-ONLY

Same constraints as `$plan-feature` — no files written until approved.

---

## Non-negotiable Fix Rules

These are never acceptable fixes; propose them only as an explicit escalation:

- Adding `eslint-disable` (any `jsx-a11y` / `astro/jsx-a11y` rule or
  `no-console`), `@ts-ignore`, `@ts-nocheck` or `@ts-expect-error`
- Lowering Lighthouse thresholds, raising the JS budget, or excluding pages
  from `check:dist` / axe / the sitemap to make a check pass
- `it.skip` / `describe.skip` / `.only` / deleting a failing test
- `alt=""` on an informative image just to silence a missing-alt error
- Adding `draft: true` to hide a project that fails schema validation
- Moving a privacy-scan hit into an "exception" without lead approval and a
  documented entry in `references/methodology.md`
- Rewording content to pass the content review without the lead approving the
  new wording against `ulascanerturk.md`
- Loosening the content schema (making a field optional) only to make an
  entry validate

---

## Analysis Process

### 1. Categorize All Errors

```
ERROR CATEGORIZATION:
──────────────────────────────────────────────────────────────
P. Privacy / invariant violations       : {N}
   → {file:line — rule}
Q. Content accuracy                     : {N}
   (claim not backed by ulascanerturk.md / wording conflicts with §3, §5, §7)
   → {file:line — claim}
A. Format / auto-fixable lint           : {N}
   → Files: {list}
B. Type errors                          : {N}
   → Files: {list}
C. Layer / architecture errors          : {N}
   (getCollection in a component, astro:* in src/lib, hard-coded UI text)
   → Files: {list}
D. Build / content schema errors        : {N}
   → Entries: {list}
E. Failing tests — implementation bug   : {N}
   (code does not meet the plan / test is correct)
   → Tests: {list}
F. Failing tests — test bug             : {N}
   (test setup, fixtures; the plan is met)
   → Tests: {list}
G. Dist / a11y / SEO errors             : {N}
   → Pages: {list}
H. Audit / workflow / docs links        : {N}
   → Items: {list}
──────────────────────────────────────────────────────────────
Total errors: {N}
```

For E vs F, decide against the spec in `plans/` — not against the current code.
For Q, decide against `ulascanerturk.md` — not against the current text.

---

### 2. Root Cause Analysis

For each non-trivial category (P, Q, B, C, D, E, G):

```
ROOT CAUSE ANALYSIS:
──────────────────────────────────────────────────────────────
[P — mailto: link in src/data/site.ts:14]
  Root cause: footer contact link added from a personal e-mail.
  Origin    : Değişmez Kural 1; S2 answer was "GitHub only".
  Fix scope : Narrow — remove the entry; footer keeps GitHub link.

[G — dist/projeler/index.html: heading level skips h1 → h3]
  Root cause: ProjectCard renders its title as <h3> regardless of context.
  Origin    : Component hard-codes heading level.
  Fix scope : Narrow — add a `headingLevel` prop (default 2) to ProjectCard.
──────────────────────────────────────────────────────────────
```

---

### 3. Fix Plan

```
FIX PLAN:
──────────────────────────────────────────────────────────────
[A — Auto-fix]
✏️  npx prettier --write / npx eslint --fix (no logic change)
   Files: {list}

[P — Invariant]
✏️  MODIFY  src/data/site.ts:14
   → Remove mailto entry from footer links

[G — A11y]
✏️  MODIFY  src/components/projects/ProjectCard.astro
   → headingLevel prop; list page passes 2, home page passes 3

[Q — Content]  ← needs lead wording approval
✏️  MODIFY  src/data/profile.ts:42
   → "ODTÜ Yazılım Mühendisliği" → "ODTÜ Yazılım Mühendisliği eğitim programı" (§3)
──────────────────────────────────────────────────────────────
Total changes: {N} files
```

**Scope creep warning** — if a fix needs files NOT touched in the original
implementation:

```
⚠️  SCOPE ALERT: Fixing {error} requires modifying {file} which was
    NOT part of the original plan. This may indicate a deeper issue.
    Options:
    A) Narrow fix: adjust only the interface / call site
    B) Proper fix: update {file} (requires plan approval)
    Recommend: {A or B with justification}
```

**Spec conflict** — if the only way to pass is to deviate from `plans/`,
stop and present it as a decision for the lead (possible plan / ADR update).

---

### 4. Approval Request

```
──────────────────────────────────────────────────────────────
  FIX PLAN READY — AWAITING APPROVAL
──────────────────────────────────────────────────────────────
Errors found     : {N}  (privacy/invariant: {N}, content: {N})
Files to fix     : {N}
Auto-fixable     : {N} (prettier / eslint --fix)
Manual fixes     : {N}
Wording changes  : {N} (listed verbatim above)
Scope creep risk : yes / no
Spec conflict    : yes / no

Respond with:
  ✅  approve     — proceed to $implement-fix
  ✏️   revise {N}  — clarify or change item N in the fix plan
  ❌  reject      — cancel and explain (may need to re-plan the feature)
──────────────────────────────────────────────────────────────
```
