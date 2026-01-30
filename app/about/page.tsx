import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Tentang Kami | Bagian Corps - Mitra Strategis Transformasi Digital",
  description:
    "Pelajari misi Bagian Corps sebagai software house profesional yang fokus pada pengembangan aplikasi website dan desain UI/UX berkualitas tinggi. Kami membantu bisnis bertransformasi melalui teknologi yang elegan, fungsional, dan terukur mulai dari riset hingga deployment.",
  keywords: [
    "Software House Surabaya, Jawa Timur",
    "Bagian Software House Surabaya",
    "Website Development",
    "UI/UX Design",
    "Web Development Service",
    "Sistem Booking Website",
    "Bagian Corps",
    "Bagian Projects",
    "Tentang Bagian Corps",
    "About Bagian Corps",
    "Tim UI/UX",
    "Transformasi Digital Bisnis",
    "Web Developer Surabaya",
    "Bagian Projects",
  ],
  openGraph: {
    title: "Tentang Bagian Corps | Bukan Sekadar Software House",
    description:
      "Kami adalah mitra strategis yang menerjemahkan visi kompleks bisnis Anda menjadi solusi digital yang elegan, fungsional, dan berdampak nyata.",
    url: "https://www.bagian.web.id/about",
    images: [
      {
        url: "/images/og/og-bagian-web.png",
        width: 1200,
        height: 630,
        alt: "Bagian Corps About Page Branding",
      },
    ],
  },
};

export default function Page() {
  return <AboutClient />;
}
