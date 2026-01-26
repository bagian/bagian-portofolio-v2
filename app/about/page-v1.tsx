"use client";

import React, { useLayoutEffect, useRef, useMemo, Suspense } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import {
  LightBulbIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  PresentationChartLineIcon,
  CpuChipIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

gsap.registerPlugin(ScrollTrigger);

// --- KONTEN (ID & EN) ---
const CONTENT = {
  ID: {
    hero: {
      title: "Bukan Sekadar Software House.",
      subtitle:
        "Kami adalah mitra strategis yang menerjemahkan visi kompleks menjadi solusi digital yang elegan, fungsional, dan berdampak.",
    },
    story: {
      title: "Misi Kami",
      p1: "Di Bagian, kami percaya bahwa teknologi seharusnya tidak membingungkan. Teknologi harusnya menjadi alat yang membebaskan potensi bisnis Anda, bukan menghambatnya.",
      p2: "Berawal dari sekumpulan pengembang yang bersemangat di Sidoarjo, kami tumbuh menjadi tim yang dipercaya oleh berbagai industri untuk menangani transformasi digital mereka.",
      quote:
        "Kami tidak hanya menulis kode. Kami menulis masa depan bisnis Anda.",
    },
    stats: [
      { number: "5+", label: "Tahun Pengalaman" },
      { number: "100+", label: "Proyek Selesai" },
      { number: "25+", label: "Klien Partner" },
      { number: "100%", label: "Dedikasi" },
    ],
    clients: {
      title: "Dipercaya Oleh",
      logos: [
        "TechCorp",
        "IndoRetail",
        "GlobalLogistics",
        "CreativeSpace",
        "FinTech Asia",
        "HealthPlus",
        "AgroFuture",
        "BuildIt",
        "SmartHome",
      ],
    },
    process: {
      title: "Cara Kami Bekerja",
      subtitle: "Proses terstruktur untuk hasil yang terukur.",
      steps: [
        {
          icon: PresentationChartLineIcon,
          title: "01. Discovery",
          desc: "Kami menggali masalah inti, tujuan bisnis, dan audiens Anda sebelum menulis satu baris kode pun.",
        },
        {
          icon: CpuChipIcon,
          title: "02. Strategy & Design",
          desc: "Merancang arsitektur sistem dan antarmuka pengguna (UI/UX) yang intuitif dan skalabel.",
        },
        {
          icon: CodeBracketIcon,
          title: "03. Development",
          desc: "Eksekusi kode dengan standar industri (Clean Code), keamanan tinggi, dan performa maksimal.",
        },
        {
          icon: RocketLaunchIcon,
          title: "04. Launch & Scale",
          desc: "Peluncuran produk, monitoring pasca-rilis, dan iterasi untuk pertumbuhan berkelanjutan.",
        },
      ],
    },
    values: {
      title: "Nilai Inti",
      items: [
        {
          icon: LightBulbIcon,
          title: "Inovasi Terarah",
          desc: "Kami tidak sekadar mengikuti tren. Kami memilih teknologi yang paling relevan untuk memecahkan masalah Anda.",
        },
        {
          icon: ShieldCheckIcon,
          title: "Integritas Data",
          desc: "Keamanan adalah prioritas mutlak. Kami membangun sistem dengan standar keamanan tinggi.",
        },
        {
          icon: UserGroupIcon,
          title: "Kolaborasi Transparan",
          desc: "Tidak ada istilah teknis yang disembunyikan. Komunikasi jujur dan terbuka setiap saat.",
        },
        {
          icon: RocketLaunchIcon,
          title: "Performa Tinggi",
          desc: "Aplikasi lambat adalah musuh. Kami mengoptimalkan setiap baris kode untuk kecepatan maksimal.",
        },
        {
          icon: ClockIcon,
          title: "Tepat Waktu",
          desc: "Manajemen proyek yang disiplin memastikan kami mengirimkan hasil sesuai tenggat waktu.",
        },
        {
          icon: SparklesIcon,
          title: "Dampak Nyata",
          desc: "Tujuan akhir kami bukan peluncuran aplikasi, melainkan pertumbuhan bisnis Anda setelahnya.",
        },
      ],
    },
    team: {
      title: "Tim Kami",
      subtitle: "Bertemu dengan otak di balik layar.",
      members: [
        {
          name: "Gilang Ramadhan",
          role: "Founder & CEO",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
        },
        {
          name: "Sarah Wijaya",
          role: "Lead Designer",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        },
        {
          name: "Budi Santoso",
          role: "Senior Engineer",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        },
        {
          name: "Linda Kusuma",
          role: "Project Manager",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
        },
      ],
    },
    culture: {
      title: "Bergabunglah dalam Perjalanan Kami",
      desc: "Kami selalu mencari talenta berbakat yang memiliki visi yang sama.",
    },
  },
  EN: {
    hero: {
      label: "About Us",
      title: "Not Just Another Software House.",
      subtitle:
        "We are strategic partners translating complex visions into elegant, functional, and impactful digital solutions.",
    },
    story: {
      title: "Our Mission",
      p1: "At Bagian, we believe technology shouldn't be confusing. It should be a tool that liberates your business potential, not hinders it.",
      p2: "Starting as a group of passionate developers in Sidoarjo, we have grown into a team trusted by various industries to handle their digital transformation.",
      quote: "We don't just write code. We write the future of your business.",
    },
    stats: [
      { number: "5+", label: "Years Experience" },
      { number: "100+", label: "Projects Done" },
      { number: "25+", label: "Client Partners" },
      { number: "100%", label: "Dedication" },
    ],
    clients: {
      title: "Trusted By",
      logos: [
        "YellowKost & Partner",
        "Lentera Fajar Indonesia",
        "Kinaya Interior Design",
        "KAI Wisata",
      ],
    },
    process: {
      title: "How We Work",
      subtitle: "A structured process for measurable results.",
      steps: [
        {
          icon: PresentationChartLineIcon,
          title: "01. Discovery",
          desc: "We dig into your core problems, business goals, and audience before writing a single line of code.",
        },
        {
          icon: CpuChipIcon,
          title: "02. Strategy & Design",
          desc: "Designing system architecture and user interfaces (UI/UX) that are intuitive and scalable.",
        },
        {
          icon: CodeBracketIcon,
          title: "03. Development",
          desc: "Executing code with industry standards (Clean Code), high security, and maximum performance.",
        },
        {
          icon: RocketLaunchIcon,
          title: "04. Launch & Scale",
          desc: "Product launch, post-release monitoring, and iteration for sustainable growth.",
        },
      ],
    },
    values: {
      title: "Core Values",
      items: [
        {
          icon: LightBulbIcon,
          title: "Purposeful Innovation",
          desc: "We don't just follow trends. We choose the most relevant technology to solve your problems.",
        },
        {
          icon: ShieldCheckIcon,
          title: "Data Integrity",
          desc: "Security is absolute. We build systems with high security standards.",
        },
        {
          icon: UserGroupIcon,
          title: "Transparent Collaboration",
          desc: "No hidden technical jargon. Honest and open communication at all times.",
        },
        {
          icon: RocketLaunchIcon,
          title: "High Performance",
          desc: "Slow apps are the enemy. We optimize every line of code for maximum speed.",
        },
        {
          icon: ClockIcon,
          title: "On-Time Delivery",
          desc: "Disciplined project management ensures we deliver results on deadline.",
        },
        {
          icon: SparklesIcon,
          title: "Real Impact",
          desc: "Our end goal is not just the app launch, but the growth of your business thereafter.",
        },
      ],
    },
    team: {
      title: "Our Team",
      subtitle: "Meet the brains behind the scenes.",
      members: [
        {
          name: "Gilang Ramadhan",
          role: "Founder & CEO",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
        },
        {
          name: "Sarah Wijaya",
          role: "Lead Designer",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        },
        {
          name: "Budi Santoso",
          role: "Senior Engineer",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
        },
        {
          name: "Linda Kusuma",
          role: "Project Manager",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
        },
      ],
    },
    culture: {
      title: "Join Our Journey",
      desc: "We are always looking for talented individuals who share the same vision.",
    },
  },
};

const AboutContent = () => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const t = useMemo(() => (lang === "EN" ? CONTENT.EN : CONTENT.ID), [lang]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        ".hero-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Story
      gsap.fromTo(
        ".story-text",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: ".story-section", start: "top 80%" },
        }
      );

      // Stats
      gsap.fromTo(
        ".stat-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".stats-section", start: "top 85%" },
        }
      );

      // --- MARQUEE ANIMATION (ANTI-JITTER FIXED) ---
      if (marqueeRef.current) {
        // Force 3D untuk mengaktifkan GPU Acceleration
        gsap.set(marqueeRef.current, { force3D: true });

        gsap.to(marqueeRef.current, {
          xPercent: -50, // Pindah 50% (setengah dari total lebar yang sudah diduplikasi 4x)
          repeat: -1,
          duration: 40, // Sedikit diperlambat agar smooth
          ease: "linear", // LINEAR (bukan "none") agar konsisten
          force3D: true, // Wajib: agar render di GPU
        });
      }

      // Process
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".process-section", start: "top 75%" },
        }
      );

      // Values
      gsap.fromTo(
        ".value-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".values-section", start: "top 75%" },
        }
      );

      // Team
      gsap.fromTo(
        ".team-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-section", start: "top 75%" },
        }
      );

      // Culture Image
      gsap.fromTo(
        ".culture-image",
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".culture-section", start: "top 80%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  // DUPLIKASI 4X: Agar cukup panjang untuk loop tanpa gap/lompatan (jitter visual)
  const marqueeLogos = [
    ...t.clients.logos,
    ...t.clients.logos,
    ...t.clients.logos,
    ...t.clients.logos,
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-gray-900 pt-32 pb-20"
    >
      {/* --- HERO SECTION --- */}
      <section className="px-6 md:px-12 mb-24 md:mb-32">
        <div className="max-w-7xl mx-auto">
          <h1 className="hero-reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8 max-w-5xl">
            {t.hero.title}
          </h1>
          <p className="hero-reveal text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="story-section px-6 md:px-12 mb-24 md:mb-32 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="story-text relative">
            <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-100 rounded-full mix-blend-multiply blur-xl -z-10"></div>
            <div className="text-3xl md:text-4xl font-serif italic leading-tight text-gray-800 border-l-4 border-indigo-500 pl-6 py-2">
              &quot;{t.story.quote}&quot;
            </div>
          </div>
          <div className="story-text space-y-6 text-lg text-gray-600 leading-relaxed">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              {t.story.title}
            </h2>
            <p>{t.story.p1}</p>
            <p>{t.story.p2}</p>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-section bg-gray-50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="stat-item text-center">
                <div className="text-4xl md:text-6xl font-black text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CLIENTS MARQUEE SECTION --- */}
      <section className="clients-section py-20 mb-24 border-b border-gray-100 overflow-hidden">
        <div className="mb-12 px-6 md:px-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            {t.clients.title}
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="w-full overflow-hidden relative">
          <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* FIX JITTER:
              1. w-fit: Agar container selebar konten
              2. will-change-transform: Beri hint ke browser untuk optimasi
              3. backface-visibility: hidden via style inline
          */}
          <div
            ref={marqueeRef}
            className="flex w-fit items-center gap-16 md:gap-24 whitespace-nowrap will-change-transform"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {marqueeLogos.map((client, idx) => (
              <span
                key={idx}
                className="text-3xl md:text-4xl font-black text-gray-300 hover:text-indigo-600 transition-colors duration-300  uppercase select-none"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="process-section px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {t.process.title}
            </h2>
            <p className="text-xl text-gray-500">{t.process.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.process.steps.map((step, idx) => (
              <div key={idx} className="process-step flex gap-6">
                <div className="shrink-0 w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-gray-100">
                  <step.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="values-section px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:text-center">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2 block">
              Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900">
              {t.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.values.items.map((item, idx) => (
              <div
                key={idx}
                className="value-card group p-8 bg-white border border-gray-100 rounded-3xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="team-section px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              {t.team.title}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl">{t.team.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.members.map((member, idx) => (
              <div key={idx} className="team-card group">
                <div className="relative w-full aspect-[4/5] rounded-2xl mb-6 overflow-hidden shadow-lg bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CULTURE IMAGE --- */}
      <section className="culture-section px-6 md:px-12 mb-20">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600"
            alt="Office Culture"
            fill
            className="culture-image object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                {t.culture.title}
              </h2>
              <p className="text-white/80 text-lg md:text-xl">
                {t.culture.desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AboutContent />
    </Suspense>
  );
};

export default AboutPage;
