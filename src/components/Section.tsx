import type { ReactNode } from 'react'

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold text-ink md:text-4xl lg:text-[2.75rem] text-balance">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-relaxed text-ink-muted">{description}</p> : null}
    </div>
  )
}

export function ScriptureQuote({ quote, reference }: { quote: string; reference?: string }) {
  return (
    <blockquote className="mx-auto max-w-3xl text-center">
      <p className="font-serif text-3xl leading-snug text-ink md:text-4xl md:leading-snug">“{quote}”</p>
      {reference ? (
        <cite className="mt-6 block text-sm font-semibold uppercase tracking-[0.18em] text-primary not-italic">
          {reference}
        </cite>
      ) : null}
    </blockquote>
  )
}

/** Interior page title — clears fixed nav, left-aligned, taller title band */
export function PageHero({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <div className="bg-white">
      {/* Match fixed header */}
      <div className="h-20 md:h-24" aria-hidden />
      <div className="h-5 md:h-6" aria-hidden />

      <section className="bg-secondary/50 text-ink">
        <div className="container-glic flex min-h-[340px] flex-col justify-center py-24 md:min-h-[420px] md:py-32">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Gospel Light International Church
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-primary-dark md:text-5xl text-balance">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </section>
    </div>
  )
}
