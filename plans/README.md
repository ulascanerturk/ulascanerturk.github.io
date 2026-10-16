# ulascanerturk.github.io — Geliştirici Yol Haritası

> Son güncelleme: 2026-10-17 · Durum: planlama tamamlandı, açık sorular yanıtlandı, Faz 0 başlamadı
> Bu klasör (`plans/`) projenin **spesifikasyonudur** ve doğruluk kaynağıdır.
> Kodun güncel durumu `references/` altındaki haritalarda tutulur (bkz. `AGENTS.md`).

## 1. Amaç

`https://ulascanerturk.github.io` adresinde yayınlanacak; Ulaşcan Ertürk'ü
profesyonel olarak tanıtan bir **profil sayfası** ve bunun altında her biri ayrı
statik sayfa olan **proje sayfaları** içeren, hızlı, erişilebilir ve bakımı kolay
bir kişisel site.

İçeriğin tek kaynağı kök dizindeki [`ulascanerturk.md`](../ulascanerturk.md)
belgesidir. Bu belgede olmayan bilgi siteye ancak lead (Ulaşcan) onayıyla girer
ve onaylandıktan sonra kaynak belgeye de eklenir (ör. LockBox Mobile, LinkedIn).

## 2. Belge Dizini

| Belge | İçerik |
|---|---|
| [`01-mimari.md`](01-mimari.md) | Teknoloji yığını, klasör yapısı, katmanlar, içerik modeli, derleme ve dağıtım hattı |
| [`02-icerik-ve-tasarim.md`](02-icerik-ve-tasarim.md) | Site haritası, sayfa bazında içerik envanteri, tasarım yönü, açık sorular |
| [`fazlar/faz-0-proje-kurulumu.md`](fazlar/faz-0-proje-kurulumu.md) | Astro iskeleti, araç zinciri, CI |
| [`fazlar/faz-1-tasarim-sistemi-ve-layout.md`](fazlar/faz-1-tasarim-sistemi-ve-layout.md) | Tasarım token'ları, tema, temel layout ve bileşenler |
| [`fazlar/faz-2-profil-sayfasi.md`](fazlar/faz-2-profil-sayfasi.md) | Ana sayfa / profil içeriği |
| [`fazlar/faz-3-proje-sayfalari.md`](fazlar/faz-3-proje-sayfalari.md) | Proje koleksiyonu, liste ve detay sayfaları (v1: LockBox Mobile) |
| [`fazlar/faz-4-seo-erisilebilirlik-performans.md`](fazlar/faz-4-seo-erisilebilirlik-performans.md) | SEO, Open Graph, yapılandırılmış veri, a11y ve performans denetimleri |
| [`fazlar/faz-5-yayin-ve-dagitim.md`](fazlar/faz-5-yayin-ve-dagitim.md) | GitHub deposu, Pages, ilk canlı yayın |
| [`fazlar/faz-6-ingilizce-surum-ve-bakim.md`](fazlar/faz-6-ingilizce-surum-ve-bakim.md) | İngilizce sürüm (`/en/`), bakım rutinleri |
| [`ekler/karar-kayitlari.md`](ekler/karar-kayitlari.md) | Mimari karar kayıtları (ADR) |
| [`ekler/kontrol-listesi.md`](ekler/kontrol-listesi.md) | Her değişiklikte uygulanan kontrol listesi |

## 3. Faz Bağımlılık Grafiği

```
Faz 0 ──► Faz 1 ──► ┬─► Faz 2 ─┬──► Faz 4 ──► Faz 5 ──► Faz 6
 kurulum   tasarım  │  profil  │    SEO/a11y   yayın     EN + bakım
                    └─► Faz 3 ─┘
                       projeler
```

- Fazlar bu sırayla uygulanır: **0 → 1 → (2 ∥ 3) → 4 → 5 → 6**.
- Faz 2 ve Faz 3 birbirinden bağımsızdır; paralel dallarda yürütülebilir.
- Bir faz, önkoşul fazları `references/phase_progress.md` içinde kapatılmadan başlamaz
  (lead açıkça aksi yönde karar vermedikçe).

| Faz | Ad | Tahmini efor* | Çıktı |
|---|---|---|---|
| 0 | Proje kurulumu | 0,5–1 gün | Çalışan Astro iskeleti, kalite kapısı komutları, CI |
| 1 | Tasarım sistemi ve layout | 1–2 gün | Token'lar, açık/koyu tema, `BaseLayout`, Header/Footer, 404 |
| 2 | Profil sayfası | 1–2 gün | `/` — tanıtım, yetkinlikler, deneyim, eğitim, girişimcilik, bağlantılar |
| 3 | Proje sayfaları | 1 gün | `/projeler/` ve `/projeler/lockbox-mobile/` (çoğaltılabilir koleksiyon altyapısıyla) |
| 4 | SEO, erişilebilirlik, performans | 1 gün | Meta/OG/JSON-LD, sitemap, Lighthouse ≥ 95, otomatik dist denetimi |
| 5 | Yayın ve dağıtım | 0,5 gün | Canlı site, Pages + Actions dağıtımı doğrulanmış |
| 6 | İngilizce sürüm ve bakım | 1–2 gün | `/en/` sürümü, içerik güncelleme rehberi, bağımlılık bakımı |

