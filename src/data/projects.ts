// UI text for the project pages (faz-3 §2 tasks 4–6). The projects themselves
// live in src/content/projects/*.md. Wording approved by the lead on 2026-10-17.
import type { ProjectKind, ProjectStatus } from '@/lib/projects';

export interface ProjectsPageText {
  list: { title: string; description: string; intro: string };
  /** Group headings on /projeler/ — used once a second kind exists. */
  kindLabels: Record<ProjectKind, string>;
  statusLabels: Record<ProjectStatus, string>;
  meta: { role: string; period: string; status: string };
  ongoing: string;
  techLabel: string;
  linksTitle: string;
  backLink: string;
  pager: { label: string; previous: string; next: string };
}

export const projectsPage: ProjectsPageText = {
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
};
