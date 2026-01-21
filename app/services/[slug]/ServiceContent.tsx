"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface ServiceData {
  title: string;
  description: string;
  content: string;
  features: string[]; // Tambahkan ini
  backBtn: string;
  sidebarTitle: string;
  sidebarDesc: string;
  cta: string;
}

interface ServiceContentProps {
  slug: string;
  allData: {
    ID: Record<string, ServiceData>;
    EN: Record<string, ServiceData>;
  };
}

export default function ServiceContent({ slug, allData }: ServiceContentProps) {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const data = allData[lang as keyof typeof allData]?.[slug];

  useLayoutEffect(() => {
    if (!data || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [data, lang]);

  if (!data) return null;

  return (
    <main
      ref={containerRef}
      className="min-h-screen pt-32 md:pt-48 pb-20 px-6 md:px-24 bg-white text-black"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Navigation Back */}
        <Link
          href="/services"
          className="reveal group flex items-center gap-2 mb-12 w-fit cursor-none"
        >
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <ArrowLeftIcon className="w-4 h-4" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
            {data.backBtn}
          </span>
        </Link>

        {/* Header Section */}
        <div className="border-b border-gray-100 pb-12 mb-16">
          <h1 className="reveal text-5xl md:text-[5vw] font-black uppercase tracking-tighter leading-[0.85] mb-8">
            {data.title}
          </h1>

          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="text-xl md:text-2xl font-medium max-w-2xl leading-tight text-gray-800">
              {data.description}
            </p>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-300">
              Service / Detail / {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-7 lg:col-span-8">
            <div className="reveal space-y-12">
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p className="text-lg md:text-xl whitespace-pre-line">
                  {data.content}
                </p>
              </div>

              {/* Fitur / Includes List */}
              {data.features && data.features.length > 0 && (
                <div className="pt-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-8 text-black">
                    {lang === "ID" ? "Apa yang termasuk:" : "What's included:"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 group hover:bg-black transition-colors duration-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black shrink-0 transition-colors">
                          <CheckIcon className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="reveal p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6">
                  {data.sidebarTitle}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  {data.sidebarDesc}
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-between w-full p-4 bg-black text-white rounded-full hover:bg-indigo-600 transition-colors group cursor-none shadow-xl"
                >
                  <span className="font-mono text-xs uppercase tracking-widest pl-2">
                    {data.cta}
                  </span>
                  <ArrowUpRightIcon className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
