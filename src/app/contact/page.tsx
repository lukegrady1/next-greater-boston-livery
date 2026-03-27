import type { Metadata } from 'next'
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  PHONE_DISPLAY,
  BOOKING_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { ContactContent } from './contact-content'

export const metadata: Metadata = {
  title: 'Book a Ride | Contact Greater Boston Livery | (855) 425-4661',
  description: 'Reserve your premium chauffeured ride with Greater Boston Livery. Book online instantly or call 1-855-GB-LIMO (855) 425-4661. Airport transfers, corporate travel, and weddings throughout Boston and New England.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/contact`,
    title: 'Book a Ride | Greater Boston Livery',
    description: 'Book online or call (855) 425-4661. Airport transfers, corporate travel, weddings, and special occasions — available 24/7 in Greater Boston.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  const contactLocalBusiness = schemaToString(buildLocalBusinessSchema())

  const contactPageSchema = schemaToString({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Greater Boston Livery',
    url: `${SITE_URL}/contact`,
    description: 'Book a premium chauffeured ride or contact Greater Boston Livery directly.',
    mainEntity: { '@type': 'LocalBusiness', '@id': `${SITE_URL}/#business` },
  })

  const faqSchema = schemaToString(
    buildFaqSchema([
      {
        question: 'How do I book a ride with Greater Boston Livery?',
        answer: `You can book instantly online at ${BOOKING_URL} or call us at ${PHONE_DISPLAY}. We respond to all inquiries within one hour.`,
      },
      {
        question: 'What airports does Greater Boston Livery serve?',
        answer: 'We provide meet-and-greet chauffeur service at Logan International Airport (BOS), Manchester-Boston Regional Airport (MHT), and T.F. Green Airport (PVD) in Providence.',
      },
      {
        question: 'Does Greater Boston Livery offer corporate accounts?',
        answer: 'Yes. We offer dedicated corporate accounts with monthly invoicing, priority scheduling, and a dedicated fleet for executive travel throughout New England.',
      },
      {
        question: 'How far in advance should I book a limo or chauffeured vehicle?',
        answer: 'We recommend booking 48 hours in advance for standard trips. For weddings, proms, and large group events, we recommend booking 4-6 weeks ahead to ensure vehicle availability.',
      },
      {
        question: 'Do your vehicles have WiFi?',
        answer: 'Several vehicles in our fleet include complimentary WiFi, including the Mercedes-Benz Sprinter Van and the 36 Passenger Mini Coach. WiFi availability is listed on each vehicle on our Fleet page.',
      },
      {
        question: 'How long has Greater Boston Livery been in business?',
        answer: 'Greater Boston Livery has been serving the Greater Boston area since 2013. Over that time, we\'ve built a reputation for punctuality, discretion, and genuine hospitality across thousands of rides.',
      },
    ])
  )

  const contactBreadcrumb = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Contact', href: '/contact' },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contactLocalBusiness }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contactPageSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contactBreadcrumb }} />
      <ContactContent />
    </>
  )
}
