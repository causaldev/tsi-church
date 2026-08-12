import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPastor, getPublishedCollection, mediaUrl } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { BookCard } from '@/components/Cards'
import { ButtonLink } from '@/components/ButtonLink'

type Props = { params: Promise<{ locale: string }> }

export default async function PastorPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [pastor, books] = await Promise.all([
    getPastor(locale as Locale),
    getPublishedCollection('books', locale as Locale, { sort: 'order', limit: 6 }),
  ])

  return (
    <>
      <PageHero title={pastor.name || 'Our Pastor'} description={pastor.title || 'Founder & Senior Pastor'} />
      <section className="container-glic grid gap-12 py-16 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <Image
            src={mediaUrl(pastor.portrait) || '/images/hero.png'}
            alt={pastor.name || ''}
            fill
            className="object-cover object-[70%_center]"
            sizes="(max-width:768px) 100vw, 40vw"
            priority
          />
        </div>
        <div>
          <p className="text-lg leading-relaxed text-ink-muted whitespace-pre-line">{pastor.summary}</p>
        </div>
      </section>
      {books.docs.length > 0 ? (
        <section className="bg-secondary/50 py-16">
          <div className="container-glic">
            <h2 className="text-3xl font-semibold">Books</h2>
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
            <div className="mt-10">
              <ButtonLink href={`/${locale}/media/books`} variant="ghost">
                View books
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
