---
name: test-lint
description: >
  Runs the full ulascanerturk.github.io quality gate for the given scope:
  astro check, ESLint (zero warnings), Prettier, Vitest, astro build, a
  content & privacy invariant scan, built-HTML (dist/) checks for a11y/SEO/
  links/JS budget, and optional Lighthouse/axe audits. Collects ALL errors
  before reporting. Used at Step 5 (after implementation) and Step 8 (after
  fix). Returns PASS or FAIL with a structured error report.
---

# Skill: $test-lint

## Usage

```
$test-lint {scope}
```

**scope**: `content` | `site` | `config` | `docs` | `all`
(when in doubt, or when the change spans layers, use `all`)

---

## Critical Rule: Collect ALL Errors First

Run every applicable check to completion before reporting. Do NOT stop at the
first error. Gather everything, then present one complete report so the fix
plan can address all issues in one pass.

Run all commands from the project root. Prefer the `package.json` scripts
defined in Faz 0 (`plans/01-mimari.md` §6.1); if a script is missing, use the
`npx` fallback shown and note it in the report.

---

## Gate Matrix

| Check | content | site | config | docs | all |
|---|---|---|---|---|---|
| 1. Typecheck (`astro check`) | ✅ | ✅ | ✅ | ─ | ✅ |
| 2. ESLint | ✅ | ✅ | ✅ | ─ | ✅ |
| 3. Prettier | ✅ | ✅ | ✅ | ─ | ✅ |
| 4. Vitest | ✅ | ✅ | ✅ | ─ | ✅ |
| 5. Build (`astro build`, content schema validation) | ✅ | ✅ | ✅ | ─ | ✅ |
| 6. Content & privacy invariant scan | ✅ | ✅ | ✅ | secrets only (6f) | ✅ |
| 7. Built output (`dist/`) checks | ✅ | ✅ | ─ | ─ | ✅ |
| 8. Dependency audit | if `package.json` changed | same | same | ─ | ✅ |
| 9. Workflow lint | ─ | ─ | if `.github/` changed | ─ | if `.github/` changed |
| 10. Doc link check | ─ | ─ | ─ | ✅ | ✅ |
| 11. Lighthouse + axe | only on lead request or phase close (Faz ≥ 4) | same | same | ─ | same |

---

## 1. Typecheck

```bash
npm run check                # fallback: npx astro check
```

Collect: file + line + error message (TS and `.astro` diagnostics, including hints
reported as errors).

## 2. ESLint

```bash
npm run lint -- --max-warnings 0     # fallback: npx eslint . --max-warnings 0
```

Collect: file + line + rule + message. Violations of `jsx-a11y/*`,
`astro/jsx-a11y/*` and `no-console` are **invariant errors**, listed separately.

## 3. Prettier

```bash
npm run format:check         # fallback: npx prettier --check .
```

Collect: every file reported as unformatted.

## 4. Vitest

```bash
npm test                     # fallback: npx vitest run
```

Collect: failing test name + expected/received.

## 5. Build

```bash
npm run build                # fallback: npx astro build
```

Collect: content collection schema errors (file + field + message), image
errors, route collisions, and every build **warning**.

## 6. Content & Privacy Invariant Scan

ESLint and review can miss these; this grep scan is the backstop for
Değişmez Kurallar 1–3 (`plans/README.md` §4) and `plans/ekler/kontrol-listesi.md`.
Run every line; a missing directory is not an error. `dist/` is scanned too
because it is what gets published (run after Step 5).

