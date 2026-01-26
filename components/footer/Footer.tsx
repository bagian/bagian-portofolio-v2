"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const localTranslations = {
  ID: {
    cta: {
      status: "Available for Work",
      title: "Siap Memulai ?",
      subtitle: "Mari ubah ide kompleks menjadi produk digital yang solid.",
      btn: "Mulai Proyek",
    },
    footer: {
      brand_desc:
        "Studio pengembangan web yang berfokus pada performa, estetika, dan skalabilitas.",
      menu_title: "Menu",
      menu_items: [
        { label: "Beranda", href: "/" },
        { label: "Layanan", href: "/services" },
        { label: "Proyek", href: "/work" },
        { label: "Tentang", href: "/about" },
        { label: "Kontak", href: "/contact" },
      ],
      social_title: "Sosial",
      social_items: [
        { label: "Instagram", href: "https://www.instagram.com/bagian.corps/" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "GitHub", href: "https://github.com" },
      ],
      service_title: "Services",
      service_items: [
        {
          label: "UI/UX Design",
          href: "/services/ui-ux-design",
        },
        {
          label: "Web Development",
          href: "/services/web-development",
        },
        {
          label: "Web Maintenance",
          href: "/services/maintenance",
        },
        {
          label: "Custom CMS",
          href: "/services/custom-cms",
        },
        {
          label: "Performance Tuning",
          href: "/services/performance-tuning",
        },
      ],
      contact_title: "Kontak",
      email: "bagian.desk@bagian.com",
      location: "Surabaya, IDN",
      copy: "© 2026 BAGIAN. Hak Cipta Dilindungi.",
    },
  },
  EN: {
    cta: {
      status: "Available for Work",
      title: "Ready to deploy ?",
      subtitle: "Let's turn complex ideas into solid digital products.",
      btn: "Start Project",
    },
    footer: {
      brand_desc:
        "Web development studio focused on performance, aesthetics, and scalability.",
      menu_title: "Menu",
      menu_items: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      social_title: "Socials",
      social_items: [
        { label: "Instagram", href: "https://www.instagram.com/bagian.corps/" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "GitHub", href: "https://github.com" },
      ],
      service_title: "Services",
      service_items: [
        {
          label: "UI/UX Design",
          href: "/services/ui-ux-design",
        },
        {
          label: "Web Development",
          href: "/services/web-development",
        },
        {
          label: "Web Maintenance",
          href: "/services/maintenance",
        },
        {
          label: "Custom CMS",
          href: "/services/custom-cms",
        },
        {
          label: "Performance Tuning",
          href: "/services/performance-tuning",
        },
      ],
      contact_title: "Contact",
      email: "bagian.desk@bagian.com",
      location: "Surabaya, IDN",
      copy: "© 2026 BAGIAN. All Rights Reserved.",
    },
  },
};

const FooterCTA = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%", // Trigger sedikit lebih awal
        },
      });

      // 1. Animasi Bagian CTA (Atas)
      tl.from(".cta-anim", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all", // PENTING: Menghapus properti inline setelah animasi selesai agar tidak ada konflik CSS
      });

      // 2. Animasi Divider Line
      tl.from(
        ".footer-divider",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "expo.out",
        },
        "-=0.5"
      );

      // 3. Animasi Bagian Footer Bawah (Kolom)
      tl.from(
        ".footer-anim",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="w-full bg-[#111] text-white pt-24 pb-12 px-4  relative"
    >
      {/* Grid Overlay Decoration */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 0.1px), linear-gradient(90deg, #fff 0.1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10 p-3">
        {/* === BAGIAN 1: CTA (CENTERED) === */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="cta-anim mb-8">
            <span className="inline-flex items-center px-4 py-1.5 border border-gray-800 rounded-full text-[10px] font-mono uppercase tracking-widest text-gray-400 bg-[#1A1A1A]">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
              {content.cta.status}
            </span>
          </div>

          <h2 className="cta-anim text-5xl md:text-8xl font-medium tracking-tight mb-6 leading-none font-array bg-gradient-to-r from-rose-500 via-white to-rose-500 bg-clip-text text-transparent">
            {content.cta.title}
          </h2>

          <p className="cta-anim text-gray-400 font-mono text-sm md:text-base mb-10 max-w-lg">
            {content.cta.subtitle}
          </p>
          <div className="cta-anim">
            <a
              href={`mailto:${content.footer.email}`}
              className="group relative inline-flex items-center justify-center md:px-10 md:py-5 px-7 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:bg-gray-200"
            >
              <span className="relative z-10 font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                {content.cta.btn}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Divider */}
        {/* <div className="footer-divider w-full h-px bg-white/20 mb-16"></div> */}

        {/* === BAGIAN 2: FOOTER NAVIGATION (4 COLUMNS) === */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-20 md:gap-6 mb-16">
          {/* Col 1: Brand Info (Span 4) */}
          <div className="md:col-span-3 footer-anim">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter mb-4 block"
            >
              BAGIAN®
            </Link>
            <p className="text-sm text-gray-500 font-mono leading-relaxed max-w-xs">
              {content.footer.brand_desc}
            </p>
          </div>
          {/* Col 2: Services (Span 2) */}
          <div className="md:col-span-2 footer-anim">
            <h4 className="text-[14px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
              {content.footer.service_title}
            </h4>
            <ul className="flex flex-col gap-3">
              {content.footer.service_items.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                  >
                    {item.label}
                    <svg
                      className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Menu (Span 2) */}
          <div className="md:col-span-2 footer-anim">
            <h4 className="text-[14px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
              {content.footer.menu_title}
            </h4>
            <ul className="flex flex-col gap-3">
              {content.footer.menu_items.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                  >
                    {item.label}
                    <svg
                      className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Socials (Span 3) */}
          <div className="md:col-span-2 footer-anim">
            <h4 className="text-[14px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
              {content.footer.social_title}
            </h4>
            <ul className="flex flex-col gap-3">
              {content.footer.social_items.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                  >
                    {item.label}
                    <svg
                      className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact (Span 3) */}
          <div className="md:col-span-3 footer-anim">
            <h4 className="text-[14px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
              {content.footer.contact_title}
            </h4>
            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${content.footer.email}`}
                className="text-sm text-white hover:underline decoration-gray-500 underline-offset-4"
              >
                {content.footer.email}
              </a>
              <span className="text-sm text-gray-500">
                {content.footer.location}
              </span>
            </div>
          </div>
        </div>

        {/* === BAGIAN 3: COPYRIGHT (BOTTOM BAR) === */}
        <div className="footer-anim pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-widest gap-4">
          <p>{content.footer.copy}</p>
          <p>Designed & Built by Bagian Corps</p>
        </div>
      </div>
      {/* Footer Decorative Line */}
      <div className="absolute -top-2 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-black to-red-500 opacity-20"></div>
    </footer>
  );
};

export default FooterCTA;
