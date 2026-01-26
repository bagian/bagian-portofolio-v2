"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<"pointer" | "drag" | "">(
    "pointer"
  );
  const [isMouseDown, setIsMouseDown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // --- LOGIKA BARU UNTUK POSISI TENGAH ---
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // 1. Set posisi awal elemen tepat di tengah layar
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: centerX,
      y: centerY,
    });
    // ---------------------------------------

    // Inisialisasi quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    // Opsional: Beritahu quickTo bahwa kita mulai dari tengah
    // agar animasi pertama kali mouse bergerak menjadi mulus dari tengah ke posisi mouse
    xTo(centerX);
    yTo(centerY);

    const moveCursor = (e: MouseEvent) => {
      // Saat mouse bergerak, cursor akan mengejar posisi mouse asli
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement;

      // Cek safety target
      if (!target || typeof target.closest !== "function") return;

      const isLink = target.closest("a") || target.closest("button");
      const isHorizontal =
        target.closest(".horizontal-panel") ||
        target.closest("#horizontal-container");

      if (isLink) {
        setCursorType("");
      } else if (isHorizontal) {
        setCursorType("drag");
      } else {
        setCursorType("pointer");
      }
    };

    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [pathname]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] lg:flex items-center justify-center rounded-full mix-blend-difference bg-white will-change-transform transition-[width,height] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hidden"
      style={{
        width: cursorType === "pointer" ? "20px" : "80px",
        height: cursorType === "pointer" ? "20px" : "80px",
      }}
    >
      <span className="text-black font-mono text-[10px] font-bold tracking-widest uppercase text-center px-2">
        {cursorType === "drag" ? (isMouseDown ? "GRAB" : "DRAG") : null}
        {cursorType === "" && ""}
      </span>
    </div>
  );
}
