# pSEO Expansion — Design Spec

## Goal

Generate 101 new location-specific pages for Greater Boston Livery that rank for long-tail queries like "Newton to Logan Airport car service" and "Limo service Salem MA". Pages must be genuinely useful — not thin keyword-swap content.

## Scope

- 20 cities (from CLAUDE.md): Newton, Brookline, Cambridge, Waltham, Wellesley, Needham, Lexington, Quincy, Hingham, Plymouth, Duxbury, Marshfield, Salem, Newburyport, Gloucester, Worcester, Shrewsbury, Barnstable, Sandwich, Falmouth
- 4 service types: airport-transfer, limo-service, corporate-car-service, wedding-transportation
- 20 city hub pages + 80 service pages + 1 locations hub = **101 pages**

## Routing

### URL structure (Option A — root-level city slugs)

| Page type | URL pattern | Example |
|---|---|---|
| Locations hub | `/locations/` | `/locations/` |
| City hub | `/[city]/` | `/newton/` |
| Service page | `/[city]/[service]/` | `/newton/airport-transfer/` |

### Collision prevention

A `RESERVED_SLUGS` constant in `src/data/locations.ts` excludes existing routes from city slug validation:

```
fleet, services, contact, team, reviews, locations, robots.txt, sitemap.xml, _not-found
```

`generateStaticParams` in both `[city]/page.tsx` and `[city]/[service]/page.tsx` only returns slugs from the locations data file, so there is no actual collision risk — but the guard prevents accidentally adding a city with a conflicting name.

### Valid service slugs

```
airport-transfer, limo-service, corporate-car-service, wedding-transportation
```

`[city]/[service]/page.tsx` validates both the city slug and service slug, returning `notFound()` for invalid combinations.

## Data Layer

### `src/data/locations.ts`

Single source of truth for all 20 cities. Each entry contains:

```typescript
type Location = {
  slug: string
  name: string
  county: string
  state: string
  region: string // "Greater Boston" | "South Shore" | "North Shore" | "Cape Cod" | "Central Massachusetts"
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
```

Also exports:
- `RESERVED_SLUGS: string[]`
- `SERVICE_TYPES` array with metadata for each of the 4 service types (slug, label, metaTitle template, metaDescription template, heroImage, inclusions list, FAQ generator function)

### `src/data/airports.ts`

Airport details for Logan, Manchester, and Providence with fields: code, name, fullName, city, terminalNote, waitPolicy, parkingAvoidance.

### `src/data/reviews.ts` (update existing)

Add a `getReviewsForService(type)` helper that returns 2-3 relevant reviews based on service type. Uses the existing reviews array — no new review data needed.

## Components

All in `src/components/pseo/`. All are **server components** (no `'use client'`).

### `RouteHero.tsx`
- Breadcrumb nav: Home > Locations > [City] > [Service]
- Service label eyebrow
- `<h1>` with city + service name
- Descriptive paragraph with drive time, key selling points
- CTA group: Book Now + Call
- Background image (Unsplash, service-type-specific)

### `TrustBar.tsx`
- 4 trust markers matching homepage: Licensed & Insured, 24/7, 5-Star, Always Reachable
- Reuses icons from lucide-react
- Dark background strip

### `RouteStats.tsx`
- Grid of stat cards: distance, drive time, wait policy, flight tracking
- Conditionally shows MHT and PVD distances if available for the city

### `LocalContext.tsx`
- `<h2>` "Chauffeured Car Service in [City]"
- Renders `loc.localContext` paragraph
- Second paragraph referencing first landmark and county

### `FleetSuggestion.tsx`
- `<h2>` "Recommended Vehicles from [City]"
- Paragraph recommending first 2 vehicles for the use case, 3rd for groups
- Link to `/fleet/`

### `ServiceInclusions.tsx`
- `<h2>` "What's Included with Every Ride"
- Checklist of service-specific inclusions (airport: flight tracking, 60-min wait, meet & greet, etc.)

### `ServiceFAQ.tsx`
- `<h2>` with city + service name
- Native `<details>/<summary>` elements (matching existing pattern from service-detail-content.tsx)
- FAQ items generated per service type with city-specific data interpolated
- JSON-LD `FAQPage` schema output alongside the visible FAQ

