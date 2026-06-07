'use client'

import { Star } from 'lucide-react'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { reviews } from '@/data/reviews'

const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

export function ReviewsContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-navy pt-40 pb-20 section-padding">
        <RevealOnScroll>
          <h1 className="heading-display text-cream max-w-3xl">
            <span className="block">Boston Limo &amp; Car Service</span>
            <span className="block gold-gradient">Reviews</span>
          </h1>
        </RevealOnScroll>

        {/* Rating summary */}
        <RevealOnScroll delay={0.2} className="mt-10 flex items-center gap-4">
          <span className="font-display text-6xl text-gold">{avgRating}</span>
          <div>
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="font-body text-silver/50 text-sm">{reviews.length} verified reviews · sourced from Yelp &amp; direct client feedback</p>
          </div>
        </RevealOnScroll>
      </section>

      {/* Masonry Grid */}
      <section className="section-padding py-20 bg-cream">
        <StaggerChildren className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review) => (
            <StaggerItem key={review.id} className="break-inside-avoid">
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* CTA */}
      <section className="bg-navy section-padding py-20 text-center">
        <RevealOnScroll>
          <h2 className="heading-lg text-cream mb-4">Join Our Satisfied Clients</h2>
          <p className="font-body text-silver/60 mb-8 max-w-lg mx-auto">
            Experience the Greater Boston Livery difference for yourself.
          </p>
          <a href="https://customer.moovs.app/greater-boston-coach/request/new" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">Book Your First Ride</a>
        </RevealOnScroll>
      </section>
    </PageTransition>
  )
}
