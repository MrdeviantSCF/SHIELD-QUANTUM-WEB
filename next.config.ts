import type { NextConfig } from "next";

// Detect environment: Vercel vs GitHub Pages vs Local
const isGithubPages =
  process.env.GITHUB_PAGES === "true" ||
  (process.env.GITHUB_ACTIONS === "true" && !process.env.VERCEL);

const shouldExportStatic =
  process.env.EXPORT_STATIC === "true" || isGithubPages;

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPages ? "/SHIELD-QUANTUM-WEB" : "");

const nextConfig: NextConfig = {
  ...(shouldExportStatic ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
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

