# 01 — Mimari

> Kararların gerekçeleri: [`ekler/karar-kayitlari.md`](ekler/karar-kayitlari.md).
> Sürüm numaraları Faz 0'da güncel birincil kaynaklardan doğrulanır ve
> `references/methodology.md` içine yazılır; bu belgede bilinçli olarak sabitlenmemiştir.

## 1. Teknoloji Yığını

| Katman | Seçim | ADR |
|---|---|---|
| Statik site üreticisi | **Astro** (güncel kararlı sürüm), TypeScript `strict` | ADR-001 |
| Barındırma | **GitHub Pages** (kullanıcı sitesi: `ulascanerturk/ulascanerturk.github.io`) | ADR-002 |
| Dağıtım | GitHub Actions — `withastro/action` + `actions/deploy-pages` | ADR-002 |
| Stil | Native CSS + custom properties (token'lar), Astro scoped style; CSS framework yok | ADR-003 |
| İstemci JS | Framework yok; yalnızca tema geçişi için küçük inline script | ADR-004 |
| İçerik | Astro content collections (`projects`) + tipli `src/data/profile.ts` | ADR-005 |
| Dil | `tr-TR` birincil (öneksiz URL'ler); `en` `/en/` altında (Faz 6, S4) | ADR-006 |
| Analitik | Yok (v1) | ADR-007 |
| Çalışma ortamı | Node.js güncel LTS (`.nvmrc`), npm | ADR-008 |
| Yazı tipi | Sistem font yığını (harici font isteği yok) | ADR-009 |
| Kalite | `astro check`, ESLint (`eslint-plugin-astro`, `eslint-plugin-jsx-a11y`), Prettier (`prettier-plugin-astro`), Vitest, dist denetim betiği, Lighthouse CI | ADR-010 |

**Neden Astro?** (özet) Varsayılan olarak sıfır JS üreten, Markdown/MDX içerik
koleksiyonlarını şema doğrulamasıyla sunan, GitHub Pages için resmî dağıtım
aksiyonu bulunan bir statik site üreticisidir. JavaScript/TypeScript tabanlı
olduğu için mevcut React deneyimiyle uyumludur; ileride etkileşim gerekirse
React bileşeni "island" olarak eklenebilir. Alternatifler ve maliyetler ADR-001'de.

## 2. Klasör Yapısı (hedef)

```
ulascanerturk.github.io/
├── .github/workflows/
│   ├── ci.yml                  # PR / push: check + lint + test + build + dist denetimi
│   └── deploy.yml              # main → GitHub Pages
├── .agents/skills/             # Codex skill'leri ($skill-name)
├── .claude/skills/             # Claude Code skill'leri (/skill-name)
├── plans/                      # Spesifikasyon (bu klasör)
├── references/                 # Güncel durum haritaları (init-references ile üretilir)
├── public/
│   ├── favicon.svg
│   ├── robots.txt              # Faz 4
│   └── og/                     # Paylaşım görselleri (Faz 4)
├── scripts/
│   └── check-dist.mjs          # Derlenmiş HTML denetimi (Faz 4)
├── src/
│   ├── assets/                 # astro:assets ile işlenen görseller
│   ├── components/             # Sunum bileşenleri (.astro)
│   │   ├── layout/             # SiteHeader, SiteFooter, SkipLink, ThemeToggle
│   │   ├── profile/            # Hero, SkillsTable, ExperienceList, ...
│   │   ├── projects/           # ProjectCard, ProjectMeta, ProjectLinks
│   │   └── ui/                 # Section, Tag, ExternalLink, Callout
│   ├── content/
│   │   └── projects/           # *.md — her proje bir dosya (Türkçe)
│   │       └── en/             # *.md — aynı slug ile İngilizce karşılık (Faz 6)
│   ├── content.config.ts       # Koleksiyon şemaları (zod)
│   ├── data/
│   │   ├── profile.ts          # Profil tipleri + `profiles: Record<Locale, …>` (Faz 6)
│   │   ├── profile.tr.ts       # Profil verisi (ulascanerturk.md'den türetilir)
│   │   ├── profile.en.ts       # İngilizce çevirisi (Faz 6, lead onaylı)
│   │   ├── projects.ts         # Proje sayfası arayüz metinleri (dil başına)
│   │   └── site.ts             # Site meta verisi + dil başına arayüz metni ve nav
│   ├── layouts/
│   │   ├── BaseLayout.astro    # <html lang>, <head> (Seo, hreflang), header/footer, skip link
│   │   ├── HomeLayout.astro    # Profil sayfası gövdesi (/ ve /en/, Faz 6)
│   │   ├── ProjectListLayout.astro # Proje listesi gövdesi (Faz 6)
│   │   └── ProjectLayout.astro # Proje detay sayfası iskeleti
│   ├── lib/                    # Saf TS yardımcıları (slug, tarih, sıralama, i18n) + testleri
│   ├── pages/
│   │   ├── _shared/            # Sayfa katmanı yardımcıları (route değil; Faz 6)
│   │   ├── index.astro         # Profil (ana sayfa)
│   │   ├── projeler/
│   │   │   ├── index.astro     # Proje listesi
│   │   │   └── [slug].astro    # Proje detayları (getStaticPaths)
│   │   ├── en/                 # İngilizce sürüm: index, projects/index, projects/[slug] (Faz 6)
│   │   └── 404.astro
│   └── styles/
│       ├── tokens.css          # Renk, tipografi, boşluk, radius, gölge token'ları
│       └── global.css          # Reset, temel tipografi, yardımcı sınıflar
├── astro.config.mjs
├── eslint.config.js
├── .prettierrc
├── tsconfig.json
├── vitest.config.ts
├── package.json
├── AGENTS.md / CLAUDE.md
└── ulascanerturk.md            # İçerik kaynak belgesi (sitede doğrudan yayınlanmaz)
```

## 3. Katmanlar ve Bağımlılık Yönü

```
src/pages  ──►  src/layouts  ──►  src/components  ──►  src/lib
     │                                   ▲
     └──► astro:content (src/content) ───┘   src/data (profile, site)
```

| Katman | Yollar | Import edebilir | Import edemez |
|---|---|---|---|
| Sayfa | `src/pages/**` (`_shared/` dahil) | layouts, components, data, lib, `astro:content` | — |
| Layout | `src/layouts/**` | components, data, lib | pages |
| Bileşen | `src/components/**` | diğer components, lib | pages, layouts, `astro:content` (veri prop ile gelir) |
| Veri | `src/data/**`, `src/content/**` | lib (yalnızca tipler) | pages, layouts, components |
| Yardımcı | `src/lib/**` | yalnızca diğer lib modülleri | Astro bileşenleri, `astro:*` modülleri |

Kurallar:

- Bileşenler veriyi **prop** olarak alır; koleksiyon sorgusu (`getCollection`)
  yalnızca sayfalarda yapılır (iki dilin ortak sorgu ve prop eşlemesi
  `src/pages/_shared/` altında — `_` öneki route üretmez; Faz 6). Böylece bileşenler test edilebilir ve yeniden
  kullanılabilir kalır.
- `src/lib` saf TypeScript'tir; Vitest ile birim testi yazılır.
- Kullanıcıya görünen metinler bileşen içine gömülmez; `src/data/*` veya içerik
  dosyalarından gelir (Faz 6'daki İngilizce sürüm için ön koşul).
- Her dış bağlantı `ExternalLink` bileşeni ile verilir
  (`rel="noopener noreferrer"`, yeni sekme yalnızca bilinçli tercih ile).

## 4. İçerik Modeli

### 4.1 Profil (`src/data/profile.ts` + `profile.{tr,en}.ts`)

`ulascanerturk.md` belgesinden elle türetilen, tipli bir nesne. Faz 6'dan itibaren
dil başına bir dosya (`profile.tr.ts`, `profile.en.ts`) aynı `Profile` tipini doldurur;
`profile.ts` tipleri ve `profiles: Record<Locale, …>` kaydını tutar. Alanlar
(ayrıntı: [`02-icerik-ve-tasarim.md` §3](02-icerik-ve-tasarim.md)):

```ts
export interface Profile {
  name: string;                       // "Ulaşcan Ertürk"
  headline: string;                   // "Yazılım Geliştirici · Teknoloji Girişimcisi · ..."
  tagline: string;                    // Hero'daki tek cümlelik özet (Faz 2)
  location: string;                   // "İstanbul, Türkiye" (yalnızca şehir/ülke)
  since: number;                      // 2018
  summary: string[];                  // Kısa tanıtım paragrafları
  skills: { category: string; items: string[]; note?: string }[]; // note: Java "eğitim ve önceki deneyim"
  experience: {
    organization: string;
    role?: string;                    // Kamuya açık unvan; bağlam gerekiyorsa highlights'ta
    url?: string;
    highlights: string[];
    note?: string;                    // Unvan değişebilir uyarısı vb.
    products?: { name: string; description: string; problems: string[] }[]; // Shifter Pro / Lite (S1)
  }[];
  workAreas: { items: string[]; note: string }; // §6 "Diğer yazılım çalışma alanları" + not
  education: { institution: string; program: string; kind: 'degree' | 'training' }[];
  ecosystem: { context: string; programs: string[]; note: string };
  focusAreas: { title: string; description: string }[];
  links: { label: string; url: string; kind: 'github' | 'linkedin' | 'company' | 'product' | 'blog' | 'other' }[];
  lastUpdated: string;                // ISO tarih — ulascanerturk.md `last_updated`
}
```

Sayfa metinleri (bölüm başlıkları ve `id` çapaları, giriş cümleleri, etiketler,
dipnot, meta açıklaması) aynı dosyada ayrı bir `profilePage` nesnesindedir;
bileşenler bunları prop olarak alır (Faz 2, lead onayı 2026-10-17).

### 4.2 Projeler (`src/content/projects/*.md`)

`src/content.config.ts` içinde `glob` loader ve zod şeması ile tanımlanır.
Dosya adı slug'dır (ASCII, küçük harf, tire; ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u).
İngilizce karşılık aynı slug ile `src/content/projects/en/` altındadır (Faz 6); şema
aynıdır, yayımlanmış her projenin iki dili de olmalıdır (aksi halde derleme hatası).

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `title` | string (1–80) | ✅ | |
| `summary` | string (50–160) | ✅ | Liste kartı + meta description (≤ 160 — kontrol listesi; Faz 3 lead onayı 2026-10-17) |
| `kind` | `'product' \| 'open-source' \| 'client-work' \| 'focus-area'` | ✅ | |
| `status` | `'active' \| 'completed' \| 'archived'` | ✅ | |
| `role` | string | ✅ | Projedeki kamuya açık rol |
| `period` | `{ start: number; end?: number }` | ⬜ | Yıl düzeyinde; bilinmiyorsa yazılmaz |
| `tech` | string[] | ✅ | Etiket olarak gösterilir |
| `links` | `{ label, url }[]` | ⬜ | Yalnızca kamuya açık bağlantılar |
| `cover` | image() | ⬜ | `src/assets/projects/` — EXIF temizlenmiş |
| `coverAlt` | string | `cover` varsa ✅ | Kapak görselinin `alt` metni (Faz 3 lead onayı 2026-10-17) |
| `featured` | boolean | ⬜ | Ana sayfada gösterim |
| `order` | number | ⬜ | Liste sırası (küçük önce) |
| `draft` | boolean | ⬜ | `true` ise derlemeye girmez |
| `disclaimer` | string | ⬜ | Ör. "Gizli müşteri ayrıntıları paylaşılmamıştır." |

Gövde bölümleri (önerilen): **Problem**, **Çözüm**, **Rolüm**, **Teknolojiler**,
**Öğrenimler**. Ölçülebilir sonuç yalnızca kamuya açık kaynak veya lead onayı ile.

## 5. Yönlendirme (Routing)

| URL | Dosya | Faz |
|---|---|---|
| `/` | `src/pages/index.astro` | 2 |
| `/projeler/` | `src/pages/projeler/index.astro` | 3 |
| `/projeler/{slug}/` | `src/pages/projeler/[slug].astro` | 3 |
| `/404.html` | `src/pages/404.astro` | 1 |
| `/sitemap-index.xml` | `@astrojs/sitemap` | 4 |
| `/en/` | `src/pages/en/index.astro` | 6 |
| `/en/projects/` | `src/pages/en/projects/index.astro` | 6 |
| `/en/projects/{slug}/` | `src/pages/en/projects/[slug].astro` | 6 |

`astro.config.mjs`: `site: 'https://ulascanerturk.github.io'`, `base` tanımlanmaz
(kullanıcı sitesi kökte yayınlanır), `trailingSlash: 'always'`,
`build.format: 'directory'`, `i18n` (`defaultLocale: 'tr'`, `prefixDefaultLocale: false`).
Dil karşılıkları (`hreflang`, sitemap) `src/lib/i18n.ts` rota haritasından üretilir (ADR-006).

## 6. Derleme, Kalite Kapısı ve Dağıtım Hattı

### 6.1 npm script'leri (Faz 0'da tanımlanır)

| Script | Komut | Amaç |
|---|---|---|
| `dev` | `astro dev` | Yerel geliştirme |
| `build` | `astro build` | `dist/` üretimi (içerik şemaları burada doğrulanır) |
| `preview` | `astro preview` | Derlenmiş çıktıyı yerelde sunma |
| `check` | `astro check` | TS + `.astro` tanılama |
| `lint` | `eslint .` | Lint (`--max-warnings 0` ile çalıştırılır) |
| `format` / `format:check` | `prettier --write .` / `prettier --check .` | Biçim |
| `test` | `vitest run` | `src/lib` birim testleri |
| `check:dist` | `node scripts/check-dist.mjs` | Derlenmiş HTML denetimi (Faz 4) |
| `lhci` | `lhci autorun` | Lighthouse CI (Faz 4) |

### 6.2 CI (`.github/workflows/ci.yml`)

Tetik: `pull_request`, `main` dışı dallara `push` ve `workflow_call` (`main`
push'larında deploy iş akışı çağırır). Adımlar: `npm ci` →
`check` → `lint --max-warnings 0` → `format:check` → `test` → `build` →
`check:dist` (Faz 4'ten itibaren).

### 6.3 Dağıtım (`.github/workflows/deploy.yml`)

Tetik: `main` dalına `push` + `workflow_dispatch`. Önce `quality-gate` işi
`ci.yml`'yi `workflow_call` ile çalıştırır (6.2'deki adımların tamamı); geçmezse
yayın yapılmaz. Ardından `withastro/action` ile derleme, `actions/deploy-pages` ile
yayın. İzinler: üst düzeyde `contents: read`; `pages: write` ve `id-token: write`
yalnızca `deploy` işinde. `concurrency: pages`. Depo ayarı: *Settings → Pages →
Source: GitHub Actions* (Faz 5).

## 7. Güvenlik ve Gizlilik Notları

- GitHub Pages özel HTTP başlığı ayarlamaya izin vermez; CSP gerekiyorsa
  `<meta http-equiv="Content-Security-Policy">` ile verilir (Faz 4, ADR-011 adayı).
- Harici kaynak (font, CDN, iframe) yüklenmez; böylece ziyaretçi verisi üçüncü
  taraflara sızmaz ve CSP basit kalır.
- Görseller depoya eklenmeden önce EXIF/GPS verisinden arındırılır
  (`exiftool -all= {dosya}` veya eşdeğeri) ve kontrol edilir.
- `ulascanerturk.md` depoda kalır ancak `public/` altına konmaz; site çıktısına
  doğrudan kopyalanmaz.
