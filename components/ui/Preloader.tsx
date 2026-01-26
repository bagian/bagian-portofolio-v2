"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/context/LoaderContext"; // IMPORT CONTEXT

gsap.registerPlugin(useGSAP);

interface WindowWithLenis extends Window {
  lenis?: {
    stop: () => void;
    start: () => void;
    scrollTo: (
      target: number | string | HTMLElement,
      options?: { immediate?: boolean }
    ) => void;
  };
}

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { triggerTransition } = useLoader(); // AMBIL FUNGSI TRIGGER

  const words = ["Research", "Develope", "Launch", "BAGIAN"];

  useEffect(() => {
    const win = window as WindowWithLenis;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    if (win.lenis) {
      win.lenis.stop();
      win.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          const win = window as WindowWithLenis;
          document.body.style.overflow = "";
          document.body.style.height = "";
          if (win.lenis) win.lenis.start();
        },
      });

      const startPath = "M0 0 L100 0 L100 100 Q50 100 0 100 L0 0";
      const curvePath = "M0 0 L100 0 L100 100 Q50 13 0 100 L0 0";
      const flatPath = "M0 0 L100 0 L100 0 Q50 0 0 0 L0 0";

      gsap.set(pathRef.current, { attr: { d: startPath } });
      gsap.set(".text-animator", { yPercent: 100, opacity: 0 });

      words.forEach((_, index) => {
        const target = `.text-item-${index}`;
        tl.to(target, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
        }).to(target, {
          yPercent: -100,
          opacity: 0,
          duration: 0.6,
          ease: "power4.in",
          delay: 0.2,
        });
      });

      // --- POINT OF SYNC ---
      // Kita panggil triggerTransition() TEPAT saat animasi background dimulai
      tl.call(
        () => {
          triggerTransition();
        },
        undefined,
        "-=0.1"
      ); // Panggil sedikit sebelum animasi background jalan

      tl.to(pathRef.current, {
        attr: { d: curvePath },
        duration: 0.8,
        ease: "power2.in",
      })
        .to(pathRef.current, {
          attr: { d: flatPath },
          duration: 0.8,
          ease: "power4.out",
        })
        .to(containerRef.current, {
          display: "none",
          duration: 0.1,
        });
    },
    { scope: containerRef }
  );

  // ... (Sisa render JSX sama persis dengan sebelumnya)
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center touch-none"
    >
      {/* SVG & Content code sama seperti sebelumnya... */}
      <svg
        className="absolute top-0 left-0 w-full h-[120vh] fill-[#0f0f0f] z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} vectorEffect="non-scaling-stroke"></path>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="relative overflow-hidden w-full px-4 text-center h-[140px] md:h-[18vw] flex justify-center items-center">
          {words.map((word, index) => (
            <h2
              key={index}
              className={`text-animator text-item-${index} absolute top-0 left-0 w-full flex items-center justify-center h-full text-white uppercase tracking-tighter leading-none text-5xl md:text-8xl lg:text-[10vw] ${word === "BAGIAN" ? "font-black" : "font-bold"}`}
            >
              {word}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
