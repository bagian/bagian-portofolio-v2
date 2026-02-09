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
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

// --- DEFINISI KONTEN (ID & EN) ---
const CONTENT = {
  ID: {
    label: "Hubungi Kami",
    title: "Mulai Kolaborasi",
    subtitle: "Inisiasi proyek baru atau diskusi teknis.",
    info: {
      email: "Jalur Email",
      phone: "Jalur Suara",
      office: "Markas Operasional",
      office_desc: "Surabaya, Jawa Timur, ID",
    },
    form: {
      name: "Identitas Pengirim",
      email: "Alamat Kontak",
      company: "Entitas / Perusahaan",
      service: "Jenis Permintaan",
      message: "Data Pesan",
      btn: "Kirim Transmisi",
      btn_sending: "Mengirim Data...",
      success: "Transmisi Berhasil. Menunggu respon sistem.",
      error_title: "Gagal Mengirim",
      error_desc: "Terjadi gangguan koneksi. Silakan coba lagi.",
      btn_retry: "Ulangi Transmisi",
    },
    services_opt: [
      "Konsultasi Umum",
      "Desain Website",
      "Aplikasi Website",
      "Maintenance",
      "Production",
      "Lainnya",
    ],
  },
  EN: {
    label: "Contact Us",
    title: "Initiate Collaboration",
    subtitle: "Start a new project or technical discussion.",
    info: {
      email: "Email Channel",
      phone: "Voice Channel",
      office: "Base of Operations",
      office_desc: "Surabaya, East Java, ID",
    },
    form: {
      name: "Sender Identity",
      email: "Contact Address",
      company: "Entity / Company",
      service: "Request Type",
      message: "Message Data",
      btn: "Transmit Data",
      btn_sending: "Transmitting...",
      success: "Transmission Successful. Awaiting system response.",
      error_title: "Transmission Failed",
      error_desc: "Connection interruption. Please retry.",
      btn_retry: "Retry Transmission",
    },
    services_opt: [
      "General Inquiry",
      "Website Design",
      "Web Application",
      "Maintenance",
      "Production",
      "Other",
    ],
  },
};

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const t = useMemo(() => (lang === "EN" ? CONTENT.EN : CONTENT.ID), [lang]);

  // Auto-fill logic
  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) {
      setFormData((prev) => ({ ...prev, service: plan }));
    } else {
      setFormData((prev) => ({ ...prev, service: t.services_opt[0] }));
    }
  }, [searchParams, t.services_opt]);

  // GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-anim", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

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
        throw new Error("Server error");
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper Styles (Technical Look)
  const inputClass =
    "w-full bg-white border border-gray-300 rounded-none px-4 py-3 text-sm font-mono text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-0 transition-colors";
  const labelClass =
    "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-2 block";

  const renderFormContent = () => {
    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] border border-black bg-gray-50 p-8">
          <CheckCircleIcon className="w-16 h-16 text-black mb-6" />
          <h3 className="text-xl font-bold font-mono uppercase mb-2">
            System Status: OK
          </h3>
          <p className="text-sm font-mono text-gray-600 mb-8">
            {t.form.success}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-mono uppercase border-b border-black pb-1 hover:text-gray-600 transition-colors"
          >
            [ Reset Form ]
          </button>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] border border-red-500 bg-red-50 p-8">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-6" />
          <h3 className="text-xl font-bold font-mono uppercase mb-2 text-red-600">
            {t.form.error_title}
          </h3>
          <p className="text-sm font-mono text-red-500 mb-8">
            {t.form.error_desc}
          </p>
          <button
            onClick={() => setIsError(false)}
            className="px-6 py-3 bg-red-600 text-white font-mono text-xs uppercase hover:bg-red-700 transition-colors"
          >
            {t.form.btn_retry}
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="e.g. John Doe"
            />
          </div>
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
              placeholder="e.g. john@corp.com"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.form.company}</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className={inputClass}
            placeholder="e.g. Bagian Corp"
          />
        </div>

        <div>
          <label className={labelClass}>{t.form.service}</label>
          <div className="relative">
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              {t.services_opt.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ArrowRightIcon className="w-3 h-3 text-black rotate-90" />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.form.message}</label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className={`${inputClass} resize-none`}
            placeholder="..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
        >
          {isSubmitting ? (
            <span>{t.form.btn_sending}</span>
          ) : (
            <>
              <span>{t.form.btn}</span>
              <ArrowRightIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    );
  };

  return (
    <div
      ref={containerRef}
      // UPDATE: Gunakan flex & items-center untuk centering,
      // pt-24/py-24 untuk safe area navbar
      className="min-h-screen flex items-center justify-center py-24 px-6 md:px-12 font-sans"
    >
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* --- LEFT COLUMN: INFO --- */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="reveal-anim inline-block mb-6 text-[10px] font-mono uppercase tracking-widest text-indigo-500 border-indigo-600 px-4 py-1 border  w-fit rounded-full">
            ● {t.label}
          </span>
          <h1 className="reveal-anim text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-none">
            {t.title}
          </h1>
          <p className="reveal-anim text-sm text-gray-500 mb-12 font-mono max-w-md">
            {t.subtitle}
          </p>

          <div className="space-y-8 border-t border-gray-200 pt-8 reveal-anim">
            <div className="flex items-start gap-6 group">
              <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-white group-hover:border-black transition-colors">
                <EnvelopeIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t.info.email}
                </h4>
                <a
                  href="mailto:bagian.desk@gmail.com"
                  className="text-lg font-medium hover:underline decoration-1 underline-offset-4"
                >
                  bagian.desk@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-white group-hover:border-black transition-colors">
                <PhoneIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t.info.phone}
                </h4>
                <a
                  href="https://wa.me/6281234567890"
                  className="text-lg font-medium hover:underline decoration-1 underline-offset-4"
                >
                  +62 851 74295 981
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-10 h-10 border border-gray-200 flex items-center justify-center bg-white group-hover:border-black transition-colors">
                <MapPinIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                  {t.info.office}
                </h4>
                <p className="text-lg font-medium">{t.info.office_desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: FORM --- */}
        <div className="lg:col-span-7 reveal-anim flex flex-col justify-center">
          <div className="bg-gray-50 border border-gray-200 p-8 md:p-12 relative w-full">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>

            {renderFormContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactContent />
    </Suspense>
  );
};

export default ContactPage;
