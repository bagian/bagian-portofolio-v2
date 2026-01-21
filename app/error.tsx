"use client";

import React, { useMemo, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

// --- DEFINISI KONTEN (ID & EN) ---
const CONTENT = {
  ID: {
    label: "TERJADI KESALAHAN",
    title: "Ups! Ada sesuatu yang salah.",
    desc: "Jangan khawatir, ini bukan salah Anda. Terjadi kesalahan teknis pada sistem kami. Silakan coba muat ulang.",
    btn_retry: "Coba Lagi",
    btn_home: "Kembali ke Beranda",
  },
  EN: {
    label: "SYSTEM ERROR",
    title: "Oops! Something went wrong.",
    desc: "Don't worry, this isn't your fault. We encountered a technical glitch. Please try refreshing.",
    btn_retry: "Try Again",
    btn_home: "Back to Home",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => (lang === "EN" ? CONTENT.EN : CONTENT.ID), [lang]);

  // --- GSAP ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".error-icon", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
      })
        .from(
          ".error-text",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.4",
        )
        .from(
          ".error-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.6",
        );
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white text-gray-900 relative overflow-hidden"
    >
      {/* Background Blobs (Sama seperti Contact Page) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-indigo-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[35vw] h-[35vw] bg-purple-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Icon */}
        <div className="error-icon w-20 h-20 mx-auto bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-8 border border-red-100 shadow-xl shadow-red-500/10">
          <ExclamationTriangleIcon className="w-10 h-10" />
        </div>

        {/* Label */}
        <span className="error-text inline-block py-1 px-3 border border-red-200 rounded-full bg-red-50 text-[10px] font-bold tracking-[0.2em] text-red-600 mb-6 uppercase">
          {t.label}
        </span>

        {/* Title */}
        <h1 className="error-text text-4xl md:text-5xl font-black tracking-tight mb-4 text-gray-900 leading-tight">
          {t.title}
        </h1>

        {/* Description */}
        <p className="error-text text-gray-500 mb-10 leading-relaxed">
          {t.desc}
          {/* Opsional: Tampilkan pesan error asli jika di mode development */}
          {process.env.NODE_ENV === "development" && (
            <span className="block mt-4 p-4 bg-gray-50 rounded-lg font-mono text-xs text-red-600 break-words border border-gray-200">
              Error: {error.message}
            </span>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* Tombol Reset (Try Again) */}
          <button
            onClick={() => reset()}
            className="error-btn w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transform active:scale-[0.98]"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>{t.btn_retry}</span>
          </button>

          {/* Tombol Home */}
          <Link
            href="/"
            className="error-btn w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.98]"
          >
            <HomeIcon className="w-5 h-5" />
            <span>{t.btn_home}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
