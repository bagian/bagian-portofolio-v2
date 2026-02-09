"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { useLoader } from "@/context/LoaderContext";
import Link from "next/link";

const Hero = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { isTransitioning } = useLoader();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-title-char", { opacity: 0, y: 80 });
      gsap.set(".hero-sub", { opacity: 0, y: 15 });
      gsap.set(".hero-btn", { opacity: 0, scale: 0.9 });
      gsap.set(".main-dashboard", {
        opacity: 0,
        y: 100,
        rotateX: 10,
        scale: 0.95,
      });
      gsap.set(".dash-item", { opacity: 0, y: 20 });
      gsap.set(".large-widget", { opacity: 0, y: 60 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.out", duration: 1 },
      });

      tl.to(".hero-title-char", {
        y: 0,
        opacity: 1,
        stagger: 0.04,
      })
        .to(
          ".hero-sub",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          ".hero-btn",
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.8"
        )
        .to(
          ".main-dashboard",
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".dash-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=1.0"
        )
        .to(
          ".large-widget",
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=1.0"
        );

      // Animasi Floating tetap menggunakan gsap.to (looping)
      const floatAnim = (
        target: string,
        yValue: number,
        time: number,
        delayTime: number
      ) => {
        gsap.to(target, {
          y: yValue,
          duration: time,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delayTime,
        });
      };

      floatAnim(".widget-pipeline", -15, 5, 0.5);
      floatAnim(".widget-logs", 15, 5.5, 1);
      floatAnim(".widget-cdn", -12, 4.5, 1.5);
      floatAnim(".widget-db", 12, 6, 2);

      tlRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      gsap.delayedCall(0.1, () => {
        tlRef.current?.play();
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center bg-[#FAFAFA] overflow-hidden pt-24 md:pt-52 pb-32"
    >
      {/* 1. Perbaikan Grid: Dipastikan di lapisan z-0 */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* 2. Content Wrapper Utama: Ditambahkan relative z-10 agar berada di atas grid */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* LARGE WIDGETS */}
        <div className="large-widget widget-pipeline absolute top-[14rem] left-[5%] hidden xl:block z-10">
          <div className="w-72 bg-white rounded-xl border border-gray-200 shadow-xl p-5 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                PIPELINE.YML
              </span>
              <span className="bg-blue-50 text-blue-600 text-[9px] px-2 py-0.5 rounded font-mono">
                RUNNING
              </span>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 border border-green-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>Build</span>
              </div>
              <div className="w-8 h-0.5 bg-green-200 mb-5"></div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 border border-green-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <span>Test</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200 mb-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-full bg-blue-400 animate-pulse"></div>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <span>Deploy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="large-widget widget-logs absolute bottom-[8rem] left-[4%] hidden xl:block z-20">
          <div className="w-80 bg-[#1e1e1e] rounded-xl border border-gray-800 shadow-2xl p-4 rotate-[2deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <span className="text-[9px] font-mono text-gray-500">
                server.log
              </span>
            </div>
            <div className="font-mono text-[10px] text-gray-400 space-y-1.5 leading-tight">
              <div className="flex gap-2">
                <span className="text-blue-400">[INFO]</span>
                <span>Connecting to Redis...</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400">[OK]</span>
                <span>Connection established</span>
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400">[WARN]</span>
                <span>Memory usage (85%)</span>
              </div>
              <div className="flex gap-2 border-t border-gray-800 pt-1 mt-1 text-green-300">
                <span className="animate-pulse">➜</span>
                <span>Worker-03 online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="large-widget widget-cdn absolute top-[16rem] right-[4%] hidden xl:block z-10">
          <div className="w-80 bg-white rounded-xl border border-gray-200 shadow-xl p-5 rotate-[4deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono font-bold text-gray-900 uppercase">
                Global Edge
              </span>
              <span className="text-[9px] font-mono text-green-600">
                All Systems Normal
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  <span>Asia Pacific (SG)</span>
                </div>
                <span className="text-gray-900 font-bold">14ms</span>
              </div>
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-[15%] h-full"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>US East (VA)</span>
                </div>
                <span className="text-gray-900 font-bold">42ms</span>
              </div>
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div className="bg-purple-500 w-[40%] h-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="large-widget widget-db absolute bottom-[10rem] right-[6%] hidden xl:block z-20">
          <div className="w-64 bg-white rounded-xl border border-gray-200 shadow-xl p-4 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-3 border-b border-gray-50 pb-2">
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                DB Cluster
              </span>
              <span className="text-[10px] font-mono text-gray-400">v16.2</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="relative w-14 h-14 rounded-full border-4 border-gray-100 flex items-center justify-center">
                <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 rounded-full">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="transparent"
                    className="text-indigo-500 rounded-full"
                    strokeDasharray="72 126"
                  />
                </svg>
                <span className="text-[9px] font-bold text-gray-700">72%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-gray-400">
                  Storage
                </span>
                <span className="text-sm font-bold text-gray-900">480 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="relative z-30 flex flex-col items-center text-center w-full xl:max-w-7xl px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight font-medium text-[#1A1A1A] mb-6 max-w-4xl mx-auto">
            <div className="overflow-hidden inline-block">
              <span className="hero-title-char inline-block">
                Crafting&nbsp;
              </span>
            </div>
            <div className="overflow-hidden inline-block">
              <span className="hero-title-char inline-block">
                Digital&nbsp;
              </span>
            </div>
            <div className="overflow-hidden inline-block">
              <span className="hero-title-char inline-block">Excellence</span>
            </div>
          </h1>

          <p className="hero-sub max-w-2xl text-xs md:text-sm font-mono uppercase tracking-wider text-gray-500 leading-relaxed mb-8 mx-auto">
            From pixel-perfect architecture to seamless deployment
            <br className="hidden md:block" /> and long-term performance
            maintenance.
          </p>

          <div className="flex gap-4 mb-16 relative z-50">
            <Link
              href="/contact"
              className="hero-btn group relative px-6 py-3 bg-[#111] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-black transition-all rounded-sm shadow-xl shadow-black/10"
            >
              Start Project
              <span className="absolute bottom-2 left-6 right-6 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link
              href="/pricing"
              className="hero-btn group px-6 py-3 bg-white border border-[#E5E5E5] text-[#111] text-xs font-mono font-bold uppercase tracking-widest hover:bg-gray-50 transition-all rounded-sm"
            >
              View Pricing
            </Link>
          </div>

          {/* --- MAIN DASHBOARD VISUAL --- */}
          <div className="main-dashboard-container w-full lg:max-w-3xl xl:max-w-5xl perspective-1000">
            <div className="main-dashboard relative w-full bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
              <div className="h-10 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="hidden md:flex gap-6 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-widest">
                  <span className="text-gray-900">Project_Alpha</span>
                  <span>Analytics</span>
                  <span>Settings</span>
                </div>
                <div className="w-16"></div>
              </div>

              <div className="p-4 md:p-6 bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 text-left">
                <div className="dash-item col-span-1 md:col-span-7 bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex flex-col h-full min-h-[280px]">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                      <svg
                        className="w-3 h-3 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      <span>ProductHero.tsx</span>
                    </div>
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono">
                      TypeScript
                    </span>
                  </div>
                  <div className="font-mono text-[10px] md:text-xs leading-loose text-gray-400 flex-1 overflow-hidden">
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">1</span>
                      <span className="text-purple-600">import</span>
                      <span className="text-gray-800">&nbsp;React</span>
                      <span className="text-purple-600">&nbsp;from</span>
                      <span className="text-green-600">
                        &nbsp;&apos;react&apos;;
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">2</span>
                      <span className="text-purple-600">import</span>
                      <span className="text-gray-800">
                        &nbsp;{`{ motion }`}
                      </span>
                      <span className="text-purple-600">&nbsp;from</span>
                      <span className="text-green-600">
                        &nbsp;&apos;framer-motion&apos;;
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">3</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">4</span>
                      <span className="text-purple-600">export const</span>
                      <span className="text-yellow-600">&nbsp;Hero</span>
                      <span className="text-gray-600">=</span>
                      <span className="text-gray-600">()</span>
                      <span className="text-purple-600">=&gt;</span>
                      <span className="text-gray-600">{`{`}</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">5</span>
                      <span className="pl-4 text-gray-600">
                        {"//"} Implementing seamless animations
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">6</span>
                      <span className="pl-4 text-purple-600">return</span>
                      <span className="text-gray-600">(</span>
                    </div>
                    <div className="flex bg-blue-50/50">
                      <span className="w-6 text-gray-300 select-none">7</span>
                      <span className="pl-8 text-gray-800">
                        &lt;motion.div animate=
                      </span>
                      <span className="text-green-600">{`{isActive}`}</span>
                      <span className="text-gray-800">&gt;</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">8</span>
                      <span className="pl-12 text-gray-800">
                        &lt;Header title=
                      </span>
                      <span className="text-green-600">
                        &quot;Digital&quot;
                      </span>
                      <span className="text-gray-800">/&gt;</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">9</span>
                      <span className="pl-8 text-gray-800">
                        &lt;/motion.div&gt;
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">10</span>
                      <span className="text-gray-600">)</span>
                    </div>
                    <div className="flex">
                      <span className="w-6 text-gray-300 select-none">11</span>
                      <span className="text-gray-600">{`}`}</span>;
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 font-mono text-[9px] flex items-center gap-2 text-green-600">
                    <span className="animate-pulse">●</span>
                    <span>Compiled successfully in 420ms</span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-5 flex flex-col gap-4 md:gap-6">
                  <div className="dash-item bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-gray-400 uppercase">
                          Status
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          Production
                        </span>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] border-b border-gray-50 pb-2">
                        <span className="text-gray-500">Deployment URL</span>
                        <span className="text-blue-600 font-mono">
                          bagian.app/v2
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] border-b border-gray-50 pb-2">
                        <span className="text-gray-500">Branch</span>
                        <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">
                          main
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-500">Latest Commit</span>
                        <span className="text-gray-900 font-mono">
                          8f2a9c (Just now)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="dash-item bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex-1 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        Live Traffic
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        1.2k / min
                      </span>
                    </div>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {[40, 65, 20, 80, 55, 90, 45, 70, 120, 60, 85, 50].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="w-full bg-gray-100 rounded-t-sm relative group overflow-hidden"
                            style={{ height: `${h}%` }}
                          >
                            <div
                              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-50 to-indigo-400 ransition-all duration-1000 ease-out"
                              style={{
                                height: "0%",
                                animation: `fillHeight 1s forwards ${i * 0.1}s`,
                              }}
                            ></div>
                          </div>
                        )
                      )}
                    </div>
                    <style jsx>{`
                      @keyframes fillHeight {
                        to {
                          height: 100%;
                        }
                      }
                    `}</style>
                  </div>
                </div>

                <div className="dash-item col-span-1 md:col-span-12 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px]">
                    <div className="flex items-center gap-3 w-full md:w-1/3 p-2 md:p-0 bg-gray-50 md:bg-transparent rounded-md">
                      <div className="p-1.5 bg-indigo-50 rounded text-indigo-600 border border-indigo-100">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <div className="font-mono font-bold text-gray-700">
                          Postgres_Primary
                        </div>
                        <div className="text-gray-400 text-[9px]">
                          Connection Pool: 45/100
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold text-[9px]">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        OK
                      </div>
                    </div>

                    <div className="hidden md:block w-px h-8 bg-gray-100"></div>

                    <div className="flex items-center gap-3 w-full md:w-1/3 p-2 md:p-0 bg-gray-50 md:bg-transparent rounded-md">
                      <div className="p-1.5 bg-red-50 rounded text-red-600 border border-red-100">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between mb-1">
                          <span className="font-mono font-bold text-gray-700">
                            Redis Cache
                          </span>
                          <span className="text-gray-500 font-bold">1.2GB</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-red-500 w-[65%] h-full rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block w-px h-8 bg-gray-100"></div>

                    <div className="flex flex-col gap-2 w-full md:w-1/3 p-2 md:p-0 bg-gray-50 md:bg-transparent rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-gray-400 uppercase">
                          CPU Usage
                        </span>
                        <span className="font-bold text-gray-700">32%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-blue-500 w-[32%] h-full rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono text-gray-400 uppercase">
                          Memory
                        </span>
                        <span className="font-bold text-gray-700">48%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-purple-500 w-[48%] h-full rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
