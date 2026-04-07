import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Plane, Briefcase, Heart, Car, ArrowRight, MapPin, ChevronDown, Clock } from 'lucide-react'
import {
  locations,
  getLocation,
  SERVICE_TYPES,
  RESERVED_SLUGS,
} from '@/data/locations'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
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

  const title = `Limo & Car Service ${loc.name}, MA | Greater Boston Livery`
  const description = `Premium limo & car service in ${loc.name}, MA. Airport transfers to Logan (${loc.driveTimeToLogan}), corporate transportation & wedding car service. Book online or call (855) 425-4661.`

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

  const faqSchema = loc.cityFaqs.length > 0
    ? schemaToString(buildFaqSchema(loc.cityFaqs))
    : null

  const venuesByType = {
    wedding: loc.localVenues.filter((v) => v.type === 'wedding'),
    corporate: loc.localVenues.filter((v) => v.type === 'corporate'),
    hotel: loc.localVenues.filter((v) => v.type === 'hotel'),
    event: loc.localVenues.filter((v) => v.type === 'event'),
  }

  const venueTypeLabels: Record<string, string> = {
    wedding: 'Wedding Venues',
    corporate: 'Corporate',
    hotel: 'Hotels',
    event: 'Event Venues',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      )}
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
              <p className="label-sm mb-4 !text-cream">{loc.region}</p>
              <h1 className="font-display text-lg sm:text-xl text-cream font-medium tracking-wide mb-4">
                {loc.name} Limo &amp; Car Service
              </h1>
              <h2 className="heading-display text-cream max-w-2xl">
                Premium Chauffeured Transportation in{' '}
                <span className="gold-gradient">{loc.name}</span>
              </h2>
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

        {/* Why Choose Us */}
        {loc.whyChooseUs.length > 0 && (
          <section className="section-padding py-20 bg-navy">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <p className="label-sm mb-4 !text-cream">Why Choose Us</p>
                <h2 className="heading-lg text-cream mb-6">
                  Why {loc.name} Residents Trust Greater Boston Livery
                </h2>
                <div className="divider-gold mb-8" />
                <div className="space-y-4 font-body text-silver/60 leading-relaxed">
                  {loc.whyChooseUs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </section>
        )}

        {/* Drive Time Stats */}
        <section className="bg-cream border-b border-silver">
          <div className="section-padding py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-gold flex-shrink-0" />
                <div>
                  <p className="font-display text-sm text-navy font-medium">Logan Airport (BOS)</p>
                  <p className="font-body text-xs text-navy/50">{loc.distanceToLogan} miles &middot; {loc.driveTimeToLogan}</p>
                </div>
              </div>
              {loc.distanceToMHT && (
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="font-display text-sm text-navy font-medium">Manchester-Boston (MHT)</p>
                    <p className="font-body text-xs text-navy/50">{loc.distanceToMHT} miles &middot; {loc.driveTimeToMHT}</p>
                  </div>
                </div>
              )}
              {loc.distanceToPVD && (
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="font-display text-sm text-navy font-medium">T.F. Green (PVD)</p>
                    <p className="font-body text-xs text-navy/50">{loc.distanceToPVD} miles &middot; {loc.driveTimeToPVD}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        {loc.neighborhoods.length > 0 && (
          <section className="section-padding py-16 bg-cream">
            <RevealOnScroll>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-gold" />
                <p className="label-sm">Pickup Areas</p>
              </div>
              <h2 className="heading-lg mb-8">We Pick Up Anywhere in {loc.name}</h2>
              <div className="flex flex-wrap gap-3">
                {loc.neighborhoods.map((area) => (
                  <span
                    key={area}
                    className="font-body text-sm text-navy/70 border border-silver px-4 py-2"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
          </section>
        )}

        {/* Local Venues */}
        {loc.localVenues.length > 0 && (
          <section className="section-padding py-16 bg-navy">
            <RevealOnScroll>
              <p className="label-sm mb-4 !text-cream">Local Destinations</p>
              <h2 className="heading-lg text-cream mb-8">Popular {loc.name} Destinations We Serve</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.keys(venuesByType) as Array<keyof typeof venuesByType>).map((type) => {
                  const venues = venuesByType[type]
                  if (venues.length === 0) return null
                  return (
                    <div key={type} className="border border-white/10 p-6">
                      <p className="font-display text-sm text-gold mb-3">{venueTypeLabels[type]}</p>
                      <ul className="space-y-2">
                        {venues.map((v) => (
                          <li key={v.name} className="font-body text-sm text-silver/60">{v.name}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </RevealOnScroll>
          </section>
        )}

        {/* City FAQs */}
        {loc.cityFaqs.length > 0 && (
          <section className="section-padding py-20 bg-cream">
            <RevealOnScroll>
              <p className="label-sm mb-4">Common Questions</p>
              <h2 className="heading-lg mb-12">{loc.name} Transportation FAQ</h2>
            </RevealOnScroll>
            <div className="max-w-3xl space-y-0 border-t border-silver">
              {loc.cityFaqs.map((faq) => (
                <details key={faq.question} className="group border-b border-silver">
                  <summary className="flex items-center justify-between cursor-pointer py-6 font-display text-base text-navy group-open:text-gold transition-colors">
                    {faq.question}
                    <ChevronDown size={16} className="text-navy/40 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="font-body text-sm text-navy/60 leading-relaxed pb-6 pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <LocalContext location={loc} />
        <NearbyLocations location={loc} serviceSlug="airport-transfer" serviceLabel="Airport Transfer" />
        <BookingCTA cityName={loc.name} serviceLabel="Transportation" />
      </PageTransition>
    </>
  )
}
