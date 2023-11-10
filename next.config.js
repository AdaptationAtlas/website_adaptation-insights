/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Add this if you need to customize the static export behavior
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      // Add more paths here if you have dynamic routes
    };
  },
  // If you're using rewrites, headers, or redirects, you might need to adjust them here
};

module.exports = nextConfig;

