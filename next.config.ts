import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
  },
  experimental: {
    // Reel frame morphs into the case study cover via React's <ViewTransition>
    viewTransition: true,
  },
};

export default nextConfig;
