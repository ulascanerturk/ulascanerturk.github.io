# Faz 3 — Proje Sayfaları

> Önkoşul: Faz 1 · Faz 2 ile paralel yürütülebilir · Dal: `feat/faz-3-*` · Kapsam: `content` + `site`
> İlgili: [`01-mimari.md`](../01-mimari.md) §4.2, §5 · [`02-icerik-ve-tasarim.md`](../02-icerik-ve-tasarim.md) §4 · ADR-005
> **Durum: Kapandı (2026-10-17, dal `feat/faz-3-project-pages`)** — kanıtlar `references/phase_progress.md`'de.

## 1. Amaç

Her projenin tek bir Markdown dosyasıyla tanımlandığı, şema doğrulamalı bir
proje koleksiyonu ve bunun üzerinden üretilen liste (`/projeler/`) ile detay
(`/projeler/{slug}/`) sayfalarını yayınlamak. Yeni proje eklemek yalnızca yeni
bir `.md` dosyası eklemek olmalıdır.

## 2. Görev Listesi

1. ✅ **Kaynak belge güncellemesi (S1: yalnızca LockBox Mobile).** Lead'den
   LockBox Mobile'ın yayın durumu (mağazada mı, geliştirmede mi) ve paylaşılabilir
   bilgi sınırı alınır; onaylanan kısa tanım `ulascanerturk.md` §6'ya eklenir
   (Değişmez Kural 2: tek içerik kaynağı).
   → Tamamlandı (2026-10-17): yayımlanmadı (iOS TestFlight aşamasında); lead kararıyla
   başlık mağaza adı "Lockbox", durum "geliştirme aşamasında", güvenlik plan düzeyinde.
2. ✅ **Koleksiyon şeması — `src/content.config.ts`.** `projects` koleksiyonu,
   `glob({ pattern: '**/*.md', base: './src/content/projects' })` loader,
   `01-mimari.md` §4.2 tablosundaki zod şeması (`image()` dahil).
   `draft: true` girdiler üretimde filtrelenir.
   → Tamamlandı: lead onayıyla `summary` 50–160 ve `cover` ile zorunlu `coverAlt` (§4.2 güncellendi).
3. ✅ **Yardımcılar — `src/lib/projects.ts`.** `sortProjects` (order → status →
   başlık), `isPublished`, `formatPeriod` (`2019 – devam ediyor` biçimi).
   → Tamamlandı: ek olarak `adjacentProjects` (önceki/sonraki) ve `groupByKind`.
4. ✅ **Bileşenler (`src/components/projects/`).** `ProjectCard` (başlık bağlantı,
   özet, durum, tech etiketleri — kartın tamamı değil başlık tıklanabilir),
   `ProjectMeta` (rol, dönem, durum, `<dl>`), `ProjectLinks`.
5. ✅ **`ProjectLayout.astro`.** `BaseLayout` üzerine: başlık, meta, kapak (varsa),
   içerik (`<article>`), `disclaimer` (`Callout`), "Tüm projeler" geri bağlantısı,
   önceki/sonraki proje gezinmesi.
6. ✅ **Sayfalar.** `src/pages/projeler/index.astro` (tek proje varken gruplama
   yok; `kind` değerine göre gruplama ikinci tür eklendiğinde devreye girer),
   `src/pages/projeler/[slug].astro` (`getStaticPaths` + `render()`).
7. ✅ **İçerik dosyası — `lockbox-mobile.md`.** `02-icerik-ve-tasarim.md` §4'teki
   içerik çerçevesiyle: `kind: product`, `featured: true`, `tech: [Expo, React
   Native, TypeScript, …]`; teknik ifadeler `lockbox-mobile/docs/` ile
   doğrulanır; mağaza bağlantısı yalnızca uygulama yayımlandıysa; depo
   bağlantısı yok. Metin lead onayıyla kesinleşir.
   Kapsam dışı (S1): Shifter Pro/Lite sayfaları, "Diğer çalışma alanları"
   sayfası, LockBox macOS.
   → Tamamlandı: başlık "Lockbox — Çevrimdışı Parola Kasası", slug `lockbox-mobile`;
   mağaza ve depo bağlantısı yok.
8. ✅ **Profil entegrasyonu.** Faz 2 tamamlandıysa ana sayfadaki "Öne çıkan
   projeler" bölümü `featured` girdilerden beslenir.
   → Tamamlandı: `#projeler` (`#deneyim` ile `#egitim` arasında) + "Projeleri gör" hero eylemi
   (Faz 2 görev 5'ten devralındı).
9. ✅ **İçerik ekleme rehberi.** `references/content_schema.md` içine "Yeni proje
   nasıl eklenir" adımları (dosya adı, ön bilgi alanları, görsel/EXIF kuralı).

## 3. Testler

- `src/lib/projects.test.ts`: sıralama, taslak filtreleme, dönem biçimlendirme.
- Şema: geçersiz ön bilgiyle (eksik `summary`, geçersiz `status`) `astro build`
  başarısız olur — geçici test dosyasıyla bir kez doğrulanır, sonra silinir;
  sonuç `phase_progress.md`'ye not edilir.
- Derlenmiş çıktı: `dist/projeler/lockbox-mobile/index.html` var; liste
  sayfasındaki tüm bağlantılar çözülüyor; her detayda tek `<h1>`.

## 4. Kabul Kriterleri

- [x] Yeni proje eklemek yalnızca bir `.md` dosyası gerektiriyor (rehberle doğrulandı).
- [x] LockBox Mobile metni lead tarafından onaylandı ve `ulascanerturk.md` §6'ya eklendi.
- [x] Yayın durumu doğru (yayımlanmadıysa mağaza bağlantısı yok); depo bağlantısı yok.
- [x] Hiçbir projede gizli ayrıntı, iç belge yolu, doğrulanmamış metrik yok.
- [x] Görseller (varsa) EXIF'siz, `alt` metinli, boyutları tanımlı.
- [x] Kalite kapısı `all` kapsamında PASS.
- [x] Kontrol listesi: İçerik ve Gizlilik, Erişilebilirlik, SEO gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Ekran görüntülerinde gerçek kasa verisi görünmesi | Yalnızca lead'in sağladığı, örnek veriyle alınmış ve metadata'sı temizlenmiş görüntüler |
| Güvenlik mimarisinin fazla ayrıntılı anlatılması (kasa biçimi, tehdit modeli açıkları) | Yalnızca yüksek seviyeli özellikler; `test-lint` manuel içerik incelemesi |
| Uygulama yayınlanmadan "mağazada" gibi sunulması | Durum alanı lead'den alınır; `status: active` + "geliştirme aşamasında" ifadesi |
| Tek projeyle liste sayfasının zayıf görünmesi | Liste sayfası tek kartla da dengeli tasarlanır; ana sayfadan doğrudan detaya bağlantı |
