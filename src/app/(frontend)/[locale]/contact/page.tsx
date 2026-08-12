import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getContactPage, getSiteSettings } from '@/lib/cms'
import { PageHero } from '@/components/Section'

type Props = { params: Promise<{ locale: string }> }

export default async function ContactPageRoute({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [page, settings] = await Promise.all([
    getContactPage(locale as Locale).catch(() => null),
    getSiteSettings(locale as Locale).catch(() => null),
  ])

  return (
    <>
      <PageHero title={page?.heading || 'Contact us'} description={page?.intro || undefined} />
      <section className="container-glic grid gap-10 py-16 md:grid-cols-2">
        <div className="border border-ink/10 bg-white p-8">
          <h2 className="text-2xl font-semibold">Aware Branch</h2>
          <div className="mt-6 space-y-3 text-ink-muted">
            {settings?.contact?.address ? <p className="whitespace-pre-line">{settings.contact.address}</p> : null}
            {settings?.contact?.phoneHQ ? <p>HQ: {settings.contact.phoneHQ}</p> : null}
            {settings?.contact?.phone ? <p>Phone: {settings.contact.phone}</p> : null}
            {settings?.contact?.fax ? <p>Fax: {settings.contact.fax}</p> : null}
            {settings?.contact?.email ? (
              <a className="block text-primary hover:underline" href={`mailto:${settings.contact.email}`}>
                {settings.contact.email}
              </a>
            ) : null}
          </div>
        </div>
        <div className="border border-ink/10 bg-secondary/40 p-8">
          <h2 className="text-2xl font-semibold">Visit</h2>
          <p className="mt-4 text-ink-muted">
            Gospel Light International Church — Aware Branch, Aware, Addis Ababa, Ethiopia.
          </p>
        </div>
      </section>
    </>
  )
}
