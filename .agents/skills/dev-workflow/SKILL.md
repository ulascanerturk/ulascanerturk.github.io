---
name: dev-workflow
description: >
  Master development workflow orchestrator for ulascanerturk.github.io (Astro
  static personal site on GitHub Pages: profile page + project pages). Runs
  the complete 13-step local Git process for phase tasks from plans/fazlar,
  new features, content updates, or bug fixes. Invokes each step skill in
  sequence with checkpoints. Use this as the entry point for any development task.
---

# Skill: $dev-workflow

## Usage

```
$dev-workflow {task_type} {description}
```

**task_type**: `feature` | `update` | `fix`

**Examples:**
```
$dev-workflow feature "faz-1 görev 1–5: tokens.css, global.css, BaseLayout"
$dev-workflow update "faz-3: add LockBox Mobile project page (S1 approved)"
$dev-workflow fix "theme toggle flashes light theme on dark-mode page load"
```

## Project Ground Rules

- `plans/` is the source of truth (Turkish). Phases in `plans/fazlar/` are
  implemented in dependency order: 0 → 1 → (2 ∥ 3) → 4 → 5 → 6.
- `ulascanerturk.md` is the single content source for profile and project text.
- The six **Değişmez Kurallar** in `plans/README.md` apply to every step:
  public professional info only, content accuracy, static and tracker-free,
  accessible and fast (Lighthouse ≥ 95, ≤ 10 KB JS/page), no generated output
  in git, no phase closes without its acceptance criteria and quality gate.
- `plans/ekler/kontrol-listesi.md` is the per-change checklist.
- The "lead" is the user (Ulaşcan). Every checkpoint below waits for the lead.

---

## Pre-flight (before Step 1, not a numbered step)

```bash
git rev-parse --is-inside-work-tree
git status --short
git branch --show-current
ls references/ 2>/dev/null
```

| Condition | Action |
|---|---|
| Not a git repository | Stop. Ask the lead to initialize the repository (`git init -b main` + bootstrap commit). |
| Working tree not clean | Stop and list the files. Do not stash or discard without lead approval. |
| Not on `main` | Ask the lead whether to continue from the current branch or switch to `main`. |
| `references/` missing or incomplete | Run `$init-references` once (outside the 13 steps), then restart Pre-flight. |
| Task belongs to Faz N whose prerequisite phases are not closed in `references/phase_progress.md` | Warn the lead and wait for an explicit decision. |
| Task needs an open question (S1–S6 in `plans/README.md` §6) answered | Ask the lead before Step 3; record the answer in the plan. |

---

## 13-Step Process

Execute each step in strict order. Present the current step number and
name as a header before each action so the lead can track progress.

---

### ► STEP 1 — Create Branch

Invoke `$git-start` with the type and domain derived from the task.

```
$git-start {type} {domain} {normalized-description}
```

- `type`: `feat` | `fix` | `refactor` | `test` | `chore` | `content` | `perf` | `docs` | `release`
- `domain`: `faz-{N}` for phase tasks, otherwise one of the domains listed in
  `$git-start` (profile / projects / content / layout / ui / styles / seo /
  a11y / perf / i18n / config / ci / deploy / docs / release)
- Confirm the branch name with the lead before proceeding

**Checkpoint**: Lead confirms branch name → proceed to Step 2

---

### ► STEP 2 — Read Reference Files

Invoke `$read-references` to load the project maps and the relevant plans.

```
$read-references {scope}
```

- `scope`: `content` | `site` | `config` | `docs` | `all` (see `$read-references`)
- This step is MANDATORY — do NOT plan without reading references

**Checkpoint**: References loaded and summarized → proceed to Step 3

---

### ► STEP 3 — Prepare Plan (read-only)

Invoke `$plan-feature` to produce a structured implementation plan.

```
$plan-feature "{task_description}"
```

- Tie the task to its phase document section and acceptance criteria
- List every file to create, modify or delete (references + tests included)
- Map affected checklist sections and invariants
- Flag content claims needing lead approval, new dependencies, plan deviations

**Checkpoint**: Lead reviews and approves the plan → proceed to Step 4
**If rejected**: revise and re-present. Do NOT implement until approved.

---

### ► STEP 4 — Implement the Plan

Invoke `$implement-plan` to execute the approved plan.

```
$implement-plan
```

- Implement ONLY what was approved
- No "while I was in there" changes
- Report after each logical unit (e.g. `ProjectCard.astro` + its usage)
- Surface any discovered complication immediately

