// UI text and contact details for the project documents (ADR-014): privacy policy, support and
// security pages that the App Store and Google Play listings link to. The documents themselves
// live in src/content/project-docs/. Wording and the public support address approved by the
// lead on 2026-10-17 (exception to S2 for these pages only).
import type { Locale, ProjectDocKey } from '@/lib/i18n';

export interface ProjectContact {
  /** Developer's legal name exactly as shown by the stores. */
  developer: string;
  /** Public support / privacy contact for the app listings. */
  email: string;
}

export interface ProjectDocsText {
  /** Section on the project page that lists the documents. */
  sectionTitle: string;
  /** Link label of each document, also used as the language-neutral page name. */
  labels: Record<ProjectDocKey, string>;
  updatedLabel: string;
  /** Link to the same document in the other language (Google Play takes one URL). */
  otherLanguage: string;
  contactTitle: string;
  /** Back link to the project page; `{project}` is replaced with the project title. */
  backLink: string;
}

/** Contact per project slug; a project with documents must have an entry. */
export const projectContacts: Record<string, ProjectContact> = {
  'lockbox-mobile': { developer: 'Ulaşcan Ertürk', email: 'ulascanerturk@gmail.com' },
};

export const projectDocsText: Record<Locale, ProjectDocsText> = {
  tr: {
    sectionTitle: 'Gizlilik ve destek',
    labels: { privacy: 'Gizlilik Politikası', support: 'Destek', security: 'Güvenlik' },
    updatedLabel: 'Yürürlük tarihi',
    otherLanguage: 'Read in English',
    contactTitle: 'İletişim',
    backLink: '{project} sayfasına dön',
  },
  en: {
    sectionTitle: 'Privacy and support',
    labels: { privacy: 'Privacy Policy', support: 'Support', security: 'Security' },
    updatedLabel: 'Effective date',
    otherLanguage: 'Türkçe oku',
    contactTitle: 'Contact',
    backLink: 'Back to {project}',
  },
};
