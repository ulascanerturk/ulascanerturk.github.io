// Project collection helpers (faz-3 §2 task 3). Pure TypeScript: the pages call
// `getCollection` and pass the entries in; the enums are shared with the schema
// in src/content.config.ts.

export const PROJECT_KINDS = ['product', 'open-source', 'client-work', 'focus-area'] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];

/** Also the status sort order: active projects come first. */
export const PROJECT_STATUSES = ['active', 'completed', 'archived'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface ProjectPeriod {
  start: number;
  end?: number;
}

interface SortableProject {
  data: { title: string; status: ProjectStatus; order?: number };
}

/** Sorts by `order` (lower first, missing last) → status → title (Turkish collation). */
export function sortProjects<T extends SortableProject>(projects: readonly T[]): T[] {
  return [...projects].sort(
    (a, b) =>
      (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
      PROJECT_STATUSES.indexOf(a.data.status) - PROJECT_STATUSES.indexOf(b.data.status) ||
      a.data.title.localeCompare(b.data.title, 'tr'),
  );
}

/** Drafts are visible in development and left out of production builds. */
export function isPublished(data: { draft?: boolean }, production: boolean): boolean {
  return !(production && data.draft === true);
}

/**
 * Formats a year range: `2019 – 2021`, `2020` (same year) or, without an end
 * year, `2019 – {ongoing}`. The ongoing text comes from src/data.
 */
export function formatPeriod({ start, end }: ProjectPeriod, ongoing: string): string {
  if (end === undefined) return `${start} – ${ongoing}`;
  return end === start ? String(start) : `${start} – ${end}`;
}

/** Previous and next entries around `id` in an already sorted list. */
export function adjacentProjects<T extends { id: string }>(
  sorted: readonly T[],
  id: string,
): { previous?: T; next?: T } {
  const index = sorted.findIndex((project) => project.id === id);
  if (index === -1) return {};
  return { previous: sorted[index - 1], next: sorted[index + 1] };
}

/** Groups entries by `kind` in PROJECT_KINDS order; empty groups are omitted. */
export function groupByKind<T extends { data: { kind: ProjectKind } }>(
  projects: readonly T[],
): { kind: ProjectKind; items: T[] }[] {
  return PROJECT_KINDS.map((kind) => ({
    kind,
    items: projects.filter((project) => project.data.kind === kind),
  })).filter((group) => group.items.length > 0);
}
