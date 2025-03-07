import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Ejemplo: si se necesita deshabilitar "fs"
    return config;
  },

};

export default nextConfig;
