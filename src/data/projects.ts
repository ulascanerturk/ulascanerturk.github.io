// UI text for the project pages (faz-3 §2 tasks 4–6; per locale since faz-6 §2.1 task 2).
// The projects themselves live in src/content/projects/*.md (Turkish) and
// src/content/projects/en/*.md (English). Turkish wording approved by the lead on
// 2026-10-17; English translation approved on 2026-10-17 (Faz 6).
import type { Locale } from '@/lib/i18n';
import type { ProjectKind, ProjectStatus } from '@/lib/projects';

export interface ProjectsPageText {
  list: { title: string; description: string; intro: string };
  /** Group headings on the list page — used once a second kind exists. */
  kindLabels: Record<ProjectKind, string>;
  statusLabels: Record<ProjectStatus, string>;
  meta: { role: string; period: string; status: string };
  ongoing: string;
  techLabel: string;
  linksTitle: string;
  backLink: string;
  pager: { label: string; previous: string; next: string };
}

export const projectsPage: Record<Locale, ProjectsPageText> = {
  tr: {
    list: {
      title: 'Projeler',
      description:
        "Ulaşcan Ertürk'ün geliştirdiği ürün ve projeler: problem, çözüm, rol, teknolojiler ve güncel durum.",
      intro:
        'Geliştirdiğim ürün ve projeler. Her sayfada problemi, çözümü, rolümü ve güncel durumu bulabilirsiniz.',
    },
    kindLabels: {
      product: 'Ürünler',
      'open-source': 'Açık kaynak',
      'client-work': 'Müşteri çalışmaları',
      'focus-area': 'Çalışma alanları',
    },
    statusLabels: {
      active: 'Aktif geliştirmede',
      completed: 'Tamamlandı',
      archived: 'Arşivlendi',
    },
    meta: { role: 'Rol', period: 'Dönem', status: 'Durum' },
    ongoing: 'devam ediyor',
    techLabel: 'Teknolojiler',
    linksTitle: 'Bağlantılar',
    backLink: 'Tüm projeler',
    pager: { label: 'Proje gezinmesi', previous: 'Önceki proje', next: 'Sonraki proje' },
  },
  en: {
    list: {
      title: 'Projects',
      description:
        'Products and projects built by Ulaşcan Ertürk: problem, solution, role, technologies and current status.',
      intro:
        'Products and projects I have built. Each page covers the problem, the solution, my role and the current status.',
    },
    kindLabels: {
      product: 'Products',
      'open-source': 'Open source',
      'client-work': 'Client work',
      'focus-area': 'Work areas',
    },
    statusLabels: {
      active: 'In active development',
      completed: 'Completed',
      archived: 'Archived',
    },
    meta: { role: 'Role', period: 'Period', status: 'Status' },
    ongoing: 'ongoing',
    techLabel: 'Technologies',
    linksTitle: 'Links',
    backLink: 'All projects',
    pager: { label: 'Project navigation', previous: 'Previous project', next: 'Next project' },
  },
};
