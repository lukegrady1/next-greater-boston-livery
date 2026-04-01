import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  locations,
  getLocation,
  getServiceType,
  VALID_SERVICE_SLUGS,
} from '@/data/locations'
import { getReviewsForService } from '@/data/reviews'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { RouteHero } from '@/components/pseo/RouteHero'
import { TrustBar } from '@/components/pseo/TrustBar'
import { RouteStats } from '@/components/pseo/RouteStats'
import { LocalContext } from '@/components/pseo/LocalContext'
import { ServiceInclusions } from '@/components/pseo/ServiceInclusions'
import { FleetSuggestion } from '@/components/pseo/FleetSuggestion'
import { ServiceFAQ } from '@/components/pseo/ServiceFAQ'
import { NearbyLocations } from '@/components/pseo/NearbyLocations'
import { RelatedServices } from '@/components/pseo/RelatedServices'
import { BookingCTA } from '@/components/pseo/BookingCTA'

export function generateStaticParams() {
  return locations.flatMap((loc) =>
    VALID_SERVICE_SLUGS.map((service) => ({
      city: loc.slug,
      service,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}): Promise<Metadata> {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getServiceType(service)
  if (!loc || !svc) return {}

  const title = svc.titleTemplate(loc.name)
  const description = svc.descriptionTemplate(loc)

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${loc.slug}/${svc.slug}/` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${loc.slug}/${svc.slug}/`,
      title,
      description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
  }
}

function mapServiceToReviewType(slug: string): 'airport' | 'corporate' | 'wedding' | 'general' {
  if (slug === 'airport-transfer') return 'airport'
  if (slug === 'corporate-car-service') return 'corporate'
  if (slug === 'wedding-transportation') return 'wedding'
  return 'general'
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}) {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getServiceType(service)
  if (!loc || !svc) notFound()

  const faqs = svc.faqGenerator(loc)
  const reviewType = mapServiceToReviewType(svc.slug)
  const relevantReviews = getReviewsForService(reviewType)

  const heading =
    svc.slug === 'airport-transfer'
      ? `${loc.name} to Logan Airport Car Service`
      : `${svc.label} in ${loc.name}, ${loc.state}`

  const subheading =
    svc.slug === 'airport-transfer'
      ? `Premium chauffeured transportation from ${loc.name}, ${loc.county} to Boston Logan International Airport. ${loc.driveTimeToLogan} drive. Real-time flight tracking. 60-minute complimentary wait on all arrivals.`
      : `Premium ${svc.label.toLowerCase()} in ${loc.name} and throughout ${loc.county}. Professional chauffeurs, luxury vehicles, available 24/7.`

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
      { name: loc.name, href: `/${loc.slug}` },
      { name: svc.label, href: `/${loc.slug}/${svc.slug}` },
    ])
  )

  const serviceSchema = schemaToString({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: heading,
    description: svc.descriptionTemplate(loc),
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
    },
    areaServed: {
      '@type': 'City',
      name: loc.name,
      containedInPlace: { '@type': 'State', name: 'Massachusetts' },
    },
    url: `${SITE_URL}/${loc.slug}/${svc.slug}/`,
  })

  const faqSchema = schemaToString(buildFaqSchema(faqs))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <PageTransition>
        <RouteHero
          location={loc}
          serviceLabel={svc.label}
          serviceSlug={svc.slug}
          heading={heading}
          subheading={subheading}
          heroImage={svc.heroImage}
        />
        <TrustBar />
        {svc.slug === 'airport-transfer' && <RouteStats location={loc} />}
        <LocalContext location={loc} />
        <ServiceInclusions items={svc.inclusions} />
        <FleetSuggestion location={loc} />

        {/* Reviews */}
        <section className="section-padding py-20 bg-navy">
          <RevealOnScroll>
            <p className="label-sm mb-4">Client Testimonials</p>
            <h2 className="heading-lg text-cream mb-12">What Our Clients Say</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {relevantReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <ServiceFAQ cityName={loc.name} serviceLabel={svc.label} faqs={faqs} />
        <NearbyLocations location={loc} serviceSlug={svc.slug} serviceLabel={svc.label} />
        <RelatedServices location={loc} currentServiceSlug={svc.slug} />
        <BookingCTA cityName={loc.name} serviceLabel={svc.label} />
      </PageTransition>
    </>
  )
}
