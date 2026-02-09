"use client";

import React from "react";
import {
  ShieldCheck,
  FileText,
  RefreshCw,
  CreditCard,
  Scale,
  Code,
  Ban,
  ClipboardList,
} from "lucide-react";

// Memanggil LanguageContext milik Kakak
import { useLanguage } from "@/context/LanguageContext";

const TermsPage = () => {
  // Mengambil lang (ID/EN) dari context Kakak
  const { lang } = useLanguage();

  const CONTENT = {
    ID: {
      label: "Dokumentasi Legal",
      title: "Terms &",
      subtitle: "Conditions",
      update: "Terakhir Diperbarui: 9 Februari 2026",
      ctaTitle: "Masih kurang jelas?",
      ctaSub: "Hubungi tim konsultasi kami",
      ctaBtn: "Contact Support",
      sections: [
        {
          id: 1,
          title: "Ketentuan Umum",
          icon: <FileText className="text-indigo-600" size={22} />,
          content: (
            <p>
              Dengan menggunakan layanan{" "}
              <span className="text-black font-semibold">Bagian Corps</span>,
              Anda dianggap telah membaca, memahami, dan menyetujui seluruh
              ketentuan ini. Kami menyediakan solusi digital mencakup
              pengembangan software, UI/UX design, dan optimasi sistem yang
              berbasis di Jawa Timur.
            </p>
          ),
        },
        {
          id: 2,
          title: "Scope of Work (SOW)",
          icon: <ClipboardList className="text-indigo-600" size={22} />,
          content: (
            <p>
              Sebelum proyek dimulai, klien akan menerima dokumen{" "}
              <span className="text-black font-semibold">
                Scope of Work (SOW)
              </span>{" "}
              resmi. Dokumen ini merinci batasan proyek, fitur, alur kerja
              (Research, Design, Development, Launch), serta jadwal pengerjaan.
              Segala pengerjaan yang dilakukan akan mengacu secara ketat pada
              SOW yang telah disepakati.
            </p>
          ),
        },
        {
          id: 3,
          title: "Layanan & Pembayaran",
          icon: <CreditCard className="text-indigo-600" size={22} />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-100">
                <p className="mb-2">
                  <strong className="text-black uppercase font-mono">
                    Project Base:
                  </strong>
                </p>
                <p>
                  Pembayaran bertahap (DP & Settlement) sesuai milestone yang
                  tercantum pada invoice resmi sebelum penyerahan aset final.
                </p>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-100">
                <p className="mb-2">
                  <strong className="text-black uppercasefont-mono">
                    IT Partner:
                  </strong>
                </p>
                <p>
                  Layanan berlangganan bulanan. Keterlambatan pembayaran lebih
                  dari 3 hari dapat menyebabkan penangguhan akses teknis
                  sementara.
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 4,
          title: "Pengembangan & Revisi",
          icon: <Code className="text-indigo-600" size={22} />,
          content: (
            <p>
              Revisi mencakup perubahan minor pada desain atau fungsi sesuai
              paket layanan. Penambahan fitur di luar{" "}
              <span className="italic font-medium text-black underline underline-offset-4 decoration-gray-200">
                Scope of Work
              </span>{" "}
              awal akan dikenakan biaya tambahan.
            </p>
          ),
        },
        {
          id: 5,
          title: "Perpanjangan & Renewal",
          icon: <RefreshCw className="text-indigo-600" size={22} />,
          content: (
            <div className="space-y-4 font-mono">
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-bold">[01]</span>
                <p>
                  Notifikasi sistem otomatis dikirimkan via WhatsApp/Email H-7
                  sebelum masa aktif berakhir.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-bold">[02]</span>
                <p>
                  Grace period berlaku selama 3 hari kalender sebelum
                  penghentian layanan otomatis.
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 6,
          title: "Kepemilikan Aset",
          icon: <ShieldCheck className="text-indigo-600" size={22} />,
          content: (
            <p>
              Hak milik penuh atas source code dan aset desain berpindah kepada
              klien setelah pelunasan final. Bagian Corps berhak mencantumkan
              proyek di portofolio kami kecuali ada perjanjian kerahasiaan
              (NDA).
            </p>
          ),
        },
        {
          id: 7,
          title: "Pembatasan Layanan",
          icon: <Ban className="text-indigo-600" size={22} />,
          content: (
            <p>
              Kami berhak menolak proyek yang melanggar hukum RI (perjudian,
              penipuan, asusila). Tidak ada pengembalian dana untuk pembatalan
              akibat pelanggaran etika ini.
            </p>
          ),
        },
        {
          id: 8,
          title: "Hukum & Domisili",
          icon: <Scale className="text-indigo-600" size={22} />,
          content: (
            <p>
              Segala perselisihan diutamakan selesai melalui musyawarah.
              Ketentuan ini tunduk pada hukum NKRI dengan domisili hukum di
              wilayah Jawa Timur.
            </p>
          ),
        },
      ],
    },
    EN: {
      label: "Legal Documentation",
      title: "Terms &",
      subtitle: "Conditions",
      update: "Last Updated: February 9, 2026",
      ctaTitle: "Still have questions?",
      ctaSub: "Contact our consultation team",
      ctaBtn: "Contact Support",
      sections: [
        {
          id: 1,
          title: "General Provisions",
          icon: <FileText className="text-indigo-600" size={22} />,
          content: (
            <p>
              By using{" "}
              <span className="text-black font-semibold">Bagian Corps</span>{" "}
              services, you are deemed to have read, understood, and agreed to
              all these terms. We provide digital solutions including software
              development and UI/UX design.
            </p>
          ),
        },
        {
          id: 2,
          title: "Scope of Work (SOW)",
          icon: <ClipboardList className="text-indigo-600" size={22} />,
          content: (
            <p>
              Before the project begins, clients will receive an official{" "}
              <span className="text-black font-semibold">
                Scope of Work (SOW)
              </span>{" "}
              document. This document outlines project boundaries, features,
              workflow, and timelines. All work will strictly follow the agreed
              SOW.
            </p>
          ),
        },
        {
          id: 3,
          title: "Services & Payment",
          icon: <CreditCard className="text-indigo-600" size={22} />,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-100">
                <p className="mb-2">
                  <strong className="text-black uppercase font-mono">
                    Project Base:
                  </strong>
                </p>
                <p>
                  Milestone-based payments (DP & Settlement) as stated in the
                  official invoice before final asset delivery.
                </p>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-100">
                <p className="mb-2">
                  <strong className="text-black uppercase font-mono">
                    IT Partner:
                  </strong>
                </p>
                <p>
                  Monthly subscription services. Payment delays exceeding 3 days
                  may result in temporary suspension of technical access.
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 4,
          title: "Development & Revision",
          icon: <Code className="text-indigo-600" size={22} />,
          content: (
            <p>
              Revisions cover minor changes. Features outside the initial SOW
              will incur additional costs.
            </p>
          ),
        },
        {
          id: 5,
          title: "Renewal & Extensions",
          icon: <RefreshCw className="text-indigo-600" size={22} />,
          content: (
            <div className="space-y-4 font-mono">
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-bold">[01]</span>
                <p>
                  Automated system notifications are sent via WhatsApp/Email 7
                  days before the expiration date.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-bold">[02]</span>
                <p>
                  A 3-day grace period applies after the expiration date before
                  automatic service suspension.
                </p>
              </div>
            </div>
          ),
        },
        {
          id: 6,
          title: "Asset Ownership",
          icon: <ShieldCheck className="text-indigo-600" size={22} />,
          content: (
            <p>
              Full ownership of source code and design assets transfers to the
              client upon final payment. Bagian Corps reserves the right to
              showcase the project in our portfolio unless a written NDA is
              provided.
            </p>
          ),
        },
        {
          id: 7,
          title: "Service Restrictions",
          icon: <Ban className="text-indigo-600" size={22} />,
          content: (
            <p>
              We reserve the right to refuse projects violating Indonesian laws
              (gambling, fraud, etc). No refunds for ethics-related
              cancellations.
            </p>
          ),
        },
        {
          id: 8,
          title: "Governing Law",
          icon: <Scale className="text-indigo-600" size={22} />,
          content: (
            <p>
              Disputes are settled via deliberation under Indonesian law, with
              legal jurisdiction in East Java.
            </p>
          ),
        },
      ],
    },
  };

  // Mengakses data berdasarkan lang (ID/EN) dari context Kakak
  const currentContent = CONTENT[lang] || CONTENT.EN;

  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        {/* HEADER SECTION */}
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <div className="inline-block px-3 py-1 mb-5 bg-indigo-50 border border-indigo-100 rounded text-indigo-600 text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-widest">
            {currentContent.label}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-[#1A1A1A] mb-6">
            {currentContent.title}{" "}
            <span className="text-gray-400">{currentContent.subtitle}</span>
          </h1>
          <div className="h-1 w-20 bg-black mb-6 mx-auto md:mx-0"></div>
          <p className=" md:text-xs font-mono text-gray-400 uppercase tracking-[0.15em]">
            {currentContent.update}
          </p>
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10 md:p-16 space-y-12 md:space-y-16">
            {currentContent.sections.map((item) => (
              <section key={item.id} className="group">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h2 className="text-sm md:text-base font-bold uppercase tracking-widest font-mono text-[#1A1A1A]">
                    {item.id}. {item.title}
                  </h2>
                </div>
                <div className="text-gray-600 leading-relaxed text-sm md:text-base pl-2 md:pl-12">
                  {item.content}
                </div>
              </section>
            ))}
          </div>

          {/* FOOTER CTA */}
          <div className="bg-[#111111] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-white font-medium mb-1">
                {currentContent.ctaTitle}
              </p>
              <p className="text-gray-400 text-xs font-mono uppercase tracking-wider">
                {currentContent.ctaSub}
              </p>
            </div>
            <a
              href="https://wa.me/6285174295981"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto text-center px-8 py-4 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gray-200 transition-all active:scale-95"
            >
              {currentContent.ctaBtn}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
