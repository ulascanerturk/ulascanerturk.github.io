# references/content_schema.md — Content Schema

> Last updated: 2026-10-17 (init-references, PLANS-ONLY mode)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

No content files exist yet (`src/data/`, `src/content/`, `src/content.config.ts`
are absent). Only the source document `ulascanerturk.md` exists.

## Content Sources

```
ulascanerturk.md (source, repo root, never published directly)
  ├──► src/data/profile.ts            profile page data         [PLANNED — faz-2 task 2]
  ├──► src/data/site.ts               site meta, nav, UI text   [PLANNED — faz-1 task 4]
  └──► src/content/projects/*.md      project pages             [PLANNED — faz-3 task 7]
```

Approved facts that are not yet in `ulascanerturk.md` must be added there when
approved: LinkedIn URL (§10, Faz 2) and LockBox Mobile (§6, Faz 3).

## Profile (`src/data/profile.ts`) [PLANNED — plans/01-mimari.md §4.1]

| Field | Type | Source (`ulascanerturk.md` §) | Notes |
|---|---|---|---|
| `name` | string | title (H1) | "Ulaşcan Ertürk" |
| `headline` | string | subtitle line under H1 | "Yazılım Geliştirici · Teknoloji Girişimcisi · …" |
| `location` | string | §2 | City/country only: "İstanbul, Türkiye" |
| `since` | number | §1, §2 | 2018 |
| `summary` | string[] | §1, §3 "Disiplinler arası yaklaşım", §8 | 2–3 short paragraphs; wording approved by lead |
| `skills` | `{ category, items[] }[]` | §4 table + "Öne çıkan teknik yaklaşım" | Java ecosystem marked "training and earlier experience" |
| `experience` | `{ organization, role?, url?, highlights[], note? }[]` | §5, §6 (Shifter Pro / Lite) | Insapption role wording per §5; Shifter products described here (S1); "titles may change" note |
| `education` | `{ institution, program, kind: 'degree' \| 'training' }[]` | §3 | ESOGÜ = `degree`; BAU & Wissen, ODTÜ = `training` |
| `ecosystem` | `{ context, programs[], note }` | §7 | context = Shifter; not personal awards |
| `focusAreas` | `{ title, description }[]` | §8 | 7 areas |
| `links` | `{ label, url, kind }[]` | §10 + S2 | kinds: github · linkedin · company · product · blog · other; LinkedIn URL ⏳ pending |

[REVIEW NEEDED] The planned `Profile` type has no field for §6 "Diğer yazılım
çalışma alanları", which the planned `WorkAreas` component (faz-2 task 4) renders.
Add a field (e.g. `workAreas: { items: string[]; note: string }`) in the Faz 2 plan.

## Collections

### projects (`src/content/projects`, glob loader) [PLANNED — plans/01-mimari.md §4.2, faz-3 task 2]

| Field | Type | Constraints | Required | Notes |
|---|---|---|---|---|
| `title` | string | 1–80 | ✅ | |
| `summary` | string | 50–200 | ✅ | card text + meta description |
| `kind` | enum | `product` · `open-source` · `client-work` · `focus-area` | ✅ | |
| `status` | enum | `active` · `completed` · `archived` | ✅ | |
| `role` | string | — | ✅ | public role in the project |
| `period` | `{ start: number; end?: number }` | years | ⬜ | omit if unknown |
| `tech` | string[] | — | ✅ | rendered as tags |
| `links` | `{ label, url }[]` | public URLs only | ⬜ | |
| `cover` | `image()` | `src/assets/projects/` | ⬜ | metadata stripped |
| `featured` | boolean | — | ⬜ | shown on `/` |
| `order` | number | — | ⬜ | lower first |
| `draft` | boolean | — | ⬜ | excluded from production |
| `disclaimer` | string | — | ⬜ | rendered as Callout |

Slug = file name (ASCII, lowercase, hyphens). Suggested body sections:
Problem · Çözüm · Rolüm · Teknolojiler · Öğrenimler.

## Project Entries

| Slug | Title | kind | status | featured | draft | Source | Approved |
|---|---|---|---|---|---|---|---|
| `lockbox-mobile` | LockBox Mobile — Çevrimdışı Parola Kasası | `product` | [REVIEW NEEDED — publication status from lead] | ✅ | — | `lockbox-mobile/docs/00-genel-bakis.md` (public-safe parts) + lead; to be added to `ulascanerturk.md` §6 | ⬜ [PLANNED — faz-3 task 7] |

Out of scope (S1, 2026-10-17): Shifter Pro / Shifter Lite pages (covered in profile
experience), "Diğer çalışma alanları" page (short list on profile), LockBox macOS.

LockBox Mobile content limits (`plans/02-icerik-ve-tasarim.md` §4): high-level
features and stack only; no internal doc paths, vault format details or threat-model
gaps; no store link unless published; no repository link (no public remote).

## Images

| File | Used by | Metadata stripped | Rights | alt |
|---|---|---|---|---|
| — | none yet | — | — | — |

## Never Published

- `ulascanerturk.md` §9 (agent working preferences) and every item §11 excludes:
  private e-mail and phone, address detail, full birth date, family, political ties,
  health, finance, ID/account numbers, server IP/SSH details, credentials, client
  contracts, commercial/technical information without sharing permission.
- No approved exceptions (see `references/methodology.md` → Documented Exceptions).

## How to Add a Project [PLANNED — plans/fazlar/faz-3-proje-sayfalari.md §2 task 9]

Steps will be written when the collection exists. Expected outline: add the fact to
`ulascanerturk.md` §6 after lead approval → create `src/content/projects/{slug}.md`
with the frontmatter above → strip image metadata → run `test-lint all`.

## How to Update the Profile [PLANNED — plans/fazlar/faz-6-ingilizce-surum-ve-bakim.md §2.2 task 8]

Expected outline: edit `ulascanerturk.md` → sync `src/data/profile.ts` (and
`profile.en.ts` after Faz 6) → lead wording approval → `test-lint all`.

## Known Issues / Gotchas

- `ulascanerturk.md` front matter `last_updated: 2026-10-17` must be bumped whenever it changes.
