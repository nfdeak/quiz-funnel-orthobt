import type { NextConfig } from "next";

const basePath = process.env.NEXT_BASE_PATH;

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
