import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPayloadClient } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    locale: locale as Locale,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const post = result.docs[0]
  if (!post) return { title: 'Article' }
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || undefined,
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    locale: locale as Locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
  })
  const post = result.docs[0]
  if (!post) notFound()

  return (
    <>
      <PageHero title={post.title} description={post.excerpt || undefined} />
      <section className="container-glic py-16">
        <article className="prose prose-lg max-w-3xl text-ink-muted">
          <p>{post.excerpt}</p>
        </article>
      </section>
    </>
  )
}
