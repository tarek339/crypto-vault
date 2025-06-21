import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src"],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
