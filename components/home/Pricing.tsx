"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Data Harga
const localTranslations = {
  ID: {
    label: "Investasi",
    title: "Opsi Kerjasama",
    toggle: ["Per Proyek", "IT Partner (Bulanan)"],
    note: "*Harga dapat disesuaikan dengan kompleksitas fitur.",
    btn: "Konsultasi Sekarang",
    emailTarget: "bagian.desk@gmail.com", // Email tujuan
    types: {
      project: [
        {
          name: "Starter Page",
          price: "IDR 4.780.000",
          desc: "Ideal untuk portofolio personal atau landing page produk.",
          features: [
            "1-3 Halaman Responsif",
            "Optimasi SEO Dasar",
            "Setup Domain & Server",
            "Domain Gratis",
            "Revisi Minor 2x",
          ],
          highlight: false,
        },
        {
          name: "Web Perusahaan",
          price: "IDR 8.825.000",
          desc: "Website profil perusahaan profesional dengan CMS.",
          features: [
            "5-8 Halaman",
            "Panel Admin",
            "Sistem Manajemen Konten (CMS)",
            "Integrasi API",
            "Optimasi SEO",
            "Setup Google Analytics",
            "Halaman Responsif",
            "Sistem Manajemen Konten",
            "Integrasi WhatsApp API",
            "Garansi Bug 30 Hari",
            "Setup Domain & Server",
            "Gratis Domain Custom",
            "10x Revisi Minor",
          ],
          highlight: true,
        },
        {
          name: "Aplikasi Custom - [ Mulai Dari ]",
          price: "IDR 15.000.000",
          desc: "Sistem aplikasi web kompleks yang disesuaikan dengan kebutuhan bisnis.",
          features: [
            "10+ Halaman",
            "Panel Admin",
            "Sistem Manajemen Konten (CMS)",
            "Integrasi API",
            "Optimasi SEO",
            "Setup Google Analytics",
            "Halaman Responsif",
            "Sistem Manajemen Konten",
            "Integrasi WhatsApp API",
            "Garansi Bug 30 Hari",
            "Setup Domain & Server",
            "Gratis Domain Custom",
            "Revisi Minor Tak Terbatas",
            "Template / Tema Custom",
            "Tampilan UI Premium",
            "Preloader",
            "Layanan Eksklusif",
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
            "Update Core, Theme & Plugin",
            "Cloud Backup Mingguan (Retensi 1 Bulan)",
            "Monitoring Keamanan & Malware",
            "Uptime Monitoring 24/7",
            "Laporan Performa Bulanan",
            "Perbaikan Bug Minor (Max 2 jam/bln)", // Added limit
            "Dukungan via Email (Respon 24 Jam)",
          ],
          highlight: false,
        },
        {
          name: "IT Partner (Dedicated)",
          price: "IDR 6.000.000 / bln",
          desc: "Tim teknis pribadi Anda. Solusi proaktif untuk pertumbuhan bisnis.",
          features: [
            "Semua Fitur Basic Maintenance",
            "Manajemen Server/VPS & Domain", // Fitur krusial untuk harga ini
            "Prioritas Penanganan (Jalur WhatsApp)",
            "Unlimited Minor UI/UX Changes", // Value utama
            "Audit SEO Teknis Berkala",
            "Optimasi Kecepatan (Asset Compression)",
            "Sesi Konsultasi Strategi Bulanan (1 Jam)",
          ],
          highlight: true,
        },
        {
          name: "Scale Up / Enterprise",
          price: "Hubungi Kami",
          desc: "Infrastruktur tingkat lanjut untuk aplikasi traffic tinggi.",
          features: [
            "Dedicated Full-Stack Team",
            "DevOps: CI/CD Pipeline Setup",
            "Load Balancing & Auto-scaling",
            "Database Replication & Sharding",
            "SLA Jaminan Uptime 99.99%",
            "Penetration Testing (Security)",
            "Laporan Real-time Dashboard",
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
    note: "*Prices may vary based on feature complexity.",
    btn: "Consult Now",
    emailTarget: "bagian.desk@bagian.com",
    types: {
      project: [
        {
          name: "Starter Page",
          price: "IDR 4.780.000",
          desc: "Ideal for personal portfolios or product landing pages.",
          features: [
            "1-3 Pages",
            "Responsive Pages",
            "Basic SEO Optimization",
            "Domain & Server Setup",
            "Free Domain",
            "2x Minor Revisions",
          ],
          highlight: false,
        },
        {
          name: "Corporate Web",
          price: "IDR 8.825.000",
          desc: "Professional company profile website with CMS.",
          features: [
            "5-8 Pages",
            "Admin Panels",
            "Content Management System",
            "API Integration",
            "SEO Optimization",
            "Google Analytics Setup",
            "Responsive Pages",
            "Content Management System",
            "WhatsApp API Integration",
            "30 Days Bug Warranty",
            "Domain & Server Setup",
            "Free Custom Domain",
            "10x Minor Revisions",
          ],
          highlight: true,
        },
        {
          name: "Custom App - [ Start From ]",
          price: "IDR 15.000.000",
          desc: "Complex web application system tailored to business needs.",
          features: [
            "10+ Pages",
            "Admin Panels",
            "Content Management System",
            "API Integration",
            "SEO Optimization",
            "Google Analytics Setup",
            "Responsive Pages",
            "Content Management System",
            "WhatsApp API Integration",
            "30 Days Bug Warranty",
            "Domain & Server Setup",
            "Free Custom Domain",
            "Unlimited Minor Revisions",
            "Custom Template / Themes",
            "Beautified UI",
            "Preloader",
            "Exclusive Services",
          ],
          highlight: false,
        },
      ],
      monthly: [
        {
          name: "Basic Maintenance",
          price: "IDR 1.500.000 / mo",
          desc: "Keep your digital assets alive, secure, and up-to-date.",
          features: [
            "Core, Theme & Plugin Updates",
            "Weekly Cloud Backups (1 Mo Retention)",
            "Security & Malware Monitoring",
            "24/7 Uptime Monitoring",
            "Monthly Performance Report",
            "Minor Bug Fixes (Max 2 hrs/mo)",
            "Standard Email Support (24h Response)",
          ],
          highlight: false,
        },
        {
          name: "IT Partner (Dedicated)",
          price: "IDR 6.000.000 / mo",
          desc: "Your fractional tech team. Proactive solutions for growth.",
          features: [
            "All Basic Maintenance Features",
            "Server/VPS & Domain Management",
            "Priority Support (WhatsApp Channel)",
            "Unlimited Minor UI/UX Changes",
            "Routine Technical SEO Audit",
            "Speed Optimization (Asset Compression)",
            "Monthly Strategy Consultation (1 Hr)",
          ],
          highlight: true,
        },
        {
          name: "Scale Up / Enterprise",
          price: "Contact Us",
          desc: "Advanced infrastructure for high-traffic applications.",
          features: [
            "Dedicated Full-Stack Team",
            "DevOps: CI/CD Pipeline Setup",
            "Load Balancing & Auto-scaling",
            "Database Replication & Sharding",
            "99.99% Uptime SLA Guarantee",
            "Penetration Testing (Security)",
            "Real-time Dashboard Reporting",
          ],
          highlight: false,
        },
      ],
    },
  },
};

const Pricing = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"project" | "monthly">("project");

  // --- LOGIC BARU: GENERATE EMAIL LINK ---
  const generateMailto = (packageName: string, price: string) => {
    const email = content.emailTarget;
    let subject = "";
    let body = "";

    if (lang === "ID") {
      subject = `Tanya Paket: ${packageName}`;
      body = `Halo Tim Bagian,

Saya tertarik dengan paket ${packageName} (${price}).
Boleh dijelaskan lebih lanjut mengenai langkah selanjutnya?

Nama Saya: 
Perusahaan (Opsional): 

Terima kasih.`;
    } else {
      subject = `Inquiry: ${packageName} Plan`;
      body = `Hello Bagian Team,

I am interested in the ${packageName} plan (${price}).
Could you please provide more details on the next steps?

My Name: 
Company (Optional): 

Thank you.`;
    }

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Animasi Masuk
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
    },
    { scope: containerRef }
  );

  // Animasi Ganti Tab
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
      {/* Background Decor */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(#cfcdcd 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>
      <div className="max-w-7xl mx-auto">
        {/* --- HEADER & TOGGLE --- */}
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
              className={`px-8 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
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

        {/* --- CARDS GRID --- */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {content.types[activeTab].map((item, index) => (
            <div
              key={index}
              className={`
                relative p-8 rounded-xl border flex flex-col h-full transition-all duration-300 group
                ${
                  item.highlight
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl"
                    : "bg-white border-gray-200 hover:border-gray-400 text-gray-900"
                }
              `}
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

              {/* --- UPDATE: DYNAMIC MAILTO LINK --- */}
              <a
                href={generateMailto(item.name, item.price)}
                className={`
                  w-full py-4 text-center rounded-lg text-xs font-mono font-bold uppercase tracking-widest border transition-all
                  ${
                    item.highlight
                      ? "bg-white text-black border-white hover:bg-gray-200"
                      : "bg-transparent border-gray-200 text-black hover:bg-black hover:text-white hover:border-black"
                  }
                `}
              >
                {content.btn}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
