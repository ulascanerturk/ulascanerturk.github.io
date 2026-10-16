import { describe, expect, it } from 'vitest';

import { slugify } from './slug';

describe('slugify', () => {
  it('lowercases and joins words with hyphens', () => {
    expect(slugify('Shifter Pro')).toBe('shifter-pro');
  });

  it('maps Turkish letters to ASCII', () => {
    expect(slugify('Çalışma Alanları')).toBe('calisma-alanlari');
    expect(slugify('İŞ GÜCÜ')).toBe('is-gucu');
    expect(slugify('Öğrenimler ve Şüpheler')).toBe('ogrenimler-ve-supheler');
  });

  it('strips other accents', () => {
    expect(slugify('Yapay zekâ')).toBe('yapay-zeka');
  });

  it('collapses whitespace and special characters into single hyphens', () => {
    expect(slugify('  LockBox — Mobile!  (v2) ')).toBe('lockbox-mobile-v2');
    expect(slugify('a__b..c')).toBe('a-b-c');
  });

  it('returns an empty string when nothing slug-worthy remains', () => {
    expect(slugify('')).toBe('');
    expect(slugify(' — ! ')).toBe('');
  });
});
