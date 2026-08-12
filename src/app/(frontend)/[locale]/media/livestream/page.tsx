import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection, getSiteSettings } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { ButtonLink } from '@/components/ButtonLink'

type Props = { params: Promise<{ locale: string }> }

export default async function LivestreamMediaPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [settings, livestreams] = await Promise.all([
    getSiteSettings(locale as Locale).catch(() => null),
    getPublishedCollection('livestreams', locale as Locale, { sort: '-startsAt', limit: 10 }),
  ])
  const featured = livestreams.docs.find((l) => l.status === 'live') || livestreams.docs[0]
  const embed = featured?.embedUrl || settings?.watchLiveUrl

  return (
    <>
      <PageHero title="Livestream" description="Join live worship and special gatherings." />
      <section className="container-glic py-16">
        {embed ? (
          <div className="aspect-video overflow-hidden bg-ink">
            <iframe src={embed} title={featured?.title || 'Livestream'} className="h-full w-full" allowFullScreen />
          </div>
        ) : (
          <p className="text-ink-muted">Livestream embeds will appear here when configured in the admin portal.</p>
        )}
        <div className="mt-8">
          <ButtonLink href={`/${locale}/watch-live`} variant="ghost">
            Open Watch Live
          </ButtonLink>
        </div>
        {livestreams.docs.length > 0 ? (
          <ul className="mt-12 space-y-4">
            {livestreams.docs.map((l) => (
              <li key={l.id} className="border-t border-ink/10 pt-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">{l.status}</p>
                <h2 className="mt-1 text-xl font-semibold">{l.title}</h2>
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </>
  )
}
