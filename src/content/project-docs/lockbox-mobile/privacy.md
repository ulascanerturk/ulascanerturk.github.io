---
# Kaynak: lockbox-mobile docs/yayin/ortak-hazirlik.md §2 (2026-10-17'de uygulamayla karşılaştırıldı).
# Lead onayı: 2026-10-17 (ADR-014). Bu sayfa değişirse mağaza gizlilik beyanları da güncellenir.
title: 'Gizlilik Politikası — Lockbox - Password Vault'
description: 'iOS ve Android için Lockbox - Password Vault gizlilik politikası: hiçbir veri toplanmaz, iletilmez veya paylaşılmaz; kasanız cihazınızda şifreli kalır.'
updated: '2026-10-17'
---

Bu politika, iOS, iPadOS ve Android için **Lockbox - Password Vault** uygulamasının ("Lockbox",
"uygulama") bilgilerinizi nasıl ele aldığını açıklar. Uygulama **Ulaşcan Ertürk** ("biz")
tarafından geliştirilir ve yayımlanır.

## Özet

**Lockbox hiçbir kişisel veri toplamaz, iletmez, satmaz veya paylaşmaz.** Sunucumuz, hesap
sistemimiz ve analitik aracımız yoktur. Lockbox'a kaydettiğiniz her şey şifreli olarak yalnızca
cihazınızda kalır. Verilerinizi göremeyiz, erişemeyiz, kurtaramayız veya silemeyiz.

## Cihazınızda saklanan bilgiler

Lockbox şunları **yalnızca cihazınızda** saklar:

- **Kasanız:** oluşturduğunuz servis adları, parolalar, parola geçmişi (bir kaydın son 5 parolası),
  oluşturulma tarihleri, parola kuralları ve uygulama ayarları. Kasa XChaCha20-Poly1305 ile
  şifrelenir. Anahtar, ana parolanızdan (Argon2id) ve bu cihazdan hiç çıkmayan rastgele bir sırdan
  türetilir.
- **Güvenlik anahtarları ve tercihler:** rastgele bir cihaz sırrı; biyometrik kilit açmayı
  etkinleştirirseniz cihazınızın biyometrisiyle korunan kasa anahtarı; gizli olmayan tercihler
  (biyometrik kilit açma açık/kapalı, otomatik kilit süresi, yanlış deneme sayacı ve yedek
  hatırlatıcısı durumu). Bunlar işletim sisteminin güvenli deposunda tutulur (iOS Anahtar Zinciri;
  Android Keystore destekli depolama).

**Ana parolanız hiçbir yerde saklanmaz** ve kurtarılamaz. Unutursanız verileriniz kurtarılamaz.

## Ağ erişimi, analitik ve reklam

- Lockbox tamamen çevrimdışı çalışır. Android uygulaması İnternet izni istemez; uygulama ağ
  üzerinden hiçbir veri göndermez.
- Analitik, hata raporlama, reklam veya izleme aracı ve veri toplayan üçüncü taraf SDK bulunmaz.
- Uygulama kendi kendine kod veya güncelleme indirmez; güncellemeler yalnızca App Store veya Google
  Play üzerinden gelir.
- Uygulamadan dışarı açılan tek bağlantı **Ayarlar → Hakkında → Gizlilik Politikası**'dır. Yalnızca
  dokunduğunuzda bu sayfayı web tarayıcınızda açar.

## İzinler ve cihaz özellikleri

- **Face ID / Touch ID / parmak izi (isteğe bağlı):** yalnızca kasanın kilidini açmak için
  kullanılır. Biyometrik eşleştirmeyi işletim sistemi yapar; Lockbox yüz veya parmak izi verinizi
  hiçbir zaman almaz, yalnızca doğrulamanın başarılı olup olmadığını öğrenir.
- **Ekran görüntüsü algılama (Android 14 ve üzeri):** ekran görüntüsü alındığında sizi uyarmak
  içindir. iOS'ta aynı uyarı için sistemin ekran görüntüsü bildirimi kullanılır. Hiçbir şey
  kaydedilmez veya gönderilmez.
- **Titreşim:** dokunsal geri bildirim için kullanılır.

## Pano

