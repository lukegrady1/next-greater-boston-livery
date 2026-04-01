import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Location } from '@/data/locations'

export function FleetSuggestion({ location }: { location: Location }) {
  return (
    <section className="section-padding py-20 bg-cream">
      <div className="max-w-3xl">
        <p className="label-sm mb-4">The Fleet</p>
        <h2 className="heading-lg mb-6">Recommended Vehicles from {location.name}</h2>
        <div className="divider-gold mb-8" />
        <p className="font-body text-navy/60 leading-relaxed mb-8">
          For most {location.name} trips, we recommend the{' '}
          {location.recommendedVehicles.slice(0, 2).join(' or ')} —
          ideal for {location.popularUseCase}. For groups, our{' '}
          {location.recommendedVehicles[2] ?? 'Executive SUV'} accommodates up to 7 passengers
          with luggage.
        </p>
        <Link href="/fleet/" className="btn-ghost">
          View the Full Fleet <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
