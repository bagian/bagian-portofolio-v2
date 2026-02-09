"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { X, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("bagian_welcome_seen");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen && overlayRef.current && modalRef.current) {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(overlayRef.current, {
        opacity: 1,
        display: "flex",
        duration: 0.4,
      })
        .fromTo(
          modalRef.current,
          { scale: 0.9, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" }
        )
        .from(
          ".modal-item",
          { opacity: 1, y: 15, stagger: 0.1, duration: 0.4 },
          "-=0.3"
        );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!modalRef.current || !overlayRef.current) return;

    gsap.to(modalRef.current, {
      scale: 0.95,
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
        localStorage.setItem("bagian_welcome_seen", "true");
      },
    });
  };

  if (!isOpen) return null;

  const content = {
    ID: {
      tag: "Pengumuman",
      title: "Mulai Evolusi Digital Anda",
      desc: "Selamat datang di Bagian Corps. Kami siap membantu mentransformasi ide kompleks Kakak menjadi solusi digital yang nyata dan scalable. Mulai Sekarang untuk masa depan digital yang lebih cerah.",
      btn: "Jelajahi Layanan",
    },
    EN: {
      tag: "Announcement",
      title: "Start Your Digital Evolution",
      desc: "Welcome to Bagian Corps. We are ready to help transform your complex ideas into real, scalable digital solutions. Join us today and start building for a brighter digital future now.",
      btn: "Explore Services",
    },
  };

  const t = content[lang as "ID" | "EN"] || content.EN;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/10 backdrop-blur-sm p-4 opacity-0"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-[100] p-2 bg-white/80 hover:bg-white rounded-full text-black transition-all shadow-sm active:scale-90"
        >
          <X size={18} />
        </button>
        <div className="relative h-[180px] md:h-[260px] w-full bg-black overflow-hidden">
          <Image
            src="/images/welcome/welcome-banners.png"
            alt="Welcome Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-[1]"></div>
        </div>
        <div className="p-8 pt-10 text-left relative z-10">
          <h2 className="modal-item relative z-20 text-2xl md:text-3xl font-bold tracking-tight text-black mb-4">
            {t.title}
          </h2>
          <p className="modal-item relative z-20 text-gray-500 text-sm leading-relaxed mb-8">
            {t.desc}
          </p>

          <button
            onClick={handleClose}
            className="modal-item group relative z-30 w-full py-4 bg-black text-white rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
          >
            {t.btn}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <div className="modal-item mt-10 text-center relative z-20">
            <p className="text-[9px] font-mono text-gray-300 uppercase tracking-[0.3em]">
              Bagian Corps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
