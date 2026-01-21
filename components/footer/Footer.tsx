"use client";

import React, { useLayoutEffect, useRef, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const CONTENT = {
  ID: {
    cta_title: "Siap membuat dampak?",
    cta_desc: "Jangan biarkan ide Anda hanya menjadi wacana. Mari eksekusi.",
    cta_btn: "Mulai Proyek",

    col_services: "Layanan",
    col_company: "Perusahaan",
    col_social: "Sosial",
    col_contact: "Hubungi",

    services: [
      { name: "Website Design", href: "/services/ui-ux-design" },
      { name: "Web Application", href: "/services/web-development" },
      { name: "Maintenance", href: "/services/maintenance" },
      { name: "Custom CMS", href: "/services/custom-cms" },
    ],
    company: [
      { name: "Beranda", href: "/" },
      { name: "Tentang Kami", href: "/about" },
      { name: "Karir", href: "/careers" },
      { name: "Kontak", href: "/contact" },
    ],
    legal: ["Privasi", "Syarat & Ketentuan"],
    copyright: "Hak Cipta Dilindungi.",
    address: "Sidoarjo, Jawa Timur, Indonesia",
  },
  EN: {
    cta_title: "Ready to make an impact?",
    cta_desc: "Don't let your ideas stay as just ideas. Let's execute.",
    cta_btn: "Start Project",

    col_services: "Services",
    col_company: "Company",
    col_social: "Socials",
    col_contact: "Contact",

    services: [
      { name: "Website Design", href: "/services/website-design" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Maintenance", href: "/services/maintenance" },
      { name: "Custom CMS", href: "/services/custom-cms" },
    ],
    company: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    legal: ["Privacy Policy", "Terms & Conditions"],
    copyright: "All Rights Reserved.",
    address: "Sidoarjo, East Java, Indonesia",
  },
};

const SOCIALS = [
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "GitHub", href: "#" },
];

const Footer = () => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const t = useMemo(() => (lang === "EN" ? CONTENT.EN : CONTENT.ID), [lang]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-card", {
        y: 100,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".footer-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Animated color-changing blobs
      if (blob1Ref.current && blob2Ref.current) {
        // Blob 1 - Color animation
        gsap.to(blob1Ref.current, {
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(blob1Ref.current, {
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
          duration: 6,
          delay: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Blob 1 - Movement (reduced on mobile)
        const isMobile = window.innerWidth < 768;
        gsap.to(blob1Ref.current, {
          x: isMobile ? "5vw" : "10vw",
          y: isMobile ? "5vh" : "10vh",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Blob 2 - Color animation
        gsap.to(blob2Ref.current, {
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(blob2Ref.current, {
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
          duration: 7,
          delay: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Blob 2 - Movement (reduced on mobile)
        gsap.to(blob2Ref.current, {
          x: isMobile ? "-5vw" : "-10vw",
          y: isMobile ? "-5vh" : "-8vh",
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={containerRef}
      className="bg-white pt-12 pb-6 px-4 md:px-6 overflow-hidden"
    >
      <div className="footer-card bg-[#050505] text-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[600px] flex flex-col justify-between max-w-full">
        {/* Animated Blob 1 */}
        <div
          ref={blob1Ref}
          className="absolute top-[5%] right-[5%] md:top-[-20%] md:right-[-10%] w-[220px] h-[220px] md:w-[90vw] md:h-[90vw] md:max-w-[900px] md:max-h-[900px] rounded-full blur-[40px] md:blur-[20px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
          }}
        ></div>

        {/* Animated Blob 2 */}
        <div
          ref={blob2Ref}
          className="absolute bottom-[5%] left-[5%] md:bottom-[-20%] md:left-[-10%] w-[200px] h-[200px] md:w-[80vw] md:h-[80vw] md:max-w-[750px] md:max-h-[750px] rounded-full blur-[60px] md:blur-[100px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
          }}
        ></div>
        {/* Animated Blob 1 */}
        <div
          ref={blob1Ref}
          className="absolute top-[10%] right-[10%] md:top-[-20%] md:right-[-10%] w-[200px] h-[200px] md:w-[80vw] md:h-[80vw] md:max-w-[700px] md:max-h-[700px] rounded-full blur-[60px] md:blur-[120px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
          }}
        ></div>

        {/* Animated Blob 2 */}
        <div
          ref={blob2Ref}
          className="absolute bottom-[10%] left-[10%] md:bottom-[-20%] md:left-[-10%] w-[80px] h-[80px] md:w-[80vw] md:h-[80vw] md:max-w-[750px] md:max-h-[750px] rounded-full blur-[50px] md:blur-[100px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          }}
        ></div>

        {/* PART 1: TOP CTA */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 border-b border-white/10 pb-12">
          <div className="max-w-2xl">
            <h2 className="footer-item text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t.cta_title}
            </h2>
            <p className="footer-item text-gray-400 text-lg">{t.cta_desc}</p>
          </div>

          <div className="footer-item">
            <Link
              href="/contact"
              className="group bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-none relative z-20 shadow-lg hover:shadow-indigo-500/50"
            >
              {t.cta_btn}
              <ArrowUpRightIcon className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>

        {/* PART 2: LINKS GRID */}
        <div className="relative z-[10] grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-20 mb-20">
          <div className="flex flex-col gap-4">
            <h4 className="footer-item text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {t.col_services}
            </h4>
            <ul className="space-y-3">
              {t.services.map((link, i) => (
                <li key={i} className="footer-item w-fit">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium hover:pl-2 duration-300 block cursor-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="footer-item text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {t.col_company}
            </h4>
            <ul className="space-y-3">
              {t.company.map((link, i) => (
                <li key={i} className="footer-item w-fit">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium hover:pl-2 duration-300 block cursor-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="footer-item text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {t.col_social}
            </h4>
            <ul className="space-y-3">
              {SOCIALS.map((link, i) => (
                <li key={i} className="footer-item w-fit">
                  <a
                    href={link.href}
                    target="_blank"
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium hover:pl-2 duration-300 flex items-center gap-2 group cursor-none"
                  >
                    {link.name}
                    <ArrowUpRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="footer-item text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
              {t.col_contact}
            </h4>
            <div className="footer-item w-fit">
              <a
                href="mailto:halo@bagian.web.id"
                className="text-sm md:text-xl font-bold text-white hover:text-indigo-400 transition-colors block mb-1 cursor-none"
              >
                halo@bagian.web.id
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-500 mt-4">
                <MapPinIcon className="w-4 h-4 shrink-0 mt-0.5 md:block hidden" />
                <span>{t.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PART 3: BOTTOM */}
        <div className="relative z-[10] flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500 font-medium uppercase tracking-wider">
          <span className="mb-4 md:mb-0">
            © {currentYear} Bagian. {t.copyright}
          </span>
          <div className="flex gap-6">
            {t.legal.map((text, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-white transition-colors text-xs md:text-sm cursor-none"
              >
                {text}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 select-none pointer-events-none opacity-[0.05] translate-y-[20%] z-0">
          <h1 className="text-[15rem] md:text-[20rem] font-black text-white leading-none tracking-tighter font-array">
            BAGIAN
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
