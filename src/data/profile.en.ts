// English profile data for `/en/` (faz-6 §2.1 tasks 2 and 6): a translation of
// profile.tr.ts — same facts, same order, same links; no claim that is not in
// ulascanerturk.md. Source sections are named per field like in the Turkish file.
// Keep the distinctions (Değişmez Kural 2): the degree is International Relations,
// the software courses are training programs, the accelerator programs are in the
// Shifter context, titles may change. Approved by the lead on 2026-10-17.
import type { Profile, ProfilePageText } from './profile';

export const profile: Profile = {
  // kaynak: ulascanerturk.md başlık (H1)
  name: 'Ulaşcan Ertürk',
  // kaynak: ulascanerturk.md başlık altı unvan satırı
  headline: 'Software Developer · Technology Entrepreneur · Full-Stack Web and Mobile Developer',
  // kaynak: ulascanerturk.md §1, §8 "Ürün mühendisliği"; plans/02-icerik-ve-tasarim.md §1 ana mesaj
  tagline:
    'Since 2018 I have been building web, mobile and enterprise applications end to end, from idea to production, with a focus on workforce planning, B2B SaaS and AI-assisted solutions.',
  // kaynak: ulascanerturk.md §2 "Konum (genel)" — yalnızca şehir/ülke
  location: 'Istanbul, Türkiye',
  // kaynak: ulascanerturk.md §1, §2 "Profesyonel yazılım deneyimi"
  since: 2018,
  // kaynak: ulascanerturk.md §1 (paragraf 1–2), §3 "Disiplinler arası yaklaşım"
  summary: [
    'I am an Istanbul-based software developer who has been working on software development, digital product design and technology ventures since 2018. I have experience with web, mobile and enterprise applications, especially systems built on PHP/Laravel, JavaScript/React, React Native and MySQL.',
    'I approach technical development together with product management and business needs. My work centers on workforce and shift planning, B2B SaaS, enterprise system integrations, operational efficiency, cloud infrastructure and AI applications.',
    'By combining my bachelor’s degree in International Relations with my software experience, I look at business processes, organizational needs and the operational impact of technology products together.',
  ],
  // kaynak: ulascanerturk.md §4 tablo
  skills: [
    {
      category: 'Backend',
      items: ['PHP', 'Laravel', 'REST API development', 'Application business rules'],
    },
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'jQuery', 'Laravel Blade'],
    },
    {
      category: 'Mobile',
      items: ['React Native', 'iOS- and Android-focused app development'],
    },
    {
      category: 'Databases',
      items: ['MySQL', 'Relational data modeling and querying'],
    },
    {
      category: 'CMS',
      items: ['WordPress', 'Website development and customization'],
    },
    {
      category: 'Java ecosystem',
      items: ['Java SE', 'Java EE'],
      // kaynak: ulascanerturk.md §4 "eğitim ve önceki uygulama deneyimi"
      note: 'Training and earlier hands-on experience.',
    },
    {
      category: 'Systems and servers',
      items: ['Linux/Ubuntu', 'Apache', 'PHP-based web server environments'],
    },
    {
      category: 'Cloud and deployment',
      items: ['Microsoft Azure', 'AWS', 'Web application deployment', 'Server operations'],
    },
    {
      category: 'Integration',
      items: ['REST services', 'Data exchange with external systems', 'Enterprise integrations'],
    },
    {
      category: 'Application operations',
      items: [
        'Domains and DNS',
        'SSL/TLS',
        'E-mail services',
        'Hosting',
        'Basic system administration',
      ],
    },
    {
      category: 'AI / optimization',
      items: [
        'LLM-based applications',
        'AI-assisted product ideas',
        'Constraint-based planning and evaluation work',
      ],
    },
  ],
  experience: [
    {
      // kaynak: ulascanerturk.md §5 "Insapption Technology"
      organization: 'Insapption Technology',
      url: 'https://insapption.com/',
      highlights: [
        'I have a professional connection with this technology company, which works in digital product development, software and AI solutions.',
        'I am listed as Technology Officer on the company’s public team page.',
        'My work there involves web/mobile app development, product architecture and technical delivery.',
      ],
    },
    {
      // kaynak: ulascanerturk.md §5 "Shifter / Shifter Teknoloji"
      organization: 'Shifter / Shifter Teknoloji',
      url: 'https://www.shifter.com.tr/',
      highlights: [
        'I work on technology development, product design and adapting the Shifter product family to operational needs.',
        'My focus is turning complex workforce planning processes into measurable, manageable digital workflows.',
        'The products are positioned as enterprise workforce management and as SaaS solutions that smaller teams can use.',
      ],
      // kaynak: ulascanerturk.md §6 — ayrı proje sayfası yok (S1)
      products: [
        {
          name: 'Shifter Pro — Enterprise Shift Management',
          description:
            'Enterprise software built for organization-specific workforce and shift management needs, dedicated to a single organization (single-tenant).',
          problems: [
            'Relationships between employees, departments, locations and equipment.',
            'Complex shift rules, leave and planning constraints.',
            'Staff management, timekeeping and operational reporting.',
            'Integration with ERP, human resources and time-and-attendance systems.',
          ],
        },
        {
          name: 'Shifter Lite — SaaS Shift Management',
          description:
            'A product for the shift planning and employee management needs of small and medium-sized teams, offered with easy setup and web/mobile access.',
          problems: [
            'Managing the team and shift calendar.',
            'Shift changes, leave and employee notifications.',
            'Web and mobile user experience.',
            'SaaS product architecture, user acquisition and the subscription model.',
          ],
        },
      ],
    },
  ],
  // kaynak: ulascanerturk.md §6 "Diğer yazılım çalışma alanları" + not
  workAreas: {
    items: [
      'Booking and appointment management applications.',
      'Corporate websites and custom business applications.',
      'Time-and-attendance tracking (PDKS), timekeeping and enterprise system integrations.',
      'Digitalization and efficiency analysis in production and operations.',
      'AI-assisted B2B software and decision support solutions.',
    ],
    note: 'These headings describe my general experience and interests; none of them is an independent product that has been published or offered commercially.',
  },
  // kaynak: ulascanerturk.md §3 — lisans = Uluslararası İlişkiler; yazılım eğitimleri = eğitim programı
  education: [
    {
      institution: 'Eskişehir Osmangazi University',
      program: 'Bachelor’s degree in International Relations (taught in English)',
      kind: 'degree',
    },
    {
      institution: 'Bahçeşehir University and Wissen Academy',
      program: 'Java SE and Java EE training programs',
      kind: 'training',
    },
    {
      institution: 'Middle East Technical University (METU)',
      program: 'Software Engineering training program',
      kind: 'training',
    },
  ],
  // kaynak: ulascanerturk.md §7 — katılımlar Shifter bağlamında; kişisel ödül değil
  ecosystem: {
    context: 'Programs joined in the context of the Shifter startup',
    programs: [
      'İTÜ Çekirdek',
      'Tech İstanbul',
      'BTM (Bilgiyi Ticarileştirme Merkezi)',
      'NVIDIA Inception',
      'AWS and Microsoft startup/technology support programs',
    ],
    note: 'These participations belong to the Shifter startup/company; they are not a separate certificate, award or academic title given to me.',
  },
  // kaynak: ulascanerturk.md §8
  focusAreas: [
    {
      title: 'Product engineering',
      description: 'Web and mobile software development from idea to production.',
    },
    {
      title: 'Workforce management',
      description: 'Business rules for shifts, leave, staff, organization and planning.',
    },
    {
      title: 'B2B SaaS',
      description:
        'Multi-tenant and organization-specific applications, product packaging and scaling.',
    },
    {
      title: 'Artificial intelligence',
      description: 'LLM applications, AI-assisted workflows, decision support and optimization.',
    },
    {
      title: 'Enterprise integration',
      description: 'Data flows between business systems and operational data sources.',
    },
    {
      title: 'Technical operations',
      description:
        'Linux servers, cloud environments, application deployment and service management.',
    },
    {
      title: 'Venture building',
      description: 'Product-market fit, business model evaluation and technology ecosystems.',
    },
  ],
  // kaynak: ulascanerturk.md §10 + S2 (GitHub + LinkedIn; e-posta/telefon yok)
  links: [
    { label: 'GitHub', url: 'https://github.com/ulascanerturk', kind: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ulascanerturk', kind: 'linkedin' },
    { label: 'Insapption Technology', url: 'https://insapption.com/', kind: 'company' },
    { label: 'Insapption team page', url: 'https://insapption.com/our-team/', kind: 'company' },
    { label: 'Shifter', url: 'https://www.shifter.com.tr/', kind: 'product' },
    { label: 'Shifter Blog', url: 'https://blog.shifter.com.tr/', kind: 'blog' },
  ],
  // kaynak: ulascanerturk.md front matter `last_updated`
  lastUpdated: '2026-10-17',
};

