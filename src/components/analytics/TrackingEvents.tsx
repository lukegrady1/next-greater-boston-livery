'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const BOOKING_DOMAIN = 'customer.moovs.app'

export function TrackingEvents() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      if (href.startsWith('tel:')) {
        window.gtag?.('event', 'phone_call_click', {
          link_url: href,
        })
      }

      if (href.includes(BOOKING_DOMAIN)) {
        window.gtag?.('event', 'booking_button_click', {
          link_url: href,
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
