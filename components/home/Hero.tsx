"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // --- SINKRONISASI DISINI ---
      // Tambahkan delay global 1.0 detik agar menunggu animasi Navbar (Tirai) terbuka
      const tl = gsap.timeline({ delay: 1.0 });

      // Animasi Teks Utama
      tl.from(".animate-word", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      })
        // Animasi Footer
        .from(
          ".animate-footer",
          {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.1,
          },
          "-=0.8",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] w-full select-none flex-col justify-between overflow-hidden bg-white p-6 text-gray-950 lg:p-16 xl:p-20"
    >
      <div className="flex flex-1 items-center justify-center pt-10 md:pt-0">
        <div className="flex w-full flex-col items-center tracking-tighter leading-[0.9] md:leading-[0.8]">
          {/* Baris Atas */}
          <div className="flex -translate-x-[4%] items-baseline gap-2 md:gap-8 lg:translate-x-[-8%]">
            <div className="overflow-hidden">
              <span className="animate-word inline-block text-[18vw] font-black lg:text-[10vw]">
                We
              </span>
            </div>
            <div className="translate-y-[7vw] overflow-hidden md:translate-y-[4vw]">
              <span className="animate-word inline-block text-[17vw] font-light lg:text-[10vw]">
                Create
              </span>
            </div>
          </div>

          {/* Baris Bawah */}
          <div className="mt-[5vw] flex translate-x-[4%] items-baseline gap-2 md:gap-8 lg:mt-[4vw] lg:translate-x-[-12%]">
            <div className="overflow-hidden">
              <span className="animate-word inline-block text-[15vw] font-normal lg:text-[10vw]">
                What
              </span>
            </div>

            <div className="flex flex-col items-start translate-y-[-1vw] md:translate-y-0">
              <div className="w-full overflow-hidden">
                <span className="mb-1 inline-block animate-word text-[5vw] font-medium italic leading-none lg:text-[2.8vw]">
                  You
                </span>
              </div>
              <div className="h-fit w-full overflow-hidden">
                <span className="animate-word inline-block text-[15vw] font-black lg:text-[10vw]">
                  Want
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex w-full flex-row items-end justify-between pb-2 text-[9px] font-bold uppercase tracking-[0.1em] md:text-[11px] md:tracking-[0.2em]">
        <div className="space-y-1 text-left animate-footer">
          {t.hero.services.map((service: string, i: number) => (
            <p key={i} className="leading-tight">
              {service}
            </p>
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 opacity-40 xl:block animate-footer">
          <p className="text-[10px] font-medium">{t.hero.scroll}</p>
        </div>

        <div className="text-right animate-footer">
          <p className="leading-tight">{t.hero.location}</p>
          <p className="opacity-50">© 2026 BAGIAN</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
