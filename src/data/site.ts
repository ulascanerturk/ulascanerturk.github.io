// Site-wide metadata and UI text (faz-1 §2 task 4). Wording approved by the lead
// on 2026-10-17. Sources: ulascanerturk.md title line and §1 (name, description),
// §10 (GitHub, LinkedIn).

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

export interface SiteConfig {
  name: string;
  url: string;
  lang: string;
  /** Open Graph locale (faz-4 §2 task 1). */
  locale: string;
  description: string;
  titleSeparator: string;
  /** Default share image (faz-4 §2 task 2). */
  ogImage: OgImage;
  /** Person fields for the home page JSON-LD (faz-4 §2 task 3); no contact data. */
  jsonLd: { jobTitle: string };
  skipLink: string;
  newTabHint: string;
  themeToggleLabel: string;
  nav: { label: string; items: NavItem[] };
  footer: { label: string; copyrightHolder: string; links: NavItem[] };
  notFound: { title: string; message: string; links: NavItem[] };
}

export const site: SiteConfig = {
  name: 'Ulaşcan Ertürk',
  url: 'https://ulascanerturk.github.io',
  lang: 'tr',
  locale: 'tr_TR',
  description:
    'Ulaşcan Ertürk — İstanbul merkezli yazılım geliştirici ve teknoloji girişimcisi; web, mobil ve B2B SaaS ürünleri geliştirir.',
  titleSeparator: ' · ',

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

  nav: {
    label: 'Ana menü',
    items: [
      { label: 'Hakkımda', href: '/#hakkimda' },
      { label: 'Projeler', href: '/projeler/' },
      { label: 'GitHub', href: 'https://github.com/ulascanerturk', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ulascanerturk', external: true },
    ],
  },

  footer: {
    label: 'Alt bağlantılar',
    copyrightHolder: 'Ulaşcan Ertürk',
    links: [
      { label: 'GitHub', href: 'https://github.com/ulascanerturk', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ulascanerturk', external: true },
      {
        label: 'Kaynak kodu',
        href: 'https://github.com/ulascanerturk/ulascanerturk.github.io',
        external: true,
      },
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
};
