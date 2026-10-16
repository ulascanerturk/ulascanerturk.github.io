# Faz 2 — Profil Sayfası

> Önkoşul: Faz 1 · Faz 3 ile paralel yürütülebilir · Dal: `feat/faz-2-*` · Kapsam: `content` + `site`
> İlgili: [`02-icerik-ve-tasarim.md`](../02-icerik-ve-tasarim.md) §1–§3 · [`01-mimari.md`](../01-mimari.md) §4.1 · ADR-005

## 1. Amaç

`/` adresinde, `ulascanerturk.md` belgesine sadık; Ulaşcan Ertürk'ü kısa sürede
anlatan, taranabilir ve semantik bir profil sayfası yayınlamak.

## 2. Görev Listesi

1. **S2 kararı.** İletişim kanalları netleşir (varsayılan: GitHub + şirket bağlantıları).
2. **`src/data/profile.ts`.** `Profile` arayüzü ve verisi; her alanın
   `ulascanerturk.md` içindeki kaynak bölümü dosyada yorum olarak belirtilir
   (ör. `// kaynak: ulascanerturk.md §4`).
3. **Metin taslağı ve onay.** Hero, Hakkımda ve bölüm giriş metinleri lead'e
   sunulur; onaylanmadan birleştirilmez. Değişmez Kural 2 için özellikle
   kontrol edilecek ifadeler:
   - Eğitim: "Uluslararası İlişkiler lisans"; yazılım eğitimleri "eğitim programı".
   - Girişimcilik: "Shifter girişimi bağlamında katılınan programlar".
   - Insapption unvanı: "şirketin kamuya açık ekip sayfasında Technology Officer olarak listelenir".
4. **Profil bileşenleri (`src/components/profile/`).**
   - `ProfileHero` — ad (`<h1>`), unvan satırı, özet, eylem bağlantıları.
   - `SkillsGrid` — kategori başlıkları + `Tag` listeleri.
   - `ExperienceList` — kuruluş, rol, öne çıkanlar, `Callout` notu.
   - `EducationList` — `degree` ve `training` görsel olarak ayrışır.
   - `EcosystemNote` — program listesi + bağlam notu.
   - `FocusAreas` — 7 odak alanı.
   - `LinkList` — `ExternalLink` ile bağlantılar.
5. **Öne çıkan projeler bölümü.** Faz 3 tamamlanmadıysa geçici olarak
   `/projeler/` bağlantısı; Faz 3 sonrası `featured` projelerin `ProjectCard`'ları.
6. **`src/pages/index.astro`.** Bölümleri `02-icerik-ve-tasarim.md` §2 sırası ve
   `id` çapalarıyla birleştirir; sayfa `description` meta'sı profil özetinden.
7. **Dipnot (lead kararı).** "Bazı yetkinlik başlıkları beyana dayalıdır" notu
   ve "son güncelleme" tarihi footer'da veya sayfa sonunda.

## 3. Testler

- `src/lib/profile.test.ts`: `profile` verisi için yapısal testler — boş alan
  yok; tüm `links[].url` `https://` ile başlıyor; e-posta/telefon desenine uyan
  değer yok.
- Derlenmiş `dist/index.html`: tek `<h1>` ("Ulaşcan Ertürk"); başlık hiyerarşisi
  atlama yapmıyor (h1 → h2 → h3); tüm bölüm çapaları mevcut.
- `test-lint` içerik ve gizlilik taraması temiz.

## 4. Kabul Kriterleri

- [ ] Profil metinleri lead tarafından onaylandı (onay tarihi `phase_progress.md`'de).
- [ ] Her bölüm `ulascanerturk.md` ile tutarlı; §9 ve §11 dışı bilgi yok.
- [ ] Eğitim ve girişimcilik ifadeleri §3 ve §7'deki ayrımlara uyuyor.
- [ ] Sayfa JS olmadan tamamen okunabilir.
- [ ] Kalite kapısı `all` kapsamında PASS.
- [ ] Kontrol listesi: İçerik ve Gizlilik, Erişilebilirlik gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Kaynak belge ile site arasında zamanla sapma | `profile.ts` içindeki kaynak yorumları; `ulascanerturk.md` güncellendiğinde `update-references` ile `content_schema.md`'deki eşleme tablosu güncellenir |
| Abartılı/pazarlama dili (Kural 2) | Taslak metin onayı zorunlu; plan-feature risk değerlendirmesinde "İçerik doğruluğu" satırı |
