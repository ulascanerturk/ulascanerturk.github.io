---
# Kaynak: tuzak-root docs/yayina-hazirlik.md §1.4, §5, §7.4; docs/reklam-gelir-modeli.md §1.3, §1.5;
# tuzak-quiz src/telemetry, src/services, src/app/settings.tsx (2026-11-01'de koddan doğrulandı).
# Lead onayı: 2026-11-01 (ADR-014). Bu sayfa değişirse App Privacy ve Data safety beyanları da güncellenir.
title: 'Gizlilik Politikası — Hoppala: Tuzak Quiz'
description: 'iOS ve Android için Hoppala gizlilik politikası: hesap yok; hangi verinin ne zaman işlendiği, reklamlar, saklama süreleri ve verilerinizi silme.'
updated: '2026-11-01'
---

Bu politika, iOS, iPadOS ve Android için **Hoppala: Tuzak Quiz** uygulamasının ("Hoppala",
"uygulama") bilgilerinizi nasıl ele aldığını açıklar. Uygulama **Ulaşcan Ertürk** ("biz")
tarafından geliştirilir ve yayımlanır; bu politika kapsamındaki kişisel verilerin sorumlusu
Ulaşcan Ertürk'tür.

## Özet

- Hoppala'da hesap veya üyelik yoktur; adınızı, e-posta adresinizi veya telefon numaranızı
  istemeyiz.
- Oyun ilerlemeniz ve ayarlarınız cihazınızda kalır. Gömülü kategoriler çevrimdışı oynanır.
- Yeni içerik indirilirken sunucumuz yalnızca standart teknik bilgileri (IP adresi gibi) alır.
- **Cevap analizi** isteğe bağlıdır ve varsayılan olarak kapalıdır. **Meydan Okuma** ayrı bir
  onay ister.
- Reklam gösterilen sürümlerde reklamlar **Google AdMob** tarafından sunulur. Kişiselleştirilmiş
  reklam, gereken yerlerde izninize bağlıdır.
- Kişisel verilerinizi satmayız. Sunucudaki verilerinizi uygulamanın içinden silebilirsiniz.

Bazı özellikler (cevap analizi, Meydan Okuma, reklamlar) uygulamanın her sürümünde açık
olmayabilir. Aşağıdaki bölümler, her özelliğin yalnızca **açık olduğu ve kullandığınız** durumda
hangi verileri işlediğini anlatır.

## Cihazınızda saklanan bilgiler

Hoppala şunları **yalnızca cihazınızda** saklar:

- oyun ilerlemesi, skorlar, en iyi skorlar ve günlük meydan okuma kaydı;
- ayarlar: ses efektleri, titreşim ve dil;
- indirilen içerik bölümlerinin önbelleği;
- cevap analizi ve reklam izin tercihleriniz;
- oluşturulduysa, sunucunun verdiği kurulum kimliği ve erişim anahtarı (işletim sisteminin
  güvenli deposunda: iOS Anahtar Zinciri, Android Keystore destekli depolama).

İlerlemeniz bir hesaba bağlı olmadığı için cihazlar arasında taşınmaz ve sunucuda yedeklenmez.
**Ayarlar → İlerlemeyi sıfırla** ile ilerlemenizi silebilir veya uygulamayı kaldırarak cihazdaki
tüm verileri silebilirsiniz.

## Sunucumuza gönderilen bilgiler

### İçerik indirme

Uygulama yeni kategori ve bölümleri içerik sunucumuzdan indirir. Bu isteklerde kimlik bilgisi
veya cihaz kimliği gönderilmez; yalnızca uygulama sürümü ve uyumluluk bilgisi gönderilir. Her
istekte olduğu gibi sunucumuz IP adresinizi, isteğin zamanını, istenen adresi ve tarayıcı/uygulama
bilgisini (user agent) erişim kayıtlarına yazar.

### Kurulum kimliği

Cevap analizini açarsanız veya Meydan Okuma'yı kullanırsanız sunucumuz, bu kuruluma özgü rastgele
bir kimlik ve 90 gün geçerli bir erişim anahtarı üretir. Bu kimlik adınıza, e-posta adresinize,
telefon numaranıza veya reklam kimliğinize bağlı değildir; yalnızca aynı kurulumdan gelen
istekleri tanımak için kullanılır.

### Cevap analizi (isteğe bağlı, varsayılan olarak kapalı)

**Ayarlar → Cevap analizi**'ni açarsanız şunlar gönderilir: oynadığınız kategori ve mod, sorular,
seçtiğiniz seçenek, sonuç (geçti/kaldı ve nedeni), geçen süre, sınırlı bir etkileşim özeti (basma,
bırakma ve dokunma sayıları, basılı tutma süresi), oturum skoru, uygulama sürümü, dil ve platform
(iOS/Android). Bu veriler soruların zorluğunu ve oyun dengesini iyileştirmek için kullanılır.
Kapattığınızda yeni toplama durur ve gönderilmemiş kayıtlar cihazdan temizlenir.

