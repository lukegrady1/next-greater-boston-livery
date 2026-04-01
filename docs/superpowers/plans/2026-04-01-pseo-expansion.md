# pSEO Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate 101 location-specific pages (20 cities x 4 services + 20 city hubs + 1 locations hub) that rank for long-tail chauffeured transportation queries across Greater Boston.

**Architecture:** Data-driven static generation using `generateStaticParams`. All city data lives in `src/data/locations.ts`, all page rendering uses shared server components from `src/components/pseo/`. Pages are composed from reusable section components following the existing GBL design system.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion (via existing wrapper components), JSON-LD structured data.

---

## File Structure

```
src/data/locations.ts              — Location type + 20 city entries + service type metadata
src/data/airports.ts               — Airport data for Logan, MHT, PVD
src/data/reviews.ts                — (modify) Add getReviewsForService() helper
src/components/pseo/TrustBar.tsx   — Trust markers strip
src/components/pseo/RouteHero.tsx  — Hero section with breadcrumb + h1 + CTAs
src/components/pseo/RouteStats.tsx — Stat cards grid (distance, drive time, etc.)
src/components/pseo/LocalContext.tsx — City-specific narrative
src/components/pseo/ServiceInclusions.tsx — "What's Included" checklist
src/components/pseo/FleetSuggestion.tsx — Recommended vehicles
src/components/pseo/ServiceFAQ.tsx — FAQ with details/summary + JSON-LD
src/components/pseo/NearbyLocations.tsx — Internal links to nearby cities
src/components/pseo/RelatedServices.tsx — Cross-links to other service types
src/components/pseo/BookingCTA.tsx — Final CTA section
src/app/locations/page.tsx         — Locations hub page
src/app/[city]/page.tsx            — City hub template
src/app/[city]/[service]/page.tsx  — Service page template
src/app/sitemap.ts                 — (modify) Add pSEO URLs
src/components/layout/Footer.tsx   — (modify) Add Service Areas link
```

---

### Task 1: Data Layer — Locations and Airports

**Files:**
- Create: `src/data/locations.ts`
- Create: `src/data/airports.ts`

- [ ] **Step 1: Create `src/data/airports.ts`**

```typescript
export const airports = {
  logan: {
    code: 'BOS',
    name: 'Logan International Airport',
    fullName: 'Boston Logan International Airport',
    city: 'East Boston, MA',
    terminalNote: 'Chauffeur meets you inside the terminal with a name sign.',
    waitPolicy: 'Complimentary 60-minute wait from wheels-down.',
    parkingAvoidance: 'Avoid the $40–$60/day Logan garage fees — GBL drops you at the door.',
  },
  manchester: {
    code: 'MHT',
    name: 'Manchester-Boston Regional Airport',
    fullName: 'Manchester-Boston Regional Airport',
    city: 'Manchester, NH',
    terminalNote: 'MHT is significantly less congested than Logan — faster curbside pickup.',
    waitPolicy: 'Complimentary 45-minute wait from wheels-down.',
    parkingAvoidance: 'Manchester offers lower fares on select routes — GBL gets you there comfortably.',
  },
  providence: {
    code: 'PVD',
    name: 'T.F. Green Airport',
    fullName: 'Rhode Island T.F. Green International Airport',
    city: 'Warwick, RI',
    terminalNote: 'T.F. Green is a streamlined, no-hassle alternative to Logan for South Shore and Cape Cod travelers.',
    waitPolicy: 'Complimentary 45-minute wait from wheels-down.',
    parkingAvoidance: 'Avoid Providence\'s limited and expensive airport parking — arrive relaxed.',
  },
} as const

export type AirportKey = keyof typeof airports
```

- [ ] **Step 2: Create `src/data/locations.ts`**

This file contains the `Location` type, the `RESERVED_SLUGS` array, the `SERVICE_TYPES` metadata, and all 20 city entries. The city data is transcribed exactly from CLAUDE.md.

