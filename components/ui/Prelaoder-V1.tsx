"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const words = [
  "STRATEGY",
  "DESIGN",
  "DEVELOPMENT",
  "CREATIVITY",
  "INNOVATION",
  "BAGIAN", // Brand Utama
] as const;

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const reelRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLHeadingElement | null>(null);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    /* ================= 1. TOTAL SCROLL LOCK ================= */
    const preventDefault = (e: Event) => e.preventDefault();

    const lockScroll = () => {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      // Hard Lock Events
      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });
    };

    const unlockScroll = () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
      document.body.style.paddingRight = "";

      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };

    lockScroll();

    const ctx = gsap.context(() => {
      if (!reelRef.current) return;

      const slideHeight = 15; // vh
      const totalTime = 5; // Durasi loading
      const interval = totalTime / (words.length - 1);

      /* ===== INITIAL STATE ===== */
      gsap.set(containerRef.current, { autoAlpha: 1 });
      gsap.set(reelRef.current, { y: "0vh" });

      const tl = gsap.timeline();

      /* ========== COUNTER ANIMATION ========== */
      const counterObj = { value: 0 };
      tl.to(
        counterObj,
        {
          value: 100,
          duration: totalTime,
          ease: "none",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.floor(counterObj.value)
              ).padStart(3, "0");
            }
          },
        },
        0
      );

      /* ========== WORD SLIDES (LENTO STYLE) ========== */
      words.forEach((_, i) => {
        if (i === 0) return;
        tl.to(
          reelRef.current,
          {
            y: `-${i * slideHeight}vh`,
            duration: 0.5,
            ease: "expo.inOut",
          },
          i * interval - 0.5
        );
      });

      /* ========== EXIT SEQUENCE ========== */
      tl.to(
        bgRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "+=0.4"
      );

      tl.to(
        [reelRef.current, counterRef.current],
        {
          y: -150,
          opacity: 0,
          duration: 1,
          ease: "power4.in",
        },
        "<"
      );

      tl.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        onComplete: () => {
          unlockScroll();
          onComplete();
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      unlockScroll();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-black text-white overflow-hidden pointer-events-auto"
      style={{ touchAction: "none" }}
    >
      <div ref={bgRef} className="absolute inset-0 bg-[#0a0a0a]" />

      {/* --- MASKING REEL --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[15vh] overflow-hidden mask-container">
          <div ref={reelRef} className="flex flex-col items-center">
            {words.map((word, i) => (
              <div
                key={i}
                className="h-[15vh] flex items-center justify-center px-4"
              >
                <h2 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-none tracking-tighter text-center">
                  {word}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FOOTER INFO & COUNTER --- */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end pointer-events-none">
        <div className="flex flex-col gap-1 opacity-40">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            Processing
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            Studio Bagian ©2026
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <h1
            ref={counterRef}
            className="text-[15vw] md:text-[8vw] font-black leading-none tracking-tighter italic"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            000
          </h1>
          <span className="text-xl md:text-3xl font-bold opacity-20">%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
