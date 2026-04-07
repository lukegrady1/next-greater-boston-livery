import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Renamed service pages (old slug -> new slug)
      {
        source: '/services/airport/',
        destination: '/services/airport-transfers/',
        permanent: true,
      },
      {
        source: '/services/corporate/',
        destination: '/services/corporate-car-service/',
        permanent: true,
      },
      {
        source: '/services/weddings/',
        destination: '/services/wedding-transportation/',
        permanent: true,
      },
      // Blog placeholder — redirect to services until blog is built
      {
        source: '/blog/',
        destination: '/services/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
