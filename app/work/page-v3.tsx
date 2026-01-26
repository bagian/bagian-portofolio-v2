"use client";

import React, { useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// --- DATA TRANSLATION ---
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

// DATA PROJECT (MIXED: IMAGE & VIDEO)
const projects = [
  {
    id: "01",
    type: "video", // TIPE VIDEO
    src: "https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-4654/1080p.mp4", // Contoh Video URL
    client: "Bagian Corps",
    title: "Branding System",
    category: "Identity",
    year: "2025",
    link: "/work/bagian-corps",
  },
  {
    id: "02",
    type: "image", // TIPE GAMBAR
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2560&auto=format&fit=crop",
    client: "Clean Laundry",
    title: "SaaS Platform",
    category: "Web App",
    year: "2025",
    link: "/work/laundry-app",
  },
  {
    id: "03",
    type: "video", // TIPE VIDEO
    src: "https://cdn.coverr.co/videos/coverr-coding-on-laptop-screen-4537/1080p.mp4",
    client: "FinTech Global",
    title: "Finance Viz",
    category: "Dashboard",
    year: "2026",
    link: "/work/finance-viz",
  },
  {
    id: "04",
    type: "image", // TIPE GAMBAR
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
    client: "Studio Art",
    title: "3D Portfolio",
    category: "Creative",
    year: "2026",
    link: "/work/portfolio-v1",
  },
  {
    id: "05",
    type: "image", // TIPE GAMBAR
    src: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2560&auto=format&fit=crop",
    client: "Urban Store",
    title: "E-Commerce",
    category: "Retail",
    year: "2025",
    link: "/work/ecommerce",
  },
  {
    id: "06",
    type: "video", // TIPE VIDEO
    src: "https://www.youtube.com/watch?v=oNOCq-_mLH4",
    client: "AI Tech",
    title: "Chatbot AI",
    category: "Machine Learning",
    year: "2026",
    link: "/work/chatbot",
  },
];

export default function WorkPage() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useMemo(() => (lang === "ID" ? CONTENT.ID : CONTENT.EN), [lang]);

  // STAGGERED GRID LOGIC
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 !== 0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Anim
      gsap.from(".header-anim", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Card Reveal Anim
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

  // --- KOMPONEN KARTU (SUPPORT VIDEO & IMAGE) ---
  const ProjectCard = ({ item }: { item: (typeof projects)[0] }) => (
    <Link
      href={item.link}
      className="project-card-container block group mb-24 md:mb-40 w-full"
    >
      {/* MEDIA CONTAINER */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
        {/* LOGIKA RENDER BERDASARKAN TYPE */}
        {item.type === "video" ? (
          <video
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        )}

        {/* Overlay (Optional: Vignette effect on hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none"></div>

        {/* ID Badge */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white px-2 py-1 text-[10px] font-mono font-bold uppercase text-black">
            ID_{item.id}
          </span>
        </div>
      </div>

      {/* TEXT INFO */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono uppercase text-gray-400">
            {item.year}
          </span>
          <span className="w-8 h-[1px] bg-gray-300"></span>
          <span className="text-[10px] font-mono uppercase text-gray-400">
            {item.category}
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:underline underline-offset-4 decoration-1 decoration-gray-300">
          {item.title}
        </h2>
        <p className="text-xs font-mono text-gray-500 mt-2">
          Client: {item.client}
        </p>
      </div>
    </Link>
  );

  return (
    <main
      ref={containerRef}
      className="bg-white text-black min-h-screen pb-32 font-sans"
    >
      <div className="pt-32 md:pt-48">
        {/* --- HEADER --- */}
        <header className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 md:mb-48">
          <div className="border-b border-black pb-8 flex flex-col md:flex-row justify-between items-end">
            <div className="header-anim">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
                / {t.header.label}
              </p>
              <h1 className="text-7xl md:text-[10rem] font-medium tracking-tighter leading-[0.8]">
                {t.header.title_1}
                <span className="text-gray-300">{t.header.title_2}</span>
              </h1>
            </div>
            <div className="header-anim text-right mt-8 md:mt-0">
              <p className="text-xs font-mono uppercase text-gray-500 mb-1">
                {t.header.stats.total}
              </p>
              <p className="text-xl font-mono font-bold">0{projects.length}</p>
            </div>
          </div>
        </header>

        {/* --- GRID UTAMA (STAGGERED) --- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 w-full">
            {/* KOLOM KIRI */}
            <div className="flex flex-col">
              {leftColumn.map((item) => (
                <ProjectCard key={item.id} item={item} />
              ))}
            </div>

            {/* KOLOM KANAN (Staggered Offset) */}
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
            className="inline-block text-4xl md:text-8xl font-black uppercase hover:text-gray-400 transition-colors cursor-pointer"
          >
            {t.footer.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}
