import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
} from '@/utils/seo'
import { services } from '@/data/services'
import { ServiceDetailContent } from './service-detail-content'

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const service = services.find((s) => s.id === id)
  if (!service) return {}

  return {
    title: service.metaTitle ?? `${service.title} | Greater Boston Livery`,
    description: service.metaDescription ?? service.description,
    alternates: { canonical: `${SITE_URL}/services/${service.id}/` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/services/${service.id}/`,
      title: service.metaTitle ?? service.title,
      description: service.metaDescription ?? service.description,
      images: [{ url: service.image }],
    },
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const service = services.find((s) => s.id === id)

  if (!service) notFound()

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
      { name: service.title, href: `/services/${service.id}` },
    ])
  )

  const serviceSchema = schemaToString({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.id}/`,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
    },
    areaServed: { '@type': 'State', name: 'Massachusetts' },
    url: `${SITE_URL}/services/${service.id}/`,
  })

  const faqSchema = service.faqs
    ? schemaToString(buildFaqSchema(service.faqs))
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      )}
      <ServiceDetailContent serviceId={id} />
    </>
  )
}
