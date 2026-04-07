# SEO Audit Fixes — Technical SEO & On-Page Optimization

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the highest-priority SEO issues from the April 2026 audit — URL renames, H1/title/meta rewrites, navigation updates, internal linking, and schema expansion — in a single pass across the codebase.

**Architecture:** All changes are edits to existing files. Service slugs are renamed in the data layer (`services.ts`), 301 redirects added in `next.config.ts`, H1/title/meta updated in page and content components, nav/footer updated in layout components, schema expanded in `seo.ts`, and sitemap updated to reflect new slugs.

**Tech Stack:** Next.js (App Router), TypeScript, React, Framer Motion

---

## File Map

| File | Responsibility | Change Type |
|------|---------------|-------------|
| `src/data/services.ts` | Service slug definitions | Modify: rename 3 slugs |
| `next.config.ts` | Redirects config | Modify: add `redirects()` |
| `src/app/sitemap.ts` | XML sitemap generation | Modify: update 3 service URLs |
| `src/utils/seo.ts` | Schema builders | Modify: expand ServiceArea, update ItemList URLs, add FAQ data |
| `src/app/page.tsx` | Homepage metadata + schema | Modify: title, description, FAQ schema |
| `src/app/home-sections.tsx` | Homepage content | Modify: H1/H2 rewrite, service link hrefs, new sections |
| `src/app/services/page.tsx` | Services metadata | Modify: title, description |
| `src/app/services/services-content.tsx` | Services content | Modify: H1/H2 rewrite, FAQ section |
| `src/app/fleet/page.tsx` | Fleet metadata | Modify: description |
| `src/app/fleet/fleet-content.tsx` | Fleet content | Modify: H1/H2 rewrite |
| `src/app/locations/page.tsx` | Locations content + metadata | Modify: H1/H2 rewrite, title, description |
| `src/app/reviews/page.tsx` | Reviews metadata | Modify: title |
| `src/app/[city]/page.tsx` | City hub template | Modify: H1/H2 rewrite, title, description templates |
| `src/components/layout/Navbar.tsx` | Top navigation | Modify: add Airport Transfers link |
| `src/components/layout/Footer.tsx` | Footer | Modify: update service slugs |

---

### Task 1: Rename Service Slugs in Data Layer

**Files:**
- Modify: `src/data/services.ts`

- [ ] **Step 1: Update the airport service slug**

In `src/data/services.ts`, change line 6:

```typescript
// OLD
id: 'airport',

// NEW
id: 'airport-transfers',
```

- [ ] **Step 2: Update the corporate service slug**

In `src/data/services.ts`, change line 45:

```typescript
// OLD
id: 'corporate',

// NEW
id: 'corporate-car-service',
```

- [ ] **Step 3: Update the weddings service slug**

In `src/data/services.ts`, change line 83:

```typescript
// OLD
id: 'weddings',

// NEW
id: 'wedding-transportation',
```

---

### Task 2: Add Redirects in next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add the redirects function**

Replace the entire `next.config.ts` with:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Renamed service pages (old slug -> new slug)
      {
        source: '/services/airport/',
        destination: '/services/airport-transfers/',
        permanent: true,
      },
      {
        source: '/services/corporate/',
        destination: '/services/corporate-car-service/',
        permanent: true,
      },
      {
        source: '/services/weddings/',
        destination: '/services/wedding-transportation/',
        permanent: true,
      },
      // Blog placeholder — redirect to services until blog is built
      {
        source: '/blog/',
        destination: '/services/',
        permanent: false, // temporary until blog exists
      },
    ]
  },
}

