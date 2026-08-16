"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, type Project } from "@/constant/projects";
import ProjectMockup from "@/components/work/ProjectMockup";

gsap.registerPlugin(ScrollTrigger);

const CONTENT = {
  ID: {
    label: "Direktori Proyek",
    title: "Selected",
    accent: "Works",
    description: "Proyek nyata yang telah diselesaikan dan berjalan di produksi.",
    total: "Total Entri",
    detail: "Lihat Studi Kasus",
    cta: "Mulai Proyek Baru",
  },
  EN: {
    label: "Project Directory",
    title: "Selected",
    accent: "Works",
    description: "Real projects completed and running in production.",
    total: "Total Entries",
    detail: "View Case Study",
    cta: "Start New Project",
  },
};

const ProjectCard = ({ project, detailLabel, lang }: { project: Project; detailLabel: string; lang: "ID" | "EN" }) => {
  const local = project[lang];
  return (
    <article className="project-card border-t border-gray-200 py-10 md:py-14">
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-2">
            <span className="font-mono text-xs text-gray-400">ID_{project.id}</span>
          </div>
          <div className="md:col-span-6">
            <div className="project-visual mb-7 will-change-transform">
              <ProjectMockup project={project} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
              {local.category} · {project.year}
            </p>
            <h2 className="mb-4 text-4xl font-medium tracking-tight transition-colors group-hover:text-indigo-700 md:text-6xl">
              {project.client}
            </h2>
            <p className="max-w-2xl font-mono text-sm leading-relaxed text-gray-500">
              {local.description}
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gray-500">
              {local.industry}
            </p>
            <span className="inline-flex border-b border-black pb-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors group-hover:border-indigo-700 group-hover:text-indigo-700">
              {detailLabel}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default function WorkClient() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const content = useMemo(() => CONTENT[lang], [lang]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".header-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });

        const visual = card.querySelector<HTMLElement>(".project-visual");
        if (!visual || reduceMotion) return;

        gsap.fromTo(
          visual,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    }, containerRef);

    return () => context.revert();
  }, [lang]);

  return (
    <main ref={containerRef} className="mx-auto min-h-screen max-w-7xl px-6 pb-32 pt-32 md:px-12 md:pt-48">
      <header className="mb-24 border-b border-black pb-10 md:mb-36">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="header-anim">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
              / {content.label}
            </p>
            <h1 className="text-6xl font-medium leading-[0.85] tracking-tighter md:text-[9rem]">
              {content.title}<span className="font-extrabold text-indigo-700">{content.accent}</span>
            </h1>
          </div>
          <div className="header-anim md:text-right">
            <p className="font-mono text-xs uppercase text-gray-500">{content.total}</p>
            <p className="font-mono text-xl font-bold">0{PROJECTS.length}</p>
          </div>
        </div>
        <p className="header-anim mt-10 max-w-xl border-l-2 border-gray-200 pl-6 font-mono text-sm leading-relaxed text-gray-500">
          {content.description}
        </p>
      </header>

      <section>
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} detailLabel={content.detail} lang={lang} />
        ))}
      </section>

      <div className="mt-20 border-t border-gray-200 pt-20 text-center">
        <Link href="/contact" className="text-4xl font-black uppercase transition-colors hover:text-indigo-700 md:text-7xl">
          {content.cta}
        </Link>
      </div>
    </main>
  );
}
