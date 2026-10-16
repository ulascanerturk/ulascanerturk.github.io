---
name: implement-plan
description: >
  Executes the approved ulascanerturk.github.io implementation plan
  file-by-file, following the project's layering, invariants, content-accuracy
  rules and coding standards. Only runs after plan-feature has been approved.
  Reports progress after each logical unit. Step 4 of the dev-workflow.
---

# Skill: $implement-plan

## Usage

```
$implement-plan
```

Invoke with no arguments. The approved plan from `$plan-feature` is the
source of truth.

## Prerequisites

- `$plan-feature` must have been approved by the lead in this session
- If the plan is not approved, do NOT proceed — re-run `$plan-feature`

---

## Implementation Rules

### The Golden Rules

1. **Implement ONLY what the approved plan lists.** No additions, no
   refactors, no "while I was in there" improvements.
2. **Follow `references/methodology.md` and the plans** at all times.
   Names, paths and schemas in `plans/01-mimari.md` are the intended design.
3. **Work in dependency order**: config / dependencies → `src/styles` →
   `src/lib` → `src/content.config.ts` → `src/data` / `src/content` →
   components → layouts → pages → `public/` → tests → `scripts/` → workflows.
4. **Stop and report** any problem not in the plan — do NOT silently work
   around it.

### Project Invariants (never violate, never suppress)

- **Public professional info only.** Nothing from `ulascanerturk.md` §11's
  excluded list (private e-mail, phone, address detail, birth date, family,
  health, finance, IDs, IP/SSH, credentials, client contracts) in content,
  meta tags, JSON-LD, image EXIF or the repo. §9 is never published.
- **Content accuracy.** Write only what `ulascanerturk.md` or the lead's
  approved wording says. Keep its distinctions: International Relations is the
  degree (software courses are training programs); accelerator programs are in
  the Shifter context; titles may change. No invented metrics, clients,
  awards or titles.
- **Static and tracker-free.** No analytics, cookies, third-party runtime
  scripts, external fonts/CDNs/iframes. No secrets in the repo.
- **Layering.** `getCollection` / `getEntry` only in `src/pages`; components
  receive data via props; `src/lib` is pure TS (no `astro:*`, no `.astro`).
- **No hard-coded UI text in components** — text comes from `src/data/*` or
  content files (prerequisite for the Faz 6 English version).
- **Accessibility.** Semantic landmarks; one `<h1>` per page; no skipped
  heading levels; meaningful `alt` (decorative → `alt=""`); visible
  `:focus-visible`; buttons for actions, links for navigation; 44×44 px targets;
  respect `prefers-reduced-motion`; colors only from tokens.
- **Performance.** No client framework; inline scripts only when the plan says
  so and ≤ the JS budget; images through `astro:assets` with width/height.
- **External links** through `ExternalLink` (`rel="noopener noreferrer"`).
- **No `console.*`** outside `scripts/`.
- **Slugs/URLs** ASCII lowercase with hyphens; trailing slash.
- New images: strip metadata before adding (`exiftool -all= {file}`) and
  verify (`exiftool -a -G1 {file}` shows no GPS/camera/owner fields).

If a plan item cannot be implemented without breaking one of these, stop and
report it as a BLOCKER.

---

## Execution Process

### 1. Re-read the Approved Plan

```
IMPLEMENTING PLAN:
──────────────────────────────────────────
Task    : {description}
Phase   : Faz {N} — görev {M} | n/a
Files   : {total count}
Order   : {numbered file list}
──────────────────────────────────────────
```

### 2. Implement File by File

For each file in the plan:

**Step A — Pre-check**
If the file exists, read it fully before modifying. Before writing
user-facing text, re-read the `ulascanerturk.md` section it derives from.

**Step B — Implement**
Write or modify the file following the rules above.

**Step C — Progress Report**
```
✅  [{N}/{total}] {filename}
    → {1-line summary of what was done}
```

**Step D — Layer Pause**
When the plan crosses from foundations to pages (styles/lib/data → components
→ pages) or from site code to CI/deploy config, pause:
```
⏸  Components complete. Ready to proceed to pages.
   Confirm to continue, or flag any concerns first.
```

---

### 3. Handle Discoveries

**A) The plan is incomplete** (a required file wasn't listed):
```
🔎 DISCOVERY: {file} needs to be modified but was not in the plan.
   Proposed addition: {brief description}
   Awaiting lead confirmation before touching this file.
```

**B) A technical blocker** (e.g. Astro API differs from the plan's example,
a plugin is incompatible with the installed Astro major):
```
🚧 BLOCKER: {description}
   Cannot proceed with {step} until resolved.
   Options: {option A} | {option B}
   Awaiting lead decision.
```

**C) A risk not caught in planning** (URL change, new claim, personal data,
budget overrun):
```
⚠️  RISK DISCOVERED: {description}
   This was not flagged in the plan. Recommend pausing.
   Awaiting lead sign-off to continue.
```

**D) A new dependency is needed** — always a DISCOVERY; it needs lead
approval and an ADR entry.

**E) Wording not covered by the source** — always a DISCOVERY; propose the
text and wait for the lead.

---

### 4. Completion Report

```
──────────────────────────────────────────────────────────────
  IMPLEMENTATION COMPLETE
──────────────────────────────────────────────────────────────
Files created : {count} — {list}
Files modified: {count} — {list}
Files deleted : {count} — {list}

Text pending lead approval: {list | none}
Discoveries   : {count} — {list, or "none"}

Next step: $test-lint {scope}
──────────────────────────────────────────────────────────────
```

Do NOT run the full quality gate here — that happens in Step 5.
Do NOT commit here — that happens in Step 10.
