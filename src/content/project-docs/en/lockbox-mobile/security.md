---
# Source: lockbox-mobile docs/yayin/ortak-hazirlik.md §4 and SECURITY.md. Lead approval: 2026-10-17 (ADR-014).
title: 'Security Policy — Lockbox - Password Vault'
description: 'How to report a security vulnerability in the Lockbox - Password Vault app privately, what to include and how reports are handled and disclosed.'
updated: '2026-10-17'
---

## Reporting a vulnerability

Report vulnerabilities privately to the e-mail address in the **Contact** section below, with the
subject **"SECURITY"**. Please include:

- the app version (**Settings → About**);
- your device model and operating system version;
- the steps to reproduce the issue.

**Do not include real passwords or vault files.**

## How reports are handled

- We acknowledge reports within 7 days.
- We aim to ship a fix within 90 days and coordinate disclosure with you (90-day responsible
  disclosure).
- Critical issues are fixed first and released through the App Store and Google Play (expedited
  review where possible).

## Supported versions

Only the latest version published on the App Store and Google Play receives security fixes.

## Security model

The vault is encrypted on the device with XChaCha20-Poly1305; the key is derived from the chosen
six-digit PIN or optional master password with Argon2id and bound to the device. The app has no server, no account and no network
access. Details of what is stored on the device are in the
[Privacy Policy](/en/projects/lockbox-mobile/privacy/).
