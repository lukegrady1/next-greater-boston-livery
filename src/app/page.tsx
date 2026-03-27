import type { Metadata } from 'next'
import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { reviews } from '@/data/reviews'
import { HomeContent } from './home-sections'

export const metadata: Metadata = {
  title: 'Greater Boston Livery | Premium Chauffeured Transportation Boston',
  description: 'Greater Boston Livery offers premier chauffeured transportation for airport transfers, corporate travel, weddings and events throughout Greater Boston and New England. Call (855) 425-4661.',
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Greater Boston Livery | Premium Chauffeured Transportation',
    description: 'Premier chauffeured transportation for airport transfers, corporate travel, weddings and events throughout Greater Boston and New England.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    siteName: 'Greater Boston Livery',
    locale: 'en_US',
  },
}

export default function HomePage() {
  const localBusinessSchema = schemaToString(buildLocalBusinessSchema(reviews.length))
  const webSiteSchema = schemaToString(buildWebSiteSchema())
  const breadcrumbSchema = schemaToString(buildBreadcrumbSchema([{ name: 'Home', href: '/' }]))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <HomeContent />
    </>
  )
}
