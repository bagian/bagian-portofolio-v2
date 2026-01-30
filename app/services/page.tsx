import { Metadata } from "next";
import ServiceClient from "./ServiceClient";

export const metadata: Metadata = {
  title:
    "Layanan Kami | Bagian Corps - Solusi Website & UI/UX Design Profesional",
  description:
    "Temukan layanan IT menyeluruh dari Bagian Corps, mulai dari pengembangan aplikasi berbasis website, desain UI/UX yang intuitif, hingga konsultasi transformasi digital. Kami melayani proses end-to-end dari riset, perencanaan, desain, hingga deployment ke web service.",
  keywords: [
    "Jasa Pembuatan Website",
    "Jasa UI/UX Design",
    "Web Development Service",
    "Software House Surabaya",
    "Pengembangan Aplikasi Custom",
    "Konsultasi IT",
    "Next.js Development",
    "Laravel Developer Indonesia",
    "Bagian Corps Services",
    "Bagian Projects",
    "Layanan IT Profesional",
  ],
  openGraph: {
    title: "Layanan Profesional Bagian Corps | Solusi Digital End-to-End",
    description:
      "Kami membantu bisnis Anda tumbuh melalui teknologi. Mulai dari desain antarmuka yang elegan hingga sistem backend yang skalabel.",
    url: "https://www.bagian.web.id/services",
    images: [
      {
        url: "/images/og/og-bagian-web.png",
        width: 1200,
        height: 630,
        alt: "Bagian Corps Services Branding",
      },
    ],
  },
};

export default function Page() {
  return <ServiceClient />;
}
