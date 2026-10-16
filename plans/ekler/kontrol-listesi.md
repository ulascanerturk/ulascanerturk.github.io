# Değişiklik Kontrol Listesi

> Her `plan-feature` çıktısında ilgili bölümler işaretlenir; `test-lint` ve
> `git-commit` adımlarında durumları raporlanır. Bölüm adları skill'lerde
> aynen kullanılır.

## Genel

- [ ] Değişiklik onaylı plandaki dosyalarla sınırlı; "bu arada" değişikliği yok.
- [ ] Yeni bağımlılık yok — varsa gerekçe + ADR var ve `npm audit` temiz.
- [ ] Katman kuralları korunuyor (`plans/01-mimari.md` §3): bileşenler
      `astro:content` kullanmıyor; `src/lib` Astro'dan bağımsız.
- [ ] `console.*` yalnızca `scripts/` altında.
- [ ] `references/` güncellendi (`update-references`).

## İçerik ve Gizlilik

- [ ] Her iddia `ulascanerturk.md`'ye veya lead'in yazılı onayına dayanıyor.
- [ ] §11'de dışarıda bırakılan bilgi yok: özel e-posta, telefon, adres
      ayrıntısı, doğum tarihi, aile, sağlık, finans, siyasi bağlantı, kimlik/hesap
      no, IP/SSH, kimlik bilgisi, müşteri sözleşmesi.
- [ ] §9 (ajan çalışma tercihleri) sitede yayınlanmıyor.
- [ ] Eğitim: lisans = Uluslararası İlişkiler; yazılım eğitimleri "eğitim programı".
- [ ] Girişimcilik programları "Shifter bağlamında"; kişisel ödül/sertifika gibi değil.
- [ ] Uydurma metrik, müşteri adı, ödül, unvan yok; "Diğer çalışma alanları"
      yayımlanmış ürün gibi sunulmuyor.
- [ ] Yeni görseller EXIF/GPS'siz ve kullanım hakkı teyitli.
- [ ] Metin değişikliği lead tarafından onaylandı (içerik değişikliklerinde).

## Erişilebilirlik

- [ ] Sayfa başına tek `<h1>`; başlık seviyeleri atlamıyor.
- [ ] Tüm görsellerde anlamlı `alt` (dekoratifse `alt=""`).
- [ ] Bağlantı metinleri bağlamsız da anlamlı ("buraya tıklayın" yok).
- [ ] Klavye ile tüm etkileşimler erişilebilir; `:focus-visible` görünür.
- [ ] Kontrast: metin ≥ 4.5:1, büyük metin ve UI ≥ 3:1 (iki temada).
- [ ] Dokunma hedefleri ≥ 44×44 px; 360 px'te yatay kaydırma yok.
- [ ] `prefers-reduced-motion` saygı görüyor.

## SEO ve Paylaşım

- [ ] Benzersiz `title` ve `description` (≤ 160 karakter).
- [ ] Canonical URL doğru (sonda `/`).
- [ ] OG/Twitter etiketleri (Faz 4 sonrası) eksiksiz.
- [ ] JSON-LD yalnızca kamuya açık alanlar içeriyor.
- [ ] Yeni sayfa sitemap'te; taslak/404 sitemap'te değil.

## Performans

- [ ] Sayfa başına istemci JS ≤ 10 KB (gzip); yeni betik varsa ölçüldü.
- [ ] Görseller `astro:assets` ile; `width/height` tanımlı; hero dışı `lazy`.
- [ ] Harici kaynak (font, CDN, iframe) yok.
- [ ] (Faz 4 sonrası) Lighthouse mobil ≥ 95, etkilenen sayfalarda.

## Güvenlik

- [ ] Sır, token, `.env` yok; `git diff` sır taramasından geçti.
- [ ] Analitik/izleyici/üçüncü taraf script yok (Değişmez Kural 3).
- [ ] `target="_blank"` bağlantılarda `rel="noopener noreferrer"`.
- [ ] (ADR-011 kabul edildiyse) CSP yeni inline script/stil ile bozulmadı.

## Dağıtım

- [ ] `dist/`, `.astro/`, `node_modules/` commit edilmiyor.
- [ ] İş akışı değişiklikleri en az yetki ilkesine uygun (`permissions:` açık).
- [ ] Aksiyonlar güvenilir yayıncıdan ve majör sürüm etiketiyle.
- [ ] Yayın sonrası canlı doğrulama (Faz 5 sonrası değişikliklerde lead push ettikten sonra).