export default nextConfig
```

---

### Task 3: Update Sitemap Service URLs

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update the three service URLs in the static pages array**

In `src/app/sitemap.ts`, replace lines 14-16:

```typescript
// OLD
{ url: `${baseUrl}/services/airport/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/services/corporate/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/services/weddings/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },

// NEW
{ url: `${baseUrl}/services/airport-transfers/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/services/corporate-car-service/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
{ url: `${baseUrl}/services/wedding-transportation/`, lastModified: '2026-04-07', changeFrequency: 'monthly', priority: 0.9 },
```

---

### Task 4: Update Schema Builders (seo.ts)

**Files:**
- Modify: `src/utils/seo.ts`

- [ ] **Step 1: Expand areaServed in buildLocalBusinessSchema**

In `src/utils/seo.ts`, replace the `areaServed` array (lines 30-34) with:

```typescript
    areaServed: [
      { '@type': 'City', name: 'Boston', sameAs: 'https://en.wikipedia.org/wiki/Boston' },
      { '@type': 'City', name: 'Newton' },
      { '@type': 'City', name: 'Brookline' },
      { '@type': 'City', name: 'Cambridge' },
      { '@type': 'City', name: 'Waltham' },
      { '@type': 'City', name: 'Wellesley' },
      { '@type': 'City', name: 'Needham' },
      { '@type': 'City', name: 'Lexington' },
      { '@type': 'City', name: 'Quincy' },
      { '@type': 'City', name: 'Hingham' },
      { '@type': 'City', name: 'Plymouth' },
      { '@type': 'City', name: 'Duxbury' },
      { '@type': 'City', name: 'Marshfield' },
      { '@type': 'City', name: 'Salem' },
      { '@type': 'City', name: 'Newburyport' },
      { '@type': 'City', name: 'Gloucester' },
      { '@type': 'City', name: 'Worcester' },
      { '@type': 'City', name: 'Shrewsbury' },
      { '@type': 'City', name: 'Barnstable' },
      { '@type': 'City', name: 'Sandwich' },
      { '@type': 'City', name: 'Falmouth' },
      { '@type': 'State', name: 'Massachusetts' },
      { '@type': 'AdministrativeArea', name: 'New England' },
    ],
```

- [ ] **Step 2: Update buildServiceSchema to use new slugs as URLs**

In `src/utils/seo.ts`, replace the `itemListElement` mapping in `buildServiceSchema` (lines 109-126) with:

```typescript
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/${service.id}/`,
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${SITE_URL}/#business`,
          name: BUSINESS_NAME,
        },
        areaServed: { '@type': 'State', name: 'Massachusetts' },
        url: `${SITE_URL}/services/${service.id}/`,
      },
    })),
```

Note: The key change is `@id` and `url` now use `/services/${service.id}/` (a real page URL) instead of `/services#${service.id}` (an anchor link). Since we renamed the slugs in Task 1, `service.id` already contains the new slug values like `airport-transfers`.

---

### Task 5: Homepage — Metadata, H1/H2 Rewrite, FAQ Schema

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/home-sections.tsx`

- [ ] **Step 1: Update homepage metadata in page.tsx**

In `src/app/page.tsx`, replace the metadata export (lines 13-26) with:

```typescript
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
```

- [ ] **Step 2: Add FAQ schema to homepage page.tsx**

In `src/app/page.tsx`, add the FAQ schema import and rendering. Replace the entire file with:

```typescript
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
    question: 'Do you offer corporate accounts?',
    answer: 'Yes. We offer dedicated corporate accounts with centralized billing, monthly invoicing, priority booking, and a dedicated account manager. Contact us to set up your company account.',
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
```

- [ ] **Step 3: Rewrite homepage HeroSection H1/H2 in home-sections.tsx**

In `src/app/home-sections.tsx`, replace the entire `HeroSection` function (lines 35-146) with:

```typescript
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
```

- [ ] **Step 4: Update coreServices hrefs in home-sections.tsx**

In `src/app/home-sections.tsx`, replace the `coreServices` array (lines 21-26) with:

```typescript
const coreServices = [
  { icon: Plane, title: 'Airport Transfers', desc: 'Logan, Manchester & T.F. Green with real-time flight tracking.', href: '/services/airport-transfers/' },
  { icon: Briefcase, title: 'Corporate Travel', desc: 'Executive accounts, invoicing, and on-demand fleet availability.', href: '/services/corporate-car-service/' },
  { icon: Heart, title: 'Weddings & Events', desc: 'Impeccable coordination for your most important day.', href: '/services/wedding-transportation/' },
  { icon: MapPin, title: 'Roadshows & Tours', desc: 'Full-day charters throughout New England and beyond.', href: '/services/roadshows/' },
]
```

- [ ] **Step 5: Add "We Serve These Areas" section and FAQ section to HomeContent**

In `src/app/home-sections.tsx`, add the following two sections. Insert them inside `HomeContent` just before the final CTA section (before the `{/* Final CTA */}` comment, which is the `<section className="section-padding py-24 bg-cream text-center">` block).

Add this import at the top of the file alongside existing imports:

```typescript
import { ChevronDown } from 'lucide-react'
```

Then add these two section components before the `HomeContent` function:

```typescript
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
    question: 'Do you offer corporate accounts?',
    answer: 'Yes. We offer dedicated corporate accounts with centralized billing, monthly invoicing, priority booking, and a dedicated account manager. Contact us to set up your company account.',
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
```

Then in the `HomeContent` return, insert the two new sections before the Final CTA:

```typescript
      {/* ... existing Testimonials section ... */}

      <ServiceAreasSection />
      <HomeFaqSection />

      {/* Final CTA */}
