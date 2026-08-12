import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const paths = [
  '',
  '/about',
  '/about/history',
  '/about/vision',
  '/about/beliefs-values',
  '/about/commitment',
  '/pastor',
  '/ministries',
  '/locations',
  '/media/sermons',
  '/media/videos',
  '/media/livestream',
  '/media/books',
  '/events',
  '/blog',
  '/give',
  '/contact',
  '/watch-live',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const locale of ['en', 'am']) {
    for (const path of paths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${base}/en${path}`,
            am: `${base}/am${path}`,
          },
        },
      })
    }
  }
  return entries
}
