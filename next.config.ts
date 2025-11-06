import withNextIntl from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntlConfig = withNextIntl("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.takarli.tetane.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default withNextIntlConfig(nextConfig);
