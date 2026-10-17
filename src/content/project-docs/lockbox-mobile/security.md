---
# Kaynak: lockbox-mobile docs/yayin/ortak-hazirlik.md §4 ve SECURITY.md. Lead onayı: 2026-10-17 (ADR-014).
title: 'Güvenlik Politikası — Lockbox - Password Vault'
description: 'Lockbox - Password Vault uygulamasındaki bir güvenlik açığını gizli olarak bildirme yolu, bildirime eklenecekler ve bildirimlerin nasıl ele alındığı.'
updated: '2026-10-17'
---

## Güvenlik açığı bildirme

Güvenlik açıklarını aşağıdaki **İletişim** bölümündeki e-posta adresine **"SECURITY"** konusuyla,
gizli olarak bildirin. Lütfen şunları ekleyin:

- uygulama sürümü (**Ayarlar → Hakkında**);
- cihaz modeliniz ve işletim sistemi sürümü;
- sorunu yeniden oluşturma adımları.

**Gerçek parolalarınızı veya kasa dosyalarınızı eklemeyin.**

## Bildirimler nasıl ele alınır

- Bildirimleri 7 gün içinde yanıtlarız.
- 90 gün içinde düzeltme yayımlamayı hedefler, açıklamayı sizinle birlikte planlarız (90 günlük
  sorumlu açıklama).
- Kritik sorunlar önceliklidir ve App Store ile Google Play üzerinden (mümkünse hızlandırılmış
  incelemeyle) yayımlanır.

## Desteklenen sürümler

Güvenlik düzeltmeleri yalnızca App Store ve Google Play'de yayımlanan son sürüme gelir.

## Güvenlik modeli

Kasa cihazda XChaCha20-Poly1305 ile şifrelenir; anahtar ana paroladan Argon2id ile türetilir ve
cihaza bağlıdır. Uygulamanın sunucusu, hesap sistemi ve ağ erişimi yoktur. Cihazda nelerin
saklandığı [Gizlilik Politikası](/projeler/lockbox-mobile/gizlilik/)'nda anlatılır.