```bash
# Explicit paths on purpose: zsh does not word-split variables.

# a. E-mail addresses (none are approved by default; @2x image names are ignored)
grep -rnoE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" src public dist 2>/dev/null | grep -vE "@[0-9]x\.(png|jpe?g|webp|avif|svg)"

# b. mailto: / tel: / sms: links
grep -rnE "(mailto|tel|sms):" src public dist 2>/dev/null

# c. Turkish phone numbers
grep -rnE "(\+90|\b0)[ .-]?\(?5[0-9]{2}\)?[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}" src public dist 2>/dev/null

# d. IPv4 addresses (version strings are false positives — check each hit)
grep -rnoE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" src public dist 2>/dev/null

# e. Trackers, third-party scripts, external fonts/CDNs, iframes
grep -rnE "googletagmanager|google-analytics|gtag\(|fbq\(|hotjar|clarity\.ms|plausible\.io|goatcounter|fonts\.googleapis|fonts\.gstatic|cdn\.jsdelivr|unpkg\.com|cdnjs" src public dist astro.config.mjs 2>/dev/null
grep -rnoE "<script[^>]+src=[\"']https?://[^\"']+" dist 2>/dev/null
grep -rnoE "<iframe[^>]*>" src dist 2>/dev/null

# f. Secrets (whole repo)
grep -rnE "BEGIN [A-Z ]*PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist --exclude-dir=.astro 2>/dev/null
git ls-files | grep -E "(^|/)\.env|\.(pem|key|p12)$"

# g. Source document / agent section leaking into the published output
ls public/ulascanerturk.md dist/ulascanerturk.md 2>/dev/null
grep -rlE "Yapay Zekâ Ajanı İçin|Çalışma ve İletişim Tercihleri|Bilerek dışarıda bırakılan" dist 2>/dev/null

# h. console.* outside scripts/
grep -rnE "(^|[^A-Za-z0-9_.])console\.[a-z]+\(" src --include='*.ts' --include='*.astro' --include='*.js' --include='*.mjs' 2>/dev/null

# i. Suppressed rules
grep -rnE "eslint-disable|@ts-ignore|@ts-nocheck|@ts-expect-error" src 2>/dev/null

# j. Client UI frameworks / CSS frameworks (ADR-003, ADR-004)
grep -nE '"(react|react-dom|@astrojs/(react|vue|svelte|preact|solid-js)|vue|svelte|preact|jquery|bootstrap|tailwindcss|@tailwindcss/[^"]+)"' package.json
```

Any hit in a–j is a FAIL unless it is a documented exception in
`references/methodology.md` (e.g. a lead-approved public contact address).
Report each hit with file:line and the violated rule.

**Content accuracy review (manual, never auto-PASS).** List every hit and
compare it word-for-word with `ulascanerturk.md`:

```bash
grep -rniE "mühendis|engineer|diploma|lisans|degree|bachelor|ödül|award|sertifika|certif|kurucu|founder|CEO|CTO|müşteri|client|%[0-9]|[0-9]+ ?(kat|x)\b" src 2>/dev/null
```

Check: degree vs training wording (§3), programs framed in the Shifter context
(§7), titles as listed publicly (§5), no invented numbers or client names.
Also review the changed files (`git diff --name-only main...HEAD` plus
uncommitted changes) for checklist items grep cannot see: hard-coded UI text
in components, `getCollection` outside `src/pages`, missing `alt`, link text
like "buraya tıklayın", colors not from tokens. List concerns under
"Manual review".

## 7. Built Output (`dist/`) Checks

```bash
npm run check:dist           # available from Faz 4; until then use the fallback below
```

Fallback (no dependencies):

