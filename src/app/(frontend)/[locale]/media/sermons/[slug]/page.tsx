import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPayloadClient, mediaUrl } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'sermons',
    locale: locale as Locale,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const sermon = result.docs[0]
  if (!sermon) return { title: 'Sermon' }
  return {
    title: sermon.seo?.title || sermon.title,
    description: sermon.seo?.description || sermon.summary || undefined,
  }
}

export default async function SermonDetailPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'sermons',
    locale: locale as Locale,
    depth: 2,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
  })
  const sermon = result.docs[0]
  if (!sermon) notFound()

  const videoFile = mediaUrl(sermon.video)
  const audioFile = mediaUrl(sermon.audio)
  const embed = sermon.videoEmbedUrl

  return (
    <>
      <PageHero
        title={sermon.title}
        description={[sermon.speaker, sermon.scripture].filter(Boolean).join(' · ') || undefined}
      />
      <section className="container-glic py-16">
        {embed ? (
          <div className="aspect-video overflow-hidden bg-ink">
            <iframe src={embed} title={sermon.title} className="h-full w-full" allowFullScreen />
          </div>
        ) : videoFile ? (
          <video controls className="w-full bg-ink" src={videoFile} poster={mediaUrl(sermon.thumbnail) || undefined} />
        ) : null}
        {audioFile ? (
          <div className="mt-6">
            <audio controls className="w-full" src={audioFile} />
          </div>
        ) : null}
        {sermon.summary ? <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-muted">{sermon.summary}</p> : null}
      </section>
    </>
  )
}
