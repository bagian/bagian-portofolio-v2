import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Hubungi Kami | Bagian Corps - Mulai Transformasi Digital Anda",
  description:
    "Siap membangun solusi digital visioner? Hubungi Bagian Corps untuk konsultasi gratis mengenai pembuatan aplikasi website, desain UI/UX, dan pengembangan sistem IT custom yang tepat untuk bisnis Anda.",
  keywords: [
    "Kontak Bagian Corps",
    "Contact US",
    "Bagian Corps",
    "Bagian Projects",
    "Jasa Pembuatan Website Surabaya",
    "Konsultasi UI/UX Design",
    "Software House Surabaya, Jawa Timur",
    "Bagian Software House Surabaya",
    "Website Development",
    "UI/UX Design",
    "Web Development Service",
    "Bagian Corps",
    "Hire Web Developer",
    "Bagian Projects Contact",
    "Solusi IT Bisnis",
    "Digital Transformation Consultant",
  ],
  openGraph: {
    title: "Hubungi Bagian Corps | Diskusikan Proyek Digital Anda",
    description:
      "Mulai langkah pertama transformasi digital Anda bersama kami. Tim ahli kami siap membantu mewujudkan visi bisnis Anda menjadi kenyataan.",
    url: "https://www.bagian.web.id/contact",
    images: [
      {
        url: "/images/og/og-bagian-web.png",
        width: 1200,
        height: 630,
        alt: "Bagian Corps Contact Page Branding",
      },
    ],
  },
};

export default function Page() {
  return <ContactClient />;
}
