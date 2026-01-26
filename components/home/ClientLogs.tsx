"use client";

import React, { useRef, useState, useMemo } from "react";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { useLanguage } from "@/context/LanguageContext";

const localTranslations = {
  ID: {
    label: "Bukti Sosial",
    title: "Catatan Klien",
    items: [
      {
        id: 1,
        name: "Andi Pratama",
        role: "CEO, TechVenture",
        text: "Eksekusi teknis yang luar biasa. Website kami performanya meningkat 200% setelah ditulis ulang dengan Next.js.",
        tag: "Verified Client",
      },
      {
        id: 2,
        name: "Sarah Wijaya",
        role: "Product Owner, RetailHub",
        text: "Komunikasi lancar dan hasil akhir melebihi ekspektasi. Sangat mengerti UX dengan mendalam.",
        tag: "Project: E-Commerce",
      },
      {
        id: 3,
        name: "Budi Santoso",
        role: "Founder, KopiKultur",
        text: "Sistem manajemen stabil. Dokumentasi lengkap dan mudah dipahami oleh tim awam teknis.",
        tag: "Long-term Partner",
      },
      {
        id: 4,
        name: "Diana Lim",
        role: "Marketing Dir, CreativeSpace",
        text: "Desain visual sangat 'on-point' dengan branding kami. Sangat merekomendasikan Bagian.",
        tag: "Creative Project",
      },
      {
        id: 5,
        name: "Eko Prasetyo",
        role: "CTO, FinTech Solutions",
        text: "Kode bersih dan terstruktur. Mudah di-maintain oleh tim internal kami setelah serah terima.",
        tag: "Tech Audit",
      },
    ],
  },
  EN: {
    label: "Social Proof",
    title: "Client Logs",
    items: [
      {
        id: 1,
        name: "Andi Pratama",
        role: "CEO, TechVenture",
        text: "Outstanding technical execution. Performance increased by 200% after the rewrite to Next.js.",
        tag: "Verified Client",
      },
      {
        id: 2,
        name: "Sarah Wijaya",
        role: "Product Owner, RetailHub",
        text: "Communication was smooth and the result exceeded expectations. Deep UX understanding.",
        tag: "Project: E-Commerce",
      },
      {
        id: 3,
        name: "Budi Santoso",
        role: "Founder, KopiKultur",
        text: "The management system built is incredibly stable. Documentation is thorough.",
        tag: "Long-term Partner",
      },
      {
        id: 4,
        name: "Diana Lim",
        role: "Marketing Dir, CreativeSpace",
        text: "The visual design produced was very 'on-point' with our branding.",
        tag: "Creative Project",
      },
      {
        id: 5,
        name: "Eko Prasetyo",
        role: "CTO, FinTech Solutions",
        text: "Clean and structured code. Very easy for our internal team to maintain.",
        tag: "Tech Audit",
      },
    ],
  },
};

const ClientLogs = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang];

  // Refs untuk kontrol manual Swiper & Progress Bar
  const swiperRef = useRef<SwiperType | null>(null);
  const progressContent = useRef<HTMLDivElement>(null);

  const [realIndex, setRealIndex] = useState(0);

  // --- SOLUSI 1: DUPLIKASI DATA ---
  // Kita melipatgandakan items agar Swiper punya cukup 'buffer' untuk looping seamless.
  // Original: 5 items -> Menjadi: 15 items (3x lipat)
  // Ini mencegah slide "habis" di tengah jalan.
  const originalItems = content.items;
  const loopItems = useMemo(() => {
    return [...originalItems, ...originalItems, ...originalItems];
  }, [originalItems]);

  const onAutoplayTimeLeft = (
    s: SwiperType,
    time: number,
    progress: number
  ) => {
    if (progressContent.current) {
      progressContent.current.style.width = `${(1 - progress) * 100}%`;
    }
  };

  return (
    <section className="w-full py-24 border-b border-gray-200 overflow-hidden relative max-w-7xl mx-auto">
      {/* Background Decor */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
          / {content.label}
        </span>
        <h2 className="text-3xl md:text-4xl font-medium text-[#1A1A1A]">
          {content.title}
        </h2>
      </div>

      {/* --- SWIPER CONTAINER --- */}
      <div className="relative z-10 w-full">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true} // Loop tetap aktif
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            // --- SOLUSI 2: MODULO INDEX ---
            // Karena items kita duplikasi jadi 15, index bisa sampai 14.
            // Kita gunakan % (modulo) agar angkanya kembali ke 0-4.
            const index = swiper.realIndex % originalItems.length;
            setRealIndex(index);
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="client-logs-swiper !overflow-visible"
        >
          {loopItems.map((item, index) => (
            // Penting: Gunakan index di key agar React menganggapnya elemen unik
            <SwiperSlide
              key={`${item.id}-${index}`}
              className="!w-[350px] md:!w-[420px]"
            >
              {({ isActive }) => (
                <div
                  className={`
                    relative p-8 rounded-xl border transition-all duration-500 ease-out select-none cursor-grab active:cursor-grabbing
                    ${
                      isActive
                        ? "bg-white border-gray-400 scale-100 opacity-100 shadow-2xl shadow-gray-200 blur-0 z-10"
                        : "bg-[#FAFAFA] border-transparent scale-90 opacity-40 blur-[1px] z-0 grayscale"
                    }
                  `}
                >
                  <div className="absolute top-4 right-6 text-6xl font-serif text-gray-100 select-none pointer-events-none">
                    &ldquo;
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <span
                        className={`
                        inline-block px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm border transition-colors
                        ${isActive ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-200"}
                      `}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <p
                      className={`
                        text-sm font-medium leading-relaxed mb-8 min-h-[80px] transition-colors
                        ${isActive ? "text-gray-800" : "text-gray-400"}
                    `}
                    >
                      {item.text}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold border transition-colors
                          ${isActive ? "bg-gray-100 border-gray-200 text-black" : "bg-gray-50 border-transparent text-gray-300"}
                      `}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-bold leading-none mb-1 transition-colors ${isActive ? "text-black" : "text-gray-400"}`}
                        >
                          {item.name}
                        </h4>
                        <p className="text-[10px] font-mono text-gray-400 uppercase">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- CONTROLS & INDICATOR --- */}
      <div className="max-w-xs mx-auto mt-12 flex flex-col gap-6 relative z-20">
        <div className="flex justify-between items-center px-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <span className="text-[10px] font-mono text-gray-400 tracking-widest select-none">
            {/* Gunakan realIndex yang sudah di-modulo tadi */}
            {realIndex + 1} / {originalItems.length}
          </span>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="w-full h-[2px] bg-gray-100 rounded-full overflow-hidden relative">
          <div
            ref={progressContent}
            className="absolute top-0 left-0 h-full bg-black origin-left"
            style={{ width: "0%" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogs;
