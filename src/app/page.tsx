import type { Metadata } from 'next'
import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { reviews } from '@/data/reviews'
import { HomeContent } from './home-sections'

export const metadata: Metadata = {
  title: 'Boston Limo & Airport Car Service | Greater Boston Livery',
  description: "Boston's top-rated limo & airport car service. Logan Airport transfers, corporate travel & weddings. Fixed rates, 24/7 availability. Book online or call (855) 425-4661.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Boston Limo & Airport Car Service | Greater Boston Livery',
    description: 'Premier limo and airport car service for corporate travel, weddings, and airport transfers throughout Greater Boston and New England.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    siteName: 'Greater Boston Livery',
    locale: 'en_US',
  },
}

const homepageFaqs = [
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

export default function HomePage() {
  const localBusinessSchema = schemaToString(buildLocalBusinessSchema(reviews.length))
  const webSiteSchema = schemaToString(buildWebSiteSchema())
  const breadcrumbSchema = schemaToString(buildBreadcrumbSchema([{ name: 'Home', href: '/' }]))
  const faqSchema = schemaToString(buildFaqSchema(homepageFaqs))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <HomeContent />
    </>
  )
}
