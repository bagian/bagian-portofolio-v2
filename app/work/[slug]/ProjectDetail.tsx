"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/constant/projects";
import ProjectGallery from "@/components/work/ProjectGallery";

const LABELS = {
  ID: {
    back: "Kembali ke Proyek",
    challenge: "Tantangan",
    solution: "Solusi",
    highlights: "Highlight Proyek",
    stack: "Teknologi",
    visit: "Kunjungi Website",
    next: "Punya proyek serupa?",
    contact: "Diskusikan Proyek",
  },
  EN: {
    back: "Back to Work",
    challenge: "Challenge",
    solution: "Solution",
    highlights: "Project Highlights",
    stack: "Technology",
    visit: "Visit Website",
    next: "Have a similar project?",
    contact: "Discuss Project",
  },
};

const ProjectDetail = ({ project }: { project: Project }) => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const labels = LABELS[lang];
  const local = project[lang];

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".detail-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={containerRef} className="mx-auto min-h-screen max-w-7xl px-6 pb-32 pt-32 md:px-0 md:pt-44">
      <Link href="/work" className="detail-reveal mb-16 inline-flex border-b border-gray-300 pb-1 font-mono text-xs uppercase tracking-widest transition-colors hover:border-black">
        ← {labels.back}
      </Link>

      <header className="mb-24 border-b border-black pb-16">
        <div className="detail-reveal mb-8 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-gray-500">
          <span>ID_{project.id}</span><span>·</span><span>{local.category}</span><span>·</span><span>{project.year}</span>
          <span className="ml-auto inline-flex items-center gap-2 text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-500" />{project.status}
          </span>
        </div>
        <h1 className="detail-reveal mb-8 text-6xl font-bold leading-[0.9] tracking-tighter md:text-[9rem]">
          {project.client}
        </h1>
        <div className="detail-reveal grid grid-cols-1 gap-8 md:grid-cols-12">
          <h2 className="text-2xl font-medium md:col-span-5 md:text-4xl">{local.title}</h2>
          <p className="font-mono text-sm leading-relaxed text-gray-500 md:col-span-7">{local.description}</p>
        </div>
      </header>

      <div className="detail-reveal">
        <ProjectGallery project={project} />
      </div>

      <section className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2">
        <article className="detail-reveal">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-gray-400">/ {labels.challenge}</p>
          <p className="text-xl leading-relaxed text-gray-700 md:text-2xl">{local.challenge}</p>
        </article>
        <article className="detail-reveal">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-gray-400">/ {labels.solution}</p>
          <p className="text-xl leading-relaxed text-gray-700 md:text-2xl">{local.solution}</p>
        </article>
      </section>

      <section className="detail-reveal mb-24 grid grid-cols-1 border-y border-gray-200 md:grid-cols-2">
        <div className="border-b border-gray-200 py-10 md:border-b-0 md:border-r md:pr-12">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-widest text-gray-400">/ {labels.highlights}</p>
          <ul className="flex flex-col gap-5">
            {local.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-4 font-mono text-sm text-gray-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />{highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-10 md:pl-12">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-widest text-gray-400">/ {labels.stack}</p>
          <div className="flex flex-wrap gap-3">
            {project.stack.map((technology) => (
              <span key={technology} className="border border-gray-200 px-4 py-2 font-mono text-xs uppercase tracking-widest">{technology}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="detail-reveal flex flex-col items-center gap-8 border-t border-gray-200 pt-20 text-center">
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-indigo-700">
          {labels.visit} ↗
        </a>
        <p className="font-mono text-xs uppercase tracking-widest text-gray-400">{labels.next}</p>
        <Link href="/contact" className="text-4xl font-black uppercase transition-colors hover:text-indigo-700 md:text-7xl">{labels.contact}</Link>
      </div>
    </main>
  );
};

export default ProjectDetail;
