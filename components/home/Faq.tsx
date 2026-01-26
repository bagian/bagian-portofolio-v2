"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const localTranslations = {
  ID: {
    label: "Dokumentasi",
    title: "Pertanyaan Umum",
    items: [
      {
        q: "Apakah Anda menerima proyek berskala kecil?",
        a: "Tentu. Saya percaya setiap sistem besar dimulai dari komponen kecil. Selama visi proyek jelas, saya siap membantu.",
      },
      {
        q: "Berapa lama estimasi pengerjaan website?",
        a: "Tergantung kompleksitas. Landing page standar biasanya 1-2 minggu, sementara sistem aplikasi custom bisa memakan waktu 4-8 minggu.",
      },
      {
        q: "Apakah kode sumber (Source Code) akan diberikan?",
        a: "Ya, 100%. Anda akan mendapatkan repositori Git penuh dengan dokumentasi cara penggunaan dan deployment.",
      },
      {
        q: "Bagaimana dengan maintenance setelah proyek selesai?",
        a: "Saya menyediakan garansi bug-fix selama 30 hari. Untuk maintenance jangka panjang, tersedia paket retainer bulanan.",
      },
    ],
  },
  EN: {
    label: "Documentation",
    title: "Common Queries",
    items: [
      {
        q: "Do you accept small-scale projects?",
        a: "Absolutely. I believe every large system starts with small components. As long as the vision is clear, I'm ready to help.",
      },
      {
        q: "What is the estimated timeline?",
        a: "Depends on complexity. Standard landing pages take 1-2 weeks, while custom app systems can take 4-8 weeks.",
      },
      {
        q: "Will I own the Source Code?",
        a: "Yes, 100%. You will receive the full Git repository along with usage and deployment documentation.",
      },
      {
        q: "What about post-launch maintenance?",
        a: "I provide a 30-day bug-fix warranty. For long-term maintenance, monthly retainer packages are available.",
      },
    ],
  },
};

const FAQ = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useGSAP(
    () => {
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
            / {content.label}
          </span>
          <h2 className="text-3xl font-medium">{content.title}</h2>
        </div>

        <div className="flex flex-col gap-4">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="faq-item bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-colors"
              onClick={() => toggleAccordion(i)}
            >
              <div className="p-6 flex justify-between items-center">
                <h3
                  className={`font-mono text-sm md:text-base transition-colors ${activeIndex === i ? "text-black font-bold" : "text-gray-600"}`}
                >
                  {/* <span className="text-gray-400 mr-4">0{i + 1}</span> */}
                  {item.q}
                </h3>
                <div
                  className={`w-4 h-4 relative transition-transform duration-300 ${activeIndex === i ? "rotate-180" : ""}`}
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Manual Height Animation with CSS/Tailwind for simplicity combined with React State */}
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${activeIndex === i ? "max-h-48" : "max-h-0"}`}
              >
                <div className="p-6 pt-6 text-sm text-gray-500 leading-relaxed border-t border-gray-50 bg-gray-50/50">
                  <p className="pl-10">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
