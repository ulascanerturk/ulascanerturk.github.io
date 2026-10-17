# references/content_schema.md — Content Schema

> Last updated: 2026-10-17 (Faz 6 — feat/faz-6-english-version)
> Source of truth for design: plans/. Content source: ulascanerturk.md. This file maps the CURRENT state.
> Legend: [PLANNED — plan §] not implemented yet · [REVIEW NEEDED] unverified · [PLAN DRIFT] code ≠ plans

`src/data/site.ts` (Faz 1), `src/data/profile.ts` (Faz 2), `src/data/projects.ts`,
`src/content.config.ts` and `src/content/projects/` (Faz 3) exist. Since Faz 6 every text exists in
Turkish and English: `profile.tr.ts` / `profile.en.ts`, `siteText` and `projectsPage` keyed by
`Locale`, English project entries in `src/content/projects/en/`.

## Content Sources

```
ulascanerturk.md (source, repo root, never published directly; Turkish)
  ├──► src/data/profile.tr.ts         profile data + page text  ✅ (title, §1–§8, §10, §11 note)
  │      └──► src/data/profile.en.ts  English translation       ✅ (same facts; approved 2026-10-17)
  ├──► src/data/site.ts               site meta + `siteText.tr|en` (nav, UI text)  ✅ (title, §1, §10)
  ├──► src/data/projects.ts           project page UI text `tr|en` ✅ (labels only, no facts)
  ├──► src/content/projects/*.md      Turkish project pages     ✅ (§6 "Lockbox")
  └──► src/content/projects/en/*.md   English project pages     ✅ (translation, same slug)
```

**Translations (Faz 6, ADR-006).** English text is a translation of the Turkish data, never a new
source: no fact, number or claim that is not in the Turkish file / `ulascanerturk.md`. The
distinctions hold in English too — "bachelor's degree in International Relations" vs "training
program", "in the context of the Shifter startup", "listed as Technology Officer on the company's
public team page", titles may change. Organization and program names keep their original form
(İTÜ Çekirdek, BTM (Bilgiyi Ticarileştirme Merkezi), Shifter Teknoloji); universities use their
official English names. English wording approved by the lead on 2026-10-17; every later change
needs the same approval.

Approved facts that are not yet in `ulascanerturk.md` must be added there when
approved. Lockbox is in §6 since Faz 3 (2026-10-17); the LinkedIn URL in §10 since commit 578d8e0.

## Site Data (`src/data/site.ts`) ✅

`site: SiteConfig` (language-neutral: `name`, `url`, `titleSeparator`) + `siteText: Record<Locale, SiteText>`
— all UI text for the shell (no text in components; layouts pass it as props). A missing locale or
field is a type error. Turkish wording approved 2026-10-17 (Faz 1 plan), English 2026-10-17 (Faz 6).

| Field | Value / content | Source |
|---|---|---|
| `site.name` | "Ulaşcan Ertürk" | title (H1) |
| `site.url` | `https://ulascanerturk.github.io` | S5 |
| `site.titleSeparator` | " · " → `"{page} · Ulaşcan Ertürk"` | faz-1 task 5 |
| `lang`, `og:locale` | from `LOCALE_META` in `src/lib/i18n.ts`: `tr`/`tr_TR`, `en`/`en_US` | ADR-006 |
| `description` | tr: default meta description (İstanbul, yazılım geliştirici ve teknoloji girişimcisi; web, mobil, B2B SaaS); en: same in English | §1 |
| `ogImage` | tr: `/og/default.png`, alt "Ulaşcan Ertürk — Yazılım Geliştirici · Teknoloji Girişimcisi" (Faz 4); en: `/og/default-en.png`, alt "Ulaşcan Ertürk — Software Developer · Technology Entrepreneur" (Faz 6); 1200×630 | title line |
| `jsonLd.jobTitle` | "Yazılım Geliştirici" / "Software Developer" (Person `jobTitle`; `worksFor` omitted — lead decision, Faz 4) | §2 "Mesleki tanım" |
| `skipLink`, `newTabHint`, `themeToggleLabel` | "İçeriğe geç", "(yeni sekmede açılır)", "Koyu tema" / "Skip to content", "(opens in a new tab)", "Dark theme" | UI text |
| `languageName` | "Türkçe" / "English" — text of the header language link on the other locale's pages | UI text (Faz 6) |
| `nav` | "Ana menü": Hakkımda (`/#hakkimda`), Projeler (`/projeler/`), GitHub, LinkedIn / "Main menu": About (`/en/#about`), Projects (`/en/projects/`), GitHub, LinkedIn | §10 |
| `footer` | "Alt bağlantılar" / "Footer links"; © holder; GitHub, LinkedIn, Kaynak kodu / Source code (`github.com/ulascanerturk/ulascanerturk.github.io`) | §10, ADR-002 |
| `notFound` | tr: "Sayfa bulunamadı", message, "Ana sayfaya dön" (`/`), "Projelere göz at" (`/projeler/`); en (English part of `/404.html`): "Page not found", message, "Go to the English home page" (`/en/`) | UI text |

