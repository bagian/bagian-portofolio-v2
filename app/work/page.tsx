"use client";

import React, { useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// --- 1. DATA TRANSLATION ---
const CONTENT = {
  ID: {
    header: {
      label: "Direktori Proyek",
      title_1: "Selected",
      title_2: "Works",
      desc: "Kumpulan studi kasus terpilih dalam Branding & Engineering.",
      stats: { total: "Total Entri", year: "Tahun" },
    },
    footer: { cta: "Mulai Proyek Baru" },
  },
  EN: {
    header: {
      label: "Project Directory",
      title_1: "Selected",
      title_2: "Works",
      desc: "Curated case studies in Branding & Engineering.",
      stats: { total: "Total Entries", year: "Year" },
    },
    footer: { cta: "Start New Project" },
  },
};

// --- 2. DATA PROJECT ---
// PENTING: Untuk 'video', isi 'src' HANYA dengan ID YouTube (contoh: 'LxB3EKWsInQ'), bukan URL lengkap.
const projects = [
  {
    id: "01",
    type: "video",
    src: "J6A7JcbkWvM", // ID Youtube (Technology/Abstract)
    client: "Bagian Corps",
    title: "Branding System",
    category: "Identity",
    year: "2025",
    link: "/work/bagian-corps",
  },
  {
    id: "02",
    type: "image",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2560&auto=format&fit=crop",
    client: "Clean Laundry",
    title: "SaaS Platform",
    category: "Web App",
    year: "2025",
    link: "/work/laundry-app",
  },
  {
    id: "03",
    type: "video",
    src: "awUYikrGsKk", // ID Youtube (Coding Time Lapse)
    client: "FinTech Global",
    title: "Finance Viz",
    category: "Dashboard",
    year: "2026",
    link: "/work/finance-viz",
  },
  {
    id: "04",
    type: "image",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
    client: "Studio Art",
    title: "3D Portfolio",
    category: "Creative",
    year: "2026",
    link: "/work/portfolio-v1",
  },
  {
    id: "05",
    type: "image",
    src: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2560&auto=format&fit=crop",
    client: "Urban Store",
    title: "E-Commerce",
    category: "Retail",
    year: "2025",
    link: "/work/ecommerce",
  },
  {
    id: "06",
    type: "video",
    src: "N8Shh0mo8vw", // ID Youtube (Abstract UI)
    client: "AI Tech",
    title: "Chatbot AI",
    category: "Machine Learning",
    year: "2026",
    link: "/work/chatbot",
  },
];

const bannerprojects = [
  {
    id: "01",
    type: "video",
    src: "GrtumcQkzsk", // ID Youtube (Technology/Abstract)
    client: "Bagian Corps",
    title: "Branding System",
    category: "Identity",
    year: "2025",
    link: "/work/bagian-corps",
  },
];

export default function WorkPage() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useMemo(() => (lang === "ID" ? CONTENT.ID : CONTENT.EN), [lang]);

  // Memisahkan kolom Kiri (Genap) dan Kanan (Ganjil)
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 !== 0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi Header
      gsap.from(".header-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animasi Reveal Kartu saat Scroll
      const cards = gsap.utils.toArray<HTMLElement>(".project-card-container");
      cards.forEach((card) => {
        gsap.from(card, {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  // --- 3. KOMPONEN KARTU (Fixed Iframe & Overlay) ---
  const ProjectCard = ({ item }: { item: (typeof projects)[0] }) => (
    <div className="project-card-container relative group mb-24 md:mb-40 w-full">
      {/* LINK OVERLAY: Menutupi seluruh kartu, z-index paling atas */}
      <Link
        href={item.link}
        className="absolute inset-0 z-50 w-full h-full cursor-pointer"
        aria-label={`View project ${item.title}`}
      >
        <span className="sr-only">View Project</span>
      </Link>

      {/* MEDIA CONTAINER */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-6 border border-transparent group-hover:border-gray-200 transition-colors rounded-xl">
        {/* LOGIKA RENDER MEDIA */}
        {item.type === "video" ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            {/* IFRAME WRAPPER (Zoom/Crop Technique) */}
            {/* Scale 300% width untuk memaksa video 16:9 mengisi container 3:4 tanpa bar hitam */}
            <div className="absolute top-1/2 left-1/2 w-[280%] h-[280%] -translate-x-1/2 -translate-y-1/2">
              <iframe
                className="w-full h-full  group-hover:opacity-100 transition-opacity duration-700"
                src={`https://www.youtube.com/embed/${item.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.src}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1&vq=hd1080`}
                allow="autoplay; encrypted-media"
                title={item.title}
                loading="lazy"
                style={{ pointerEvents: "none" }} // Mencegah interaksi mouse dengan video
              />
            </div>
            {/* Lapisan keamanan tambahan */}
            <div className="absolute inset-0 bg-transparent z-10"></div>
          </div>
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            quality={100}
            loading="lazy"
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        )}

        {/* ID Badge Floating */}
        <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-mono font-bold uppercase text-black border border-gray-200">
            ID_{item.id}
          </span>
        </div>
      </div>

      {/* TEXT INFO */}
      <div className="flex flex-row items-start relative z-10 pointer-events-none justify-between w-full">
        <div>
          <span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:underline underline-offset-4 decoration-1 decoration-gray-300">
              {item.title}
            </h2>
          </span>
        </div>
        <div className="flex items-center relative z-10 pointer-events-none gap-4">
          <div className="flex flex-col items-end">
            <div className="flex flex-row items-center gap-4">
              <span className="text-[10px] font-mono uppercase text-gray-400">
                {item.year}
              </span>
              <span className="w-8 h-[1px] bg-gray-300"></span>
              <span className="text-[10px] font-mono uppercase text-gray-400">
                {item.category}
              </span>
            </div>
            <p className="text-xs font-mono text-gray-500 mt-2">
              {item.client}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const BannerCard = ({ banner }: { banner: (typeof bannerprojects)[0] }) => (
    <div className="project-card-container relative group mb-24 md:mb-40 w-full">
      <Link
        href={banner.link}
        className="absolute inset-0 z-50 w-full h-full cursor-pointer"
        aria-label={`View project ${banner.title}`}
      >
        <span className="sr-only">View Project</span>
      </Link>
      <div className="relative w-full md:aspect-[9/5] aspect-[4/4] overflow-hidden bg-gray-100 mb-6 border border-transparent group-hover:border-gray-200 transition-colors rounded-xl shadow-2xl">
        {banner.type === "video" ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
            {/* IFRAME WRAPPER (Zoom/Crop Technique) */}
            {/* Scale 300% width untuk memaksa video 16:9 mengisi container 3:4 tanpa bar hitam */}
            <div className="absolute top-1/2 left-1/2 md:w-[100%] md:h-[200%] w-[280%] h-[280%] -translate-x-1/2 -translate-y-1/2">
              <iframe
                className="w-full h-full  group-hover:opacity-100 transition-opacity duration-700"
                src={`https://www.youtube.com/embed/${banner.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${banner.src}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1&vq=hd1080`}
                allow="autoplay; encrypted-media"
                title={banner.title}
                loading="lazy"
                style={{ pointerEvents: "none" }} // Mencegah interaksi mouse dengan video
              />
            </div>
            {/* Lapisan keamanan tambahan */}
            <div className="absolute inset-0 bg-transparent z-10"></div>
          </div>
        ) : (
          <Image
            src={banner.src}
            alt={banner.title}
            quality={100}
            loading="lazy"
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        )}
        {/* ID Badge Floating */}
        <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-white/90 backdrop-blur px-2 py-1 text-[10px] font-mono font-bold uppercase text-black border border-gray-200">
            ID_{banner.id}
          </span>
        </div>
      </div>
      {/* TEXT INFO */}
      <div className="flex flex-row items-start relative z-10 pointer-events-none justify-between w-full">
        <div>
          <span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:underline underline-offset-4 decoration-1 decoration-gray-300">
              {banner.title}
            </h2>
          </span>
        </div>
        <div className="flex items-center relative z-10 pointer-events-none">
          <div className="flex flex-col items-end">
            <div className="flex flex-row items-center gap-4">
              <span className="text-[10px] font-mono uppercase text-gray-400">
                {banner.year}
              </span>
              <span className="w-8 h-[1px] bg-gray-300"></span>
              <span className="text-[10px] font-mono uppercase text-gray-400">
                {banner.category}
              </span>
            </div>
            <p className="text-xs font-mono text-gray-500 mt-2">
              {banner.client}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <main
      ref={containerRef}
      className="min-h-screen pb-32 font-sans max-w-7xl mx-auto"
    >
      <div className="pt-32 md:pt-48">
        {/* --- HEADER --- */}
        <header className="max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-48">
          <div className="border-b border-black pb-8 flex flex-col md:flex-row justify-between w-full md:items-end">
            <div className="header-anim">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                / {t.header.label}
              </p>
              <h1 className="text-5xl md:text-[10rem] font-medium tracking-tighter leading-[0.8]">
                {t.header.title_1}
                <span className="text-indigo-700 font-extrabold">
                  {t.header.title_2}
                </span>
              </h1>
            </div>
            <div className="header-anim text-right mt-8 md:mt-0 items-end flex flex-col">
              <p className="text-xs font-mono uppercase text-gray-500 mb-1">
                {t.header.stats.total}
              </p>
              <p className="text-xl font-mono font-bold">0{projects.length}</p>
            </div>
          </div>
        </header>

        {/* --- MAIN GRID (Staggered Layout) --- */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col w-full mb-12">
            {bannerprojects.map((banner) => (
              <BannerCard key={banner.id} banner={banner} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-4 w-full">
            {/* KOLOM KIRI (Normal Flow) */}
            <div className="flex flex-col">
              {leftColumn.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </div>

            {/* KOLOM KANAN (Offset/Turun - Staggered Effect) */}
            <div className="flex flex-col md:pt-48">
              {rightColumn.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 pt-20 border-t border-gray-200 text-center">
          <Link
            href="/contact"
            className="inline-block text-4xl md:text-8xl font-black uppercase hover:text-indigo-700 transition-colors cursor-pointer"
          >
            {t.footer.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}
