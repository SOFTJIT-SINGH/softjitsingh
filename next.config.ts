import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // Update this to your specific image hosts later
    ],
  },
};
export default nextConfig;