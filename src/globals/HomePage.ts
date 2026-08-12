import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', localized: true },
        { name: 'subheadline', type: 'textarea', localized: true },
        { name: 'locationLine', type: 'text', localized: true },
        { name: 'primaryCtaLabel', type: 'text', localized: true },
        { name: 'primaryCtaHref', type: 'text' },
        { name: 'secondaryCtaLabel', type: 'text', localized: true },
        { name: 'secondaryCtaHref', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'worship',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'serviceTimes', type: 'text', localized: true, admin: { description: 'Leave blank until official times are provided' } },
        { name: 'location', type: 'text', localized: true },
        { name: 'directionsUrl', type: 'text' },
        { name: 'directionsLabel', type: 'text', localized: true },
      ],
    },
    {
      name: 'whoWeAre',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaHref', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'vision',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'statement', type: 'textarea', localized: true },
        {
          name: 'pillars',
          type: 'array',
          fields: [{ name: 'label', type: 'text', localized: true }],
        },
      ],
    },
    {
      name: 'scripture',
      type: 'group',
      fields: [
        { name: 'quote', type: 'textarea', localized: true },
        { name: 'reference', type: 'text', localized: true },
      ],
    },
    {
      name: 'finalCta',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
        { name: 'primaryLabel', type: 'text', localized: true },
        { name: 'primaryHref', type: 'text' },
        { name: 'secondaryLabel', type: 'text', localized: true },
        { name: 'secondaryHref', type: 'text' },
      ],
    },
  ],
}
