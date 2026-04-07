# SEO Audit Fixes — Technical SEO & On-Page Optimization

**Date:** 2026-04-07
**Scope:** First sub-project from the April 2026 SEO audit. Covers URL hygiene, H1/title/meta rewrites, navigation changes, internal linking, and schema updates. Does NOT cover new standalone pages (blog, FAQ, limo-service hub), city page content expansion, or review generation — those are future sub-projects.

---

## 1. URL Renames & Redirects

### Service Page Slug Renames

The service detail pages use a dynamic `[id]` route (`src/app/services/[id]/page.tsx`) with slugs defined in `src/data/services.ts`.

| Old Slug | New Slug |
|----------|----------|
| `airport` | `airport-transfers` |
| `corporate` | `corporate-car-service` |
| `weddings` | `wedding-transportation` |
| `roadshows` | `roadshows` (no change) |
| `nightlife` | `nightlife` (no change) |

**Changes required:**
- Update slug values in `src/data/services.ts`
- Add 301 redirects in `next.config.ts` via the `redirects()` async function:
  - `/services/airport/` -> `/services/airport-transfers/`
  - `/services/corporate/` -> `/services/corporate-car-service/`
  - `/services/weddings/` -> `/services/wedding-transportation/`
- Update all internal references to these slugs across the codebase (nav, footer, services page, city pages, schema, sitemap)

### 404 Fixes

- `/blog/` — add a 301 redirect to `/services/` in `next.config.ts` (placeholder until blog sub-project)
- `/services/airport-transfers/` — resolved by the slug rename above

### Trailing Slash

Already enforced by `trailingSlash: true` in `next.config.ts`. No code change needed. GSC duplicates are likely stale from before this setting was applied. Verify all internal links use trailing slashes during the link audit.

---

## 2. H1 & Title Tag Rewrites

Hybrid approach: keyword-rich visible H1 (styled smaller/subtler), current brand tagline demoted to decorative H2 (large, styled as before).

### Homepage (`src/app/page.tsx`, `src/app/home-sections.tsx`)
- **H1 (visible):** "Boston's Premier Limo & Airport Car Service"
- **H2 (decorative, large):** "Arrive. Distinguished."
- **Title tag:** "Boston Limo & Airport Car Service | Greater Boston Livery"
- Remove the current sr-only H1 (replaced by visible keyword H1)

### Services Page (`src/app/services/services-content.tsx`, `src/app/services/page.tsx`)
- **H1:** "Boston Airport Transfers, Corporate & Wedding Car Service"
- **H2:** "Every Journey. Executed Flawlessly."
- **Title tag:** "Boston Airport Transfers, Corporate & Wedding Car Service | Greater Boston Livery"

### Fleet Page (`src/app/fleet/fleet-content.tsx`)
- **H1:** "Luxury Fleet: Sedans, SUVs, Sprinters & Limos in Boston"
- **H2:** "Vehicles Worthy of Your Journey"
- **Title tag:** No change (already rated A-)

### Locations Hub (`src/app/locations/page.tsx`)
- **H1:** "Boston Limo & Car Service Areas Across Massachusetts"
- **H2:** "Greater Boston Livery — Service Areas"
- **Title tag:** "Boston Limo & Car Service Areas | Greater Boston Livery"

### City Hub Pages (`src/app/[city]/page.tsx`)
- **H1:** "{City} Limo & Car Service"
- **H2:** "Premium Chauffeured Transportation in {City}"
- **Title tag:** "Limo & Car Service {City}, MA | Greater Boston Livery"

### City + Service Pages
- No changes — already have keyword-rich H1s

### Reviews Page (`src/app/reviews/page.tsx`)
- **Title tag:** "Customer Reviews | Boston Limo Service | Greater Boston Livery"

### Contact Page
- **Title tag:** No change

---

## 3. Meta Descriptions

All rewritten for CTR — 155 chars max, include keywords, CTA.

### Homepage
"Boston's top-rated limo & airport car service. Logan Airport transfers, corporate travel & weddings. Fixed rates, 24/7 availability. Book online or call (855) 425-4661."

### Services Page
"Airport transfers to Logan, corporate car service, wedding transportation & more across Greater Boston. No surge pricing, real-time flight tracking. Book today."

