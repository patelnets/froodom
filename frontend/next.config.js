/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'froodom-frontend.s3.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'froodom-frontend.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
module.exports = nextConfig;
