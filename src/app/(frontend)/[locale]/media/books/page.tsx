import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { BookCard } from '@/components/Cards'

type Props = { params: Promise<{ locale: string }> }

export default async function BooksPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const books = await getPublishedCollection('books', locale as Locale, { sort: 'order' })

  return (
    <>
      <PageHero
        title="Books"
        description="Explore the writings and teachings of Apostle Daniel Makonnen."
      />
      <section className="container-glic py-16">
        <p className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          From the ministry of Apostle Daniel Makonnen
        </p>
        {books.docs.length === 0 ? (
          <p className="text-ink-muted">Books will appear here when published in the admin portal.</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {books.docs.map((book) => (
              <BookCard
                key={book.id}
                href={book.purchaseUrl || book.pdf ? (book.purchaseUrl || '#') : '#'}
                title={book.title}
                author={book.author}
                description={book.description}
                cover={book.cover}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
