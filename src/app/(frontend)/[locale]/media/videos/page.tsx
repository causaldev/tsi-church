import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection, mediaUrl } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import Image from 'next/image'
import Link from 'next/link'

type Props = { params: Promise<{ locale: string }> }

export default async function VideosPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const videos = await getPublishedCollection('videos', locale as Locale, { sort: '-publishedAt' })

  return (
    <>
      <PageHero title="Videos" description="Watch teachings, conferences, and ministry moments." />
      <section className="container-glic grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {videos.docs.length === 0 ? (
          <p className="text-ink-muted">Videos will appear here when published in the admin portal.</p>
        ) : (
          videos.docs.map((v) => (
            <article key={v.id} className="group">
              <div className="relative aspect-video overflow-hidden bg-secondary">
                {mediaUrl(v.thumbnail) ? (
                  <Image src={mediaUrl(v.thumbnail)!} alt="" fill className="object-cover" sizes="33vw" />
                ) : null}
              </div>
              <h2 className="mt-4 text-xl font-semibold">{v.title}</h2>
              {v.description ? <p className="mt-2 text-sm text-ink-muted line-clamp-3">{v.description}</p> : null}
              {v.embedUrl ? (
                <Link href={v.embedUrl} className="mt-3 inline-block text-sm font-semibold text-primary">
                  Watch
                </Link>
              ) : null}
            </article>
          ))
        )}
      </section>
    </>
  )
}
