import type { Metadata } from 'next'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
  BOOKING_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { vehicles } from '@/data/vehicles'
import { FleetContent } from './fleet-content'

export const metadata: Metadata = {
  title: 'Luxury Fleet | Sedans, SUVs, Sprinters & Limos | Greater Boston Livery',
  description: "Browse Greater Boston Livery's luxury fleet: executive sedans, SUVs, Mercedes Sprinters, mini coaches, 55-passenger motor coaches, party buses, and stretch limousines. Available 24/7 in Boston.",
  alternates: { canonical: `${SITE_URL}/fleet` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/fleet`,
    title: 'Our Luxury Fleet | Greater Boston Livery',
    description: 'Browse our full fleet: sedans, SUVs, Mercedes Sprinters, motor coaches, and stretch limousines. Available 24/7 throughout Greater Boston.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

export default function FleetPage() {
  const vehicleListSchema = schemaToString({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Greater Boston Livery Fleet',
    description: 'Luxury chauffeured vehicles available in Greater Boston',
    url: `${SITE_URL}/fleet`,
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: v.name,
        description: v.description,
        image: v.image,
        offers: {
          '@type': 'Offer',
          url: BOOKING_URL,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'LocalBusiness', name: BUSINESS_NAME },
        },
      },
    })),
  })

  const fleetBreadcrumb = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Fleet', href: '/fleet' },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: vehicleListSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: fleetBreadcrumb }} />
      <FleetContent />
    </>
  )
}
