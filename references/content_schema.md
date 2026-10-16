# references/content_schema.md — Content Schema

> Last updated: 2026-10-17 (Faz 3 — feat/faz-3-project-pages)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

`src/data/site.ts` (Faz 1), `src/data/profile.ts` (Faz 2), `src/data/projects.ts`,
`src/content.config.ts` and `src/content/projects/` (Faz 3) exist.

## Content Sources

```
ulascanerturk.md (source, repo root, never published directly)
  ├──► src/data/profile.ts            profile data + page text  ✅ (title, §1–§8, §10, §11 note)
  ├──► src/data/site.ts               site meta, nav, UI text   ✅ (title, §1, §10)
  ├──► src/data/projects.ts           project page UI text      ✅ (labels only, no facts)
  └──► src/content/projects/*.md      project pages             ✅ (§6 "Lockbox")
```

Approved facts that are not yet in `ulascanerturk.md` must be added there when
approved. Lockbox is in §6 since Faz 3 (2026-10-17); the LinkedIn URL in §10 since commit 578d8e0.

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
| `nav` | label "Ana menü"; Hakkımda (`/#hakkimda`), Projeler (`/projeler/`, Faz 3), GitHub, LinkedIn | §10 |
| `footer` | label "Alt bağlantılar"; © holder; GitHub, LinkedIn, Kaynak kodu (`github.com/ulascanerturk/ulascanerturk.github.io`) | §10, ADR-002 |
| `notFound` | "Sayfa bulunamadı", message, links "Ana sayfaya dön" (`/`), "Projelere göz at" (`/projeler/`, Faz 3) | UI text |

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
| `hero.actions` | `HeroAction[]` = `{ kind, label }` (URL resolved from `links` by `kind`, external) \| `{ href, label }` (internal) — "Projeleri gör" (`/projeler/`, Faz 3), "GitHub profili", "LinkedIn profili" | S2, 02 §3 |
| `about`, `skills`, `experience`, `projects`, `education`, `ecosystem`, `focusAreas`, `links` | `{ id, title }` + section extras: `projects.allLabel` "Tüm projeler" (`#projeler` "Öne çıkan projeler", Faz 3), `skills.intro` (§4 "Öne çıkan teknik yaklaşım"), `experience.problemsLabel` / `workAreasTitle` / `note` (§5 note), `education.groups` / `kindLabels` ("Lisans", "Eğitim programı") / `note` (§3 note), `ecosystem.intro` (§7 paragraph 1) | 02 §2–§3 |
| `footnote` | `text` (§11 self-declaration note), `updatedLabel` "Son güncelleme:" | §11 (task 7, lead decision: end of `/`) |

Not on the page: §9 and every §11 exclusion. `#projeler` (Faz 3) shows the `featured` project entries.

## Project Page Text (`src/data/projects.ts`) ✅

`projectsPage: ProjectsPageText` — UI text only (approved by the lead 2026-10-17, Faz 3 plan).

| Field | Content |
|---|---|
| `list` | title "Projeler", meta description (≤ 160), intro sentence |
| `kindLabels` | Ürünler · Açık kaynak · Müşteri çalışmaları · Çalışma alanları (group headings, shown only with ≥ 2 kinds) |
| `statusLabels` | active "Aktif geliştirmede" · completed "Tamamlandı" · archived "Arşivlendi" |
| `meta` / `ongoing` | Rol · Dönem · Durum / "devam ediyor" (→ `formatPeriod`) |
| `techLabel`, `linksTitle`, `backLink` | "Teknolojiler" (tag list `aria-label`), "Bağlantılar", "Tüm projeler" |
| `pager` | label "Proje gezinmesi", "Önceki proje", "Sonraki proje" |

## Collections

### projects (`src/content/projects`, glob loader) ✅ (`src/content.config.ts`, plans/01-mimari.md §4.2)

`glob({ pattern: '**/*.md', base: './src/content/projects' })`; zod from `astro/zod` (zod 4);
`kind` / `status` enums shared with `src/lib/projects.ts` (`PROJECT_KINDS`, `PROJECT_STATUSES`).

| Field | Type | Constraints | Required | Notes |
|---|---|---|---|---|
| `title` | string | 1–80 | ✅ | `<h1>` + `<title>` |
| `summary` | string | **50–160** | ✅ | card text + meta description (≤ 160 — lead-approved deviation from 50–200, 2026-10-17) |
| `kind` | enum | `product` · `open-source` · `client-work` · `focus-area` | ✅ | list grouping (≥ 2 kinds) |
| `status` | enum | `active` · `completed` · `archived` | ✅ | also the sort order |
| `role` | string | min 1 | ✅ | public role in the project |
| `period` | `{ start: int; end?: int }` | years 1990–2100, `end ≥ start` | ⬜ | omit if unknown; no `end` → "{start} – devam ediyor" |
| `tech` | string[] | ≥ 1 | ✅ | rendered as tags |
| `links` | `{ label, url }[]` | `url` https only | ⬜ | public URLs only; section hidden when empty |
| `cover` | `image()` | `src/assets/projects/` | ⬜ | metadata stripped; rendered with `astro:assets` `<Image>` |
| `coverAlt` | string | min 1 | with `cover` ✅ | refine: required when `cover` is set (lead-approved addition) |
| `featured` | boolean | default `false` | ⬜ | shown on `/` (`#projeler`) |
| `order` | int | — | ⬜ | lower first; missing → last |
| `draft` | boolean | default `false` | ⬜ | excluded from production builds (`isPublished`), visible in `astro dev` |
| `disclaimer` | string | min 1 | ⬜ | rendered as Callout after the content |

