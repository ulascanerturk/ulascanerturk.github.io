# Faz 5 — Yayın ve Dağıtım

> Önkoşul: Faz 4 · Dal: `chore/faz-5-*` · Kapsam: `config`
> İlgili: [`01-mimari.md`](../01-mimari.md) §6.3 · ADR-002 · Değişmez Kural 5

## 1. Amaç

Siteyi `https://ulascanerturk.github.io` adresinde yayınlamak ve `main` →
GitHub Actions → Pages dağıtım hattını doğrulamak.

> **Not:** Skill iş akışı push yapmaz. Bu fazdaki uzak depo oluşturma, push ve
> GitHub ayarları **lead tarafından** veya lead'in o adım için açık onayıyla
> yapılır. Ajan komutları hazırlar ve sonuçları doğrular.

## 2. Görev Listesi

1. **S5 kararı.** Özel alan adı kullanılacak mı (varsayılan: hayır).
2. **Deploy iş akışını etkinleştir.** `.github/workflows/deploy.yml` tetikleyicisine
   `push: branches: [main]` eklenir (Faz 0'da yalnızca `workflow_dispatch` idi).
3. **Uzak depo (lead).** GitHub'da `ulascanerturk/ulascanerturk.github.io`
   **public** deposu oluşturulur (README/.gitignore eklenmeden).
   ```bash
   gh repo create ulascanerturk/ulascanerturk.github.io --public --source=. --remote=origin
   ```
4. **Pages ayarı (lead).** *Settings → Pages → Build and deployment → Source:
   GitHub Actions*. (Alternatif: `gh api` ile; lead tercihine bağlı.)
5. **Dal koruması (öneri, lead).** `main` için: CI başarılı olmadan merge yok,
   force-push yok. Tek geliştirici akışında yerel squash merge sonrası push yapıldığı
   için "PR zorunlu" kuralı **açılmaz** (aksi hâlde iş akışı ile çakışır).
6. **İlk push (lead).** `git push -u origin main` → CI ve deploy iş akışları izlenir.
7. **Canlı doğrulama.**
   - Tüm sayfalar 200; `/olmayan-sayfa/` → özel 404.
   - HTTPS zorunlu (*Enforce HTTPS* açık).
   - Canlı URL üzerinde Lighthouse ve JSON-LD doğrulaması (Faz 4 testlerinin tekrarı).
   - OG önizlemesi (LinkedIn Post Inspector vb.) — lead.
8. **Arama motoru kaydı (opsiyonel, lead).** Google Search Console / Bing
   Webmaster doğrulaması — doğrulama dosyası/meta etiketi eklenmesi gerekirse
   ayrı küçük görev.
9. **GitHub profil bağlantısı (opsiyonel, lead).** GitHub profilindeki "Website"
   alanına site adresi.
10. **Geri alma prosedürü.** `references/methodology.md` → "Yayın ve geri alma":
    hatalı yayında `git revert {hash}` + push veya Actions'ta önceki başarılı
    çalıştırmayı yeniden çalıştırma.

## 3. Testler

- CI iş akışı ilk push'ta yeşil.
- Deploy iş akışı yeşil; Pages ortam URL'si `https://ulascanerturk.github.io/`.
- `curl -sI https://ulascanerturk.github.io/` → `200`, `content-type: text/html`.
- `curl -s https://ulascanerturk.github.io/sitemap-index.xml` geçerli XML.

## 4. Kabul Kriterleri

- [ ] Site canlı ve tüm sayfalar erişilebilir.
- [ ] `main`'e push otomatik yayın üretiyor; manuel adım gerekmiyor.
- [ ] Canlı Lighthouse eşikleri sağlanıyor.
- [ ] Geri alma prosedürü belgelendi.
- [ ] Depoda sır, `.env`, `dist/` yok (`git ls-files` kontrolü).
- [ ] Kontrol listesi: Dağıtım bölümü gözden geçirildi.

## 5. Riskler

| Risk | Önlem |
|---|---|
| Pages kaynağı "Deploy from branch" kalır, Actions çıktısı yayınlanmaz | Adım 4 doğrulaması; deploy iş akışında `configure-pages` hatası gözlenir |
| Depo adı yanlış yazılır → site `/{repo}/` altında yayınlanır | Depo adı tam olarak `ulascanerturk.github.io` |
| Aksiyon sürümlerinin eskimesi | Faz 6 bakım rutini (Dependabot) |
