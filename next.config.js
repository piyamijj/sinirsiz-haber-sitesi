/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ],
  },
  experimental: {
    swcMinify: false,
    forceSwcTransforms: false,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
