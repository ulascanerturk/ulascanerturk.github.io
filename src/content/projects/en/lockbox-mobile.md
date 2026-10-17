---
# kaynak: ulascanerturk.md §6 "Lockbox"; English translation of ../lockbox-mobile.md (faz-6 §2.1 task 3).
# Language-neutral fields (kind, status, featured, order, period) must match the Turkish entry.
# Translation approved by the lead on 2026-10-17.
title: 'Lockbox — Offline Password Vault'
summary: 'An iOS and Android app that keeps passwords only on the device, end-to-end encrypted; no server, no account, no telemetry. In development.'
kind: product
status: active
role: 'Design and development (personal project)'
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
disclaimer: 'The security architecture is described here only at a high level; the app’s source code is not public.'
---

## Problem

The need to store passwords securely on your own device only, without tying them to a cloud
service or a user account.

## Solution

Lockbox is an offline, device-bound, end-to-end encrypted password vault. It has no server, no
user account and no telemetry; it makes no network requests, and passwords never leave the device
unencrypted.

- Generating passwords with adjustable length and character classes, saving and copying them
- Unlocking with a master password and optional Face ID / Touch ID / fingerprint
- Automatic lock when the app goes to the background and after inactivity
- Automatic clearing of copied passwords from the clipboard
- Encrypted backup export and import
- Light and dark theme, Turkish and English interface; phone and tablet support

## Technologies

I build it with Expo, React Native and TypeScript; the screens are structured with Expo Router.
The vault is protected with keys derived from the master password with Argon2id and with AEAD
encryption; the device-bound secret is kept in the iOS Keychain and the Android Keystore.

## My Role

I design and develop the product scope, the security architecture, the interface and the store
preparation as a personal project.

## Status

In development; the App Store and Google Play release is in preparation. Because the app is not
yet in the stores, no store link is given.
