import Link from 'next/link'
import { Plane, Briefcase, Heart, Car, ArrowRight } from 'lucide-react'
import { SERVICE_TYPES, type Location } from '@/data/locations'

const iconMap: Record<string, typeof Plane> = {
  'airport-transfer': Plane,
  'limo-service': Car,
  'corporate-car-service': Briefcase,
  'wedding-transportation': Heart,
}

export function RelatedServices({
  location,
  currentServiceSlug,
}: {
  location: Location
  currentServiceSlug: string
}) {
  const otherServices = SERVICE_TYPES.filter((s) => s.slug !== currentServiceSlug)

  return (
    <section className="section-padding py-20 bg-cream">
      <p className="label-sm mb-4">Explore More</p>
      <h2 className="heading-lg mb-12">Other Services in {location.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-silver">
        {otherServices.map((service) => {
          const Icon = iconMap[service.slug] ?? Car
          return (
            <Link
              key={service.slug}
              href={`/${location.slug}/${service.slug}/`}
              className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
            >
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                <Icon size={18} className="text-gold" />
              </div>
              <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">
                {service.label} in {location.name}
              </h3>
              <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                Learn more <ArrowRight size={11} />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
