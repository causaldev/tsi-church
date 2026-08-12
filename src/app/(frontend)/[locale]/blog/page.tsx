import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { getPublishedCollection } from '@/lib/cms'
import { PageHero } from '@/components/Section'
import { BlogCard } from '@/components/Cards'

type Props = { params: Promise<{ locale: string }> }

function formatDate(value?: string | null) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const posts = await getPublishedCollection('blog-posts', locale as Locale, { sort: '-publishedAt' })

  return (
    <>
      <PageHero
        title="Blog"
        description="Biblical articles, devotionals, leadership insights, Christian living resources, and church news."
      />
      <section className="container-glic grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-3">
        {posts.docs.length === 0 ? (
          <p className="text-ink-muted">Articles will appear here when published in the admin portal.</p>
        ) : (
          posts.docs.map((post) => (
            <BlogCard
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              title={post.title}
              excerpt={post.excerpt}
              publishedAt={formatDate(post.publishedAt)}
              image={post.featuredImage}
            />
          ))
        )}
      </section>
    </>
  )
}
