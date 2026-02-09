"use client";

import React from "react";
import {
  Lock,
  Eye,
  Database,
  UserCheck,
  Bell,
  Globe,
  Cookie,
  Mail,
} from "lucide-react";

// Memanggil LanguageContext milik Kakak
import { useLanguage } from "@/context/LanguageContext";

const PrivacyPolicyPage = () => {
  // Mengambil lang (ID/EN) dari context Kakak
  const { lang } = useLanguage();

  const CONTENT = {
    ID: {
      label: "Kebijakan Privasi",
      title: "Privacy",
      subtitle: "Policy",
      update: "Terakhir Diperbarui: 9 Februari 2026",
      ctaTitle: "Ingin mengelola data Anda?",
      ctaSub: "Hubungi tim Data Protection kami",
      ctaBtn: "Contact Support",
      sections: [
        {
          id: 1,
          title: "Pengumpulan Informasi",
          icon: <Eye className="text-indigo-600" size={22} />,
          content: (
            <p>
              Bagian Corps mengumpulkan informasi yang Anda berikan secara
              langsung saat berkonsultasi, seperti nama, alamat email, nomor
              WhatsApp, dan detail bisnis. Kami juga mengumpulkan data teknis
              otomatis melalui situs kami untuk meningkatkan pengalaman
              pengguna.
            </p>
          ),
        },
        {
          id: 2,
          title: "Penggunaan Data",
          icon: <Database className="text-indigo-600" size={22} />,
          content: (
            <p>
              Data yang dikumpulkan digunakan untuk keperluan komunikasi proyek,
              pengiriman tagihan, pembaruan layanan (renewal), serta analisis
              performa aplikasi yang kami kembangkan agar tetap optimal bagi
              bisnis Anda.
            </p>
          ),
        },
        {
          id: 3,
          title: "Keamanan Data",
          icon: <Lock className="text-indigo-600" size={22} />,
          content: (
            <p>
              Kami menerapkan standar keamanan enkripsi digital untuk melindungi
              data sensitif klien. Akses terhadap basis data proyek hanya
              diberikan kepada tim teknis yang berwenang demi menjaga
              kerahasiaan informasi bisnis Anda.
            </p>
          ),
        },
        {
          id: 4,
          title: "Pembagian Informasi",
          icon: <Globe className="text-indigo-600" size={22} />,
          content: (
            <p>
              Bagian Corps{" "}
              <span className="text-black font-semibold uppercase text-[12px]">
                tidak akan pernah menjual
              </span>{" "}
              informasi pribadi Anda kepada pihak ketiga. Data hanya akan
              dibagikan jika diperlukan oleh hukum atau penyedia infrastruktur
              (seperti server/hosting) demi kelancaran operasional layanan.
            </p>
          ),
        },
        {
          id: 5,
          title: "Kebijakan Cookie",
          icon: <Cookie className="text-indigo-600" size={22} />,
          content: (
            <p>
              Situs kami menggunakan cookie untuk mengingat preferensi Anda
              (seperti pilihan bahasa). Kakak dapat menonaktifkan cookie melalui
              pengaturan browser, namun hal ini mungkin memengaruhi fungsi
              teknis tertentu pada situs kami.
            </p>
          ),
        },
        {
          id: 6,
          title: "Hak Pengguna",
          icon: <UserCheck className="text-indigo-600" size={22} />,
          content: (
            <p>
              Anda berhak untuk meminta akses, koreksi, atau penghapusan data
              pribadi Anda dari sistem kami kapan saja, selama hal tersebut
              tidak melanggar kewajiban kontrak proyek yang sedang berjalan.
            </p>
          ),
        },
        {
          id: 7,
          title: "Pembaruan Kebijakan",
          icon: <Bell className="text-indigo-600" size={22} />,
          content: (
            <p>
              Kebijakan ini dapat berubah sewaktu-waktu mengikuti regulasi
              perlindungan data terbaru. Kami akan memberikan notifikasi melalui
              situs atau email jika terdapat perubahan signifikan dalam cara
              kami mengelola data Anda.
            </p>
          ),
        },
      ],
    },
    EN: {
      label: "Privacy Policy",
      title: "Privacy",
      subtitle: "Policy",
      update: "Last Updated: February 9, 2026",
      ctaTitle: "Need to manage your data?",
      ctaSub: "Contact our Data Protection team",
      ctaBtn: "Contact Support",
      sections: [
        {
          id: 1,
          title: "Information Collection",
          icon: <Eye className="text-indigo-600" size={22} />,
          content: (
            <p>
              Bagian Corps collects information you provide directly during
              consultation, such as name, email, WhatsApp number, and business
              details. We also collect automatic technical data to enhance user
              experience.
            </p>
          ),
        },
        {
          id: 2,
          title: "Data Usage",
          icon: <Database className="text-indigo-600" size={22} />,
          content: (
            <p>
              Collected data is used for project communication, invoicing,
              service updates (renewal), and application performance analysis.
            </p>
          ),
        },
        {
          id: 3,
          title: "Data Security",
          icon: <Lock className="text-indigo-600" size={22} />,
          content: (
            <p>
              We implement digital encryption security standards to protect
              sensitive client data. Database access is restricted to authorized
              technical staff only.
            </p>
          ),
        },
        {
          id: 4,
          title: "Information Sharing",
          icon: <Globe className="text-indigo-600" size={22} />,
          content: (
            <p>
              Bagian Corps{" "}
              <span className="text-black font-semibold uppercase text-[12px]">
                will never sell
              </span>{" "}
              your personal information. Data is only shared as required by law
              or essential infrastructure providers.
            </p>
          ),
        },
        {
          id: 5,
          title: "Cookie Policy",
          icon: <Cookie className="text-indigo-600" size={22} />,
          content: (
            <p>
              Our site uses cookies to remember your preferences. You can
              disable cookies through your browser settings, though it may
              affect certain functionalities.
            </p>
          ),
        },
        {
          id: 6,
          title: "User Rights",
          icon: <UserCheck className="text-indigo-600" size={22} />,
          content: (
            <p>
              You have the right to request access, correction, or deletion of
              your personal data at any time, provided it does not violate
              ongoing contract obligations.
            </p>
          ),
        },
        {
          id: 7,
          title: "Policy Updates",
          icon: <Bell className="text-indigo-600" size={22} />,
          content: (
            <p>
              This policy may change in line with data protection regulations.
              We will notify you of any significant changes via the site or
              email.
            </p>
          ),
        },
      ],
    },
  };

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
          <p className="text-[11px] md:text-xs font-mono text-gray-400 uppercase tracking-[0.15em]">
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
              href="mailto:bagian.desk@gmail.com"
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

export default PrivacyPolicyPage;
