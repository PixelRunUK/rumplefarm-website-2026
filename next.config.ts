import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Staging (Hostinger shared hosting): static export, deployed via FTP.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
