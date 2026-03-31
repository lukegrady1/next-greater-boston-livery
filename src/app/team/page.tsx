import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE_URL } from '@/utils/seo'
import { TeamContent } from './team-content'

export const metadata: Metadata = {
  title: 'Meet the Team | Greater Boston Livery',
  description: 'Meet the people behind Greater Boston Livery — led by founder John Grady, our team has provided premier chauffeured transportation throughout Greater Boston since 2013.',
  alternates: { canonical: `${SITE_URL}/team/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/team/`,
    title: 'Meet the Team | Greater Boston Livery',
    description: 'Meet the people behind Greater Boston Livery — led by founder John Grady, our team has served Greater Boston since 2013.',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    siteName: 'Greater Boston Livery',
  },
}

export default function TeamPage() {
  return <TeamContent />
}
