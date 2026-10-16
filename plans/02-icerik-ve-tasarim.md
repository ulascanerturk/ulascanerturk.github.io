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
├── #projeler          Öne çıkan projeler — LockBox Mobile (→ /projeler/)
├── #egitim            Eğitim ve mesleki gelişim
├── #girisimcilik      Girişimcilik ve ekosistem
└── #baglantilar       Bağlantılar / iletişim
/projeler/             Tüm projeler
/projeler/{slug}/      Proje detayı
/404.html              Bulunamadı
```

Üst menü: **Hakkımda** (`/#hakkimda`) · **Projeler** (`/projeler/`) ·
**GitHub** ve **LinkedIn** (dış bağlantılar) · tema geçişi.

## 3. Profil Sayfası İçerik Envanteri

| Bölüm | Kaynak (`ulascanerturk.md`) | İçerik notları |
|---|---|---|
| Hero | Başlık + §1 | Monogram (UE) avatar, ad, unvan satırı, tek cümlelik özet, "Projeleri gör", "GitHub" ve "LinkedIn" eylemleri |
| Hakkımda | §1, §3 "Disiplinler arası yaklaşım", §8 | 2–3 kısa paragraf; teknik + iş bakışı |
| Yetkinlikler | §4 tablo + "Öne çıkan teknik yaklaşım" | Kategori bazlı etiket grupları; Java ekosistemi "eğitim ve önceki deneyim" notuyla |
| Deneyim | §5, §6 | Insapption Technology (Technology Officer — kamuya açık ekip sayfası); Shifter — **Shifter Pro** (kurumsal, single-tenant) ve **Shifter Lite** (SaaS) ürünleri ve problem alanları burada, ayrı sayfa olmadan anlatılır (S1); §6 "Diğer yazılım çalışma alanları" kısa liste olarak, §6 notuyla; "unvanlar değişebilir" notu korunur |
| Öne çıkan projeler | S1 kararı | LockBox Mobile kartı → `/projeler/lockbox-mobile/` |
| Eğitim | §3 | ESOGÜ Uluslararası İlişkiler (lisans, İngilizce); BAU & Wissen Academy Java SE/EE; ODTÜ Yazılım Mühendisliği eğitim programı — **diploma olmadığı açıkça belirtilir** |
| Girişimcilik | §7 | Program listesi **"Shifter girişimi bağlamında"** ifadesiyle; kişisel ödül/sertifika gibi sunulmaz |
| Odak alanları | §8 | 7 alan, kısa açıklamalarla |
| Bağlantılar | §10 + S2 | GitHub, LinkedIn (URL Faz 2'de lead'den), Insapption, Insapption ekip sayfası, Shifter, Shifter Blog |

**Yayınlanmayacaklar:** §9 (yapay zekâ ajanı çalışma tercihleri) ve §11'de
dışarıda bırakılan bilgiler. §11'deki doğrulama notu, sitede kısa bir dipnot
olarak ("Bazı yetkinlikler beyana dayalıdır…") kullanılabilir — lead kararı.

## 4. Proje Sayfaları İçerik Envanteri

| Slug | Başlık | `kind` | Kaynak | Durum |
|---|---|---|---|---|
| `lockbox-mobile` | Lockbox — Çevrimdışı Parola Kasası (mağaza adı "Lockbox - Password Vault"; lead kararı 2026-10-17) | `product` | `lockbox-mobile/docs/00-genel-bakis.md` (kamuya uygun kısımlar) + lead onayı; `ulascanerturk.md` §6 "Lockbox" | Faz 3'te yazıldı (2026-10-17) |
| — | Ek projeler | — | Lead onayı | Yeni karar olmadan eklenmez; altyapı yeni `.md` dosyasıyla eklemeye hazırdır |

Kapsam dışı (S1): Shifter Pro / Shifter Lite proje sayfaları (profilde
"Deneyim" altında anlatılır), "Diğer çalışma alanları" sayfası (profilde kısa
liste), LockBox macOS sürümü.

