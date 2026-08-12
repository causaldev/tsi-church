import { getPayload } from 'payload'
import config from '@payload-config'
import type { Locale } from '@/i18n/config'
import { draftMode } from 'next/headers'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getSiteSettings(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', locale, depth: 2 })
}

export async function getHomePage(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-page', locale, depth: 2 })
}

export async function getAboutPage(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'about-page', locale, depth: 2 })
}

export async function getPastor(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'pastor', locale, depth: 2 })
}

export async function getGivingPage(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'giving-page', locale, depth: 1 })
}

export async function getContactPage(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'contact-page', locale })
}

export async function getPublishedCollection(
  collection:
    | 'sermons'
    | 'videos'
    | 'livestreams'
    | 'books'
    | 'events'
    | 'blog-posts'
    | 'locations'
    | 'ministries'
    | 'history-milestones'
    | 'core-values'
    | 'mission-items'
    | 'gallery-items'
    | 'sermon-categories'
    | 'blog-categories',
  locale: Locale,
  options: { limit?: number; sort?: string; where?: Record<string, unknown>; depth?: number } = {},
) {
  const payload = await getPayloadClient()
  const { isEnabled } = await draftMode()
  const draftAware =
    collection === 'sermons' ||
    collection === 'videos' ||
    collection === 'livestreams' ||
    collection === 'books' ||
    collection === 'events' ||
    collection === 'blog-posts'

  return payload.find({
    collection,
    locale,
    depth: options.depth ?? 2,
    limit: options.limit ?? 50,
    sort: options.sort,
    where: {
      ...(draftAware && !isEnabled ? { _status: { equals: 'published' } } : {}),
      ...(options.where || {}),
    },
  })
}

export function mediaUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const m = media as { url?: string | null }
  return m.url || null
}
