import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/SHIELD-QUANTUM-WEB" : "",
  assetPrefix: isProd ? "/SHIELD-QUANTUM-WEB/" : "",
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "quantumai.google",
      },
    ],
  },
};

export default nextConfig;