LockBox Mobile sayfası için içerik çerçevesi (taslak, Faz 3'te onaylanır):

- **Problem:** Parolaları buluta ve hesaba bağlı olmadan, yalnızca cihazda ve
  güvenle saklama ihtiyacı.
- **Çözüm:** Çevrimdışı, cihaza bağlı, uçtan uca şifreli kasa; sunucu, hesap,
  telemetri ve ağ izni yok; parola üretme, saklama, kopyalama.
- **Teknoloji:** Expo · React Native · TypeScript; yüksek seviyede güvenlik
  mimarisi (Argon2id ile anahtar türetme, AEAD şifreleme, platform güvenli
  depolama). Ayrıntılar `lockbox-mobile/docs/` ile doğrulanarak yazılır.
- **Durum:** Uygulamanın yayın durumu ve mağaza bağlantıları lead'den alınır;
  yayımlanmadıysa "geliştirme aşamasında" yazılır, bağlantı verilmez.
- **Bağlantılar:** Kaynak kod deposu kamuya açık değil (uzak depo yok) —
  depo bağlantısı verilmez.

Kurallar:

- Yalnızca yayımlanması uygun, yüksek seviyeli bilgi: iç belge yolları, kasa
  dosya biçiminin ayrıntıları, tehdit modelindeki açık uçlar ve yayımlanmamış
  mağaza/hesap bilgileri yazılmaz.
- Ölçülebilir iddialar (performans, kapsama oranı) yalnızca doğrulanmışsa ve
  lead onaylarsa kullanılır.
- Ekran görüntüsü yalnızca lead'in sağladığı, kişisel/gerçek kasa verisi
  içermeyen (örnek verili) görüntülerden; metadata temizlenerek.

## 5. Tasarım Yönü

| Konu | Karar (öneri) |
|---|---|
| Ton | Sade, profesyonel, içerik odaklı; "geliştirici portföyü" klişelerinden (terminal animasyonu vb.) kaçınılır |
| Düzen | Tek sütun, okuma genişliği ~68ch; geniş ekranda proje kartları 2–3 sütun grid |
| Tipografi | Sistem font yığını; ölçek `clamp()` ile akışkan (≈ 1.25 oran) |
| Renk | Nötr gri skala + tek vurgu rengi; açık ve koyu tema (`prefers-color-scheme` + elle geçiş, tercih `localStorage`'da) |
| Kontrast | Metin ≥ 4.5:1, büyük metin ve UI ≥ 3:1 — token'lar bu oranlarla doğrulanır |
| Hareket | Minimal; `prefers-reduced-motion` saygı görür |
| Görsel | Profil fotoğrafı yok; monogram (UE) SVG avatar (S3); proje kapakları opsiyonel; ikonlar inline SVG |
| Duyarlılık | 360 px'ten geniş ekrana; dokunma hedefleri ≥ 44×44 px |

Token kategorileri (Faz 1): `--color-*` (bg, surface, text, text-muted, border,
accent, accent-contrast, focus), `--font-*`, `--step-*` (tip ölçeği),
`--space-*`, `--radius-*`, `--shadow-*`, `--measure`.

## 6. Açık Sorular ve Kararlar

Lead kararları — 2026-10-17:

| # | Soru | Karar | Sonuç |
|---|---|---|---|
| S1 | Proje sayfası olarak yayınlanacak projeler? | Yalnızca **LockBox Mobile** | Faz 3 tek içerik dosyasıyla başlar; Shifter ürünleri Faz 2'de "Deneyim" bölümünde |
| S2 | GitHub dışında iletişim kanalı? | **GitHub + LinkedIn** | LinkedIn URL'si Faz 2'de lead'den alınır (⏳); e-posta/telefon yok |
| S3 | Profil fotoğrafı? | **Monogram (UE) SVG** | Faz 1 görev 8 |
| S4 | İngilizce sürüm? | **Evet, v1 sonrası** | Faz 6 §2.1 uygulanır |
| S5 | Özel alan adı? | **Hayır** | Faz 5'te CNAME/DNS adımı yok |
| S6 | ADR-001 (Astro) onayı? | **Onaylandı** | ADR-001 "Kabul edildi" |

Bekleyen girdiler: LinkedIn profil URL'si (Faz 2), LockBox Mobile yayın durumu
ve metin onayı (Faz 3).
