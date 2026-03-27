import type { Metadata } from 'next'
import {
  buildReviewPageSchema,
  buildBreadcrumbSchema,
  schemaToString,
  SITE_URL,
  OG_IMAGE_URL,
} from '@/utils/seo'
import { reviews } from '@/data/reviews'
import { ReviewsContent } from './reviews-content'

const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

const reviewDateMap: Record<string, string> = {
  '1': '2023-06-01',
  '2': '2024-10-01',
  '3': '2024-09-01',
  '4': '2024-08-01',
  '5': '2024-07-01',
  '6': '2024-06-01',
  '7': '2024-05-01',
  '8': '2024-04-01',
}

export const metadata: Metadata = {
  title: 'Client Reviews | 5-Star Chauffeured Service Boston | Greater Boston Livery',
  description: `Greater Boston Livery has earned a perfect ${avgRating}-star rating from ${reviews.length} verified clients. Read reviews from corporate executives, wedding couples, and frequent travelers.`,
  alternates: { canonical: `${SITE_URL}/reviews` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/reviews`,
    title: `${avgRating}-Star Reviews | Greater Boston Livery`,
    description: `${reviews.length} verified 5-star reviews from corporate executives, wedding couples, and travelers. Boston's premier chauffeured service.`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
}

export default function ReviewsPage() {
  const reviewSchema = schemaToString(
    buildReviewPageSchema(
      reviews.map((r) => ({
        author: r.author,
        rating: r.rating,
        text: r.text,
        datePublished: reviewDateMap[r.id] ?? '2024-01-01',
      })),
      avgRating,
      reviews.length
    )
  )

  const reviewsBreadcrumb = schemaToString(
    buildBreadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Reviews', href: '/reviews' },
    ])
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: reviewSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: reviewsBreadcrumb }} />
      <ReviewsContent />
    </>
  )
}
