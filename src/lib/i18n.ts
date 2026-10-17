// Locales and localized routes (faz-6 §2.1, ADR-006). Pure TypeScript: pages,
// layouts, astro.config.mjs (sitemap alternates) and tests share one route map.
// Turkish is the default locale and keeps its unprefixed URLs; English lives under /en/.

export const LOCALES = ['tr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'tr';

export interface LocaleMeta {
  /** `<html lang>` and `hreflang`. */
  lang: string;
  /** Open Graph locale. */
  ogLocale: string;
  /** Locale for `Intl` date formatting. */
  dateLocale: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  tr: { lang: 'tr', ogLocale: 'tr_TR', dateLocale: 'tr-TR' },
  en: { lang: 'en', ogLocale: 'en_US', dateLocale: 'en-US' },
};

/** Localized path segments; every value starts and ends with `/`. */
const ROUTES = {
  home: { tr: '/', en: '/en/' },
  projects: { tr: '/projeler/', en: '/en/projects/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

export function isLocale(value: unknown): value is Locale {
  return (LOCALES as readonly unknown[]).includes(value);
}

export function routePath(route: RouteKey, locale: Locale): string {
  return ROUTES[route][locale];
}

export function projectPath(slug: string, locale: Locale): string {
  return `${ROUTES.projects[locale]}${slug}/`;
}

/** Locale of a URL path: `/en/` and everything below it is English. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en/' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LOCALE;
}

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Same page in another locale, or `undefined` when the path is not a localized
 * route (e.g. `/404.html`). Only the shape is mapped — callers decide whether the
 * target exists.
 */
export function translatePath(pathname: string, target: Locale): string | undefined {
  const source = localeFromPath(pathname);
  if (pathname === ROUTES.home[source]) return ROUTES.home[target];
  const projects = ROUTES.projects[source];
  if (!pathname.startsWith(projects)) return undefined;
  const rest = pathname.slice(projects.length);
  if (rest === '') return ROUTES.projects[target];
  const slug = rest.endsWith('/') ? rest.slice(0, -1) : undefined;
  return slug !== undefined && SLUG.test(slug) ? projectPath(slug, target) : undefined;
}

/** Every locale's version of a localized path (empty for other paths). */
export function alternatePaths(pathname: string): { locale: Locale; path: string }[] {
  const paths = LOCALES.map((locale) => ({ locale, path: translatePath(pathname, locale) }));
  return paths.every((item) => item.path !== undefined)
    ? paths.map(({ locale, path }) => ({ locale, path: path as string }))
    : [];
}

/**
 * Locale and slug of a project entry id: `lockbox-mobile` (Turkish, collection root)
 * or `en/lockbox-mobile` (English, `src/content/projects/en/`).
 */
export function splitEntryId(id: string): { locale: Locale; slug: string } {
  const [first, ...rest] = id.split('/');
  if (rest.length === 1 && first !== DEFAULT_LOCALE && isLocale(first)) {
    return { locale: first, slug: rest[0] as string };
  }
  if (rest.length === 0 && first) return { locale: DEFAULT_LOCALE, slug: first };
  throw new Error(`Unexpected project entry id "${id}" (expected "{slug}" or "{locale}/{slug}")`);
}

/** Fields that must be identical in every translation of a project. */
export const TRANSLATION_INVARIANT_FIELDS = [
  'kind',
  'status',
  'featured',
  'order',
  'period',
] as const;

interface TranslatableEntry {
  id: string;
  data: Partial<Record<(typeof TRANSLATION_INVARIANT_FIELDS)[number], unknown>>;
}

/**
 * Checks that every published entry exists in every locale and that the language-neutral
 * fields match. Returns a list of problems (empty = complete); pages throw on any problem
 * so a missing translation fails the build.
 */
export function translationProblems(entries: readonly TranslatableEntry[]): string[] {
  const bySlug = new Map<string, Map<Locale, TranslatableEntry>>();
  for (const entry of entries) {
    const { locale, slug } = splitEntryId(entry.id);
    const versions = bySlug.get(slug) ?? new Map<Locale, TranslatableEntry>();
    versions.set(locale, entry);
    bySlug.set(slug, versions);
  }

  const problems: string[] = [];
  for (const [slug, versions] of bySlug) {
    for (const locale of LOCALES) {
      if (!versions.has(locale)) problems.push(`project "${slug}" has no ${locale} version`);
    }
    const reference = versions.get(DEFAULT_LOCALE);
    if (!reference) continue;
    for (const [locale, entry] of versions) {
      for (const field of TRANSLATION_INVARIANT_FIELDS) {
        if (JSON.stringify(entry.data[field]) !== JSON.stringify(reference.data[field])) {
          problems.push(
            `project "${slug}" (${locale}): ${field} differs from the ${DEFAULT_LOCALE} version`,
          );
        }
      }
    }
  }
  return problems;
}
