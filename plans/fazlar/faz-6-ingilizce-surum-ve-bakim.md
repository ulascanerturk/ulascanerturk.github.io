# Faz 6 — İngilizce Sürüm ve Bakım (Opsiyonel)

> Önkoşul: Faz 5 · Dal: `feat/faz-6-*` · Kapsam: `all`
> İlgili: ADR-006 · S4

## 1. Amaç

(a) S4 onaylanırsa sitenin İngilizce sürümünü `/en/` altında yayınlamak;
(b) sitenin uzun vadede güncel ve güvenli kalması için bakım rutinlerini kurmak.
(a) ve (b) birbirinden bağımsızdır; (b) S4'ten bağımsız olarak yapılır.

## 2. Görev Listesi

### 2.1 İngilizce sürüm (S4 onayına bağlı)

1. **Astro i18n yapılandırması.** `i18n: { defaultLocale: 'tr', locales: ['tr', 'en'],
   routing: { prefixDefaultLocale: false } }` — Türkçe URL'ler değişmez.
2. **Çeviri edilebilir veri.** `src/data/profile.ts` → `profile.tr.ts` /
   `profile.en.ts` (aynı `Profile` tipi); `site.ts` nav ve arayüz metinleri dil
   anahtarlı. Eksik çeviri derlemede hata verecek şekilde tiplenir.
3. **Projeler.** `src/content/projects/{slug}.md` + `src/content/projects/en/{slug}.md`
   veya `lang` alanı; şema kararı plan aşamasında.
4. **Sayfalar.** `/en/`, `/en/projects/`, `/en/projects/{slug}/`.
5. **Dil geçişi ve SEO.** Header'da dil bağlantısı; `hreflang` alternates,
   `og:locale:alternate`, sitemap i18n seçeneği.
6. **Çeviri onayı.** İngilizce metinler lead onayı olmadan yayınlanmaz;
   Değişmez Kural 2 çeviride de geçerlidir (ör. "training program", not "degree").

### 2.2 Bakım

7. **Dependabot.** `.github/dependabot.yml` — `npm` ve `github-actions`, aylık.
8. **İçerik güncelleme rehberi.** `references/content_schema.md`: profil
   güncelleme akışı (`ulascanerturk.md` → `profile.ts` → onay), yeni proje ekleme.
9. **Periyodik kontrol listesi.** Üç ayda bir: bağlantı denetimi (dış
   bağlantılar dahil, ör. `lychee`), Lighthouse, bağımlılık güncellemeleri,
   `ulascanerturk.md` ile site tutarlılığı.

## 3. Testler

- `check:dist` her iki dil için; `lang="en"` İngilizce sayfalarda.
- Tüm `hreflang` çiftleri karşılıklı ve geçerli.
- Dependabot yapılandırması GitHub'da tanındı (Insights → Dependency graph).

## 4. Kabul Kriterleri

- [ ] (S4 onaylıysa) İngilizce sürüm yayında; tüm Türkçe sayfaların karşılığı var.
- [ ] (S4 onaylıysa) Çeviriler lead tarafından onaylandı.
- [ ] Dependabot etkin.
- [ ] Bakım rehberi `references/` içinde.
- [ ] Kalite kapısı `all` kapsamında PASS.
