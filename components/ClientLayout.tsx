// "use client";

// import { useState } from "react";
// import { LanguageProvider } from "@/context/LanguageContext";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";
// import SmoothScroll from "@/components/lib/SmoothScroll";
// import GlobalCursor from "@/components/GlobalCursor";
// import Preloader from "@/components/ui/Preloader";
// import Intro from "@/components/home/Intro";

// interface ClientLayoutProps {
//   children: React.ReactNode;
//   fontVariables: string;
// }

// export default function ClientLayout({
//   children,
//   fontVariables,
// }: ClientLayoutProps) {
//   const [loading, setLoading] = useState(true);

//   return (
//     <body
//       className={`${fontVariables} antialiased overflow-x-hidden lg:cursor-none bg-white`}
//     >
//       <LanguageProvider>
//         {/* Preloader di-render secara kondisional */}
//         {/* {loading && <Preloader onComplete={() => setLoading(false)} />} */}
//         <Preloader />
//         <SmoothScroll>
//           <Navbar />
//           <GlobalCursor />
//           <Intro />
//           <main
//             className={`min-h-screen relative z-0 ${
//               loading
//                 ? "opacity-0 h-screen overflow-hidden"
//                 : "opacity-100 transition-opacity duration-700 delay-200"
//             }`}
//           >
//             {children}
//           </main>
//           <Footer />
//         </SmoothScroll>
//       </LanguageProvider>
//     </body>
//   );
// }
