import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**', // Allow all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
