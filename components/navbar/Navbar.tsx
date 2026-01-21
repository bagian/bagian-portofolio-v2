"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import Lenis from "lenis";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface CustomWindow extends Window {
  lenis?: Lenis;
}

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // --- 1. SETUP ANIMASI ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          // Sangat Penting: Sembunyikan total agar tidak memicu overflow saat tertutup
          gsap.set([sidebarRef.current, backdropRef.current], {
            display: "none",
            visibility: "hidden",
          });
        },
      });

      // Setup Awal (Tertutup)
      gsap.set(backdropRef.current, {
        opacity: 0,
        display: "none",
        visibility: "hidden",
      });
      gsap.set(sidebarRef.current, {
        xPercent: 105, // 105% menjamin benar-benar di luar viewport
        display: "none",
        visibility: "hidden",
      });
      gsap.set(".sidebar-item", { x: 30, opacity: 0 });
      gsap.set(".sidebar-line", { scaleX: 0, transformOrigin: "left" });

      // Sequence Buka
      tl.to([backdropRef.current, sidebarRef.current], {
        display: "block",
        visibility: "visible",
        duration: 0,
      })
        .to(backdropRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          sidebarRef.current,
          {
            xPercent: 0,
            duration: 0.8,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(
          ".sidebar-line",
          {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".sidebar-item",
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.5"
        );

      timeline.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- 2. KONTROL SCROLL & PLAY ---
  useEffect(() => {
    const customWindow = window as unknown as CustomWindow;
    const lenis = customWindow.lenis;

    if (timeline.current) {
      if (isOpen) {
        if (lenis) lenis.stop();
        document.body.style.overflow = "hidden";
        // Mencegah pergeseran lebar layar saat scrollbar hilang
        document.body.style.paddingRight = "0px";
        timeline.current.play();
      } else {
        if (lenis) lenis.start();
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        timeline.current.reverse();
      }
    }
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="relative">
      {/* --- NAVBAR UTAMA --- */}
      <nav className="fixed top-0 left-0 w-full z-[9999] flex justify-between items-center p-6 md:px-12 md:py-8 pointer-events-none text-white mix-blend-difference">
        <Link
          href="/"
          className="text-xl font-black tracking-tighter uppercase pointer-events-auto font-cabinet"
        >
          BAGIAN<span>.</span>
        </Link>

        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Lang Switcher */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest border border-white/40 rounded-full p-1 font-cabinet">
            <button
              onClick={() => setLang("ID")}
              className={`px-3 py-1 rounded-full transition-colors cursor-none ${lang === "ID" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
            >
              ID
            </button>
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1 rounded-full transition-colors cursor-none ${lang === "EN" ? "bg-white text-black" : "text-white/70 hover:text-white"}`}
            >
              EN
            </button>
          </div>

          {/* TOMBOL MENU */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-3 focus:outline-none cursor-none"
          >
            <div className="relative flex flex-col items-end gap-1.5 p-2 h-5 w-8 justify-center">
              <span
                className={`absolute h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? "w-6 rotate-45 top-1/2 -translate-y-1/2" : "w-8 top-0"}`}
              ></span>
              <span
                className={`absolute h-[2px] bg-white transition-all duration-300 ease-out top-1/2 -translate-y-1/2 ${isOpen ? "opacity-0 w-0" : "w-6 group-hover:w-8"}`}
              ></span>
              <span
                className={`absolute h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? "w-6 -rotate-45 top-1/2 -translate-y-1/2" : "w-4 group-hover:w-8 bottom-0"}`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* --- BACKDROP --- */}
      <div
        ref={backdropRef}
        onClick={() => setIsOpen(true)}
        className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-lg z-[100] hidden"
      ></div>

      {/* --- SIDEBAR PANEL --- */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 w-full md:w-[600px] h-[100dvh] bg-[#0a0a0a] z-[150] text-white hidden shadow-2xl border-l border-white/10 overflow-hidden touch-none"
      >
        <div className="flex flex-col h-full px-8 md:px-16 justify-center relative overflow-y-auto overflow-x-hidden">
          <div className="sidebar-item mb-6 md:mb-12 shrink-0">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Navigation
            </span>
          </div>

          <div className="flex-grow-0 flex flex-col">
            {Object.entries(t.navbar).map(([key, value], idx) => {
              const href = key === "home" ? "/" : `/${key}`;
              const isActive = pathname === href;

              return (
                <div key={key} className="group w-full">
                  <Link
                    href={href}
                    onClick={handleLinkClick}
                    className="sidebar-item block md:py-8 py-4 relative cursor-none"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-6 w-full">
                        <span
                          className={`text-sm font-mono pt-1 ${isActive ? "text-indigo-500" : "text-gray-600 group-hover:text-white"}`}
                        >
                          0{idx + 1}
                        </span>
                        <div className="relative overflow-hidden h-7 md:h-12 flex-1 font-cabinet">
                          <span
                            className={`block text-2xl md:text-5xl font-bold uppercase tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${isActive ? "text-white" : "text-gray-400"}`}
                          >
                            {value as string}
                          </span>
                          <span className="absolute top-0 left-0 block text-2xl md:text-5xl font-bold uppercase tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0 text-white">
                            {value as string}
                          </span>
                        </div>
                      </div>
                      <ArrowRightIcon
                        className={`w-6 h-6 transition-all duration-300 ${isActive ? "text-indigo-500 opacity-100" : "text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`}
                      />
                    </div>
                  </Link>
                  <div className="sidebar-line w-full h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors"></div>
                </div>
              );
            })}
          </div>

          <div className="sidebar-item absolute bottom-10 left-0 right-0 px-8 md:px-16 shrink-0">
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 font-cabinet">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Contact
                </h4>
                <a
                  href="mailto:halo@bagian.web.id"
                  className="block text-xs md:text-base text-gray-300 hover:text-white"
                >
                  halo@bagian.web.id
                </a>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">
                  Socials
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-xs md:text-base text-gray-300 hover:text-white"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
