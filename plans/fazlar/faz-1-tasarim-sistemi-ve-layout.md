# Faz 1 — Tasarım Sistemi ve Layout

> Önkoşul: Faz 0 · Dal: `feat/faz-1-*` · Kapsam: `site`
> İlgili: [`02-icerik-ve-tasarim.md`](../02-icerik-ve-tasarim.md) §5 · ADR-003, ADR-004, ADR-009
> Durum: **Tamamlandı (2026-10-17)** — dal `feat/faz-1-design-system-layout`; ayrıntı `references/phase_progress.md`

## 1. Amaç

Tüm sayfaların paylaşacağı görsel dili (token'lar, tipografi, açık/koyu tema) ve
iskeleti (`BaseLayout`, header, footer, 404) kurmak. Bu fazdan sonra içerik
fazları yalnızca bileşen ve içerik ekler; global stil değişikliği gerektirmez.

## 2. Görev Listesi

1. ✅ **Token'lar — `src/styles/tokens.css`.** `02-icerik-ve-tasarim.md` §5'teki
   kategoriler; açık tema `:root`, koyu tema `[data-theme='dark']` ve
   `@media (prefers-color-scheme: dark)` (elle seçim yoksa).
2. ✅ **Global stil — `src/styles/global.css`.** Modern reset, temel tipografi,
   `:focus-visible` halkası, `.visually-hidden`, `prefers-reduced-motion`.
3. ✅ **Kontrast doğrulaması.** Her metin/arka plan çifti için oranlar hesaplanır ve
   `references/site_map.md` → Theme bölümüne tablo olarak yazılır (≥ 4.5:1 metin, ≥ 3:1 UI).
4. ✅ **`src/data/site.ts`.** Site adı, URL, varsayılan açıklama, dil, nav öğeleri,
   footer metni.
5. ✅ **`BaseLayout.astro`.** `<html lang>`, `<head>` (charset, viewport, title
   şablonu `"{sayfa} · Ulaşcan Ertürk"`, description, canonical, favicon,
   `color-scheme` meta), tema betiği (FOUC önleyen, `<head>` içinde inline,
   ≤ 1 KB), skip link, `<header>`, `<main id="icerik">`, `<footer>`.
6. ✅ **Layout bileşenleri.** `SkipLink`, `SiteHeader` (nav + aktif sayfa
   `aria-current`), `SiteFooter` (© yıl, GitHub, LinkedIn, kaynak kodu bağlantısı),
   `ThemeToggle` (`<button aria-pressed>`; JS kapalıyken gizli, sistem teması geçerli).
7. ✅ **UI bileşenleri.** `Section` (başlık + `id` çapası), `Tag`, `ExternalLink`,
   `Callout` (not/uyarı kutusu — profil dipnotları için).
8. ✅ **Avatar / marka (S3: monogram).** "UE" monogramı inline SVG bileşeni
   (`src/components/ui/Monogram.astro`, renkler token'lardan, `role="img"` +
   `aria-label="Ulaşcan Ertürk"`) ve aynı tasarımla `public/favicon.svg`.
   Fotoğraf kullanılmaz.
9. ✅ **`404.astro`.** Kısa mesaj + ana sayfa ve projeler bağlantısı; `noindex`.
   *(Projeler bağlantısı — 404'te ve üst menüde — `/projeler/` rotası oluşunca Faz 3 görev 6'da
   eklenir; lead kararı, 2026-10-17.)*
10. ⏭️ **(Opsiyonel) Stil rehberi.** *(Atlandı — lead kararı, 2026-10-17.)* Token ve bileşen önizlemesi yalnızca
    geliştirme ortamında görünür (ör. `import.meta.env.DEV` kontrolü); üretim
    derlemesine ve sitemap'e girmez.

## 3. Testler

- `src/lib/theme.ts` (tema çözümleme mantığı saf fonksiyon olarak) için Vitest:
  kayıtlı tercih > sistem tercihi > varsayılan.
- Derlenmiş `dist/404.html` ve `dist/index.html`: tek `<h1>`, `lang="tr"`,
  skip link ilk odaklanabilir öğe.
- Elle: klavye ile tüm nav gezilebilir; odak halkası iki temada da görünür;
  JS kapalıyken sayfa kullanılabilir.

## 4. Kabul Kriterleri

- [x] Tüm token çiftleri kontrast eşiklerini sağlıyor (tablo `references/site_map.md`'de).
- [x] Açık/koyu tema geçişi FOUC olmadan çalışıyor, tercih kalıcı.
- [x] JS kapalıyken site okunabilir ve gezilebilir.
- [x] Sayfa başına istemci JS ≤ 1 KB (yalnızca tema betiği).
- [x] 360 px genişlikte yatay kaydırma yok.
- [x] Kalite kapısı `site` kapsamında PASS.
- [x] Kontrol listesi: Genel, Erişilebilirlik, Performans gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Tema betiği CSP ile çakışır (Faz 4) | Betik küçük ve sabit tutulur; CSP'de hash ile izin verilir |
| Sistem font yığını platformlar arası farklı görünür | Ölçek ve satır yüksekliği font bağımsız seçilir; ekran görüntüleri macOS + Windows + Android'de kontrol |
