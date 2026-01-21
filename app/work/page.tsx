"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon,
  ArrowLongDownIcon,
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Bagian Corps",
    category: "Branding",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1481487484168-9b930d5b208d?q=80&w=2560&auto=format&fit=crop",
    link: "/work/bagian-corps",
  },
  {
    id: 2,
    title: "Laundry App",
    category: "Product Design",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2560&auto=format&fit=crop",
    link: "/work/laundry-app",
  },
  {
    id: 3,
    title: "Finance Viz",
    category: "Dashboard",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop",
    link: "/work/finance-dashboard",
  },
  {
    id: 4,
    title: "Portfolio",
    category: "Creative Dev",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
    link: "/work/portfolio",
  },
];

export default function WorkPage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".horizontal-panel");
      const totalWidth = trackRef.current!.offsetWidth;

      // --- PENYESUAIAN KECEPATAN ---
      // speedMultiplier: Semakin tinggi angkanya, semakin lambat/berat scroll-nya.
      // Desktop butuh angka sedang, Mobile butuh angka lebih besar agar tidak 'fly'.
      const speedMultiplier = window.innerWidth < 768 ? 4 : 2.5;

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1, // Memberikan sedikit inersia
          start: "top top",
          end: () => `+=${totalWidth * speedMultiplier}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const index = Math.round(self.progress * (sections.length - 1));
            setCurrentSlide(index + 1);
            if (progressBarRef.current)
              gsap.set(progressBarRef.current, { scaleX: self.progress });
          },
        },
      });

      gsap.from(".reveal", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      });
    }, horizontalSectionRef);

    return () => ctx.revert();
  }, []);

  // --- LOGIKA DRAG-TO-SCROLL (DIOPTIMALKAN) ---
  useEffect(() => {
    let isDown = false;
    let startX: number;
    let scrollStart: number;
    const dragSpeed = 1.5; // Dikurangi agar drag tidak terlalu sensitif

    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#horizontal-container")) return;
      isDown = true;
      startX = e.pageX;
      scrollStart = window.scrollY;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX;
      const dist = (x - startX) * dragSpeed;
      window.scrollTo(0, scrollStart - dist);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="bg-white text-black min-h-screen select-none overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center px-6 md:px-24 overflow-hidden">
        {/* Background Accent (Optional: Menambah tekstur visual) */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-gray-50 rounded-full blur-[120px] -z-10" />
        <div className="w-full max-w-[1400px] flex flex-col justify-between h-[70vh]">
          {/* Top Label (Menambah kesan terorganisir) */}
          <div className="reveal flex items-center gap-4">
            <div className="w-12 h-[1px] bg-black"></div>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-black">
              Bagian Corps
            </span>
          </div>

          {/* Main Heading */}
          <div className="relative">
            <h1 className="reveal text-[13vw] sm:text-[11vw] md:text-[10vw] font-black uppercase tracking-[-0.05em] leading-[0.8] text-black">
              Selected <br />
              <span className="text-gray-200 italic font-light lowercase pr-4">
                Projects
              </span>
            </h1>
          </div>

          {/* Bottom Content */}
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-gray-100 pt-8">
            <div className="flex flex-col gap-4">
              <p className="max-w-[280px] md:max-w-sm text-gray-500 font-mono text-[11px] md:text-xs uppercase tracking-widest leading-relaxed">
                A curated collection of digital experiences, focusing on{" "}
                <span className="text-black underline underline-offset-4">
                  interactive design
                </span>{" "}
                & creative development.
              </p>
              <span className="text-[10px] font-mono text-gray-400">
                (2023 — 2026)
              </span>
            </div>

            {/* Scroll Indicator Button (Clickable to next section) */}
            <div className="flex flex-col items-center gap-4 group cursor-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gray-400 group-hover:text-black transition-colors">
                Scroll
              </span>
              <div className="w-10 h-16 md:w-12 md:h-20 rounded-full border border-gray-200 flex items-start justify-center group-hover:border-black transition-colors">
                <div className="w-1 h-3 bg-black rounded-full animate-wheel-move" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HORIZONTAL SLIDER */}
      <section
        ref={horizontalSectionRef}
        id="horizontal-container"
        className="relative h-screen overflow-hidden border-y border-gray-100"
      >
        {/* INDICATOR ATAS KANAN - Responsive Position */}
        <div className="absolute top-20  right-6 md:right-12 z-50 flex items-center gap-4 md:gap-6 font-mono pointer-events-none indicator-element">
          <div className="flex flex-col items-end shrink-0">
            <span className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-1">
              Index
            </span>
            <div className="text-xl md:text-4xl font-bold tabular-nums flex items-baseline gap-1 md:gap-2">
              <span className="inline-block min-w-[1.2em] text-right">
                0{currentSlide}
              </span>
              <span className="text-gray-100 font-light">/</span>
              <span className="text-gray-300">0{projects.length}</span>
            </div>
          </div>

          <div className="hidden sm:block w-20 md:w-32 h-[1px] md:h-[2px] bg-gray-100 relative overflow-hidden shrink-0">
            <div
              ref={progressBarRef}
              className="absolute inset-0 bg-black origin-left scale-x-0 will-change-transform"
            />
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex h-screen w-[fit-content] will-change-transform"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="horizontal-panel w-screen h-screen flex items-center justify-center shrink-0 "
            >
              <div className="group flex flex-col w-full max-w-7xl px-4 md:p-0">
                {/* FRAME IMAGE - Responsive Aspect Ratio */}
                <Link
                  href={project.link}
                  className="block relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/13] overflow-hidden bg-gray-50 shadow-sm rounded-md"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    draggable={false}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </Link>

                {/* INFO PROYEK */}
                <div className="mt-6 md:mt-10 flex justify-between items-end">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 font-mono text-[8px] md:text-xs uppercase tracking-[0.2em] text-gray-400">
                      <span>{project.category}</span>
                      <span className="w-4 md:w-8 h-[1px] bg-gray-200"></span>
                      <span>{project.year}</span>
                    </div>

                    <Link href={project.link}>
                      <h2 className="text-3xl md:text-8xl font-black uppercase tracking-tighter group-hover:text-gray-400 transition-colors leading-none">
                        {project.title}
                      </h2>
                    </Link>
                  </div>

                  <Link
                    href={project.link}
                    className="w-12 h-12 md:w-28 md:h-28 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 transform group-hover:rotate-45 shrink-0"
                  >
                    <ArrowUpRightIcon className="w-5 h-5 md:w-12 md:h-12" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <section className="h-screen w-full flex flex-col items-center justify-center bg-white px-6">
        <h2 className="reveal text-5xl md:text-[9vw] font-black uppercase tracking-tighter text-center leading-[0.9] mb-8 md:mb-12">
          Let&apos;s build <br />{" "}
          <span className="text-gray-300 italic">Something</span>
        </h2>
        <Link
          href="/contact"
          className="reveal px-10 py-4 md:px-14 md:py-6 bg-black text-white rounded-full font-mono text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Start Project
        </Link>
      </section>
    </main>
  );
}