```typescript
export type Location = {
  slug: string
  name: string
  county: string
  state: string
  region: string
  distanceToLogan: number
  driveTimeToLogan: string
  distanceToMHT?: number
  driveTimeToMHT?: string
  distanceToPVD?: number
  driveTimeToPVD?: string
  localLandmarks: string[]
  localContext: string
  nearbySlugsSameRegion: string[]
  recommendedVehicles: string[]
  popularUseCase: string
}

export const RESERVED_SLUGS = [
  'fleet', 'services', 'contact', 'team', 'reviews',
  'locations', 'robots.txt', 'sitemap.xml', '_not-found',
]

export type ServiceType = {
  slug: string
  label: string
  titleTemplate: (cityName: string) => string
  descriptionTemplate: (loc: Location) => string
  heroImage: string
  inclusions: string[]
  faqGenerator: (loc: Location) => { question: string; answer: string }[]
}

export const SERVICE_TYPES: ServiceType[] = [
  {
    slug: 'airport-transfer',
    label: 'Airport Transfer',
    titleTemplate: (city) => `${city} to Logan Airport Car Service | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Premium chauffeured transportation from ${loc.name} to Logan Airport. ${loc.driveTimeToLogan} drive, 24/7 availability, real-time flight tracking. No surge pricing. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80',
    inclusions: [
      'Real-time flight tracking — we know before you do if your gate changes',
      'Complimentary 60-minute wait from wheels-down at Logan',
      'Meet & greet inside the terminal with a name sign',
      'Luggage assistance',
      'Fixed rates — no surge pricing, ever',
      '24/7/365 availability including holidays',
    ],
    faqGenerator: (loc) => [
      {
        question: `How far is ${loc.name} from Logan Airport?`,
        answer: `${loc.name} is approximately ${loc.distanceToLogan} miles from Logan International Airport, with a typical drive time of ${loc.driveTimeToLogan} depending on traffic. GBL monitors conditions and adjusts pickup times accordingly.`,
      },
      {
        question: 'What happens if my flight is delayed?',
        answer: 'We track every flight in real time. Your chauffeur adjusts automatically — there is never a penalty charge for delays.',
      },
      {
        question: 'Is there a fee for early morning or late night pickups?',
        answer: 'No. Greater Boston Livery is available 24/7/365 at the same professional standard, including holidays, early mornings, and late-night arrivals.',
      },
      {
        question: `Do you serve other airports from ${loc.name}?`,
        answer: `Yes. In addition to Logan, we serve Manchester-Boston Regional (MHT)${loc.distanceToMHT ? ` (~${loc.driveTimeToMHT} from ${loc.name})` : ''} and T.F. Green (PVD)${loc.distanceToPVD ? ` (~${loc.driveTimeToPVD})` : ''}. Let us know your preference when booking.`,
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661. Corporate accounts with invoicing are available.',
      },
    ],
  },
  {
    slug: 'limo-service',
    label: 'Limo Service',
    titleTemplate: (city) => `Limo Service ${city} MA | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Premium limousine service in ${loc.name}, ${loc.state}. Luxury sedans, SUVs, stretch limos, and party buses. Available 24/7 for any occasion. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0b76?w=1400&q=80',
    inclusions: [
      'Luxury sedans, SUVs, stretch limousines, and party buses',
      'Professional, suited chauffeurs',
      'Red carpet service available on request',
      'Complimentary bottled water and amenities',
      'Flexible hourly and point-to-point rates',
      '24/7/365 availability',
    ],
    faqGenerator: (loc) => [
      {
        question: `What types of limos are available in ${loc.name}?`,
        answer: `Greater Boston Livery offers luxury sedans (Chrysler 300, Volvo S90), executive SUVs (Jeep Wagoneer L, GMC Yukon), a 10-passenger stretch limousine, and party buses. All are available for pickup in ${loc.name} and throughout ${loc.county}.`,
      },
      {
        question: 'Can I book a limo for just a few hours?',
        answer: 'Yes. We offer both hourly charters and point-to-point service. Hourly bookings are ideal for nights out, wine tours, and events where your schedule may flex.',
      },
      {
        question: `How far in advance should I book a limo in ${loc.name}?`,
        answer: 'We recommend booking 48 hours in advance for standard trips. For proms, weddings, and large group events, book 4-6 weeks ahead to ensure your preferred vehicle is available.',
      },
      {
        question: 'Is alcohol allowed in the vehicles?',
        answer: 'Several vehicles in our fleet are alcohol-friendly, including the stretch limousine and party buses. Let us know your needs when booking and we\'ll recommend the right vehicle.',
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661. Corporate accounts with invoicing are available.',
      },
    ],
  },
  {
    slug: 'corporate-car-service',
    label: 'Corporate Car Service',
    titleTemplate: (city) => `Corporate Car Service ${city} MA | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Executive chauffeured transportation in ${loc.name}, ${loc.state}. Corporate accounts, monthly invoicing, on-demand fleet. Serving ${loc.popularUseCase}. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    inclusions: [
      'Dedicated corporate accounts with monthly invoicing',
      'Priority scheduling and on-demand availability',
      'Professional, suited chauffeurs trained in executive protocol',
      'WiFi-equipped vehicles available',
      'Discreet, confidential service',
      'Multi-stop itineraries and roadshow coordination',
    ],
    faqGenerator: (loc) => [
      {
        question: `Does Greater Boston Livery offer corporate accounts in ${loc.name}?`,
        answer: `Yes. We provide dedicated corporate accounts for businesses in ${loc.name} and throughout ${loc.county}. Accounts include monthly invoicing, priority scheduling, and a dedicated fleet.`,
      },
      {
        question: 'Can I set up recurring rides for my team?',
        answer: 'Absolutely. Many of our corporate clients schedule recurring airport runs, office commutes, and client pickups. We handle all the logistics so your team can focus on work.',
      },
      {
        question: 'Do your vehicles have WiFi?',
        answer: 'Several vehicles in our fleet include complimentary WiFi, including the Mercedes-Benz Sprinter Van and the 36 Passenger Mini Coach. WiFi availability is listed on each vehicle on our Fleet page.',
      },
      {
        question: 'What is your cancellation policy for corporate rides?',
        answer: 'We understand business plans change. Corporate accounts enjoy flexible cancellation terms — contact your account representative for details.',
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661. Corporate accounts with invoicing are available.',
      },
    ],
  },
  {
    slug: 'wedding-transportation',
    label: 'Wedding Transportation',
    titleTemplate: (city) => `Wedding Transportation ${city} MA | Greater Boston Livery`,
    descriptionTemplate: (loc) =>
      `Wedding car service in ${loc.name}, ${loc.state}. Luxury sedans, SUVs, stretch limos, and party buses for your entire wedding party. Impeccable coordination. Book online or call (855) 425-4661.`,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
    inclusions: [
      'Full wedding party coordination — multiple vehicles, multiple stops',
      'Luxury stretch limousine, party bus, and sedan options',
      'Impeccably dressed, professional chauffeurs',
      'Red carpet service and "Just Married" signage available',
      'Complimentary champagne toast setup',
      'Rehearsal dinner and morning-after transportation',
    ],
    faqGenerator: (loc) => [
      {
        question: `What wedding vehicles are available in ${loc.name}?`,
        answer: `For weddings in ${loc.name}, our most popular choices are the 10 Passenger White Stretch Limousine for the bridal party, the 26 Passenger Party Bus for larger groups, and luxury sedans for VIP guests and family. All vehicles are meticulously detailed for your big day.`,
      },
      {
        question: 'Can you coordinate transportation for the entire wedding party?',
        answer: 'Yes — that\'s our specialty. We coordinate multiple vehicles, multiple pickup locations, and precise timing for ceremonies, receptions, and after-parties. Your wedding coordinator will have a single point of contact at GBL.',
      },
      {
        question: 'How far in advance should I book wedding transportation?',
        answer: 'We recommend booking 4-6 weeks in advance to ensure your preferred vehicles are available. Peak wedding season (May-October) books quickly, so earlier is better.',
      },
      {
        question: 'Do you provide transportation for rehearsal dinners?',
        answer: 'Absolutely. Many couples book us for the rehearsal dinner, wedding day, and morning-after brunch transportation. We offer package rates for multi-event bookings.',
      },
      {
        question: 'How do I book?',
        answer: 'Book instantly online via our reservation system, or call us at (855) 425-4661 to discuss your wedding transportation needs.',
      },
    ],
  },
]

export const VALID_SERVICE_SLUGS = SERVICE_TYPES.map((s) => s.slug)

export function getServiceType(slug: string): ServiceType | undefined {
  return SERVICE_TYPES.find((s) => s.slug === slug)
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}

