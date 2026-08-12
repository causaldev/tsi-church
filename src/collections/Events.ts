import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { seoFields, slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'startDate', '_status'] },
  versions: { drafts: true },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'startDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endDate', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'location', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    seoFields,
  ],
}
