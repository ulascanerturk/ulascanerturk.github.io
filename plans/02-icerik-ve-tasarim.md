# 02 — İçerik ve Tasarım

> İçerik kaynağı: [`../ulascanerturk.md`](../ulascanerturk.md).
> Bu belgedeki metin taslakları yönlendiricidir; nihai metin ilgili fazda lead
> onayıyla kesinleşir.

## 1. Hedef Kitle ve Mesaj

| Kitle | Ne arıyor? | Sitenin vermesi gereken |
|---|---|---|
| Potansiyel iş ortağı / müşteri | Güvenilirlik, alan uzmanlığı | İş gücü/vardiya yönetimi ve B2B SaaS deneyimi, uçtan uca ürün yaklaşımı |
| İşe alım / teknik değerlendirici | Teknik yetkinlik, kod örnekleri | Teknoloji yığını, projeler, GitHub bağlantısı |
| Ekosistem (yatırımcı, program) | Girişimcilik geçmişi | Shifter, Insapption, program katılımları (doğru bağlamla) |
| Yapay zekâ ajanları / arama motorları | Yapılandırılmış, doğru bilgi | Semantik HTML, JSON-LD `Person`, tutarlı meta veri |

**Ana mesaj (taslak):** "2018'den bu yana web, mobil ve kurumsal uygulamaları
fikirden üretim ortamına kadar uçtan uca geliştiren; iş gücü planlama, B2B SaaS
ve yapay zekâ destekli çözümlere odaklanan İstanbul merkezli yazılım geliştirici
ve teknoloji girişimcisi."

## 2. Site Haritası

```
/                      Profil (ana sayfa)
├── #hakkimda          Kısa tanıtım
├── #yetkinlikler      Teknik yetkinlikler
├── #deneyim           Profesyonel deneyim
├── #projeler          Öne çıkan projeler (→ /projeler/)
├── #egitim            Eğitim ve mesleki gelişim
├── #girisimcilik      Girişimcilik ve ekosistem
└── #baglantilar       Bağlantılar / iletişim
/projeler/             Tüm projeler
/projeler/{slug}/      Proje detayı
/404.html              Bulunamadı
```

Üst menü: **Hakkımda** (`/#hakkimda`) · **Projeler** (`/projeler/`) ·
**GitHub** (dış bağlantı) · tema geçişi.

## 3. Profil Sayfası İçerik Envanteri

| Bölüm | Kaynak (`ulascanerturk.md`) | İçerik notları |
|---|---|---|
| Hero | Başlık + §1 | Ad, unvan satırı, tek cümlelik özet, "Projeleri gör" ve "GitHub" eylemleri |
| Hakkımda | §1, §3 "Disiplinler arası yaklaşım", §8 | 2–3 kısa paragraf; teknik + iş bakışı |
| Yetkinlikler | §4 tablo + "Öne çıkan teknik yaklaşım" | Kategori bazlı etiket grupları; Java ekosistemi "eğitim ve önceki deneyim" notuyla |
| Deneyim | §5 | Insapption Technology (Technology Officer — kamuya açık ekip sayfası), Shifter; "unvanlar değişebilir" notu korunur |
| Öne çıkan projeler | §6 | Shifter Pro, Shifter Lite kartları → detay sayfaları |
| Eğitim | §3 | ESOGÜ Uluslararası İlişkiler (lisans, İngilizce); BAU & Wissen Academy Java SE/EE; ODTÜ Yazılım Mühendisliği eğitim programı — **diploma olmadığı açıkça belirtilir** |
| Girişimcilik | §7 | Program listesi **"Shifter girişimi bağlamında"** ifadesiyle; kişisel ödül/sertifika gibi sunulmaz |
| Odak alanları | §8 | 7 alan, kısa açıklamalarla |
| Bağlantılar | §10 | GitHub, Insapption, Insapption ekip sayfası, Shifter, Shifter Blog |

**Yayınlanmayacaklar:** §9 (yapay zekâ ajanı çalışma tercihleri) ve §11'de
dışarıda bırakılan bilgiler. §11'deki doğrulama notu, sitede kısa bir dipnot
olarak ("Bazı yetkinlikler beyana dayalıdır…") kullanılabilir — lead kararı.

## 4. Proje Sayfaları İçerik Envanteri

| Slug | Başlık | `kind` | Kaynak | Durum |
|---|---|---|---|---|
| `shifter-pro` | Shifter Pro — Kurumsal Vardiya Yönetimi | `product` | §6 | Faz 3'te yazılır |
| `shifter-lite` | Shifter Lite — SaaS Vardiya Yönetimi | `product` | §6 | Faz 3'te yazılır |
| `calisma-alanlari` (veya liste içi bölüm) | Diğer yazılım çalışma alanları | `focus-area` | §6 "Diğer" | Ayrı sayfa mı, liste bölümü mü — Faz 3 planında karar |
| — | Ek projeler (ör. LockBox Mobile, GitHub depoları) | — | **Lead onayı (S1)** | Onaylanmadıkça eklenmez |

Kurallar:

- §6 notu korunur: "Diğer çalışma alanları" bağımsız, yayımlanmış ürünler gibi sunulmaz.
- Müşteri adı, sözleşme, iç ekran görüntüsü ve iç metrik kullanılmaz.
- Ürün ekran görüntüsü yalnızca kamuya açık kaynaktan (ör. shifter.com.tr) ve
  kullanım izni teyit edilerek eklenir.

## 5. Tasarım Yönü

| Konu | Karar (öneri) |
|---|---|
| Ton | Sade, profesyonel, içerik odaklı; "geliştirici portföyü" klişelerinden (terminal animasyonu vb.) kaçınılır |
| Düzen | Tek sütun, okuma genişliği ~68ch; geniş ekranda proje kartları 2–3 sütun grid |
| Tipografi | Sistem font yığını; ölçek `clamp()` ile akışkan (≈ 1.25 oran) |
| Renk | Nötr gri skala + tek vurgu rengi; açık ve koyu tema (`prefers-color-scheme` + elle geçiş, tercih `localStorage`'da) |
| Kontrast | Metin ≥ 4.5:1, büyük metin ve UI ≥ 3:1 — token'lar bu oranlarla doğrulanır |
| Hareket | Minimal; `prefers-reduced-motion` saygı görür |
| Görsel | Profil fotoğrafı opsiyonel (S3); proje kapakları opsiyonel; ikonlar inline SVG |
| Duyarlılık | 360 px'ten geniş ekrana; dokunma hedefleri ≥ 44×44 px |

Token kategorileri (Faz 1): `--color-*` (bg, surface, text, text-muted, border,
accent, accent-contrast, focus), `--font-*`, `--step-*` (tip ölçeği),
`--space-*`, `--radius-*`, `--shadow-*`, `--measure`.

## 6. Açık Sorular

| # | Soru | Önerilen varsayılan | Gerektiği faz |
|---|---|---|---|
| S1 | Shifter Pro / Lite dışında yayınlanacak projeler? | Yalnızca bu ikisi + "çalışma alanları"; diğerleri lead listelediğinde eklenir | Faz 3 |
| S2 | GitHub dışında iletişim kanalı? | Yalnızca GitHub + şirket bağlantıları; e-posta/telefon yok | Faz 2 |
| S3 | Profil fotoğrafı? | Yok; monogram (UE) SVG avatar | Faz 1 |
| S4 | İngilizce sürüm? | Faz 6'da, v1 yayından sonra | Faz 6 |
| S5 | Özel alan adı? | Yok; `ulascanerturk.github.io` | Faz 5 |
| S6 | ADR-001 (Astro) onayı? | Onay | Faz 0 |