### Fleet Page
"Browse our luxury fleet: executive sedans, SUVs, Mercedes Sprinters, stretch limos & motor coaches. Available 24/7 for Boston airport transfers, corporate & events."

### Locations Hub
"Greater Boston Livery serves 20+ cities across Massachusetts — from Cambridge to Cape Cod. Airport transfers, limo service, corporate & wedding transportation."

### Reviews Page
"See why Boston professionals trust Greater Boston Livery. Read verified client reviews for airport transfers, corporate car service & wedding transportation."

### Contact Page
No change.

### City Hub Pages (template)
"Premium limo & car service in {City}, MA. Airport transfers to Logan ({driveTime}), corporate transportation & wedding car service. Book online or call (855) 425-4661."

### City + Service Pages
No change — already have strong generated meta descriptions.

---

## 4. Navigation & Internal Linking

### Top Navigation (`src/components/layout/Navbar.tsx`)

Add "Airport Transfers" as a top-level link:

```
Home | Airport Transfers | Fleet | Services | Reviews | Contact
```

Link points to `/services/airport-transfers/` (the renamed slug).

### Footer (`src/components/layout/Footer.tsx`)

Add "Service Areas" link pointing to `/locations/`.

### Homepage City Links (`src/app/home-sections.tsx`)

New section: "We Serve These Areas" with links to the top 8 city hubs:
- Cambridge, Newton, Brookline, Lexington, Wellesley, Quincy, Hingham, Duxbury

Rendered as a grid of linked city names, styled consistently with existing homepage sections.

### Internal Link Audit

- Update all references to old service slugs site-wide
- Ensure city hub pages link back to `/locations/`
- Verify all internal links use trailing slashes

---

## 5. Schema Markup Updates

### ServiceArea Expansion (`src/utils/seo.ts`)

Expand `areaServed` in LocalBusiness schema from just "Boston" + "Massachusetts" to all 20 served cities individually. Each city as a `Place` with `name` and `address` containing city, state, country.

### ItemList URL Updates (`src/utils/seo.ts` or relevant page)

Update services ItemList schema URLs from anchor links (`/services/#airport`) to the new standalone URLs (`/services/airport-transfers/`).

### FAQ Schema — Homepage

Add FAQPage schema + visible FAQ section to homepage with these questions:
1. What is a livery service?
2. How do I book a ride to Logan Airport?
3. What airports do you serve?
4. Do you offer corporate accounts?
5. Is gratuity included?

FAQ content rendered visibly on-page (required by Google for FAQ schema).

### FAQ Schema — Services Page

Add FAQPage schema + visible FAQ section to services page with service-specific questions.

### Not In Scope

- AggregateRating review count — real-world data issue, not a code fix
- Product/Offer pricing schema — no pricing data available

---

## Files Touched

| File | Changes |
|------|---------|
| `src/data/services.ts` | Rename 3 service slugs |
| `next.config.ts` | Add `redirects()` for old slugs + `/blog/` |
| `src/app/page.tsx` | H1/H2 rewrite, title, meta, FAQ schema, city links section |
| `src/app/home-sections.tsx` | H1/H2 markup change, new city links section, new FAQ section |
| `src/app/services/page.tsx` | Title, meta |
| `src/app/services/services-content.tsx` | H1/H2 rewrite, FAQ section |
| `src/app/fleet/fleet-content.tsx` | H1/H2 rewrite |
| `src/app/fleet/page.tsx` | Meta description |
| `src/app/locations/page.tsx` | H1/H2 rewrite, title, meta |
| `src/app/reviews/page.tsx` | Title, meta |
| `src/app/[city]/page.tsx` | H1/H2 template rewrite, title template, meta template |
| `src/components/layout/Navbar.tsx` | Add Airport Transfers link |
| `src/components/layout/Footer.tsx` | Add Service Areas link |
| `src/utils/seo.ts` | ServiceArea expansion, ItemList URL updates, FAQ schema builder |
| `src/app/sitemap.ts` | Update service slugs if referenced |

---

## Out of Scope (Future Sub-Projects)

- New standalone pages: `/faq/`, `/services/limo-service/`, `/blog/`
- City hub page content expansion (150 -> 400+ words)
- Blog infrastructure and content
- Review generation campaign
- Google Business Profile audit
- Pricing page/schema