export const locations: Location[] = [
  // ── GREATER BOSTON ──
  {
    slug: 'newton',
    name: 'Newton',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 14,
    driveTimeToLogan: '~25 min',
    distanceToMHT: 58,
    driveTimeToMHT: '~55 min',
    localLandmarks: ['Newton Centre', 'Chestnut Hill', 'Boston College', 'Heartbreak Hill'],
    localContext: "Newton is one of Greater Boston's most affluent suburbs, home to corporate executives, medical professionals, and BC faculty who regularly travel through Logan. Its proximity to the Mass Pike makes it one of GBL's most-requested pickup locations.",
    nearbySlugsSameRegion: ['brookline', 'waltham', 'needham', 'wellesley'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Jeep Wagoneer L'],
    popularUseCase: 'corporate executives and medical professionals commuting to Logan',
  },
  {
    slug: 'brookline',
    name: 'Brookline',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 7,
    driveTimeToLogan: '~15 min',
    localLandmarks: ['Coolidge Corner', 'Brookline Village', 'Longwood Medical Area', 'The Country Club'],
    localContext: "Brookline sits just minutes from Logan and borders Boston directly, making it one of the fastest airport runs in the GBL service area. The Longwood Medical Area draws frequent corporate and medical travelers who rely on punctual, professional transportation.",
    nearbySlugsSameRegion: ['newton', 'cambridge', 'quincy'],
    recommendedVehicles: ['Chrysler 300', 'Black Sedan', 'Volvo S90'],
    popularUseCase: 'medical professionals and Longwood campus travelers',
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 5,
    driveTimeToLogan: '~15 min',
    localLandmarks: ['Harvard University', 'MIT', 'Kendall Square', 'Harvard Square'],
    localContext: "Cambridge is home to Harvard, MIT, and one of the most active biotech corridors in the world. Kendall Square executives and university guests require discreet, premium transportation for both domestic and international flights out of Logan.",
    nearbySlugsSameRegion: ['brookline', 'newton', 'waltham'],
    recommendedVehicles: ['Volvo S90', 'Chrysler 300', 'Black SUV'],
    popularUseCase: 'biotech executives, university guests, and conference travelers',
  },
  {
    slug: 'waltham',
    name: 'Waltham',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 16,
    driveTimeToLogan: '~28 min',
    localLandmarks: ['Brandeis University', 'Waltham Watch Factory', 'Route 128 Tech Corridor', 'Gore Place'],
    localContext: "Waltham sits at the heart of the Route 128 technology corridor, hosting headquarters for dozens of major corporations. Corporate travel demand is high year-round, with executives frequently traveling through Logan for business across the country.",
    nearbySlugsSameRegion: ['newton', 'lexington', 'cambridge'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'GMC Yukon'],
    popularUseCase: 'Route 128 tech corridor corporate travel',
  },
  {
    slug: 'wellesley',
    name: 'Wellesley',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 18,
    driveTimeToLogan: '~30 min',
    localLandmarks: ['Wellesley College', 'Babson College', 'Lake Waban', 'Wellesley Hills'],
    localContext: "Wellesley is one of Greater Boston's premier residential communities, with a strong demand for luxury airport transfers, wedding transportation, and special occasion rides. Wellesley College and Babson College also generate consistent group transportation needs.",
    nearbySlugsSameRegion: ['needham', 'newton', 'waltham'],
    recommendedVehicles: ['Chrysler 300', 'Jeep Wagoneer L', '10 Passenger White Stretch Limousine'],
    popularUseCase: 'luxury airport transfers and wedding transportation',
  },
  {
    slug: 'needham',
    name: 'Needham',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 16,
    driveTimeToLogan: '~28 min',
    localLandmarks: ['Needham Town Center', 'Charles River', 'Cutler Park', 'Highland Avenue'],
    localContext: "Needham is a sought-after suburb combining quiet residential neighborhoods with easy highway access. Residents frequently commute through Logan for work and leisure, and GBL provides the seamless door-to-door service they expect.",
    nearbySlugsSameRegion: ['wellesley', 'newton', 'brookline'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Black Sedan'],
    popularUseCase: 'frequent business travelers and airport transfers',
  },
  {
    slug: 'lexington',
    name: 'Lexington',
    county: 'Middlesex County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 18,
    driveTimeToLogan: '~32 min',
    localLandmarks: ['Lexington Battle Green', 'Minute Man National Historical Park', 'Hartwell Avenue Tech Campus'],
    localContext: "Lexington blends its historic identity with a thriving tech presence along Hartwell Avenue. The town's affluent professional community generates steady demand for premium airport transfers and corporate ground transportation.",
    nearbySlugsSameRegion: ['waltham', 'cambridge', 'newton'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'GMC Yukon'],
    popularUseCase: 'Hartwell Avenue tech professionals and business travelers',
  },
  {
    slug: 'quincy',
    name: 'Quincy',
    county: 'Norfolk County',
    state: 'MA',
    region: 'Greater Boston',
    distanceToLogan: 8,
    driveTimeToLogan: '~18 min',
    localLandmarks: ['Adams National Historical Park', 'Quincy Center', 'Wollaston Beach', 'South Shore Plaza'],
    localContext: "As the birthplace of two U.S. presidents, Quincy combines rich heritage with a modern urban core just minutes from Logan. Its proximity to the airport and direct highway access make it one of GBL's fastest and most reliable pickup locations on the South Shore.",
    nearbySlugsSameRegion: ['brookline', 'needham', 'wellesley'],
    recommendedVehicles: ['Chrysler 300', 'Black Sedan', 'Black SUV'],
    popularUseCase: 'airport transfers for South Shore commuters and business travelers',
  },
  // ── SOUTH SHORE ──
  {
    slug: 'hingham',
    name: 'Hingham',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 22,
    driveTimeToLogan: '~35 min',
    distanceToPVD: 52,
    driveTimeToPVD: '~50 min',
    localLandmarks: ['Hingham Harbor', "World's End", 'South Shore Country Club', 'Derby Street Shops'],
    localContext: "Hingham is one of the South Shore's most prestigious communities, with waterfront estates, a vibrant harbor, and a high concentration of Boston commuters. GBL is the transportation partner of choice for Hingham's professional and social set.",
    nearbySlugsSameRegion: ['marshfield', 'plymouth', 'duxbury'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Jeep Wagoneer L'],
    popularUseCase: 'executive airport transfers and special occasion transportation',
  },
  {
    slug: 'plymouth',
    name: 'Plymouth',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 42,
    driveTimeToLogan: '~45 min',
    distanceToPVD: 44,
    driveTimeToPVD: '~45 min',
    localLandmarks: ['Plymouth Rock', 'Plimoth Patuxent', 'Plymouth Harbor', 'Pilgrim Memorial State Park'],
    localContext: "Plymouth is a major destination for both tourists and year-round residents who travel regularly through Logan and T.F. Green. The town's mix of history, waterfront dining, and residential neighborhoods makes it a key anchor in GBL's South Shore coverage.",
    nearbySlugsSameRegion: ['duxbury', 'marshfield', 'hingham'],
    recommendedVehicles: ['Chrysler 300', 'GMC Yukon', 'Ford Expedition MAX XLT'],
    popularUseCase: 'airport transfers and wedding transportation',
  },
  {
    slug: 'duxbury',
    name: 'Duxbury',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 38,
    driveTimeToLogan: '~42 min',
    distanceToPVD: 48,
    driveTimeToPVD: '~47 min',
    localLandmarks: ['Duxbury Beach', 'Powder Point Bridge', 'Duxbury Bay', 'King Caesar House'],
    localContext: "Duxbury's pristine barrier beach and upscale residential character attract a discerning clientele who expect the same premium standard in ground transportation as in every other aspect of their lives. GBL's white-glove service is a natural fit.",
    nearbySlugsSameRegion: ['marshfield', 'plymouth', 'hingham'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Jeep Wagoneer L'],
    popularUseCase: 'luxury airport transfers and wedding parties',
  },
  {
    slug: 'marshfield',
    name: 'Marshfield',
    county: 'Plymouth County',
    state: 'MA',
    region: 'South Shore',
    distanceToLogan: 35,
    driveTimeToLogan: '~40 min',
    localLandmarks: ['Marshfield Hills', 'Green Harbor', 'Marshfield Fairgrounds', 'Rexhame Beach'],
    localContext: "Marshfield offers a quieter South Shore lifestyle with easy access to Route 139 and Route 3. Residents traveling through Logan or Providence appreciate GBL's early morning and late-night availability — no rideshare surprises at 4 AM.",
    nearbySlugsSameRegion: ['duxbury', 'plymouth', 'hingham'],
    recommendedVehicles: ['Chrysler 300', 'Black SUV', 'GMC Yukon'],
    popularUseCase: 'early morning airport departures and holiday travel',
  },
  // ── NORTH SHORE ──
  {
    slug: 'salem',
    name: 'Salem',
    county: 'Essex County',
    state: 'MA',
    region: 'North Shore',
    distanceToLogan: 20,
    driveTimeToLogan: '~32 min',
    localLandmarks: ['Salem Witch Museum', 'Peabody Essex Museum', 'Derby Wharf', 'Salem Common'],
    localContext: "Salem is one of New England's most iconic cities, attracting visitors year-round and home to a growing professional population. Its historic charm and proximity to Logan make GBL the obvious choice for travelers who want a polished, stress-free start or end to their journey.",
    nearbySlugsSameRegion: ['newburyport', 'gloucester'],
    recommendedVehicles: ['Chrysler 300', 'Black Sedan', 'Volvo S90'],
    popularUseCase: 'airport transfers and special occasion transportation',
  },
  {
    slug: 'newburyport',
    name: 'Newburyport',
    county: 'Essex County',
    state: 'MA',
    region: 'North Shore',
    distanceToLogan: 40,
    driveTimeToLogan: '~48 min',
    distanceToMHT: 50,
    driveTimeToMHT: '~52 min',
    localLandmarks: ['Newburyport Waterfront', 'Plum Island', 'Market Square', 'Parker River National Wildlife Refuge'],
    localContext: "Newburyport's restored Federal architecture and boutique waterfront have made it one of the North Shore's most desirable addresses. Its distance from Logan makes professional chauffeured service a smarter choice than driving — no parking fees, no stress navigating airport construction.",
    nearbySlugsSameRegion: ['salem', 'gloucester'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'GMC Yukon'],
    popularUseCase: 'business travelers and couples booking wedding transportation',
  },
  {
    slug: 'gloucester',
    name: 'Gloucester',
    county: 'Essex County',
    state: 'MA',
    region: 'North Shore',
    distanceToLogan: 36,
    driveTimeToLogan: '~45 min',
    localLandmarks: ['Gloucester Harbor', 'Good Harbor Beach', 'Rocky Neck Art Colony', "Fisherman's Memorial"],
    localContext: "America's oldest fishing port, Gloucester has evolved into a destination for artists, tourists, and professionals who call Cape Ann home. GBL handles the logistics while clients enjoy the scenic drive in — or sleep through it.",
    nearbySlugsSameRegion: ['salem', 'newburyport'],
    recommendedVehicles: ['Chrysler 300', 'Black SUV', 'Ford Expedition MAX XLT'],
    popularUseCase: 'airport transfers and corporate group travel',
  },
  // ── CENTRAL MASSACHUSETTS ──
  {
    slug: 'worcester',
    name: 'Worcester',
    county: 'Worcester County',
    state: 'MA',
    region: 'Central Massachusetts',
    distanceToLogan: 48,
    driveTimeToLogan: '~52 min',
    distanceToMHT: 42,
    driveTimeToMHT: '~45 min',
    distanceToPVD: 46,
    driveTimeToPVD: '~48 min',
    localLandmarks: ['Holy Cross', 'WPI', 'Assumption University', 'Polar Park'],
    localContext: "Worcester is the second-largest city in New England, with major universities, a growing medical sector, and UMass Memorial Medical Center. Corporate and academic travelers departing from Worcester benefit from GBL's fixed-rate service with no surge pricing — especially critical for early-morning departures.",
    nearbySlugsSameRegion: ['shrewsbury'],
    recommendedVehicles: ['Chrysler 300', 'GMC Yukon', 'Ford Expedition MAX XLT'],
    popularUseCase: 'medical professionals, university staff, and corporate travelers',
  },
  {
    slug: 'shrewsbury',
    name: 'Shrewsbury',
    county: 'Worcester County',
    state: 'MA',
    region: 'Central Massachusetts',
    distanceToLogan: 44,
    driveTimeToLogan: '~48 min',
    distanceToMHT: 38,
    driveTimeToMHT: '~42 min',
    localLandmarks: ['Lake Quinsigamond', 'Shrewsbury Town Center', 'UMass Memorial Shrewsbury Campus'],
    localContext: "Shrewsbury's position on the eastern edge of Worcester County gives it easy Mass Pike access, making it one of the most efficient pickup locations for Logan runs from central Massachusetts. The town's professional community expects premium, punctual service.",
    nearbySlugsSameRegion: ['worcester'],
    recommendedVehicles: ['Chrysler 300', 'Volvo S90', 'Black SUV'],
    popularUseCase: 'business travelers and families flying out of Logan',
  },
  // ── CAPE COD ──
  {
    slug: 'barnstable',
    name: 'Barnstable',
    county: 'Barnstable County',
    state: 'MA',
    region: 'Cape Cod',
    distanceToLogan: 72,
    driveTimeToLogan: '~80 min',
    distanceToPVD: 60,
    driveTimeToPVD: '~65 min',
    localLandmarks: ['Hyannis Port', 'Cape Cod Canal', 'Barnstable Harbor', 'John F. Kennedy Hyannis Museum'],
    localContext: "Barnstable is the largest town on Cape Cod and home to Hyannis — the Cape's de facto downtown. With no direct rail link to Logan, chauffeured transportation is the premium alternative to a two-hour bus ride, and GBL is the name Cape Cod travelers trust.",
    nearbySlugsSameRegion: ['sandwich', 'falmouth'],
    recommendedVehicles: ['GMC Yukon', 'Ford Expedition MAX XLT', 'Mercedes-Benz Sprinter Van'],
    popularUseCase: 'Cape Cod residents and visitors transferring to Logan or TF Green',
  },
  {
    slug: 'sandwich',
    name: 'Sandwich',
    county: 'Barnstable County',
    state: 'MA',
    region: 'Cape Cod',
    distanceToLogan: 60,
    driveTimeToLogan: '~65 min',
    distanceToPVD: 52,
    driveTimeToPVD: '~55 min',
    localLandmarks: ['Heritage Museums & Gardens', 'Shawme-Crowell State Forest', 'Sandwich Boardwalk', 'Cape Cod Canal'],
    localContext: "Sandwich is the oldest town on Cape Cod, situated at the canal end of the peninsula. Its gateway position makes it the first and last stop for many Cape Cod travelers, and GBL provides reliable connections to Logan and T.F. Green whatever the season.",
    nearbySlugsSameRegion: ['barnstable', 'falmouth'],
    recommendedVehicles: ['Chrysler 300', 'GMC Yukon', 'Ford Expedition MAX XLT'],
    popularUseCase: 'gateway airport transfers for upper Cape residents',
  },
  {
    slug: 'falmouth',
    name: 'Falmouth',
    county: 'Barnstable County',
    state: 'MA',
    region: 'Cape Cod',
    distanceToLogan: 74,
    driveTimeToLogan: '~82 min',
    distanceToPVD: 62,
    driveTimeToPVD: '~68 min',
    localLandmarks: ['Woods Hole', 'Falmouth Heights Beach', 'Shining Sea Bikeway', 'Island Queen Ferry Terminal'],
    localContext: "Falmouth and the Woods Hole scientific community generate consistent demand for professional transportation. Researchers and Marine Biological Laboratory staff frequently travel internationally, making a reliable Logan transfer essential.",
    nearbySlugsSameRegion: ['sandwich', 'barnstable'],
    recommendedVehicles: ['Chrysler 300', 'Black SUV', 'Ford Expedition MAX XLT'],
    popularUseCase: 'Woods Hole researchers, MBL staff, and seasonal residents',
  },
]
```

- [ ] **Step 3: Commit data layer**

```bash
git add src/data/locations.ts src/data/airports.ts
git commit -m "feat(pseo): add location and airport data for 20 cities"
```

---

### Task 2: Review Helper

**Files:**
- Modify: `src/data/reviews.ts`

- [ ] **Step 1: Add `getReviewsForService` helper to the bottom of `src/data/reviews.ts`**

```typescript
export function getReviewsForService(
  serviceType: 'airport' | 'corporate' | 'wedding' | 'general'
): Review[] {
  if (serviceType === 'corporate') return [reviews[2], reviews[0]]
  if (serviceType === 'wedding') return [reviews[1], reviews[0]]
  if (serviceType === 'airport') return [reviews[7], reviews[5]]
  return [reviews[0], reviews[2]]
}
```

This returns 2 reviews relevant to the service type using existing review data. Index 7 = Patricia W. (airport, flight delay story), index 5 = Amanda L. (airport, best car service), index 2 = David R. (corporate), index 0 = John M. (corporate), index 1 = Sarah K. (wedding).

- [ ] **Step 2: Commit**

```bash
git add src/data/reviews.ts
git commit -m "feat(pseo): add getReviewsForService helper"
```

---

### Task 3: pSEO Components — TrustBar, BookingCTA, LocalContext

**Files:**
- Create: `src/components/pseo/TrustBar.tsx`
- Create: `src/components/pseo/BookingCTA.tsx`
- Create: `src/components/pseo/LocalContext.tsx`

- [ ] **Step 1: Create `src/components/pseo/TrustBar.tsx`**

```tsx
import { Shield, Clock, Star, Phone } from 'lucide-react'

const items = [
  { icon: Shield, label: 'Fully Licensed & Insured' },
  { icon: Clock, label: '24 / 7 Availability' },
  { icon: Star, label: '5-Star Rated Service' },
  { icon: Phone, label: 'Always Reachable' },
]

export function TrustBar() {
  return (
    <section className="bg-navy border-b border-white/5">
      <div className="section-padding py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={18} className="text-gold flex-shrink-0" />
              <span className="font-body text-sm text-silver/70">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/pseo/BookingCTA.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `src/components/pseo/LocalContext.tsx`**

```tsx
import type { Location } from '@/data/locations'

export function LocalContext({ location }: { location: Location }) {
  return (
    <section className="section-padding py-20 bg-cream">
      <div className="max-w-3xl">
        <p className="label-sm mb-4">Local Knowledge</p>
        <h2 className="heading-lg mb-6">
          Chauffeured Car Service in {location.name}
        </h2>
        <div className="divider-gold mb-8" />
        <div className="space-y-4 font-body text-navy/60 leading-relaxed">
          <p>{location.localContext}</p>
          <p>
            Whether you&apos;re departing from {location.localLandmarks[0]} or being picked up
            from anywhere in {location.county}, Greater Boston Livery provides door-to-door
            service with no hidden fees, no surge pricing, and no uncertainty.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/pseo/TrustBar.tsx src/components/pseo/BookingCTA.tsx src/components/pseo/LocalContext.tsx
git commit -m "feat(pseo): add TrustBar, BookingCTA, and LocalContext components"
```

---

### Task 4: pSEO Components — RouteHero, RouteStats

**Files:**
- Create: `src/components/pseo/RouteHero.tsx`
- Create: `src/components/pseo/RouteStats.tsx`

- [ ] **Step 1: Create `src/components/pseo/RouteHero.tsx`**

```tsx
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { BOOKING_URL, PHONE_DISPLAY } from '@/utils/seo'
import type { Location } from '@/data/locations'

interface RouteHeroProps {
  location: Location
  serviceLabel: string
  serviceSlug: string
  heading: string
  subheading: string
  heroImage: string
}

export function RouteHero({
  location,
  serviceLabel,
  serviceSlug,
  heading,
  subheading,
  heroImage,
}: RouteHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={`${serviceLabel} in ${location.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
      </div>
      <div className="relative z-10 section-padding pb-16 w-full">
        <nav className="flex items-center gap-2 mb-6 font-body text-xs text-silver/40">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations/" className="hover:text-gold transition-colors">Locations</Link>
          <span>/</span>
          <Link href={`/${location.slug}/`} className="hover:text-gold transition-colors">{location.name}</Link>
          <span>/</span>
          <span className="text-silver/70">{serviceLabel}</span>
        </nav>

        <p className="label-sm mb-3">{serviceLabel}</p>
        <h1 className="heading-display text-cream max-w-2xl">{heading}</h1>
        <p className="font-body text-lg text-silver/70 max-w-xl leading-relaxed mt-6 mb-10">
          {subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto justify-center"
          >
            Book Now <ArrowRight size={14} />
          </a>
          <a href="tel:+18554254661" className="btn-outline w-full sm:w-auto justify-center">
            <Phone size={14} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/pseo/RouteStats.tsx`**

```tsx
import type { Location } from '@/data/locations'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 border border-white/10">
      <p className="font-body text-xs text-silver/40 uppercase tracking-wider mb-2">{label}</p>
      <p className="font-display text-xl text-cream font-medium">{value}</p>
    </div>
  )
}

export function RouteStats({ location }: { location: Location }) {
  return (
    <section className="bg-navy section-padding py-16">
      <p className="label-sm mb-8">Your Route at a Glance</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Distance to Logan" value={`${location.distanceToLogan} miles`} />
        <StatCard label="Estimated Drive Time" value={location.driveTimeToLogan} />
        <StatCard label="Complimentary Wait" value="60 minutes" />
        <StatCard label="Flight Tracking" value="Real-time, included" />
      </div>

      {(location.distanceToMHT || location.distanceToPVD) && (
        <div className="space-y-2 font-body text-sm text-silver/60">
          {location.distanceToMHT && (
            <p>
              Also serving Manchester-Boston Regional Airport (MHT) from {location.name} —
              approximately {location.driveTimeToMHT} drive.
            </p>
          )}
          {location.distanceToPVD && (
            <p>
              T.F. Green Airport (PVD) in Warwick, RI is also an option from {location.name} —
              approximately {location.driveTimeToPVD} drive.
            </p>
          )}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/pseo/RouteHero.tsx src/components/pseo/RouteStats.tsx
git commit -m "feat(pseo): add RouteHero and RouteStats components"
```

---

### Task 5: pSEO Components — ServiceInclusions, FleetSuggestion, ServiceFAQ

**Files:**
- Create: `src/components/pseo/ServiceInclusions.tsx`
- Create: `src/components/pseo/FleetSuggestion.tsx`
- Create: `src/components/pseo/ServiceFAQ.tsx`

- [ ] **Step 1: Create `src/components/pseo/ServiceInclusions.tsx`**

```tsx
import { Check } from 'lucide-react'

export function ServiceInclusions({ items }: { items: string[] }) {
  return (
    <section className="section-padding py-20 bg-navy">
      <div className="max-w-3xl">
        <p className="label-sm mb-4">The Standard</p>
        <h2 className="heading-lg text-cream mb-8">What&apos;s Included with Every Ride</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-sm text-silver/70">
              <div className="w-5 h-5 border border-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={10} className="text-gold" />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/pseo/FleetSuggestion.tsx`**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Location } from '@/data/locations'

export function FleetSuggestion({ location }: { location: Location }) {
  return (
    <section className="section-padding py-20 bg-cream">
      <div className="max-w-3xl">
        <p className="label-sm mb-4">The Fleet</p>
        <h2 className="heading-lg mb-6">Recommended Vehicles from {location.name}</h2>
        <div className="divider-gold mb-8" />
        <p className="font-body text-navy/60 leading-relaxed mb-8">
          For most {location.name} trips, we recommend the{' '}
          {location.recommendedVehicles.slice(0, 2).join(' or ')} —
          ideal for {location.popularUseCase}. For groups, our{' '}
          {location.recommendedVehicles[2] ?? 'Executive SUV'} accommodates up to 7 passengers
          with luggage.
        </p>
        <Link href="/fleet/" className="btn-ghost">
          View the Full Fleet <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/pseo/ServiceFAQ.tsx`**

Uses native `<details>/<summary>` matching the pattern from the service detail pages.

```tsx
import { ChevronDown } from 'lucide-react'

interface ServiceFAQProps {
  cityName: string
  serviceLabel: string
  faqs: { question: string; answer: string }[]
}

export function ServiceFAQ({ cityName, serviceLabel, faqs }: ServiceFAQProps) {
  return (
    <section className="section-padding py-20 bg-navy">
      <p className="label-sm mb-4">Common Questions</p>
      <h2 className="heading-lg text-cream mb-12 max-w-xl">
        Frequently Asked Questions —{' '}
        {cityName} {serviceLabel}
      </h2>
      <div className="max-w-3xl">
        {faqs.map((faq) => (
          <details key={faq.question} className="border-b border-white/10 last:border-b-0 group">
            <summary className="flex items-center justify-between py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden gap-4">
              <span className="font-display text-base text-cream">{faq.question}</span>
              <ChevronDown size={18} className="text-gold flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="font-body text-sm text-silver/60 leading-relaxed pb-5">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/pseo/ServiceInclusions.tsx src/components/pseo/FleetSuggestion.tsx src/components/pseo/ServiceFAQ.tsx
git commit -m "feat(pseo): add ServiceInclusions, FleetSuggestion, and ServiceFAQ components"
```

---

### Task 6: pSEO Components — NearbyLocations, RelatedServices

**Files:**
- Create: `src/components/pseo/NearbyLocations.tsx`
- Create: `src/components/pseo/RelatedServices.tsx`

- [ ] **Step 1: Create `src/components/pseo/NearbyLocations.tsx`**

```tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { locations, type Location } from '@/data/locations'

interface NearbyLocationsProps {
  location: Location
  serviceSlug: string
  serviceLabel: string
}

export function NearbyLocations({ location, serviceSlug, serviceLabel }: NearbyLocationsProps) {
  const nearbyLocations = locations.filter((l) =>
    location.nearbySlugsSameRegion.includes(l.slug)
  )

  if (nearbyLocations.length === 0) return null

  return (
    <section className="section-padding py-20 bg-navy">
      <p className="label-sm mb-4">Nearby</p>
      <h2 className="heading-lg text-cream mb-8">Also Serving Nearby Communities</h2>
      <p className="font-body text-silver/60 mb-8">
        Greater Boston Livery provides the same premium service across {location.region}:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {nearbyLocations.map((nearby) => (
          <Link
            key={nearby.slug}
            href={`/${nearby.slug}/${serviceSlug}/`}
            className="p-6 border border-white/10 hover:border-gold/40 transition-colors group"
          >
            <p className="font-display text-base text-cream group-hover:text-gold transition-colors mb-1">
              {nearby.name}
            </p>
            <p className="font-body text-xs text-silver/40">
              {serviceLabel}
            </p>
          </Link>
        ))}
      </div>
      <Link href="/locations/" className="btn-ghost">
        View All Service Areas <ArrowRight size={14} />
      </Link>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/pseo/RelatedServices.tsx`**

```tsx
import Link from 'next/link'
import { Plane, Briefcase, Heart, Car } from 'lucide-react'
import { SERVICE_TYPES, type Location } from '@/data/locations'

const iconMap: Record<string, typeof Plane> = {
  'airport-transfer': Plane,
  'limo-service': Car,
  'corporate-car-service': Briefcase,
  'wedding-transportation': Heart,
}

export function RelatedServices({
  location,
  currentServiceSlug,
}: {
  location: Location
  currentServiceSlug: string
}) {
  const otherServices = SERVICE_TYPES.filter((s) => s.slug !== currentServiceSlug)

  return (
    <section className="section-padding py-20 bg-cream">
      <p className="label-sm mb-4">Explore More</p>
      <h2 className="heading-lg mb-12">Other Services in {location.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-silver">
        {otherServices.map((service) => {
          const Icon = iconMap[service.slug] ?? Car
          return (
            <Link
              key={service.slug}
              href={`/${location.slug}/${service.slug}/`}
              className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
            >
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                <Icon size={18} className="text-gold" />
              </div>
              <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">
                {service.label} in {location.name}
              </h3>
              <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                Learn more <ArrowRight size={11} />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/pseo/NearbyLocations.tsx src/components/pseo/RelatedServices.tsx
git commit -m "feat(pseo): add NearbyLocations and RelatedServices components"
```

---

### Task 7: Service Page Template (`[city]/[service]/page.tsx`)

**Files:**
- Create: `src/app/[city]/[service]/page.tsx`

- [ ] **Step 1: Create `src/app/[city]/[service]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  locations,
  getLocation,
  getServiceType,
  VALID_SERVICE_SLUGS,
} from '@/data/locations'
import { getReviewsForService } from '@/data/reviews'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  schemaToString,
  SITE_URL,
  BUSINESS_NAME,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { ReviewCard } from '@/components/shared/ReviewCard'
import { RouteHero } from '@/components/pseo/RouteHero'
import { TrustBar } from '@/components/pseo/TrustBar'
import { RouteStats } from '@/components/pseo/RouteStats'
import { LocalContext } from '@/components/pseo/LocalContext'
import { ServiceInclusions } from '@/components/pseo/ServiceInclusions'
import { FleetSuggestion } from '@/components/pseo/FleetSuggestion'
import { ServiceFAQ } from '@/components/pseo/ServiceFAQ'
import { NearbyLocations } from '@/components/pseo/NearbyLocations'
import { RelatedServices } from '@/components/pseo/RelatedServices'
import { BookingCTA } from '@/components/pseo/BookingCTA'

export function generateStaticParams() {
  return locations.flatMap((loc) =>
    VALID_SERVICE_SLUGS.map((service) => ({
      city: loc.slug,
      service,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}): Promise<Metadata> {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getServiceType(service)
  if (!loc || !svc) return {}

  const title = svc.titleTemplate(loc.name)
  const description = svc.descriptionTemplate(loc)

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${loc.slug}/${svc.slug}/` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${loc.slug}/${svc.slug}/`,
      title,
      description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
  }
}

function mapServiceToReviewType(slug: string): 'airport' | 'corporate' | 'wedding' | 'general' {
  if (slug === 'airport-transfer') return 'airport'
  if (slug === 'corporate-car-service') return 'corporate'
  if (slug === 'wedding-transportation') return 'wedding'
  return 'general'
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}) {
  const { city, service } = await params
  const loc = getLocation(city)
  const svc = getServiceType(service)
  if (!loc || !svc) notFound()

  const faqs = svc.faqGenerator(loc)
  const reviewType = mapServiceToReviewType(svc.slug)
  const relevantReviews = getReviewsForService(reviewType)

  const heading =
    svc.slug === 'airport-transfer'
      ? `${loc.name} to Logan Airport Car Service`
      : `${svc.label} in ${loc.name}, ${loc.state}`

  const subheading =
    svc.slug === 'airport-transfer'
      ? `Premium chauffeured transportation from ${loc.name}, ${loc.county} to Boston Logan International Airport. ${loc.driveTimeToLogan} drive. Real-time flight tracking. 60-minute complimentary wait on all arrivals.`
      : `Premium ${svc.label.toLowerCase()} in ${loc.name} and throughout ${loc.county}. Professional chauffeurs, luxury vehicles, available 24/7.`

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
      { name: loc.name, href: `/${loc.slug}` },
      { name: svc.label, href: `/${loc.slug}/${svc.slug}` },
    ])
  )

  const serviceSchema = schemaToString({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: heading,
    description: svc.descriptionTemplate(loc),
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
    },
    areaServed: {
      '@type': 'City',
      name: loc.name,
      containedInPlace: { '@type': 'State', name: 'Massachusetts' },
    },
    url: `${SITE_URL}/${loc.slug}/${svc.slug}/`,
  })

  const faqSchema = schemaToString(buildFaqSchema(faqs))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <PageTransition>
        <RouteHero
          location={loc}
          serviceLabel={svc.label}
          serviceSlug={svc.slug}
          heading={heading}
          subheading={subheading}
          heroImage={svc.heroImage}
        />
        <TrustBar />
        {svc.slug === 'airport-transfer' && <RouteStats location={loc} />}
        <LocalContext location={loc} />
        <ServiceInclusions items={svc.inclusions} />
        <FleetSuggestion location={loc} />

        {/* Reviews */}
        <section className="section-padding py-20 bg-navy">
          <RevealOnScroll>
            <p className="label-sm mb-4">Client Testimonials</p>
            <h2 className="heading-lg text-cream mb-12">What Our Clients Say</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {relevantReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>

        <ServiceFAQ cityName={loc.name} serviceLabel={svc.label} faqs={faqs} />
        <NearbyLocations location={loc} serviceSlug={svc.slug} serviceLabel={svc.label} />
        <RelatedServices location={loc} currentServiceSlug={svc.slug} />
        <BookingCTA cityName={loc.name} serviceLabel={svc.label} />
      </PageTransition>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\[city\]/\[service\]/page.tsx
git commit -m "feat(pseo): add service page template for [city]/[service] routes"
```

---

### Task 8: City Hub Page (`[city]/page.tsx`)

**Files:**
- Create: `src/app/[city]/page.tsx`

- [ ] **Step 1: Create `src/app/[city]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Plane, Briefcase, Heart, Car, ArrowRight } from 'lucide-react'
import {
  locations,
  getLocation,
  SERVICE_TYPES,
  RESERVED_SLUGS,
} from '@/data/locations'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'
import { TrustBar } from '@/components/pseo/TrustBar'
import { LocalContext } from '@/components/pseo/LocalContext'
import { BookingCTA } from '@/components/pseo/BookingCTA'
import { NearbyLocations } from '@/components/pseo/NearbyLocations'

const iconMap: Record<string, typeof Plane> = {
  'airport-transfer': Plane,
  'limo-service': Car,
  'corporate-car-service': Briefcase,
  'wedding-transportation': Heart,
}

const serviceDescriptions: Record<string, (loc: { name: string; driveTimeToLogan: string }) => string> = {
  'airport-transfer': (loc) => `Logan, MHT & PVD — ${loc.driveTimeToLogan} from ${loc.name}`,
  'limo-service': () => 'Luxury sedans, SUVs & stretch limos for any occasion',
  'corporate-car-service': () => 'Executive accounts, invoicing, on-demand fleet',
  'wedding-transportation': () => 'Full wedding party coordination, immaculate vehicles',
}

export function generateStaticParams() {
  return locations
    .filter((loc) => !RESERVED_SLUGS.includes(loc.slug))
    .map((loc) => ({ city: loc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) return {}

  const title = `Chauffeured Transportation ${loc.name}, ${loc.state} | Greater Boston Livery`
  const description = `Premium chauffeured transportation in ${loc.name}, ${loc.county}. Airport transfers, corporate car service, limo service, and wedding transportation. Available 24/7. Call (855) 425-4661.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${loc.slug}/` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${loc.slug}/`,
      title,
      description,
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    },
  }
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params
  const loc = getLocation(city)
  if (!loc) notFound()

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
      { name: loc.name, href: `/${loc.slug}` },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <PageTransition>
        {/* Hero */}
        <section className="bg-navy pt-40 pb-20 section-padding relative overflow-hidden">
          <div className="relative z-10">
            <RevealOnScroll>
              <nav className="flex items-center gap-2 mb-6 font-body text-xs text-silver/40">
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                <span>/</span>
                <Link href="/locations/" className="hover:text-gold transition-colors">Locations</Link>
                <span>/</span>
                <span className="text-silver/70">{loc.name}</span>
              </nav>
              <p className="label-sm mb-4">{loc.region}</p>
              <h1 className="heading-display text-cream max-w-2xl">
                Chauffeured Transportation in{' '}
                <span className="gold-gradient">{loc.name}, {loc.state}</span>
              </h1>
              <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
                Greater Boston Livery provides premium chauffeured transportation throughout{' '}
                {loc.name} and {loc.county}. From Logan Airport transfers to corporate travel,
                weddings, and special occasions — available 24/7.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <TrustBar />

        {/* Service cards */}
        <section className="section-padding py-20 bg-cream">
          <RevealOnScroll>
            <p className="label-sm mb-4">Our Services</p>
            <h2 className="heading-lg mb-12">What We Offer in {loc.name}</h2>
          </RevealOnScroll>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-silver">
            {SERVICE_TYPES.map((service) => {
              const Icon = iconMap[service.slug] ?? Car
              const desc = serviceDescriptions[service.slug]?.(loc) ?? ''
              return (
                <StaggerItem key={service.slug} className="h-full">
                  <Link
                    href={`/${loc.slug}/${service.slug}/`}
                    className="flex flex-col h-full p-8 border-r border-b border-silver hover:bg-navy group transition-colors duration-300 last:border-r-0"
                  >
                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold transition-colors">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <h3 className="font-display text-lg text-navy group-hover:text-cream transition-colors mb-3">
                      {service.label}
                    </h3>
                    <p className="font-body text-sm text-navy/60 group-hover:text-silver/60 transition-colors leading-relaxed">
                      {desc}
                    </p>
                    <div className="flex items-center gap-1 mt-auto pt-6 text-gold text-xs tracking-widest uppercase font-medium">
                      Learn more <ArrowRight size={11} />
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        </section>

        <LocalContext location={loc} />
        <NearbyLocations location={loc} serviceSlug="airport-transfer" serviceLabel="Airport Transfer" />
        <BookingCTA cityName={loc.name} serviceLabel="Transportation" />
      </PageTransition>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\[city\]/page.tsx
git commit -m "feat(pseo): add city hub page template"
```

---

### Task 9: Locations Hub Page

**Files:**
- Create: `src/app/locations/page.tsx`

- [ ] **Step 1: Create `src/app/locations/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { locations } from '@/data/locations'
import {
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

export const metadata: Metadata = {
  title: 'Service Areas | Greater Boston Livery',
  description: 'Greater Boston Livery serves Greater Boston, the South Shore, North Shore, Cape Cod, and Central Massachusetts. Browse all service areas for airport transfers, limo service, corporate travel, and wedding transportation.',
  alternates: { canonical: `${SITE_URL}/locations/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/locations/`,
    title: 'Service Areas | Greater Boston Livery',
    description: 'Browse all service areas for premium chauffeured transportation throughout Massachusetts.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

export default function LocationsPage() {
  const regions = [...new Set(locations.map((l) => l.region))]

  const breadcrumbSchema = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Locations', href: '/locations' },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <PageTransition>
        {/* Hero */}
        <section className="bg-navy pt-40 pb-20 section-padding">
          <RevealOnScroll>
            <p className="label-sm mb-4">Where We Serve</p>
            <h1 className="heading-display text-cream max-w-2xl">
              Greater Boston Livery —{' '}
              <span className="gold-gradient">Service Areas</span>
            </h1>
            <p className="font-body text-silver/60 mt-6 max-w-xl leading-relaxed">
              Premium chauffeured transportation serving Greater Boston, the South Shore,
              North Shore, Cape Cod, Central Massachusetts, and beyond. Select your city below
              to see available services, drive times, and booking options.
            </p>
          </RevealOnScroll>
        </section>

        {/* Regions */}
        {regions.map((region) => {
          const regionLocations = locations.filter((l) => l.region === region)
          return (
            <section key={region} className="section-padding py-16 border-b border-silver bg-cream">
              <RevealOnScroll>
                <h2 className="heading-lg mb-10">{region}</h2>
              </RevealOnScroll>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionLocations.map((loc) => (
                  <StaggerItem key={loc.slug}>
                    <div className="p-6 border border-silver hover:border-gold/40 transition-colors">
                      <Link href={`/${loc.slug}/`} className="font-display text-lg text-navy hover:text-gold transition-colors">
                        {loc.name}
                      </Link>
                      <p className="font-body text-xs text-navy/40 mt-1 mb-4">
                        {loc.county} · {loc.driveTimeToLogan} to Logan
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <Link href={`/${loc.slug}/airport-transfer/`} className="font-body text-xs text-gold hover:underline">
                          Airport Transfer
                        </Link>
                        <Link href={`/${loc.slug}/limo-service/`} className="font-body text-xs text-gold hover:underline">
                          Limo Service
                        </Link>
                        <Link href={`/${loc.slug}/corporate-car-service/`} className="font-body text-xs text-gold hover:underline">
                          Corporate
                        </Link>
                        <Link href={`/${loc.slug}/wedding-transportation/`} className="font-body text-xs text-gold hover:underline">
                          Wedding
                        </Link>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </section>
          )
        })}

        {/* CTA */}
        <section className="bg-navy section-padding py-20 text-center">
          <RevealOnScroll>
            <h2 className="heading-lg text-cream mb-4">Don&apos;t see your city?</h2>
            <p className="font-body text-silver/60 mb-8 max-w-lg mx-auto">
              We serve all of Massachusetts and beyond. Call us to arrange service from any location.
            </p>
            <a href="tel:+18554254661" className="btn-primary">
              Call (855) 425-4661
            </a>
          </RevealOnScroll>
        </section>
      </PageTransition>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/locations/page.tsx
git commit -m "feat(pseo): add locations hub page"
```

---

### Task 10: Sitemap Update

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Replace `src/app/sitemap.ts` with updated version**

```typescript
import type { MetadataRoute } from 'next'
import { locations, VALID_SERVICE_SLUGS } from '@/data/locations'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://greaterbostonlivery.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/fleet/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/reviews/`, lastModified: '2026-03-27', changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact/`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/team/`, lastModified: '2026-03-27', changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/services/airport/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/corporate/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/weddings/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/roadshows/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/nightlife/`, lastModified: '2026-03-27', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/locations/`, lastModified: '2026-04-01', changeFrequency: 'monthly', priority: 0.9 },
  ]

  const cityHubs: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${baseUrl}/${loc.slug}/`,
    lastModified: '2026-04-01',
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const servicePages: MetadataRoute.Sitemap = locations.flatMap((loc) =>
    VALID_SERVICE_SLUGS.map((service) => ({
      url: `${baseUrl}/${loc.slug}/${service}/`,
      lastModified: '2026-04-01',
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }))
  )

  return [...staticPages, ...cityHubs, ...servicePages]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(pseo): add pSEO pages to sitemap"
```

---

### Task 11: Footer Update — Add Service Areas Link

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add "Service Areas" link to the Services column**

In `src/components/layout/Footer.tsx`, find the services list array (around line 64-70) and add a new entry at the end:

```typescript
// Find this array:
{[
  { label: 'Airport Transfers', slug: 'airport' },
  { label: 'Corporate Travel', slug: 'corporate' },
  { label: 'Weddings & Events', slug: 'weddings' },
  { label: 'Roadshows & Tours', slug: 'roadshows' },
  { label: 'Special Occasions', slug: 'nightlife' },
].map((s) => (
```

After the `.map()` closing `)}`, add a new `<li>` for Service Areas:

```tsx
<li>
  <Link href="/locations/" className="font-body text-sm text-silver/70 hover:text-gold transition-colors">
    Service Areas
  </Link>
</li>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(pseo): add Service Areas link to footer"
```

---

### Task 12: Build Verification

- [ ] **Step 1: Run `next build` and verify zero errors**

```bash
npx next build
```

Expected: Build succeeds. Output should show all new routes including `/[city]` and `/[city]/[service]` with 20+ static paths each.

- [ ] **Step 2: Verify page count**

The build output should show:
- `/[city]` with 20 paths
- `/[city]/[service]` with 80 paths (20 cities x 4 services)
- `/locations` as a static page

- [ ] **Step 3: Spot-check 3 pages by starting dev server**

```bash
npx next dev
```

Visit:
1. `http://localhost:3000/locations/` — should show all 20 cities grouped by region
2. `http://localhost:3000/newton/` — should show city hub with 4 service cards
3. `http://localhost:3000/newton/airport-transfer/` — should show full service page with all sections

Verify each page has:
- Correct h1 with city name
- Breadcrumb navigation
- Unique content (not placeholder)
- Working CTAs (Book Now links to Moovs, phone links work)
- FAQ accordion opens/closes

- [ ] **Step 4: Verify sitemap**

Visit `http://localhost:3000/sitemap.xml` — should contain 101 new URLs (1 locations hub + 20 city hubs + 80 service pages) in addition to the existing pages.

- [ ] **Step 5: Final commit and push**

```bash
git add -A
git commit -m "feat(pseo): complete pSEO expansion — 101 location pages"
git push
```
