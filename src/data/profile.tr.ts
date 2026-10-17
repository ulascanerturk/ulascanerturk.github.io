// Turkish profile data for `/` (faz-2 §2 task 2, plans/01-mimari.md §4.1, ADR-005;
// split per locale in faz-6 §2.1 task 2). Derived by hand from ulascanerturk.md; every
// field names its source section. Wording (first person) approved by the lead on
// 2026-10-17. Never add anything from ulascanerturk.md §9 or the items §11 excludes.
// When ulascanerturk.md changes, sync this file, profile.en.ts and
// references/content_schema.md.
import type { Profile, ProfilePageText } from './profile';

export const profile: Profile = {
  // kaynak: ulascanerturk.md başlık (H1)
  name: 'Ulaşcan Ertürk',
  // kaynak: ulascanerturk.md başlık altı unvan satırı
  headline:
    'Yazılım Geliştirici · Teknoloji Girişimcisi · Full-Stack Web ve Mobil Uygulama Geliştiricisi',
  // kaynak: ulascanerturk.md §1, §8 "Ürün mühendisliği"; plans/02-icerik-ve-tasarim.md §1 ana mesaj
  tagline:
    "2018'den bu yana web, mobil ve kurumsal uygulamaları fikirden üretim ortamına kadar uçtan uca geliştiriyorum; iş gücü planlama, B2B SaaS ve yapay zekâ destekli çözümlere odaklanıyorum.",
  // kaynak: ulascanerturk.md §2 "Konum (genel)" — yalnızca şehir/ülke
  location: 'İstanbul, Türkiye',
  // kaynak: ulascanerturk.md §1, §2 "Profesyonel yazılım deneyimi"
  since: 2018,
  // kaynak: ulascanerturk.md §1 (paragraf 1–2), §3 "Disiplinler arası yaklaşım"
  summary: [
    "2018'den bu yana yazılım geliştirme, dijital ürün tasarımı ve teknoloji girişimleri üzerinde çalışan, İstanbul merkezli bir yazılım geliştiricisiyim. Web, mobil ve kurumsal uygulamalarda; özellikle PHP/Laravel, JavaScript/React, React Native ve MySQL tabanlı sistemlerde deneyimim var.",
    'Teknik geliştirmeyi ürün yönetimi ve iş ihtiyaçlarıyla birlikte ele alıyorum. Çalışmalarım iş gücü ve vardiya planlama, B2B SaaS, kurumsal sistem entegrasyonları, operasyonel verimlilik, bulut altyapıları ve yapay zekâ uygulamaları etrafında yoğunlaşıyor.',
    'Uluslararası İlişkiler lisans eğitimimi yazılım deneyimimle bir araya getirerek iş süreçlerini, kurumların ihtiyaçlarını ve teknoloji ürünlerinin operasyonel etkilerini birlikte değerlendiriyorum.',
  ],
  // kaynak: ulascanerturk.md §4 tablo
  skills: [
    {
      category: 'Backend',
      items: ['PHP', 'Laravel', 'REST API geliştirme', 'Uygulama iş kuralları'],
    },
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'jQuery', 'Laravel Blade'],
    },
    {
      category: 'Mobil',
      items: ['React Native', 'iOS ve Android odaklı uygulama geliştirme'],
    },
    {
      category: 'Veritabanı',
      items: ['MySQL', 'İlişkisel veri modelleme ve sorgulama'],
    },
    {
      category: 'CMS',
      items: ['WordPress', 'Web sitesi geliştirme ve özelleştirme'],
    },
    {
      category: 'Java ekosistemi',
      items: ['Java SE', 'Java EE'],
      // kaynak: ulascanerturk.md §4 "eğitim ve önceki uygulama deneyimi"
      note: 'Eğitim ve önceki uygulama deneyimi.',
    },
    {
      category: 'Sistem ve sunucu',
      items: ['Linux/Ubuntu', 'Apache', 'PHP tabanlı web sunucusu ortamları'],
    },
    {
      category: 'Bulut ve dağıtım',
      items: ['Microsoft Azure', 'AWS', 'Web uygulaması dağıtımı', 'Sunucu operasyonları'],
    },
    {
      category: 'Entegrasyon',
      items: ['REST servisleri', 'Dış sistemlerle veri alışverişi', 'Kurumsal entegrasyonlar'],
    },
    {
      category: 'Uygulama operasyonları',
      items: [
        'Alan adı ve DNS',
        'SSL/TLS',
        'E-posta servisleri',
        'Barındırma',
        'Temel sistem yönetimi',
      ],
    },
    {
      category: 'Yapay zekâ / optimizasyon',
      items: [
        'LLM tabanlı uygulamalar',
        'Yapay zekâ destekli ürün fikirleri',
        'Kısıt tabanlı planlama ve değerlendirme çalışmaları',
      ],
    },
  ],
  experience: [
    {
      // kaynak: ulascanerturk.md §5 "Insapption Technology"
      organization: 'Insapption Technology',
      url: 'https://insapption.com/',
      highlights: [
        'Dijital ürün geliştirme, yazılım ve yapay zekâ çözümleri alanında faaliyet gösteren bu teknoloji şirketiyle profesyonel bağım bulunuyor.',
        'Şirketin kamuya açık ekip sayfasında Technology Officer olarak listeleniyorum.',
        'Web/mobil uygulama geliştirme, ürün mimarisi ve teknik uygulama süreçleriyle ilgileniyorum.',
      ],
    },
    {
      // kaynak: ulascanerturk.md §5 "Shifter / Shifter Teknoloji"
      organization: 'Shifter / Shifter Teknoloji',
      url: 'https://www.shifter.com.tr/',
      highlights: [
        'Shifter ürün ailesinin teknoloji geliştirme, ürün tasarımı ve operasyonel ihtiyaçlara uyarlanması üzerinde çalışıyorum.',
        'Odağım, karmaşık iş gücü planlaması süreçlerini ölçülebilir, yönetilebilir ve dijital iş akışlarına dönüştürmek.',
        'Ürünler, kurumsal iş gücü yönetimi ve daha küçük ekiplerin kullanabileceği SaaS çözümleri olarak konumlanıyor.',
      ],
      // kaynak: ulascanerturk.md §6 — ayrı proje sayfası yok (S1)
      products: [
        {
          name: 'Shifter Pro — Kurumsal Vardiya Yönetimi',
          description:
            'Kuruma özel iş gücü ve vardiya yönetimi ihtiyaçları için geliştirilmiş, tek kuruma ayrılmış (single-tenant) kurumsal yazılım ürünü.',
          problems: [
            'Çalışan, departman, lokasyon ve ekipman ilişkileri.',
            'Karmaşık vardiya kuralları, izinler ve planlama kısıtları.',
            'Personel yönetimi, puantaj ve operasyonel raporlama.',
            'ERP, insan kaynakları ve personel devam kontrol sistemleriyle entegrasyon.',
          ],
        },
        {
          name: 'Shifter Lite — SaaS Vardiya Yönetimi',
          description:
            'Küçük ve orta ölçekli ekiplerin vardiya planlama ve çalışan yönetimi ihtiyaçlarına odaklanan, kolay kurulum ve web/mobil erişim yaklaşımıyla sunulan ürün.',
          problems: [
            'Ekip ve vardiya takviminin yönetimi.',
            'Vardiya değişiklikleri, izinler ve çalışan bilgilendirmesi.',
            'Web ve mobil kullanıcı deneyimi.',
            'SaaS ürün mimarisi, kullanıcı edinimi ve abonelik modeli.',
          ],
        },
      ],
    },
  ],
  // kaynak: ulascanerturk.md §6 "Diğer yazılım çalışma alanları" + not
  workAreas: {
    items: [
      'Rezervasyon ve randevu yönetimi uygulamaları.',
      'Kurumsal web siteleri ve özel iş uygulamaları.',
      'Personel devam kontrolü (PDKS), puantaj ve kurumsal sistem entegrasyonları.',
      'Üretim ve operasyon süreçlerinde dijitalleşme ve verimlilik analizi.',
      'Yapay zekâ destekli B2B yazılım ve karar destek çözümleri.',
    ],
    note: 'Bu başlıklar genel deneyim ve ilgi alanlarımı tanımlar; her biri bağımsız, yayımlanmış veya ticari olarak kullanıma sunulmuş bir ürün değildir.',
  },
  // kaynak: ulascanerturk.md §3 — lisans = Uluslararası İlişkiler; yazılım eğitimleri = eğitim programı
  education: [
    {
      institution: 'Eskişehir Osmangazi Üniversitesi',
      program: 'Uluslararası İlişkiler lisans programı (İngilizce)',
      kind: 'degree',
    },
    {
      institution: 'Bahçeşehir Üniversitesi ve Wissen Academy',
      program: 'Java SE ve Java EE eğitimleri',
      kind: 'training',
    },
    {
      institution: 'Orta Doğu Teknik Üniversitesi (ODTÜ)',
      program: 'Yazılım Mühendisliği eğitim programı',
      kind: 'training',
    },
  ],
  // kaynak: ulascanerturk.md §7 — katılımlar Shifter bağlamında; kişisel ödül değil
  ecosystem: {
    context: 'Shifter girişimi bağlamında katılınan programlar',
    programs: [
      'İTÜ Çekirdek',
      'Tech İstanbul',
      'BTM (Bilgiyi Ticarileştirme Merkezi)',
      'NVIDIA Inception',
      'AWS ve Microsoft girişimcilik/teknoloji destek programları',
    ],
    note: 'Bu katılımlar Shifter girişimi/şirketi bağlamındadır; bana verilmiş ayrı bir sertifika, ödül veya akademik unvan değildir.',
  },
  // kaynak: ulascanerturk.md §8
  focusAreas: [
    {
      title: 'Ürün mühendisliği',
      description: 'Fikirden üretim ortamına kadar web ve mobil yazılım geliştirme.',
    },
    {
      title: 'İş gücü yönetimi',
      description: 'Vardiya, izin, personel, organizasyon ve planlama iş kuralları.',
    },
    {
      title: 'B2B SaaS',
      description: 'Çok kiracılı ve kuruma özel uygulamalar, ürün paketleme ve ölçeklenme.',
    },
    {
      title: 'Yapay zekâ',
      description: 'LLM uygulamaları, AI destekli iş akışları, karar destek ve optimizasyon.',
    },
    {
      title: 'Kurumsal entegrasyon',
      description: 'İş sistemleri ve operasyonel veri kaynakları arasında veri akışı.',
    },
    {
      title: 'Teknik operasyon',
      description: 'Linux sunucular, bulut ortamları, uygulama dağıtımı ve servis yönetimi.',
    },
    {
      title: 'Girişim geliştirme',
      description: 'Ürün-pazar uyumu, iş modeli değerlendirmesi ve teknoloji ekosistemleri.',
    },
  ],
  // kaynak: ulascanerturk.md §10 + S2 (GitHub + LinkedIn; e-posta/telefon yok)
  links: [
    { label: 'GitHub', url: 'https://github.com/ulascanerturk', kind: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ulascanerturk', kind: 'linkedin' },
    { label: 'Insapption Technology', url: 'https://insapption.com/', kind: 'company' },
    { label: 'Insapption ekip sayfası', url: 'https://insapption.com/our-team/', kind: 'company' },
    { label: 'Shifter', url: 'https://www.shifter.com.tr/', kind: 'product' },
    { label: 'Shifter Blog', url: 'https://blog.shifter.com.tr/', kind: 'blog' },
  ],
  // kaynak: ulascanerturk.md front matter `last_updated`
  lastUpdated: '2026-10-17',
};

