import type { Metadata } from 'next'
import Link from 'next/link'
import { locations } from '@/data/locations'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

export const metadata: Metadata = {
  title: 'Service Areas | Greater Boston Livery',
  description: 'Greater Boston Livery serves Greater Boston, the South Shore, North Shore, Cape Cod, and Central Massachusetts. Browse all service areas for airport transfers, limo service, corporate travel, and wedding transportation.',
  alternates: { canonical: `${SITE_URL}/locations/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/locations/`,
    title: 'Service Areas | Greater Boston Livery',
    description: 'Browse all service areas for premium chauffeured transportation throughout Massachusetts.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

export default function LocationsPage() {
  const regions = [...new Set(locations.map((l) => l.region))]

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <PageTransition>
        {/* Hero */}
        <section className="bg-navy pt-40 pb-20 section-padding">
          <RevealOnScroll>
            <p className="label-sm mb-4">Where We Serve</p>
            <h1 className="heading-display text-cream max-w-2xl">
              Greater Boston Livery —{' '}
              <span className="gold-gradient">Service Areas</span>
            </h1>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              Premium chauffeured transportation serving Greater Boston, the South Shore,
              North Shore, Cape Cod, Central Massachusetts, and beyond. Select your city below
              to see available services, drive times, and booking options.
            </p>
          </RevealOnScroll>
        </section>

        {/* Regions */}
        {regions.map((region) => {
          const regionLocations = locations.filter((l) => l.region === region)
          return (
            <section key={region} className="section-padding py-16 border-b border-silver bg-cream">
              <RevealOnScroll>
                <h2 className="heading-lg mb-10">{region}</h2>
              </RevealOnScroll>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionLocations.map((loc) => (
                  <StaggerItem key={loc.slug}>
                    <div className="p-6 border border-silver hover:border-gold/40 transition-colors">
                      <Link href={`/${loc.slug}/`} className="font-display text-lg text-navy hover:text-gold transition-colors">
                        {loc.name}
                      </Link>
                      <p className="font-body text-xs text-navy/40 mt-1 mb-4">
                        {loc.county} · {loc.driveTimeToLogan} to Logan
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <Link href={`/${loc.slug}/airport-transfer/`} className="font-body text-xs text-gold hover:underline">
                          Airport Transfer
                        </Link>
                        <Link href={`/${loc.slug}/limo-service/`} className="font-body text-xs text-gold hover:underline">
                          Limo Service
                        </Link>
                        <Link href={`/${loc.slug}/corporate-car-service/`} className="font-body text-xs text-gold hover:underline">
                          Corporate
                        </Link>
                        <Link href={`/${loc.slug}/wedding-transportation/`} className="font-body text-xs text-gold hover:underline">
                          Wedding
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </section>
          )
        })}

        {/* CTA */}
        <section className="bg-navy section-padding py-20 text-center">
          <RevealOnScroll>
            <h2 className="heading-lg text-cream mb-4">Don&apos;t see your city?</h2>
            <p className="font-body text-silver/60 mb-8 max-w-lg mx-auto">
              We serve all of Massachusetts and beyond. Call us to arrange service from any location.
            </p>
            <a href="tel:+18554254661" className="btn-primary">
              Call (855) 425-4661
            </a>
          </RevealOnScroll>
        </section>
      </PageTransition>
    </>
  )
}
