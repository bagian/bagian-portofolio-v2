"use client";

import React, { useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "@/context/LanguageContext"; // Import Context

gsap.registerPlugin(ScrollTrigger);

// --- DATA TRANSLATION ---
const CONTENT = {
  ID: {
    header: {
      label: "/ Direktori Proyek",
      title_1: "Karya",
      title_2: "Terpilih.",
      desc_prefix: "Kumpulan studi kasus terpilih yang berfokus pada",
      desc_highlight: ["Sistem Branding", "Web Engineering", "User Experience"],
      desc_suffix: "Dirancang untuk skalabilitas dan performa.",
      stats: {
        total: "Total Entri",
        year: "Rentang Tahun",
        status: "Status",
        status_val: "Siap Bekerja",
      },
    },
    footer: {
      end: "[ AKHIR INDEKS ]",
      cta: "Mulai Di Sini.",
    },
    view_project: "Lihat Proyek",
  },
  EN: {
    header: {
      label: "/ Project_Directory",
      title_1: "Selected",
      title_2: "Works.",
      desc_prefix: "A curated collection of case studies focused on",
      desc_highlight: [
        "Branding Systems",
        "Web Engineering",
        "User Experience",
      ],
      desc_suffix: "Designed for scalability and performance.",
      stats: {
        total: "Total Entries",
        year: "Year Range",
        status: "Status",
        status_val: "Open for Work",
      },
    },
    footer: {
      end: "[ END OF INDEX ]",
      cta: "Start Here.",
    },
    view_project: "View Project",
  },
};

const projects = [
  {
    id: "01",
    client: "Bagian Corps",
    title: "Branding System",
    category: "Identity",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1768836180164-070b4c1a8f94?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/work/bagian-corps",
    layout: "wide-right",
  },
  {
    id: "02",
    client: "Clean Laundry",
    title: "SaaS Platform",
    category: "Web App",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2560&auto=format&fit=crop",
    link: "/work/laundry-app",
    layout: "half-split",
  },
  {
    id: "03",
    client: "FinTech Global",
    title: "Finance Viz",
    category: "Dashboard",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop",
    link: "/work/finance-viz",
    layout: "wide-left",
  },
  {
    id: "04",
    client: "Studio Art",
    title: "3D Portfolio",
    category: "Creative",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
    link: "/work/portfolio-v1",
    layout: "panoramic",
  },
  {
    id: "05",
    client: "Urban Store",
    title: "E-Commerce",
    category: "Retail",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2560&auto=format&fit=crop",
    link: "/work/ecommerce",
    layout: "wide-right",
  },
];

export default function WorkPage() {
  const { lang } = useLanguage(); // Gunakan Hook Language
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize content based on lang
  const t = useMemo(() => (lang === "ID" ? CONTENT.ID : CONTENT.EN), [lang]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".header-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Project Row Reveal
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      rows.forEach((row) => {
        gsap.from(row.querySelectorAll(".reveal-content"), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]); // Re-run animation if lang changes (optional)

  return (
    <main ref={containerRef} className="min-h-screen pb-32 max-w-7xl mx-auto">
      <div className="pt-32 md:pt-40">
        {/* --- HEADER (Multilingual) --- */}
        <header className="px-6 mb-20 md:mb-32">
          {/* Top Label */}
          <div className="flex items-center gap-2 mb-8 header-anim">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              {t.header.label}
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Left: Main Title */}
            <div className="relative header-anim">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                {t.header.title_1}
                <br />
                <span className="text-gray-200">{t.header.title_2}</span>
              </h1>

              <div className="hidden md:block absolute -right-12 top-0">
                <span className="text-[10px] font-mono border border-black px-1 rounded-sm">
                  V.2.0
                </span>
              </div>
            </div>

            {/* Right: Context & Data */}
            <div className="w-full max-w-md header-anim">
              <p className="text-sm leading-relaxed text-gray-600 mb-8 border-l-2 border-gray-200 pl-4">
                {t.header.desc_prefix}{" "}
                <span className="text-black font-bold">
                  {t.header.desc_highlight[0]}
                </span>
                ,{" "}
                <span className="text-black font-bold">
                  {t.header.desc_highlight[1]}
                </span>
                , {lang === "ID" ? "dan" : "and"}{" "}
                <span className="text-black font-bold">
                  {t.header.desc_highlight[2]}
                </span>
                . {t.header.desc_suffix}
              </p>

              {/* Data Grid Small */}
              <div className="grid grid-cols-2 gap-y-4 border-t border-black pt-4">
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    {t.header.stats.total}
                  </span>
                  <span className="text-xl font-bold font-mono">
                    0{projects.length}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    {t.header.stats.year}
                  </span>
                  <span className="text-xl font-bold font-mono">2025 — 26</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                    {t.header.stats.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase">
                      {t.header.stats.status_val}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <ArrowLongRightIcon className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- PROJECT LIST --- */}
        <div className="flex flex-col border-t border-black">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              className="project-row group block relative w-full border-b border-gray-200 hover:bg-gray-50 transition-colors duration-500"
            >
              <div
                className={`flex flex-col md:flex-row min-h-[400px] md:min-h-[500px] 
                ${project.layout === "wide-right" ? "" : ""}
                ${project.layout === "wide-left" ? "md:flex-row-reverse" : ""}
                ${project.layout === "panoramic" ? "md:flex-col" : ""}
              `}
              >
                {/* Info Section */}
                <div
                  className={`
                  relative p-6 md:p-12 flex flex-col justify-between border-r border-gray-200
                  ${project.layout === "wide-right" ? "md:w-[35%]" : ""}
                  ${project.layout === "wide-left" ? "md:w-[40%] md:border-l md:border-r-0" : ""}
                  ${project.layout === "half-split" ? "md:w-[50%]" : ""}
                  ${project.layout === "panoramic" ? "md:w-full md:flex-row md:items-end md:h-auto md:py-8 md:border-r-0" : ""}
                `}
                >
                  <div className="reveal-content">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-2 py-1 border border-black text-[10px] font-mono font-bold uppercase">
                        {project.id}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-gray-400">
                        {project.year}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight uppercase mb-2">
                      {project.title}
                    </h2>
                    <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                      &#47;&#47; {project.client}
                    </p>
                  </div>

                  <div
                    className={`reveal-content ${project.layout === "panoramic" ? "hidden md:flex md:gap-4 md:items-center" : "mt-8"}`}
                  >
                    {/* {project.layout === "panoramic" && (
                      <span className="text-xs font-mono uppercase text-gray-400 mr-4">
                        {t.full_case}
                      </span>
                    )} */}
                    <div className="flex items-center gap-4 group-hover:gap-8 transition-all duration-300">
                      <span className="text-sm font-bold uppercase border-b border-black pb-1">
                        {t.view_project}
                      </span>
                      <ArrowLongRightIcon className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div
                  className={`
                  relative overflow-hidden bg-gray-200
                  ${project.layout === "wide-right" ? "md:w-[65%]" : ""}
                  ${project.layout === "wide-left" ? "md:w-[60%]" : ""}
                  ${project.layout === "half-split" ? "md:w-[50%]" : ""}
                  ${project.layout === "panoramic" ? "w-full h-[300px] md:h-[600px] order-first md:order-last" : "h-[300px] md:h-auto"}
                `}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20"></div>
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/20"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- FOOTER (Multilingual) --- */}
        <div className="mt-20 px-6 md:px-12 flex justify-between items-center">
          <p className="text-xs font-mono text-gray-400">{t.footer.end}</p>
          <Link
            href="/contact"
            className="text-4xl md:text-6xl font-black uppercase hover:text-gray-500 transition-colors"
          >
            {t.footer.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}