Bir parolayı kopyaladığınızda parola cihaz panosuna alınır ve Ayarlar'da seçtiğiniz süre sonunda
(varsayılan 30 saniye; temizlemeyi kapatabilirsiniz) temizlenir. iOS'ta kopyalanan parola yalnızca
bu cihaza ait olarak işaretlenir, bu yüzden Evrensel Pano ile diğer cihazlarınıza aktarılmaz.
Android 13 ve üzerinde hassas olarak işaretlenir ve pano önizlemesinde gizlenir. Panoyu okumasına
izin verdiğiniz diğer uygulamalar, temizlenene kadar parolayı okuyabilir.

## Yedekler ve dışa aktarma

- Kasa iCloud / iTunes yedeklerinden, Android bulut yedeğinden ve cihazdan cihaza aktarımdan hariç
  tutulur.
- Seçtiğiniz bir yedek parolasıyla korunan şifreli bir yedek dosyası (`.lockbox`)
  oluşturabilirsiniz. Dosya, sistem paylaşım ekranıyla yalnızca sizin gönderdiğiniz yere (ör.
  Dosyalar, AirDrop, e-posta, bulut sürücü) gider. Bundan sonra dosya, seçtiğiniz hedefin gizlilik
  uygulamalarına da tabidir. Yedek parolası olmadan dosya okunamaz.

## Cihaz bütünlüğü kontrolü

Lockbox, sizi uyarmak için cihazın jailbreak veya root yapılmış görünüp görünmediğini cihaz
üzerinde kontrol eder. Sonuç yalnızca size gösterilir, hiçbir yere iletilmez.

## Saklama ve silme

Verileriniz siz silene kadar cihazınızda kalır. Şunları yapabilirsiniz:

- uygulamada tek tek kayıtları silmek;
- **Ayarlar → Güvenlik → Kasayı sıfırla** ile tüm kasayı silmek;
- isteğe bağlı olarak **10 yanlış denemede kasayı sil** seçeneğini açmak;
- uygulamayı kaldırmak; bu, şifreli kasa dosyasını siler. iOS'ta bazı güvenli depolama öğeleri
  (ör. cihaz sırrı) kaldırma sonrasında Anahtar Zinciri'nde kalabilir; kasa dosyası olmadan hiçbir
  şeyi açamazlar ve Lockbox yeniden kurulduğunda otomatik olarak silinirler.

Verilerinizin hiçbirini tutmadığımız için onlara erişemez, dışa aktaramaz, düzeltemez veya sizin
adınıza silemeyiz. Yukarıdaki adımlar kontrolü tamamen size bırakır.

## Çocuklar

Lockbox çocuklara yönelik değildir ve çocuklar dahil kimseden veri toplamaz.

## Güvenlik

Lockbox, kasanızı cihazınızda yalnızca ana parolanızı bilen (veya etkinleştirdiyseniz kayıtlı
biyometrinize sahip) kişinin açabileceği şekilde tasarlanmıştır. Hiçbir saklama yöntemi kusursuz
değildir. Güçlü bir ana parola seçin, cihazınızın işletim sistemini güncel tutun ve şifreli yedek
alın. Güvenlik açığı bildirmek için [Güvenlik sayfasına](/projeler/lockbox-mobile/guvenlik/)
bakın.

## Hukuki dayanak (GDPR / KVKK)

Lockbox bizim tarafımızda kişisel veri toplamadığı veya işlemediği için AB Genel Veri Koruma
Tüzüğü ve 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında tarafımızca işlenen bir kişisel
veri yoktur.

## Bu web sitesi

Bu sayfa, GitHub Pages üzerinde barındırılan kişisel web sitemizde yayımlanır. Site çerez,
analitik veya izleme kullanmaz; yalnızca seçtiğiniz açık / koyu tema tercihi tarayıcınızın yerel
deposunda hatırlanır ve hiçbir yere gönderilmez. GitHub, siteyi sunmak için IP adresi gibi teknik
verileri işleyebilir; bkz.
[GitHub Gizlilik Bildirimi](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).

## Politikadaki değişiklikler

Uygulamanın bilgileri ele alış biçimi değişirse, yeni sürüm yayımlanmadan önce bu sayfayı ve
yürürlük tarihini güncelleriz.
