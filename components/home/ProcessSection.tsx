"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

// Definisikan tipe data untuk Step agar tidak "any"
interface Step {
  title: string;
  desc: string;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProcessSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = lineRef.current;
      if (!path) return;

      // Mengambil panjang total path SVG
      const pathLength = path.getTotalLength();

      // Inisialisasi posisi garis (tersembunyi)
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // 1. Animasi Garis Utama mengikuti Scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
          once: false,
        },
      });

      // 2. Animasi Reveal Teks (Stagger)
      // Gunakan tipe generic <HTMLElement> untuk menghindari error 'any'
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          y: -100,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: step,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    // Refresh ScrollTrigger agar kalkulasi tinggi akurat
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={containerRef}
      className="relative py-40 px-6 md:px-24 overflow-hidden"
    >
      {/* Background Title Dekoratif */}
      <h2 className="absolute top-20 left-1/2 -translate-x-1/2 text-[15vw] font-black uppercase opacity-[0.03] whitespace-nowrap pointer-events-none select-none">
        {t.process.title}
      </h2>

      <div className="relative max-w-7xl mx-auto pt-20 md:pt-[18vw]">
        {/* Kontainer Garis Tengah */}
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-[2px] z-0">
          {/* Garis Dasar (Dashed/Putus-putus) */}
          <svg className="h-full w-full" preserveAspectRatio="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#222"
              strokeWidth="2"
              strokeDasharray="15 15"
            />
          </svg>

          {/* Garis Progress (Solid White) */}
          <svg
            className="absolute top-0 left-0 h-full w-full z-10"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 1 0 L 1 10000" // Nilai L yang sangat besar agar garis menjangkau seluruh section
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* List Langkah-langkah */}
        <div className="relative space-y-48 md:space-y-80">
          {t.process.steps.map((step: Step, index: number) => (
            <div
              key={index}
              className={`process-step relative flex flex-col md:flex-row items-start md:items-center w-full ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Box Konten Teks dengan Spacing Luas */}
              <div className="md:w-1/2 pl-14 md:pl-0 md:px-24 lg:px-40">
                <div className="relative inline-block mb-8">
                  {/* Nomor Urut Besar di Belakang */}
                  <span className="text-6xl md:text-8xl font-black text-white/5 absolute -top-16 -left-10 italic select-none">
                    0{index + 1}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter relative z-10">
                    {step.title}
                  </h3>
                </div>
                <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light max-w-lg">
                  {step.desc}
                </p>
              </div>

              {/* Titik Penanda (Bulatan di Tengah Garis) */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 md:top-auto w-4 h-4 rounded-full z-20 bg-black border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.8)]" />

              {/* Spacer untuk sisi kosong */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