// Page text for `/en/` — same structure and order as the Turkish page.
export const profilePage: ProfilePageText = {
  // Titles must be unique across the site (check:dist); the Turkish home page keeps the bare
  // site name. kaynak: ulascanerturk.md §2 "Mesleki tanım" (fix cycle 1, lead decision 2026-10-17)
  title: 'Software Developer',
  // kaynak: ulascanerturk.md §1, §2 — ≤ 160 karakter
  description:
    'Ulaşcan Ertürk — Istanbul-based software developer and technology entrepreneur building web, mobile and enterprise applications since 2018.',
  hero: {
    actions: [
      { href: '/en/projects/', label: 'View projects' },
      { kind: 'github', label: 'GitHub profile' },
      { kind: 'linkedin', label: 'LinkedIn profile' },
    ],
  },
  about: { id: 'about', title: 'About' },
  skills: {
    id: 'skills',
    title: 'Skills',
    // kaynak: ulascanerturk.md §4 "Öne çıkan teknik yaklaşım"
    intro:
      'I build the backend and the data model in line with the business rules, develop the web and mobile interfaces around that core, and take the application all the way to deployment and real operating conditions.',
  },
  experience: {
    id: 'experience',
    title: 'Experience',
    problemsLabel: 'Main problem areas',
    workAreasTitle: 'Other software work areas',
    // kaynak: ulascanerturk.md §5 not
    note: 'Company titles and responsibilities may change over time; for the current official title, the record of the organization concerned applies.',
  },
  // kaynak: S1 kararı — öne çıkan projeler (ulascanerturk.md §6 Lockbox)
  projects: { id: 'projects', title: 'Featured projects', allLabel: 'All projects' },
  education: {
    id: 'education',
    title: 'Education',
    groups: { degree: 'University education', training: 'Software training programs' },
    kindLabels: { degree: 'Bachelor’s degree', training: 'Training program' },
    // kaynak: ulascanerturk.md §3 not
    note: 'The software training programs are not a separate bachelor’s degree in software engineering; my bachelor’s degree is in International Relations.',
  },
  ecosystem: {
    id: 'entrepreneurship',
    title: 'Entrepreneurship and ecosystem',
    // kaynak: ulascanerturk.md §7 paragraf 1
    intro:
      'I approach product development not only from the coding side but also in terms of customer needs, market entry, business model, scalability and commercialization.',
  },
  focusAreas: { id: 'focus-areas', title: 'Focus areas' },
  links: { id: 'links', title: 'Links' },
  // kaynak: ulascanerturk.md §11 doğrulama notu (görev 7, lead kararı: sayfa sonunda)
  footnote: {
    text: 'Some of the technical skill headings are based on my own statement; they should not be read as skills certified by independent third parties.',
    updatedLabel: 'Last updated:',
  },
};
