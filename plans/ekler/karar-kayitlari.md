# Karar Kayıtları (ADR)

> Biçim: Bağlam · Karar · Alternatifler · Sonuçlar · Durum.
> Durum değerleri: **Önerildi** (lead onayı bekliyor) · **Kabul edildi** · **Değiştirildi (ADR-N)** · **Ertelendi**.
> Yeni bağımlılık, Değişmez Kural istisnası veya plan sapması yeni bir ADR gerektirir.

---

## ADR-001 — Statik site üreticisi: Astro

- **Durum:** Kabul edildi (2026-10-17, lead — S6)
- **Bağlam:** Bir profil sayfası ve sayısı zamanla artacak proje sayfaları; GitHub
  Pages'te statik yayın; ortak layout; içeriğin kolay güncellenmesi; yüksek
  performans ve SEO. Lead'in ekosistemi PHP/Laravel, JavaScript/React, React Native.
- **Karar:** Astro + TypeScript (strict).
- **Alternatifler:**

  | Seçenek | Artı | Eksi |
  |---|---|---|
  | Saf HTML/CSS/JS | Sıfır bağımlılık, derleme yok | Layout tekrarı; her proje sayfası elle; şema doğrulaması yok |
  | Jekyll | GitHub Pages yerleşik desteği | Ruby/Liquid ekosistemi lead'in yığını dışında; Pages'in yerleşik Jekyll sürümü/eklentileri kısıtlı |
  | Eleventy | Hafif, esnek | Tipli içerik şeması ve görsel optimizasyonu için ek kurulum |
  | Next.js (static export) | React deneyimiyle doğrudan uyum | Bu ölçek için ağır; varsayılan olarak istemci JS gönderir; `next/image` export kısıtları |
  | Laravel + statik export | Lead'in ana yığını | Pages için ek export aracı; statik site için fazla altyapı |

- **Sonuçlar:** Varsayılan sıfır JS, zod tabanlı içerik koleksiyonları, resmî
  GitHub Pages aksiyonu, `astro:assets` ile görsel optimizasyonu. Maliyet: Node
  araç zinciri ve Astro majör sürüm geçişleri (yılda ~1) için bakım.

## ADR-002 — Barındırma ve dağıtım: GitHub Pages + GitHub Actions

- **Durum:** Kabul edildi (alan adı gereği)
- **Bağlam:** Alan adı `ulascanerturk.github.io` bir GitHub Pages kullanıcı sitesidir.
- **Karar:** Depo `ulascanerturk/ulascanerturk.github.io`; yayın kaynağı "GitHub
  Actions"; `withastro/action` + `actions/deploy-pages`; yalnızca `main`.
- **Sonuçlar:** Ücretsiz HTTPS ve CDN; sunucu bakımı yok. Kısıtlar: özel HTTP
  başlığı yok (CSP yalnızca meta ile), sunucu tarafı yönlendirme yok,
  depo public olmalı (ücretsiz planda).

## ADR-003 — Stil: native CSS + custom properties

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 1 planı onayı)
- **Karar:** Tasarım token'ları CSS custom properties olarak `src/styles/tokens.css`'te;
  bileşen stilleri Astro scoped `<style>`. Tailwind/Bootstrap kullanılmaz.
- **Alternatifler:** Tailwind (hızlı prototip, ama ek bağımlılık ve sınıf
  kalabalığı), Bootstrap (lead'e tanıdık, ama kullanılmayan CSS ve jenerik görünüm).
- **Sonuçlar:** Sıfır stil bağımlılığı, küçük CSS; tema geçişi token
  değişimiyle. Maliyet: yardımcı sınıfların elle yazılması.

## ADR-004 — İstemci JavaScript: framework yok

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 1 planı onayı)
- **Karar:** Hiçbir UI framework'ü istemciye gönderilmez. Tek istemci betiği
  tema geçişidir (inline, ≤ 1 KB). Etkileşim ihtiyacı doğarsa önce CSS/HTML
  çözümü; olmazsa `@astrojs/react` island — yeni ADR ile.
- **Sonuçlar:** Değişmez Kural 4 bütçesi kolayca karşılanır; CSP basit kalır.

## ADR-005 — İçerik modeli

- **Durum:** Önerildi
- **Karar:** Projeler `src/content/projects/*.md` (content collection + zod);
  profil `src/data/profile.ts` (tipli nesne). `ulascanerturk.md` kaynak belgedir,
  sitede doğrudan render edilmez.
