"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/constant/projects";
import ProjectMockup from "@/components/work/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

const CONTENT = {
  ID: {
    archive: "/archive_2024-2026",
    title: "Selected Works",
    status: "Status: All Deployed",
    viewAll: "Lihat Semua Proyek",
  },
  EN: {
    archive: "/archive_2024-2026",
    title: "Selected Works",
    status: "Status: All Deployed",
    viewAll: "View All Projects",
  },
};

const SelectedWorks = () => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const [activeProject, setActiveProject] = useState<number | null>(null);
  const t = CONTENT[lang];

  useGSAP(
    () => {
      if (previewContainerRef.current) {
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

  useEffect(() => {
    if (activeProject !== null) {
      gsap.fromTo(
        previewContainerRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: "auto",
        }
      );

      gsap.to(cursorLabelRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        overwrite: "auto",
      });
    } else {
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
      className="relative w-full overflow-hidden bg-white px-4 py-24 md:py-32 z-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* --- SECTION HEADER --- */}
        <div className="mb-16 flex flex-col items-end justify-between border-b border-gray-200 pb-6 md:flex-row">
          <div>
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {t.archive}
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-[#1A1A1A] md:text-5xl">
              {t.title}
            </h2>
          </div>
          <div className="hidden text-right md:block">
            <p className="font-mono text-xs text-gray-500">
              Total Projects: {PROJECTS.length} <br />
              {t.status}
            </p>
          </div>
        </div>

        {/* --- DESKTOP DIRECTORY LIST (INTERACTIVE) --- */}
        <div
          className="directory-list hidden md:flex flex-col relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveProject(null)}
        >
          <div className="flex w-full text-[10px] font-mono text-gray-400 uppercase tracking-widest pb-4 border-b border-gray-200">
            <span className="w-1/12">ID</span>
            <span className="w-5/12">Project Name</span>
            <span className="w-3/12">Category</span>
            <span className="w-3/12 text-right">Action</span>
          </div>

          {PROJECTS.map((project, index) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="directory-row group flex w-full py-8 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors relative z-10"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <span className="w-1/12 text-xs font-mono text-gray-400 group-hover:text-black transition-colors">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>

              <span className="w-5/12 text-2xl font-medium text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                {project.client}
              </span>

              <span className="w-3/12">
                <span className="text-[10px] font-mono uppercase bg-gray-100 text-gray-500 px-2 py-1 rounded border border-gray-200 group-hover:bg-black group-hover:text-white transition-colors">
                  {project[lang].category}
                </span>
              </span>

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

        {/* --- MOBILE LIST (FALLBACK, TANPA GAMBAR) --- */}
        <div className="flex md:hidden flex-col">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="flex w-full items-center justify-between gap-4 py-6 border-b border-gray-100"
            >
              <div>
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-gray-400">
                  {project[lang].category}
                </span>
                <h3 className="text-xl font-medium text-gray-900">
                  {project.client}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
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
              </div>
            </Link>
          ))}
        </div>

        {/* --- VIEW ALL --- */}
        <div className="mt-16 border-t border-gray-200 pt-10 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border-b border-black pb-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:border-indigo-700 hover:text-indigo-700"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>

      {/* --- FLOATING PREVIEW CONTAINER (MOUSE FOLLOWER) --- */}
      <div
        ref={previewContainerRef}
        className="hidden md:block fixed top-0 left-0 w-[340px] h-[240px] md:w-[440px] md:h-[300px] pointer-events-none z-50 rounded-lg overflow-hidden border-4 border-white shadow-2xl opacity-0 scale-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="absolute inset-0">
          {PROJECTS.map((project, index) => (
            <div
              key={project.slug}
              className={`absolute inset-0 transition-opacity duration-300 ${
                activeProject === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <ProjectMockup project={project} sizes="440px" priority />
            </div>
          ))}
        </div>

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
