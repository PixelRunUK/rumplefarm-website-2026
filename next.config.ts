import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Staging (Hostinger shared hosting): static export, deployed via FTP.
  output: "export",
  images: {
    unoptimized: true,
  },
  // Hide the dev-mode "N" indicator (dev only; never in production builds).
  devIndicators: false,
};

export default nextConfig;
