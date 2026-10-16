# Faz 0 — Proje Kurulumu

> Önkoşul: yok · Dal: `feat/faz-0-*` · Kapsam (skill scope): `config`
> İlgili: [`01-mimari.md`](../01-mimari.md) §1, §2, §6 · ADR-001, ADR-002, ADR-008, ADR-010

## 1. Amaç

Boş depodan; derlenen, lint/format/test kapısından geçen ve CI'da doğrulanan
minimal bir Astro iskeleti üretmek. Bu fazın sonunda kalite kapısı (`test-lint`)
gerçek komutlarla çalışır hâle gelir.

## 2. Mevcut Durum (başlangıç)

- Git deposu `main` dalında başlatılmış; bootstrap commit'leri: `.gitignore`,
  `ulascanerturk.md`, `plans/`, `AGENTS.md`/`CLAUDE.md`, `.claude/skills/`, `.agents/skills/`.
- Uzak depo (remote) yok — Faz 5'te eklenir.
- `references/` yok — Faz 0'ın ilk adımı olarak `init-references` çalıştırılır
  (DOCS-ONLY modunda, girdiler `[PLANNED]` işaretli).

## 3. Görev Listesi

1. **ADR-001 onayı.** Lead, Astro seçimini onaylar (veya alternatif seçer; bu
   durumda bu faz belgesi güncellenir).
2. **Referans haritaları.** `init-references` → `references/*.md` (DOCS-ONLY).
3. **Sürüm doğrulama.** Güncel Astro ve Node.js LTS sürümlerini birincil
   kaynaklardan (astro.build, nodejs.org) doğrula; `.nvmrc` ve
   `package.json#engines` alanını yaz. ADR-008'i doğrulanmış sürümle güncelle.
4. **Astro iskeleti.** Mevcut dosyaları ezmeden minimal şablonla kurulum
   (ör. `npm create astro@latest -- --template minimal --typescript strict
   --no-git --install` geçici klasöre, ardından dosyaları köke taşıma).
   `src/pages/index.astro` geçici "yapım aşamasında" sayfası.
5. **`astro.config.mjs`.** `site: 'https://ulascanerturk.github.io'`,
   `trailingSlash: 'always'`, `build.format: 'directory'`. `base` tanımlanmaz.
6. **TypeScript.** `tsconfig.json` → `astro/tsconfigs/strict` + `noUncheckedIndexedAccess`;
   yol takma adı `@/*` → `src/*`.
7. **Lint ve biçim.** ESLint flat config (`eslint-plugin-astro`,
   `eslint-plugin-jsx-a11y`, `typescript-eslint`); Prettier + `prettier-plugin-astro`;
   `.editorconfig`. Kural: `no-console: error` (yalnızca `scripts/` için izinli).
8. **Test.** Vitest (`vitest.config.ts`, `getViteConfig` ile); örnek
   `src/lib/slug.ts` + `src/lib/slug.test.ts` (Türkçe karakter normalizasyonu —
   Faz 3'te kullanılacak).
9. **npm script'leri.** `01-mimari.md` §6.1 tablosundaki `dev`, `build`,
   `preview`, `check`, `lint`, `format`, `format:check`, `test`.
10. **CI.** `.github/workflows/ci.yml` — Node sürümü `.nvmrc`'den; `npm ci` →
    `check` → `lint --max-warnings 0` → `format:check` → `test` → `build`.
    Aksiyon sürümleri tam majör etiketle (ör. `actions/checkout@v{N}`); güncel
    majör sürümler uygulama sırasında doğrulanır.
11. **Dağıtım iş akışı (taslak).** `.github/workflows/deploy.yml` —
    `withastro/action` + `actions/deploy-pages`; Faz 5'e kadar yalnızca
    `workflow_dispatch` tetikli bırakılır (yanlışlıkla yayın olmasın).
12. **Dokümantasyon.** `AGENTS.md` komut bölümünü gerçek script'lerle güncelle;
    `references/methodology.md` → komutlar, sürümler.

## 4. Testler

- `npm run check`, `npm run lint -- --max-warnings 0`, `npm run format:check`,
  `npm test`, `npm run build` yerelde temiz geçer.
- `slug.test.ts`: `"Shifter Pro"` → `shifter-pro`, `"Çalışma Alanları"` →
  `calisma-alanlari`, `"İŞ GÜCÜ"` → `is-gucu`, boşluk/özel karakter temizliği.
- `dist/index.html` üretilir; `dist/` git tarafından yok sayılır (`git status` temiz).

## 5. Kabul Kriterleri

- [ ] ADR-001 lead tarafından onaylandı (karar-kayitlari.md'de "Kabul edildi").
- [ ] `references/` dört harita dosyasıyla mevcut.
- [ ] `.nvmrc` ve `engines` doğrulanmış Node LTS sürümünü gösteriyor.
- [ ] Kalite kapısının tüm komutları sıfır hata/uyarı ile geçiyor.
- [ ] CI iş akışı sözdizimi geçerli (`actionlint` varsa temiz; yoksa Faz 5'te ilk
      push ile doğrulanacak diye `phase_progress.md`'ye not düşüldü).
- [ ] `dist/`, `.astro/`, `node_modules/` commit edilmedi.
- [ ] Kontrol listesi: Genel, Dağıtım bölümleri gözden geçirildi.

## 6. Riskler

| Risk | Etki | Önlem |
|---|---|---|
| `npm create astro` mevcut dosyaları ezer | Plan/skill kaybı | Geçici klasöre kur, seçerek taşı; işlem öncesi `git status` temiz |
| Astro majör sürüm farkları (config/content API) | Plan örnekleri eskir | Sürüm doğrulandıktan sonra `01-mimari.md` örnekleri gerekirse güncellenir (plan sapması olarak işaretlenir) |
| ESLint/Prettier eklenti uyumsuzluğu | Kapı çalışmaz | Eklentilerin güncel uyumluluk tablosu kontrol edilir |
