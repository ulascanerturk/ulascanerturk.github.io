import { describe, expect, it } from 'vitest';

import {
  absoluteUrl,
  findForbiddenKeys,
  pageTitle,
  personId,
  profilePageJsonLd,
  projectJsonLd,
  serializeJsonLd,
  type PersonInput,
} from './seo';

const home = 'https://example.github.io/';

const person: PersonInput = {
  name: 'Ada Lovelace',
  url: home,
  jobTitle: 'Yazılım Geliştirici',
  description: 'Kısa tanıtım.',
  knowsAbout: ['Ürün mühendisliği'],
  sameAs: ['https://github.com/example'],
};

describe('absoluteUrl', () => {
  it('resolves a path against the site URL', () => {
    expect(absoluteUrl('/projeler/', 'https://example.github.io')).toBe(
      'https://example.github.io/projeler/',
    );
  });

  it('keeps absolute URLs', () => {
    expect(absoluteUrl('https://other.example/a.png', home)).toBe('https://other.example/a.png');
  });
});

describe('pageTitle', () => {
  it('appends the site name', () => {
    expect(pageTitle('Projeler', 'Ada', ' · ')).toBe('Projeler · Ada');
  });

  it('is only the site name without a page title', () => {
    expect(pageTitle(undefined, 'Ada', ' · ')).toBe('Ada');
  });
});

describe('profilePageJsonLd', () => {
  const data = profilePageJsonLd({
    url: home,
    name: 'Ada Lovelace',
    inLanguage: 'tr',
    dateModified: '2026-10-17',
    person,
  });

  it('is a ProfilePage with the Person as main entity', () => {
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('ProfilePage');
    expect(data.mainEntity).toMatchObject({
      '@type': 'Person',
      '@id': personId(home),
      name: 'Ada Lovelace',
      jobTitle: 'Yazılım Geliştirici',
      sameAs: ['https://github.com/example'],
    });
  });

  it('contains no personal contact fields', () => {
    expect(findForbiddenKeys(data)).toEqual([]);
  });
});

describe('projectJsonLd', () => {
  const base = {
    name: 'Lockbox',
    description: 'Özet.',
    url: `${home}projeler/lockbox/`,
    inLanguage: 'tr',
    keywords: ['Expo', 'TypeScript'],
    author: { name: 'Ada Lovelace', url: home },
  };

  it('is a CreativeWork linked to the same Person node', () => {
    const data = projectJsonLd({ ...base, startYear: 2026 });
    expect(data['@type']).toBe('CreativeWork');
    expect(data.keywords).toBe('Expo, TypeScript');
    expect(data.dateCreated).toBe('2026');
    expect(data.author).toMatchObject({ '@type': 'Person', '@id': personId(home) });
    expect(findForbiddenKeys(data)).toEqual([]);
  });

  it('omits dateCreated without a start year', () => {
    expect(projectJsonLd(base)).not.toHaveProperty('dateCreated');
  });
});

describe('findForbiddenKeys', () => {
  it('finds personal fields at any depth', () => {
    expect(
      findForbiddenKeys({ a: [{ email: 'x' }], b: { c: { telephone: '1', address: {} } } }),
    ).toEqual(['email', 'telephone', 'address']);
  });
});

describe('serializeJsonLd', () => {
  it('escapes "<" so the text cannot close the script tag', () => {
    const json = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(json).not.toContain('<');
    expect(JSON.parse(json)).toEqual({ name: '</script><script>alert(1)</script>' });
  });
});
