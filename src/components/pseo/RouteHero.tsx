import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { BOOKING_URL, PHONE_DISPLAY } from '@/utils/seo'
import type { Location } from '@/data/locations'

interface RouteHeroProps {
  location: Location
  serviceLabel: string
  serviceSlug: string
  heading: string
  subheading: string
  heroImage: string
}

export function RouteHero({
  location,
  serviceLabel,
  serviceSlug,
  heading,
  subheading,
  heroImage,
}: RouteHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={`${serviceLabel} in ${location.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
      </div>
      <div className="relative z-10 section-padding pb-16 w-full">
        <nav className="flex items-center gap-2 mb-6 font-body text-xs text-silver/40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations/" className="hover:text-gold transition-colors">Locations</Link>
          <span>/</span>
          <Link href={`/${location.slug}/`} className="hover:text-gold transition-colors">{location.name}</Link>
          <span>/</span>
          <span className="text-silver/70">{serviceLabel}</span>
        </nav>

        <p className="label-sm mb-3">{serviceLabel}</p>
        <h1 className="heading-display text-cream max-w-2xl">{heading}</h1>
        <p className="font-body text-lg text-silver/70 max-w-xl leading-relaxed mt-6 mb-10">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto justify-center"
          >
            Book Now <ArrowRight size={14} />
          </a>
          <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}
