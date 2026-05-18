import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Jodi keu ei purono Vercel host theke ashe...
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'chayra-ai.vercel.app',
          },
        ],
        // ...sathe sathe take apnar ashol domain-e pathiye dao!
        destination: 'https://chayra.ranajitdhar.in/:path*',
        permanent: true, // 308 Permanent Redirect (SEO er jonno best)
      },
    ];
  },
};

export default nextConfig;