```

---

### Task 6: Services Page — Metadata, H1/H2 Rewrite, FAQ Section

**Files:**
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/services/services-content.tsx`

- [ ] **Step 1: Update services page metadata**

In `src/app/services/page.tsx`, replace the metadata export (lines 12-23) with:

```typescript
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
```

- [ ] **Step 2: Rewrite services page H1/H2**

In `src/app/services/services-content.tsx`, replace the hero section H1 (lines 83-91) with:

```typescript
          <RevealOnScroll>
            <p className="label-sm mb-4">What We Offer</p>
            <h1 className="font-display text-lg sm:text-xl text-cream/80 font-medium tracking-wide mb-4">
              Boston Airport Transfers, Corporate &amp; Wedding Car Service
            </h1>
            <h2 className="heading-display text-cream max-w-2xl">
              Every Journey.<br />
              <span className="gold-gradient">Executed Flawlessly.</span>
            </h2>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              From early morning airport runs to multi-day executive roadshows, we have the expertise, fleet, and professionalism to exceed expectations.
            </p>
          </RevealOnScroll>
```

- [ ] **Step 3: Update service block link hrefs**

In `src/app/services/services-content.tsx`, the `ServiceBlock` component links to `/services/${service.id}` on line 58. Since we renamed the slugs in Task 1, this will automatically resolve to the new URLs. No change needed here — just verify.

- [ ] **Step 4: Add FAQ section to services page**

In `src/app/services/services-content.tsx`, add a FAQ section. Add `ChevronDown` to the lucide-react imports:

```typescript
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
```

Then add this array and component before the `ServicesContent` function:

```typescript
const servicesFaqItems = [
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

function ServicesFaqSection() {
  return (
    <section className="bg-cream section-padding py-20">
      <RevealOnScroll>
        <p className="label-sm mb-4">Common Questions</p>
        <h2 className="heading-lg mb-12">Frequently Asked Questions</h2>
      </RevealOnScroll>
      <div className="max-w-3xl space-y-0 border-t border-silver">
        {servicesFaqItems.map((faq) => (
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
```

Then insert `<ServicesFaqSection />` in the `ServicesContent` return, between the service blocks div and the CTA section:

```typescript
      {/* Service blocks */}
      <div className="border-t border-silver">
        {services.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </div>

      <ServicesFaqSection />

      {/* CTA */}
```

- [ ] **Step 5: Add FAQ schema to services page.tsx**

In `src/app/services/page.tsx`, add the FAQ schema. Update imports to include `buildFaqSchema`:

```typescript
import {
  buildServiceSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
```

Add the FAQ data and schema script. Replace the `ServicesPage` component with:

```typescript
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
```

---

