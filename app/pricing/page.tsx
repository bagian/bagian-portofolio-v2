import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Daftar Harga & Paket Layanan | Bagian Corps",
  description:
    "Cek rincian harga jasa pembuatan website, desain UI/UX, dan paket maintenance bulanan dari Bagian Corps. Transparan, kompetitif, dan dapat disesuaikan dengan kebutuhan bisnis Anda.",
  keywords: [
    "Harga Pembuatan Website",
    "Biaya UI/UX Design",
    "Paket IT Maintenance",
    "Pricelist Software House",
    "Bagian Corps Pricing",
  ],
  openGraph: {
    title: "Pricelist Layanan Digital Bagian Corps",
    description:
      "Investasi cerdas untuk transformasi digital bisnis Anda dengan paket layanan yang transparan.",
    url: "https://www.bagian.web.id/pricing",
    images: [{ url: "/images/og/og-bagian-web.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <PricingClient />;
}
