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

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 2 planı onayı)
- **Karar:** Projeler `src/content/projects/*.md` (content collection + zod);
  profil `src/data/profile.ts` (tipli nesne). `ulascanerturk.md` kaynak belgedir,
  sitede doğrudan render edilmez.
- **Gerekçe:** Profil yapısal ve tek kayıttır (TS tipleri yeterli, bileşenlere
  doğrudan prop); projeler çok kayıtlı ve uzun metinlidir (Markdown + şema).
  Kaynak belgenin doğrudan render edilmemesi §9 ve §11'in sızmasını önler.
- **Sonuçlar:** `ulascanerturk.md` güncellendiğinde `profile.ts` elle
  senkronlanır (Faz 6 bakım rehberi).

## ADR-006 — Dil: Türkçe birincil, İngilizce `/en/` altında

- **Durum:** Kabul edildi (2026-10-17, Faz 6 planı onayı)
- **Karar:** v1 yalnızca `tr-TR`. Arayüz metinleri veri dosyalarında tutulur ki
  İngilizce sürüm yapısal değişiklik gerektirmesin. URL'ler Türkçe ve ASCII
  (`/projeler/`). İngilizce sürüm `/en/` altında v1 sonrası yapılacak (S4,
  2026-10-17 onaylandı — Faz 6).
- **Faz 6 uygulaması (lead onayı 2026-10-17):**
  - Astro `i18n` (`defaultLocale: 'tr'`, `prefixDefaultLocale: false`); Türkçe URL'ler değişmez.
    İngilizce rotalar: `/en/`, `/en/projects/`, `/en/projects/{slug}/`. Rota eşlemesi tek
    yerde: `src/lib/i18n.ts` (sayfalar, layout'lar, sitemap ve testler bunu kullanır).
  - Veri: `profile.tr.ts` / `profile.en.ts` (aynı `Profile` tipi), `siteText` ve
    `projectsPage` `Record<Locale, …>` — eksik dil/alan tip hatasıdır; liste ve bağlantı
    eşliği Vitest ile denetlenir.
  - Projeler: Türkçe `src/content/projects/{slug}.md`, İngilizce
    `src/content/projects/en/{slug}.md`; şema aynı, dil klasörden okunur. Yayımlanmış her
    projenin iki dili de olmalı ve `kind/status/featured/order/period` aynı olmalı —
    aksi halde derleme hata verir.
  - SEO: `hreflang` (tr, en, `x-default` → tr), `og:locale` (`tr_TR` / `en_US`) +
    `og:locale:alternate`; sitemap alternatifleri `serialize` ile (eklentinin `i18n`
    seçeneği yalnızca aynı yolları eşleştirir: `/projeler/` ≠ `/en/projects/`).
  - `/404.html` tektir (GitHub Pages): Türkçe sayfa + `lang="en"` kısa İngilizce bölüm.
- **Maliyet:** her metin değişikliği iki dosyada yapılır; İngilizce metin de lead onayı
  ister (Değişmez Kural 2 çeviride de geçerli).

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

## ADR-011 — İçerik Güvenlik Politikası: Astro yerleşik meta CSP

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 4 planı onayı)
- **Bağlam:** GitHub Pages başlık ayarlamaya izin vermez; CSP yalnızca
  `<meta http-equiv="Content-Security-Policy">` ile verilebilir. Sitede iki tür
  inline öğe var: tema betiği (`src/lib/theme.ts`, statik) ve Astro'nun küçük
  bileşen stillerini sayfaya gömdüğü `<style>` blokları. Faz 4 §2.3 madde 12'deki
  aday politika `style-src 'unsafe-inline'` ve elle hesaplanan bir script hash'i öneriyordu.
- **Karar:** Astro'nun yerleşik `security.csp` özelliği (Astro 6+) kullanılır
  (`astro.config.mjs`). Ek direktifler: `default-src 'self'; img-src 'self' data:;
  object-src 'none'; base-uri 'self'; form-action 'none'`. `script-src` ve
  `style-src` değerlerini Astro derleme sırasında üretir: `'self'` + her inline
  script ve stilin sha256 hash'i. `'unsafe-inline'` kullanılmaz.
- **Alternatifler:**

  | Seçenek | Artı | Eksi |
  |---|---|---|
  | Plan adayı: elle meta + betikle hash üretimi | Tam denetim | Her stil/script değişikliğinde hash bakımı; stiller için `'unsafe-inline'` gerekiyordu |
  | `style-src 'unsafe-inline'` | Basit | Stil enjeksiyonuna karşı koruma yok; Astro bu durumda hash üretmeyi bırakır |
  | CSP yok | Sıfır bakım | XSS'e karşı savunma katmanı kaybı |

