import { Shield, Clock, Star, Phone } from 'lucide-react'

const items = [
  { icon: Shield, label: 'Fully Licensed & Insured' },
  { icon: Clock, label: '24 / 7 Availability' },
  { icon: Star, label: '5-Star Rated Service' },
  { icon: Phone, label: 'Always Reachable' },
]

export function TrustBar() {
  return (
    <section className="bg-navy border-b border-white/5">
      <div className="section-padding py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-gold flex-shrink-0" />
              <span className="font-body text-sm text-silver/70">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
