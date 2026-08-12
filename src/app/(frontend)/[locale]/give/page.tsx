import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getGivingPage } from '@/lib/cms'
import { PageHero, ScriptureQuote } from '@/components/Section'
import { ButtonLink } from '@/components/ButtonLink'

type Props = { params: Promise<{ locale: string }> }

export default async function GivePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const giving = await getGivingPage(locale as Locale).catch(() => null)

  return (
    <>
      <PageHero title={giving?.heading || 'Give'} description={giving?.body || undefined} />
      <section className="container-glic py-16">
        <div className="mx-auto max-w-3xl text-center">
          <ScriptureQuote
            quote={giving?.scriptureQuote || 'God loves a cheerful giver.'}
            reference={giving?.scriptureReference || '2 Corinthians 9:7'}
          />
          {giving?.supports && giving.supports.length > 0 ? (
            <ul className="mt-12 grid gap-4 text-left sm:grid-cols-2">
              {giving.supports.map((s, i) => (
                <li key={i} className="border-t border-ink/10 pt-4 text-ink-muted">
                  {s.item}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-12">
            {giving?.ctaUrl ? (
              <ButtonLink href={giving.ctaUrl} variant="ghost">
                {giving.ctaLabel || 'Give online'}
              </ButtonLink>
            ) : (
              <p className="text-sm text-ink-muted">
                Online giving details will be published here when available. Contact the church office to give.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
