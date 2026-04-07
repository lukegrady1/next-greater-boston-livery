'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { services } from '@/data/services'

function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div
      id={service.id}
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh] ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* Image with parallax */}
      <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
        <motion.img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-navy/30" />
      </div>

      {/* Text */}
      <div className={`bg-cream flex items-center section-padding py-20 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        <div className="max-w-lg">
          <RevealOnScroll>
            <p className="label-sm mb-4">{`0${index + 1}`}</p>
            <h2 className="heading-lg mb-6">{service.title}</h2>
            <div className="divider-gold mb-6" />
            <p className="font-body text-navy/60 leading-relaxed mb-8">{service.description}</p>

            <ul className="space-y-3 mb-10">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 font-body text-sm text-navy/80">
                  <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-gold" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={`/services/${service.id}`}
              className="btn-primary"
            >
              Learn More <ArrowRight size={14} />
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  )
}

const servicesFaqItems = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 24 hours in advance for standard trips and 2-4 weeks for weddings or large events. Same-day bookings are available subject to fleet availability — call us directly for urgent requests.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Standard reservations can be cancelled up to 24 hours in advance at no charge. Wedding and event bookings have separate cancellation terms outlined at the time of booking. Contact us for full details.',
  },
  {
    question: 'Do you serve areas outside of Boston?',
    answer: 'Yes. We serve all of Massachusetts and regularly travel to New York City, Providence, Hartford, and throughout New England. Long-distance trips are available on request.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, corporate invoicing for account holders, and cash. Payment is collected at the time of service unless you have a corporate account with monthly billing.',
  },
]

function ServicesFaqSection() {
  return (
    <section className="bg-cream section-padding py-20">
      <RevealOnScroll>
        <p className="label-sm mb-4">Common Questions</p>
        <h2 className="heading-lg mb-12">Frequently Asked Questions</h2>
      </RevealOnScroll>
      <div className="max-w-3xl space-y-0 border-t border-silver">
        {servicesFaqItems.map((faq) => (
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
  )
}

export function ServicesContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-navy pt-40 pb-20 section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=60"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <RevealOnScroll>
            <p className="label-sm mb-4 !text-cream">What We Offer</p>
            <h1 className="font-display text-lg sm:text-xl text-cream font-medium tracking-wide mb-4">
              Boston Airport Transfers, Corporate &amp; Wedding Car Service
            </h1>
            <h2 className="heading-display text-cream max-w-2xl">
              Every Journey.<br />
              <span className="gold-gradient">Executed Flawlessly.</span>
            </h2>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              From early morning airport runs to multi-day executive roadshows, we have the expertise, fleet, and professionalism to exceed expectations.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Service blocks */}
      <div className="border-t border-silver">
        {services.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </div>

      <ServicesFaqSection />

      {/* CTA */}
      <section className="bg-navy section-padding py-20 text-center">
        <RevealOnScroll>
          <h2 className="heading-lg text-cream mb-4">Ready to experience the difference?</h2>
          <p className="font-body text-silver/60 mb-8 max-w-lg mx-auto">Contact us today to discuss your transportation needs and receive a custom quote.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://customer.moovs.app/greater-boston-coach/request/new" target="_blank" rel="noopener noreferrer" className="btn-primary">Request a Quote</a>
            <a href="tel:+18554254661" className="btn-outline">(855) 425-4661</a>
          </div>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
