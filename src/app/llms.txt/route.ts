import { airports } from '@/data/airports'
import { services } from '@/data/services'
import { vehicles } from '@/data/vehicles'
import {
  BOOKING_URL,
  BUSINESS_NAME,
  EMAIL,
  FACEBOOK_URL,
  PHONE_DISPLAY,
  SITE_URL,
} from '@/utils/seo'

// /llms.txt (llmstxt.org): a plain-markdown summary of the business for AI
// assistants and AI search, built from the same data as the pages and schema.
export const dynamic = 'force-static'

const url = (path: string) => `${SITE_URL}${path}`

export function GET() {
  const lines = [
    `# ${BUSINESS_NAME}`,
    '',
    `> Chauffeured car and limo service for airport transfers, corporate travel, weddings and special occasions throughout Greater Boston and New England. Pre-booked rides with professional chauffeurs, fixed rates, available 24/7.`,
    '',
    '## Business details',
    '',
    `- Name: ${BUSINESS_NAME}`,
    `- Phone: ${PHONE_DISPLAY}`,
    `- Email: ${EMAIL}`,
    '- Hours: 24 hours a day, 7 days a week',
    '- Service area: Boston, Greater Boston, Massachusetts and New England',
    `- Book online: ${BOOKING_URL}`,
    `- Facebook: ${FACEBOOK_URL}`,
    '',
    '## Services',
    '',
    ...services.map((s) => `- [${s.title}](${url(`/services/${s.id}/`)}): ${s.description}`),
    '',
    '## Airports served',
    '',
    ...Object.values(airports).map(
      (a) => `- ${a.fullName} (${a.code}), ${a.city}: ${a.waitPolicy} ${a.terminalNote}`,
    ),
    '',
    '## Fleet',
    '',
    ...vehicles.map((v) => `- ${v.name}: up to ${v.capacity} passengers. ${v.description}`),
    '',
    '## Frequently asked questions',
    '',
    ...services.flatMap((s) =>
      (s.faqs ?? []).flatMap((f) => [`### ${f.question} (${s.title})`, '', f.answer, '']),
    ),
    '## Pages',
    '',
    `- [Home](${url('/')})`,
    `- [Services](${url('/services/')})`,
    `- [Fleet](${url('/fleet/')})`,
    `- [Reviews](${url('/reviews/')})`,
    `- [Our team](${url('/team/')})`,
    `- [Contact](${url('/contact/')})`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
