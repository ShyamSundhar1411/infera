import type { NextConfig } from "next";

// Set BASE_PATH to serve the site from a sub-path, such as /infera on
// <user>.github.io. On its own domain it stays empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
