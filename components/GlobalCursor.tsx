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

    // Setup awal: Pastikan titik pusat kursor tepat di ujung mouse
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // Perbaikan: Pastikan target adalah Element
      const target = e.target as HTMLElement;

      // Cek apakah target memiliki metode closest (menghindari error pada Text Nodes atau Window)
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
      // pointer-events-none adalah WAJIB agar klik mouse tidak terhalang oleh div kursor
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center rounded-full mix-blend-difference bg-white will-change-transform transition-[width,height] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      style={{
        width: cursorType === "pointer" ? "22px" : "100px",
        height: cursorType === "pointer" ? "22px" : "100px",
      }}
    >
      <span className="text-black font-mono text-[10px] font-bold tracking-widest uppercase text-center px-2">
        {cursorType === "drag" ? (isMouseDown ? "GRAB" : "DRAG") : null}
        {cursorType === "" && ""}
      </span>
    </div>
  );
}
