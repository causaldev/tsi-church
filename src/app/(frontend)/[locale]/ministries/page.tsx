import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection, mediaUrl } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import Image from 'next/image'

type Props = { params: Promise<{ locale: string }> }

export default async function MinistriesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const ministries = await getPublishedCollection('ministries', locale as Locale, { sort: 'order' })

  return (
    <>
      <PageHero
        title="Ministries"
        description="Every ministry we undertake is centered on the Word of God and empowered by the Holy Spirit."
      />
      <section className="container-glic grid gap-10 py-16 md:grid-cols-2">
        {ministries.docs.length === 0 ? (
          <p className="text-ink-muted">Ministry details will appear here when published in the admin portal.</p>
        ) : (
          ministries.docs.map((m) => (
            <article key={m.id} className="overflow-hidden border border-ink/10 bg-white">
              <div className="relative aspect-[16/10] bg-secondary">
                {mediaUrl(m.image) ? (
                  <Image src={mediaUrl(m.image)!} alt="" fill className="object-cover" sizes="50vw" />
                ) : null}
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold">{m.title}</h2>
                {m.summary ? <p className="mt-4 text-ink-muted leading-relaxed">{m.summary}</p> : null}
              </div>
            </article>
          ))
        )}
      </section>
    </>
  )
}
