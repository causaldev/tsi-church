import Image from 'next/image'
import { ButtonLink } from './ButtonLink'

type Props = {
  headline: string
  subheadline?: string | null
  locationLine?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
  imageUrl?: string | null
  locale: string
}

export function Hero({
  headline,
  subheadline,
  locationLine,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageUrl,
  locale,
}: Props) {
  const src = imageUrl || '/images/hero.png'

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-primary-deep text-white">
      <Image
        src={src}
        alt=""
        fill
        priority
        className="object-cover object-[70%_center] md:object-[78%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 via-primary-deep/55 to-primary-deep/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/50 via-transparent to-primary-deep/30" />

      <div className="container-glic relative flex min-h-[100svh] items-end pb-20 pt-32 md:items-center md:pb-0 md:pt-24">
        <div className="max-w-xl fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">Aware Branch</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl text-balance">
            {headline}
          </h1>
          {subheadline ? (
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 md:text-lg fade-up-delay">
              {subheadline}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3 fade-up-delay-2">
            <ButtonLink href={primaryCtaHref || `/${locale}/contact`} variant="gold">
              {primaryCtaLabel || 'Join Us'}
            </ButtonLink>
            <ButtonLink href={secondaryCtaHref || `/${locale}/media/sermons`} variant="secondary">
              {secondaryCtaLabel || 'Watch Sermons'}
            </ButtonLink>
          </div>
          {locationLine ? (
            <p className="mt-8 text-sm uppercase tracking-[0.18em] text-white/70">{locationLine}</p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