**Checkpoint**: All files in the plan implemented → proceed to Step 5

---

### ► STEP 5 — Test and Error Check (Lint / Test)

Invoke `$test-lint` for the affected scope.

```
$test-lint {scope}
```

- `astro check`, ESLint (zero warnings), Prettier, Vitest, `astro build`
- Content & privacy scan (always)
- Built-output (`dist/`) checks for `site` / `content` / `all`
- Collect ALL errors before reporting

**Checkpoint (PASS)**: Zero errors → proceed to Step 9
**Checkpoint (FAIL)**: Errors found → proceed to Step 6

---

### ► STEP 6 — Prepare Fix Plan (if errors from Step 5)

Invoke `$fix-plan` to analyze errors and prepare a targeted fix.

```
$fix-plan
```

- Categorize errors by type and root cause
- Propose minimal targeted fixes (no scope creep)
- Present the fix plan to the lead for approval

**Checkpoint**: Lead approves fix plan → proceed to Step 7

---

### ► STEP 7 — Implement the Fix Plan

Invoke `$implement-fix` to apply the approved fixes.

```
$implement-fix
```

- Apply ONLY the approved fixes
- Never suppress lint/a11y rules, lower Lighthouse thresholds, or rewrite
  content claims to "pass" without lead approval

**Checkpoint**: All fixes applied → proceed to Step 8

---

### ► STEP 8 — Run Tests Again

Invoke `$test-lint` a second time to confirm all errors are resolved.

```
$test-lint {scope}
```

**Checkpoint (PASS)**: Zero errors → proceed to Step 9
**Checkpoint (FAIL)**: Return to Step 6. After 3 failed fix cycles, escalate to the lead.

---

### ► STEP 9 — Update the Reference Files

Invoke `$update-references` to keep the project maps and phase progress accurate.

```
$update-references {scope}
```

- MANDATORY — skipping it breaks future AI context
- Update every affected map and `references/phase_progress.md`
- Leave updates uncommitted for the single scoped commit in Step 10

**Checkpoint**: Reference files updated → proceed to Step 10

---

### ► STEP 10 — Commit the Changes

Invoke `$git-commit` to stage and commit implementation + reference updates.

```
$git-commit
```

- Conventional Commits; scope = domain from the branch name
- Body explains WHY; phase work references its plan section
- Explicit lead approval required before committing

**Checkpoint**: Commit created and confirmed → proceed to Step 11

---

### ► STEP 11 — Merge into Local Main

Invoke `$merge-main` to squash-merge the branch into local `main`.

```
$merge-main
```

- Only after the quality gate passed and the working tree is clean
- Explicit lead approval required before the local squash commit
- Never push (pushing to `main` deploys the site — the lead does it)

**Checkpoint**: Local merge created and verified → proceed to Step 12

---

### ► STEP 12 — Delete the Local Branch

Invoke `$delete-branch` to clean up the completed branch.

```
$delete-branch
```

- Prove tree equality before force-deleting a squash-merged branch
- Explicit lead approval required before deletion

**Checkpoint**: Branch deleted → proceed to Step 13

---

### ► STEP 13 — Complete

Report final status to the lead:

```
✅ WORKFLOW COMPLETE

Task        : {task_type} — {description}
Phase       : Faz {N} — {task / section} | n/a
Branch      : {branch_name} (deleted)
Base branch : main (locally merged, not pushed)
Commits     : {commit_hashes}
Refs        : {updated reference files}
Acceptance  : {phase acceptance criteria closed by this task, or "none"}
Checklist   : {sections reviewed: Genel / İçerik ve Gizlilik / Erişilebilirlik / ...}
Deploy      : pending lead push (`git push origin main`) | n/a before Faz 5
Open items  : {follow-ups, plan/ADR updates still pending, or "none"}
```

---

## Error Escalation Policy

If the workflow cannot proceed due to a blocking issue at any step:
1. Stop immediately and report the blocker clearly
2. Do NOT attempt workarounds without lead approval
3. State which step is blocked and what information is needed
4. Resume from the blocked step once resolved — do NOT restart from Step 1

**Invariant escalation:** if completing the task appears to require breaking a
Değişmez Kural or a checklist item (e.g. publishing private contact data,
adding analytics or a third-party script, a claim not backed by
`ulascanerturk.md`, exceeding the JS budget), stop and escalate. The fix is a
plan/ADR change approved by the lead — never an `eslint-disable` or a
silent workaround.
