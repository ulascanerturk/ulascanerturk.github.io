# Faz 4 — SEO, Erişilebilirlik ve Performans

> Önkoşul: Faz 2 ve Faz 3 · Dal: `feat/faz-4-*` · Kapsam: `all`
> İlgili: [`01-mimari.md`](../01-mimari.md) §6, §7 · Değişmez Kural 3 ve 4 · ADR-010, ADR-011 (aday)

## 1. Amaç

Sitenin arama motorları, sosyal paylaşım ve yapay zekâ ajanları için doğru ve
tutarlı okunmasını; WCAG 2.2 AA ve Lighthouse ≥ 95 hedeflerini otomatik
denetimlerle güvenceye almak.

## 2. Görev Listesi

> Durum (2026-10-17, dal `feat/faz-4-seo-a11y-perf`): ✅ tamamlandı · ⏳ kısmen
> (ayrıntı §6 ve `references/phase_progress.md`).

### 2.1 SEO ve paylaşım

1. ✅ **`Seo.astro` bileşeni** (`BaseLayout` içinde): `title`, `description`,
   `canonical`, Open Graph (`og:type`, `og:title`, `og:description`, `og:url`,
   `og:image`, `og:locale=tr_TR`), Twitter Card (`summary_large_image`).
2. ✅ **OG görselleri.** Varsayılan site görseli (1200×630, `public/og/default.png`);
   proje sayfaları için proje kapağı veya varsayılan. (Derleme anında üretim
   isteniyorsa ayrı ADR.)
3. ✅ **JSON-LD.** Ana sayfada `Person` (`name`, `jobTitle`, `url`, `sameAs`
   → GitHub; `worksFor` yalnızca kamuya açık bilgi), proje sayfalarında
   `CreativeWork`/`SoftwareApplication` (yalnızca doğrulanabilir alanlar).
   Kişisel iletişim alanı (`email`, `telephone`, `address`) **eklenmez**.
4. ✅ **Sitemap.** `@astrojs/sitemap` (404 ve taslaklar hariç).
5. ✅ **`public/robots.txt`.** Tüm botlara izin + sitemap adresi.
   (Yapay zekâ tarayıcılarına izin/engel politikası lead kararı — varsayılan: izin.)
6. ✅ **Favicon seti.** `favicon.svg` + `apple-touch-icon.png` (180×180).

### 2.2 Erişilebilirlik

7. ✅ **Otomatik denetim.** `scripts/check-dist.mjs` (bağımlılıksız Node betiği):
   her HTML için `lang`, boş olmayan `<title>`, meta description, canonical,
   tam olarak bir `<h1>`, başlık seviyesi atlama yok, her `<img>` için `alt`,
   iç bağlantıların `dist/` içinde çözülmesi, `target="_blank"` bağlantılarda
   `rel="noopener"`. `npm run check:dist` olarak CI'a eklenir.
8. ✅ **axe denetimi.** `@axe-core/cli` veya `pa11y-ci` ile `astro preview`
   üzerinde tüm sayfalar (yerelde, lead isteğiyle ve faz kapanışında).
9. ⏳ **Elle denetim.** Klavye gezinmesi, ekran okuyucu (VoiceOver) ile ana sayfa
   ve bir proje sayfası, %200 yakınlaştırma, `prefers-reduced-motion`.

### 2.3 Performans ve güvenlik

10. ✅ **Lighthouse CI.** `lighthouserc.json` — tüm sayfalar, mobil profil,
    kategori eşikleri: performance/accessibility/best-practices/seo ≥ 0.95.
    `npm run lhci`; CI'a opsiyonel iş olarak eklenir (lead kararı).
11. ✅ **Görsel optimizasyonu.** Tüm görseller `astro:assets` (`<Image>`/`<Picture>`)
    ile; AVIF/WebP, `loading="lazy"` (hero hariç), açık `width/height`.
12. ✅ **İçerik Güvenlik Politikası (ADR-011 adayı).** `<meta http-equiv="Content-Security-Policy">`:
    `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';
    script-src 'self' 'sha256-{tema betiği}'; base-uri 'self'; form-action 'none'`.
    Astro'nun inline stil/script davranışı derleme çıktısında doğrulanır;
    uygulanabilirlik ADR'de kayda geçer.
13. ✅ **Bağımlılık denetimi.** `npm audit --omit=dev --audit-level=high` temiz.

## 3. Testler

