'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { useEffect, useState } from 'react'

function BostonClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
      <span className="font-body text-xs text-silver/70 tracking-widest uppercase">
        Boston Local Time
      </span>
      <span className="font-body text-xs text-gold font-medium">{time}</span>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/5">
      <div className="section-padding pt-10 pb-6 lg:pt-20 lg:pb-10">
        {/* Top grid — centered & compact on mobile, 4-column left-aligned on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-12 mb-8 lg:mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Logo on a light badge for contrast against the dark footer — replaces the text wordmark */}
            <Link href="/" className="inline-flex bg-white rounded-md px-3 py-2 lg:px-4 lg:py-3 mb-4 lg:mb-5">
              <img
                src="/gbl_logo.webp"
                alt="Greater Boston Livery"
                width={243}
                height={134}
                className="h-16 lg:h-28 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-sm text-silver/70 leading-relaxed mb-6 hidden lg:block">
              Premium chauffeured transportation serving Greater Boston, Cape Cod, South Shore, North Shore, and New York City. Available 24/7/365.
            </p>
            {/* Contact — surfaced directly under the logo on mobile (highest-value), part of the Contact column on desktop */}
            <div className="flex flex-col items-center gap-2 lg:hidden">
              <a href="tel:+18554254661" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
                <Phone size={15} className="text-gold" />
                <span className="font-body text-base font-medium">(855) 425-4661</span>
              </a>
              <a href="mailto:info@greaterbostonlivery.com" className="flex items-center gap-2 text-silver/70 hover:text-gold transition-colors">
                <Mail size={14} className="text-gold" />
                <span className="font-body text-sm">info@greaterbostonlivery.com</span>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.facebook.com/GreaterBostonLivery/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 border border-white/10 text-silver/60 hover:text-gold hover:border-gold transition-colors">
                <Facebook size={14} />
              </a>
              <a href="https://www.instagram.com/greaterbostonlivery" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 border border-white/10 text-silver/60 hover:text-gold hover:border-gold transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="text-center lg:text-left">
            <p className="label-sm mb-4 lg:mb-6">Services</p>
            <ul className="space-y-3">
              {[
                { label: 'Airport Transfers', slug: 'airport-transfers' },
                { label: 'Corporate Travel', slug: 'corporate-car-service' },
                { label: 'Weddings & Events', slug: 'wedding-transportation' },
                { label: 'Roadshows & Tours', slug: 'roadshows' },
                { label: 'Special Occasions', slug: 'nightlife' },
              ].map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`} className="font-body text-sm text-silver/70 hover:text-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet — real categories that pre-select the filter on the fleet page */}
          <div className="text-center lg:text-left">
            <p className="label-sm mb-4 lg:mb-6">Our Fleet</p>
            <ul className="space-y-3">
              {[
                { label: 'Sedans', href: '/fleet/?category=sedan' },
                { label: 'SUVs', href: '/fleet/?category=suv' },
                { label: 'Vans', href: '/fleet/?category=van' },
                { label: 'Limousines', href: '/fleet/?category=limo' },
                { label: 'View All Vehicles', href: '/fleet/' },
              ].map((v) => (
                <li key={v.label}>
                  <Link href={v.href} className="font-body text-sm text-silver/70 hover:text-gold transition-colors">
                    {v.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full detail on desktop; phone/email already surfaced under the logo on mobile */}
          <div className="hidden lg:block">
            <p className="label-sm mb-4 lg:mb-6">Contact</p>
            <ul className="space-y-4">
              <li>
                <a href="tel:+18554254661" className="flex items-start gap-3 text-silver/70 hover:text-gold transition-colors group">
                  <Phone size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="font-body text-sm">(855) 425-4661</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@greaterbostonlivery.com" className="flex items-start gap-3 text-silver/70 hover:text-gold transition-colors group">
                  <Mail size={14} className="mt-0.5 flex-shrink-0 group-hover:text-gold" />
                  <span className="font-body text-sm">info@greaterbostonlivery.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-silver/70">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm">Serving Greater Boston<br />& All of New England</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — centered on mobile, spread on desktop */}
        <div className="border-t border-white/5 pt-5 lg:pt-8 flex flex-col md:flex-row items-center md:items-center justify-between gap-2 md:gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-body text-xs text-silver/50">
              © {new Date().getFullYear()} Greater Boston Livery. All rights reserved.
            </p>
            <p className="font-body text-xs text-silver/40">
              Designed & built by{' '}
              <a
                href="https://gradydigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                Grady Digital
              </a>
            </p>
          </div>

          {/* Local time widget hidden on small screens to keep the mobile footer short */}
          <div className="hidden md:block">
            <BostonClock />
          </div>
        </div>
      </div>
    </footer>
  )
}
