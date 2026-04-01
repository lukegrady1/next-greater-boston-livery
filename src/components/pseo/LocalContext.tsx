import type { Location } from '@/data/locations'

export function LocalContext({ location }: { location: Location }) {
  return (
    <section className="section-padding py-20 bg-cream">
      <div className="max-w-3xl">
        <p className="label-sm mb-4">Local Knowledge</p>
        <h2 className="heading-lg mb-6">
          Chauffeured Car Service in {location.name}
        </h2>
        <div className="divider-gold mb-8" />
        <div className="space-y-4 font-body text-navy/60 leading-relaxed">
          <p>{location.localContext}</p>
          <p>
            Whether you&apos;re departing from {location.localLandmarks[0]} or being picked up
            from anywhere in {location.county}, Greater Boston Livery provides door-to-door
            service with no hidden fees, no surge pricing, and no uncertainty.
          </p>
        </div>
      </div>
    </section>
  )
}
