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
    gsap.registerPlugin(ScrollTrigger);

    // 3. Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
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

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Cleanup saat unmount
    return () => {
      lenis.destroy();
      customWindow.lenis = undefined;
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return <div className="smooth-scroll-wrapper">{children}</div>;
}
