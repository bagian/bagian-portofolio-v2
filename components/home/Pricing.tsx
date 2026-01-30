"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Data Harga (Versi Teaser / Ringkas untuk Homepage)
const localTranslations = {
  ID: {
    label: "Investasi",
    title: "Opsi Kerjasama",
    toggle: ["Per Proyek", "IT Partner (Bulanan)"],
    note: "*Pilih paket yang sesuai dengan kebutuhan bisnis Anda.",
    btn: "Konsultasi Sekarang",
    seeMore: "Lihat Rincian Lengkap",
    emailTarget: "bagian.desk@gmail.com",
    types: {
      project: [
        {
          name: "Starter Page",
          price: "IDR 4.850.000",
          desc: "Ideal untuk portofolio personal atau landing page produk.",
          features: [
            "1-3 Halaman Utama",
            "Halaman Responsif",
            "Setup Domain & Server",
            "Domain .id/.my.id Gratis",
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
          desc: "Sistem aplikasi web kompleks dengan fitur khusus.",
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
          price: "IDR 600.000.000 / bln",
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
          price: "IDR 2.550.000.000 / bln",
          desc: "Tim teknis pribadi Anda untuk solusi proaktif bisnis.",
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
  EN: {
    label: "Investment",
    title: "Engagement Models",
    toggle: ["Project Base", "IT Partner (Monthly)"],
    note: "*Choose a plan that fits your business goals.",
    btn: "Consult Now",
    seeMore: "See Full Details",
    emailTarget: "bagian.desk@gmail.com",
    types: {
      project: [
        {
          name: "Starter Page",
          price: "IDR 4.850.000",
          desc: "Ideal for minimalist personal portfolios or landing pages.",
          features: [
            "1-3 Main Pages",
            "Responsive Design",
            "Domain & Server Setup",
            "Free .id/.my.id Domain",
            "Frontend Development",
          ],
          highlight: false,
        },
        {
          name: "Corporate Web",
          price: "IDR 8.825.000",
          desc: "Professional company profile with CMS integration.",
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
          desc: "Complex web systems tailored to business needs.",
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
          price: "IDR 600.000.000 / mo",
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
          price: "IDR 2.550.000.000 / mo",
          desc: "Your personal tech team for growth solutions.",
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
            "DevOps CI/CD Setup",
            "Load Balancing Support",
            "99.99% Uptime SLA",
            "Regular Security Audits",
          ],
          highlight: false,
        },
      ],
    },
  },
};

const Pricing = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang as keyof typeof localTranslations];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"project" | "monthly">("project");

  const generateMailto = (packageName: string, price: string) => {
    const email = content.emailTarget;
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

  useGSAP(
    () => {
      gsap.from(".pricing-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".see-more-btn", {
        scrollTrigger: {
          trigger: ".see-more-btn",
          start: "top 95%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#FAFAFA] py-24 px-4 border-b border-gray-200 overflow-hidden relative"
    >
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#cfcdcd 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="pricing-header max-w-lg">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
              / {content.label}
            </span>
            <h2 className="text-3xl md:text-5xl font-medium text-[#1A1A1A] mb-4">
              {content.title}
            </h2>
            <p className="text-sm text-indigo-700 font-mono">{content.note}</p>
          </div>

          <div className="pricing-header bg-gray-200 p-2 flex rounded-full w-fit justify-center items-center gap-4">
            <button
              onClick={() => setActiveTab("project")}
              className={`px-8 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 white ${
                activeTab === "project"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {content.toggle[0]}
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "monthly"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {content.toggle[1]}
            </button>
          </div>
        </div>

        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {content.types[activeTab].map((item, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl border flex flex-col h-full transition-all duration-300 group ${
                item.highlight
                  ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl"
                  : "bg-white border-gray-200 hover:border-gray-400 text-gray-900"
              }`}
            >
              {item.highlight && (
                <div className="absolute -top-1 transform -translate-y-1/2 -translate-x-1/2 left-1/2">
                  <span className="bg-indigo-700 text-white text-[14px] font-bold uppercase px-3 py-1 rounded-full border-2 border-white">
                    Recommended
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-bold mb-2 ${item.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {item.name}
                </h3>
                <div
                  className={`h-px w-full my-4 ${item.highlight ? "bg-gray-700" : "bg-gray-100"}`}
                ></div>
                <p
                  className={`text-2xl md:text-3xl font-medium tracking-tight font-mono ${item.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {item.price}
                </p>
                <p
                  className={`mt-2 text-xs font-mono leading-relaxed ${item.highlight ? "text-gray-400" : "text-gray-500"}`}
                >
                  {item.desc}
                </p>
              </div>

              <ul className="flex-grow flex flex-col gap-3 mb-8">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.highlight ? "text-green-400" : "text-black"}`}
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
                        item.highlight ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={generateMailto(item.name, item.price)}
                className={`w-full py-4 text-center rounded-lg text-xs font-mono font-bold uppercase tracking-widest border transition-all ${
                  item.highlight
                    ? "bg-white text-black border-white hover:bg-gray-200"
                    : "bg-transparent border-gray-200 text-black hover:bg-black hover:text-white hover:border-black"
                }`}
              >
                {content.btn}
              </a>
            </div>
          ))}
        </div>

        <div className="see-more-btn mt-16 flex justify-center">
          <Link
            href="/pricing"
            className="group flex items-center gap-4 px-10 py-4 bg-transparent border border-gray-300 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
          >
            {content.seeMore}
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
      </div>
    </section>
  );
};

export default Pricing;