// Page text for `/` (section titles, intros, labels). Order follows
// plans/02-icerik-ve-tasarim.md §2–§3; "Öne çıkan projeler" (#projeler) since
// Faz 3 task 8 — its cards come from the `featured` project entries.
export const profilePage: ProfilePageText = {
  // kaynak: ulascanerturk.md §1, §2 — ≤ 160 karakter
  description:
    "Ulaşcan Ertürk — 2018'den bu yana web, mobil ve kurumsal uygulamalar geliştiren İstanbul merkezli yazılım geliştirici ve teknoloji girişimcisi.",
  hero: {
    actions: [
      { href: '/projeler/', label: 'Projeleri gör' },
      { kind: 'github', label: 'GitHub profili' },
      { kind: 'linkedin', label: 'LinkedIn profili' },
    ],
  },
  about: { id: 'hakkimda', title: 'Hakkımda' },
  skills: {
    id: 'yetkinlikler',
    title: 'Yetkinlikler',
    // kaynak: ulascanerturk.md §4 "Öne çıkan teknik yaklaşım"
    intro:
      "Backend'i ve veri modelini iş kurallarıyla uyumlu kuruyor, web ve mobil arayüzleri bu çekirdek etrafında geliştiriyorum; uygulamayı dağıtıma ve gerçek operasyon koşullarına kadar uçtan uca ele alıyorum.",
  },
  experience: {
    id: 'deneyim',
    title: 'Deneyim',
    problemsLabel: 'Başlıca problem alanları',
    workAreasTitle: 'Diğer yazılım çalışma alanları',
    // kaynak: ulascanerturk.md §5 not
    note: 'Şirket unvanları ve sorumluluklar zamanla değişebilir; güncel resmî unvan için ilgili kurumun kaydı esas alınmalıdır.',
  },
  // kaynak: S1 kararı — öne çıkan projeler (ulascanerturk.md §6 Lockbox)
  projects: { id: 'projeler', title: 'Öne çıkan projeler', allLabel: 'Tüm projeler' },
  education: {
    id: 'egitim',
    title: 'Eğitim',
    groups: { degree: 'Üniversite eğitimi', training: 'Yazılım odaklı eğitim programları' },
    kindLabels: { degree: 'Lisans', training: 'Eğitim programı' },
    // kaynak: ulascanerturk.md §3 not
    note: 'Yazılım alanındaki eğitim programları ayrı bir yazılım mühendisliği lisans diploması değildir; lisans eğitimim Uluslararası İlişkiler alanındadır.',
  },
  ecosystem: {
    id: 'girisimcilik',
    title: 'Girişimcilik ve ekosistem',
    // kaynak: ulascanerturk.md §7 paragraf 1
    intro:
      'Ürün geliştirmeye yalnızca kodlama açısından değil; müşteri ihtiyacı, pazara giriş, iş modeli, ölçeklenebilirlik ve ticarileşme boyutlarıyla da yaklaşıyorum.',
  },
  focusAreas: { id: 'odak-alanlari', title: 'Odak alanları' },
  links: { id: 'baglantilar', title: 'Bağlantılar' },
  // kaynak: ulascanerturk.md §11 doğrulama notu (görev 7, lead kararı: sayfa sonunda)
  footnote: {
    text: 'Bazı teknik yetkinlik başlıkları kendi beyanıma dayanır; bağımsız üçüncü taraflarca sertifikalandırılmış yetkinlikler olarak değerlendirilmemelidir.',
    updatedLabel: 'Son güncelleme:',
  },
};
