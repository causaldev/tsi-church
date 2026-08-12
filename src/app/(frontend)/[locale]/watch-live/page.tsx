import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection, getSiteSettings } from '@/lib/cms'
import { PageHero } from '@/components/Section'

type Props = { params: Promise<{ locale: string }> }

export default async function WatchLivePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [settings, livestreams] = await Promise.all([
    getSiteSettings(locale as Locale).catch(() => null),
    getPublishedCollection('livestreams', locale as Locale, { sort: '-startsAt', limit: 5 }),
  ])
  const live = livestreams.docs.find((l) => l.status === 'live') || livestreams.docs[0]
  const embed = live?.embedUrl || settings?.watchLiveUrl

  return (
    <>
      <PageHero title="Watch Live" description="Join worship and teachings as they are streamed." />
      <section className="container-glic py-16">
        {embed ? (
          <div className="aspect-video overflow-hidden bg-ink">
            <iframe
              src={embed}
              title={live?.title || 'Livestream'}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-ink-muted">Livestream details will appear here when published in the admin portal.</p>
        )}
      </section>
    </>
  )
}
