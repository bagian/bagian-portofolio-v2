"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// 1. Definisikan interface untuk memperluas objek window secara global
interface CustomWindow extends Window {
  lenis?: Lenis;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 2. Daftarkan plugin GSAP

    // 3. Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 4. Cast window ke CustomWindow agar tidak error 'any'
    const customWindow = window as unknown as CustomWindow;
    customWindow.lenis = lenis;

    // Sinkronisasi dengan ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Tambahkan ticker GSAP untuk menjalankan RAF Lenis
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    ScrollTrigger.defaults({ scroller: document.body });
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    // Cleanup saat unmount
    return () => {
      lenis.destroy();
      customWindow.lenis = undefined;
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <div className="smooth-scroll-wrapper">{children}</div>;
}