## Profile (`src/data/profile.ts` + `profile.tr.ts` / `profile.en.ts`) ✅ (plans/01-mimari.md §4.1, ADR-005 accepted 2026-10-17)

`profile.ts` holds the types (`Profile`, `ProfilePageText`, …) and `profiles: Record<Locale, { profile, page }>`.
`profile.tr.ts` and `profile.en.ts` each export `profile` and `profilePage` (type-only import from
`profile.ts`). Every field has a `// kaynak: ulascanerturk.md §N` comment (in both files).
Wording is **first person** (lead decision); Turkish approved 2026-10-17 (Faz 2), English
2026-10-17 (Faz 6). Structural and translation-parity tests: `src/lib/profile.test.ts`.
The tables below describe the Turkish values; English mirrors them field by field.

### `profile: Profile` (facts)

| Field | Type | Source (`ulascanerturk.md` §) | Notes |
|---|---|---|---|
| `name` | string | title (H1) | "Ulaşcan Ertürk" |
| `headline` | string | subtitle line under H1 | "Yazılım Geliştirici · Teknoloji Girişimcisi · Full-Stack …" |
| `tagline` | string | §1, §8 "Ürün mühendisliği", 02 §1 ana mesaj | hero sentence; contains `since` (tested) |
| `location` | string | §2 | city/country only: "İstanbul, Türkiye" / "Istanbul, Türkiye" |
| `since` | number | §1, §2 | 2018 |
| `summary` | string[] | §1 (paragraphs 1–2), §3 "Disiplinler arası yaklaşım" | 3 paragraphs (Hakkımda) |
| `skills` | `{ category, items[], note? }[]` | §4 table | 11 categories; table cells split into tags; Java note "Eğitim ve önceki uygulama deneyimi." |
| `experience` | `{ organization, role?, url?, highlights[], note?, products?[] }[]` | §5, §6 | Insapption: no `role` — highlight "kamuya açık ekip sayfasında Technology Officer olarak listeleniyorum"; Shifter: `products` = Shifter Pro (single-tenant) / Shifter Lite (SaaS) with 4 problem areas each (S1) |
| `workAreas` | `{ items[], note }` | §6 "Diğer yazılım çalışma alanları" + note | 5 items; not presented as products |
| `education` | `{ institution, program, kind: 'degree' \| 'training' }[]` | §3 | ESOGÜ = `degree` (only one, tested; EN "Bachelor's degree in International Relations (taught in English)"); BAU & Wissen, ODTÜ = `training` (EN "… training program(s)", METU) |
| `ecosystem` | `{ context, programs[], note }` | §7 | context "Shifter girişimi bağlamında katılınan programlar" / "Programs joined in the context of the Shifter startup"; 5 programs; not personal awards |
| `focusAreas` | `{ title, description }[]` | §8 | 7 areas (tested) |
| `links` | `{ label, url, kind }[]` | §10 + S2 | GitHub, LinkedIn, Insapption, Insapption ekip sayfası, Shifter (`product`), Shifter Blog (`blog`); https only, no e-mail/phone (tested) |
| `lastUpdated` | string (ISO) | front matter `last_updated` | rendered via `formatDate` as "Son güncelleme: 17 Ekim 2026" / "Last updated: October 17, 2026"; same value in both files (tested) |

### `profilePage: ProfilePageText` (page text for `/` and `/en/`)

