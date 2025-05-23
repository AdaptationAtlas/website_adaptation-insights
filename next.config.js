/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // accept images from sanity.io servers
        port: '',
      }
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
