"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/constant/projects";

gsap.registerPlugin(ScrollTrigger);

type Orientation = "portrait" | "landscape" | "square";

const SPAN_LAYOUTS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-8",
  "md:col-span-6",
  "md:col-span-6",
];

const aspectClass = (orientation?: Orientation) => {
  if (orientation === "portrait") return "aspect-[3/4]";
  if (orientation === "landscape") return "aspect-[16/10]";
  if (orientation === "square") return "aspect-square";
  return "aspect-[4/3]";
};

const ParallaxImage = ({
  src,
  alt,
  priority = false,
  onLoad,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  onLoad?: (el: HTMLImageElement) => void;
}) => (
  <div className="parallax-image absolute -inset-y-[8%] inset-x-0 will-change-transform">
    <Image
      src={src}
      alt={alt}
      fill
      quality={95}
      priority={priority}
      sizes={priority ? "100vw" : "(max-width: 768px) 100vw, 65vw"}
      className="object-cover object-center"
      onLoad={(e) => onLoad?.(e.currentTarget)}
    />
  </div>
);

const ProjectGallery = ({ project }: { project: Project }) => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const images = project.gallery ?? (project.image ? [project.image] : []);
  const [headerImage, ...bentoImages] = images;

  const [orientations, setOrientations] = useState<Record<string, Orientation>>({});

  const handleLoad = (src: string) => (el: HTMLImageElement) => {
    if (el.naturalWidth === 0) return;
    const orientation: Orientation =
      el.naturalHeight > el.naturalWidth
        ? "portrait"
        : el.naturalHeight === el.naturalWidth
          ? "square"
          : "landscape";
    setOrientations((prev) => (prev[src] ? prev : { ...prev, [src]: orientation }));
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".parallax-frame").forEach((frame) => {
        const image = frame.querySelector<HTMLElement>(".parallax-image");
        if (!image) return;

        gsap.fromTo(
          image,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.from(".bento-item", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
      });
    }, container);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    if (Object.keys(orientations).length === 0) return;
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(timer);
  }, [orientations]);

  if (!headerImage) return null;

  return (
    <div ref={containerRef} className="mb-24 md:mb-32">
      <div className="parallax-frame relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 sm:aspect-[16/10] md:mb-8 md:aspect-[16/8] md:rounded-2xl">
        <ParallaxImage
          src={headerImage}
          alt={`${project.client} main project mockup`}
          priority
          onLoad={handleLoad(headerImage)}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 text-white md:p-8">
          <div>
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
              {lang === "EN" ? "Featured Project" : "Proyek Unggulan"}
            </p>
            <p className="text-xl font-medium md:text-3xl">{project.client}</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
            {project.year}
          </span>
        </div>
      </div>

      {bentoImages.length > 0 && (
        <div className="bento-grid grid grid-cols-1 items-start gap-4 md:grid-cols-12 md:gap-6">
          {bentoImages.map((image, index) => (
            <div
              key={image}
              className={`bento-item parallax-frame relative w-full overflow-hidden rounded-xl bg-gray-100 ${aspectClass(
                orientations[image]
              )} ${SPAN_LAYOUTS[index % SPAN_LAYOUTS.length]}`}
            >
              <ParallaxImage
                src={image}
                alt={`${project.client} project gallery ${index + 1}`}
                onLoad={handleLoad(image)}
              />
              <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/50 px-3 py-1 font-mono text-[8px] uppercase tracking-widest text-white backdrop-blur-sm">
                {lang === "EN" ? "View" : "Lihat"} {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