| Field | Content | Source |
|---|---|---|
| `title?` | only EN: "Software Developer" → `<title>` "Software Developer · Ulaşcan Ertürk" (titles must be unique site-wide — Faz 6 fix cycle 1, lead decision); TR omits it (title = site name) | §2 |
| `description` | meta description (≤ 160, tested) | §1, §2 |
| `hero.actions` | `HeroAction[]` = `{ kind, label }` (URL resolved from `links` by `kind`, external) \| `{ href, label }` (internal) — "Projeleri gör" (`/projeler/`, Faz 3), "GitHub profili", "LinkedIn profili" / "View projects" (`/en/projects/`), "GitHub profile", "LinkedIn profile" | S2, 02 §3 |
| `about`, `skills`, `experience`, `projects`, `education`, `ecosystem`, `focusAreas`, `links` | `{ id, title }` (EN ids: `about`, `skills`, `experience`, `projects`, `education`, `entrepreneurship`, `focus-areas`, `links`) + section extras: `projects.allLabel` "Tüm projeler" (`#projeler` "Öne çıkan projeler", Faz 3), `skills.intro` (§4 "Öne çıkan teknik yaklaşım"), `experience.problemsLabel` / `workAreasTitle` / `note` (§5 note), `education.groups` / `kindLabels` ("Lisans", "Eğitim programı") / `note` (§3 note), `ecosystem.intro` (§7 paragraph 1) | 02 §2–§3 |
| `footnote` | `text` (§11 self-declaration note), `updatedLabel` "Son güncelleme:" | §11 (task 7, lead decision: end of `/`) |

Not on the page: §9 and every §11 exclusion. `#projeler` (Faz 3) shows the `featured` project entries.

## Project Page Text (`src/data/projects.ts`) ✅

`projectsPage: Record<Locale, ProjectsPageText>` — UI text only (Turkish approved 2026-10-17, Faz 3 plan;
English 2026-10-17, Faz 6). Turkish values below; English: Projects · Products / Open source / Client
work / Work areas · In active development / Completed / Archived · Role / Period / Status · ongoing ·
Technologies · Links · All projects · Project navigation / Previous project / Next project.

| Field | Content |
|---|---|
| `list` | title "Projeler", meta description (≤ 160), intro sentence |
| `kindLabels` | Ürünler · Açık kaynak · Müşteri çalışmaları · Çalışma alanları (group headings, shown only with ≥ 2 kinds) |
| `statusLabels` | active "Aktif geliştirmede" · completed "Tamamlandı" · archived "Arşivlendi" |
| `meta` / `ongoing` | Rol · Dönem · Durum / "devam ediyor" (→ `formatPeriod`) |
| `techLabel`, `linksTitle`, `backLink` | "Teknolojiler" (tag list `aria-label`), "Bağlantılar", "Tüm projeler" |
| `pager` | label "Proje gezinmesi", "Önceki proje", "Sonraki proje" |

## Structured Data (JSON-LD) ✅ (faz-4 §2 task 3, `src/lib/seo.ts`)

Built in the pages from existing data; rendered by `Seo.astro` as `<script type="application/ld+json">`
(`<` escaped). Public professional fields only — `FORBIDDEN_JSON_LD_KEYS` (email, telephone, address,
homeLocation, birthDate, …) are rejected by Vitest (`seo.test.ts`) and `check:dist`.

| Page | Type | Fields → source |
|---|---|---|
| `/`, `/en/` | `ProfilePage` (`@id` = locale home URL, `name` = `site.name`, `inLanguage` = `tr`/`en`, `dateModified` = `profile.lastUpdated`) → `mainEntity` `Person` | `@id` `{root}/#person` in both languages (one person); `name` ← `profile.name`; `url` ← root home; `jobTitle` ← `siteText[locale].jsonLd.jobTitle` (§2); `description` ← `profilePage.description`; `knowsAbout` ← `profile.focusAreas[].title` (§8); `sameAs` ← `profile.links` of kind github/linkedin (§10) |
| `/projeler/{slug}/`, `/en/projects/{slug}/` | `CreativeWork` | `name` ← `title`; `description` ← `summary`; `url`; `inLanguage` (`tr`/`en`); `keywords` ← `tech` (joined); `dateCreated` ← `period.start` (only when set); `author` → Person `{root}/#person` |
| `/projeler/`, `/en/projects/`, `/404.html` | none | — |

Not used on purpose: `worksFor` (§5 wording "profesyonel bağı", titles may change — lead decision),
`SoftwareApplication` (expects offers/ratings), `image` (no photo — S3).

## Share Images ✅ (faz-4 §2 tasks 2 and 6)

