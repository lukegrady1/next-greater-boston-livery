import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://greaterbostonlivery.com'

  return [
    { url: `${baseUrl}/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/fleet/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reviews/`, lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact/`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/team/`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/services/airport/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/corporate/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/weddings/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/roadshows/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/nightlife/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
  ]
}
