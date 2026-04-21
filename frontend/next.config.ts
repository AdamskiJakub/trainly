import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      // Add production API domain when deployed
      // {
      //   protocol: 'https',
      //   hostname: 'api.trainly.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

export default withNextIntl(nextConfig);
