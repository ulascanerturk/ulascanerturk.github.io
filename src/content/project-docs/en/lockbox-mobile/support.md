---
# Source: lockbox-mobile docs/yayin/ortak-hazirlik.md §3. Lead approval: 2026-10-17 (ADR-014).
title: 'Support — Lockbox - Password Vault'
description: 'Support for the Lockbox - Password Vault app: how to contact the developer and answers to common questions about backups, biometrics and deleting data.'
updated: '2026-10-17'
---

For questions, feedback or feature requests, write to the e-mail address in the **Contact**
section below. We usually reply within a few days.

**Please never send your passwords, master password or backup files.**

## Frequently asked questions

### I forgot my master password. Can you reset it?

No. Your master password is never stored anywhere, so nobody, including us, can recover it or your
data. If you have a `.lockbox` backup and remember its backup password, you can reset the vault
and restore that backup.

### Does Lockbox sync between devices?

No. Lockbox is offline by design. To move your vault, create an encrypted backup
(**Settings → Backup**) and restore it on the other device.

### Is my vault included in iCloud or Google backups?

No. It is excluded on purpose. Create your own encrypted backups regularly.

### Face ID or fingerprint unlock stopped working.

If you add or remove a face or fingerprint in the device settings, Lockbox turns biometric unlock
off for safety. Unlock with your master password and turn it on again in Settings.

### How do I delete all my data?

Use **Settings → Security → Reset vault**, or uninstall the app. See the
[Privacy Policy](/en/projects/lockbox-mobile/privacy/).

### I found a security issue.

Please follow the [security reporting process](/en/projects/lockbox-mobile/security/).
