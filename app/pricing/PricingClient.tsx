"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

gsap.registerPlugin(ScrollTrigger);

const localTranslations = {
  ID: {
    label: "Pricelist",
    projectTitle: "Paket Berbasis Proyek",
    partnerTitle: "IT Partner & Maintenance (Bulanan)",
    note: "*Harga transparan sesuai dengan rincian fitur dan kompleksitas sistem.",
    btn: "Konsultasi Sekarang",
    emailTarget: "bagian.desk@gmail.com",
    project: [
      {
        name: "Starter Page",
        price: "IDR 4.850.000",
        desc: "Ideal untuk portofolio personal atau landing page produk minimalis.",
        features: [
          { text: "1-3 Halaman Utama (Landing Page)", included: true },
          { text: "Halaman Responsif (Mobile Friendly)", included: true },
          { text: "Setup Domain & Server", included: true },
          { text: "Domain .id/.my.id Gratis (1 Thn)", included: true },
          { text: "Frontend Development", included: true },
          { text: "SSL Security (Cloudflare)", included: true },
          { text: "2x Revisi Minor", included: true },
          { text: "Optimasi SEO (Riset & On-Page)", included: false },
          { text: "Database System", included: false },
          { text: "Sistem Manajemen Konten (CMS)", included: false },
          { text: "Integrasi API Kompleks", included: false },
          { text: "Setup Google Search Console", included: false },
        ],
        highlight: false,
      },
      {
        name: "Web Perusahaan",
        price: "IDR 8.825.000",
        desc: "Website profil perusahaan profesional dengan sistem manajemen konten.",
        features: [
          { text: "5-8 Halaman Utama", included: true },
          { text: "Halaman Responsif & Animasi GSAP", included: true },
          { text: "Frontend + Backend Development", included: true },
          { text: "Sistem Manajemen Konten (CMS)", included: true },
          { text: "Optimasi SEO On-Page & Sitemap", included: true },
          { text: "Setup Domain, Server & Cloudflare", included: true },
          { text: "Setup Google Analytics & GSC", included: true },
          { text: "Database Integration", included: true },
          { text: "10x Revisi Minor", included: true },
          { text: "Integrasi WhatsApp API", included: true },
          { text: "Garansi Bug 30 Hari", included: true },
          { text: "Layanan Eksklusif 24/7", included: false },
        ],
        highlight: true,
      },
      {
        name: "Aplikasi Custom",
        price: "Mulai IDR 15jt",
        desc: "Sistem aplikasi web kompleks mulai dari riset hingga deployment.",
        features: [
          { text: "Halaman & Fitur Tak Terbatas", included: true },
          { text: "Sistem Kompleks & Arsitektur API", included: true },
          { text: "Custom Template Premium & UI Design", included: true },
          { text: "Prioritas Deployment & Server Scaling", included: true },
          { text: "Layanan Eksklusif 24/7", included: true },
          { text: "SLA Uptime 99.9% & Monitoring", included: true },
          { text: "Security Penetration Testing", included: true },
          { text: "Maintenance Gratis 3 Bulan", included: true },
        ],
        highlight: false,
      },
    ],
    monthly: [
      {
        name: "Basic Maintenance",
        price: "IDR 600.000 / bln",
        desc: "Menjaga aset digital tetap hidup, aman, dan mutakhir.",
        features: [
          { text: "Update Core, Library & Security", included: true },
          { text: "Cloud Backup Mingguan", included: true },
          { text: "Monitoring Keamanan & Uptime", included: true },
          { text: "Laporan Performa Bulanan", included: true },
          { text: "Dedicated Team Support", included: false },
          { text: "Unlimited UI/UX Changes", included: false },
        ],
        highlight: false,
      },
      {
        name: "IT Partner (Dedicated)",
        price: "IDR 2.550.000 / bln",
        desc: "Tim teknis pribadi Anda untuk solusi proaktif pertumbuhan bisnis.",
        features: [
          { text: "Semua Fitur Basic Maintenance", included: true },
          { text: "Manajemen Server/VPS & SSL", included: true },
          { text: "Unlimited Minor UI/UX Changes", included: true },
          { text: "Prioritas WhatsApp (Fast Response)", included: true },
          { text: "Audit SEO & Speed Berkala", included: true },
          { text: "Next.js & React Expert Support", included: true },
        ],
        highlight: true,
      },
      {
        name: "Scale Up / Enterprise",
        price: "Hubungi Kami",
        desc: "Infrastruktur tingkat lanjut untuk aplikasi traffic tinggi.",
        features: [
          { text: "Dedicated Full-Stack Team", included: true },
          { text: "DevOps CI/CD Pipeline Setup", included: true },
          { text: "Load Balancing & Auto-scaling", included: true },
          { text: "SLA Jaminan Uptime 99.99%", included: true },
          { text: "Security Audit & Data Replication", included: true },
        ],
        highlight: false,
      },
    ],
  },
  EN: {
    label: "Pricelist",
    projectTitle: "Project-Based Packages",
    partnerTitle: "IT Partner & Maintenance (Monthly)",
    note: "*Transparent pricing based on feature details and complexity.",
    btn: "Consult Now",
    emailTarget: "bagian.desk@gmail.com",
    project: [
      {
        name: "Starter Page",
        price: "IDR 4.850.000",
        desc: "Ideal for minimalist personal portfolios or landing pages.",
        features: [
          { text: "1-3 Main Pages (Landing Page)", included: true },
          { text: "Responsive & Mobile Friendly", included: true },
          { text: "Domain & Server Setup", included: true },
          { text: "Free .id/.my.id Domain (1 Yr)", included: true },
          { text: "Frontend Development", included: true },
          { text: "SSL Security (Cloudflare)", included: true },
          { text: "2x Minor Revisions", included: true },
          { text: "Advanced SEO Optimization", included: false },
          { text: "Database System", included: false },
          { text: "Content Management System (CMS)", included: false },
          { text: "Complex API Integration", included: false },
          { text: "Google Search Console Setup", included: false },
        ],
        highlight: false,
      },
      {
        name: "Corporate Web",
        price: "IDR 8.825.000",
        desc: "Professional corporate profile website with CMS integration.",
        features: [
          { text: "5-8 Main Pages", included: true },
          { text: "Responsive & GSAP Animations", included: true },
          { text: "Fullstack Development (FE+BE)", included: true },
          { text: "Content Management System (CMS)", included: true },
          { text: "On-Page SEO & Sitemap", included: true },
          { text: "Domain, Server & Cloudflare Setup", included: true },
          { text: "GA4 & GSC Setup", included: true },
          { text: "Database Integration", included: true },
          { text: "10x Minor Revisions", included: true },
          { text: "WhatsApp API Integration", included: true },
          { text: "30 Days Bug Warranty", included: true },
          { text: "24/7 Exclusive Support", included: false },
        ],
        highlight: true,
      },
      {
        name: "Custom Application",
        price: "From IDR 15m",
        desc: "Complex web systems from research to full deployment.",
        features: [
          { text: "Unlimited Pages & Features", included: true },
          { text: "Complex Systems & API Architecture", included: true },
          { text: "Premium Custom UI/UX Design", included: true },
          { text: "Priority Deployment & Scaling", included: true },
          { text: "24/7 Exclusive Support", included: true },
          { text: "99.9% Uptime SLA & Monitoring", included: true },
          { text: "Security Penetration Testing", included: true },
          { text: "3 Months Free Maintenance", included: true },
        ],
        highlight: false,
      },
    ],
    monthly: [
      {
        name: "Basic Maintenance",
        price: "IDR 600.000 / mo",
        desc: "Keep your digital assets alive, secure, and up-to-date.",
        features: [
          { text: "Core, Library & Security Updates", included: true },
          { text: "Weekly Cloud Backups", included: true },
          { text: "Security & Uptime Monitoring", included: true },
          { text: "Monthly Performance Report", included: true },
          { text: "Dedicated Team Support", included: false },
          { text: "Unlimited UI/UX Changes", included: false },
        ],
        highlight: false,
      },
      {
        name: "IT Partner (Dedicated)",
        price: "IDR 2.550.000 / mo",
        desc: "Your personal tech team for proactive growth solutions.",
        features: [
          { text: "All Basic Maintenance Features", included: true },
          { text: "Server/VPS & SSL Management", included: true },
          { text: "Unlimited Minor UI/UX Changes", included: true },
          { text: "WhatsApp Priority Support", included: true },
          { text: "Regular SEO & Speed Audit", included: true },
          { text: "Next.js & React Expert Support", included: true },
        ],
        highlight: true,
      },
      {
        name: "Scale Up / Enterprise",
        price: "Contact Us",
        desc: "Advanced infrastructure for high-traffic applications.",
        features: [
          { text: "Dedicated Full-Stack Team", included: true },
          { text: "DevOps CI/CD Pipeline Setup", included: true },
          { text: "Load Balancing & Auto-scaling", included: true },
          { text: "99.99% Uptime SLA Guarantee", included: true },
          { text: "Security Audit & Replication", included: true },
        ],
        highlight: false,
      },
    ],
  },
};

