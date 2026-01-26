"use client";

import React, { useRef } from "react";
import Link from "next/link"; // 1. Import Link
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const localTranslations = {
  ID: {
    label: "Kapabilitas",
    title: "Layanan Teknis",
    items: [
      {
        id: "01",
        title: "Web Development",
        desc: "Membangun aplikasi web skalabel dengan React & Next.js.",
        tags: ["Frontend", "Backend", "API"],
        href: "/services/web-development", // 2. Masukkan href di sini
      },
      {
        id: "02",
        title: "UI/UX Design",
        desc: "Perancangan antarmuka yang fokus pada konversi dan estetika.",
        tags: ["Wireframe", "Prototyping", "Design System"],
        href: "/services/ui-ux-design",
      },
      {
        id: "03",
        title: "Performance Tuning",
        desc: "Optimasi kecepatan website untuk skor hijau di Core Web Vitals.",
        tags: ["SEO", "Speed", "Optimization"],
        href: "/services/performance",
      },
      {
        id: "04",
        title: "System Maintenance",
        desc: "Pemeliharaan berkala, keamanan, dan update infrastruktur.",
        tags: ["Security", "Backup", "Monitoring"],
        href: "/services/maintenance",
      },
      {
        id: "05",
        title: "Kustom CMS",
        desc: "Kontrol penuh atas konten Anda tanpa kerumitan teknis.",
        tags: [
          "Panel Admin Kustom",
          "Integrasi Database Real-time",
          "Manajemen Konten Dinamis",
        ],
        href: "/services/custome-cms",
      },
    ],
  },
  EN: {
    label: "Capabilities",
    title: "Technical Services",
    items: [
      {
        id: "01",
        title: "Web Development",
        desc: "Building scalable web applications with React & Next.js.",
        tags: ["Frontend", "Backend", "API"],
        href: "/services/web-development",
      },
      {
        id: "02",
        title: "UI/UX Design",
        desc: "Interface design focused on conversion and aesthetics.",
        tags: ["Wireframe", "Prototyping", "Design System"],
        href: "/services/ui-ux-design",
      },
      {
        id: "03",
        title: "Performance Tuning",
        desc: "Website speed optimization for green Core Web Vitals scores.",
        tags: ["SEO", "Speed", "Optimization"],
        href: "/services/performance-tuning",
      },
      {
        id: "04",
        title: "System Maintenance",
        desc: "Regular maintenance, security patching, and infra updates.",
        tags: ["Security", "Backup", "Monitoring"],
        href: "/services/maintenance",
      },
      {
        id: "05",
        title: "Custom CMS",
        desc: "Full control over your content without technical complexity.",
        tags: [
          "Custom Admin Panel",
          "Real-time Database Integration",
          "Content Management System",
        ],
        href: "/services/custom-cms",
      },
    ],
  },
};

const Services = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".service-card", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            overwrite: true,
          });
        },
        once: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#FAFAFA] py-24 px-4 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
            / {content.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-[#1A1A1A]">
            {content.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {content.items.map((item, i) => (
            /* 3. Ganti div dengan Link dan tambahkan href={item.href} */
            <Link
              href={item.href}
              key={i}
              className="service-card opacity-0 translate-y-12 group bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300 block" // Tambahkan 'block' agar area klik penuh
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors">
                  <span className="font-mono text-xs font-bold">{item.id}</span>
                </div>
                <svg
                  className="w-5 h-5 text-gray-300 group-hover:text-black transform group-hover:rotate-45 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 font-mono mb-6 leading-relaxed">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] uppercase font-bold tracking-wider bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
