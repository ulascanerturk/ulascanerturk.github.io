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

/**
 * Project documents published below a project page (ADR-014): the store-required privacy
 * policy, support and security pages. The key is the language-neutral file name in
 * `src/content/project-docs/`; the values are the localized URL segments.
 */
export const PROJECT_DOCS = {
  privacy: { tr: 'gizlilik', en: 'privacy' },
  support: { tr: 'destek', en: 'support' },
  security: { tr: 'guvenlik', en: 'security' },
} as const satisfies Record<string, Record<Locale, string>>;

export type ProjectDocKey = keyof typeof PROJECT_DOCS;
export const PROJECT_DOC_KEYS = Object.keys(PROJECT_DOCS) as ProjectDocKey[];

export function isProjectDocKey(value: unknown): value is ProjectDocKey {
  return (PROJECT_DOC_KEYS as readonly unknown[]).includes(value);
}

export function projectDocPath(slug: string, doc: ProjectDocKey, locale: Locale): string {
  return `${projectPath(slug, locale)}${PROJECT_DOCS[doc][locale]}/`;
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
  if (!rest.endsWith('/')) return undefined;
  const [slug = '', segment, ...extra] = rest.slice(0, -1).split('/');
  if (!SLUG.test(slug) || extra.length > 0) return undefined;
  if (segment === undefined) return projectPath(slug, target);
  const doc = PROJECT_DOC_KEYS.find((key) => PROJECT_DOCS[key][source] === segment);
  return doc && projectDocPath(slug, doc, target);
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

/**
 * Locale, project slug and document of a project document entry id:
 * `lockbox-mobile/privacy` (Turkish) or `en/lockbox-mobile/privacy` (English,
 * `src/content/project-docs/en/`). The file name is the language-neutral document key.
 */
export function splitDocEntryId(id: string): { locale: Locale; slug: string; doc: ProjectDocKey } {
  const parts = id.split('/');
  const locale = parts.length === 3 ? parts[0] : DEFAULT_LOCALE;
  const [slug, doc] = parts.slice(-2);
  if (
    (parts.length === 2 || (parts.length === 3 && locale !== DEFAULT_LOCALE && isLocale(locale))) &&
    slug !== undefined &&
    SLUG.test(slug) &&
    isProjectDocKey(doc)
  ) {
    return { locale: locale as Locale, slug, doc };
  }
  throw new Error(
    `Unexpected project document id "${id}" (expected "{slug}/{doc}" or "{locale}/{slug}/{doc}", doc ∈ ${PROJECT_DOC_KEYS.join(', ')})`,
  );
}

interface TranslatableDoc {
  id: string;
  data: { updated: string };
}

/**
 * Checks that every project document exists in every locale with the same `updated` date
 * (a policy change must reach both languages) and belongs to a known project. Pages throw on
 * any problem, so an incomplete translation fails the build.
 */
export function docTranslationProblems(
  docs: readonly TranslatableDoc[],
  projectSlugs: readonly string[],
): string[] {
  const byKey = new Map<string, Map<Locale, TranslatableDoc>>();
  for (const entry of docs) {
    const { locale, slug, doc } = splitDocEntryId(entry.id);
    const key = `${slug}/${doc}`;
    const versions = byKey.get(key) ?? new Map<Locale, TranslatableDoc>();
    versions.set(locale, entry);
    byKey.set(key, versions);
  }

  const problems: string[] = [];
  for (const [key, versions] of byKey) {
    const slug = key.split('/')[0] as string;
    if (!projectSlugs.includes(slug)) problems.push(`document "${key}" has no published project`);
    for (const locale of LOCALES) {
      if (!versions.has(locale)) problems.push(`document "${key}" has no ${locale} version`);
    }
    const reference = versions.get(DEFAULT_LOCALE);
    if (!reference) continue;
    for (const [locale, entry] of versions) {
      if (entry.data.updated !== reference.data.updated) {
        problems.push(
          `document "${key}" (${locale}): updated differs from the ${DEFAULT_LOCALE} version`,
        );
      }
    }
  }
  return problems;
}
