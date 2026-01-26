"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const techList = [
  "Next.js 16",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "Node.js",
  "PostgreSQL",
  "Laravel",
  "Docker",
  "Vercel",
  "Figma",
];

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Infinite Marquee Animation
      const slider = sliderRef.current;
      if (!slider) return;

      // Duplikasi konten agar looping mulus
      const content = slider.innerHTML;
      slider.innerHTML = content + content;

      gsap.to(slider, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full py-16 border-b border-gray-200 overflow-hidden max-w-7xl mx-auto"
    >
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          / Tech_Stack_used
        </span>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div ref={sliderRef} className="flex gap-2 w-fit whitespace-nowrap">
          {techList.map((tech, i) => (
            <div key={i} className="flex items-center gap-2 px-4">
              {/* Pill Style */}
              <div className="border border-gray-200 rounded-full px-6 py-3 flex items-center gap-2 bg-gray-50 hover:bg-black hover:text-white transition-colors duration-300">
                {/* <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> */}
                <span className="font-mono text-sm font-bold uppercase tracking-wider">
                  {tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
