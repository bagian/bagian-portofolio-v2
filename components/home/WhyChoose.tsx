"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Zap,
  Code2,
  HeartHandshake,
  Laptop,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Registrasi plugin
gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const CONTENT = {
    ID: {
      title: "Mengapa Memilih",
      subtitle: "Bagian Corps?",
      features: [
        {
          id: 1,
          title: "Digital Excellence",
          desc: "Kami tidak hanya membangun, kami menciptakan standar kualitas tinggi untuk setiap baris kode dan pixel.",
          icon: <Zap className="text-indigo-600" size={24} />,
        },
        {
          id: 2,
          title: "Skalabel & Masa Depan",
          desc: "Arsitektur software yang kami bangun siap berkembang seiring pertumbuhan bisnis Anda.",
          icon: <BarChart3 className="text-indigo-600" size={24} />,
        },
        {
          id: 3,
          title: "Transparansi Penuh",
          desc: "Melalui dokumen SOW yang jelas, Anda tahu persis apa yang dikerjakan, kapan, dan bagaimana.",
          icon: <ShieldCheck className="text-indigo-600" size={24} />,
        },
        {
          id: 4,
          title: "Teknologi Modern",
          desc: "Menggunakan tech-stack terbaru seperti Next.js dan TypeScript untuk performa maksimal.",
          icon: <Code2 className="text-indigo-600" size={24} />,
        },
        {
          id: 5,
          title: "Pendekatan Kolaboratif",
          desc: "Kami memposisikan diri sebagai partner IT, bukan sekadar vendor. Kesuksesan Anda adalah misi kami.",
          icon: <HeartHandshake className="text-indigo-600" size={24} />,
        },
        {
          id: 6,
          title: "Desain Berorientasi Pengguna",
          desc: "UI/UX yang intuitif untuk memastikan konversi dan kenyamanan pengguna aplikasi Anda.",
          icon: <Laptop className="text-indigo-600" size={24} />,
        },
      ],
    },
    EN: {
      title: "Why Choose",
      subtitle: "Bagian Corps?",
      features: [
        {
          id: 1,
          title: "Digital Excellence",
          desc: "We don't just build; we create high-quality standards for every line of code and pixel.",
          icon: <Zap className="text-indigo-600" size={24} />,
        },
        {
          id: 2,
          title: "Scalable & Future-Proof",
          desc: "The software architecture we build is ready to evolve alongside your business growth.",
          icon: <BarChart3 className="text-indigo-600" size={24} />,
        },
        {
          id: 3,
          title: "Full Transparency",
          desc: "With a clear SOW document, you know exactly what is being worked on, when, and how.",
          icon: <ShieldCheck className="text-indigo-600" size={24} />,
        },
        {
          id: 4,
          title: "Modern Tech Stack",
          desc: "Utilizing the latest technologies like Next.js and TypeScript for maximum performance.",
          icon: <Code2 className="text-indigo-600" size={24} />,
        },
        {
          id: 5,
          title: "Collaborative Approach",
          desc: "We position ourselves as your IT partner, not just a vendor. Your success is our mission.",
          icon: <HeartHandshake className="text-indigo-600" size={24} />,
        },
        {
          id: 6,
          title: "User-Centric Design",
          desc: "Intuitive UI/UX to ensure conversions and provide comfort for your application users.",
          icon: <Laptop className="text-indigo-600" size={24} />,
        },
      ],
    },
  };

  const current = CONTENT[lang as "ID" | "EN"] || CONTENT.EN;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none none",
        },
        once: true,
      });
      tl.from(".why-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      tl.from(
        ".feature-item",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.6"
      );
      tl.from(
        ".why-footer-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "expo.out",
        },
        "-=0.5"
      ).from(
        ".why-footer-text",
        {
          opacity: 0,
          y: 10,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-4 border-b border-gray-50 pb-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 text-center md:text-left why-header">
          <span className="text-3xl md:text-5xl font-semibold tracking-tight">
            {current.title} <br />
          </span>
          <span className="text-indigo-600 text-3xl md:text-5xl">
            {current.subtitle}
          </span>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 md:gap-y-2 ">
          {current.features.map((item) => (
            <div
              key={item.id}
              className="feature-item group flex flex-col items-start  p-6 md:p-8 bg-[#FAFAFA] rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="mb-6 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-tight font-mono">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-24 pt-12 border-t border-gray-100 why-footer-line hidden md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="text-[10px] why-footer-text font-mono uppercase tracking-[0.3em] text-indigo-500">
            Built for scale
          </p>
          <p className="text-[10px] why-footer-text font-mono uppercase tracking-[0.3em] text-indigo-500">
            Driven by excellence
          </p>
          <p className="text-[10px] why-footer-text font-mono uppercase tracking-[0.3em] text-indigo-500">
            Focus on results
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
