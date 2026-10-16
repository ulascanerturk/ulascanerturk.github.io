---
name: implement-fix
description: >
  Applies the approved ulascanerturk.github.io fix plan to resolve typecheck,
  lint, format, test, build/schema, privacy/content and dist (a11y/SEO/link)
  errors. Strictly applies only the approved fixes — no additional changes,
  no suppressions. Step 7 of the dev-workflow.
---

# Skill: /implement-fix

## Usage

```
/implement-fix
```

Invoke with no arguments. Executes the approved fix plan from `/fix-plan`.

## Prerequisites

- `/fix-plan` must have been approved by the lead in this session
- The original implementation from Step 4 must be in place

---

## Rules

Same as `/implement-plan` (including the project invariants) but stricter scope:
1. Fix ONLY what the approved fix plan lists
2. Do NOT improve, refactor, or clean up anything else
3. Run auto-fixers FIRST so manual fixes build on clean code
4. Report each fix as it's applied
5. Never use the forbidden "fixes" listed in `/fix-plan` (rule suppressions,
   threshold/budget changes, skipped tests, hidden drafts, loosened schemas,
   unapproved wording)
6. Content wording is applied exactly as approved — character for character

---

## Execution Process

### 1. Apply Auto-fixes First

```bash
npx prettier --write {file1} {file2} ...
npx eslint --fix {file1} {file2} ...
```

Confirm each file:
```
✅  [1/{N}] prettier/eslint auto-fixed: {file} — {N} changes
```

Auto-fixers never resolve a11y rules, privacy hits or content issues — those
are always manual fixes.

---

### 2. Apply Manual Fixes

For each manual item:

**Before editing**: re-read the target file (and, for content fixes, the
`ulascanerturk.md` section) to confirm the current state.
**After editing**:

```
✅  [{N}/{total}] FIXED: {file}:{line}
    Error was  : {error message}
    Fix applied: {1-line description}
```

---

### 3. Verify Each Fix (spot check)

Run only the check that was failing — not the full suite:

```bash
# Single test file / test name
npx vitest run {path/to/file.test.ts}
npx vitest run -t "{test name}"

# Types / lint / format on touched files
npx astro check
npx eslint {files} --max-warnings 0
npx prettier --check {files}

# Build / schema or dist errors
npx astro build              # then re-run /test-lint §7 (dist checks)

# Privacy / invariant hit — re-run the matching grep line from /test-lint §6
```

If the spot check still fails:
```
❌  Spot check failed for {test/file}.
    Error: {message}
    This fix is not complete — pausing for lead review.
```

Do NOT proceed to the next fix until the current one passes.

---

### 4. Completion Report

```
──────────────────────────────────────────────────────────────
  FIX IMPLEMENTATION COMPLETE
──────────────────────────────────────────────────────────────
Auto-fixes applied  : {N}
Manual fixes applied: {N}  (privacy/invariant: {N}, content: {N})
Spot checks         : {N}/{N} passed

Files modified: {list}

Next step: /test-lint {scope}
──────────────────────────────────────────────────────────────
```
