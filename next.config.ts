import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {

  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores de ESLint durante la compilación
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Aplica a todas las rutas
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' data: https:;",
              "connect-src 'self' https://*.sui.io https://api.coingecko.com;"
,
              "frame-src 'self';",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;



