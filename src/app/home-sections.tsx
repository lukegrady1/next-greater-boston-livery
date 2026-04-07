'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Shield, Clock, Star, Phone, Plane, Briefcase, Heart, MapPin, ChevronDown } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { VehicleCard } from '@/components/shared/VehicleCard'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { vehicles } from '@/data/vehicles'
import { reviews } from '@/data/reviews'

const featuredVehicles = [
  vehicles.find(v => v.id === 'chrysler-300')!,
  vehicles.find(v => v.id === 'jeep-wagoneer')!,
  vehicles.find(v => v.id === 'ford-expedition')!,
]
const featuredReviews = reviews.slice(0, 3)

const coreServices = [
  { icon: Plane, title: 'Airport Transfers', desc: 'Logan, Manchester & T.F. Green with real-time flight tracking.', href: '/services/airport-transfers/' },
  { icon: Briefcase, title: 'Corporate Travel', desc: 'Executive accounts, invoicing, and on-demand fleet availability.', href: '/services/corporate-car-service/' },
  { icon: Heart, title: 'Weddings & Events', desc: 'Impeccable coordination for your most important day.', href: '/services/wedding-transportation/' },
  { icon: MapPin, title: 'Roadshows & Tours', desc: 'Full-day charters throughout New England and beyond.', href: '/services/roadshows/' },
]

const trustMarkers = [
  { icon: Shield, label: 'Fully Licensed & Insured' },
  { icon: Clock, label: '24 / 7 Availability' },
  { icon: Star, label: '5-Star Rated Service' },
  { icon: Phone, label: 'Always Reachable' },
]

