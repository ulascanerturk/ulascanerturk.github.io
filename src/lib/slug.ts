// Turkish letters that do not decompose into an ASCII base letter + combining mark.
const TURKISH_MAP: Record<string, string> = {
  ı: 'i',
  İ: 'i',
  ğ: 'g',
  Ğ: 'g',
  ş: 's',
  Ş: 's',
  ç: 'c',
  Ç: 'c',
  ö: 'o',
  Ö: 'o',
  ü: 'u',
  Ü: 'u',
};

/**
 * Converts text into a URL slug: ASCII, lowercase, words joined by single hyphens.
 * Turkish letters are mapped explicitly; other accents (e.g. "zekâ") are stripped.
 */
export function slugify(input: string): string {
  return input
    .replace(/[ıİğĞşŞçÇöÖüÜ]/g, (char) => TURKISH_MAP[char] ?? char)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