| File | Size | Source | Text |
|---|---|---|---|
| `public/og/default.png` | 1200×630 | `scripts/images/og-default.html` → `npm run images` | monogram, "Ulaşcan Ertürk", "Yazılım Geliştirici · Teknoloji Girişimcisi", `ulascanerturk.github.io` (title line; lead approval 2026-10-17) |
| `public/og/default-en.png` | 1200×630 | `scripts/images/og-default-en.html` → `npm run images` | same design, "Software Developer · Technology Entrepreneur" (lead approval 2026-10-17, Faz 6); default `og:image` of the English pages |
| `public/apple-touch-icon.png` | 180×180 | `scripts/images/apple-touch-icon.html` | "UE" monogram |
| project cover → `og:image` | 1200 px JPEG (`getImage`) | entry `cover` | `og:image:alt` = `coverAlt` |

Rendered with local Chrome headless + ImageMagick `-strip`; PNG chunks verified (IHDR/IDAT/IEND
[+PLTE] only). Re-run `npm run images` after changing a source or the wording (lead approval first).

## Collections

### projects (`src/content/projects`, glob loader) ✅ (`src/content.config.ts`, plans/01-mimari.md §4.2)

`glob({ pattern: '**/*.md', base: './src/content/projects' })`; zod from `astro/zod` (zod 4);
`kind` / `status` enums shared with `src/lib/projects.ts` (`PROJECT_KINDS`, `PROJECT_STATUSES`).
Languages (Faz 6): Turkish entries at the root (`id` = `{slug}`), English entries in `en/`
(`id` = `en/{slug}`); the schema is the same, the locale comes from the id (`splitEntryId`).
Every published project must exist in both languages with identical `kind`, `status`, `featured`,
`order` and `period` — `loadProjects` throws otherwise, so `astro build` fails
(`translationProblems`, `src/lib/i18n.ts`).

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
| `cover` | `image()` | `src/assets/projects/` | ⬜ | metadata stripped; rendered with `astro:assets` `<Picture>` (AVIF/WebP, widths 480/768/1536 capped at the source, eager + `fetchpriority=high`); also the page's `og:image` (1200 px JPEG) — Faz 4 |
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
| `en/lockbox-mobile` | Lockbox — Offline Password Vault | `product` | `active` ("In active development") | ✅ (`order: 1`) | — | translation of `lockbox-mobile.md` (sections Problem · Solution · Technologies · My Role · Status) | ✅ 2026-10-17 (Faz 6) |

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
| `public/og/default.png`, `public/apple-touch-icon.png` | share image, touch icon (see Share Images) | ✅ generated with `-strip`; chunks checked | own work (monogram + name) | `site.ogImage.alt` / decorative icon |

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
6. **English version.** Add `src/content/projects/en/{slug}.md` with the same slug, translated
   `title` / `summary` / `role` / `disclaimer` / `links[].label` / body and **identical** `kind`,
   `status`, `featured`, `order`, `period` (and the same `draft` state — a published project
   without its translation fails the build). Same `cover` path; translate `coverAlt`. The English
   text needs the lead's approval too. URL: `/en/projects/{slug}/`.
7. **Check.** `npm run dev` shows drafts; set `draft: false` after approval, run `test-lint all`
   (build validates the schema; dist checks cover h1, links, meta), then update this file's
   Project Entries table and `references/phase_progress.md`.

No code change is needed for a new entry. A second `kind` automatically switches `/projeler/`
to grouped sections (`kindLabels`).

## How to Update the Profile [PLANNED — plans/fazlar/faz-6-ingilizce-surum-ve-bakim.md §2.2 task 8]

Expected outline: edit `ulascanerturk.md` (bump `last_updated`) → sync `src/data/profile.tr.ts`
and `src/data/profile.en.ts` (keep the `// kaynak` comments; update `lastUpdated` in both — the
parity test fails otherwise) → lead wording approval (both languages) → update the mapping above →
`test-lint all`. Written out in Faz 6 task 8 (maintenance branch).

## Known Issues / Gotchas

- `ulascanerturk.md` front matter `last_updated: 2026-10-17` must be bumped whenever it changes.
- `profile.lastUpdated` in `src/data/profile.tr.ts` and `profile.en.ts` mirrors that front matter date — change all three together.
- A new list item (skill, highlight, link, …) must be added to both profile files in the same position; the parity test in `src/lib/profile.test.ts` compares list lengths, link URLs/kinds and education kinds.
