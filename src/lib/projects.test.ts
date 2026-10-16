import { describe, expect, it } from 'vitest';

import {
  adjacentProjects,
  formatPeriod,
  groupByKind,
  isPublished,
  sortProjects,
  type ProjectKind,
  type ProjectStatus,
} from './projects';

function entry(
  id: string,
  data: { title?: string; status?: ProjectStatus; order?: number; kind?: ProjectKind } = {},
) {
  return {
    id,
    data: { title: id, status: 'active' as ProjectStatus, kind: 'product' as ProjectKind, ...data },
  };
}

const ids = (list: { id: string }[]) => list.map((item) => item.id);

describe('sortProjects', () => {
  it('sorts by order first, entries without order last', () => {
    const sorted = sortProjects([entry('c'), entry('b', { order: 2 }), entry('a', { order: 1 })]);
    expect(ids(sorted)).toEqual(['a', 'b', 'c']);
  });

  it('then by status: active → completed → archived', () => {
    const sorted = sortProjects([
      entry('x', { status: 'archived' }),
      entry('y', { status: 'completed' }),
      entry('z', { status: 'active' }),
    ]);
    expect(ids(sorted)).toEqual(['z', 'y', 'x']);
  });

  it('then by title with Turkish collation', () => {
    const sorted = sortProjects([
      entry('3', { title: 'Zebra' }),
      entry('2', { title: 'Şifre' }),
      entry('1', { title: 'Sade' }),
    ]);
    expect(ids(sorted)).toEqual(['1', '2', '3']);
  });

  it('does not mutate its input', () => {
    const input = [entry('b', { order: 2 }), entry('a', { order: 1 })];
    sortProjects(input);
    expect(ids(input)).toEqual(['b', 'a']);
  });
});

describe('isPublished', () => {
  it('drops drafts only in production', () => {
    expect(isPublished({ draft: true }, true)).toBe(false);
    expect(isPublished({ draft: true }, false)).toBe(true);
  });

  it('keeps entries that are not drafts', () => {
    expect(isPublished({}, true)).toBe(true);
    expect(isPublished({ draft: false }, true)).toBe(true);
  });
});

describe('formatPeriod', () => {
  it('shows an open period with the ongoing text', () => {
    expect(formatPeriod({ start: 2019 }, 'devam ediyor')).toBe('2019 – devam ediyor');
  });

  it('shows a closed period as a range', () => {
    expect(formatPeriod({ start: 2019, end: 2021 }, 'devam ediyor')).toBe('2019 – 2021');
  });

  it('collapses a single-year period', () => {
    expect(formatPeriod({ start: 2020, end: 2020 }, 'devam ediyor')).toBe('2020');
  });
});

describe('adjacentProjects', () => {
  const list = [entry('a'), entry('b'), entry('c')];

  it('returns the neighbours of a middle entry', () => {
    const { previous, next } = adjacentProjects(list, 'b');
    expect(previous?.id).toBe('a');
    expect(next?.id).toBe('c');
  });

  it('has no previous for the first and no next for the last entry', () => {
    expect(adjacentProjects(list, 'a').previous).toBeUndefined();
    expect(adjacentProjects(list, 'c').next).toBeUndefined();
  });

  it('returns nothing for a single entry or an unknown id', () => {
    expect(adjacentProjects([entry('a')], 'a')).toEqual({ previous: undefined, next: undefined });
    expect(adjacentProjects(list, 'missing')).toEqual({});
  });
});

describe('groupByKind', () => {
  it('groups in kind order and omits empty groups', () => {
    const groups = groupByKind([
      entry('a', { kind: 'open-source' }),
      entry('b', { kind: 'product' }),
      entry('c', { kind: 'open-source' }),
    ]);
    expect(groups.map((group) => [group.kind, ids(group.items)])).toEqual([
      ['product', ['b']],
      ['open-source', ['a', 'c']],
    ]);
  });
});
