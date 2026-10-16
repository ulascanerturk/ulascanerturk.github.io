// Structural tests for the profile data (faz-2 §3). The data lives in
// src/data/profile.ts; the tests sit in src/lib with the other unit tests.
import { describe, expect, it } from 'vitest';

import { profile, profilePage } from '@/data/profile';

/** Every string value in a nested object, with its path for readable failures. */
function collectStrings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value))
    return value.flatMap((item, i) => collectStrings(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      collectStrings(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

const strings = [
  ...collectStrings(profile, 'profile'),
  ...collectStrings(profilePage, 'profilePage'),
];

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
// Ten or more digits separated only by phone-style punctuation.
const PHONE = /(?:\+?\d[\s().-]*){10,}/;

describe('profile data', () => {
  it('has no empty or whitespace-only text', () => {
    const empty = strings.filter(([, text]) => text.trim() === '').map(([path]) => path);
    expect(empty).toEqual([]);
  });

  it('has no empty lists', () => {
    expect(profile.summary.length).toBeGreaterThan(0);
    expect(profile.skills.every((group) => group.items.length > 0)).toBe(true);
    expect(profile.experience.every((item) => item.highlights.length > 0)).toBe(true);
    expect(profile.workAreas.items.length).toBeGreaterThan(0);
    expect(profile.ecosystem.programs.length).toBeGreaterThan(0);
    expect(profile.focusAreas).toHaveLength(7);
  });

  it('uses https for every link', () => {
    const urls = [
      ...profile.links.map((link) => link.url),
      ...profile.experience.flatMap((item) => (item.url ? [item.url] : [])),
    ];
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });

  it('contains no e-mail address or phone number', () => {
    const hits = strings
      .filter(([, text]) => EMAIL.test(text) || PHONE.test(text) || /(mailto|tel|sms):/.test(text))
      .map(([path]) => path);
    expect(hits).toEqual([]);
  });

  it('links GitHub and LinkedIn (S2)', () => {
    const kinds = profile.links.map((link) => link.kind);
    expect(kinds).toContain('github');
    expect(kinds).toContain('linkedin');
    for (const action of profilePage.hero.actions) expect(kinds).toContain(action.kind);
  });

  it('keeps International Relations as the only degree (ulascanerturk.md §3)', () => {
    const degrees = profile.education.filter((item) => item.kind === 'degree');
    expect(degrees).toHaveLength(1);
    expect(degrees[0]?.program).toContain('Uluslararası İlişkiler');
  });

  it('keeps ecosystem programs in the Shifter context (ulascanerturk.md §7)', () => {
    expect(profile.ecosystem.context).toContain('Shifter');
    expect(profile.ecosystem.note).toContain('Shifter');
  });

  it('mentions the start year in the hero and summary', () => {
    expect(profile.tagline).toContain(String(profile.since));
    expect(profile.summary[0]).toContain(String(profile.since));
  });

  it('uses unique ASCII section anchors, including the nav anchor #hakkimda', () => {
    const ids = [
      profilePage.about,
      profilePage.skills,
      profilePage.experience,
      profilePage.education,
      profilePage.ecosystem,
      profilePage.focusAreas,
      profilePage.links,
    ].map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(ids).toContain('hakkimda');
  });

  it('keeps the meta description within 160 characters', () => {
    expect(profilePage.description.length).toBeLessThanOrEqual(160);
  });

  it('stores lastUpdated as an ISO date', () => {
    expect(profile.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
