import { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Portofolio | Bagian Corps - Showcase Solusi Digital Visioner",
  description:
    "Eksplorasi portofolio Bagian Corps yang mencakup berbagai proyek sukses mulai dari sistem booking YellowKost, platform pendidikan Lentera Fajar Indonesia, hingga solusi desain interior. Lihat bagaimana kami menghadirkan estetika tinggi dalam setiap pengembangan aplikasi website dan desain UI/UX.",
  keywords: [
    "Software House Surabaya, Jawa Timur",
    "Bagian Software House Surabaya",
    "Website Development",
    "UI/UX Design",
    "Web Development Service",
    "Sistem Booking Website",
    "Bagian Corps",
    "Bagian Projects",
    "Portofolio Bagian Corps",
    "Showcase Web Development",
    "UI/UX Design Portfolio",
    "Project YellowKost",
    "Lentera Fajar Indonesia Project",
    "Kinaya Interior Design",
    "Software House Projects",
    "Studi Kasus IT",
    "Bagian Projects Work",
  ],
  openGraph: {
    title: "Portofolio Bagian Corps | Karya Digital yang Berdampak",
    description:
      "Lihat bagaimana kami mentransformasi visi klien menjadi produk digital yang elegan dan fungsional. Jelajahi studi kasus proyek website dan desain kami.",
    url: "https://www.bagian.web.id/work",
    images: [
      {
        url: "/images/og/og-bagian-web.png",
        width: 1200,
        height: 630,
        alt: "Bagian Corps Work Portfolio Branding",
      },
    ],
  },
};

export default function Page() {
  return <WorkClient />;
}
