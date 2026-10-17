# Faz 6 — İngilizce Sürüm ve Bakım

> Önkoşul: Faz 5 · Dal: `feat/faz-6-*` · Kapsam: `all`
> İlgili: ADR-006 · S4 (onaylandı, 2026-10-17)

## 1. Amaç

(a) Sitenin İngilizce sürümünü `/en/` altında yayınlamak (S4: onaylandı —
v1 Türkçe yayınından sonra);
(b) sitenin uzun vadede güncel ve güvenli kalması için bakım rutinlerini kurmak.
(a) ve (b) birbirinden bağımsızdır.

## 2. Görev Listesi

### 2.1 İngilizce sürüm (S4: onaylandı)

1. ✅ **Astro i18n yapılandırması.** `i18n: { defaultLocale: 'tr', locales: ['tr', 'en'],
   routing: { prefixDefaultLocale: false } }` — Türkçe URL'ler değişmez.
2. ✅ **Çeviri edilebilir veri.** `src/data/profile.ts` → `profile.tr.ts` /
   `profile.en.ts` (aynı `Profile` tipi); `site.ts` nav ve arayüz metinleri dil
   anahtarlı. Eksik çeviri derlemede hata verecek şekilde tiplenir.
3. ✅ **Projeler.** `src/content/projects/{slug}.md` + `src/content/projects/en/{slug}.md`
   veya `lang` alanı; şema kararı plan aşamasında. *Karar: `en/` klasörü, şema aynı; eksik
   çeviri derlemede hata verir (ADR-006).*
4. ✅ **Sayfalar.** `/en/`, `/en/projects/`, `/en/projects/{slug}/`. *`/404.html` tektir:
   Türkçe sayfa + kısa İngilizce bölüm.*
5. ✅ **Dil geçişi ve SEO.** Header'da dil bağlantısı; `hreflang` alternates,
   `og:locale:alternate`, sitemap i18n seçeneği. *Sapma (onaylı): sitemap alternatifleri
   eklentinin `i18n` seçeneği yerine `serialize` ile — seçenek yalnızca aynı yolları eşleştirir
   (`/projeler/` ≠ `/en/projects/`).*
6. ✅ **Çeviri onayı.** *(2026-10-17)* İngilizce metinler lead onayı olmadan yayınlanmaz;
   Değişmez Kural 2 çeviride de geçerlidir (ör. "training program", not "degree").

### 2.2 Bakım

7. ✅ **Dependabot.** `.github/dependabot.yml` — `npm` ve `github-actions`, aylık. *(Ek: 7 gün
   cooldown, minor+patch gruplama, `typescript` minor/major yok sayılır — ADR-010.)*
8. ✅ **İçerik güncelleme rehberi.** `references/content_schema.md`: profil
   güncelleme akışı (`ulascanerturk.md` → `profile.ts` → onay), yeni proje ekleme.
9. ✅ **Periyodik kontrol listesi.** *(`references/methodology.md` → Maintenance)* Üç ayda bir: bağlantı denetimi (dış
   bağlantılar dahil, ör. `lychee`), Lighthouse, bağımlılık güncellemeleri,
   `ulascanerturk.md` ile site tutarlılığı.

## 3. Testler

- ✅ `check:dist` her iki dil için; `lang="en"` İngilizce sayfalarda.
- ✅ Tüm `hreflang` çiftleri karşılıklı ve geçerli (`check:dist` + testler).
- ✅ Dependabot yapılandırması GitHub'da tanındı — "Dependabot Updates" iş akışı aktif; `npm` ve `github-actions` ilk güncelleme işleri başarılı (2026-10-17).

## 4. Kabul Kriterleri

- [x] İngilizce sürüm yayında; tüm Türkçe sayfaların karşılığı var. *(2026-10-17, canlı doğrulama)*
- [x] Çeviriler lead tarafından onaylandı. *(2026-10-17)*
- [x] Dependabot etkin. *(2026-10-17)*
- [x] Bakım rehberi `references/` içinde. *(2026-10-17)*
- [x] Kalite kapısı `all` kapsamında PASS. *(2026-10-17, iki dalda)*
