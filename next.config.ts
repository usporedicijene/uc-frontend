import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  reactStrictMode: false,
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
