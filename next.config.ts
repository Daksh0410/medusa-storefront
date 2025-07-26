import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // ✅ Allow images from Medusa backend
  },
};

export default nextConfig;
