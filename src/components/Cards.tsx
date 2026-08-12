import Image from 'next/image'
import Link from 'next/link'
import { mediaUrl } from '@/lib/cms'

export function SermonCard({
  href,
  title,
  speaker,
  date,
  scripture,
  thumbnail,
}: {
  href: string
  title: string
  speaker?: string | null
  date?: string | null
  scripture?: string | null
  thumbnail?: unknown
}) {
  const img = mediaUrl(thumbnail)
  return (
    <Link href={href} className="group block overflow-hidden border-b border-ink/10 pb-6 transition hover:border-primary/40">
      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        <div className="relative aspect-video overflow-hidden bg-secondary">
          {img ? (
            <Image src={img} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="220px" />
          ) : (
            <div className="flex h-full items-center justify-center bg-primary/10 text-xs uppercase tracking-widest text-primary">Sermon</div>
          )}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{date}</p>
          <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
          {speaker ? <p className="mt-2 text-sm text-ink-muted">{speaker}</p> : null}
          {scripture ? <p className="mt-2 text-sm text-ink-muted">{scripture}</p> : null}
        </div>
      </div>
    </Link>
  )
}

export function BookCard({
  href,
  title,
  author,
  description,
  cover,
}: {
  href: string
  title: string
  author?: string | null
  description?: string | null
  cover?: unknown
}) {
  const img = mediaUrl(cover)
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary shadow-md transition duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
        {img ? (
          <Image src={img} alt="" fill className="object-cover" sizes="280px" />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-primary">{title}</div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {author ? <p className="mt-1 text-sm text-ink-muted">{author}</p> : null}
      {description ? <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{description}</p> : null}
    </Link>
  )
}

export function EventCard({
  href,
  title,
  summary,
  startDate,
  location,
  image,
}: {
  href: string
  title: string
  summary?: string | null
  startDate?: string | null
  location?: string | null
  image?: unknown
}) {
  const img = mediaUrl(image)
  return (
    <Link href={href} className="group grid gap-4 border-b border-ink/10 py-6 md:grid-cols-[180px_1fr]">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {img ? <Image src={img} alt="" fill className="object-cover" sizes="180px" /> : null}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{startDate}</p>
        <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
        {location ? <p className="mt-1 text-sm text-ink-muted">{location}</p> : null}
        {summary ? <p className="mt-2 text-sm text-ink-muted line-clamp-2">{summary}</p> : null}
      </div>
    </Link>
  )
}

export function LocationCard({
  name,
  city,
  region,
  description,
  mapUrl,
  image,
}: {
  name: string
  city?: string | null
  region?: string | null
  description?: string | null
  mapUrl?: string | null
  image?: unknown
}) {
  const img = mediaUrl(image)
  return (
    <article className="overflow-hidden border border-ink/10 bg-white">
      <div className="relative aspect-[16/10] bg-secondary">
        {img ? <Image src={img} alt="" fill className="object-cover" sizes="400px" /> : null}
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{region}</p>
        <h3 className="mt-2 text-xl font-semibold">{name}</h3>
        {city ? <p className="mt-1 text-sm text-ink-muted">{city}</p> : null}
        {description ? <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p> : null}
        {mapUrl ? (
          <a href={mapUrl} className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            Get directions
          </a>
        ) : null}
      </div>
    </article>
  )
}

export function BlogCard({
  href,
  title,
  excerpt,
  publishedAt,
  image,
}: {
  href: string
  title: string
  excerpt?: string | null
  publishedAt?: string | null
  image?: unknown
}) {
  const img = mediaUrl(image)
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {img ? (
          <Image src={img} alt="" fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="400px" />
        ) : null}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{publishedAt}</p>
      <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
      {excerpt ? <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{excerpt}</p> : null}
    </Link>
  )
}

export function ValueCard({ index, title, description }: { index: number; title: string; description?: string | null }) {
  return (
    <article className="border-t border-ink/15 pt-5">
      <p className="font-display text-sm font-semibold text-gold">{String(index).padStart(2, '0')}</p>
      <h3 className="mt-2 text-xl font-semibold uppercase tracking-wide">{title}</h3>
      {description ? <p className="mt-2 text-sm text-ink-muted">{description}</p> : null}
    </article>
  )
}