```bash
python3 - <<'PY'
import gzip, os, re, sys
from html.parser import HTMLParser
ROOT, BUDGET = 'dist', 10 * 1024
if not os.path.isdir(ROOT):
    print('dist/ missing — run the build first'); sys.exit(1)

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lang = self.canonical = None; self.title = ''; self._t = self._s = False
        self.desc = False; self.heads = []; self.no_alt = 0; self.links = []
        self.blank = 0; self.js = b''; self.js_src = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        elif tag == 'title': self._t = True
        elif tag == 'meta' and a.get('name') == 'description' and (a.get('content') or '').strip(): self.desc = True
        elif tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        elif re.fullmatch(r'h[1-6]', tag): self.heads.append(int(tag[1]))
        elif tag == 'img' and 'alt' not in a: self.no_alt += 1
        elif tag == 'a':
            self.links.append(a.get('href') or '')
            if a.get('target') == '_blank' and 'noopener' not in (a.get('rel') or ''): self.blank += 1
        elif tag == 'script' and a.get('type') not in ('application/ld+json', 'application/json'):
            if a.get('src'): self.js_src.append(a['src'])
            else: self._s = True
    def handle_endtag(self, tag):
        if tag == 'title': self._t = False
        if tag == 'script': self._s = False
    def handle_data(self, d):
        if self._t: self.title += d
        if self._s: self.js += d.encode()

def resolve(page, href):
    href = href.split('#')[0].split('?')[0]
    if not href or re.match(r'^([a-z][a-z0-9+.-]*:|//)', href, re.I): return True
    base = ROOT if href.startswith('/') else os.path.dirname(page)
    p = os.path.normpath(os.path.join(base, href.lstrip('/')))
    return any(os.path.isfile(c) for c in (p, os.path.join(p, 'index.html'), p + '.html'))

errors, warns = [], []
for dp, _, files in os.walk(ROOT):
    for f in files:
        if not f.endswith('.html'): continue
        path = os.path.join(dp, f); rel = os.path.relpath(path, ROOT)
        p = Page(); p.feed(open(path, encoding='utf-8').read())
        if not p.lang: errors.append(f'{rel}: <html> has no lang')
        if not p.title.strip(): errors.append(f'{rel}: empty <title>')
        if p.heads.count(1) != 1: errors.append(f'{rel}: {p.heads.count(1)} <h1> (expected 1)')
        for x, y in zip(p.heads, p.heads[1:]):
            if y > x + 1: errors.append(f'{rel}: heading level skips h{x} → h{y}')
        if p.no_alt: errors.append(f'{rel}: {p.no_alt} <img> without alt')
        if p.blank: errors.append(f'{rel}: {p.blank} target=_blank link(s) without rel=noopener')
        for h in p.links:
            if not resolve(path, h): errors.append(f'{rel}: broken internal link {h}')
        js = p.js
        for s in p.js_src:
            local = os.path.join(ROOT, s.lstrip('/')) if s.startswith('/') else None
            if local and os.path.isfile(local): js += open(local, 'rb').read()
        size = len(gzip.compress(js)) if js else 0
        if size > BUDGET: errors.append(f'{rel}: client JS {size} B gzip > {BUDGET} B budget')
        if not p.desc: warns.append(f'{rel}: no meta description')
        if not p.canonical and f != '404.html': warns.append(f'{rel}: no canonical link')
for e in errors: print('ERROR', e)
for w in warns: print('WARN ', w)
print(f'{len(errors)} errors, {len(warns)} warnings')
sys.exit(1 if errors else 0)
PY
```

`WARN` lines (description, canonical) count as errors once Faz 1 is closed in
`references/phase_progress.md`.

## 8. Dependency Audit (when `package.json` / lock file changed, and `all`)

```bash
npm audit --omit=dev --audit-level=high
```

Also confirm that each newly added dependency has an ADR entry in
`plans/ekler/karar-kayitlari.md`.

## 9. Workflow Lint (when `.github/` changed)

```bash
actionlint                   # if installed; otherwise report "skipped — actionlint not installed"
grep -nE "^\s*permissions:" .github/workflows/*.yml
```

Every workflow must declare `permissions:` explicitly (least privilege).

## 10. Doc Link Check (docs, all)

