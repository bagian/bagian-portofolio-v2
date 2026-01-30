import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/lib/SmoothScroll";
import GlobalCursor from "@/components/GlobalCursor";
import Preloader from "@/components/ui/Preloader";
import { LoaderProvider } from "@/context/LoaderContext";
import Script from "next/script";

// --- FONT CONFIGURATION ---
const CabinetGrotesk = localFont({
  src: [
    { path: "./fonts/CabinetGrotesk/CabinetGrotesk-Thin.woff2", weight: "100" },
    {
      path: "./fonts/CabinetGrotesk/CabinetGrotesk-Extralight.woff2",
      weight: "200",
    },
    {
      path: "./fonts/CabinetGrotesk/CabinetGrotesk-Light.woff2",
      weight: "300",
    },
    {
      path: "./fonts/CabinetGrotesk/CabinetGrotesk-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/CabinetGrotesk/CabinetGrotesk-Medium.woff2",
      weight: "500",
    },
    { path: "./fonts/CabinetGrotesk/CabinetGrotesk-Bold.woff2", weight: "700" },
    {
      path: "./fonts/CabinetGrotesk/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
    },
    {
      path: "./fonts/CabinetGrotesk/CabinetGrotesk-Black.woff2",
      weight: "900",
    },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const ArrayFont = localFont({
  src: [
    { path: "./fonts/Array/Array-Regular.woff2", weight: "400" },
    { path: "./fonts/Array/Array-Semibold.woff2", weight: "600" },
    {
      path: "./fonts/Array/Array-SemiboldWide.woff2",
      weight: "600",
      style: "italic",
    },
    { path: "./fonts/Array/Array-Bold.woff2", weight: "700" },
    {
      path: "./fonts/Array/Array-BoldWide.woff2",
      weight: "700",
      style: "italic",
    },
    { path: "./fonts/Array/Array-Wide.woff2", weight: "800" },
  ],
  variable: "--font-array",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bagian Corps | Jasa Pembuatan Website & UI/UX Design",
    template: "%s | Bagian Corps",
  },
  description:
    "Bagian Corps menyediakan jasa pembuatan website profesional, desain UI/UX, dan solusi IT custom. Membangun ekosistem digital visioner dari riset hingga deployment. Harga yang ditawarkan bergantung dari kebutuhan bisnis anda. Target kami adalah membantu UMKM untuk bergerak maju diera digital yang semakin canggih dan terintegrasi dengan AI. Kami sudah berjalan lebih 2 tahun, jadi jangan ragu untuk mempercayakan kami untuk membantu bisnis anda bergerak diera digital yang semakin berkembang ini.",
  keywords: [
    "Software House Surabaya, Jawa Timur",
    "Bagian Software House Surabaya",
    "Website Development",
    "UI/UX Design Team",
    "Web Development Service",
    "Next.js Developer",
    "Sistem Booking Website",
    "Bagian Corps",
    "Bagian Projects",
  ],
  authors: [{ name: "Bagian Corps", url: "https://www.bagian.web.id" }],
  metadataBase: new URL("https://www.bagian.web.id"),

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },

  openGraph: {
    title: "Bagian Corps | Membangun Ekosistem Digital",
    description:
      "Solusi perangkat lunak visioner dengan estetika desain tinggi untuk transformasi digital untuk membantu bisnis anda, mulai dari riset hingga deployment.",
    url: "https://www.bagian.web.id",
    siteName: "Bagian Corps",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/og/og-bagian-web.png",
        width: 1200,
        height: 630,
        alt: "Bagian Corps Branding",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bagian Corps | Jasa Pembuatan Website",
    description: "Solusi IT end-to-end dari riset hingga deployment.",
    images: ["/images/og/og-bagian-web.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${CabinetGrotesk.variable} ${ArrayFont.variable} antialiased overflow-x-hidden lg:cursor-none`}
      >
        <LoaderProvider>
          <Preloader />
          <LanguageProvider>
            <SmoothScroll>
              <Navbar />
              <GlobalCursor />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </LanguageProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
