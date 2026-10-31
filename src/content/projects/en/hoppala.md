---
# kaynak: ulascanerturk.md §6 "Hoppala"; English translation of ../hoppala.md.
# Language-neutral fields (kind, status, featured, order, period) must match the Turkish entry.
# Translation approved by the lead on 2026-11-01.
title: 'Hoppala — Trick Quiz Game'
summary: 'A category-based reflex and trivia game whose instructions try to trick you; iOS and Android, no account needed. In development.'
kind: product
status: active
role: 'Design and development (personal project)'
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
cover: ../../../assets/projects/hoppala-en.png
coverAlt: 'Hoppala logo: a winking red button takes the place of the letter "o"; below it the slogan "Read. Think. Then press."'
featured: true
order: 2
disclaimer: 'The app’s source code is not public.'
---

## Problem

The idea of a mobile game for short breaks that tests both attention and knowledge — one that
measures whether you really read the instruction, not just how fast you tap.

## Solution

Hoppala is a trick reflex and trivia game that gives you an instruction, a rule and a short time
limit in every level. The instructions try to fool you ("DON'T PRESS!" → "…just kidding, PRESS");
you have to press, not press, hold or pick the right option at the right moment.

- Six categories: Button Trap, Word Trap, General Knowledge, Quick Math, Color Trap and Memory
- Campaign, Endless and Daily modes
- No account or e-mail needed; the built-in categories can be played offline
- New levels can be published from the admin panel without an app update
- Turkish and English interface

## Technologies

I build the mobile app with Expo, React Native and TypeScript. The content API runs on Laravel and
PostgreSQL; for content and release management I built an admin panel with React and Vite. The
infrastructure for 1v1 Challenge and a leaderboard is also ready; it is turned off in the first
release. The revenue model is in-app advertising with Google AdMob.

## My Role

I design and develop the game design, the mobile app, the API, the admin panel and the store
preparation as a personal project.

## Status

In development; the App Store and Google Play release is in preparation. Because the app is not
yet in the stores, no store link is given.
