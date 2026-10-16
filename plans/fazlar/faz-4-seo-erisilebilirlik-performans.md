# Faz 4 — SEO, Erişilebilirlik ve Performans

> Önkoşul: Faz 2 ve Faz 3 · Dal: `feat/faz-4-*` · Kapsam: `all`
> İlgili: [`01-mimari.md`](../01-mimari.md) §6, §7 · Değişmez Kural 3 ve 4 · ADR-010, ADR-011 (aday)

## 1. Amaç

Sitenin arama motorları, sosyal paylaşım ve yapay zekâ ajanları için doğru ve
tutarlı okunmasını; WCAG 2.2 AA ve Lighthouse ≥ 95 hedeflerini otomatik
denetimlerle güvenceye almak.

## 2. Görev Listesi

### 2.1 SEO ve paylaşım

1. **`Seo.astro` bileşeni** (`BaseLayout` içinde): `title`, `description`,
   `canonical`, Open Graph (`og:type`, `og:title`, `og:description`, `og:url`,
   `og:image`, `og:locale=tr_TR`), Twitter Card (`summary_large_image`).
2. **OG görselleri.** Varsayılan site görseli (1200×630, `public/og/default.png`);
   proje sayfaları için proje kapağı veya varsayılan. (Derleme anında üretim
   isteniyorsa ayrı ADR.)
3. **JSON-LD.** Ana sayfada `Person` (`name`, `jobTitle`, `url`, `sameAs`
   → GitHub; `worksFor` yalnızca kamuya açık bilgi), proje sayfalarında
   `CreativeWork`/`SoftwareApplication` (yalnızca doğrulanabilir alanlar).
   Kişisel iletişim alanı (`email`, `telephone`, `address`) **eklenmez**.
4. **Sitemap.** `@astrojs/sitemap` (404 ve taslaklar hariç).
5. **`public/robots.txt`.** Tüm botlara izin + sitemap adresi.
   (Yapay zekâ tarayıcılarına izin/engel politikası lead kararı — varsayılan: izin.)
6. **Favicon seti.** `favicon.svg` + `apple-touch-icon.png` (180×180).

### 2.2 Erişilebilirlik

7. **Otomatik denetim.** `scripts/check-dist.mjs` (bağımlılıksız Node betiği):
   her HTML için `lang`, boş olmayan `<title>`, meta description, canonical,
   tam olarak bir `<h1>`, başlık seviyesi atlama yok, her `<img>` için `alt`,
   iç bağlantıların `dist/` içinde çözülmesi, `target="_blank"` bağlantılarda
   `rel="noopener"`. `npm run check:dist` olarak CI'a eklenir.
8. **axe denetimi.** `@axe-core/cli` veya `pa11y-ci` ile `astro preview`
   üzerinde tüm sayfalar (yerelde, lead isteğiyle ve faz kapanışında).
9. **Elle denetim.** Klavye gezinmesi, ekran okuyucu (VoiceOver) ile ana sayfa
   ve bir proje sayfası, %200 yakınlaştırma, `prefers-reduced-motion`.

### 2.3 Performans ve güvenlik

10. **Lighthouse CI.** `lighthouserc.json` — tüm sayfalar, mobil profil,
    kategori eşikleri: performance/accessibility/best-practices/seo ≥ 0.95.
    `npm run lhci`; CI'a opsiyonel iş olarak eklenir (lead kararı).
11. **Görsel optimizasyonu.** Tüm görseller `astro:assets` (`<Image>`/`<Picture>`)
    ile; AVIF/WebP, `loading="lazy"` (hero hariç), açık `width/height`.
12. **İçerik Güvenlik Politikası (ADR-011 adayı).** `<meta http-equiv="Content-Security-Policy">`:
    `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';
    script-src 'self' 'sha256-{tema betiği}'; base-uri 'self'; form-action 'none'`.
    Astro'nun inline stil/script davranışı derleme çıktısında doğrulanır;
    uygulanabilirlik ADR'de kayda geçer.
13. **Bağımlılık denetimi.** `npm audit --omit=dev --audit-level=high` temiz.

## 3. Testler

- `npm run check:dist` sıfır bulgu.
- axe/pa11y: sıfır ihlal (bilinen istisnalar `references/methodology.md`'de belgelenir).
- Lighthouse CI: tüm sayfalarda eşikler sağlanıyor (rapor özeti `phase_progress.md`'ye).
- Google Rich Results Test / Schema.org validator ile JSON-LD doğrulaması (yayın sonrası Faz 5'te tekrar).
- OG önizlemesi: yerelde `og:*` etiketleri kontrol; yayın sonrası paylaşım hata ayıklayıcılarla (Faz 5).

## 4. Kabul Kriterleri

- [ ] Her sayfada benzersiz `title` + `description` + canonical.
- [ ] JSON-LD geçerli ve yalnızca kamuya açık bilgi içeriyor.
- [ ] `sitemap-index.xml` ve `robots.txt` üretiliyor.
- [ ] `check:dist`, axe ve Lighthouse eşikleri sağlanıyor.
- [ ] Sayfa başına istemci JS ≤ 10 KB (gzip) — ölçüm `phase_progress.md`'de.
- [ ] CSP kararı ADR olarak kayıtlı (uygulandı / uygulanmadı + gerekçe).
- [ ] Kontrol listesi: tüm bölümler gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Lighthouse puanları ortam gürültüsüyle dalgalanır | 3 çalıştırmanın medyanı; eşik altı tek sonuçta tekrar ölçüm |
| Meta CSP, Astro'nun ürettiği inline öğeleri engeller | Meta etiketiyle report-only modu yoktur; bu yüzden önce derleme çıktısı incelenir, hash listesi betikle üretilir, tarayıcı konsolunda ihlal olmadığı doğrulanır; uygulanamazsa ADR'de "ertelendi" |
