import { describe, expect, it } from 'vitest';

import {
  alternatePaths,
  docTranslationProblems,
  localeFromPath,
  PROJECT_DOC_KEYS,
  projectDocPath,
  projectPath,
  routePath,
  splitDocEntryId,
  splitEntryId,
  translatePath,
  translationProblems,
} from './i18n';

describe('routes', () => {
  it('keeps Turkish URLs unprefixed and puts English under /en/', () => {
    expect(routePath('home', 'tr')).toBe('/');
    expect(routePath('home', 'en')).toBe('/en/');
    expect(routePath('projects', 'tr')).toBe('/projeler/');
    expect(routePath('projects', 'en')).toBe('/en/projects/');
    expect(projectPath('lockbox-mobile', 'tr')).toBe('/projeler/lockbox-mobile/');
    expect(projectPath('lockbox-mobile', 'en')).toBe('/en/projects/lockbox-mobile/');
  });

  it('puts project documents below the project page with localized segments (ADR-014)', () => {
    expect(PROJECT_DOC_KEYS).toEqual(['privacy', 'support', 'security']);
    expect(projectDocPath('lockbox-mobile', 'privacy', 'tr')).toBe(
      '/projeler/lockbox-mobile/gizlilik/',
    );
    expect(projectDocPath('lockbox-mobile', 'privacy', 'en')).toBe(
      '/en/projects/lockbox-mobile/privacy/',
    );
    expect(projectDocPath('lockbox-mobile', 'support', 'tr')).toBe(
      '/projeler/lockbox-mobile/destek/',
    );
    expect(projectDocPath('lockbox-mobile', 'security', 'tr')).toBe(
      '/projeler/lockbox-mobile/guvenlik/',
    );
  });

  it('detects the locale from the path', () => {
    expect(localeFromPath('/')).toBe('tr');
    expect(localeFromPath('/projeler/')).toBe('tr');
    expect(localeFromPath('/en/')).toBe('en');
    expect(localeFromPath('/en/projects/x/')).toBe('en');
    expect(localeFromPath('/english/')).toBe('tr');
  });
});

describe('translatePath', () => {
  it('maps every localized route both ways', () => {
    const pairs = [
      ['/', '/en/'],
      ['/projeler/', '/en/projects/'],
      ['/projeler/lockbox-mobile/', '/en/projects/lockbox-mobile/'],
      ['/projeler/lockbox-mobile/gizlilik/', '/en/projects/lockbox-mobile/privacy/'],
      ['/projeler/lockbox-mobile/destek/', '/en/projects/lockbox-mobile/support/'],
      ['/projeler/lockbox-mobile/guvenlik/', '/en/projects/lockbox-mobile/security/'],
    ] as const;
    for (const [tr, en] of pairs) {
      expect(translatePath(tr, 'en')).toBe(en);
      expect(translatePath(en, 'tr')).toBe(tr);
      expect(translatePath(tr, 'tr')).toBe(tr);
      expect(translatePath(en, 'en')).toBe(en);
    }
  });

  it('returns undefined for paths that are not localized routes', () => {
    for (const path of [
      '/404.html',
      '/projeler/a/b/',
      '/projeler/x',
      '/en/projeler/',
      '/og/',
      '/projeler/lockbox-mobile/privacy/',
      '/en/projects/lockbox-mobile/gizlilik/',
      '/projeler/lockbox-mobile/gizlilik',
      '/projeler/lockbox-mobile/gizlilik/x/',
      '/projeler/Lockbox/gizlilik/',
    ]) {
      expect(translatePath(path, 'en')).toBeUndefined();
    }
  });

  it('lists alternates only for localized routes', () => {
    expect(alternatePaths('/projeler/')).toEqual([
      { locale: 'tr', path: '/projeler/' },
      { locale: 'en', path: '/en/projects/' },
    ]);
    expect(alternatePaths('/404.html')).toEqual([]);
  });
});

describe('project entries', () => {
  it('splits entry ids into locale and slug', () => {
    expect(splitEntryId('lockbox-mobile')).toEqual({ locale: 'tr', slug: 'lockbox-mobile' });
    expect(splitEntryId('en/lockbox-mobile')).toEqual({ locale: 'en', slug: 'lockbox-mobile' });
    expect(() => splitEntryId('tr/lockbox-mobile')).toThrow();
    expect(() => splitEntryId('de/lockbox-mobile')).toThrow();
    expect(() => splitEntryId('en/a/b')).toThrow();
  });

  const data = {
    kind: 'product',
    status: 'active',
    featured: true,
    order: 1,
    period: { start: 2026 },
  };

  it('accepts complete, consistent translations', () => {
    expect(
      translationProblems([
        { id: 'a', data },
        { id: 'en/a', data: { ...data, period: { start: 2026 } } },
      ]),
    ).toEqual([]);
  });

  it('reports missing translations in either direction', () => {
    expect(
      translationProblems([
        { id: 'a', data },
        { id: 'en/b', data },
      ]),
    ).toEqual(['project "a" has no en version', 'project "b" has no tr version']);
  });

  it('reports language-neutral fields that differ', () => {
    expect(
      translationProblems([
        { id: 'a', data },
        { id: 'en/a', data: { ...data, status: 'completed', order: undefined } },
      ]),
    ).toEqual([
      'project "a" (en): status differs from the tr version',
      'project "a" (en): order differs from the tr version',
    ]);
  });
});

describe('project documents', () => {
  it('splits document ids into locale, project slug and document', () => {
    expect(splitDocEntryId('lockbox-mobile/privacy')).toEqual({
      locale: 'tr',
      slug: 'lockbox-mobile',
      doc: 'privacy',
    });
    expect(splitDocEntryId('en/lockbox-mobile/security')).toEqual({
      locale: 'en',
      slug: 'lockbox-mobile',
      doc: 'security',
    });
    for (const id of [
      'tr/lockbox-mobile/privacy',
      'de/lockbox-mobile/privacy',
      'lockbox-mobile/gizlilik',
      'lockbox-mobile',
      'en/lockbox-mobile/privacy/x',
      'Lockbox/privacy',
    ]) {
      expect(() => splitDocEntryId(id)).toThrow();
    }
  });

  const updated = '2026-10-17';

  it('accepts complete translations with the same date', () => {
    expect(
      docTranslationProblems(
        [
          { id: 'a/privacy', data: { updated } },
          { id: 'en/a/privacy', data: { updated } },
        ],
        ['a'],
      ),
    ).toEqual([]);
  });

  it('reports missing translations, differing dates and unknown projects', () => {
    expect(
      docTranslationProblems(
        [
          { id: 'a/privacy', data: { updated } },
          { id: 'en/a/privacy', data: { updated: '2026-10-18' } },
          { id: 'a/support', data: { updated } },
          { id: 'en/b/security', data: { updated } },
        ],
        ['a'],
      ),
    ).toEqual([
      'document "a/privacy" (en): updated differs from the tr version',
      'document "a/support" has no en version',
      'document "b/security" has no published project',
      'document "b/security" has no tr version',
    ]);
  });
});
