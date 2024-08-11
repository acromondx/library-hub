/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: 'https',
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { crypto: false };
    }
    return config;
  },
};

export default nextConfig;
