import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // ✅ allow all paths
      },
      {
        protocol: "https",
        hostname: "random.imagecdn.app",
        pathname: "/**", // ✅ allow all paths
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**", // ✅ allow all paths
      },
    ],
  },
};

export default nextConfig;
