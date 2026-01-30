"use client";

import React, {
  useLayoutEffect,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { CpuChipIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// --- TYPE DEFINITIONS ---
interface Plan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  highlight?: boolean;
}

const CONTENT = {
  ID: {
    hero: {
      label: "Spesifikasi Layanan",
      title: "Rekayasa Digital",
      subtitle:
        "Kami tidak hanya mendesain, kami merakit sistem digital yang presisi, skalabel, dan berorientasi pada performa.",
    },
    services: {
      title: "Kapabilitas Inti",
      items: [
        {
          id: "01",
          title: "UI/UX Engineering",
          desc: "Perancangan antarmuka berbasis data dan perilaku pengguna.",
          tech: ["Figma", "Prototyping", "Design System"],
        },
        {
          id: "02",
          title: "Full-Stack Development",
          desc: "Pembangunan sistem web end-to-end yang tangguh dan aman.",
          tech: ["Next.js", "Laravel", "PostgreSQL"],
        },
        {
          id: "03",
          title: "System Maintenance",
          desc: "Pemantauan kesehatan server, keamanan, dan update berkala.",
          tech: ["DevOps", "Security", "Backup"],
        },
        {
          id: "04",
          title: "Custom CMS",
          desc: "Panel admin yang disesuaikan total dengan alur kerja bisnis.",
          tech: ["Admin Panel", "Role Management", "API"],
        },
      ],
    },
    process: {
      title: "Algoritma Eksekusi",
      steps: [
        {
          phase: "01",
          title: "Discovery",
          desc: "Analisis kebutuhan & strategi teknis.",
        },
        {
          phase: "02",
          title: "Architecture",
          desc: "Perancangan struktur data & wireframe.",
        },
        {
          phase: "03",
          title: "Development",
          desc: "Penulisan kode bersih & integrasi.",
        },
        {
          phase: "04",
          title: "Quality Control",
          desc: "Testing komprehensif & debugging.",
        },
        {
          phase: "05",
          title: "Deployment",
          desc: "Peluncuran ke production server.",
        },
      ],
    },
    pricing: {
      title: "Model Investasi",
      toggle: ["Per Proyek", "IT Partner (Bulanan)"],
      btn: "Pilih Paket",
      seeMore: "Lihat Rincian Lengkap",
      emailTarget: "bagian.desk@gmail.com",
      plans: {
        project: [
          {
            name: "Starter Page",
            price: "IDR 4.850.000",
            desc: "Ideal untuk portofolio personal atau landing page produk.",
            features: [
              "1-3 Halaman Utama",
              "Halaman Responsif",
              "Setup Domain & Server",
              "Domain .id Gratis",
              "Frontend Development",
            ],
            highlight: false,
          },
          {
            name: "Web Perusahaan",
            price: "IDR 8.825.000",
            desc: "Website profil perusahaan profesional dengan CMS.",
            features: [
              "5-8 Halaman Utama",
              "Frontend + Backend",
              "Sistem Manajemen Konten",
              "Optimasi SEO & Sitemap",
              "Integrasi WhatsApp API",
            ],
            highlight: true,
          },
          {
            name: "Aplikasi Custom",
            price: "Mulai IDR 15jt",
            desc: "Sistem aplikasi web kompleks sesuai kebutuhan bisnis.",
            features: [
              "Fitur Tak Terbatas",
              "Arsitektur API Kompleks",
              "Desain UI/UX Premium",
              "Prioritas Deployment",
              "Layanan Eksklusif 24/7",
            ],
            highlight: false,
          },
        ],
        monthly: [
          {
            name: "Basic Maintenance",
            price: "IDR 1.500.000 / bln",
            desc: "Menjaga aset digital tetap hidup, aman, dan mutakhir.",
            features: [
              "Update Core & Security",
              "Cloud Backup Mingguan",
              "Monitoring Keamanan",
              "Uptime Monitoring 24/7",
              "Laporan Bulanan",
            ],
            highlight: false,
          },
          {
            name: "IT Partner (Dedicated)",
            price: "IDR 6.000.000 / bln",
            desc: "Tim teknis pribadi Anda. Solusi proaktif bisnis.",
            features: [
              "Semua Fitur Basic",
              "Manajemen Server/VPS",
              "Unlimited Minor UI Changes",
              "Prioritas Fast Response",
              "Next.js & React Support",
            ],
            highlight: true,
          },
          {
            name: "Scale Up / Enterprise",
            price: "Hubungi Kami",
            desc: "Infrastruktur tingkat lanjut untuk trafik tinggi.",
            features: [
              "Dedicated Full-Stack Team",
              "DevOps CI/CD Pipeline",
              "Load Balancing Setup",
              "SLA Uptime 99.99%",
              "Security Audit Berkala",
            ],
            highlight: false,
          },
        ],
      },
    },
  },
  EN: {
    hero: {
      label: "Service Specifications",
      title: "Digital Engineering",
      subtitle:
        "We don't just design, we assemble digital systems that are precise, scalable, and performance-oriented.",
    },
    services: {
      title: "Core Capabilities",
      items: [
        {
          id: "01",
          title: "UI/UX Engineering",
          desc: "Interface design based on data and user behavior.",
          tech: ["Figma", "Prototyping", "Design System"],
        },
        {
          id: "02",
          title: "Full-Stack Development",
          desc: "Building robust and secure end-to-end web systems.",
          tech: ["Next.js", "Laravel", "PostgreSQL"],
        },
        {
          id: "03",
          title: "System Maintenance",
          desc: "Server health monitoring, security, and regular updates.",
          tech: ["DevOps", "Security", "Backup"],
        },
        {
          id: "04",
          title: "Custom CMS",
          desc: "Admin panels fully tailored to business workflows.",
          tech: ["Admin Panel", "Role Management", "API"],
        },
      ],
    },
    process: {
      title: "Execution Algorithm",
      steps: [
        {
          phase: "01",
          title: "Discovery",
          desc: "Requirement analysis & tech strategy.",
        },
        {
          phase: "02",
          title: "Architecture",
          desc: "Data structuring & wireframing.",
        },
        {
          phase: "03",
          title: "Development",
          desc: "Clean code writing & integration.",
        },
        {
          phase: "04",
          title: "Quality Control",
          desc: "Comprehensive testing & debugging.",
        },
        {
          phase: "05",
          title: "Deployment",
          desc: "Launch to production server.",
        },
      ],
    },
    pricing: {
      title: "Investment Models",
      toggle: ["Project Base", "IT Partner (Monthly)"],
      btn: "Select Plan",
      seeMore: "See Full Details",
      emailTarget: "bagian.desk@gmail.com",
      plans: {
        project: [
          {
            name: "Starter Page",
            price: "IDR 4.850.000",
            desc: "Ideal for personal portfolios or landing pages.",
            features: [
              "1-3 Main Pages",
              "Responsive Design",
              "Domain & Server Setup",
              "Free .id Domain",
              "Frontend Development",
            ],
            highlight: false,
          },
          {
            name: "Corporate Web",
            price: "IDR 8.825.000",
            desc: "Professional company profile website with CMS.",
            features: [
              "5-8 Main Pages",
              "Fullstack (FE+BE)",
              "CMS Management System",
              "SEO & Sitemap Audit",
              "WhatsApp API Integration",
            ],
            highlight: true,
          },
          {
            name: "Custom Application",
            price: "From IDR 15m",
            desc: "Complex web application systems for your needs.",
            features: [
              "Unlimited Features",
              "Complex API Architecture",
              "Premium UI/UX Design",
              "Priority Deployment",
              "24/7 Exclusive Support",
            ],
            highlight: false,
          },
        ],
        monthly: [
          {
            name: "Basic Maintenance",
            price: "IDR 1.500.000 / mo",
            desc: "Keep your digital assets alive and secure.",
            features: [
              "Core & Security Updates",
              "Weekly Cloud Backups",
              "Security Monitoring",
              "24/7 Uptime Monitoring",
              "Monthly Performance Report",
            ],
            highlight: false,
          },
          {
            name: "IT Partner (Dedicated)",
            price: "IDR 6.000.000 / mo",
            desc: "Your fractional tech team for proactive growth.",
            features: [
              "All Basic Features",
              "Server/VPS Management",
              "Unlimited Minor UI Changes",
              "WhatsApp Fast Response",
              "Next.js & React Support",
            ],
            highlight: true,
          },
          {
            name: "Scale Up / Enterprise",
            price: "Contact Us",
            desc: "Advanced infrastructure for high-traffic apps.",
            features: [
              "Dedicated Full-Stack Team",
              "DevOps CI/CD Pipeline",
              "Load Balancing Setup",
              "99.99% Uptime SLA",
              "Regular Security Audits",
            ],
            highlight: false,
          },
        ],
      },
    },
  },
};

const ServicePage = () => {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [activePlan, setActivePlan] = useState<"project" | "monthly">(
    "project"
  );

  const t = useMemo(() => (lang === "EN" ? CONTENT.EN : CONTENT.ID), [lang]);

  const generateMailto = (packageName: string, price: string) => {
    const email = t.pricing.emailTarget;
    const subject =
      lang === "ID"
        ? `Tanya Paket: ${packageName}`
        : `Inquiry: ${packageName} Plan`;
    const body =
      lang === "ID"
        ? `Halo Tim Bagian,\n\nSaya tertarik dengan paket ${packageName} (${price}).\n\nNama Saya: `
        : `Hello Bagian Team,\n\nI am interested in the ${packageName} plan (${price}).\n\nMy Name: `;

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".divider-line").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: line, start: "top 90%" },
        });
      });

      gsap.from(".pricing-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: pricingRef.current, start: "top 75%" },
      });

      gsap.from(".see-more-btn", {
        scrollTrigger: { trigger: ".see-more-btn", start: "top 95%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  useEffect(() => {
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          overwrite: true,
        }
      );
    }
  }, [activePlan]);

  return (
    <div
      ref={containerRef}
      className="bg-white text-black min-h-screen font-sans pb-20 relative"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-40 md:pt-48">
        {/* HERO */}
        <section className="mb-32">
          <span className="reveal-item inline-block px-3 py-1 border rounded-full text-[10px] font-mono uppercase tracking-widest mb-6 bg-white text-indigo-500 border-indigo-600">
            ● {t.hero.label}
          </span>
          <h1 className="reveal-item text-6xl md:text-8xl font-bold tracking-tight mb-8">
            {t.hero.title}
          </h1>
          <p className="reveal-item text-sm text-gray-500 max-w-xl font-mono leading-6 border-l-2 border-gray-200 pl-6">
            {t.hero.subtitle}
          </p>
        </section>

        {/* SERVICES */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              / 01_SERVICES
            </span>
            <div className="divider-line h-[1px] bg-gray-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {t.services.items.map((service, i) => (
              <div
                key={i}
                className="reveal-item group p-8 border border-gray-200 bg-white hover:border-indigo-700 transition-colors duration-300 relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-xs text-gray-400">
                    ID_{service.id}
                  </span>
                  <CpuChipIcon className="w-6 h-6 text-gray-300 group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:underline underline-offset-4">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm font-mono mb-8 h-12">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-50 border border-gray-100 text-[10px] font-mono uppercase text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              / 02_WORKFLOW
            </span>
            <div className="divider-line h-[1px] bg-gray-200 flex-1"></div>
          </div>
          <div className="relative">
            <div className="divider-line absolute top-[15px] left-0 w-full h-[1px] bg-gray-200 -z-10 hidden md:block"></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {t.process.steps.map((step, i) => (
                <div
                  key={i}
                  className="reveal-item relative bg-white md:bg-transparent pt-4 md:pt-0"
                >
                  <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-[10px] font-mono font-bold mb-4 md:mb-6 shadow-sm">
                    {step.phase}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-mono leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section ref={pricingRef} className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div className="pricing-reveal">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
                / 03_INVESTMENT
              </span>
              <h2 className="text-3xl font-medium">{t.pricing.title}</h2>
            </div>
            <div className="flex bg-gray-100 p-2 pricing-reveal my-4 rounded-full justify-center items-center gap-4 w-fit">
              <button
                onClick={() => setActivePlan("project")}
                className={`px-4 py-2 text-xs font-mono uppercase transition-all rounded-full ${activePlan === "project" ? "bg-white shadow text-black" : "text-gray-500"}`}
              >
                {t.pricing.toggle[0]}
              </button>
              <button
                onClick={() => setActivePlan("monthly")}
                className={`px-4 py-2 text-xs font-mono uppercase transition-all rounded-full ${activePlan === "monthly" ? "bg-black shadow text-white" : "text-gray-500"}`}
              >
                {t.pricing.toggle[1]}
              </button>
            </div>
          </div>

          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {t.pricing.plans[activePlan].map((plan: Plan, i: number) => (
              <div
                key={i}
                className={`pricing-reveal p-8 border ${plan.highlight ? "bg-[#111] text-white border-black rounded-xl" : "bg-white border-gray-200 rounded-xl"} flex flex-col`}
              >
                {plan.highlight && (
                  <div className="absolute -top-1 transform -translate-y-1/2 -translate-x-1/2 left-1/2">
                    <span className="bg-indigo-700 text-white text-[14px] font-bold uppercase px-3 py-1 rounded-full border-2 border-white">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                <div
                  className={`h-[1px] w-full mb-4 ${plan.highlight ? "bg-gray-800" : "bg-gray-100"}`}
                ></div>
                <p className="text-3xl font-mono mb-2">{plan.price}</p>
                <p
                  className={`text-xs font-mono mb-8 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}
                >
                  {plan.desc}
                </p>
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-sm font-mono items-center"
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-green-400" : "text-black"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={
                          plan.highlight ? "text-gray-300" : "text-gray-500"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={generateMailto(plan.name, plan.price)}
                  className={`block w-full py-4 text-center text-xs font-mono uppercase border transition-colors rounded-xl ${plan.highlight ? "bg-white text-black border-white hover:bg-gray-200" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
                >
                  {t.pricing.btn}
                </a>
              </div>
            ))}
          </div>

          {/* TOMBOL SEE MORE */}
          <div className="see-more-btn mt-16 flex justify-center">
            <Link
              href="/pricing"
              className="group flex items-center gap-4 px-10 py-4 bg-transparent border border-gray-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
            >
              {t.pricing.seeMore}
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicePage;
