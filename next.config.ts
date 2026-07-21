import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["framer-motion"],
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/feriromadhona-site',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/feriromadhona-site',
  },
};

export default nextConfig;
