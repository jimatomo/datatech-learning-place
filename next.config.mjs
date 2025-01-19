/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'datatech-learning-place.net',
      },
    ],
  },
};

export default nextConfig;
