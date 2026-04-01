import { ChevronDown } from 'lucide-react'

interface ServiceFAQProps {
  cityName: string
  serviceLabel: string
  faqs: { question: string; answer: string }[]
}

export function ServiceFAQ({ cityName, serviceLabel, faqs }: ServiceFAQProps) {
  return (
    <section className="section-padding py-20 bg-navy">
      <p className="label-sm mb-4">Common Questions</p>
      <h2 className="heading-lg text-cream mb-12 max-w-xl">
        Frequently Asked Questions —{' '}
        {cityName} {serviceLabel}
      </h2>
      <div className="max-w-3xl">
        {faqs.map((faq) => (
          <details key={faq.question} className="border-b border-white/10 last:border-b-0 group">
            <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden gap-4">
              <span className="font-display text-base text-cream">{faq.question}</span>
              <ChevronDown size={18} className="text-gold flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="font-body text-sm text-silver/60 leading-relaxed pb-5">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
