import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',       // Root path
        destination: '/hausbot', // Redirect to this path
        permanent: false,  // true = 308 permanent redirect, false = 307 temporary
      },
    ];
  },
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
