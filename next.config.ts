import withNextIntl from "next-intl/plugin"
import type { NextConfig } from "next"

const withNextIntlConfig = withNextIntl("./src/i18n/request.ts")

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.takarli.tetane.com",
        pathname: "/storage/**",
      },
    ],
  },
}

export default withNextIntlConfig(nextConfig)