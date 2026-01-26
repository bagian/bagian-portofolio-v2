"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const localTranslations = {
  ID: {
    label: "Metodologi",
    title: "Alur Eksekusi",
    steps: [
      { title: "Discovery", desc: "Analisis kebutuhan & strategi teknis." },
      { title: "Design", desc: "Wireframing & High-fidelity UI." },
      { title: "Development", desc: "Clean code & integrasi sistem." },
      { title: "Testing", desc: "Quality assurance & optimasi." },
      { title: "Deployment", desc: "Peluncuran ke production server." },
    ],
  },
  EN: {
    label: "Methodology",
    title: "Execution Flow",
    steps: [
      { title: "Discovery", desc: "Requirements analysis & tech strategy." },
      { title: "Design", desc: "Wireframing & High-fidelity UI." },
      { title: "Development", desc: "Clean code & system integration." },
      { title: "Testing", desc: "Quality assurance & optimization." },
      { title: "Deployment", desc: "Launch to production server." },
    ],
  },
};

const Process = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Line Animation (Mengisi garis saat scroll)
      gsap.fromTo(
        ".process-line-fill",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-container",
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Step Reveal
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full bg-[#FAFAFA] py-24 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Header (Sticky di Desktop) */}
        <div className="md:w-1/3">
          <div className="md:sticky md:top-32">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
              / {content.label}
            </span>
            <h2 className="text-3xl font-medium text-[#1A1A1A]">
              {content.title}
            </h2>
          </div>
        </div>

        {/* Steps Container */}
        <div className="md:w-2/3 process-container relative pl-8 border-l border-gray-200">
          {/* Animated Line Overlay */}
          <div className="process-line-fill absolute top-0 left-[-1px] w-[1px] bg-black"></div>

          <div className="flex flex-col gap-12">
            {content.steps.map((step, i) => (
              <div key={i} className="process-step relative">
                {/* Node Dot */}
                <div className="absolute top-1.5 left-[-40px] w-4 h-4 bg-[#FAFAFA] border border-gray-300 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                </div>

                <span className="text-[10px] font-mono text-gray-400 mb-1 block">
                  STEP 0{i + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 font-mono leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
