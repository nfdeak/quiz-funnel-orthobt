import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/quiz-funnel',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
