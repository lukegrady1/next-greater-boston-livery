import type { NextConfig } from 'next'

// Removed programmatic city pages — redirect their old (likely-indexed) URLs home.
// Enumerated as a regex enum so kept routes (fleet, services, etc.) are never matched.
const REMOVED_CITY_SLUGS = [
  'newton', 'brookline', 'cambridge', 'waltham', 'wellesley', 'needham',
  'lexington', 'quincy', 'hingham', 'plymouth', 'duxbury', 'marshfield',
  'salem', 'newburyport', 'gloucester', 'worcester', 'shrewsbury',
  'barnstable', 'sandwich', 'falmouth',
].join('|')

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
      // Removed programmatic SEO pages -> homepage (301).
      // City × service pages, e.g. /newton/airport-transfer/
      {
        source: `/:city(${REMOVED_CITY_SLUGS})/:service`,
        destination: '/',
        permanent: true,
      },
      // City landing pages, e.g. /newton/
      {
        source: `/:city(${REMOVED_CITY_SLUGS})`,
        destination: '/',
        permanent: true,
      },
      // Removed locations index
      {
        source: '/locations',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
