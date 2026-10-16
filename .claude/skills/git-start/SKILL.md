---
name: git-start
description: >
  Create a correctly named git branch for ulascanerturk.github.io and switch
  to it. Phase tasks use feat/faz-N-description. Use at the start of any new
  unit of work. Step 1 of the dev-workflow.
---

# Git Start — Create a New Branch

Create a correctly named git branch and switch to it. Use at the start of any new unit of work.

## Usage
```
/git-start {type} {domain} {description}
```

## Examples
```
/git-start feat faz-0 astro-scaffold
/git-start feat faz-3 project-collection
/git-start content projects lockbox-mobile-page
/git-start fix layout theme-toggle-flash
/git-start chore ci node-lts-bump
```

## Branch Name Format

| Work | Format | Example |
|---|---|---|
| Phase task from `plans/fazlar/` | `{type}/faz-{N}-{description}` | `feat/faz-1-design-tokens` |
| Anything else | `{type}/{domain}/{description}` | `content/projects/lockbox-mobile-page` |

## Steps

1. Verify the repository exists:
   ```bash
   git rev-parse --is-inside-work-tree
   ```
   If not, stop and ask the lead.

2. Validate type — must be one of:
   feat | fix | refactor | test | chore | content | perf | docs | release
   Reject with the list if invalid. (`content` = text/data-only changes such
   as a new project page or profile wording.)

3. Validate domain — must be `faz-0` … `faz-6` or one of:
   profile | projects | content | layout | ui | styles | seo | a11y | perf |
   i18n | config | ci | deploy | docs | release
   If unrecognized, confirm with the lead before proceeding.

4. Normalize description: lowercase ASCII (ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u),
   spaces to hyphens, max 5 words, no special characters.

5. Construct the branch name using the table above.

6. Check for an existing branch: `git branch --list {name}`
   If it exists, surface it to the lead and do NOT overwrite.

7. Confirm the full branch name with the lead, then create and switch from `main`:
   ```bash
   git checkout -b {branch_name} main
   ```

8. Confirm:
   ```
   Branch created: feat/faz-1-design-tokens
   Now on this branch. Next: /read-references {scope}
   ```

## Rules
- Do NOT overwrite existing branches
- Always confirm the full branch name with the lead before creating
- Branch from `main` unless the lead explicitly names another base
