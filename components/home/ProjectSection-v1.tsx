"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Judul dengan Scrub yang lebih halus
      gsap.from(".projects-title", {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1.5, // Menambah nilai scrub untuk efek 'lag' yang halus
        },
      });

      // 2. Animasi Setiap Bento Item
      projectItemsRef.current.forEach((item) => {
        if (!item) return;

        const img = item.querySelector(".project-image");
        const info = item.querySelector(".project-info");

        // EFEK PARALLAX YANG HALUS
        gsap.fromTo(
          img,
          {
            yPercent: -10, // Memulai sedikit lebih atas
          },
          {
            yPercent: 10, // Bergeser ke bawah (mengikuti arah scroll)
            ease: "none", // Wajib "none" untuk scrub agar linear dengan scroll
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1, // Memberikan sedikit inersia pada gambar
            },
          },
        );

        // 3. Efek Teks (Reveal)
        gsap.from(info, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            end: "top 70%",
            scrub: 2, // Scrub lebih lambat agar teks terasa melayang
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={sectionRef} className="relative w-full py-56 px-6 md:px-16">
      <div className="mb-20 overflow-hidden">
        <h2 className="projects-title text-[10vw] md:text-[6vw] font-black uppercase leading-none tracking-tighter">
          {t.projects.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] md:auto-rows-[900px]">
        {t.projects.items.map((project, index) => (
          <Link
            key={project.id}
            href={project.link}
            ref={(el) => {
              projectItemsRef.current[index] = el;
            }}
            className={`group relative overflow-hidden rounded-3xl bg-zinc-900 
              ${index === 0 ? "md:col-span-7 md:row-span-2" : ""}
              ${index === 1 ? "md:col-span-5 md:row-span-1" : ""}
              ${index === 2 ? "md:col-span-5 md:row-span-1" : ""}
              ${index === 3 ? "md:col-span-4 md:row-span-1" : ""}
              ${index === 4 ? "md:col-span-8 md:row-span-1" : ""}
            `}
          >
            <div className="absolute inset-0 w-full h-[150%] overflow-hidden -top-[20%]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                quality={100}
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 2560px"
                className="project-image object-cover will-change-transform" // Optimasi performa GPU
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 transition-opacity duration-500" />
            </div>

            <div className="project-info absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/50 mb-3">
                {project.category}
              </p>
              <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                {project.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
