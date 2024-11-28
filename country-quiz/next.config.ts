import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/_next' : ''
};

export default nextConfig;
