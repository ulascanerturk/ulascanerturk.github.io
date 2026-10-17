// Structural tests for the profile data (faz-2 §3; both locales since faz-6 §3). The data
// lives in src/data/profile.{tr,en}.ts; the tests sit in src/lib with the other unit tests.
import { describe, expect, it } from 'vitest';

import { profiles } from '@/data/profile';
import { LOCALES } from '@/lib/i18n';

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

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
// Ten or more digits separated only by phone-style punctuation.
const PHONE = /(?:\+?\d[\s().-]*){10,}/;

/** Wording that must survive translation (ulascanerturk.md §3, §7; Değişmez Kural 2). */
const WORDING = {
  tr: { degree: 'Uluslararası İlişkiler', aboutId: 'hakkimda', projectsHref: '/projeler/' },
  en: { degree: 'International Relations', aboutId: 'about', projectsHref: '/en/projects/' },
} as const;

describe.each(LOCALES)('profile data (%s)', (locale) => {
  const { profile, page: profilePage } = profiles[locale];
  const wording = WORDING[locale];
  const strings = [
    ...collectStrings(profile, 'profile'),
    ...collectStrings(profilePage, 'profilePage'),
  ];

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

  it('links GitHub and LinkedIn (S2) and its own project list', () => {
    const kinds = profile.links.map((link) => link.kind);
    expect(kinds).toContain('github');
    expect(kinds).toContain('linkedin');
    for (const action of profilePage.hero.actions) {
      if ('kind' in action) expect(kinds).toContain(action.kind);
      else expect(action.href).toBe(wording.projectsHref);
    }
  });

  it('keeps International Relations as the only degree (ulascanerturk.md §3)', () => {
    const degrees = profile.education.filter((item) => item.kind === 'degree');
    expect(degrees).toHaveLength(1);
    expect(degrees[0]?.program).toContain(wording.degree);
    expect(profilePage.education.note).toContain(wording.degree);
  });

  it('keeps ecosystem programs in the Shifter context (ulascanerturk.md §7)', () => {
    expect(profile.ecosystem.context).toContain('Shifter');
    expect(profile.ecosystem.note).toContain('Shifter');
  });

  it('mentions the start year in the hero and summary', () => {
    expect(profile.tagline).toContain(String(profile.since));
    expect(profile.summary[0]).toContain(String(profile.since));
  });

  it('uses unique ASCII section anchors, including the nav anchor', () => {
    const ids = [
      profilePage.about,
      profilePage.skills,
      profilePage.experience,
      profilePage.projects,
      profilePage.education,
      profilePage.ecosystem,
      profilePage.focusAreas,
      profilePage.links,
    ].map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(profilePage.about.id).toBe(wording.aboutId);
  });

  it('keeps the meta description within 160 characters', () => {
    expect(profilePage.description.length).toBeLessThanOrEqual(160);
  });

  it('stores lastUpdated as an ISO date', () => {
    expect(profile.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

// A translation must not drop, add or reorder facts (faz-6 §2.1 task 2).
describe('translations', () => {
  const tr = profiles.tr.profile;
  const en = profiles.en.profile;

  it('share the language-neutral facts', () => {
    expect(en.name).toBe(tr.name);
    expect(en.since).toBe(tr.since);
    expect(en.lastUpdated).toBe(tr.lastUpdated);
    expect(en.links.map(({ url, kind }) => [url, kind])).toEqual(
      tr.links.map(({ url, kind }) => [url, kind]),
    );
    expect(en.experience.map(({ organization, url }) => [organization, url])).toEqual(
      tr.experience.map(({ organization, url }) => [organization, url]),
    );
    expect(en.education.map(({ kind }) => kind)).toEqual(tr.education.map(({ kind }) => kind));
  });

  it('have the same list shapes', () => {
    const shape = (profile: typeof tr) => ({
      summary: profile.summary.length,
      skills: profile.skills.map((group) => [group.items.length, group.note !== undefined]),
      experience: profile.experience.map((item) => [
        item.highlights.length,
        item.role !== undefined,
        item.note !== undefined,
        item.products?.map((product) => product.problems.length),
      ]),
      workAreas: profile.workAreas.items.length,
      programs: profile.ecosystem.programs.length,
      focusAreas: profile.focusAreas.length,
    });
    expect(shape(en)).toEqual(shape(tr));
    expect(profiles.en.page.hero.actions.map((action) => 'kind' in action && action.kind)).toEqual(
      profiles.tr.page.hero.actions.map((action) => 'kind' in action && action.kind),
    );
  });
});
