import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Plane, Briefcase, Heart, Car, ArrowRight } from 'lucide-react'
import {
  locations,
  getLocation,
  SERVICE_TYPES,
  RESERVED_SLUGS,
} from '@/data/locations'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { TrustBar } from '@/components/pseo/TrustBar'
import { LocalContext } from '@/components/pseo/LocalContext'
import { BookingCTA } from '@/components/pseo/BookingCTA'
import { NearbyLocations } from '@/components/pseo/NearbyLocations'

const iconMap: Record<string, typeof Plane> = {
  'airport-transfer': Plane,
  'limo-service': Car,
  'corporate-car-service': Briefcase,
  'wedding-transportation': Heart,
}

const serviceDescriptions: Record<string, (loc: { name: string; driveTimeToLogan: string }) => string> = {
  'airport-transfer': (loc) => `Logan, MHT & PVD — ${loc.driveTimeToLogan} from ${loc.name}`,
  'limo-service': () => 'Luxury sedans, SUVs & stretch limos for any occasion',
  'corporate-car-service': () => 'Executive accounts, invoicing, on-demand fleet',
  'wedding-transportation': () => 'Full wedding party coordination, immaculate vehicles',
}

export function generateStaticParams() {
  return locations
    .filter((loc) => !RESERVED_SLUGS.includes(loc.slug))
    .map((loc) => ({ city: loc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) return {}

  const title = `Chauffeured Transportation ${loc.name}, ${loc.state} | Greater Boston Livery`
  const description = `Premium chauffeured transportation in ${loc.name}, ${loc.county}. Airport transfers, corporate car service, limo service, and wedding transportation. Available 24/7. Call (855) 425-4661.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${loc.slug}/` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${loc.slug}/`,
      title,
      description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
  }
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) notFound()

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
      { name: loc.name, href: `/${loc.slug}` },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <PageTransition>
        {/* Hero */}
        <section className="bg-navy pt-40 pb-20 section-padding relative overflow-hidden">
          <div className="relative z-10">
            <RevealOnScroll>
              <nav className="flex items-center gap-2 mb-6 font-body text-xs text-silver/40">
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                <span>/</span>
                <Link href="/locations/" className="hover:text-gold transition-colors">Locations</Link>
                <span>/</span>
                <span className="text-silver/70">{loc.name}</span>
              </nav>
              <p className="label-sm mb-4">{loc.region}</p>
              <h1 className="heading-display text-cream max-w-2xl">
                Chauffeured Transportation in{' '}
                <span className="gold-gradient">{loc.name}, {loc.state}</span>
              </h1>
              <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
                Greater Boston Livery provides premium chauffeured transportation throughout{' '}
                {loc.name} and {loc.county}. From Logan Airport transfers to corporate travel,
                weddings, and special occasions — available 24/7.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <TrustBar />

        {/* Service cards */}
        <section className="section-padding py-20 bg-cream">
          <RevealOnScroll>
            <p className="label-sm mb-4">Our Services</p>
            <h2 className="heading-lg mb-12">What We Offer in {loc.name}</h2>
          </RevealOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-silver">
            {SERVICE_TYPES.map((service) => {
              const Icon = iconMap[service.slug] ?? Car
              const desc = serviceDescriptions[service.slug]?.(loc) ?? ''
              return (
                <StaggerItem key={service.slug} className="h-full">
                  <Link
                    href={`/${loc.slug}/${service.slug}/`}
                    className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
                  >
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">
                      {service.label}
                    </h3>
                    <p className="font-body text-sm text-navy/60 group-hover:text-silver/60 transition-colors leading-relaxed">
                      {desc}
                    </p>
                    <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                      Learn more <ArrowRight size={11} />
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        </section>

        <LocalContext location={loc} />
        <NearbyLocations location={loc} serviceSlug="airport-transfer" serviceLabel="Airport Transfer" />
        <BookingCTA cityName={loc.name} serviceLabel="Transportation" />
      </PageTransition>
    </>
  )
}
