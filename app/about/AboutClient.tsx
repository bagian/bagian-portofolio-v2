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
      label: "Profil Perusahaan",
      title: "Bukan Sekadar Software House.",
      subtitle:
        "Kami adalah mitra strategis yang menerjemahkan visi kompleks menjadi solusi digital yang elegan, fungsional, dan berdampak.",
    },
    story: {
      title: "Misi Kami",
      p1: "Di Bagian, kami percaya bahwa teknologi seharusnya tidak membingungkan. Teknologi harusnya menjadi alat yang membebaskan potensi bisnis Anda.",
      p2: "Berawal dari sekumpulan pengembang yang bersemangat di Surabaya, kami tumbuh menjadi tim yang dipercaya oleh berbagai industri untuk menangani transformasi digital mereka.",
      quote:
        "Kami tidak hanya menulis kode. Kami menulis masa depan bisnis Anda.",
    },
    stats: [
      { number: "05+", label: "Tahun Pengalaman" }, // Added 0 padding style
      { number: "100+", label: "Proyek Selesai" },
      { number: "25+", label: "Klien Partner" },
      { number: "100%", label: "Dedikasi" },
    ],
    clients: {
      title: "Log Klien",
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
      title: "Protokol Kerja",
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
          desc: "Kami memilih teknologi yang paling relevan untuk memecahkan masalah Anda.",
        },
        {
          icon: ShieldCheckIcon,
          title: "Integritas Data",
          desc: "Keamanan adalah prioritas mutlak. Standar keamanan tinggi.",
        },
        {
          icon: UserGroupIcon,
          title: "Kolaborasi Transparan",
          desc: "Tidak ada istilah teknis yang disembunyikan. Komunikasi jujur.",
        },
        {
          icon: RocketLaunchIcon,
          title: "Performa Tinggi",
          desc: "Optimasi setiap baris kode untuk kecepatan maksimal.",
        },
        {
          icon: ClockIcon,
          title: "Tepat Waktu",
          desc: "Manajemen proyek disiplin sesuai tenggat waktu.",
        },
        {
          icon: SparklesIcon,
          title: "Dampak Nyata",
          desc: "Tujuan akhir kami adalah pertumbuhan bisnis Anda.",
        },
      ],
    },
    team: {
      title: "Personil Inti",
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
      title: "Bergabunglah",
      desc: "Kami selalu mencari talenta berbakat.",
    },
  },
  EN: {
    hero: {
      label: "Company Profile",
      title: "Not Just Another Software House.",
      subtitle:
        "We are strategic partners translating complex visions into elegant, functional, and impactful digital solutions.",
    },
    story: {
      title: "Our Mission",
      p1: "At Bagian, we believe technology shouldn't be confusing. It should be a tool that liberates your business potential.",
      p2: "Starting as a group of passionate developers in Surabaya, we have grown into a team trusted by various industries.",
      quote: "We don't just write code. We write the future of your business.",
    },
    stats: [
      { number: "05+", label: "Years Experience" },
      { number: "100+", label: "Projects Done" },
      { number: "25+", label: "Client Partners" },
      { number: "100%", label: "Dedication" },
    ],
    clients: {
      title: "Client Logs",
      logos: [
        "Kinaya Interior Design",
        "YellowKost & Partner",
        "Lentera Fajar Indonesia",
        "KAI Wisata",
        "Kinaya Interior Design",
        "YellowKost & Partner",
        "Lentera Fajar Indonesia",
        "KAI Wisata",
      ],
    },
    process: {
      title: "Working Protocol",
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
          desc: "We choose the most relevant technology to solve your problems.",
        },
        {
          icon: ShieldCheckIcon,
          title: "Data Integrity",
          desc: "Security is absolute. We build systems with high security standards.",
        },
        {
          icon: UserGroupIcon,
          title: "Transparent Collaboration",
          desc: "No hidden technical jargon. Honest and open communication.",
        },
        {
          icon: RocketLaunchIcon,
          title: "High Performance",
          desc: "We optimize every line of code for maximum speed.",
        },
        {
          icon: ClockIcon,
          title: "On-Time Delivery",
          desc: "Disciplined project management ensures results on deadline.",
        },
        {
          icon: SparklesIcon,
          title: "Real Impact",
          desc: "Our end goal is not just the app launch, but business growth.",
        },
      ],
    },
    team: {
      title: "Core Personnel",
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
      title: "Join Us",
      desc: "We are always looking for talented individuals.",
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
      // 1. Hero Reveal
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

      // 2. Story Section Reveal
      gsap.fromTo(
        ".story-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: { trigger: ".story-section", start: "top 80%" },
        }
      );

      // 3. Stats Reveal (Staggered Numbers)
      gsap.fromTo(
        ".stat-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".stats-section", start: "top 85%" },
        }
      );

      // 4. Marquee Animation (KEPT & UPDATED FOR LIGHT THEME)
      if (marqueeRef.current) {
        gsap.set(marqueeRef.current, { force3D: true });
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 40,
          ease: "linear",
          force3D: true,
        });
      }

      // 5. Process Steps
      gsap.fromTo(
        ".process-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".process-section", start: "top 75%" },
        }
      );

      // 6. Value Cards
      gsap.fromTo(
        ".value-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".values-section", start: "top 75%" },
        }
      );

      // 7. Team Reveal
      gsap.fromTo(
        ".team-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".team-section", start: "top 75%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  // Duplikasi logo untuk marquee
  const marqueeLogos = [
    ...t.clients.logos,
    ...t.clients.logos,
    ...t.clients.logos,
    ...t.clients.logos,
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-32 pb-20 font-sans max-w-7xl mx-auto"
    >
      {/* --- HERO SECTION --- */}
      <section className="relative z-10 px-6 md:px-12 mb-24 md:mb-32">
        <span className="hero-reveal inline-block px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-widest mb-6 text-indigo-500 border-indigo-600">
          ● {t.hero.label}
        </span>
        <h1 className="hero-reveal text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8">
          {t.hero.title}
        </h1>
        <p className="hero-reveal text-sm md:text-md text-gray-500 max-w-xl leading-relaxed font-mono border-l-2 border-gray-200 pl-6">
          {t.hero.subtitle}
        </p>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="story-section relative z-10 px-6 md:px-12 mb-24 md:mb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="story-text">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-6">
              / Mission_Statement
            </h2>
            <div className="text-3xl md:text-4xl font-medium leading-tight">
              &quot;{t.story.quote}&quot;
            </div>
          </div>
          <div className="story-text space-y-6 text-lg text-gray-600 leading-relaxed font-mono text-sm md:text-base">
            <p>{t.story.p1}</p>
            <p>{t.story.p2}</p>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Dashboard Style) --- */}
      <section className="stats-section relative z-10 mb-24 md:px-12 md:border-t md:border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 md:border-t-0 border-r border-t border-l border-gray-200">
            {t.stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-item p-8 md:p-12 text-center group hover:bg-gray-50 transition-colors border-r border-b md:border-b-0 border-gray-200"
              >
                <div className="text-4xl md:text-5xl font-bold text-black mb-2 font-mono">
                  {stat.number}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* --- CLIENTS MARQUEE (Light Mode) --- */}
      <section className="clients-section relative z-10 mb-24 overflow-hidden">
        {/* <div className="mb-8 px-6 md:px-12 text-center">
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
            {t.clients.title}
          </p>
        </div> */}

        <div className="w-full overflow-hidden relative border-y border-gray-100 py-12 bg-gray-50/50">
          <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

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
                className="text-2xl md:text-3xl font-bold text-gray-300 hover:text-black transition-colors duration-300 uppercase select-none font-mono"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="process-section relative z-10 px-6 md:px-12 mb-32 max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
              / Protocol
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-black">
              {t.process.title}
            </h2>
          </div>
          <p className="text-sm font-mono text-gray-500 max-w-md text-right">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {t.process.steps.map((step, idx) => (
            <div
              key={idx}
              className="process-card flex gap-6 p-8 border border-gray-200 bg-white hover:border-black transition-colors duration-300"
            >
              <div className="shrink-0 w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center text-black">
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black mb-2 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 font-mono leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="values-section relative z-10 px-6 md:px-12 mb-32 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 mb-2 block">
            / Core_Values
          </span>
          <h2 className="text-3xl md:text-5xl font-medium text-black">
            {t.values.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {t.values.items.map((item, idx) => (
            <div
              key={idx}
              className="value-card group p-8 bg-gray-200/5 hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div className="mb-6 text-gray-400 group-hover:text-black transition-colors">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-black">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 font-mono leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TEAM SECTION (File Folder Style) --- */}
      <section className="team-section relative z-10 px-6 md:px-12 mb-32 max-w-7xl mx-auto">
        <div className="mb-16 flex items-center gap-4">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-medium text-black">
            {t.team.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.team.members.map((member, idx) => (
            <div
              key={idx}
              className="team-card group border border-gray-200 bg-white p-4 rounded-xl"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500 rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-sm font-bold text-black uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-[10px] font-mono text-gray-500 uppercase mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CULTURE / FOOTER IMAGE --- */}
      {/* <section className="culture-section relative z-10 px-6 md:px-12 mb-20 max-w-7xl mx-auto">
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden border border-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600"
            alt="Office Culture"
            fill
            className="culture-image object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 text-center text-white max-w-lg">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {t.culture.title}
              </h2>
              <p className="font-mono text-xs md:text-sm">{t.culture.desc}</p>
            </div>
          </div>
        </div>
      </section> */}
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
