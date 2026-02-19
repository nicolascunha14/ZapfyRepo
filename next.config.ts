import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect from accented URL to ASCII-safe URL
      {
        source: "/pr%C3%A9-venda",
        destination: "/pre-venda",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
