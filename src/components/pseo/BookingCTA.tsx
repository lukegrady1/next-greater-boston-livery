import { ArrowRight, Phone } from 'lucide-react'
import { BOOKING_URL, PHONE_DISPLAY } from '@/utils/seo'

export function BookingCTA({ cityName, serviceLabel }: { cityName: string; serviceLabel: string }) {
  return (
    <section className="section-padding py-24 bg-cream text-center">
      <p className="label-sm mb-6">Ready to Ride?</p>
      <h2 className="heading-display mb-6 max-w-2xl mx-auto">
        Book Your {cityName} {serviceLabel}
      </h2>
      <p className="font-body text-navy/60 max-w-lg mx-auto mb-10">
        Available 24 hours a day, 7 days a week. Reservations, last-minute bookings, and corporate accounts welcome.
      </p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto justify-center"
        >
          Book a Ride <ArrowRight size={14} />
        </a>
        <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
          <Phone size={14} />
          {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  )
}
