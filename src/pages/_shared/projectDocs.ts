// Page helpers for the project documents (ADR-014): privacy policy, support and security pages
// below a project page. Page layer (`_` keeps it out of routing), so it may query `astro:content`.
import { getCollection, type CollectionEntry } from 'astro:content';

import { projectContacts, projectDocsText } from '@/data/projectDocs';
import {
  LOCALES,
  LOCALE_META,
  PROJECT_DOCS,
  PROJECT_DOC_KEYS,
  docTranslationProblems,
  projectDocPath,
  splitDocEntryId,
  type Locale,
  type ProjectDocKey,
} from '@/lib/i18n';
import { loadProjects } from '@/pages/_shared/projects';

export type ProjectDocEntry = CollectionEntry<'projectDocs'>;

interface LocalizedDoc {
  slug: string;
  doc: ProjectDocKey;
  entry: ProjectDocEntry;
}

/**
 * Documents of a locale. Fails the build when a document lacks a translation, its dates differ
 * between the languages, its project is not published or the project has no contact entry.
 */
async function loadProjectDocs(locale: Locale): Promise<LocalizedDoc[]> {
  const [entries, projects] = await Promise.all([
    getCollection('projectDocs'),
    loadProjects(locale),
  ]);
  const problems = docTranslationProblems(
    entries,
    projects.map(({ slug }) => slug),
  );
  for (const slug of new Set(entries.map(({ id }) => splitDocEntryId(id).slug))) {
    if (!projectContacts[slug]) problems.push(`project "${slug}" has documents but no contact`);
  }
  if (problems.length > 0) {
    throw new Error(`Incomplete project documents:\n- ${problems.join('\n- ')}`);
  }
  return entries
    .map((entry) => ({ ...splitDocEntryId(entry.id), entry }))
    .filter((item) => item.locale === locale)
    .map(({ slug, doc, entry }) => ({ slug, doc, entry }));
}

/** Document links for a project page, in `PROJECT_DOC_KEYS` order (empty when it has none). */
export async function projectDocLinks(slug: string, locale: Locale) {
  const docs = (await loadProjectDocs(locale)).filter((item) => item.slug === slug);
  return PROJECT_DOC_KEYS.filter((key) => docs.some(({ doc }) => doc === key)).map((key) => ({
    label: projectDocsText[locale].labels[key],
    href: projectDocPath(slug, key, locale),
  }));
}

/** `getStaticPaths` result for a locale's `[slug]/[doc]` route. */
export async function projectDocPaths(locale: Locale) {
  const [docs, projects] = await Promise.all([loadProjectDocs(locale), loadProjects(locale)]);
  return docs.map(({ slug, doc, entry }) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) throw new Error(`Document "${entry.id}" has no ${locale} project`);
    return {
      params: { slug, doc: PROJECT_DOCS[doc][locale] },
      props: { slug, doc, entry, project: { title: project.entry.data.title, href: project.href } },
    };
  });
}

export interface ProjectDocPageProps {
  slug: string;
  doc: ProjectDocKey;
  entry: ProjectDocEntry;
  project: { title: string; href: string };
}

/** Every ProjectDocLayout prop except the rendered Markdown. */
export function projectDocLayoutProps(
  { slug, doc, entry, project }: ProjectDocPageProps,
  locale: Locale,
) {
  const other = LOCALES.find((candidate) => candidate !== locale) ?? locale;
  return {
    locale,
    title: entry.data.title,
    description: entry.data.description,
    updated: entry.data.updated,
    project,
    contact: projectContacts[slug] as (typeof projectContacts)[string],
    otherLanguage: { href: projectDocPath(slug, doc, other), lang: LOCALE_META[other].lang },
  };
}
