---
name: merge-main
description: >
  Squash-merges the current ulascanerturk.github.io feature branch into the
  local main branch after all quality gates pass. Requires explicit approval
  before creating the local merge commit. Never pushes (pushing main deploys
  the site). Step 11 of the dev-workflow.
---

# Skill: $merge-main

## Usage

```
$merge-main
```

## Prerequisites

- `$test-lint` must have returned PASS in the most recent run
- The branch changes, including reference updates, must be committed (Step 10)

---

## Steps

### 1. Identify the Local Base Branch

Use `main` when it exists; otherwise `master`. Record it as `{base_branch}` and
the current branch as `{feature_branch}`.

```bash
git branch --list main master
git branch --show-current
```

Stop if neither base branch exists or if `{feature_branch}` is the base branch.

---

### 2. Pre-merge Verification

```bash
git status --short
git log --oneline {base_branch}..{feature_branch}
git diff --check {base_branch}...{feature_branch}
git diff --name-only {base_branch}...{feature_branch} | grep -E "^(dist|node_modules|\.astro|coverage|\.lighthouseci)/|(^|/)\.env|(^|/)\.DS_Store$|(^|/)\._|\.(pem|key)$"
```

- The working tree must be clean
- The branch must contain at least one commit not on `{base_branch}`
- The last grep must print nothing (no build output, dependencies, env files,
  OS noise or keys in the branch)

If any check fails, stop and report the blocker.

---

### 3. Prepare the Local Squash Merge

```bash
git checkout {base_branch}
git merge --squash {feature_branch}
git diff --cached --stat
git diff --cached
```

If Git reports conflicts, stop and report the files. Do not resolve conflicts
or create a commit without lead direction.

---

### 4. Request Approval for the Local Merge Commit

Present the staged file list, a diff summary, and the proposed message. For a
phase branch, the message summarizes the phase task(s) completed.

```
──────────────────────────────────────────────────────────────
  LOCAL SQUASH MERGE READY — AWAITING APPROVAL
──────────────────────────────────────────────────────────────
Source branch : {feature_branch}
Base branch   : {base_branch}
Files staged  : {count}
Commit        : {type}({scope}): {imperative description}

Respond with:
  ✅ approve local merge — create the squash commit
  ❌ cancel              — leave the staged merge uncommitted
──────────────────────────────────────────────────────────────
```

---

### 5. Create and Verify the Local Merge

After approval:

```bash
git commit -m "{type}({scope}): {imperative description}" -m "{body}"
git status
git log --oneline -5
```

Confirm the working tree is clean and the squash commit is `HEAD` on `{base_branch}`.

---

### 6. Confirm

```
──────────────────────────────────────────────────────────────
  LOCAL MERGE COMPLETE
──────────────────────────────────────────────────────────────
Merged : {feature_branch} → {base_branch}
Commit : {squash_commit_hash}
State  : {base_branch} ({commit_hash}) — clean
Remote : not pushed (outside this workflow; after Faz 5, pushing main deploys the site)

Next step: $delete-branch
──────────────────────────────────────────────────────────────
```

## Rules
- NEVER push, force-push, or open a PR from this skill
- NEVER resolve conflicts without lead direction
- NEVER commit the squash without explicit lead approval
