"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SelectedWorks = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Refs untuk menyimpan fungsi animasi GSAP (Performance Optimization)
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const [activeProject, setActiveProject] = useState<number | null>(null);

  useGSAP(
    () => {
      // 1. Setup Animasi Mouse Follower (Preview Image)
      if (previewContainerRef.current) {
        // Set initial position to center of viewport (optional, for safety)
        gsap.set(previewContainerRef.current, { xPercent: -50, yPercent: -50 });

        xTo.current = gsap.quickTo(previewContainerRef.current, "left", {
          duration: 0.8,
          ease: "power3",
        });
        yTo.current = gsap.quickTo(previewContainerRef.current, "top", {
          duration: 0.8,
          ease: "power3",
        });
      }

      // 2. Reveal List Animation (Stagger)
      gsap.from(".directory-row", {
        scrollTrigger: {
          trigger: ".directory-list",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  // Handle Hover Animation
  useEffect(() => {
    if (activeProject !== null) {
      // SHOW Image
      // Animasi Scale Up agar terlihat muncul dari titik kursor (atau tengah container preview)
      gsap.fromTo(
        previewContainerRef.current,
        { scale: 0, opacity: 0 }, // Mulai dari kecil
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: "auto",
        }
      );

      // Label Text juga muncul
      gsap.to(cursorLabelRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        overwrite: "auto",
      });
    } else {
      // HIDE Image
      gsap.to(previewContainerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
      gsap.to(cursorLabelRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, [activeProject]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 md:py-32 px-4 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-200 pb-6">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
              /archive_2024-2026
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#1A1A1A]">
              Selected Works
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs font-mono text-gray-500">
              Total Projects: {t.projects.items.length} <br />
              Status: All Deployed
            </p>
          </div>
        </div>

        {/* --- DESKTOP DIRECTORY LIST (INTERACTIVE) --- */}
        <div
          className="directory-list hidden md:flex flex-col relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveProject(null)}
        >
          {/* Header Table */}
          <div className="flex w-full text-[10px] font-mono text-gray-400 uppercase tracking-widest pb-4 border-b border-gray-200">
            <span className="w-1/12">ID</span>
            <span className="w-5/12">Project Name</span>
            <span className="w-3/12">Category</span>
            <span className="w-3/12 text-right">Action</span>
          </div>

          {/* Rows */}
          {t.projects.items.map((project, index) => (
            <Link
              key={project.id}
              href={project.link}
              className="directory-row group flex w-full py-8 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors relative z-10"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* ID */}
              <span className="w-1/12 text-xs font-mono text-gray-400 group-hover:text-black transition-colors">
                {project.id < 10 ? `0${index + 1}` : index + 1}
              </span>

              {/* Title */}
              <span className="w-5/12 text-2xl font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                {project.name}
              </span>

              {/* Category (Pill) */}
              <span className="w-3/12">
                <span className="text-[10px] font-mono uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded border border-gray-200 group-hover:bg-black group-hover:text-white transition-colors">
                  {project.category}
                </span>
              </span>

              {/* Arrow Icon */}
              <span className="w-3/12 text-right flex justify-end">
                <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-colors">
                  <svg
                    className="w-3 h-3 text-gray-400 group-hover:text-white"
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
                </div>
              </span>
            </Link>
          ))}
        </div>

        {/* --- MOBILE CARDS (FALLBACK) --- */}
        <div className="flex md:hidden flex-col gap-8">
          {t.projects.items.map((project) => (
            <div key={project.id} className="w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 border border-gray-200">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 mb-1 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-medium text-gray-900">
                    {project.name}
                  </h3>
                </div>
                <Link
                  href={project.link}
                  className="w-8 h-8 rounded-full bg-black flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3 text-white"
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FLOATING PREVIEW CONTAINER (FIXED POS) --- */}
      {/* Catatan: Agar gambar muncul dari tengah viewport lalu mengikuti kursor, 
          kita sebenarnya butuh logika yang lebih kompleks jika ingin benar-benar "fly from center".
          Namun, standar UX "Mouse Follower" adalah gambar muncul (scale up/fade in) 
          langsung di posisi kursor saat ini untuk menghindari disorientasi.
          
          Kode di atas menggunakan `fixed` positioning yang di-update oleh GSAP quickTo.
      */}
      <div
        ref={previewContainerRef}
        className="fixed top-0 left-0 w-[300px] h-[200px] md:w-[400px] md:h-[260px] pointer-events-none z-50 rounded-lg overflow-hidden hidden md:block border-4 border-white shadow-2xl opacity-0 scale-0"
        style={{ transform: "translate(-50%, -50%)" }} // Centering transform via CSS
      >
        {t.projects.items.map((project, index) => (
          <Image
            key={project.id}
            src={project.image}
            alt={project.name}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-300 ${
              activeProject === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Technical Overlay on Image */}
        <div
          ref={cursorLabelRef}
          className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[8px] font-mono px-2 py-1 rounded"
        >
          LIVE PREVIEW
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