- **Gerekçe:** Profil yapısal ve tek kayıttır (TS tipleri yeterli, bileşenlere
  doğrudan prop); projeler çok kayıtlı ve uzun metinlidir (Markdown + şema).
  Kaynak belgenin doğrudan render edilmemesi §9 ve §11'in sızmasını önler.
- **Sonuçlar:** `ulascanerturk.md` güncellendiğinde `profile.ts` elle
  senkronlanır (Faz 6 bakım rehberi).

## ADR-006 — Dil: Türkçe birincil

- **Durum:** Önerildi
- **Karar:** v1 yalnızca `tr-TR`. Arayüz metinleri veri dosyalarında tutulur ki
  İngilizce sürüm yapısal değişiklik gerektirmesin. URL'ler Türkçe ve ASCII
  (`/projeler/`). İngilizce sürüm `/en/` altında v1 sonrası yapılacak (S4,
  2026-10-17 onaylandı — Faz 6).

## ADR-007 — Analitik yok (v1)

- **Durum:** Önerildi
- **Karar:** v1'de analitik, çerez ve izleme betiği yok (Değişmez Kural 3).
- **Gelecek:** İhtiyaç olursa çerezsiz, kişisel veri toplamayan bir çözüm
  (ör. GoatCounter, Plausible, Cloudflare Web Analytics) yeni ADR ile; KVKK
  açısından aydınlatma metni gerekip gerekmediği o ADR'de değerlendirilir.

## ADR-008 — Çalışma ortamı: Node.js LTS + npm

- **Durum:** Kabul edildi (2026-10-17, Faz 0 planı onayı)
- **Karar:** Node.js güncel Active LTS; `.nvmrc` + `package.json#engines`;
  npm ve commit edilen `package-lock.json`; CI'da `npm ci`.
- **Doğrulanan sürümler (2026-10-17, nodejs.org dist index + npm registry):**
  Active LTS **Node 24** (Krypton, v24.22.0) → `.nvmrc = 24`; `withastro/action@v6`
  varsayılanı da 24. Astro 7.4 `node >=22.22.0` istediği için
  `engines.node = ">=22.22.0"` — yerel Node 22 (Maintenance LTS) ile geliştirme
  sürer, CI ve yayın 24'te koşar.
- **Not:** Yerel ortamda `NODE_ENV=production` tanımlıysa npm devDependencies'i
  atlar; bu durumda `npm install --include=dev` kullanılır.

## ADR-009 — Yazı tipi: sistem font yığını

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 1 planı onayı)
- **Karar:** `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  ve kod için `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`.
- **Gerekçe:** Harici font isteği yok (gizlilik, CSP, performans); Türkçe
  karakter desteği tüm sistem fontlarında var. Marka fontu istenirse
  self-hosted (`@fontsource`) + yeni ADR.

## ADR-010 — Kalite araçları

- **Durum:** Kabul edildi (2026-10-17, Faz 0 planı onayı)
- **Karar:** `astro check` (tip), ESLint flat config (`eslint-plugin-astro`,
  `eslint-plugin-jsx-a11y-x`, `typescript-eslint`), Prettier
  (`prettier-plugin-astro`), Vitest (`src/lib`), bağımlılıksız
  `scripts/check-dist.mjs` (derlenmiş HTML), Lighthouse CI ve axe/pa11y (faz
  kapanışlarında). Hepsi `test-lint` skill'inin kapı matrisinde.
- **Sapmalar (2026-10-17):**
  - `eslint-plugin-jsx-a11y` (6.10.2) ESLint 10'u desteklemiyor (peer `^3…^9`);
    yerine `eslint-plugin-astro` 3.x'in resmî olarak desteklediği
    `eslint-plugin-jsx-a11y-x` (es-tooling, 0.2.x) kullanılır. Orijinal eklenti
    ESLint 10 desteği verdiğinde geri dönülebilir (`eslint-plugin-astro` ikisini de yükler).
  - TypeScript `~6.0.3`'e sabitlendi: `typescript-eslint` (`<6.1.0`) ve
    `@astrojs/check` (`^5 || ^6`) henüz TS 7'yi desteklemiyor.
- **Yardımcı paketler:** `@astrojs/check` (astro check), `@eslint/js` ve
  `globals` (ESLint flat config temel parçaları).

## ADR-011 — İçerik Güvenlik Politikası (aday)

- **Durum:** Ertelendi — Faz 4'te karara bağlanacak
- **Bağlam:** GitHub Pages başlık ayarlamaya izin vermez; meta CSP mümkündür
  ancak `frame-ancestors` ve raporlama desteklemez.
- **Karar adayı:** Faz 4 §2.3 madde 12'deki politika.
