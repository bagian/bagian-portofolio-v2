"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContentSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Background
      gsap.to(sectionRef.current, {
        backgroundColor: "#18181b",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
          once: false,
        },
      });

      // 2. Animasi Reveal Teks
      const words = gsap.utils.toArray(".reveal-word");
      gsap.fromTo(
        words,
        { color: "rgba(255, 255, 255, 0.1)" },
        {
          color: "rgba(255, 255, 255, 1)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    // Refresh posisi agar akurat setelah ganti bahasa
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [t]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-32 px-6 md:px-24 bg-white transition-colors duration-300"
    >
      <div className="max-w-7xl">
        <p className="text-xl md:text-4xl lg:text-6xl leading-[1.4] text-center font-semibold">
          {/* PERBAIKAN: Gunakan t.hero.content sesuai struktur data di Context */}
          {t.intro.content.split(" ").map((word, i) => (
            <span
              key={`${t.intro}-${i}`}
              className="reveal-word inline-block mr-[0.25em] text-black"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default ContentSection;
