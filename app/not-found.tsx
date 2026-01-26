"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // 1. INISIALISASI STATE DENGAN NILAI STATIS (Default Value)
  // Ini mencegah error "Hydration Mismatch" antara server dan client.
  const [errorId, setErrorId] = useState("ERR_SYSTEM_000");
  const [timestamp, setTimestamp] = useState("INITIALIZING...");

  // 2. GUNAKAN USEEFFECT UNTUK DATA (Berjalan setelah render visual)
  // Math.random() adalah "impure", jadi harus dijalankan di dalam useEffect agar stabil.
  useEffect(() => {
    const timer = setTimeout(() => {
      const randomId = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
      setErrorId(`ERR_0x${randomId}`);
      setTimestamp(new Date().toISOString());
    }, 0);

    return () => clearTimeout(timer);
  }, []); // Dependency array kosong = jalan sekali saat mount

  // 3. GUNAKAN USELAYOUTEFFECT UNTUK ANIMASI (Berjalan sebelum paint)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation
      gsap.from(".reveal-anim", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      // 404 Text Glitch/Hover Effect
      if (textRef.current) {
        gsap.to(textRef.current, {
          letterSpacing: "10px",
          duration: 2,
          ease: "elastic.out(1, 0.3)",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse Move Parallax for 404 Text
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(textRef.current, {
      x: xPos,
      y: yPos,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen py-32  font-sans flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Status Label */}
        <div className="reveal-anim inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-600">
            System_Critical_Error
          </span>
        </div>

        {/* 404 Giant Text */}
        <h1
          ref={textRef}
          className="reveal-anim text-[150px] md:text-[200px] leading-none font-black tracking-tighter text-black select-none mix-blend-multiply opacity-90"
        >
          404
        </h1>

        {/* Technical Description */}
        <div className="reveal-anim mt-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            The requested resource path could not be resolved by the server. It
            might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Fake System Log (Decorative) */}
        <div className="reveal-anim w-full bg-gray-50 border border-gray-200 p-6 rounded-lg text-left font-mono text-xs text-gray-500 mb-12 shadow-sm max-w-lg mx-auto">
          <div className="flex justify-between border-b border-gray-200 pb-2 mb-3">
            <span>DIAGNOSTIC_REPORT</span>
            {/* suppressHydrationWarning digunakan sebagai pengaman tambahan */}
            <span suppressHydrationWarning>{errorId}</span>
          </div>
          <div className="space-y-1">
            <p>
              <span className="text-red-500">[ERROR]</span> GET request failed
            </p>
            <p>
              <span className="text-blue-500">[INFO]</span> Timestamp:{" "}
              <span suppressHydrationWarning>{timestamp}</span>
            </p>
            <p>
              <span className="text-blue-500">[INFO]</span> User_Agent: Unknown
            </p>
            <p>
              <span className="text-gray-400">[SUGGESTION]</span> Return to base
              coordinates.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="reveal-anim">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