### Task 7: Fleet Page — Meta Description, H1/H2 Rewrite

**Files:**
- Modify: `src/app/fleet/page.tsx`
- Modify: `src/app/fleet/fleet-content.tsx`

- [ ] **Step 1: Update fleet page meta description**

In `src/app/fleet/page.tsx`, replace the `description` in metadata (line 13) with:

```typescript
  description: "Browse our luxury fleet: executive sedans, SUVs, Mercedes Sprinters, stretch limos & motor coaches. Available 24/7 for Boston airport transfers, corporate & events.",
```

- [ ] **Step 2: Rewrite fleet page H1/H2**

In `src/app/fleet/fleet-content.tsx`, replace the hero section heading area (lines 148-155) with:

```typescript
          <RevealOnScroll>
            <p className="label-sm mb-4">The Fleet</p>
            <h1 className="font-display text-lg sm:text-xl text-cream/80 font-medium tracking-wide mb-4">
              Luxury Fleet: Sedans, SUVs, Sprinters &amp; Limos in Boston
            </h1>
            <h2 className="heading-display text-cream max-w-2xl">
              Vehicles Worthy of<br />
              <span className="gold-gradient">Your Journey</span>
            </h2>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              From executive sedans to 55-passenger motor coaches, our diverse fleet is meticulously maintained and ready for any occasion.
            </p>
          </RevealOnScroll>
```

---

### Task 8: Locations Hub — Metadata, H1/H2 Rewrite

**Files:**
- Modify: `src/app/locations/page.tsx`

- [ ] **Step 1: Update locations page metadata**

In `src/app/locations/page.tsx`, replace the metadata export (lines 14-25) with:

```typescript
export const metadata: Metadata = {
  title: 'Boston Limo & Car Service Areas | Greater Boston Livery',
  description: 'Greater Boston Livery serves 20+ cities across Massachusetts — from Cambridge to Cape Cod. Airport transfers, limo service, corporate & wedding transportation.',
  alternates: { canonical: `${SITE_URL}/locations/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/locations/`,
    title: 'Boston Limo & Car Service Areas | Greater Boston Livery',
    description: 'Browse all service areas for premium chauffeured transportation throughout Massachusetts.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}
```

- [ ] **Step 2: Rewrite locations page H1/H2**

In `src/app/locations/page.tsx`, replace the hero section heading (lines 44-53) with:

```typescript
          <RevealOnScroll>
            <p className="label-sm mb-4">Where We Serve</p>
            <h1 className="font-display text-lg sm:text-xl text-cream/80 font-medium tracking-wide mb-4">
              Boston Limo &amp; Car Service Areas Across Massachusetts
            </h1>
            <h2 className="heading-display text-cream max-w-2xl">
              Greater Boston Livery —{' '}
              <span className="gold-gradient">Service Areas</span>
            </h2>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              Premium chauffeured transportation serving Greater Boston, the South Shore,
              North Shore, Cape Cod, Central Massachusetts, and beyond. Select your city below
              to see available services, drive times, and booking options.
            </p>
          </RevealOnScroll>
```

---

### Task 9: Reviews Page — Title Tag Update

**Files:**
- Modify: `src/app/reviews/page.tsx`

- [ ] **Step 1: Update reviews page title**

In `src/app/reviews/page.tsx`, replace the title in metadata (line 26) with:

```typescript
  title: 'Customer Reviews | Boston Limo Service | Greater Boston Livery',
```

Also update the description for better CTR:

```typescript
  description: "See why Boston professionals trust Greater Boston Livery. Read verified client reviews for airport transfers, corporate car service & wedding transportation.",
```

---

### Task 10: City Hub Pages — H1/H2, Title, Meta Templates

**Files:**
- Modify: `src/app/[city]/page.tsx`

- [ ] **Step 1: Update generateMetadata title and description templates**

In `src/app/[city]/page.tsx`, replace the title and description variables inside `generateMetadata` (lines 54-55) with:

