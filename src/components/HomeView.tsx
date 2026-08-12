import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import {
  getHomePage,
  getPastor,
  getPublishedCollection,
  getSiteSettings,
  mediaUrl,
} from '@/lib/cms'
import { Hero } from '@/components/Hero'
import { ButtonLink } from '@/components/ButtonLink'
import { ScriptureQuote, SectionHeader } from '@/components/Section'
import { BookCard, EventCard, SermonCard, ValueCard } from '@/components/Cards'
import Image from 'next/image'

function formatDate(value?: string | null) {
  if (!value) return null
  try {
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return value
  }
}

export async function HomeView({ locale }: { locale: Locale }) {
  const t = await getTranslations('common')
  const [home, pastor, settings, values, milestones, ministries, sermons, events, books, locations] =
    await Promise.all([
      getHomePage(locale),
      getPastor(locale),
      getSiteSettings(locale),
      getPublishedCollection('core-values', locale, { sort: 'order', limit: 8 }),
      getPublishedCollection('history-milestones', locale, { sort: 'order', limit: 8 }),
      getPublishedCollection('ministries', locale, { sort: 'order', limit: 6 }),
      getPublishedCollection('sermons', locale, { sort: '-date', limit: 3 }),
      getPublishedCollection('events', locale, { sort: 'startDate', limit: 3 }),
      getPublishedCollection('books', locale, { sort: 'order', limit: 3 }),
      getPublishedCollection('locations', locale, { sort: 'order', limit: 4 }),
    ])

  const heroImage = mediaUrl(home.hero?.image) || '/images/hero.png'
  const latestSermon = sermons.docs[0]

  return (
    <>
      <Hero
        locale={locale}
        headline={home.hero?.headline || 'Gospel Light\nInternational Church'}
        subheadline={
          home.hero?.subheadline ||
          'A Christ-centered church shining the light of Christ throughout Ethiopia and the nations.'
        }
        locationLine={home.hero?.locationLine || 'Aware • Addis Ababa • Ethiopia'}
        primaryCtaLabel={home.hero?.primaryCtaLabel}
        primaryCtaHref={home.hero?.primaryCtaHref || `/${locale}/contact`}
        secondaryCtaLabel={home.hero?.secondaryCtaLabel}
        secondaryCtaHref={home.hero?.secondaryCtaHref || `/${locale}/media/sermons`}
        imageUrl={heroImage}
      />

      <section className="border-b border-ink/10 bg-white">
        <div className="container-glic flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              {home.worship?.heading || 'Worship with us'}
            </p>
            <p className="mt-2 text-lg font-medium text-ink">
              {home.worship?.serviceTimes || t('comingSoon')}
            </p>
            <p className="text-sm text-ink-muted">{home.worship?.location || 'Aware, Addis Ababa'}</p>
          </div>
          {home.worship?.directionsUrl ? (
            <ButtonLink href={home.worship.directionsUrl} variant="ghost">
              {home.worship.directionsLabel || t('getDirections')}
            </ButtonLink>
          ) : null}
        </div>
      </section>

      <section className="container-glic grid items-center gap-10 py-20 md:grid-cols-2 md:gap-16">
        <div className="fade-up">
          <SectionHeader
            eyebrow={home.whoWeAre?.eyebrow || 'Who we are'}
            title={home.whoWeAre?.heading || 'A church built on the Word of God'}
            description={home.whoWeAre?.body || undefined}
          />
          <ButtonLink href={home.whoWeAre?.ctaHref || `/${locale}/about`} variant="ghost">
            {home.whoWeAre?.ctaLabel || t('discoverStory')}
          </ButtonLink>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary fade-up-delay">
          <Image
            src={mediaUrl(home.whoWeAre?.image) || '/images/hero.png'}
            alt=""
            fill
            className="object-cover object-right"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-primary-deep py-24 text-white">
        <div className="container-glic">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
            {home.vision?.heading || 'Our vision'}
          </p>
          <p className="mt-8 max-w-4xl font-serif text-3xl leading-snug md:text-4xl">
            {home.vision?.statement}
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(home.vision?.pillars || []).map((pillar, i) => (
              <div key={i} className="border-t border-white/20 pt-4 text-lg font-medium">
                {pillar.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-glic grid items-center gap-10 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <Image
            src={mediaUrl(pastor.portrait) || '/images/hero.png'}
            alt={pastor.name || 'Apostle Daniel Makonnen'}
            fill
            className="object-cover object-[70%_center]"
            sizes="(max-width:768px) 100vw, 45vw"
          />
        </div>
        <div>
          <SectionHeader
            eyebrow="Our Pastor"
            title={pastor.name || 'Apostle Daniel Makonnen'}
            description={pastor.summary || undefined}
          />
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {pastor.title || 'Founder & Senior Pastor'}
          </p>
          <ButtonLink href={`/${locale}/pastor`} variant="ghost">
            {t('readStory')}
          </ButtonLink>
        </div>
      </section>

      {milestones.docs.length > 0 ? (
        <section className="bg-secondary/60 py-20">
          <div className="container-glic">
            <SectionHeader eyebrow="Our history" title="The story of Gospel Light" />
            <ol className="relative space-y-10 border-l border-primary/30 pl-8">
              {milestones.docs.map((m) => (
                <li key={m.id} className="relative">
                  <span className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-secondary" />
                  {m.eraLabel ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{m.eraLabel}</p>
                  ) : null}
                  <h3 className="mt-2 text-2xl font-semibold">{m.title}</h3>
                  <p className="mt-3 max-w-2xl text-ink-muted">{m.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href={`/${locale}/about/history`} variant="ghost">
                {t('learnMore')}
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}

      {ministries.docs.length > 0 ? (
        <section className="container-glic py-20">
          <SectionHeader eyebrow="Ministries" title="Serving the church and the nations" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ministries.docs.map((m) => (
              <article key={m.id} className="border-t border-ink/15 pt-5">
                <h3 className="text-xl font-semibold">{m.title}</h3>
                {m.summary ? <p className="mt-3 text-sm leading-relaxed text-ink-muted">{m.summary}</p> : null}
              </article>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={`/${locale}/ministries`} variant="ghost">
              {t('viewAll')}
            </ButtonLink>
          </div>
        </section>
      ) : null}

      {values.docs.length > 0 ? (
        <section className="bg-white py-20">
          <div className="container-glic">
            <SectionHeader eyebrow="Our values" title="What shapes our life together" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.docs.map((v, i) => (
                <ValueCard key={v.id} index={i + 1} title={v.title} description={v.description} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {latestSermon ? (
        <section className="container-glic py-20">
          <SectionHeader eyebrow="Latest message" title={latestSermon.title} />
          <SermonCard
            href={`/${locale}/media/sermons/${latestSermon.slug}`}
            title={latestSermon.title}
            speaker={latestSermon.speaker}
            date={formatDate(latestSermon.date)}
            scripture={latestSermon.scripture}
            thumbnail={latestSermon.thumbnail}
          />
          <div className="mt-8">
            <ButtonLink href={`/${locale}/media/sermons`} variant="ghost">
              {t('viewAll')}
            </ButtonLink>
          </div>
        </section>
      ) : null}

      {events.docs.length > 0 ? (
        <section className="bg-secondary/50 py-20">
          <div className="container-glic">
            <SectionHeader eyebrow="Events" title="Upcoming gatherings" />
            <div>
              {events.docs.map((e) => (
                <EventCard
                  key={e.id}
                  href={`/${locale}/events`}
                  title={e.title}
                  summary={e.summary}
                  startDate={formatDate(e.startDate)}
                  location={e.location}
                  image={e.image}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {locations.docs.length > 0 ? (
        <section className="container-glic py-20">
          <SectionHeader
            eyebrow="Locations"
            title="Gospel Light around the world"
            description="Find a Gospel Light church near you."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {locations.docs.map((loc) => (
              <div key={loc.id} className="border border-ink/10 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">{loc.region}</p>
                <h3 className="mt-2 text-xl font-semibold">{loc.name}</h3>
                {loc.city ? <p className="mt-1 text-sm text-ink-muted">{loc.city}</p> : null}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href={`/${locale}/locations`} variant="ghost">
              {t('viewAll')}
            </ButtonLink>
          </div>
        </section>
      ) : null}

      {books.docs.length > 0 ? (
        <section className="bg-warm-white py-20">
          <div className="container-glic">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Books</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-ink md:text-4xl">
              From the ministry of Apostle Daniel Makonnen
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {books.docs.map((book) => (
                <BookCard
                  key={book.id}
                  href={`/${locale}/media/books`}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  cover={book.cover}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-glic py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            align="center"
            eyebrow="Give"
            title="Partner with the work of the Kingdom"
            description="Your faithful giving supports evangelism, church planting, leadership development, missions, and community outreach."
          />
          <ScriptureQuote quote="God loves a cheerful giver." reference="2 Corinthians 9:7" />
          <div className="mt-10">
            <ButtonLink href={`/${locale}/give`} variant="ghost">
              Give online
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-glic">
          <ScriptureQuote
            quote={home.scripture?.quote || 'Arise, shine, for your light has come, and the glory of the Lord rises upon you.'}
            reference={home.scripture?.reference || 'Isaiah 60:1'}
          />
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="container-glic flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {home.finalCta?.heading || 'Worship, grow, and serve with us'}
            </h2>
            <p className="mt-4 text-white/80">
              {home.finalCta?.body ||
                settings.tagline ||
                'Whether you are seeking a church family or a deeper relationship with Christ, you are welcome.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={home.finalCta?.primaryHref || `/${locale}/contact`} variant="gold">
              {home.finalCta?.primaryLabel || 'Contact us'}
            </ButtonLink>
            <ButtonLink href={home.finalCta?.secondaryHref || `/${locale}/media/sermons`} variant="secondary">
              {home.finalCta?.secondaryLabel || 'Watch sermons'}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
