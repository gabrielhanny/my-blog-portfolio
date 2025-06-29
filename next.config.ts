/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'truthful-simplicity-production.up.railway.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
