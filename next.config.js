/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/keo4sye0/**', // only this project's images, not any sanity project
        port: '',
      }
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
