"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useLoader } from "@/context/LoaderContext";

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { isTransitioning } = useLoader();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // --- PENGATURAN KECEPATAN ---
      // duration: Semakin besar angkanya, semakin lambat gerakannya.
      // stagger: Semakin besar angkanya, semakin lama jeda muncul antara kata pertama dan kedua.

      tl.from(".animate-word", {
        yPercent: 130, // Sedikit ditambah agar start lebih dari bawah
        opacity: 0,
        rotateX: 10, // Opsional: Sedikit rotasi agar ada efek 3D saat muncul
        duration: 2.5, // UBAH INI: Dari 1.2 menjadi 2.5 (Lebih lambat & dramatis)
        ease: "power4.out", // Easing ini cepat di awal, sangat lambat di akhir (Premium feel)
        stagger: 0.18, // UBAH INI: Dari 0.1 menjadi 0.15 (Supaya berurutan lebih jelas)
      }).from(
        ".animate-footer",
        {
          opacity: 0,
          y: 30,
          duration: 1.5, // Footer muncul perlahan
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=2.0" // Mulai animasi footer 2 detik sebelum animasi teks selesai (overlap)
      );

      tlRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isTransitioning && tlRef.current) {
      // Opsional: Tambahkan delay sedikit (0.2s) agar tirai hitam benar-benar naik dulu
      // baru teks mulai bergerak.
      gsap.delayedCall(0.1, () => {
        tlRef.current?.play();
      });
    }
  }, [isTransitioning]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] w-full select-none flex-col justify-between overflow-hidden p-6  lg:p-16 xl:p-20"
    >
      {/* ... (BAGIAN JSX TIDAK PERLU DIUBAH, SAMA SEPERTI SEBELUMNYA) ... */}

      <div className="flex flex-1 items-center justify-center pt-10 md:pt-0">
        <div className="flex w-full flex-col items-center tracking-tighter leading-[0.9] md:leading-[0.8]">
          {/* Baris Atas */}
          <div className="flex -translate-x-[4%] items-baseline gap-2 md:gap-8 lg:translate-x-[-8%]">
            <div className="overflow-hidden">
              <span className="animate-word inline-block text-[18vw] font-black lg:text-[10vw] origin-bottom-left">
                We
              </span>
            </div>
            <div className="translate-y-[7vw] overflow-hidden md:translate-y-[4vw]">
              <span className="animate-word inline-block text-[17vw] font-light lg:text-[10vw] origin-bottom-left">
                Create
              </span>
            </div>
          </div>

          {/* Baris Bawah */}
          <div className="mt-[5vw] flex translate-x-[4%] items-baseline gap-2 md:gap-8 lg:mt-[4vw] lg:translate-x-[-12%]">
            <div className="overflow-hidden">
              <span className="animate-word inline-block text-[15vw] font-normal lg:text-[10vw] origin-bottom-left">
                What
              </span>
            </div>

            <div className="flex flex-col items-start translate-y-[-1vw] md:translate-y-0">
              <div className="w-full overflow-hidden">
                <span className="mb-1 inline-block animate-word text-[5vw] font-medium italic leading-none lg:text-[2.8vw] origin-bottom-left">
                  You
                </span>
              </div>
              <div className="h-fit w-full overflow-hidden">
                <span className="animate-word inline-block text-[15vw] font-black lg:text-[10vw] origin-bottom-left">
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
