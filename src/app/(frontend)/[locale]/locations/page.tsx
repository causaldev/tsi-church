import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { LocationCard } from '@/components/Cards'

type Props = { params: Promise<{ locale: string }> }

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const locations = await getPublishedCollection('locations', locale as Locale, {
    sort: 'order',
    limit: 100,
  })
  const ethiopia = locations.docs.filter((l) => l.region === 'ethiopia')
  const international = locations.docs.filter((l) => l.region === 'international')

  return (
    <>
      <PageHero
        title="Gospel Light around the world"
        description="Find a Gospel Light church near you across Ethiopia and internationally."
      />
      <section className="container-glic py-16">
        {locations.docs.length === 0 ? (
          <p className="text-ink-muted">Locations will appear here when published in the admin portal.</p>
        ) : (
          <>
            <p className="mb-10 text-sm text-ink-muted">
              Showing {locations.docs.length} location{locations.docs.length === 1 ? '' : 's'}
            </p>

            {ethiopia.length > 0 ? (
              <div className="mb-16">
                <h2 className="text-2xl font-semibold text-primary-dark">Ethiopia</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {ethiopia.map((loc) => (
                    <LocationCard
                      key={loc.id}
                      name={loc.name}
                      city={loc.city}
                      region="Ethiopia"
                      description={loc.description}
                      mapUrl={loc.mapUrl}
                      image={loc.image}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {international.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-primary-dark">International</h2>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {international.map((loc) => (
                    <LocationCard
                      key={loc.id}
                      name={loc.name}
                      city={loc.city}
                      region="International"
                      description={loc.description}
                      mapUrl={loc.mapUrl}
                      image={loc.image}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>
    </>
  )
}
