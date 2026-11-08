import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo-name>. The deploy workflow
// sets BASE_PATH; locally it stays empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
