# Faz 3 — Proje Sayfaları

> Önkoşul: Faz 1 · Faz 2 ile paralel yürütülebilir · Dal: `feat/faz-3-*` · Kapsam: `content` + `site`
> İlgili: [`01-mimari.md`](../01-mimari.md) §4.2, §5 · [`02-icerik-ve-tasarim.md`](../02-icerik-ve-tasarim.md) §4 · ADR-005

## 1. Amaç

Her projenin tek bir Markdown dosyasıyla tanımlandığı, şema doğrulamalı bir
proje koleksiyonu ve bunun üzerinden üretilen liste (`/projeler/`) ile detay
(`/projeler/{slug}/`) sayfalarını yayınlamak. Yeni proje eklemek yalnızca yeni
bir `.md` dosyası eklemek olmalıdır.

## 2. Görev Listesi

1. **S1 kararı.** Yayınlanacak proje listesi netleşir (varsayılan: Shifter Pro,
   Shifter Lite, çalışma alanları).
2. **Koleksiyon şeması — `src/content.config.ts`.** `projects` koleksiyonu,
   `glob({ pattern: '**/*.md', base: './src/content/projects' })` loader,
   `01-mimari.md` §4.2 tablosundaki zod şeması (`image()` dahil).
   `draft: true` girdiler üretimde filtrelenir.
3. **Yardımcılar — `src/lib/projects.ts`.** `sortProjects` (order → status →
   başlık), `isPublished`, `formatPeriod` (`2019 – devam ediyor` biçimi).
4. **Bileşenler (`src/components/projects/`).** `ProjectCard` (başlık bağlantı,
   özet, durum, tech etiketleri — kartın tamamı değil başlık tıklanabilir),
   `ProjectMeta` (rol, dönem, durum, `<dl>`), `ProjectLinks`.
5. **`ProjectLayout.astro`.** `BaseLayout` üzerine: başlık, meta, kapak (varsa),
   içerik (`<article>`), `disclaimer` (`Callout`), "Tüm projeler" geri bağlantısı,
   önceki/sonraki proje gezinmesi.
6. **Sayfalar.** `src/pages/projeler/index.astro` (gruplama: ürünler / diğer),
   `src/pages/projeler/[slug].astro` (`getStaticPaths` + `render()`).
7. **İçerik dosyaları.**
   - `shifter-pro.md` — `ulascanerturk.md` §6 "Shifter Pro" problem alanları;
     bağlantı: shifter.com.tr.
   - `shifter-lite.md` — §6 "Shifter Lite"; bağlantı: shifter.com.tr.
   - "Diğer çalışma alanları" — §6 notuyla (`kind: focus-area`); ayrı sayfa mı
     liste içi bölüm mü plan aşamasında karar verilir.
   - S1 ile onaylanan ek projeler.
8. **Profil entegrasyonu.** Faz 2 tamamlandıysa ana sayfadaki "Öne çıkan
   projeler" bölümü `featured` girdilerden beslenir.
9. **İçerik ekleme rehberi.** `references/content_schema.md` içine "Yeni proje
   nasıl eklenir" adımları (dosya adı, ön bilgi alanları, görsel/EXIF kuralı).

## 3. Testler

- `src/lib/projects.test.ts`: sıralama, taslak filtreleme, dönem biçimlendirme.
- Şema: geçersiz ön bilgiyle (eksik `summary`, geçersiz `status`) `astro build`
  başarısız olur — geçici test dosyasıyla bir kez doğrulanır, sonra silinir;
  sonuç `phase_progress.md`'ye not edilir.
- Derlenmiş çıktı: her proje için `dist/projeler/{slug}/index.html` var; liste
  sayfasındaki tüm bağlantılar çözülüyor; her detayda tek `<h1>`.

## 4. Kabul Kriterleri

- [ ] Yeni proje eklemek yalnızca bir `.md` dosyası gerektiriyor (rehberle doğrulandı).
- [ ] Proje metinleri lead tarafından onaylandı.
- [ ] Hiçbir projede müşteri adı, gizli ayrıntı, doğrulanmamış metrik yok.
- [ ] "Diğer çalışma alanları" bağımsız yayımlanmış ürün gibi sunulmuyor.
- [ ] Görseller (varsa) EXIF'siz, `alt` metinli, boyutları tanımlı.
- [ ] Kalite kapısı `all` kapsamında PASS.
- [ ] Kontrol listesi: İçerik ve Gizlilik, Erişilebilirlik, SEO gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Ürün ekran görüntülerinin kullanım hakkı | Yalnızca lead'in sağladığı veya kullanım izni teyit edilmiş kamuya açık görseller |
| Shifter Pro'nun single-tenant/kurumsal yapısı nedeniyle müşteri ayrıntısı sızması | `disclaimer` alanı + `test-lint` manuel içerik incelemesi |
