import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { NoiseOverlay } from './noise-overlay'
import { ClientProviders } from './client-providers'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Greater Boston Livery | Premium Chauffeured Transportation',
  description: 'Greater Boston Livery offers premium chauffeured transportation for corporate travel, weddings, and airport transfers throughout the New England area.',
  metadataBase: new URL('https://greaterbostonlivery.com'),
  openGraph: {
    type: 'website',
    url: 'https://greaterbostonlivery.com/',
    title: 'Greater Boston Livery | Premium Chauffeured Transportation',
    description: 'Luxury chauffeured transportation for corporate executives, weddings, and special occasions. Serving Greater Boston, Cape Cod, and New York City. Available 24/7.',
    images: [{ url: '/gbl_og.webp', width: 1200, height: 630 }],
    siteName: 'Greater Boston Livery',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greater Boston Livery | Premium Chauffeured Transportation',
    description: 'Greater Boston Livery offers premium chauffeured transportation for corporate travel, weddings, and airport transfers throughout the New England area.',
    images: ['/gbl_og.webp'],
  },
  other: {
    'geo.region': 'US-MA',
    'geo.placename': 'Boston, Massachusetts',
    'geo.position': '42.3601;-71.0589',
    'ICBM': '42.3601, -71.0589',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <div className="relative min-h-screen">
          <ScrollToTop />
          <NoiseOverlay />
          <ClientProviders />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
