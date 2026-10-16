// SEO helpers (faz-4 §2 tasks 1 and 3): page titles, absolute URLs and JSON-LD.
// Pure TypeScript — pages collect the data, Seo.astro renders it.
//
// JSON-LD carries public professional information only (Değişmez Kural 1):
// never e-mail, telephone, address, birth date or other personal fields.

export type JsonLd = Record<string, unknown>;

/** Personal fields that must never appear in structured data (checked by tests and check:dist). */
export const FORBIDDEN_JSON_LD_KEYS: readonly string[] = [
  'email',
  'telephone',
  'faxNumber',
  'address',
  'homeLocation',
  'birthDate',
  'birthPlace',
  'gender',
  'nationality',
  'taxID',
  'vatID',
  'spouse',
  'parent',
  'children',
  'sibling',
  'relatedTo',
];

export function absoluteUrl(path: string, site: string | URL): string {
  return new URL(path, site).href;
}

/** "{title} · {siteName}", or just the site name when the page has no own title (home). */
export function pageTitle(title: string | undefined, siteName: string, separator: string): string {
  return title ? `${title}${separator}${siteName}` : siteName;
}

/** Stable node id for the site owner, shared by the profile and the project pages. */
export function personId(homeUrl: string): string {
  return `${homeUrl}#person`;
}

export interface PersonInput {
  name: string;
  /** Absolute home page URL. */
  url: string;
  jobTitle: string;
  description: string;
  knowsAbout: string[];
  /** Public profile URLs (GitHub, LinkedIn). */
  sameAs: string[];
}

export function personJsonLd(person: PersonInput): JsonLd {
  return {
    '@type': 'Person',
    '@id': personId(person.url),
    name: person.name,
    url: person.url,
    jobTitle: person.jobTitle,
    description: person.description,
    knowsAbout: person.knowsAbout,
    sameAs: person.sameAs,
  };
}

export interface ProfilePageInput {
  url: string;
  name: string;
  inLanguage: string;
  /** ISO date (YYYY-MM-DD). */
  dateModified: string;
  person: PersonInput;
}

/** Home page: schema.org ProfilePage whose main entity is the Person. */
export function profilePageJsonLd(page: ProfilePageInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': page.url,
    url: page.url,
    name: page.name,
    inLanguage: page.inLanguage,
    dateModified: page.dateModified,
    mainEntity: personJsonLd(page.person),
  };
}

export interface ProjectInput {
  name: string;
  description: string;
  url: string;
  inLanguage: string;
  keywords: string[];
  /** Start year from the entry's `period`, when known. */
  startYear?: number;
  author: { name: string; url: string };
}

/**
 * Project page: a generic CreativeWork with verifiable fields only. (SoftwareApplication
 * would expect offers/ratings, which the projects do not have.)
 */
export function projectJsonLd(project: ProjectInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': project.url,
    url: project.url,
    name: project.name,
    description: project.description,
    inLanguage: project.inLanguage,
    keywords: project.keywords.join(', '),
    ...(project.startYear === undefined ? {} : { dateCreated: String(project.startYear) }),
    author: {
      '@type': 'Person',
      '@id': personId(project.author.url),
      name: project.author.name,
      url: project.author.url,
    },
  };
}

/** Lists every forbidden key found anywhere in the value (deep). */
export function findForbiddenKeys(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(findForbiddenKeys);
  if (value === null || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => [
    ...(FORBIDDEN_JSON_LD_KEYS.includes(key) ? [key] : []),
    ...findForbiddenKeys(child),
  ]);
}

/** JSON for a `<script type="application/ld+json">` body; `<` is escaped so text cannot close the tag. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
