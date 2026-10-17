// Site-wide metadata and UI text (faz-1 §2 task 4; per locale since faz-6 §2.1 task 2).
// Turkish wording approved by the lead on 2026-10-17. Sources: ulascanerturk.md title
// line and §1 (name, description), §10 (GitHub, LinkedIn). `siteText` is typed as
// Record<Locale, SiteText>, so a missing language or field fails the type check.
import type { Locale } from '@/lib/i18n';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface OgImage {
  /** Path under public/. */
  path: string;
  width: number;
  height: number;
  alt: string;
}

/** Language-neutral site data. */
export interface SiteConfig {
  name: string;
  url: string;
  titleSeparator: string;
}

/** Text and links of one locale. */
export interface SiteText {
  description: string;
  /** Default share image (faz-4 §2 task 2). */
  ogImage: OgImage;
  /** Person fields for the home page JSON-LD (faz-4 §2 task 3); no contact data. */
  jsonLd: { jobTitle: string };
  skipLink: string;
  newTabHint: string;
  themeToggleLabel: string;
  /** Name of this language, used by the language link on the other locale's pages. */
  languageName: string;
  nav: { label: string; items: NavItem[] };
  footer: { label: string; copyrightHolder: string; links: NavItem[] };
  notFound: { title: string; message: string; links: NavItem[] };
}

export const site: SiteConfig = {
  name: 'Ulaşcan Ertürk',
  url: 'https://ulascanerturk.github.io',
  titleSeparator: ' · ',
};

const github = 'https://github.com/ulascanerturk';
const linkedin = 'https://www.linkedin.com/in/ulascanerturk';
const sourceCode = 'https://github.com/ulascanerturk/ulascanerturk.github.io';

export const siteText: Record<Locale, SiteText> = {
  tr: {
    description:
      'Ulaşcan Ertürk — İstanbul merkezli yazılım geliştirici ve teknoloji girişimcisi; web, mobil ve B2B SaaS ürünleri geliştirir.',
    // Text on the image and alt: title line of ulascanerturk.md (lead approval 2026-10-17, Faz 4).
    ogImage: {
      path: '/og/default.png',
      width: 1200,
      height: 630,
      alt: 'Ulaşcan Ertürk — Yazılım Geliştirici · Teknoloji Girişimcisi',
    },
    // ulascanerturk.md §2 "Mesleki tanım"; worksFor deliberately omitted (lead decision, Faz 4).
    jsonLd: { jobTitle: 'Yazılım Geliştirici' },
    skipLink: 'İçeriğe geç',
    newTabHint: '(yeni sekmede açılır)',
    themeToggleLabel: 'Koyu tema',
    languageName: 'Türkçe',
    nav: {
      label: 'Ana menü',
      items: [
        { label: 'Hakkımda', href: '/#hakkimda' },
        { label: 'Projeler', href: '/projeler/' },
        { label: 'GitHub', href: github, external: true },
        { label: 'LinkedIn', href: linkedin, external: true },
      ],
    },
    footer: {
      label: 'Alt bağlantılar',
      copyrightHolder: 'Ulaşcan Ertürk',
      links: [
        { label: 'GitHub', href: github, external: true },
        { label: 'LinkedIn', href: linkedin, external: true },
        { label: 'Kaynak kodu', href: sourceCode, external: true },
      ],
    },
    notFound: {
      title: 'Sayfa bulunamadı',
      message: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
      links: [
        { label: 'Ana sayfaya dön', href: '/' },
        { label: 'Projelere göz at', href: '/projeler/' },
      ],
    },
  },

  // English translation (faz-6 §2.1 task 6) — approved by the lead on 2026-10-17.
  en: {
    description:
      'Ulaşcan Ertürk — Istanbul-based software developer and technology entrepreneur building web, mobile and B2B SaaS products.',
    ogImage: {
      path: '/og/default-en.png',
      width: 1200,
      height: 630,
      alt: 'Ulaşcan Ertürk — Software Developer · Technology Entrepreneur',
    },
    jsonLd: { jobTitle: 'Software Developer' },
    skipLink: 'Skip to content',
    newTabHint: '(opens in a new tab)',
    themeToggleLabel: 'Dark theme',
    languageName: 'English',
    nav: {
      label: 'Main menu',
      items: [
        { label: 'About', href: '/en/#about' },
        { label: 'Projects', href: '/en/projects/' },
        { label: 'GitHub', href: github, external: true },
        { label: 'LinkedIn', href: linkedin, external: true },
      ],
    },
    footer: {
      label: 'Footer links',
      copyrightHolder: 'Ulaşcan Ertürk',
      links: [
        { label: 'GitHub', href: github, external: true },
        { label: 'LinkedIn', href: linkedin, external: true },
        { label: 'Source code', href: sourceCode, external: true },
      ],
    },
    // GitHub Pages serves a single /404.html (Turkish); this text is its English part.
    notFound: {
      title: 'Page not found',
      message: 'The page you are looking for may have moved or may never have existed.',
      links: [{ label: 'Go to the English home page', href: '/en/' }],
    },
  },
};
