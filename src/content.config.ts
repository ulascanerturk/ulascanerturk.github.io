// Content collections (faz-3 §2 task 2, plans/01-mimari.md §4.2, ADR-005).
// One Markdown file per project; the file name is the slug.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { PROJECT_KINDS, PROJECT_STATUSES } from './lib/projects';

const year = z.number().int().min(1990).max(2100);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1).max(80),
        // Also the page's meta description — hence ≤ 160 (kontrol-listesi "SEO ve Paylaşım").
        summary: z.string().min(50).max(160),
        kind: z.enum(PROJECT_KINDS),
        status: z.enum(PROJECT_STATUSES),
        role: z.string().min(1),
        period: z
          .object({ start: year, end: year.optional() })
          .refine(({ start, end }) => end === undefined || end >= start, {
            message: 'period.end must not be before period.start',
          })
          .optional(),
        tech: z.array(z.string().min(1)).min(1),
        links: z
          .array(z.object({ label: z.string().min(1), url: z.url({ protocol: /^https$/ }) }))
          .optional(),
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
        featured: z.boolean().default(false),
        order: z.number().int().optional(),
        draft: z.boolean().default(false),
        disclaimer: z.string().min(1).optional(),
      })
      .refine(({ cover, coverAlt }) => cover === undefined || coverAlt !== undefined, {
        message: 'coverAlt is required when cover is set',
        path: ['coverAlt'],
      }),
});

// Project documents (ADR-014): privacy policy, support and security pages published below a
// project page for the App Store / Google Play listings. Path = `{slug}/{doc}.md` (Turkish)
// or `en/{slug}/{doc}.md`; ids are checked by `splitDocEntryId` in the page helpers.
const projectDocs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/project-docs' }),
  schema: z.object({
    title: z.string().min(1).max(80),
    // Meta description (≤ 160, kontrol-listesi "SEO ve Paylaşım").
    description: z.string().min(50).max(160),
    // Effective / last-updated date shown on the page; identical in every language.
    updated: z.iso.date(),
  }),
});

export const collections = { projects, projectDocs };
