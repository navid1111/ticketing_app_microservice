import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Disable HTTPS certificate verification in development
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      serverActions: {
        allowedOrigins: ['ticketing.dev']
      }
    }
  })
};

export default nextConfig;