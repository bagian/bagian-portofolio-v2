"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Project {
  id: string;
  title: {
    en: string;
    id: string;
  };
  category: {
    en: string;
    id: string;
  };
  image: string;
  size: "large" | "medium" | "small";
}

const projects: Project[] = [
  {
    id: "01",
    title: {
      en: "Yellow Kost & Partner",
      id: "Yellow Kost & Partner",
    },
    category: {
      en: "Booking System",
      id: "Sistem Pemesanan",
    },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    size: "large",
  },
  {
    id: "02",
    title: {
      en: "Lentera Fajar Indonesia",
      id: "Lentera Fajar Indonesia",
    },
    category: {
      en: "Dashboard And Landingpage",
      id: "Dashboard & Halaman Utama",
    },
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070",
    size: "medium",
  },
  {
    id: "03",
    title: {
      en: "Kinaya Interior Design",
      id: "Kinaya Interior Design",
    },
    category: {
      en: "Redesign & Landingpage",
      id: "Desain Ulang & Halaman Utama",
    },
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026",
    size: "medium",
  },
  {
    id: "04",
    title: {
      en: "KAI Wisata",
      id: "KAI Wisata",
    },
    category: {
      en: "Fixing Code",
      id: "Perbaikan Kode",
    },
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    size: "small",
  },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [displayedProject, setDisplayedProject] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { lang } = useLanguage();
  const currentLang = (lang === "ID" ? "id" : "en") as "en" | "id";
  const switchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Scroll animation for items
      gsap.from(".work-item", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".work-list",
          start: "top 75%",
          once: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // Handle cursor movement with delay
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      if (imageContainerRef.current && activeProject) {
        gsap.to(imageContainerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 2.2,
          ease: "power4.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeProject]);

  // Handle project hover with liquid effect and delay
  useEffect(() => {
    if (!imageContainerRef.current) return;

    const imgWrapper = imageContainerRef.current.querySelector("div");

    if (activeProject) {
      // Show image immediately on first hover
      if (!displayedProject) {
        // Use setTimeout to avoid synchronous setState in effect
        const timer = setTimeout(() => {
          setDisplayedProject(activeProject);
        }, 0);

        gsap.to(imageContainerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.6)",
        });
        if (imgWrapper) {
          gsap.to(imgWrapper, {
            borderRadius: "20px",
            duration: 0.7,
            ease: "elastic.out(1, 0.6)",
          });
        }

        return () => clearTimeout(timer);
      } else if (activeProject !== displayedProject) {
        // Morphing out animation (shrink to blob)
        gsap.to(imageContainerRef.current, {
          scale: 0.6,
          duration: 0.3,
          ease: "power2.in",
        });
        if (imgWrapper) {
          gsap.to(imgWrapper, {
            borderRadius: "100%",
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              setDisplayedProject(activeProject);
              // Morphing in animation (expand back with liquid bounce)
              gsap.to(imageContainerRef.current, {
                scale: 1,
                duration: 0.7,
                ease: "elastic.out(1, 0.6)",
              });
              gsap.to(imgWrapper, {
                borderRadius: "20px",
                duration: 0.7,
                ease: "elastic.out(1, 0.6)",
              });
            },
          });
        }
      }
    } else {
      // Hide image (shrink to blob and fade)
      gsap.to(imageContainerRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
      if (imgWrapper) {
        gsap.to(imgWrapper, {
          borderRadius: "50%",
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setDisplayedProject(null);
          },
        });
      }
    }
  }, [activeProject, displayedProject]);

  const titleText = currentLang === "id" ? "Karya Terpilih" : "Selected Works";
  const activeProjectData = projects.find((p) => p.id === displayedProject);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current) {
        clearTimeout(switchTimeoutRef.current);
      }
    };
  }, []);

  const handleProjectEnter = (projectId: string) => {
    setActiveProject(projectId);
  };

  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 md:px-12 lg:px-16 relative"
    >
      {/* Floating cursor image with liquid morph - BEHIND TEXT - HIDDEN ON MOBILE */}
      <div
        ref={imageContainerRef}
        className="hidden md:block fixed w-[250px] h-[320px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 0,
          top: 0,
          willChange: "transform",
          filter: "url(#liquid)",
        }}
      >
        {/* SVG Filter for liquid effect */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="liquid">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="liquid"
              />
              <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
            </filter>
          </defs>
        </svg>

        <div
          className="relative w-full h-full overflow-hidden shadow-2xl"
          style={{ willChange: "border-radius" }}
        >
          {activeProjectData && (
            <Image
              key={activeProjectData.id}
              src={activeProjectData.image}
              alt={activeProjectData.title[currentLang]}
              fill
              className="object-cover transition-transform duration-700"
              quality={100}
              unoptimized={true}
              sizes="(max-width: 768px) 250px, (max-width: 1024px) 350px, 400px"
              priority
              style={{ transform: "scale(1.1)" }}
            />
          )}
        </div>
      </div>

      <div className="max-w-screen mx-auto relative z-20 py-56">
        {/* Header */}
        <div className="mb-24 pb-12 border-b border-black relative z-20">
          <h2 className="text-6xl md:text-[10rem] lg:text-[11rem] font-black uppercase leading-[0.85]  text-black">
            {titleText}
          </h2>
        </div>

        {/* List Layout */}
        <div className="work-list space-y-2">
          {projects.map((project: Project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="work-item group block"
              onMouseEnter={() => handleProjectEnter(project.id)}
              onMouseLeave={handleProjectLeave}
            >
              <div className="relative border-b border-black/10 hover:border-black transition-all duration-500 z-20">
                <div className="grid grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-12 relative z-20">
                  {/* Number */}
                  <div className="col-span-2 md:col-span-1">
                    <span className="text-sm md:text-base font-mono text-black/40 group-hover:text-black transition-all duration-300">
                      {project.id}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-10 md:col-span-5 lg:col-span-6">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black group-hover:translate-x-4 transition-all duration-500 ease-out">
                      {project.title[currentLang]}
                    </h3>
                  </div>

                  {/* Category */}
                  <div className="col-span-8 md:col-span-4 lg:col-span-3">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-wider text-black/60 group-hover:text-black transition-all duration-300">
                      {project.category[currentLang]}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="col-span-4 md:col-span-2 flex justify-end">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:scale-110 transition-all duration-300">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        className="text-black group-hover:text-white transition-colors duration-300 group-hover:rotate-45"
                      >
                        <path
                          d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.7761 3 12 3 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