### `NearbyLocations.tsx`
- `<h2>` "Also Serving Nearby Communities"
- Links to the same service page in 3-4 nearby cities (from `nearbySlugsSameRegion`)
- Link to `/locations/` hub

### `RelatedServices.tsx`
- `<h2>` "Other Services in [City]"
- Grid of links to the other 3 service types for this city
- Styled as cards matching the homepage service cards pattern

### `BookingCTA.tsx`
- Final section matching homepage "Ready to Ride?" pattern
- `<h2>` "Ready to Book Your [City] [Service]?"
- Book Now + Call CTA buttons

## Page Templates

### City Hub (`src/app/[city]/page.tsx`)

Server component. Renders:
1. Hero with city name, region, intro paragraph
2. TrustBar
3. 4 service cards linking to sub-pages (airport, corporate, limo, wedding)
4. Local context section
5. NearbyLocations
6. BookingCTA

Metadata: unique title/description per city, canonical URL, OG tags.
Schema: BreadcrumbList.

### Service Page (`src/app/[city]/[service]/page.tsx`)

Server component. Renders:
1. RouteHero (service-specific)
2. TrustBar
3. RouteStats (airport pages) or service-specific stats
4. LocalContext
5. ServiceInclusions
6. FleetSuggestion
7. Reviews (2-3 relevant reviews via `getReviewsForService`)
8. ServiceFAQ
9. NearbyLocations
10. RelatedServices
11. BookingCTA

Metadata: unique title/description per city+service, canonical URL, OG tags.
Schema: Service + BreadcrumbList + FAQPage.

### Locations Hub (`src/app/locations/page.tsx`)

Server component. Groups cities by region. Each city links to all 4 service pages. Metadata with canonical. BreadcrumbList schema.

## Metadata

Every page gets:
- Unique `<title>` interpolated with city name and service type
- Unique `meta description` with city, drive time, and service details
- `canonical` URL with trailing slash
- `openGraph` with matching title/description and service-specific image
- JSON-LD structured data (Service schema, BreadcrumbList, FAQPage where applicable)

All URLs use trailing slashes (matching `trailingSlash: true` in next.config.ts).

## Sitemap Update

Update `src/app/sitemap.ts` to include:
- `/locations/` hub (priority 0.9)
- 20 city hub pages (priority 0.8)
- 80 service pages (priority 0.75)

All with trailing slashes and `changeFrequency: 'monthly'`.

## Internal Linking Updates

### Footer (`src/components/layout/Footer.tsx`)
- Add "Service Areas" link to the Services column, pointing to `/locations/`

### Every pSEO page
- Breadcrumb: Home > Locations > [City] > [Service]
- NearbyLocations: 3-4 same-service links in nearby cities
- RelatedServices: 3 other service types for this city
- Link to `/locations/` hub

## Design System

All pSEO pages follow the existing GBL design system exactly:
- Colors: navy, gold, cream, silver (from CSS variables)
- Fonts: Playfair Display (headings), Inter (body)
- Existing utility classes: `section-padding`, `label-sm`, `heading-lg`, `heading-display`, `btn-primary`, `btn-outline`, `btn-ghost`, `divider-gold`, `gold-gradient`
- Motion: `PageTransition`, `RevealOnScroll`, `StaggerChildren`/`StaggerItem` wrappers
- No new design patterns — extend what exists

## Files Created

```
src/data/locations.ts          — 20 city entries + types + reserved slugs + service type metadata
src/data/airports.ts           — Logan, MHT, PVD data
src/app/locations/page.tsx     — Locations hub
src/app/[city]/page.tsx        — City hub template
src/app/[city]/[service]/page.tsx — Service page template
src/components/pseo/RouteHero.tsx
src/components/pseo/TrustBar.tsx
src/components/pseo/RouteStats.tsx
src/components/pseo/LocalContext.tsx
src/components/pseo/FleetSuggestion.tsx
src/components/pseo/ServiceInclusions.tsx
src/components/pseo/ServiceFAQ.tsx
src/components/pseo/NearbyLocations.tsx
src/components/pseo/RelatedServices.tsx
src/components/pseo/BookingCTA.tsx
```

## Files Modified

```
src/data/reviews.ts            — Add getReviewsForService() helper
src/app/sitemap.ts             — Add pSEO pages
src/components/layout/Footer.tsx — Add Service Areas link
```