### Meydan Okuma (açık olduğu sürümlerde, ayrı onayla)

Meydan Okuma'yı kullanmak için kurallarını ayrıca kabul edersiniz. Bu durumda sunucumuz şunları
saklar: **sistemin ürettiği** takma ad (siz metin yazmazsınız; yalnızca yeni bir ad
isteyebilirsiniz), maç sonuçları, puanlar ve skorun doğrulanması için dokunuş kanıtı. Takma adınız
ve skorunuz rakibinize ve liderlik tablosunda diğer oyunculara gösterilir. Canlı maçlar için
uygulama sunucumuzla şifreli bir anlık bağlantı kurar.

## Reklamlar (Google AdMob)

Reklam gösterilen sürümlerde reklamlar Google'ın reklam hizmeti **Google AdMob** tarafından
sunulur. Oyun sırasında reklam gösterilmez. Reklam gösterebilmek için Google şunları işleyebilir:
reklam kimliği (iOS'ta IDFA, Android'de reklam kimliği), IP adresinden çıkarılan yaklaşık konum,
reklam gösterim ve tıklama bilgileri ve tanılama verileri. Bu veriler Google'a doğrudan uygulama
içindeki Google yazılımı tarafından gönderilir ve
[Google'ın gizlilik politikasına](https://policies.google.com/privacy) tabidir; ayrıntılar için
bkz. [Google'ın iş ortağı sitelerindeki verileri nasıl kullandığı](https://policies.google.com/technologies/partner-sites).

- **AB, Birleşik Krallık ve İsviçre:** kişiselleştirilmiş reklam için Google'ın izin formuyla
  izninizi isteriz. İzin vermezseniz yalnızca kişiselleştirilmemiş reklamlar gösterilir.
- **ABD eyaletleri:** eyalet gizlilik yasalarının tanıdığı haklarınızı reklam gizlilik
  seçeneklerinden kullanabilirsiniz.
- **Türkiye:** Türkiye'deki cihazlarda yalnızca kişiselleştirilmemiş reklam istenir.
- **iOS:** reklam kimliğine erişmeden önce Apple'ın Uygulama İzleme Şeffaflığı (ATT) izni istenir.
  İzin vermezseniz reklam kimliğiniz kullanılmaz. Bu izni istediğiniz zaman **iOS Ayarlar →
  Gizlilik ve Güvenlik → İzleme** bölümünden değiştirebilirsiniz.
- **Android:** reklam kimliğinizi **Android Ayarlar → Gizlilik → Reklamlar** bölümünden
  sıfırlayabilir veya silebilirsiniz (menü adı cihaza göre değişebilir).
- Reklamlar 13 yaş ve üzeri için uygun içerikle sınırlandırılır; flört ve kumar gibi hassas
  kategoriler engellenir.

İzin tercihinizi uygulamada **Ayarlar → Reklam gizlilik seçenekleri** ile değiştirebilirsiniz
(bu seçenek, bölgenizde gerekli olduğunda görünür).

## İzinler ve cihaz özellikleri

- Hoppala mikrofon, kamera, konum, kişiler veya fotoğraflar için izin istemez.
- **Titreşim:** dokunsal geri bildirim içindir; Ayarlar'dan kapatılabilir.
- **İnternet:** içerik indirmek ve (açık olduğunda) cevap analizi, Meydan Okuma ve reklamlar için
  kullanılır.
- **İzleme izni (yalnızca iOS, reklamlı sürümlerde):** yukarıdaki Reklamlar bölümüne bakın.

## Verileri işleme amaçları ve hukuki sebepler

6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve AB Genel Veri Koruma Tüzüğü (GDPR)
kapsamında verilerinizi şu amaçlar ve hukuki sebeplerle işleriz:

- **İçerik sunma, hizmetin güvenliği ve kötüye kullanımın önlenmesi** (erişim kayıtları, kurulum
  kimliği): hizmetin sunulması için zorunlu olması ve meşru menfaatimiz; erişim kayıtları için
  ayrıca 5651 sayılı Kanun'dan doğan hukuki yükümlülük.
- **Cevap analizi ve Meydan Okuma:** açık rızanız. Rızanızı istediğiniz zaman Ayarlar'dan geri
  alabilirsiniz; bu, geri almadan önceki işlemeyi etkilemez.
- **Kişiselleştirilmiş reklam:** gereken bölgelerde açık rızanız; kişiselleştirilmemiş reklam
  için meşru menfaatimiz (uygulamanın ücretsiz sunulması).

## Saklama süreleri

- **Sunucu erişim kayıtları** (IP adresi, zaman, istenen adres, user agent): 2 yıl.
- **Uygulama hata kayıtları** (IP adresi ve istek içeriği yazılmaz): 2 yıl.
- **Cevap analizi:** ham olaylar 30 gün, kurulumla ilişkilendirilebilir kayıtlar 90 gün; kimlik
  içermeyen toplu istatistikler 12 ay.
- **Meydan Okuma profili, maçlar ve puanlar:** 90 gün.
- **Kurulum kimliği:** siz silene kadar; erişim anahtarı 90 gün geçerlidir.
- **Silme kaydı:** silme isteğinin tamamlandığını doğrulamak ve silinen verilerin yedekten geri
  gelmesini önlemek için silinen kuruluma ait bir silme kaydı 90 gün tutulur.
- **Yedekler:** silinen veriler sunucu yedeklerinde en fazla 35 gün daha kalabilir.

Süre sonunda veriler silinir veya anonim hâle getirilir. Google'ın reklam verileri için Google'ın
saklama süreleri geçerlidir.

## Paylaşım ve yurt dışına aktarım

Kişisel verilerinizi satmayız ve reklam amacıyla kendimiz paylaşmayız. Veriler yalnızca şu
taraflarca işlenir:

- **Barındırma hizmeti:** sunucumuz Microsoft Azure altyapısında çalışır; Microsoft verileri
  yalnızca bizim adımıza barındırır.
- **Google (AdMob):** reklam gösterilen sürümlerde, yukarıdaki Reklamlar bölümünde anlatılan
  veriler.
- **Apple ve Google:** uygulamayı App Store ve Google Play üzerinden dağıtırlar; bu mağazaların
  topladığı veriler (ör. indirme ve çökme istatistikleri) onların politikalarına tabidir.
- **Yetkili kurumlar:** yalnızca yasal bir yükümlülük gerektirdiğinde.

Barındırma ve reklam hizmet sağlayıcılarının sunucuları Türkiye dışında bulunabilir. Yurt dışına
aktarım, KVKK ve GDPR'ın öngördüğü güvencelere ve gereken hâllerde açık rızanıza dayanır.

## Veri silme

- **Sunucudaki veriler:** **Ayarlar → Sunucu verilerimi sil** sunucudaki cevap analizi
  verilerinizin, Meydan Okuma profilinizin, maç katılımınızın ve liderlik puanlarınızın
  silinmesini ister ve kurulum kimliğini geçersiz kılar. Durumu aynı ekrandan takip edebilirsiniz.
  Cihazdaki ilerleme ve ayarlar korunur.
- **Cihazdaki veriler:** **Ayarlar → İlerlemeyi sıfırla** ile ilerlemenizi silebilir veya
  uygulamayı kaldırabilirsiniz.
- **E-posta ile:** uygulamaya erişemiyorsanız aşağıdaki **İletişim** bölümündeki adrese yazın.
  Adınızı bilmediğimiz için, verilerinizi bulabilmemiz amacıyla sizden yalnızca istek için gerekli
  bilgileri (ör. Meydan Okuma takma adınız) isteyebiliriz.

Hoppala'da hesap olmadığı için ayrıca silinecek bir hesap yoktur.

## Haklarınız

KVKK'nın 11. maddesi ve GDPR kapsamında verilerinizin işlenip işlenmediğini öğrenme, bilgi
isteme, düzeltme, silme, işlemeye itiraz etme, rızayı geri alma ve (uygulanabildiği ölçüde)
taşınabilirlik haklarına sahipsiniz. Taleplerinizi aşağıdaki **İletişim** bölümündeki adrese
iletebilirsiniz; en geç 30 gün içinde yanıtlarız. Ayrıca Kişisel Verileri Koruma Kurulu'na veya
bulunduğunuz ülkedeki veri koruma otoritesine şikâyette bulunabilirsiniz.

## Çocuklar

Hoppala 13 yaş ve üzeri için tasarlanmıştır; 13 yaşından küçük çocuklara yönelik değildir ve
onlardan bilerek veri toplamaz. 13 yaşından küçük bir çocuğun veri paylaştığını düşünüyorsanız
bize yazın; verileri sileriz.

## Güvenlik

Uygulama ile sunucularımız arasındaki tüm bağlantılar HTTPS ile şifrelenir. Erişim anahtarı
cihazın güvenli deposunda tutulur; sunucudaki verilere yalnızca yetkili kişiler erişebilir.
Hiçbir saklama veya aktarım yöntemi kusursuz değildir. Güvenlik açığı bildirmek için
[Güvenlik sayfasına](/projeler/hoppala/guvenlik/) bakın.

## Bu web sitesi

Bu sayfa, GitHub Pages üzerinde barındırılan kişisel web sitemizde yayımlanır. Site çerez,
analitik veya izleme kullanmaz; yalnızca seçtiğiniz açık / koyu tema tercihi tarayıcınızın yerel
deposunda hatırlanır ve hiçbir yere gönderilmez. GitHub, siteyi sunmak için IP adresi gibi teknik
verileri işleyebilir; bkz.
[GitHub Gizlilik Bildirimi](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).

## Politikadaki değişiklikler

Uygulamanın bilgileri ele alış biçimi değişirse (ör. yeni bir özellik açıldığında), değişiklik
yayımlanmadan önce bu sayfayı ve yürürlük tarihini güncelleriz.