```bash
python3 - <<'PY'
import os, re, sys, glob
bad = []
files = glob.glob('plans/**/*.md', recursive=True) + glob.glob('references/*.md') + ['AGENTS.md', 'CLAUDE.md']
for f in files:
    if not os.path.exists(f):
        continue
    for m in re.finditer(r'\]\(([^)#\s]+)(#[^)]*)?\)', open(f, encoding='utf-8').read()):
        target = m.group(1)
        if re.match(r'^[a-z]+:', target):
            continue
        if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(f), target))):
            bad.append(f'{f} -> {target}')
print('\n'.join(bad) or 'links OK'); sys.exit(1 if bad else 0)
PY
```

## 11. Lighthouse + axe (only when the lead asks, and at phase close from Faz 4)

Requires a production build served locally:
```bash
npm run lhci                 # fallback: npx @lhci/cli autorun (uses lighthouserc.json)
npx astro preview --port 4321 &   # then, for each page:
npx @axe-core/cli http://localhost:4321/ http://localhost:4321/projeler/ --exit
```
Thresholds: every Lighthouse category ≥ 0.95 (mobile), zero axe violations.
Stop the preview server afterwards. Otherwise report
`Lighthouse/axe : not run (lead decision)`.

---

## Output Format

### On PASS

```
──────────────────────────────────────────────────────────────
  QUALITY GATE: ✅  PASS
──────────────────────────────────────────────────────────────
Scope        : {scope}
Types        : ✅  passed
Lint         : ✅  passed (0 warnings)
Format       : ✅  passed
Tests        : ✅  passed — {count} tests in {duration}
Build        : ✅  {N} pages, 0 warnings
Invariants   : ✅  0 hits
Dist checks  : ✅  {N} pages, 0 errors, 0 warnings · max JS {N} B gzip  | N/A
Audit        : ✅  no high/critical  | N/A
Workflows    : ✅  | N/A
Docs links   : ✅  OK  | N/A
Lighthouse   : {scores | not run}   axe: {0 violations | not run}
Content review: {none | list of notes}
Manual review : {none | list of notes}
──────────────────────────────────────────────────────────────
Next step: $update-references {scope}
──────────────────────────────────────────────────────────────
```

### On FAIL

```
──────────────────────────────────────────────────────────────
  QUALITY GATE: ❌  FAIL
──────────────────────────────────────────────────────────────
Scope        : {scope}
Types        : ❌ {N} errors   | ✅ | N/A
Lint         : ❌ {N} errors   | ✅ | N/A
Format       : ❌ {N} files    | ✅ | N/A
Tests        : ❌ {N} failed   | ✅ | N/A
Build        : ❌ {N} errors   | ✅ | N/A
Invariants   : ❌ {N} hits     | ✅
Dist checks  : ❌ {N} errors   | ✅ | N/A
Audit        : ❌ {N} findings | ✅ | N/A
Workflows    : ❌ {N} issues   | ✅ | N/A
Docs links   : ❌ {N} broken   | ✅ | N/A
──────────────────────────────────────────────────────────────

PRIVACY / INVARIANT ERRORS ({N}):     ← always listed first
  1. {file}:{line} — {rule} — {message}

TYPE ERRORS ({N}):
  1. {file}:{line} — {message}

LINT ERRORS ({N}):
  1. {file}:{line} — {rule} — {message}

FORMAT ({N}):
  1. {file}

TEST FAILURES ({N}):
  1. {test_name}
     Expected: {expected}
     Received: {received}

BUILD / SCHEMA ERRORS ({N}):
  1. {file} — {field} — {message}

DIST / A11Y / SEO ({N}):
  1. {page} — {message}

AUDIT / WORKFLOWS / DOCS ({N}):
  1. {message}
──────────────────────────────────────────────────────────────
Next step: $fix-plan
──────────────────────────────────────────────────────────────
```

### On Tool or Project Not Found

```
⚠️  {tool} not found — skipping. Install with: {install_command}
```

Continue with the remaining checks and note the skip in the summary. If
`package.json` does not exist yet (pre-Faz 0 state), report checks 1–5, 7 and 8
as `N/A — project not bootstrapped` and run only the checks that apply
(6 on existing paths, 10).
