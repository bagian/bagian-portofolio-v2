export interface ProjectLocalized {
  title: string;
  category: string;
  industry: string;
  description: string;
  challenge: string;
  solution: string;
  highlights: string[];
}

export interface Project {
  id: string;
  slug: string;
  client: string;
  year: string;
  status: "Completed";
  url: string;
  stack: string[];
  image?: string;
  gallery?: string[];
  ID: ProjectLocalized;
  EN: ProjectLocalized;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "rahayu-transport",
    client: "Rahayu Transport",
    year: "2026",
    status: "Completed",
    url: "https://www.rahayutransport.web.id/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    ID: {
      title: "Platform Rental Kendaraan",
      category: "Pengembangan Web",
      industry: "Rental Kendaraan & Transportasi",
      description:
        "Platform layanan sewa kendaraan dengan katalog armada lengkap, halaman detail unit, alur booking, testimoni, dan FAQ. Dirancang untuk mengubah pengunjung menjadi pemesan langsung.",
      challenge:
        "Rahayu Transport membutuhkan website yang dapat menampilkan banyak jenis armada secara terstruktur, memudahkan calon pelanggan membandingkan kendaraan, serta mempercepat proses pemesanan.",
      solution:
        "Kami membangun platform responsif dengan katalog armada, detail harga dan spesifikasi, alur booking yang sederhana, integrasi WhatsApp, serta struktur SEO untuk menjangkau pencarian rental kendaraan lokal.",
      highlights: [
        "Katalog armada dengan filter kategori",
        "Halaman detail unit dan harga",
        "Alur booking terintegrasi WhatsApp",
        "Optimasi SEO rental kendaraan lokal",
        "Desain responsif untuk semua perangkat",
      ],
    },
    EN: {
      title: "Vehicle Rental Platform",
      category: "Web Development",
      industry: "Vehicle Rental & Transportation",
      description:
        "A car rental service platform featuring a comprehensive fleet catalog, detailed vehicle pages, a booking flow, testimonials, and FAQs. Designed to convert visitors into direct bookings.",
      challenge:
        "Rahayu Transport needed a website capable of presenting multiple vehicle classes in a structured manner, allowing prospects to compare cars easily and accelerating the booking process.",
      solution:
        "We built a responsive platform with a structured fleet catalog, price and spec details, a simple booking flow, WhatsApp integration, and local SEO structure to rank highly for vehicle rentals.",
      highlights: [
        "Fleet catalog with category filtering",
        "Unit detail and pricing pages",
        "Booking flow integrated with WhatsApp",
        "Local car rental SEO optimization",
        "Responsive design for all devices",
      ],
    },
  },
  {
    id: "02",
    slug: "tahutech-idn",
    image: "/images/projects/TahuTech/tahutech-projects-mockup-1.png",
    gallery: [
      "/images/projects/TahuTech/tahutech-projects-mockup-1.png",
      "/images/projects/TahuTech/tahutech-projects-mockup-2.png",
      "/images/projects/TahuTech/tahutech-projects-mockup-3.png",
    ],
    client: "TahuTech.IDN",
    year: "2026",
    status: "Completed",
    url: "https://tahutechsetup.my.id/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    ID: {
      title: "Gaming Gear Review Platform",
      category: "Pengembangan Web",
      industry: "Review Gaming Gear & Konten",
      description:
        "Platform konten untuk ulasan gaming gear dengan sistem review, tier list, katalog produk, dan integrasi kanal sosial. Fokus pada kecepatan loading dan SEO konten.",
      challenge:
        "TahuTech.IDN membutuhkan pusat konten yang mampu mengorganisasi puluhan review produk gaming, menampilkan rekomendasi secara jelas, dan memperkuat kehadiran brand di luar media sosial.",
      solution:
        "Kami mengembangkan platform konten dengan kategori review, tier list, katalog produk, navigasi yang cepat, serta integrasi Instagram, TikTok, dan YouTube untuk menyatukan seluruh ekosistem konten TahuTech.IDN.",
      highlights: [
        "Sistem review produk terstruktur",
        "Tier list gaming gear",
        "Katalog produk berdasarkan kategori",
        "Integrasi Instagram, TikTok, dan YouTube",
        "Optimasi performa dan SEO konten",
      ],
    },
    EN: {
      title: "Gaming Gear Review Platform",
      category: "Web Development",
      industry: "Gaming Gear Review & Content",
      description:
        "A content platform for gaming gear reviews featuring custom review systems, tier lists, product catalogs, and social channel integrations. Focused on loading speed and content SEO.",
      challenge:
        "TahuTech.IDN required a content hub to organize dozens of gaming product reviews, clearly display recommendations, and strengthen brand presence beyond social media.",
      solution:
        "We developed a content platform with review categories, tier lists, product catalogs, fast navigation, and integrations for Instagram, TikTok, and YouTube to unify TahuTech.IDN's content ecosystem.",
      highlights: [
        "Structured product review system",
        "Gaming gear tier lists",
        "Product catalog grouped by categories",
        "Instagram, TikTok, and YouTube integrations",
        "Performance optimization and content SEO",
      ],
    },
  },
];

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export const REAL_PROJECTS = PROJECTS;
