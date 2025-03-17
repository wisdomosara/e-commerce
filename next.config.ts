import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.dummyjson.com",
      "images.unsplash.com",
      "picsum.photos",
    ],
  },
};

export default nextConfig;