\* Tek geliştirici, yarı zamanlı tahmindir; içerik onay süreleri hariçtir. Varsayımdır,
faz sonlarında gerçekleşenle güncellenir.

## 4. Değişmez Kurallar

Her faz, her görev ve her commit için geçerlidir. İhlal gerektiren bir ihtiyaç
doğarsa iş durur; çözüm lead onaylı bir ADR'dir, sessiz istisna değildir.

1. **Yalnızca kamuya açık profesyonel bilgi.** `ulascanerturk.md` §11'de bilerek
   dışarıda bırakılan hiçbir bilgi (özel e-posta ve telefon, adres ayrıntısı, tam
   doğum tarihi, aile, sağlık, finans, siyasi bağlantı, kimlik/hesap numarası,
   sunucu IP/SSH ayrıntısı, kimlik doğrulama bilgisi, müşteri sözleşmesi, paylaşım
   izni olmayan ticari/teknik bilgi) site içeriğine, meta verilere, görsel EXIF
   verisine veya depoya girmez.
2. **İçerik doğruluğu.** Her iddia `ulascanerturk.md`'ye ya da lead'in yazılı
   onayına dayanır. Uydurma metrik, müşteri adı, ödül, sertifika veya unvan
   yazılmaz. Profildeki ayrımlar korunur: lisans eğitimi Uluslararası İlişkiler'dir
   (yazılım eğitimleri diploma değildir); girişimcilik programları Shifter
   bağlamındadır; unvanlar değişebilir.
3. **Statik ve izleyicisiz.** Sunucu tarafı kod, çerez, analitik/izleme betiği,
   üçüncü taraf runtime JavaScript'i yoktur (istisna yalnızca ADR ile). Hiçbir
   sır (token, API anahtarı, `.env`) depoya girmez.
4. **Erişilebilir ve hızlı.** WCAG 2.2 AA hedeflenir. Lighthouse (mobil) tüm
   kategorilerde ≥ 95. Sayfa başına istemci JS ≤ 10 KB (gzip) — aşımı ADR gerektirir.
5. **Üretilen çıktı commit edilmez.** `dist/`, `.astro/`, `node_modules/`
   depoya girmez. Yayın yalnızca `main` dalından GitHub Actions ile yapılır.
6. **Kabul kriterleri ve kalite kapısı tamamlanmadan faz kapanmaz.**

Değişiklik başına uygulanacak kontrol listesi: [`ekler/kontrol-listesi.md`](ekler/kontrol-listesi.md).

## 5. Çalışma Şekli

- Her değişiklik `dev-workflow` skill'i ile yürütülür (13 adım: dal → referans
  okuma → plan → uygulama → kalite kapısı → düzeltme → referans güncelleme →
  commit → yerel squash merge → dal silme). Ayrıntı: `AGENTS.md`.
- Faz görevleri `feat/faz-{N}-{açıklama}` dallarında yürütülür.
- Commit'ler Conventional Commits biçimindedir; push iş akışının dışındadır ve
  lead tarafından yapılır.
- `references/` haritaları ilk geliştirmeden önce `init-references` ile bir kez
  üretilir ve her doğrulanmış değişiklikten sonra güncellenir.

## 6. Açık Sorular ve Kararlar

Tüm sorular 2026-10-17'de lead tarafından yanıtlandı. Ayrıntı:
[`02-icerik-ve-tasarim.md` §6](02-icerik-ve-tasarim.md#6-açık-sorular-ve-kararlar).

| # | Soru | Karar | Etkilenen faz |
|---|---|---|---|
| S1 | Hangi projeler proje sayfası olarak yayınlanacak? | **Yalnızca LockBox Mobile** (macOS sürümü kapsam dışı). Shifter Pro/Lite proje sayfası olmaz; profilde "Deneyim" altında anlatılır | Faz 2, Faz 3 |
| S2 | GitHub dışında iletişim kanalı? | **GitHub + LinkedIn.** E-posta/telefon yok. LinkedIn URL'si Faz 2'de lead tarafından verilecek (⏳ bekleniyor) | Faz 2 |
| S3 | Profil görseli? | **Monogram (UE) SVG**; fotoğraf yok | Faz 1 |
| S4 | İngilizce sürüm? | **Evet, v1 yayınından sonra** (Faz 6, `/en/`) | Faz 6 |
| S5 | Özel alan adı? | **Hayır**; `ulascanerturk.github.io` | Faz 5 |
| S6 | ADR-001 (Astro) onayı? | **Onaylandı** | Faz 0 |
