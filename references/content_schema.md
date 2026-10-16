# references/content_schema.md — Content Schema

> Last updated: 2026-10-17 (Faz 2 — feat/faz-2-profile-page)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

`src/data/site.ts` (Faz 1) and `src/data/profile.ts` (Faz 2) exist; `src/content/` and
`src/content.config.ts` are still planned.

## Content Sources

```
ulascanerturk.md (source, repo root, never published directly)
  ├──► src/data/profile.ts            profile data + page text  ✅ (title, §1–§8, §10, §11 note)
  ├──► src/data/site.ts               site meta, nav, UI text   ✅ (title, §1, §10)
  └──► src/content/projects/*.md      project pages             [PLANNED — faz-3 task 7]
```

Approved facts that are not yet in `ulascanerturk.md` must be added there when
approved: LockBox Mobile (§6, Faz 3). The LinkedIn URL is in §10 since commit 578d8e0.

## Site Data (`src/data/site.ts`) ✅

`SiteConfig` object — all UI text for the shell (no text in components; layout passes it as props).
Wording approved by the lead 2026-10-17 (Faz 1 plan).

| Field | Value / content | Source |
|---|---|---|
| `name` | "Ulaşcan Ertürk" | title (H1) |
| `url`, `lang` | `https://ulascanerturk.github.io`, `tr` | S5, ADR-006 |
| `description` | default meta description (İstanbul, yazılım geliştirici ve teknoloji girişimcisi; web, mobil, B2B SaaS) | §1 |
| `titleSeparator` | " · " → `"{page} · Ulaşcan Ertürk"` | faz-1 task 5 |
| `skipLink`, `newTabHint`, `themeToggleLabel` | "İçeriğe geç", "(yeni sekmede açılır)", "Koyu tema" | UI text |
| `nav` | label "Ana menü"; Hakkımda (`/#hakkimda`), GitHub, LinkedIn — "Projeler" added in Faz 3 task 6 | §10 |
| `footer` | label "Alt bağlantılar"; © holder; GitHub, LinkedIn, Kaynak kodu (`github.com/ulascanerturk/ulascanerturk.github.io`) | §10, ADR-002 |
| `notFound` | "Sayfa bulunamadı", message, link "Ana sayfaya dön" — "Projelere göz at" added in Faz 3 task 6 | UI text |

## Profile (`src/data/profile.ts`) ✅ (plans/01-mimari.md §4.1, ADR-005 accepted 2026-10-17)

Two exports, no imports. Every field has a `// kaynak: ulascanerturk.md §N` comment.
Wording is **first person** (lead decision) and was approved by the lead on 2026-10-17.
Structural tests: `src/lib/profile.test.ts`.

### `profile: Profile` (facts)

| Field | Type | Source (`ulascanerturk.md` §) | Notes |
|---|---|---|---|
| `name` | string | title (H1) | "Ulaşcan Ertürk" |
| `headline` | string | subtitle line under H1 | "Yazılım Geliştirici · Teknoloji Girişimcisi · Full-Stack …" |
| `tagline` | string | §1, §8 "Ürün mühendisliği", 02 §1 ana mesaj | hero sentence; contains `since` (tested) |
| `location` | string | §2 | city/country only: "İstanbul, Türkiye" |
| `since` | number | §1, §2 | 2018 |
| `summary` | string[] | §1 (paragraphs 1–2), §3 "Disiplinler arası yaklaşım" | 3 paragraphs (Hakkımda) |
| `skills` | `{ category, items[], note? }[]` | §4 table | 11 categories; table cells split into tags; Java note "Eğitim ve önceki uygulama deneyimi." |
| `experience` | `{ organization, role?, url?, highlights[], note?, products?[] }[]` | §5, §6 | Insapption: no `role` — highlight "kamuya açık ekip sayfasında Technology Officer olarak listeleniyorum"; Shifter: `products` = Shifter Pro (single-tenant) / Shifter Lite (SaaS) with 4 problem areas each (S1) |
| `workAreas` | `{ items[], note }` | §6 "Diğer yazılım çalışma alanları" + note | 5 items; not presented as products |
| `education` | `{ institution, program, kind: 'degree' \| 'training' }[]` | §3 | ESOGÜ = `degree` (only one, tested); BAU & Wissen, ODTÜ = `training` |
| `ecosystem` | `{ context, programs[], note }` | §7 | context "Shifter girişimi bağlamında katılınan programlar"; 5 programs; not personal awards |
| `focusAreas` | `{ title, description }[]` | §8 | 7 areas (tested) |
| `links` | `{ label, url, kind }[]` | §10 + S2 | GitHub, LinkedIn, Insapption, Insapption ekip sayfası, Shifter (`product`), Shifter Blog (`blog`); https only, no e-mail/phone (tested) |
| `lastUpdated` | string (ISO) | front matter `last_updated` | rendered via `formatDate` as "Son güncelleme: 17 Ekim 2026" |

### `profilePage: ProfilePageText` (page text for `/`)

| Field | Content | Source |
|---|---|---|
| `description` | meta description (≤ 160, tested) | §1, §2 |
| `hero.actions` | `{ kind, label }[]` — "GitHub profili", "LinkedIn profili" (URL resolved from `links` by `kind`) | S2 |
| `about`, `skills`, `experience`, `education`, `ecosystem`, `focusAreas`, `links` | `{ id, title }` + section extras: `skills.intro` (§4 "Öne çıkan teknik yaklaşım"), `experience.problemsLabel` / `workAreasTitle` / `note` (§5 note), `education.groups` / `kindLabels` ("Lisans", "Eğitim programı") / `note` (§3 note), `ecosystem.intro` (§7 paragraph 1) | 02 §2–§3 |
| `footnote` | `text` (§11 self-declaration note), `updatedLabel` "Son güncelleme:" | §11 (task 7, lead decision: end of `/`) |

Not on the page: §9 and every §11 exclusion; `#projeler` comes in Faz 3 task 8.

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

Expected outline: edit `ulascanerturk.md` (bump `last_updated`) → sync `src/data/profile.ts`
(keep the `// kaynak` comments; update `lastUpdated`; `profile.en.ts` after Faz 6) → lead
wording approval → update the mapping above → `test-lint all`.

## Known Issues / Gotchas

- `ulascanerturk.md` front matter `last_updated: 2026-10-17` must be bumped whenever it changes.
- `profile.lastUpdated` in `src/data/profile.ts` mirrors that front matter date — change both together.
