"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon, // <--- Import Icon Error
} from "@heroicons/react/24/outline";

// --- DEFINISI KONTEN (ID & EN) ---
const CONTENT = {
  ID: {
    title: "Mari Berkolaborasi.",
    subtitle:
      "Ceritakan ide Anda, dan kami akan membantu mewujudkannya menjadi solusi digital yang nyata.",
    info: {
      email: "Email Kami",
      phone: "WhatsApp / Telepon",
      office: "Kantor",
      office_desc: "Surabaya, Jawa Timur, Indonesia",
    },
    form: {
      name: "Nama Lengkap",
      email: "Alamat Email",
      company: "Nama Perusahaan (Opsional)",
      service: "Topik / Layanan",
      message: "Pesan / Detail Proyek",
      btn: "Kirim Pesan",
      btn_sending: "Mengirim...",
      success: "Pesan Terkirim! Kami akan segera menghubungi Anda.",
      error_title: "Gagal Mengirim", // <--- Teks Error
      error_desc:
        "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.",
      btn_retry: "Coba Lagi",
    },
    services_opt: [
      "Konsultasi Umum",
      "Desain Website",
      "Aplikasi Website",
      "Maintenance",
      "Production",
    ],
  },
  EN: {
    title: "Let's Collaborate.",
    subtitle:
      "Tell us about your idea, and we will help turn it into a tangible digital solution.",
    info: {
      email: "Our Email",
      phone: "WhatsApp / Phone",
      office: "Office",
      office_desc: "Surabaya, East Java, Indonesia",
    },
    form: {
      name: "Full Name",
      email: "Email Address",
      company: "Company Name (Optional)",
      service: "Topic / Service",
      message: "Message / Project Details",
      btn: "Send Message",
      btn_sending: "Sending...",
      success: "Message Sent! We'll get back to you shortly.",
      error_title: "Failed to Send", // <--- Teks Error
      error_desc:
        "Sorry, something went wrong. Please try again or contact us via WhatsApp.",
      btn_retry: "Try Again",
    },
    services_opt: [
      "General Inquiry",
      "Website Design",
      "Web Application",
      "Maintenance",
      "Production",
    ],
  },
};

// --- KOMPONEN UTAMA ---
const ContactContent = () => {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  // State Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  // States Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false); // <--- State Error Baru

  const t = useMemo(() => (lang === "EN" ? CONTENT.EN : CONTENT.ID), [lang]);

  // --- LOGIKA AUTO-FILL ---
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      let selectedService = plan;
      if (
        plan.toLowerCase().includes("desain") ||
        plan.toLowerCase().includes("design")
      ) {
        selectedService = lang === "EN" ? "Website Design" : "Desain Website";
      } else if (plan.toLowerCase() === "production") {
        selectedService = "Production";
      } else if (plan.toLowerCase() === "maintenance") {
        selectedService = "Maintenance";
      }
      setFormData((prev) => ({ ...prev, service: selectedService }));
    } else {
      setFormData((prev) => ({ ...prev, service: t.services_opt[0] }));
    }
  }, [searchParams, lang, t.services_opt]);

  // --- GSAP ANIMATION ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-left", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".reveal-right", {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  // --- HANDLE SUBMIT ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false); // Reset error sebelum kirim ulang

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: t.services_opt[0],
          message: "",
        });
      } else {
        // Jika server merespon tapi gagal (misal 500 atau 400)
        throw new Error("Server responded with error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      // Tampilkan UI Error
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper styles
  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all";
  const labelClass =
    "text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 mb-2 block";

  // --- RENDER CONTENT FORM ---
  // Kita pisahkan logic render agar rapi: Success vs Error vs Form
  const renderFormContent = () => {
    if (isSuccess) {
      // --- TAMPILAN SUKSES ---
      return (
        <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
          <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6" />
          <h3 className="text-2xl font-bold mb-2 text-gray-900">Thank You!</h3>
          <p className="text-gray-500 max-w-xs mx-auto">{t.form.success}</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-8 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors border-b border-indigo-200 hover:border-indigo-600 pb-1"
          >
            Kirim pesan lain / Send another
          </button>
        </div>
      );
    }

    if (isError) {
      // --- TAMPILAN ERROR (BARU) ---
      return (
        <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            {t.form.error_title}
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto mb-8">
            {t.form.error_desc}
          </p>

          <button
            onClick={() => setIsError(false)} // Reset status error jadi user bisa edit form lagi
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            {t.form.btn_retry}
          </button>
        </div>
      );
    }

    // --- TAMPILAN FORM NORMAL ---
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className={labelClass}>{t.form.name}</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClass}
              placeholder="John Doe"
            />
          </div>
          {/* Email */}
          <div>
            <label className={labelClass}>{t.form.email}</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClass}
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label className={labelClass}>{t.form.company}</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className={inputClass}
            placeholder="PT. Bagian Digital"
          />
        </div>

        {/* Service Select */}
        <div>
          <label className={labelClass}>{t.form.service}</label>
          <div className="relative">
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className={`${inputClass} appearance-none cursor-pointer bg-gray-50`}
            >
              {t.services_opt.map((opt, idx) => (
                <option
                  key={idx}
                  value={opt}
                  className="text-gray-900 bg-white"
                >
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>{t.form.message}</label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className={`${inputClass} resize-none`}
            placeholder={
              lang === "ID"
                ? "Ceritakan detail proyek Anda..."
                : "Tell us about your project details..."
            }
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-bold flex justify-center items-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
        >
          {isSubmitting ? (
            <span>{t.form.btn_sending}</span>
          ) : (
            <>
              {t.form.btn}
              <PaperAirplaneIcon className="w-5 h-5 -rotate-45 mb-1" />
            </>
          )}
        </button>
      </form>
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-gray-900 pt-32 pb-20 px-6 md:px-12 selection:bg-indigo-500 selection:text-white flex items-center"
    >
      {/* Background Decorative */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] bg-purple-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* --- KOLOM KIRI: INFO --- */}
        <div className="flex flex-col justify-center">
          <h1 className="reveal-left text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1] text-gray-900">
            {t.title}
          </h1>
          <p className="reveal-left text-gray-600 text-lg mb-12 max-w-md leading-relaxed">
            {t.subtitle}
          </p>

          <div className="space-y-8">
            <div className="reveal-left flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-white border border-gray-200 shadow-sm group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors duration-300">
                <EnvelopeIcon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-regular text-gray-400 uppercase tracking-wider mb-1">
                  {t.info.email}
                </h4>
                <a
                  href="mailto:halo@bagian.web.id"
                  className="text-xl font-regular text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  halo@bagian.web.id
                </a>
              </div>
            </div>

            <div className="reveal-left flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-white border border-gray-200 shadow-sm group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors duration-300">
                <PhoneIcon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-regular text-gray-400 uppercase tracking-wider mb-1">
                  {t.info.phone}
                </h4>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  className="text-xl  text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  +62 812 3456 7890
                </a>
              </div>
            </div>

            <div className="reveal-left flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-white border border-gray-200 shadow-sm group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors duration-300">
                <MapPinIcon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h4 className="text-sm font-regular text-gray-400 uppercase tracking-wider mb-1">
                  {t.info.office}
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {t.info.office_desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: FORM / SUCCESS / ERROR --- */}
        <div className="reveal-right bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] min-h-[500px] flex flex-col justify-center">
          {renderFormContent()}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContactContent />
    </Suspense>
  );
};

export default ContactPage;
