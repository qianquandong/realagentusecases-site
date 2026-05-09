import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — generates out/ for Cloudflare Pages.
  output: "export",
  // No image optimization server in static export.
  images: { unoptimized: true },
  // Trailing slash makes static hosting routing predictable.
  trailingSlash: true,
};

export default nextConfig;
