import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Partial Prerendering (PPR) for Next.js 15
  experimental: {
    ppr: true,
  },

  // Ensure static assets are properly served
  trailingSlash: false,

  // Add headers for better caching of static assets
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
