"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import Lenis from "lenis";

interface CustomWindow extends Window {
  lenis?: Lenis;
}

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(sidebarRef.current, {
            display: "none",
            visibility: "hidden",
          });
        },
      });
      gsap.set(sidebarRef.current, {
        yPercent: -100,
        display: "none",
        visibility: "hidden",
      });

      gsap.set(".mobile-link-text", { y: 50, opacity: 0 });
      gsap.set(".mobile-footer", { y: 20, opacity: 0 });

      tl.to(sidebarRef.current, {
        display: "flex",
        visibility: "visible",
        duration: 0,
      })
        .to(sidebarRef.current, {
          yPercent: 0,
          duration: 0.7,
          ease: "expo.inOut",
        })
        .to(
          ".mobile-link-text",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          ".mobile-footer",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        );

      timeline.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const customWindow = window as unknown as CustomWindow;
    const lenis = customWindow.lenis;

    if (timeline.current) {
      if (isOpen) {
        if (lenis) lenis.stop();
        document.body.style.overflow = "hidden";
        timeline.current.play();
      } else {
        if (lenis) lenis.start();
        document.body.style.overflow = "";
        timeline.current.reverse();
      }
    }
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <div ref={containerRef}>
      <nav
        className={`fixed top-0 left-0 w-full z-[1002] flex justify-between items-center px-6 py-6 lg:px-12 transition-all duration-300 font-array ${
          isOpen
            ? "bg-transparent"
            : "bg-white/90 backdrop-blur-md border-b border-gray-200"
        }`}
      >
        <div className="flex items-center gap-6 max-w-7xl justify-between mx-auto w-full">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-black uppercase tracking-tighter leading-none text-black z-[1003]"
          >
            BAGIAN.
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {Object.entries(t.navbar).map(([key, value]) => {
              const href = key === "home" ? "/" : `/${key}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`text-xs font-mono font-bold uppercase tracking-widest hover:text-gray-500 transition-colors ${
                    isActive
                      ? "text-black border-b border-black pb-1"
                      : "text-gray-900"
                  }`}
                >
                  {value as string}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-6 z-[1003]">
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest">
              <button
                onClick={() => setLang("ID")}
                className={`px-1 transition-colors ${
                  lang === "ID"
                    ? "text-white rounded-full py-2.5 px-3 bg-black text-[11px]"
                    : "text-gray-900 hover:text-white text-[11px] hover:bg-black rounded-full py-2.5 px-3"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang("EN")}
                className={`transition-colors ${
                  lang === "EN"
                    ? "text-white rounded-full py-2.5 px-3 bg-black text-[11px]"
                    : "text-gray-900 hover:text-white text-[11px] hover:bg-black rounded-full py-2.5 px-3"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href="https://customers.bagian.web.id/"
              className="hidden lg:block px-8 py-3 bg-black text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors rounded-full"
            >
              Login
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden group flex items-center gap-3 focus:outline-none cursor-pointer"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest min-w-[40px] text-right">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="relative w-6 h-4 flex flex-col justify-between items-end overflow-hidden">
                {/* Garis Atas */}
                <span
                  className={`absolute h-[2px] bg-black transition-all duration-300 ease-in-out w-full
                    ${isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
                />

                {/* Garis Tengah */}
                <span
                  className={`absolute top-1/2 -translate-y-1/2 h-[2px] bg-black transition-all duration-300 ease-in-out w-full
                    ${isOpen ? "opacity-0 translate-x-full" : "opacity-100"}`}
                />

                {/* Garis Bawah */}
                <span
                  className={`absolute h-[2px] bg-black transition-all duration-300 ease-in-out w-full
                    ${
                      isOpen
                        ? "bottom-1/2 translate-y-1/2 -rotate-45"
                        : "bottom-0"
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= FULL SCREEN MENU (GSAP) ================= */}
      {/* Menggunakan lg:hidden agar aktif di Tablet juga */}
      <div
        ref={sidebarRef}
        className="fixed inset-0 w-screen h-[100dvh] bg-white z-[1001] hidden lg:hidden flex-col"
      >
        {/* SPACER */}
        <div className="w-full h-24 shrink-0"></div>

        {/* MENU ITEMS (Centered) */}
        <div className="flex-1 w-full flex flex-col justify-center items-center gap-2 md:gap-6 overflow-y-auto py-4">
          {Object.entries(t.navbar).map(([key, value]) => {
            const href = key === "home" ? "/" : `/${key}`;
            const isActive = pathname === href;

            return (
              <div key={key} className="overflow-hidden w-full text-center">
                <Link
                  href={href}
                  onClick={handleLinkClick}
                  // md:text-8xl untuk tablet agar teks lebih besar dan proporsional
                  className={`mobile-link-text block text-[13vw] md:text-8xl font-black uppercase tracking-tighter transition-colors leading-none ${
                    isActive
                      ? "text-black"
                      : "text-gray-300 hover:text-gray-500"
                  }`}
                >
                  {value as string}
                </Link>
              </div>
            );
          })}
        </div>

        {/* FOOTER (Bottom) */}
        <div className="mobile-footer w-full shrink-0 flex justify-between items-end p-6 md:p-12 pb-8 md:pb-12 border-t border-gray-100 bg-white">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-gray-800 mb-2 tracking-widest">
              Project Inquiry
            </span>
            <a
              href="mailto:hello@bagian.com"
              className="text-sm md:text-lg font-bold text-black border-b border-black pb-0.5 w-fit"
            >
              hello@bagian.web.id
            </a>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setLang("ID")}
              className={`text-xs md:text-sm font-bold ${
                lang === "ID" ? "text-black" : "text-gray-300"
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLang("EN")}
              className={`text-xs md:text-sm font-bold ${
                lang === "EN" ? "text-black" : "text-gray-300"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
