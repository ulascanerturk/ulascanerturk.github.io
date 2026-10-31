---
# kaynak: ulascanerturk.md §6 "Hoppala"; tuzak-root docs/pazarlama/urun-ozeti.md ve
# docs/yayina-hazirlik.md (kamuya uygun kısımlar). Lead onayı: 2026-11-01
# (yayın durumu: geliştirme aşamasında; mağaza ve depo bağlantısı yok).
title: 'Hoppala — Tuzak Quiz Oyunu'
summary: 'Yönergelerin oyuncuyu kandırmaya çalıştığı, kategori tabanlı refleks ve bilgi oyunu; iOS ve Android, üyelik yok. Geliştirme aşamasında.'
kind: product
status: active
role: 'Tasarım ve geliştirme (bireysel proje)'
period:
  start: 2026
tech:
  - Expo
  - React Native
  - TypeScript
  - Laravel
  - PostgreSQL
  - React
  - Vite
cover: ../../assets/projects/hoppala.png
coverAlt: 'Hoppala logosu: göz kırpan kırmızı bir buton "o" harfinin yerinde; altında "Oku. Düşün. Sonra bas." sloganı.'
featured: true
order: 2
disclaimer: 'Uygulamanın kaynak kodu kamuya açık değildir.'
---

## Problem

Kısa molalarda oynanabilen, hem dikkati hem bilgiyi sınayan; ilk soruda değil, yönergeyi gerçekten
okuyup okumadığınızı ölçen bir mobil oyun fikri.

## Çözüm

Hoppala, her bölümde bir yönerge, bir kural ve kısa bir süre veren şaşırtmacalı bir refleks ve
bilgi oyunu. Yönergeler oyuncuyu kandırmaya çalışır ("BASMA!" → "…şaka, BAS"); oyuncu doğru anda
basmalı, basmamalı, basılı tutmalı ya da doğru seçeneği seçmelidir.

- Altı kategori: Buton Tuzağı, Kelime Tuzağı, Genel Kültür, Hızlı Matematik, Renk Tuzağı ve Hafıza
- Kampanya, Sonsuz ve Günlük modlar
- Üyelik ve e-posta gerekmez; gömülü kategoriler çevrimdışı oynanır
- Yeni bölümler uygulama güncellemesi gerektirmeden yönetim panelinden yayımlanabilir
- Türkçe ve İngilizce arayüz

## Teknolojiler

Mobil uygulamayı Expo, React Native ve TypeScript ile geliştiriyorum. İçerik API'si Laravel ve
PostgreSQL üzerinde çalışıyor; içerik ve yayın yönetimi için React ve Vite ile bir yönetim paneli
geliştirdim. 1v1 Meydan Okuma ve liderlik tablosu altyapısı da hazır; ilk sürümde kapalı. Gelir
modeli Google AdMob ile uygulama içi reklam.

## Rolüm

Oyun tasarımını, mobil uygulamayı, API'yi, yönetim panelini ve mağaza hazırlığını bireysel bir
proje olarak tasarlayıp geliştiriyorum.

## Durum

Geliştirme aşamasında; App Store ve Google Play yayını hazırlanıyor. Uygulama henüz mağazalarda yer
almadığı için mağaza bağlantısı verilmedi.