```typescript
  const title = `Limo & Car Service ${loc.name}, MA | Greater Boston Livery`
  const description = `Premium limo & car service in ${loc.name}, MA. Airport transfers to Logan (${loc.driveTimeToLogan}), corporate transportation & wedding car service. Book online or call (855) 425-4661.`
```

- [ ] **Step 2: Rewrite city hub page H1/H2**

In `src/app/[city]/page.tsx`, replace the hero section heading (lines 103-113) with:

```typescript
              <p className="label-sm mb-4">{loc.region}</p>
              <h1 className="font-display text-lg sm:text-xl text-cream/80 font-medium tracking-wide mb-4">
                {loc.name} Limo &amp; Car Service
              </h1>
              <h2 className="heading-display text-cream max-w-2xl">
                Premium Chauffeured Transportation in{' '}
                <span className="gold-gradient">{loc.name}</span>
              </h2>
              <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
                Greater Boston Livery provides premium chauffeured transportation throughout{' '}
                {loc.name} and {loc.county}. From Logan Airport transfers to corporate travel,
                weddings, and special occasions — available 24/7.
              </p>
```

---

### Task 11: Navigation — Add Airport Transfers Link

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add Airport Transfers to navLinks array**

In `src/components/layout/Navbar.tsx`, replace the `navLinks` array (lines 11-17) with:

```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/airport-transfers/', label: 'Airport Transfers' },
  { href: '/fleet/', label: 'Fleet' },
  { href: '/services/', label: 'Services' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/contact/', label: 'Contact' },
]
```

Note: All hrefs now include trailing slashes to match `trailingSlash: true` config. The active link detection uses `pathname === link.href`, so trailing slashes must be consistent.

- [ ] **Step 2: Update active link detection for trailing slash consistency**

The current active state check on line 69 is:
```typescript
pathname === link.href
```

Since Next.js with `trailingSlash: true` renders pathnames with trailing slashes, and we've now added trailing slashes to all hrefs, this should work correctly. Verify the `pathname` value includes a trailing slash at runtime.

---

### Task 12: Footer — Update Service Slugs

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update footer service link slugs**

In `src/components/layout/Footer.tsx`, replace the services array (lines 64-69) with:

```typescript
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
```

Note: The footer already has a "Service Areas" link to `/locations/` (line 78), so no additional footer changes needed.

Also update the fleet links to use trailing slashes. Replace line 91:

```typescript
                  <Link href="/fleet/" className="font-body text-sm text-silver/70 hover:text-gold transition-colors">
```

---

### Task 13: Build Verification

- [ ] **Step 1: Run the build**

Run: `npm run build`

Expected: Build succeeds with no errors. All static pages generate correctly with the new slugs.

- [ ] **Step 2: Verify redirects are present in build output**

After build, check that the redirect config is picked up. The terminal output should show the redirects during build, or verify by running `npm run dev` and testing:
- `http://localhost:3000/services/airport/` → redirects to `/services/airport-transfers/`
- `http://localhost:3000/services/corporate/` → redirects to `/services/corporate-car-service/`
- `http://localhost:3000/services/weddings/` → redirects to `/services/wedding-transportation/`
- `http://localhost:3000/blog/` → redirects to `/services/`

- [ ] **Step 3: Spot-check key pages**

Visit these pages in `npm run dev` and verify:
- Homepage: keyword H1 visible above "Arrive. Distinguished.", FAQ section renders, city links section renders
- `/services/`: keyword H1 visible above "Every Journey. Executed Flawlessly.", FAQ section renders
- `/fleet/`: keyword H1 visible above "Vehicles Worthy of Your Journey"
- `/locations/`: keyword H1 visible above "Service Areas"
- `/newton/`: H1 says "Newton Limo & Car Service", H2 says "Premium Chauffeured Transportation in Newton"
- `/services/airport-transfers/`: page loads correctly
- Navigation shows "Airport Transfers" link
- View page source on homepage: verify FAQ schema JSON-LD is present, LocalBusiness schema has all 20 cities in areaServed
