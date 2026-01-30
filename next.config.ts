/** @type {import('next').NextConfig} */
import type { NextConfig as Nextconfig } from "next";

const nextConfig: Nextconfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  transpilePackages: ["gsap"],
};

module.exports = nextConfig;
