/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'dist',
  experimental: {
    serverComponentsExternalPackages: ['@resvg/resvg-js'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Add this if you need to customize the static export behavior
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     // Add more paths here if you have dynamic routes
  //   };
  // },
};

module.exports = nextConfig;

