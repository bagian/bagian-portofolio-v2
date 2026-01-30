"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.EN;
}

interface TechItem {
  id: number;
  title: string;
  desc: string;
  list: string[];
  type: "code" | "design" | "motion" | "infra"; // Penentu jenis animasi
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  ID: {
    hero: {
      services: ["Desain UI", "UX Riset", "Pengembangan Web", "Desain Web"],
      location: "Surabaya, Jawa Timur",
      scroll: "[ Terus Gulir ]",
    },
    intro: {
      content:
        "Kami mengundang Anda untuk menjadi bagian dari evolusi digital—sebuah perjalanan kolaboratif di mana kami mengubah baris kode yang kompleks menjadi pengalaman pengguna yang mulus. Dari detail fungsional terkecil hingga visi arsitektur termegah, kami di sini untuk memastikan bahwa merek Anda menjadi bagian penting dari web modern. Mari bangun masa depan digital Anda, bagian demi bagian.",
    },
    navbar: {
      home: "Beranda",
      about: "Tentang",
      services: "Layanan",
      work: "Proyek",
      contact: "Kontak",
      pricing: "Harga",
    },
    projects: {
      title: "Proyek Pilihan",
      items: [
        {
          id: 1,
          name: "Sistem Manajemen Keuangan",
          category: "Pengembangan Web",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          link: "#",
        },
        {
          id: 2,
          name: "Aplikasi E-Commerce Fashion",
          category: "Desain UI/UX",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2370&auto=format&fit=crop",
          link: "#",
        },
        {
          id: 3,
          name: "Platform Edukasi",
          category: "Pengembangan Web",
          image:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop",
          link: "#",
        },
        {
          id: 4,
          name: "Portofolio Fotografer",
          category: "Desain Web",
          image:
            "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2370&auto=format&fit=crop",
          link: "#",
        },
      ],
    },
    process: {
      title: "Alur Kerja",
      steps: [
        {
          title: "Discovery",
          desc: "Tahap awal untuk memahami visi, tujuan, dan tantangan bisnis Anda secara mendalam.",
        },
        {
          title: "Research",
          desc: "Menganalisis kompetitor dan tren pasar untuk menemukan peluang yang unik.",
        },
        {
          title: "Strategy",
          desc: "Menyusun peta jalan teknis dan arsitektur informasi yang solid dan terukur.",
        },
        {
          title: "Visual Design",
          desc: "Mentransformasi konsep menjadi antarmuka visual yang modern, intuitif, dan estetis.",
        },
        {
          title: "Development",
          desc: "Membangun sistem dengan kode yang bersih, performa tinggi, dan standar keamanan terbaru.",
        },
        {
          title: "Deployment",
          desc: "Peluncuran produk ke publik dengan pengujian ketat untuk memastikan segalanya sempurna.",
        },
      ],
    },
    techStack: {
      title: "Arsenet Teknologi",
      items: [
        {
          id: 1,
          title: "Core Development",
          desc: "Membangun fondasi aplikasi yang kokoh dan scalable.",
          list: ["Next.js 14", "React", "TypeScript", "Node.js"],
          type: "code",
        },
        {
          id: 2,
          title: "UI/UX & Design",
          desc: "Merancang antarmuka yang estetis dan fungsional.",
          list: ["Figma", "Adobe Illustrator", "Photoshop"],
          type: "design",
        },
        {
          id: 3,
          title: "Creative Motion",
          desc: "Menghidupkan interaksi web.",
          list: ["GSAP", "Framer Motion", "Three.js"],
          type: "motion",
        },
        {
          id: 4,
          title: "Infrastructure",
          desc: "Deployment dan manajemen versi.",
          list: ["Vercel", "Git", "AWS", "Docker"],
          type: "infra",
        },
      ] as TechItem[], // Casting type array
    },
  },
  EN: {
    hero: {
      services: ["UI Design", "UX Research", "Web Development", "UI/UX Design"],
      location: "Surabaya, East Java",
      scroll: "[ Keep Scrolling ]",
    },
    navbar: {
      home: "Home",
      about: "About",
      services: "Services",
      work: "Work",
      contact: "Contact",
      pricing: "Pricing",
    },
    intro: {
      content:
        "We invite you to be a part of the digital evolution—a collaborative journey where we transform complex lines of code into seamless user experiences. From the smallest functional detail to the grandest architectural vision, we are here to ensure that your brand becomes an essential part of the modern web. Let’s build your digital future, piece by piece.",
    },
    projects: {
      title: "Featured Projects",
      items: [
        {
          id: 1,
          name: "Financial Management System",
          category: "Web Development",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          link: "#",
        },
        {
          id: 2,
          name: "Fashion E-commerce App",
          category: "UI/UX Design",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2370&auto=format&fit=crop",
          link: "#",
        },
        {
          id: 3,
          name: "Interactive Education Platform",
          category: "Web Development",
          image:
            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop",
          link: "#",
        },
        {
          id: 4,
          name: "Photographer Portfolio Site",
          category: "UI/UX Design",
          image:
            "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2370&auto=format&fit=crop",
          link: "#",
        },
      ],
    },
    process: {
      title: "Our Process",
      steps: [
        {
          title: "Discovery",
          desc: "Initial phase to deeply understand your vision, goals, and business challenges.",
        },
        {
          title: "Research",
          desc: "Analyzing competitors and market trends to identify unique opportunities for your brand.",
        },
        {
          title: "Strategy",
          desc: "Crafting a solid technical roadmap and scalable information architecture.",
        },
        {
          title: "Visual Design",
          desc: "Transforming concepts into modern, intuitive, and aesthetically pleasing visual interfaces.",
        },
        {
          title: "Development",
          desc: "Building systems with clean code, high performance, and the latest security standards.",
        },
        {
          title: "Deployment",
          desc: "Launching the product to the public with rigorous testing to ensure everything is perfect.",
        },
      ],
    },
    techStack: {
      title: "Technology Stack",
      items: [
        {
          id: 1,
          title: "Core Development",
          desc: "Building solid and scalable application foundations.",
          list: ["Next.js 14", "React", "TypeScript", "Node.js"],
          type: "code",
        },
        {
          id: 2,
          title: "UI/UX & Design",
          desc: "Crafting aesthetic and functional interfaces.",
          list: ["Figma", "Adobe Illustrator", "Photoshop"],
          type: "design",
        },
        {
          id: 3,
          title: "Creative Motion",
          desc: "Bringing web interactions to life.",
          list: ["GSAP", "Framer Motion", "Three.js"],
          type: "motion",
        },
        {
          id: 4,
          title: "Infrastructure",
          desc: "Deployment and version control.",
          list: ["Vercel", "Git", "AWS", "Docker"],
          type: "infra",
        },
      ] as TechItem[],
    },
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN");

  const value = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage harus digunakan di dalam LanguageProvider");
  return context;
};
