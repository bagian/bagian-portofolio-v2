import { notFound } from "next/navigation";
import { SERVICES_DETAILS } from "@/constant/services";
import ServiceContent from "./ServiceContent";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * generateStaticParams mengambil kunci dari salah satu bahasa (misal ID)
 * karena slug-nya sama antara ID dan EN.
 */
export async function generateStaticParams() {
  // Mengambil keys dari ID karena slug (kunci) ID dan EN identik
  return Object.keys(SERVICES_DETAILS.ID).map((slug) => ({
    slug: slug,
  }));
}

/**
 * generateMetadata menggunakan judul dari data bahasa default (misal ID)
 * untuk SEO tab browser.
 */
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  // Ambil data dari ID sebagai referensi metadata utama
  const data = SERVICES_DETAILS.ID[slug as keyof typeof SERVICES_DETAILS.ID];

  return {
    title: data ? `${data.title} | Bagian` : "Service Not Found",
  };
}

export default async function Page({ params }: Props) {
  // 1. Unwrap Promise params
  const { slug } = await params;

  // 2. Cek apakah slug tersebut ada di dalam data kita
  // Cukup cek di salah satu bahasa (ID) karena slug-nya sama
  const isValidSlug = slug in SERVICES_DETAILS.ID;

  // 3. Jika slug tidak terdaftar, Next.js otomatis lempar ke page 404
  if (!isValidSlug) {
    notFound();
  }

  /**
   * 4. Render konten melalui Client Component.
   * Kita kirim 'slug' dan seluruh 'SERVICES_DETAILS' agar ServiceContent
   * bisa memproses perpindahan bahasa secara reaktif di sisi klien.
   */
  return <ServiceContent slug={slug} allData={SERVICES_DETAILS} />;
}
