'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function SermonFilters({
  locale,
  categories,
}: {
  locale: string
  categories: { slug: string; title: string }[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()
  const active = searchParams.get('category') || ''

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    startTransition(() => {
      router.push(`/${locale}/media/sermons?${params.toString()}`)
    })
  }

  return (
    <div className={`space-y-4 ${pending ? 'opacity-70' : ''}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = new FormData(e.currentTarget)
          update('q', String(form.get('q') || ''))
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          name="q"
          defaultValue={searchParams.get('q') || ''}
          placeholder="Search sermons..."
          className="w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <button type="submit" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-white">
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => update('category', '')}
          className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${!active ? 'bg-primary text-white' : 'bg-secondary text-ink'}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => update('category', c.slug)}
            className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${active === c.slug ? 'bg-primary text-white' : 'bg-secondary text-ink'}`}
          >
            {c.title}
          </button>
        ))}
      </div>
    </div>
  )
}
