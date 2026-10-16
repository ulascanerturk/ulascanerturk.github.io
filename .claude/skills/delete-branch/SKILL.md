---
name: delete-branch
description: >
  Cleans up a squash-merged ulascanerturk.github.io local branch after proving
  its tree is identical to local main. Requires explicit approval before
  deletion. Step 12 of the dev-workflow.
---

# Skill: /delete-branch

## Usage

```
/delete-branch
```

## Prerequisites

- The local squash merge from Step 11 must be complete
- Currently on the local base branch (`main` or `master`)

---

## Steps

### 1. Verify Current State

```bash
git branch --show-current
git status --short
git log --oneline -3
```

Stop if the current branch is not the base branch or the working tree is not clean.

---

### 2. Identify the Completed Branch

Use the branch recorded for the current workflow session. Confirm it exists:

```bash
git branch --list {branch_name}
```

If more than one candidate exists, ask the lead which branch to remove.

---

### 3. Prove the Squash Merge Contains the Branch Tree

```bash
git rev-parse {branch_name}^{tree}
git rev-parse HEAD^{tree}
```

The two tree hashes must be identical. If they differ (e.g. `main` moved after
the branch was created), stop: the workflow cannot prove all branch content is
on the base branch. Show `git diff {branch_name} HEAD --stat` and ask the lead.

---

### 4. Request Approval and Delete the Local Branch

`git branch -d` rejects squash-merged branches because their commits are not
ancestors of the base branch. After tree equality is proven, present both
hashes and wait for explicit lead approval before using `-D`:

```bash
git branch -D {branch_name}
```

---

### 5. Final State Check

```bash
git status
git branch
git log --oneline -5
```

---

### 6. Confirm

```
──────────────────────────────────────────────────────────────
  LOCAL BRANCH DELETED
──────────────────────────────────────────────────────────────
Branch        : {branch_name} — deleted
Tree equality : verified ({tree_hash})
Current state : {base_branch} ({commit_hash}) — clean

Next step: Step 13 — Workflow Complete
──────────────────────────────────────────────────────────────
```

## Rules
- NEVER delete a branch whose tree is not proven identical to `HEAD`
- NEVER delete remote branches
- NEVER delete without explicit lead approval
