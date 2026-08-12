import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const GivingPage: GlobalConfig = {
  slug: 'giving-page',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'scriptureQuote', type: 'textarea', localized: true },
    { name: 'scriptureReference', type: 'text', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text', admin: { description: 'External giving URL when available' } },
    {
      name: 'supports',
      type: 'array',
      fields: [{ name: 'item', type: 'text', localized: true }],
    },
  ],
}
