import type { Metadata } from 'next'
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { services } from '@/data/services'
import { ServicesContent } from './services-content'

export const metadata: Metadata = {
  title: 'Airport Transfers, Corporate & Wedding Transportation | Greater Boston Livery',
  description: 'Greater Boston Livery provides airport car service at Logan, Manchester & T.F. Green, corporate chauffeur service, wedding transportation, roadshows, and special occasions throughout New England.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/services`,
    title: 'Chauffeured Services | Greater Boston Livery',
    description: 'Airport transfers at Logan, Manchester & T.F. Green, corporate travel, weddings, roadshows, and special occasions throughout Greater Boston and New England.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

export default function ServicesPage() {
  const serviceListSchema = schemaToString(
    buildServiceSchema(
      services.map((s) => ({ name: s.title, description: s.description, id: s.id }))
    )
  )

  const servicesBreadcrumb = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceListSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesBreadcrumb }} />
      <ServicesContent />
    </>
  )
}