Slug = file name = `entry.id` (ASCII, lowercase, hyphens). Body sections used by Lockbox:
Problem · Çözüm · Teknolojiler · Rolüm · Durum (`##` = h2; "Öğrenimler" only with a source).
Schema check (faz-3 §3): an entry without `summary` and with `status: live` fails `astro build`
with `InvalidContentEntryDataError` (verified 2026-10-17 with a temporary file, then deleted).

## Project Entries

| Slug | Title | kind | status | featured | draft | Source | Approved |
|---|---|---|---|---|---|---|---|
| `lockbox-mobile` | Lockbox — Çevrimdışı Parola Kasası | `product` | `active` ("Aktif geliştirmede"; body: geliştirme aşamasında, mağaza yayını hazırlanıyor) | ✅ (`order: 1`) | — | `ulascanerturk.md` §6 "Lockbox"; `lockbox-mobile/docs/00-genel-bakis.md` + repo state (iOS build on App Store Connect/TestFlight 2026-10-16, not published) | ✅ 2026-10-17 |

Lockbox decisions (lead, 2026-10-17): title uses the store name "Lockbox" (store: "Lockbox -
Password Vault"), slug stays `lockbox-mobile`; status wording "geliştirme aşamasında; App Store
ve Google Play yayını hazırlanıyor" (no TestFlight/console details); security at plan level
(Argon2id, AEAD, iOS Keychain / Android Keystore — no algorithm names beyond that, no vault
format, no threat model); role "Tasarım ve geliştirme (bireysel proje)"; period 2026 – ongoing;
no `links` (not published, no public repo); no cover.
Left out on purpose: performance/coverage targets from the app docs, macOS version and
migration, TestFlight/console details. When the app is published: add store `links`, update the
"Durum" section, `summary` and `ulascanerturk.md` §6 together.

Out of scope (S1, 2026-10-17): Shifter Pro / Shifter Lite pages (covered in profile
experience), "Diğer çalışma alanları" page (short list on profile), LockBox macOS.

Project content limits (`plans/02-icerik-ve-tasarim.md` §4): high-level
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

## How to Add a Project ✅ (plans/fazlar/faz-3-proje-sayfalari.md §2 task 9)

Adding a project needs **one Markdown file** (plus its optional cover image); pages, list,
previous/next links and — with `featured: true` — the home page card are generated.

1. **Approve the facts.** Get the lead's approval for the project text, its publication status
   and which links are public; add a short entry to `ulascanerturk.md` §6 (bump `last_updated`
   and `profile.lastUpdated` if the date changes). New project pages need a lead decision (S1).
2. **Pick the slug.** ASCII, lowercase, hyphens (ç→c, ğ→g, ı/İ→i, ö→o, ş→s, ü→u — `slugify`
   in `src/lib/slug.ts`). The file name is the URL: `src/content/projects/{slug}.md` →
   `/projeler/{slug}/`.
3. **Write the front matter** (schema above; build fails on invalid data):
   ```yaml
   ---
   # kaynak: ulascanerturk.md §6 "{Proje}"; lead onayı: YYYY-MM-DD
   title: '{Başlık}'                # 1–80
   summary: '{Kart + meta açıklaması}'  # 50–160 karakter
   kind: product                    # product | open-source | client-work | focus-area
   status: active                   # active | completed | archived
   role: '{Kamuya açık rol}'
   period:                          # optional; omit `end` while ongoing
     start: 2024
   tech: [Astro, TypeScript]
   links:                           # optional; https, public only (no private repo, no unpublished store page)
     - label: 'App Store sayfası'
       url: 'https://…'
   featured: false                  # true → card on / (#projeler)
   order: 2                         # optional; lower first
   draft: true                      # keep true until the text is approved
   disclaimer: '…'                  # optional Callout
   ---
   ```
4. **Write the body** in the first person with `##` headings (Problem · Çözüm · Teknolojiler ·
   Rolüm · Durum / Öğrenimler). Only claims backed by `ulascanerturk.md` or the lead; no
   internal doc paths, unverified metrics, client names or confidential details.
5. **Cover image (optional).** Put it in `src/assets/projects/{slug}.{png|jpg|webp}`, use sample
   data only, strip metadata (`exiftool -all= {file}`; verify with `exiftool -a -G1 {file}` or
   `mdls` on macOS), then add `cover: ../../assets/projects/{slug}.png` and a meaningful
   `coverAlt` (required with `cover`). Record it in the Images table below.
6. **Check.** `npm run dev` shows drafts; set `draft: false` after approval, run `test-lint all`
   (build validates the schema; dist checks cover h1, links, meta), then update this file's
   Project Entries table and `references/phase_progress.md`.

No code change is needed for a new entry. A second `kind` automatically switches `/projeler/`
to grouped sections (`kindLabels`).

## How to Update the Profile [PLANNED — plans/fazlar/faz-6-ingilizce-surum-ve-bakim.md §2.2 task 8]

Expected outline: edit `ulascanerturk.md` (bump `last_updated`) → sync `src/data/profile.ts`
(keep the `// kaynak` comments; update `lastUpdated`; `profile.en.ts` after Faz 6) → lead
wording approval → update the mapping above → `test-lint all`.

## Known Issues / Gotchas

- `ulascanerturk.md` front matter `last_updated: 2026-10-17` must be bumped whenever it changes.
- `profile.lastUpdated` in `src/data/profile.ts` mirrors that front matter date — change both together.
