// Profile types and the per-locale profile data (plans/01-mimari.md §4.1, ADR-005;
// split per locale in faz-6 §2.1 task 2). The facts and page text live in
// profile.tr.ts and profile.en.ts; `profiles` is a Record<Locale, …>, so a missing
// language or field fails the type check, and src/lib/profile.test.ts checks that the
// translations have the same lists, links and dates.
import type { Locale } from '@/lib/i18n';

import { profilePage as enPage, profile as enProfile } from './profile.en';
import { profilePage as trPage, profile as trProfile } from './profile.tr';

export type LinkKind = 'github' | 'linkedin' | 'company' | 'product' | 'blog' | 'other';

export interface ProfileLink {
  label: string;
  url: string;
  kind: LinkKind;
}

export interface SkillGroup {
  category: string;
  items: string[];
  note?: string;
}

export interface Product {
  name: string;
  description: string;
  problems: string[];
}

export interface Experience {
  organization: string;
  /** Public title; omitted when the title needs context (see highlights). */
  role?: string;
  url?: string;
  highlights: string[];
  note?: string;
  products?: Product[];
}

export type EducationKind = 'degree' | 'training';

export interface Education {
  institution: string;
  program: string;
  kind: EducationKind;
}

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  location: string;
  since: number;
  summary: string[];
  skills: SkillGroup[];
  experience: Experience[];
  workAreas: { items: string[]; note: string };
  education: Education[];
  ecosystem: { context: string; programs: string[]; note: string };
  focusAreas: { title: string; description: string }[];
  links: ProfileLink[];
  /** ISO date of the source document (ulascanerturk.md front matter `last_updated`). */
  lastUpdated: string;
}

export interface ProfileSectionText {
  /** Anchor id — the `about` id is also linked from the header nav (`siteText.{locale}.nav`). */
  id: string;
  title: string;
}

/** External actions resolve their URL from `profile.links` by `kind`; internal ones carry `href`. */
export type HeroAction = { kind: LinkKind; label: string } | { href: string; label: string };

export interface ProfilePageText {
  /** Page name in the document title ("{title} · {site name}"); omitted → just the site name. */
  title?: string;
  description: string;
  hero: { actions: HeroAction[] };
  about: ProfileSectionText;
  skills: ProfileSectionText & { intro: string };
  experience: ProfileSectionText & {
    problemsLabel: string;
    workAreasTitle: string;
    note: string;
  };
  projects: ProfileSectionText & { allLabel: string };
  education: ProfileSectionText & {
    groups: Record<EducationKind, string>;
    kindLabels: Record<EducationKind, string>;
    note: string;
  };
  ecosystem: ProfileSectionText & { intro: string };
  focusAreas: ProfileSectionText;
  links: ProfileSectionText;
  footnote: { text: string; updatedLabel: string };
}

export interface LocalizedProfile {
  profile: Profile;
  page: ProfilePageText;
}

export const profiles: Record<Locale, LocalizedProfile> = {
  tr: { profile: trProfile, page: trPage },
  en: { profile: enProfile, page: enPage },
};
