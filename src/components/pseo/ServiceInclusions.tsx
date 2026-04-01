import { Check } from 'lucide-react'

export function ServiceInclusions({ items }: { items: string[] }) {
  return (
    <section className="section-padding py-20 bg-navy">
      <div className="max-w-3xl">
        <p className="label-sm mb-4">The Standard</p>
        <h2 className="heading-lg text-cream mb-8">What&apos;s Included with Every Ride</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-sm text-silver/70">
              <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={10} className="text-gold" />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
