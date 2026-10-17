---
# Source: lockbox-mobile docs/yayin/ortak-hazirlik.md §2 (checked against the app on 2026-10-17).
# Lead approval: 2026-10-17 (ADR-014). Update the app's store privacy answers together with this page.
title: 'Privacy Policy — Lockbox - Password Vault'
description: 'Privacy policy of the Lockbox - Password Vault app for iOS and Android: no data is collected, transmitted or shared; your vault stays encrypted on your device.'
updated: '2026-10-18'
---

This policy describes how the **Lockbox - Password Vault** app ("Lockbox", "the app") for iOS,
iPadOS and Android handles your information. The app is developed and published by
**Ulaşcan Ertürk** ("we").

## Summary

**Lockbox does not collect, transmit, sell or share any personal data.** We have no servers, no
accounts and no analytics. Everything you store in Lockbox stays on your device, encrypted. We
cannot see, access, recover or delete your data.

## Information stored on your device

Lockbox stores the following **only on your device**:

- **Your vault:** the service names, passwords, password history (the last 5 passwords of an
  entry), creation dates, password rules and app settings you create. The vault is encrypted with
  XChaCha20-Poly1305. The key is derived from your six-digit PIN or optional master password (Argon2id),
  combined with a random secret that never leaves this device.
- **Security keys and preferences:** a random device secret; if you turn on biometric unlock, the
  vault key, protected by your device's biometrics; and non-secret preferences (biometric unlock
  on/off, auto-lock time, the wrong-attempt counter and backup reminder state). These are kept in
  the operating system's secure storage (iOS Keychain; Android Keystore-backed storage).

**Your PIN or master password is never stored**, on the device or anywhere else, and cannot be
recovered. If you forget the unlock secret you chose, your data cannot be recovered.

## Network access, analytics and advertising

- Lockbox works fully offline. The Android app does not request the Internet permission, and the
  app does not send any data over a network.
- There are no analytics, crash-reporting, advertising or tracking tools, and no third-party SDKs
  that collect data.
- The app does not download code or updates by itself; updates come only from the App Store or
  Google Play.
- The only link that leaves the app is **Settings → About → Privacy Policy**. It opens this page in
  your web browser, and only when you tap it.

## Permissions and device features

- **Face ID / Touch ID / fingerprint (optional):** used only to unlock your vault. Biometric
  matching is performed by the operating system; Lockbox never receives your face or fingerprint
  data, only whether the check succeeded.
- **Screen protection (Android):** the secure-window flag prevents app content from appearing in
  screenshots or recordings. On iOS, the system screenshot notice can warn you after a capture.
  Lockbox does not record or send captured content.
- **Vibration:** used for haptic feedback.

## Clipboard

When you copy a password, it is placed on the device clipboard and cleared after the time you
choose in Settings (30 seconds by default; you can also turn clearing off). On iOS the copied
password is marked local-only, so it is not shared with your other devices through Universal
Clipboard. On Android 13 and later it is marked as sensitive, so it is hidden in the clipboard
preview. Other apps that you allow to read the clipboard may be able to read it until it is
cleared.

## Backups and exports

- The vault is excluded from iCloud / iTunes backups, Android cloud backup and device-to-device
  transfer.
- You can create an encrypted backup file (`.lockbox`) protected by a backup password you choose.
  The file is shared only where you send it (for example Files, AirDrop, e-mail or a cloud drive)
  using the system share sheet. From then on, that file is also subject to the privacy practices of
  the destination you chose. Without the backup password, the file cannot be read.

## Device integrity check

To warn you, Lockbox checks on the device whether the device appears to be jailbroken or rooted.
The result is shown only to you and is never transmitted.

## Retention and deletion

Your data stays on your device until you delete it. You can:

- delete individual entries in the app;
- erase the entire vault with **Settings → Security → Reset vault**;
- optionally turn on **Erase vault after 10 wrong attempts**;
- uninstall the app, which removes the encrypted vault file. On iOS, a few secure-storage items
  (such as the device secret) can remain in the Keychain after uninstalling; they cannot open
  anything without the vault file and are erased automatically if you install Lockbox again.

Because we do not hold any of your data, we cannot access, export, correct or delete it for you.
The steps above give you full control.

## Children

Lockbox is not directed at children and does not collect data from anyone, including children.

## Security

Lockbox is designed so that only someone with your chosen PIN or master password (or your enrolled biometrics, if you
turned that on) can open your vault on your device. No method of storage is perfectly secure. Choose a
PIN that is hard to guess or a strong master password, keep your device's operating system up to
date and keep encrypted backups. To report a security issue, see the
[Security page](/en/projects/lockbox-mobile/security/).

## Legal basis (GDPR / KVKK)

Because Lockbox does not collect or process personal data on our side, no data is processed by us
under the EU General Data Protection Regulation or the Turkish Personal Data Protection Law
No. 6698 (KVKK).

## This website

This page is published on our personal website, hosted by GitHub Pages. The website uses no
cookies, analytics or tracking; only the light / dark theme you choose is remembered in your
browser's local storage and never sent anywhere. GitHub may process technical data such as IP
addresses to deliver the site; see the
[GitHub Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement).

## Changes to this policy

If the app's handling of information changes, we will update this page and its effective date
before the new version is released.
