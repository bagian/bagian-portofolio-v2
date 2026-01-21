"use client";

import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  CodeBracketIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- DEFINISI KONTEN (SAMA) ---
const CONTENT = {
  ID: {
    hero: {
      title: "Membangun Ekosistem Digital Anda.",
      desc: "Solusi perangkat lunak dari hulu ke hilir. Kami memadukan estetika desain dengan ketangguhan kode untuk bisnis yang visioner.",
    },
    services: {
      title: "Keahlian Kami",
      items: [
        {
          title: "Desain Website",
          desc: "Setiap piksel memiliki tujuan. Kami merancang UI/UX yang tidak hanya memukau mata, tapi juga intuitif bagi pengguna Anda.",
          link: "/services/website-design",
        },
        {
          title: "Aplikasi Website",
          desc: "Pengembangan sistem berbasis web yang kompleks, skalabel, dan aman untuk operasional bisnis yang lebih efisien.",
          link: "/services/website-design",
        },
        {
          title: "Maintenance",
          desc: "Kami menjaga website Anda tetap berjalan 24/7. Pembaruan keamanan, backup rutin, dan optimasi performa berkelanjutan.",
          link: "/services/website-design",
        },
        {
          title: "Cutom CMS",
          desc: "Kelola konten Anda dengan sistem yang ringan dan dipersonalisasi. Dashboard admin yang intuitif, aman, dan dibangun khusus sesuai alur kerja bisnis Anda.",
          link: "/services/custom-cms",
        },
      ],
    },
    process: {
      title: "Alur Kerja",
      subtitle: "Transparansi di setiap langkah.",
      steps: [
        { title: "Konsultasi", desc: "Diskusi kebutuhan & scoping." },
        { title: "Riset & Analisis", desc: "Analisis pasar & kompetitor." },
        { title: "Desain UI/UX", desc: "Wireframe & High-fidelity." },
        { title: "Development", desc: "Coding (Front & Back-end)." },
        { title: "Quality Assurance", desc: "Testing bug & performa." },
        { title: "Peluncuran", desc: "Deploy ke server production." },
        { title: "Support", desc: "Maintenance pasca-rilis." },
      ],
    },
    pricing: {
      title: "Investasi",
      subtitle: "Pilih paket yang sesuai dengan fase bisnis Anda.",
      plans: [
        {
          name: "Desain",
          price: "350rb",
          prefix: "Mulai",
          features: [
            "Riset Kompetitor",
            "Wireframe & Prototype",
            "Desain Homepage",
            "3x Revisi",
            "Aset Grafis",
          ],
          cta: "Ajukan Penawaran",
          isPopular: false,
        },
        {
          name: "Production",
          price: "4.5jt",
          prefix: "Mulai",
          features: [
            "Semua Fitur Desain",
            "Coding Frontend/Backend",
            "Integrasi Database",
            "Gratis Hosting & Domain",
            "12x Revisi",
          ],
          cta: "Mulai Proyek",
          isPopular: true,
        },
        {
          name: "Maintenance",
          price: "600rb",
          prefix: "Per Bulan",
          features: [
            "Update Konten",
            "Backup Harian",
            "Security Patch",
            "Priority Support",
            "Laporan Bulanan",
          ],
          cta: "Hubungi Sales",
          isPopular: false,
        },
      ],
    },
    cta: {
      title: "Siap Memulai Proyek?",
      btn: "Hubungi Kami",
    },
  },
  EN: {
    hero: {
      title: "Building Your Digital Ecosystem.",
      desc: "End-to-end software solutions. We blend design aesthetics with code robustness for visionary businesses.",
    },
    services: {
      title: "Our Expertise",
      items: [
        {
          title: "Website Design",
          desc: "Every pixel has a purpose. We craft UI/UX that is not only visually stunning but also intuitive for your users.",
          link: "/services/website-design",
        },
        {
          title: "Web Development",
          desc: "Development of complex, scalable, and secure web-based systems for more efficient business operations.",
          link: "/services/web-development",
        },
        {
          title: "Maintenance",
          desc: "We keep your site running 24/7. Security updates, routine backups, and continuous performance optimization.",
          link: "/services/maintenance",
        },
        {
          title: "Custom CMS",
          desc: "Manage your content with a lightweight and personalized system. Intuitive, secure admin dashboards built specifically to match your business workflow.",
          link: "/services/maintenance",
        },
      ],
    },
    process: {
      title: "Workflow",
      subtitle: "Transparency at every step.",
      steps: [
        { title: "Consultation", desc: "Discussion & scoping." },
        { title: "Research", desc: "Market & competitor analysis." },
        { title: "UI/UX Design", desc: "Wireframe & High-fidelity." },
        { title: "Development", desc: "Coding (Front & Back-end)." },
        { title: "QA Testing", desc: "Bug & performance checks." },
        { title: "Launch", desc: "Deploy to production server." },
        { title: "Support", desc: "Post-release maintenance." },
      ],
    },
    pricing: {
      title: "Investment",
      subtitle: "Choose a plan that fits your business phase.",
      plans: [
        {
          name: "Design",
          price: "350K",
          prefix: "Starts at",
          features: [
            "Competitor Research",
            "Wireframe & Prototype",
            "Homepage Design",
            "3x Revisions",
            "Graphic Assets",
          ],
          cta: "Request Quote",
          isPopular: false,
        },
        {
          name: "Production",
          price: "4.5M",
          prefix: "Starts at",
          features: [
            "All Design Features",
            "Frontend/Backend Coding",
            "Database Integration",
            "Free Hosting & Domain",
            "12x Revisions",
          ],
          cta: "Start Project",
          isPopular: true,
        },
        {
          name: "Maintenance",
          price: "600K",
          prefix: "Per Month",
          features: [
            "Content Updates",
            "Daily Backups",
            "Security Patches",
            "Priority Support",
            "Monthly Report",
          ],
          cta: "Contact Sales",
          isPopular: false,
        },
      ],
    },
    cta: {
      title: "Ready to Start?",
      btn: "Contact Us",
    },
  },
};

