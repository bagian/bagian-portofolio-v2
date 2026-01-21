"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectItem {
  id: number;
  name: string;
  category: string;
  image: string;
  link: string;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card, i) => {
        // Skala kartu mengecil saat kartu tersebut mulai tertimpa kartu berikutnya
        // Kita menganimasi 'inner card' di dalamnya
        const inner = card.querySelector(".card-inner");

        // Cek apakah ini bukan kartu terakhir
        if (i !== cards.length - 1) {
          gsap.to(inner, {
            scale: 0.9, // Kartu belakang mengecil sedikit
            filter: "blur(14px)", // Kartu belakang sedikit blur
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top", // Mulai saat kartu menyentuh atas
              end: "bottom top", // Selesai saat kartu selesai dilewati durasinya
              scrub: true,
              // Kita tidak butuh 'pin: true' di sini karena CSS Sticky sudah menanganinya
            },
          });
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={containerRef} className="w-full relative">
      {/* Header Kecil di atas (Opsional) */}
      <div className="pt-32 px-6 md:px-16 pb-16">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          {t.projects.title}
        </h2>
        <p className="text-white/50 text-lg max-w-xl">
          Selected works showcasing digital craftsmanship and engineering.
        </p>
      </div>

      {/* Container Kartu */}
      <div className="w-full pb-32">
        {" "}
        {/* Padding bottom agar kartu terakhir bisa di-scroll lepas */}
        {t.projects.items.map((project: ProjectItem, index: number) => (
          // WRAPPER UTAMA: Sticky Magic terjadi di sini
          // 'sticky top-0' membuat kartu menempel di atas
          // Tinggi 'h-screen' memastikan setiap kartu memakan satu layar penuh scroll
          <div
            key={project.id}
            className="project-card sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden"
            // Kita gunakan dynamic z-index agar kartu baru selalu di atas kartu lama
            style={{ zIndex: index + 1 }}
          >
            {/* INNER CARD: Ini yang kita beri style background dan border */}
            {/* Ukuran tidak full screen (w-[90%]) agar efek tumpukan terlihat jelas */}
            <div className="card-inner relative w-[90%] h-[80%] md:w-[85%] md:h-[80%]  rounded-[2.5rem] overflow-hidden  shadow-2xl will-change-transform origin-top">
              <Link
                href={project.link}
                className="block w-full h-full relative group"
              >
                {/* Gambar Project */}
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Konten Text */}
                <div className="absolute top-0 left-0 p-8 md:p-14 w-full h-full flex flex-col justify-between z-10">
                  {/* Top: Category & Index */}
                  <div className="flex justify-between items-start">
                    <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/5">
                      {project.category}
                    </span>
                    <span className="text-4xl font-black text-white/20">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Bottom: Title & CTA */}
                  <div>
                    <h3 className="text-4xl md:text-7xl font-black uppercase text-white leading-none tracking-tighter mb-6">
                      {project.name}
                    </h3>

                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                      View Case Study
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L11 1M11 1H1M11 1V11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
