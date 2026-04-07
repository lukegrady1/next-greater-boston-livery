import type { MetadataRoute } from 'next'
import { locations, VALID_SERVICE_SLUGS } from '@/data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://greaterbostonlivery.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/fleet/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reviews/`, lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact/`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/team/`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/services/airport-transfers/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/corporate-car-service/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/wedding-transportation/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/roadshows/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/nightlife/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/limo-service/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/prom-limo/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/locations/`, lastModified: '2026-04-01', changeFrequency: 'monthly', priority: 0.9 },
  ]

  const cityHubs: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${baseUrl}/${loc.slug}/`,
    lastModified: '2026-04-01',
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const servicePages: MetadataRoute.Sitemap = locations.flatMap((loc) =>
    VALID_SERVICE_SLUGS.map((service) => ({
      url: `${baseUrl}/${loc.slug}/${service}/`,
      lastModified: '2026-04-01',
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  )

  return [...staticPages, ...cityHubs, ...servicePages]
}
