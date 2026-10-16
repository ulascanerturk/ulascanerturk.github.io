---
# kaynak: ulascanerturk.md §6 "Lockbox"; lockbox-mobile/docs/00-genel-bakis.md (kamuya uygun kısımlar).
# Lead onayı: 2026-10-17 (yayın durumu: geliştirme aşamasında; mağaza ve depo bağlantısı yok).
title: 'Lockbox — Çevrimdışı Parola Kasası'
summary: 'Parolaları yalnızca cihazda, uçtan uca şifreli saklayan iOS ve Android uygulaması; sunucu, hesap ve telemetri yok. Geliştirme aşamasında.'
kind: product
status: active
role: 'Tasarım ve geliştirme (bireysel proje)'
period:
  start: 2026
tech:
  - Expo
  - React Native
  - TypeScript
  - Expo Router
  - Argon2id
  - iOS Keychain
  - Android Keystore
featured: true
order: 1
disclaimer: 'Güvenlik mimarisi burada yalnızca yüksek seviyede anlatılmıştır; uygulamanın kaynak kodu kamuya açık değildir.'
---

## Problem

Parolaları bir bulut hizmetine veya kullanıcı hesabına bağlanmadan, yalnızca kendi cihazında ve
güvenle saklama ihtiyacı.

## Çözüm

Lockbox; çevrimdışı çalışan, cihaza bağlı ve uçtan uca şifreli bir parola kasası. Sunucusu,
kullanıcı hesabı ya da telemetrisi yok; ağ isteği yapmıyor ve parolalar cihazdan hiçbir zaman
şifresiz çıkmıyor.

- Ayarlanabilir uzunluk ve karakter sınıflarıyla parola üretme, kaydetme ve kopyalama
- Ana parola ve isteğe bağlı Face ID / Touch ID / parmak izi ile kilit açma
- Arka plana geçişte ve hareketsizlikte otomatik kilit
- Kopyalanan parolanın panodan otomatik temizlenmesi
- Şifreli yedek dışa ve içe aktarma
- Açık ve koyu tema, Türkçe ve İngilizce arayüz; telefon ve tablet desteği

## Teknolojiler

Expo, React Native ve TypeScript ile geliştiriyorum; ekranlar Expo Router ile yapılandırılıyor.
Kasa, Argon2id ile ana paroladan türetilen anahtarlar ve AEAD şifrelemeyle korunuyor; cihaza bağlı
sır iOS Keychain ve Android Keystore'da tutuluyor.

## Rolüm

Ürün kapsamını, güvenlik mimarisini, arayüzü ve mağaza hazırlığını bireysel bir proje olarak
tasarlayıp geliştiriyorum.

## Durum

Geliştirme aşamasında; App Store ve Google Play yayını hazırlanıyor. Uygulama henüz mağazalarda yer
almadığı için mağaza bağlantısı verilmedi.
