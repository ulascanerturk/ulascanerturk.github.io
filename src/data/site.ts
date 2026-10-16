// Site-wide metadata and UI text (faz-1 §2 task 4). Wording approved by the lead
// on 2026-10-17. Sources: ulascanerturk.md title line and §1 (name, description),
// §10 (GitHub, LinkedIn).

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  url: string;
  lang: string;
  description: string;
  titleSeparator: string;
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
  description:
    'Ulaşcan Ertürk — İstanbul merkezli yazılım geliştirici ve teknoloji girişimcisi; web, mobil ve B2B SaaS ürünleri geliştirir.',
  titleSeparator: ' · ',

  skipLink: 'İçeriğe geç',
  newTabHint: '(yeni sekmede açılır)',
  themeToggleLabel: 'Koyu tema',

  nav: {
    label: 'Ana menü',
    // "Projeler" (/projeler/) is added in Faz 3 task 6, when the route exists.
    items: [
      { label: 'Hakkımda', href: '/#hakkimda' },
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
    // "Projelere göz at" (/projeler/) is added in Faz 3 task 6.
    links: [{ label: 'Ana sayfaya dön', href: '/' }],
  },
};