const PricingClient = () => {
  const { lang } = useLanguage();
  const content = localTranslations[lang as keyof typeof localTranslations];
  const containerRef = useRef<HTMLDivElement>(null);

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
      gsap.from(".pricing-section-title", {
        scrollTrigger: { trigger: ".pricing-section-title", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4">
        {/* --- PROJECT BASE SECTION --- */}
        <header className="pricing-section-title mb-12">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-2">
            / {content.label}
          </span>
          <h1 className="text-3xl md:text-5xl font-medium text-[#1A1A1A] mb-4">
            {content.projectTitle}
          </h1>
          <p className="text-sm text-indigo-700 font-mono">{content.note}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mb-24">
          {content.project.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl border flex flex-col h-full transition-all duration-300 ${item.highlight ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl" : "bg-white border-gray-200 text-gray-900"}`}
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
              <ul className="flex-grow flex flex-col gap-4 mb-8">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {feat.included ? (
                      <CheckIcon
                        className={`w-5 h-5 shrink-0 ${item.highlight ? "text-green-400" : "text-indigo-600"}`}
                      />
                    ) : (
                      <XMarkIcon className="w-5 h-5 shrink-0 text-red-400" />
                    )}
                    <span
                      className={`${feat.included ? "" : "text-gray-500"} ${item.highlight && feat.included ? "text-gray-300" : ""}`}
                    >
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={generateMailto(item.name, item.price)}
                className={`w-full py-4 text-center rounded-lg text-xs font-mono font-bold uppercase tracking-widest border transition-all ${item.highlight ? "bg-white text-black border-white hover:bg-gray-200" : "bg-transparent border-gray-200 text-black hover:bg-black hover:text-white"}`}
              >
                {content.btn}
              </a>
            </div>
          ))}
        </div>

        {/* --- IT PARTNER SECTION --- */}
        <header className="pricing-section-title mb-12 border-t border-gray-200 pt-16">
          <h2 className="text-3xl md:text-5xl font-medium text-[#1A1A1A] mb-4">
            {content.partnerTitle}
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {content.monthly.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl border flex flex-col h-full transition-all duration-300 ${item.highlight ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl" : "bg-white border-gray-200 text-gray-900"}`}
            >
              {item.highlight && (
                <div className="absolute -top-1 transform -translate-y-1/2 -translate-x-1/2 left-1/2">
                  <span className="bg-indigo-700 text-white text-[14px] font-bold uppercase px-3 py-1 rounded-full border-2 border-white">
                    Best Value
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
              <ul className="flex-grow flex flex-col gap-4 mb-8">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {feat.included ? (
                      <CheckIcon
                        className={`w-5 h-5 shrink-0 ${item.highlight ? "text-green-400" : "text-indigo-600"}`}
                      />
                    ) : (
                      <XMarkIcon className="w-5 h-5 shrink-0 text-red-400" />
                    )}
                    <span
                      className={`${feat.included ? "" : "text-gray-500"} ${item.highlight && feat.included ? "text-gray-300" : ""}`}
                    >
                      {feat.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={generateMailto(item.name, item.price)}
                className={`w-full py-4 text-center rounded-lg text-xs font-mono font-bold uppercase tracking-widest border transition-all ${item.highlight ? "bg-white text-black border-white hover:bg-gray-200" : "bg-transparent border-gray-200 text-black hover:bg-black hover:text-white"}`}
              >
                {content.btn}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingClient;