- **Sınırlar (bilinçli olarak kabul edildi):**
  - Meta CSP `frame-ancestors`, `sandbox` ve raporlama (`report-to`) desteklemez;
    tıklama korsanlığına karşı koruma GitHub Pages'te verilemez.
  - Astro meta etiketini `<head>`'in sonuna, tema betiğinden sonra basar; tema
    betiği politikadan önce çalışır. Betik statik ve projeye ait olduğundan risk
    yoktur (hash'i yine listededir); politika ondan sonraki her şeyi kapsar.
  - `astro dev`'de CSP uygulanmaz; doğrulama `build` + `preview` ile yapılır.
  - Shiki (Markdown kod vurgulama) inline stil kullandığı için uyumsuz:
    `markdown.syntaxHighlight: false`. Kod bloğu gerekirse `'prism'` kullanılır.
  - Element üzerinde `style="…"` özniteliği hash'lenmez; kullanılmaz.
- **Doğrulama (2026-10-17):** `astro preview` ile 4 sayfa açıldı, konsolda CSP
  ihlali yok; deneme olarak enjekte edilen inline script engellendi ve konsola
  düştü; tema geçişi çalışıyor; Lighthouse best-practices 100.
  `npm run check:dist` her sayfada CSP meta etiketini arar.

## ADR-012 — Sitemap: `@astrojs/sitemap`

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 4 planı onayı)
- **Bağlam:** Faz 4 §2.1 madde 4 ve `01-mimari.md` §5: `/sitemap-index.xml`,
  404 ve taslaklar hariç.
- **Karar:** Resmî Astro entegrasyonu `@astrojs/sitemap` (^3.7.4, `dependencies`);
  `filter` ile `/404` dışlanır, taslaklar üretimde zaten derlenmez.
  `public/robots.txt` sitemap adresini verir.
- **Alternatifler:** Elle `sitemap-index.xml.ts` endpoint'i (bağımlılık yok, ama
  Faz 6'daki `hreflang`/i18n desteğini yeniden yazmak gerekir).
- **Sonuçlar:** Derleme zamanı aracıdır; ziyaretçiye JS göndermez. Geçişli
  bağımlılıklar: `sitemap`, `zod`. Faz 6'da `i18n` seçeneği ile genişler.
  `npm audit --omit=dev` temiz (2026-10-17).

## ADR-013 — Lighthouse CI: `@lhci/cli` (yalnızca yerelde); axe bağımlılık değil

- **Durum:** Kabul edildi (2026-10-17, lead — Faz 4 planı onayı; CI'a eklenmemesi lead kararı)
- **Bağlam:** Değişmez Kural 4 (Lighthouse mobil ≥ 95) ve Faz 4 §2.3 madde 10;
  ADR-010 aracı seçmişti, bağımlılık kaydı burada.
- **Karar:** `@lhci/cli` (^0.15.1) `devDependencies`'e eklenir; `npm run lhci`
  (`lighthouserc.json`: `dist/` statik sunucu, 4 URL, mobil, 3 çalıştırma, medyan,
  4 kategori ≥ 0.95; `noindex` olan 404'te SEO hariç). Raporlar yalnızca yerelde
  `.lighthouseci/` klasörüne yazılır (gitignore); herkese açık geçici depolamaya
  yükleme yapılmaz. Lighthouse CI'da **çalışmaz**: faz kapanışında ve lead
  isteğiyle yerelde koşulur.
- **axe:** Proje bağımlılığı eklenmez. Seçenekler: `npx @axe-core/cli` (yerel
  Chrome ile eşleşen ChromeDriver gerekir:
  `npx browser-driver-manager install chrome`) ya da Lighthouse ile gelen
  `axe-core`'un `astro preview` üzerinde tarayıcıda çalıştırılması (Faz 4
  kapanışında kullanılan yöntem; ayrıntı `references/methodology.md`).
- **Sonuçlar:** Büyük bir geliştirme bağımlılık ağacı (lighthouse 12.6.1);
  CI'da kullanılmasa da `npm ci` ile kurulur (kurulum süresi maliyeti). Yerel
  Chrome gerekir. CI'a alınması gerekirse ayrı bir job + yeni karar.
