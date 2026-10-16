---
name: git-commit
description: >
  Analyze the current ulascanerturk.github.io git diff, run a pre-commit
  secret, privacy and artifact filter, generate a Conventional Commit
  message, stage files explicitly, and commit only after lead approval.
  Step 10 of the dev-workflow.
---

# Git Commit

Analyze the current git diff, generate a Conventional Commit message, stage
files explicitly, and commit only after lead approval.

## Steps

1. Run `git status` to list all modified, added, deleted, and untracked files

2. Run `git diff HEAD` (and read untracked files) to see the full change set

3. Analyze:
   - Type: feat | fix | chore | refactor | test | content | perf | docs | release
   - Scope: the domain from the branch name (`faz-1`, `projects`, `layout`, ...)
   - Summary: imperative mood, ≤ 72 chars, no trailing period, English
   - Body: WHY the change was made (not what the diff shows); for phase work,
     the plan reference and closed acceptance criteria; for content, the
     `ulascanerturk.md` section and the lead's wording approval

4. Filter files that must NOT be committed (skip and warn):
   - `.env`, `.env.*`, `*.pem`, `*.key`, any token or credential file
   - `node_modules/`, `dist/`, `.astro/`, `coverage/`, `.lighthouseci/`
   - OS / editor noise: `.DS_Store`, `._*`, `Thumbs.db`, `.idea/`,
     `.claude/settings.local.json`
   - Images whose metadata was not stripped (check new/changed images):
     ```bash
     exiftool -a -G1 -GPS:all -Make -Model -Artist -Copyright -OwnerName {image}
     ```
     If `exiftool` is missing: `mdls {image} | grep -iE "gps|latitude|longitude|maker|model"` (macOS).
   - Any file containing private contact data or other §11 data from
     `ulascanerturk.md`

5. Scan the staged-to-be diff for secrets and privacy leaks:
   ```bash
   git diff HEAD | grep -nE "^\+.*(BEGIN [A-Z ]*PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_|AKIA[0-9A-Z]{16}|api[_-]?key\s*[:=]|token\s*[:=]\s*['\"][^'\"]{12,}|password\s*[:=])"
   git diff HEAD -- src public | grep -nE "^\+.*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(mailto|tel):|(\+90|\b0)[ .-]?5[0-9]{2})"
   ```
   Lead-approved exceptions documented in `references/methodology.md` are
   allowed — name them in the approval message. Anything else: stop and ask.

6. Draft the message:
   ```
   {type}({scope}): {summary}

   {body}

   Refs: plans/fazlar/faz-{N}-*.md §{section}     ← phase work only
   ```

7. Present to the lead:
   - the exact file list to stage
   - skipped files and why
   - the checklist sections that apply (from the plan) and their status
   - the full commit message

8. Only after explicit approval:
   ```bash
   git add <file1> <file2> ...
   git commit -m "{subject}" -m "{body}" [-m "Refs: ..."]
   git log --oneline -1
   ```

## Conventional Commit Types
- feat: new page, component or phase deliverable
- fix: bug fix (rendering, a11y, broken link, build)
- content: profile or project text/data only, no code change
- refactor: restructure without behavior change
- test: adding or updating tests only
- perf: performance (images, JS budget, CSS size)
- chore: maintenance, dependencies, config, CI/CD
- docs: plans / references / AGENTS.md only
- release: go-live or versioned milestone

## Rules
- NEVER commit without explicit lead approval
- NEVER use `git add -A` or `git add .` — always stage specific files
- NEVER commit `.env*`, credentials, build output (`dist/`, `.astro/`) or `node_modules/`
- NEVER commit private personal data (Değişmez Kural 1)
- NEVER push — pushing `main` deploys the site; the lead pushes
- Always show the full commit message before committing
