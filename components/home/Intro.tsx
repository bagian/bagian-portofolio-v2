"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

// Registrasi Plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- DATA TRANSLATION LOKAL (UPDATED CONTENT) ---
const localTranslations = {
  ID: {
    title_line1: "Bukan sekadar kode.",
    title_line2: "Solusi digital menyeluruh.",
    description:
      "Kami menggabungkan riset mendalam, desain intuitif, dan teknologi mutakhir untuk menciptakan produk digital yang tidak hanya berfungsi, tetapi juga memikat.",
    system_spec_label: "Alur Kerja",
    cards: {
      research: {
        tag: "01_RISET",
        title: "Riset & Strategi",
        desc: "Memahami audiens dan pasar sebelum menulis kode. Analisis berbasis data untuk memastikan produk tepat sasaran.",
        metric_label: "Akurasi Data",
        metric_value: "100%",
      },
      design: {
        tag: "02_DESAIN",
        title: "User Experience (UX)",
        desc: "Merancang antarmuka yang berpusat pada manusia. Fokus pada kemudahan penggunaan, estetika visual, dan alur interaksi yang mulus.",
        metric_label: "Kepuasan User",
        metric_value: "5.0/5",
      },
      tech: {
        tag: "03_TEKNOLOGI",
        title: "Modern Tech Stack",
        desc: "Pengembangan full-stack yang handal menggunakan Next.js & React untuk frontend interaktif, Tailwind untuk styling, dan Laravel untuk backend yang kokoh.",
        metric_label: "Stack",
        metric_value: "FULL STACK",
      },
    },
  },
  EN: {
    title_line1: "More than just code.",
    title_line2: "Holistic digital solutions.",
    description:
      "We combine deep research, intuitive design, and cutting-edge technology to create digital products that not only work but captivate.",
    system_spec_label: "Workflow Spec",
    cards: {
      research: {
        tag: "01_RESEARCH",
        title: "Research & Strategy",
        desc: "Understanding audience and market before writing code. Data-driven analysis to ensure product-market fit.",
        metric_label: "Data Accuracy",
        metric_value: "100%",
      },
      design: {
        tag: "02_DESIGN",
        title: "User Experience (UX)",
        desc: "Human-centered interface design. Focusing on usability, visual aesthetics, and seamless interaction flows.",
        metric_label: "User Satisfaction",
        metric_value: "5.0/5",
      },
      tech: {
        tag: "03_TECH",
        title: "Modern Tech Stack",
        desc: "Robust full-stack development using Next.js & React for interactive frontends, Tailwind for styling, and Laravel for a solid backend.",
        metric_label: "Stack",
        metric_value: "FULL STACK",
      },
    },
  },
};

const Intro = () => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Ambil konten berdasarkan bahasa
  const content = localTranslations[lang];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Header Reveal
      tl.from(".intro-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // 2. Cards Stagger
      tl.from(
        ".spec-card",
        {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 3. Line Separator Animation
      tl.from(
        ".tech-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.5,
          ease: "expo.out",
        },
        "-=1.0"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 intro-header">
          <div className="max-w-2xl">
            <div className="mb-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {content.title_line1} <br />
              </h2>
              <span className="text-indigo-700 text-3xl md:text-5xl tracking-tight">
                {content.title_line2}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-mono leading-relaxed max-w-lg">
              {content.description}
            </p>
          </div>

          {/* Decorative Tag */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-mono text-indigo-700 uppercase tracking-widest mb-1">
              {content.system_spec_label}
            </span>
            <span className="text-xl font-bold text-gray-900">v2.0.24</span>
          </div>
        </div>

        {/* --- BENTO GRID SPECS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* CARD 1: RESEARCH (White Card) */}
          <div className="spec-card group relative p-6 md:p-8 bg-[#FAFAFA] rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <div className="mb-6 flex justify-between items-start">
              <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                {/* Icon: Search / Data */}
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                {content.cards.research.tag}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {content.cards.research.title}
            </h3>
            <p className="text-xs text-gray-500 font-mono leading-relaxed mb-6">
              {content.cards.research.desc}
            </p>

            <div className="w-full bg-gray-200 h-px tech-line mb-3"></div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
              <span>{content.cards.research.metric_label}</span>
              <span className="text-orange-600 font-bold">
                {content.cards.research.metric_value}
              </span>
            </div>
          </div>

          {/* CARD 2: UX DESIGN (Dark Card - Highlight) */}
          <div className="spec-card group relative p-6 md:p-8 bg-[#111] rounded-xl border border-gray-800 overflow-hidden text-white">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            <div className="mb-6 flex justify-between items-start relative z-10">
              <div className="w-10 h-10 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center shadow-sm">
                {/* Icon: Design / Pen Tool */}
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                {content.cards.design.tag}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 relative z-10">
              {content.cards.design.title}
            </h3>
            <p className="text-xs text-gray-400 font-mono leading-relaxed mb-6 relative z-10">
              {content.cards.design.desc}
            </p>

            <div className="w-full bg-gray-800 h-px tech-line mb-3 relative z-10"></div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 relative z-10">
              <span>{content.cards.design.metric_label}</span>
              <span className="text-white font-bold">
                {content.cards.design.metric_value}
              </span>
            </div>
          </div>

          {/* CARD 3: TECH STACK (White Card) */}
          <div className="spec-card group relative p-6 md:p-8 bg-[#FAFAFA] rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <div className="mb-6 flex justify-between items-start">
              <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm">
                {/* Icon: Code / Terminal */}
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                {content.cards.tech.tag}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {content.cards.tech.title}
            </h3>
            <p className="text-xs text-gray-500 font-mono leading-relaxed mb-6">
              {content.cards.tech.desc}
            </p>

            {/* Tech Stack Pills (Visual Enhancement) */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[8px] px-1.5 py-0.5 rounded font-mono">
                Next.js
              </span>
              <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[8px] px-1.5 py-0.5 rounded font-mono">
                React
              </span>
              <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[8px] px-1.5 py-0.5 rounded font-mono">
                Tailwind
              </span>
              <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[8px] px-1.5 py-0.5 rounded font-mono">
                Laravel
              </span>
            </div>

            <div className="w-full bg-gray-200 h-px tech-line mb-3"></div>
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
              <span>{content.cards.tech.metric_label}</span>
              <span className="text-blue-600 font-bold">
                {content.cards.tech.metric_value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