function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  const taglineWords = ['Arrive.', 'Distinguished.']

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/boston.webp"
          alt="Boston city skyline at night"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            className="label-sm mb-6 !text-silver/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Greater Boston&apos;s Premier Chauffeured Service
          </motion.p>

          {/* Keyword-rich H1 — visible, styled subtler */}
          <motion.h1
            className="font-display text-lg sm:text-xl md:text-2xl text-cream/80 font-medium tracking-wide mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Boston&apos;s Premier Limo &amp; Airport Car Service
          </motion.h1>

          {/* Decorative tagline as H2 — large, dramatic */}
          <h2 aria-hidden="true" className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-none mb-4">
            {taglineWords.map((word, wi) => (
              <span key={word} className="block overflow-hidden pb-4">
                <motion.span
                  className="block"
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: '110%' }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + wi * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word === 'Distinguished.' ? (
                    <span className="gold-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subheading */}
          <motion.p
            className="font-body text-lg text-silver/70 max-w-xl leading-relaxed mt-8 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Chauffeured luxury transportation for corporate executives, weddings, and special occasions — serving Greater Boston, Cape Cod, the South Shore, North Shore, and beyond to New York City. Available 24/7/365.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              Reserve Your Ride
              <ArrowRight size={14} />
            </a>
            <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
              <Phone size={14} />
              Call (855) 425-4661
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <p className="label-sm text-silver/30">Scroll</p>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 'top' }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

const serviceAreaCities = [
  { name: 'Cambridge', slug: 'cambridge' },
  { name: 'Newton', slug: 'newton' },
  { name: 'Brookline', slug: 'brookline' },
  { name: 'Lexington', slug: 'lexington' },
  { name: 'Wellesley', slug: 'wellesley' },
  { name: 'Quincy', slug: 'quincy' },
  { name: 'Hingham', slug: 'hingham' },
  { name: 'Duxbury', slug: 'duxbury' },
]

const homepageFaqItems = [
  {
    question: 'What is a livery service?',
    answer: 'A livery service provides pre-booked, chauffeured transportation in luxury vehicles. Unlike taxis or rideshares, livery services operate on a reservation basis with professional chauffeurs, fixed pricing, and premium vehicles — ideal for airport transfers, corporate travel, and special events.',
  },
  {
    question: 'How do I book a ride to Logan Airport?',
    answer: 'You can book online through our reservation system or call us at (855) 425-4661. Provide your pickup address, flight details, and preferred vehicle. We will confirm your booking and send your chauffeur details before the trip.',
  },
  {
    question: 'What airports do you serve?',
    answer: 'We serve Logan International Airport (BOS), Manchester-Boston Regional Airport (MHT), and T.F. Green Airport (PVD). Service to other regional airports is available on request.',
  },
  {
    question: 'Is gratuity included in the fare?',
    answer: 'Gratuity is not included in the base fare. Tipping is at your discretion and can be added at the time of payment. Many corporate accounts choose to include a standard gratuity as part of their billing arrangement.',
  },
]

function ServiceAreasSection() {
  return (
    <section className="section-padding py-20 bg-navy">
      <RevealOnScroll>
        <p className="label-sm mb-4">Where We Serve</p>
        <div className="flex items-end justify-between mb-12">
          <h2 className="heading-lg text-cream max-w-md">
            We Serve These Areas
          </h2>
          <Link href="/locations/" className="btn-ghost hidden md:flex">
            All Locations <ArrowRight size={14} />
          </Link>
        </div>
      </RevealOnScroll>
      <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {serviceAreaCities.map(({ name, slug }) => (
          <StaggerItem key={slug}>
            <Link
              href={`/${slug}/`}
              className="block p-6 border border-white/10 hover:border-gold/40 transition-colors group"
            >
              <span className="font-display text-lg text-cream group-hover:text-gold transition-colors">
                {name}
              </span>
              <span className="block font-body text-xs text-silver/40 mt-1">MA</span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerChildren>
      <div className="mt-8 md:hidden">
        <Link href="/locations/" className="btn-ghost">
          All Locations <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

function HomeFaqSection() {
  return (
    <section className="section-padding py-20 bg-cream">
      <RevealOnScroll>
        <p className="label-sm mb-4">Common Questions</p>
        <h2 className="heading-lg mb-12">Frequently Asked Questions</h2>
      </RevealOnScroll>
      <div className="max-w-3xl space-y-0 border-t border-silver">
        {homepageFaqItems.map((faq) => (
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

export function HomeContent() {
  return (
    <PageTransition>
      <HeroSection />

      {/* Trust Markers */}
      <section className="bg-navy border-b border-white/5">
        <div className="section-padding py-8">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trustMarkers.map(({ icon: Icon, label }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-3">
                  <Icon size={18} className="text-gold flex-shrink-0" />
                  <span className="font-body text-sm text-silver/70">{label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Core Services */}
      <section className="section-padding py-28 bg-cream">
        <RevealOnScroll>
          <p className="label-sm mb-4">What We Offer</p>
          <div className="flex items-end justify-between mb-16">
            <h2 className="heading-lg max-w-md">
              Precision. Discretion.<br />
              <span className="gold-gradient">White-Glove Service.</span>
            </h2>
            <Link href="/services" className="btn-ghost hidden md:flex">
              All Services <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-silver">
          {coreServices.map(({ icon: Icon, title, desc, href }) => (
            <StaggerItem key={title} className="h-full">
              <Link
                href={href}
                className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
              >
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">{title}</h3>
                <p className="font-body text-sm text-navy/60 group-hover:text-silver/60 transition-colors leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                  Learn more <ArrowRight size={11} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-8 md:hidden">
          <Link href="/services" className="btn-ghost">
            All Services <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Rebrand Story */}
      <section className="bg-navy section-padding py-28 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <RevealOnScroll direction="left">
            <p className="label-sm mb-6">Our Story</p>
            <h2 className="heading-lg text-cream mb-6">
              Serving Greater Boston &amp; Beyond<br />
              <span className="gold-gradient">Since 2013</span>
            </h2>
            <div className="divider-gold mb-8" />
            <div className="space-y-4 font-body text-silver/60 leading-relaxed">
              <p>
                Greater Boston Livery was built on a straightforward belief: that chauffeured transportation should feel as seamless as it looks. Since 2013, we&apos;ve been earning that trust one ride at a time.
              </p>
              <p>
                What began as a small operation has grown into a full-service luxury fleet — professionally staffed and available around the clock — while maintaining the personal touch and attention to detail that define us.
              </p>
              <p>
                Through our vast network of global affiliates, we arrange first-class ground transportation for passengers anywhere in the world.
              </p>
              <p>
                The fleet grows. The standard doesn&apos;t change.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/team" className="btn-outline">
                Meet the Team <ArrowRight size={14} />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.2}>
            <div className="relative">
              <div className="w-full aspect-[4/5] bg-white flex items-center justify-center">
                <img
                  src="/gbl_logo.webp"
                  alt="Greater Boston Livery"
                  className="w-2/3 object-contain"
                />
              </div>
              {/* Gold accent frame */}
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-gold/20 -z-10" />
              {/* Stat callout */}
              <div className="absolute -bottom-6 -left-6 bg-gold p-6">
                <p className="font-display text-3xl text-navy font-medium">15+</p>
                <p className="font-body text-xs text-navy/80 mt-1">Years Serving Boston</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="section-padding py-28 bg-cream">
        <RevealOnScroll>
          <p className="label-sm mb-4">The Fleet</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg">
              Curated for the<br />Discerning Traveler
            </h2>
            <Link href="/fleet" className="btn-ghost hidden md:flex">
              View Full Fleet <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredVehicles.map((vehicle) => (
            <StaggerItem key={vehicle.id}>
              <Link href="/fleet" className="block">
                <VehicleCard vehicle={vehicle} />
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <RevealOnScroll className="mt-12 md:hidden">
          <Link href="/fleet" className="btn-ghost">
            View Full Fleet <ArrowRight size={14} />
          </Link>
        </RevealOnScroll>
      </section>

      {/* Testimonials */}
      <section className="section-padding py-28 bg-navy">
        <RevealOnScroll>
          <p className="label-sm mb-4">Client Testimonials</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="heading-lg text-cream">
              What Our Clients Say
            </h2>
            <Link href="/reviews" className="btn-ghost hidden md:flex">
              All Reviews <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredReviews.map((review) => (
            <StaggerItem key={review.id} className="h-full">
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      <ServiceAreasSection />

      {/* Final CTA */}
      <section className="section-padding py-24 bg-cream text-center">
        <RevealOnScroll>
          <p className="label-sm mb-6">Ready to Ride?</p>
          <h2 className="heading-display mb-6 max-w-2xl mx-auto">
            Your journey begins with a single call.
          </h2>
          <p className="font-body text-navy/60 max-w-lg mx-auto mb-10">
            Available 24 hours a day, 7 days a week. Reservations, last-minute bookings, and corporate accounts welcome.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a
              href="https://customer.moovs.app/greater-boston-coach/request/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              Book a Ride <ArrowRight size={14} />
            </a>
            <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
              <Phone size={14} />
              (855) 425-4661
            </a>
          </div>
        </RevealOnScroll>
      </section>

      <HomeFaqSection />
    </PageTransition>
  )
}
