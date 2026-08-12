import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getAboutPage, getPublishedCollection } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { ValueCard } from '@/components/Cards'
import { ButtonLink } from '@/components/ButtonLink'

type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'About | Gospel Light International Church',
}

export default async function AboutPageRoute({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const aboutPromise = getAboutPage(locale as Locale).catch(() => null)
  const milestonesPromise = getPublishedCollection('history-milestones', locale as Locale, { sort: 'order' })
  const missionPromise = getPublishedCollection('mission-items', locale as Locale, { sort: 'order' })
  const valuesPromise = getPublishedCollection('core-values', locale as Locale, { sort: 'order' })
  const [about, milestones, mission, values] = await Promise.all([
    aboutPromise,
    milestonesPromise,
    missionPromise,
    valuesPromise,
  ])

  return (
    <>
      <PageHero
        title={about?.introHeading || 'About Gospel Light'}
        description="Learn who we are, our story, vision, beliefs, and commitment as the founding church and international headquarters."
      />

      <section id="who-we-are" className="scroll-mt-28 bg-white py-16 md:py-20">
        <div className="container-glic max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Who we are</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary-dark md:text-4xl">
            {about?.introHeading || 'About Gospel Light'}
          </h2>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-muted">
            {about?.introBody}
          </p>
          <div className="mt-8">
            <ButtonLink href={`/${locale}/pastor`} variant="ghost">
              Meet our pastor
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-28 bg-secondary/40 py-16 md:py-20">
        <div className="container-glic">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Our history</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary-dark md:text-4xl">The story of Gospel Light</h2>
          {about?.historyIntro ? (
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">{about.historyIntro}</p>
          ) : null}
          <ol className="relative mt-12 space-y-10 border-l border-primary/30 pl-8">
            {milestones.docs.map((m) => (
              <li key={m.id} className="relative">
                <span className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-gold ring-4 ring-secondary" />
                {m.eraLabel ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{m.eraLabel}</p>
                ) : null}
                <h3 className="mt-2 text-2xl font-semibold text-ink">{m.title}</h3>
                <p className="mt-3 max-w-3xl whitespace-pre-line text-ink-muted">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="vision" className="scroll-mt-28">
        <div className="bg-primary py-16 text-white md:py-20">
          <div className="container-glic max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">Our vision</p>
            <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">{about?.visionStatement}</p>
          </div>
        </div>
        <div className="container-glic py-16">
          <h3 className="text-2xl font-semibold text-primary-dark md:text-3xl">Our mission</h3>
          <ol className="mt-8 space-y-5">
            {mission.docs.map((item, i) => (
              <li key={item.id} className="flex gap-5 border-t border-ink/10 pt-5">
                <span className="font-display font-semibold text-gold">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-lg text-ink">{item.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="beliefs" className="scroll-mt-28 bg-white py-16 md:py-20">
        <div className="container-glic">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Beliefs & values</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary-dark md:text-4xl">What we believe</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">{about?.beliefs}</p>
          <h3 className="mt-14 text-2xl font-semibold text-primary-dark">Core values</h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.docs.map((v, i) => (
              <ValueCard key={v.id} index={i + 1} title={v.title} description={v.description} />
            ))}
          </div>
        </div>
      </section>

      <section id="commitment" className="scroll-mt-28 bg-secondary/40 py-16 md:py-20">
        <div className="container-glic max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Our commitment</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary-dark md:text-4xl">As the Mother Church</h2>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-muted">{about?.commitment}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`/${locale}/contact`} variant="ghost">
              Plan a visit
            </ButtonLink>
            <ButtonLink href={`/${locale}/pastor`} variant="ghost">
              Our pastor
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
