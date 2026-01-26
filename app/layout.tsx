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

// --- KONFIGURASI FONT CABINET GROTESK (8 VARIAN) ---
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

// --- KONFIGURASI FONT ARRAY (6 VARIAN) ---
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
  title: "Bagian - Membangun Ekosistem Digital",
  description: "Solusi perangkat lunak visioner dengan estetika desain tinggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