- `npm run check:dist` sıfır bulgu.
- axe/pa11y: sıfır ihlal (bilinen istisnalar `references/methodology.md`'de belgelenir).
- Lighthouse CI: tüm sayfalarda eşikler sağlanıyor (rapor özeti `phase_progress.md`'ye).
- Google Rich Results Test / Schema.org validator ile JSON-LD doğrulaması (yayın sonrası Faz 5'te tekrar).
- OG önizlemesi: yerelde `og:*` etiketleri kontrol; yayın sonrası paylaşım hata ayıklayıcılarla (Faz 5).

## 4. Kabul Kriterleri

- [x] Her sayfada benzersiz `title` + `description` + canonical.
- [x] JSON-LD geçerli ve yalnızca kamuya açık bilgi içeriyor.
- [x] `sitemap-index.xml` ve `robots.txt` üretiliyor.
- [x] `check:dist`, axe ve Lighthouse eşikleri sağlanıyor.
- [x] Sayfa başına istemci JS ≤ 10 KB (gzip) — ölçüm `phase_progress.md`'de.
- [x] CSP kararı ADR olarak kayıtlı (uygulandı / uygulanmadı + gerekçe).
- [x] Kontrol listesi: tüm bölümler gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Lighthouse puanları ortam gürültüsüyle dalgalanır | 3 çalıştırmanın medyanı; eşik altı tek sonuçta tekrar ölçüm |
| Meta CSP, Astro'nun ürettiği inline öğeleri engeller | Meta etiketiyle report-only modu yoktur; bu yüzden önce derleme çıktısı incelenir, hash listesi betikle üretilir, tarayıcı konsolunda ihlal olmadığı doğrulanır; uygulanamazsa ADR'de "ertelendi" |

## 6. Uygulama Notları (2026-10-17)

- **Seo bileşeni:** `src/components/layout/Seo.astro`; değerleri `BaseLayout` çözer
  (mutlak URL'ler dahil). Saf yardımcılar ve JSON-LD üreticileri `src/lib/seo.ts`.
- **OG:** `og:type` ana sayfa ve liste için `website`, proje sayfası için `article`;
  `og:site_name`, `og:image:width/height/alt` eklendi. Varsayılan görsel ve
  `apple-touch-icon.png`, `scripts/images/` altındaki HTML kaynaklarından
  `npm run images` (yerel Chrome + ImageMagick, `-strip`) ile üretilir.
  Kapaklı projelerde paylaşım görseli kapaktan üretilen 1200 px JPEG'dir.
- **JSON-LD:** Ana sayfa `ProfilePage` → `Person` (`name`, `url`, `jobTitle`,
  `description`, `knowsAbout`, `sameAs`); `worksFor` lead kararıyla eklenmedi.
  Proje sayfası `CreativeWork` (`SoftwareApplication` `offers`/puan beklediği için seçilmedi).
- **robots.txt:** Tüm tarayıcılara izin, yapay zekâ tarayıcıları dahil (lead kararı).
- **check:dist:** Madde 7'ye ek olarak sayfalar arası benzersiz title/description,
  description ≤ 160, canonical = sayfa yolu, OG/Twitter eksiksizliği, `og:image`
  dosyasının varlığı, JSON-LD'de kişisel alan yasağı, CSP meta, `<img>` boyutları,
  sitemap kapsamı ve robots.txt `Sitemap` satırı. Denetleyicinin kendi testleri
  `scripts/check-dist.test.ts` (Vitest).
- **CSP (ADR-011):** Elle hash yerine Astro `security.csp`; `style-src`
  `'unsafe-inline'` yerine hash kullanır. Shiki kapatıldı (`markdown.syntaxHighlight: false`).
- **Lighthouse CI:** Yalnızca yerelde (lead kararı, ADR-013); 404 sayfasında SEO
  kategorisi `noindex` nedeniyle eşik dışı.
- **axe:** `@axe-core/cli`'nin ChromeDriver'ı yerel Chrome sürümüyle uyuşmadı;
  denetim, Lighthouse ile gelen `axe-core` 4.14.0'ın `astro preview` üzerinde
  tarayıcıda çalıştırılmasıyla yapıldı (4 sayfa × 2 tema, 0 ihlal).
- **Madde 9 (⏳):** Klavye, %200 yakınlaştırma (640 px), 360 px, reduced-motion
  kuralları ve CSP altında tema geçişi doğrulandı. VoiceOver ile ana sayfa ve
  proje sayfası denetimi lead tarafından yapılacak.
