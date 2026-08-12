import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { SermonCard } from '@/components/Cards'
import { SermonFilters } from '@/components/SermonFilters'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; category?: string }>
}

function formatDate(value?: string | null) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function SermonsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { q, category } = await searchParams
  setRequestLocale(locale)

  const categories = await getPublishedCollection('sermon-categories', locale as Locale, { limit: 50 })
  const where: Record<string, unknown> = {}
  if (q) {
    where.or = [{ title: { contains: q } }, { scripture: { contains: q } }, { speaker: { contains: q } }]
  }
  if (category) {
    const match = categories.docs.find((c) => c.slug === category)
    if (match) where.category = { equals: match.id }
  }

  const sermons = await getPublishedCollection('sermons', locale as Locale, {
    sort: '-date',
    limit: 50,
    where,
  })

  return (
    <>
      <PageHero
        title="Sermons"
        description="Experience life-changing biblical teaching from Apostle Daniel Makonnen and other pastors."
      />
      <section className="container-glic py-16">
        <Suspense fallback={null}>
          <SermonFilters locale={locale} categories={categories.docs.map((c) => ({ slug: c.slug, title: c.title }))} />
        </Suspense>
        <div className="mt-10 space-y-8">
          {sermons.docs.length === 0 ? (
            <p className="text-ink-muted">Sermons will appear here when published in the admin portal.</p>
          ) : (
            sermons.docs.map((s) => (
              <SermonCard
                key={s.id}
                href={`/${locale}/media/sermons/${s.slug}`}
                title={s.title}
                speaker={s.speaker}
                date={formatDate(s.date)}
                scripture={s.scripture}
                thumbnail={s.thumbnail}
              />
            ))
          )}
        </div>
      </section>
    </>
  )
}
