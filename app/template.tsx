"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface LenisInstance {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean; duration?: number }
  ) => void;
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1. Reset Scroll Position (CRITICAL untuk menghindari Jitter scroll)
    const customWindow = window as unknown as Window & {
      lenis?: LenisInstance;
    };
    if (customWindow.lenis) {
      customWindow.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      // 2. SETUP AWAL (INSTAN SEBELUM PAINT)
      // Kita gunakan fromTo agar state awal dan akhir terkunci pasti.
      // Jarak y dikurangi jadi 20px saja agar tidak ada lonjakan layout drastis.

      gsap.fromTo(
        containerRef.current,
        {
          y: 20, // Gerakan naik yang sangat halus (subtle)
          opacity: 0, // Mulai invisible
          scale: 0.98, // Sedikit lebih kecil (depth effect)
          filter: "blur(10px)", // Blur untuk menyamarkan rendering pixel
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8, // Durasi yang pas (tidak terlalu cepat/lambat)
          ease: "power3.out", // Easing keluar yang lembut
          delay: 0.1, // Delay mikro untuk membiarkan browser selesai layouting
          clearProps: "all", // Wajib: Hapus semua style inline setelah selesai agar tidak mengganggu CSS layout/fixed elements
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      key={pathname}
      // "min-h-screen" penting agar footer tidak naik-turun saat konten loading
      // "w-full" agar lebar konsisten
      className="min-h-screen w-full"
      // INLINE STYLE WAJIB:
      // Memaksa opacity 0 sejak detik pertama HTML dirender oleh React.
      // Ini mencegah "Flash" konten yang belum ter-style.
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
