import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Derive API URL from environment variable
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const url = new URL(apiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(':', '') as 'http' | 'https',
        hostname: url.hostname,
        port: url.port,
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
