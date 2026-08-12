import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { EventCard } from '@/components/Cards'

type Props = { params: Promise<{ locale: string }> }

function formatDate(value?: string | null) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const events = await getPublishedCollection('events', locale as Locale, { sort: 'startDate' })

  return (
    <>
      <PageHero title="Events" description="Gatherings, conferences, and church life." />
      <section className="container-glic py-16">
        {events.docs.length === 0 ? (
          <p className="text-ink-muted">Events will appear here when published in the admin portal.</p>
        ) : (
          events.docs.map((e) => (
            <EventCard
              key={e.id}
              href={`/${locale}/events`}
              title={e.title}
              summary={e.summary}
              startDate={formatDate(e.startDate)}
              location={e.location}
              image={e.image}
            />
          ))
        )}
      </section>
    </>
  )
}