const ServicePage = () => {
  const { lang } = useLanguage();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const t = useMemo(() => {
    return lang === "EN" ? CONTENT.EN : CONTENT.ID;
  }, [lang]);

  const icons = [
    <PaintBrushIcon key="icon-1" className="w-6 h-6" />,
    <CodeBracketIcon key="icon-2" className="w-6 h-6" />,
    <WrenchScrewdriverIcon key="icon-3" className="w-6 h-6" />,
    <ComputerDesktopIcon key="icon-4" className="w-6 h-6" />,
  ];

  const handlePlanClick = (planName: string) => {
    router.push(`/contact?plan=${encodeURIComponent(planName)}`);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. HERO ANIMATION (DELAY DITAMBAH) ---
      gsap.fromTo(
        ".hero-anim",
        {
          y: 100,
          opacity: 0,
          skewY: 5,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          // FIX: Delay ditingkatkan menjadi 1.2 detik
          // (0.8s durasi tutup navbar + buffer 0.4s)
          delay: 1.2,
        }
      );

      // --- 2. COLOR THEME TRANSITION ---
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 20%",
          end: "top 20%",
          scrub: 1.5,
        },
      });

      scrollTl
        .to(containerRef.current, { backgroundColor: "#ffffff" })
        .to(".bg-glow", { opacity: 0 }, "<")
        .to("h1, h2, h3, h4, .price-text", { color: "#000000" }, "<")
        .to(".text-desc", { color: "#4B5563" }, "<")
        .to(
          ".service-card, .pricing-card",
          {
            backgroundColor: "rgba(255,255,255)",
            borderColor: "rgba(0,0,0,0.1)",
          },
          "<"
        )
        .to(".process-step-title", { color: "#000000" }, "<");

      // --- 3. SCROLL REVEALS ---

      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          }
        );
      });

      gsap.fromTo(
        ".process-line",
        { height: 0 },
        {
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
          height: "100%",
          ease: "none",
        }
      );

      gsap.fromTo(
        ".pricing-card",
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div
      ref={containerRef}
      className="bg-[#050505] text-white min-h-screen font-sans selection:bg-indigo-500 selection:text-white pb-20 transition-colors"
    >
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="bg-glow absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="bg-glow absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
      </div>

      <div className="relative z-10">
        <section className="pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[70vh]">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
            {t.hero.title.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden mr-3 md:mr-5 align-top"
              >
                <span className="hero-anim inline-block origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div className="overflow-hidden max-w-2xl">
            <p className="hero-anim text-lg md:text-xl text-gray-400 leading-relaxed origin-top-left">
              {t.hero.desc}
            </p>
          </div>
        </section>

        <section className="services-section py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 pr-8">
              <h2 className="text-3xl font-bold mb-8 md:mb-0 sticky top-32">
                {t.services.title}
              </h2>
            </div>

            <div className="md:col-span-2 grid gap-6">
              {t.services.items.map((service, idx) => (
                <div
                  key={idx}
                  className="service-card group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 text-indigo-500">
                    {icons[idx] || <CodeBracketIcon className="w-6 h-6" />}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-desc text-gray-400 leading-relaxed max-w-md">
                      {service.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <Link href={service.link || "#"}>
                        <span>Learn more</span>
                      </Link>
                      <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section py-32 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {t.process.title}
              </h2>
              <p className="text-desc text-gray-400">{t.process.subtitle}</p>
            </div>

            <div className="relative h-full">
              <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200/20 -translate-x-1/2 md:-translate-x-px"></div>
              <div className="process-line absolute left-[19px] md:left-1/2 top-0 w-[2px] bg-indigo-500 -translate-x-1/2 md:-translate-x-px z-10 h-0"></div>

              <div className="space-y-12">
                {t.process.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}
                    >
                      <h4 className="process-step-title text-xl font-bold mb-1">
                        {step.title}
                      </h4>
                      <p className="text-desc text-sm text-gray-400">
                        {step.desc}
                      </p>
                    </div>
                    <div className="absolute left-[4px] md:left-1/2 -translate-x-1.5 md:-translate-x-1/2 w-10 h-10 rounded-full bg-indigo-500 border-4 border-transparent z-20 flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="hidden md:block md:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-section py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-desc text-gray-400">{t.pricing.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {t.pricing.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`pricing-card relative flex flex-col p-8 rounded-3xl border transition-all duration-300 shadow-xl/[0.08] ${
                  plan.isPopular
                    ? "bg-white/[0.08] border-indigo-500/50 shadow-xl shadow-indigo-200"
                    : "bg-white/[0.03] border-white/5"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-desc text-gray-300 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-desc text-gray-500">IDR</span>
                    <span className="text-4xl font-bold text-white price-text">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-xs text-desc text-gray-500 mt-1">
                    {plan.prefix}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-sm text-desc text-gray-300"
                    >
                      <CheckBadgeIcon
                        className={`w-5 h-5 shrink-0 ${plan.isPopular ? "text-indigo-500" : "text-gray-400"}`}
                      />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    plan.isPopular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-800 text-white hover:bg-gray-900"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-black">
            {t.cta.title}
          </h2>
          <button
            onClick={() => router.push("/contact")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 rounded-full text-white font-bold hover:bg-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            {t.cta.btn}
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
