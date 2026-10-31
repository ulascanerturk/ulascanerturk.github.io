---
# Kaynak: tuzak-root docs/yayina-hazirlik.md §1.5, §5; tuzak-quiz src/services/api.ts ve
# src/telemetry/runtime.ts (2026-11-01). Lead onayı: 2026-11-01 (ADR-014).
title: 'Güvenlik Politikası — Hoppala: Tuzak Quiz'
description: 'Hoppala: Tuzak Quiz uygulamasındaki veya içerik sunucusundaki bir güvenlik açığını gizli olarak bildirme yolu ve bildirimlerin nasıl ele alındığı.'
updated: '2026-11-01'
---

## Güvenlik açığı bildirme

Güvenlik açıklarını aşağıdaki **İletişim** bölümündeki e-posta adresine **"SECURITY"** konusuyla,
gizli olarak bildirin. Lütfen şunları ekleyin:

- uygulama sürümü ve platform (iOS / Android);
- cihaz modeliniz ve işletim sistemi sürümü;
- açığın etkisi ve sorunu yeniden oluşturma adımları.

Açığı, düzeltme yayımlanana kadar herkese açık olarak paylaşmayın.

## Kapsam

- iOS ve Android için Hoppala uygulaması;
- uygulamanın kullandığı içerik ve oyun sunucusu.

Test ederken hizmeti yavaşlatacak veya durduracak denemeler (yük testi, hizmet dışı bırakma)
yapmayın; başka oyuncuların verilerine erişmeyin, bunları değiştirmeyin veya silmeyin. Bir açığı
doğrulamak için gerekenden fazla veriye eriştiyseniz bunu bildiriminizde belirtin.

## Bildirimler nasıl ele alınır

- Bildirimleri 7 gün içinde yanıtlarız.
- 90 gün içinde düzeltme yayımlamayı hedefler, açıklamayı sizinle birlikte planlarız (90 günlük
  sorumlu açıklama).
- Sunucu tarafındaki düzeltmeler hemen uygulanır; uygulama düzeltmeleri App Store ve Google Play
  üzerinden (mümkünse hızlandırılmış incelemeyle) yayımlanır.

## Desteklenen sürümler

Güvenlik düzeltmeleri yalnızca App Store ve Google Play'de yayımlanan son sürüme gelir.

## Güvenlik modeli

- Hoppala'da hesap ve parola yoktur; uygulama ad, e-posta veya telefon numarası istemez.
- Uygulama ile sunucu arasındaki tüm bağlantılar HTTPS ile şifrelenir. İçerik istekleri kimlik
  bilgisi ve çerez taşımaz.
- Cevap analizi veya Meydan Okuma kullanıldığında sunucu, kuruluma özgü rastgele bir kimlik ve
  süreli bir erişim anahtarı üretir. Anahtar cihazın güvenli deposunda (iOS Anahtar Zinciri,
  Android Keystore destekli depolama) tutulur.
- Meydan Okuma'nın açık olduğu sürümlerde takma adları sunucu üretir; oyuncular serbest metin
  giremez. Skorlar sunucuda doğrulanır.

Hangi verilerin işlendiği [Gizlilik Politikası](/projeler/hoppala/gizlilik/)'nda anlatılır.
