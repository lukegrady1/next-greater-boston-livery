import type { Metadata } from 'next'
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { services } from '@/data/services'
import { ServicesContent } from './services-content'

export const metadata: Metadata = {
  title: 'Boston Airport Transfers, Corporate & Wedding Car Service | Greater Boston Livery',
  description: 'Airport transfers to Logan, corporate car service, wedding transportation & more across Greater Boston. No surge pricing, real-time flight tracking. Book today.',
  alternates: { canonical: `${SITE_URL}/services/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/services/`,
    title: 'Boston Airport Transfers, Corporate & Wedding Car Service | Greater Boston Livery',
    description: 'Airport transfers at Logan, Manchester & T.F. Green, corporate travel, weddings, roadshows, and special occasions throughout Greater Boston and New England.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

const servicesFaqs = [
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

export default function ServicesPage() {
  const serviceListSchema = schemaToString(
    buildServiceSchema(
      services.map((s) => ({ name: s.title, description: s.description, id: s.id }))
    )
  )

  const servicesBreadcrumb = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' },
    ])
  )

  const faqSchema = schemaToString(buildFaqSchema(servicesFaqs))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceListSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesBreadcrumb }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <ServicesContent />
    </>
  )
}
