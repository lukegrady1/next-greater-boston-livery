import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { locations, type Location } from '@/data/locations'

interface NearbyLocationsProps {
  location: Location
  serviceSlug: string
  serviceLabel: string
}

export function NearbyLocations({ location, serviceSlug, serviceLabel }: NearbyLocationsProps) {
  const nearbyLocations = locations.filter((l) =>
    location.nearbySlugsSameRegion.includes(l.slug)
  )

  if (nearbyLocations.length === 0) return null

  return (
    <section className="section-padding py-20 bg-navy">
      <p className="label-sm mb-4">Nearby</p>
      <h2 className="heading-lg text-cream mb-8">Also Serving Nearby Communities</h2>
      <p className="font-body text-silver/60 mb-8">
        Greater Boston Livery provides the same premium service across {location.region}:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {nearbyLocations.map((nearby) => (
          <Link
            key={nearby.slug}
            href={`/${nearby.slug}/${serviceSlug}/`}
            className="p-6 border border-white/10 hover:border-gold/40 transition-colors group"
          >
            <p className="font-display text-base text-cream group-hover:text-gold transition-colors mb-1">
              {nearby.name}
            </p>
            <p className="font-body text-xs text-silver/40">
              {serviceLabel}
            </p>
          </Link>
        ))}
      </div>
      <Link href="/locations/" className="btn-ghost">
        View All Service Areas <ArrowRight size={14} />
      </Link>
    </section>
  )
}
