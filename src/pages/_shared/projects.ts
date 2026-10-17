// Page helpers for the project collection (faz-6 §2.1 tasks 3–4). The `_` prefix keeps
// this folder out of routing; it belongs to the page layer, so it may query
// `astro:content` and `astro:assets` and hands plain props to the layouts.
import { getImage } from 'astro:assets';
import { getCollection, type CollectionEntry } from 'astro:content';

import { projectsPage } from '@/data/projects';
import { projectDocLinks } from '@/pages/_shared/projectDocs';
import { site } from '@/data/site';
import {
  LOCALE_META,
  projectPath,
  routePath,
  splitEntryId,
  translationProblems,
  type Locale,
} from '@/lib/i18n';
import { adjacentProjects, formatPeriod, isPublished, sortProjects } from '@/lib/projects';
import { absoluteUrl, projectJsonLd } from '@/lib/seo';

export type ProjectEntry = CollectionEntry<'projects'>;

/** A published entry of one locale with its URL. */
export interface LocalizedProject {
  slug: string;
  href: string;
  entry: ProjectEntry;
}

/**
 * Published projects of a locale, sorted. Fails the build when a published project
 * has no translation or its language-neutral fields differ between the languages.
 */
export async function loadProjects(locale: Locale): Promise<LocalizedProject[]> {
  const entries = await getCollection('projects', ({ data }) =>
    isPublished(data, import.meta.env.PROD),
  );
  const problems = translationProblems(entries);
  if (problems.length > 0) {
    throw new Error(`Incomplete project translations:\n- ${problems.join('\n- ')}`);
  }
  return sortProjects(entries.filter((entry) => splitEntryId(entry.id).locale === locale)).map(
    (entry) => {
      const { slug } = splitEntryId(entry.id);
      return { slug, href: projectPath(slug, locale), entry };
    },
  );
}

/** Plain card data for the list and the home page. */
export function projectSummaries(projects: LocalizedProject[]) {
  return projects.map(({ href, entry: { data } }) => ({
    href,
    data: {
      title: data.title,
      summary: data.summary,
      status: data.status,
      kind: data.kind,
      tech: data.tech,
    },
  }));
}

/** `getStaticPaths` result for a locale's project detail route. */
export async function projectPaths(locale: Locale) {
  const projects = (await loadProjects(locale)).map((project) => ({
    ...project,
    id: project.slug,
  }));
  return projects.map((project) => {
    const { previous, next } = adjacentProjects(projects, project.id);
    return { params: { slug: project.slug }, props: { project, previous, next } };
  });
}

export interface ProjectPageProps {
  project: LocalizedProject;
  previous?: LocalizedProject;
  next?: LocalizedProject;
}

/** Every ProjectLayout prop except the rendered Markdown. */
export async function projectLayoutProps(
  { project, previous, next }: ProjectPageProps,
  locale: Locale,
  siteUrl: URL | string,
) {
  const { data } = project.entry;
  const { meta, statusLabels, ongoing } = projectsPage[locale];

  const pagerLink = (item?: LocalizedProject) =>
    item && { title: item.entry.data.title, href: item.href };

  const jsonLd = projectJsonLd({
    name: data.title,
    description: data.summary,
    url: absoluteUrl(project.href, siteUrl),
    inLanguage: LOCALE_META[locale].lang,
    keywords: data.tech,
    startYear: data.period?.start,
    // The person is the same in every language: its node id is always the root home page.
    author: { name: site.name, url: absoluteUrl(routePath('home', 'tr'), siteUrl) },
  });

  const cover = data.cover && data.coverAlt ? { src: data.cover, alt: data.coverAlt } : undefined;
  const shareImage =
    cover &&
    (await getImage({ src: cover.src, width: Math.min(1200, cover.src.width), format: 'jpeg' }));
  const ogImage = shareImage && {
    src: shareImage.src,
    width: Number(shareImage.attributes.width),
    height: Number(shareImage.attributes.height),
    alt: cover.alt,
  };

  const metaItems = [
    { term: meta.role, value: data.role },
    ...(data.period ? [{ term: meta.period, value: formatPeriod(data.period, ongoing) }] : []),
    { term: meta.status, value: statusLabels[data.status] },
  ];

  return {
    locale,
    title: data.title,
    summary: data.summary,
    meta: metaItems,
    tech: data.tech,
    cover,
    disclaimer: data.disclaimer,
    links: data.links ?? [],
    docs: await projectDocLinks(project.slug, locale),
    previous: pagerLink(previous),
    next: pagerLink(next),
    ogImage,
    jsonLd,
  };
}
