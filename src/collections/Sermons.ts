import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { seoFields, slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Sermons: CollectionConfig = {
  slug: 'sermons',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'speaker', 'date', '_status'] },
  versions: { drafts: true },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidatePublic],
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    { name: 'speaker', type: 'text', localized: true, defaultValue: 'Apostle Daniel Makonnen' },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'scripture', type: 'text', localized: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'sermon-categories',
    },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'video', type: 'upload', relationTo: 'media' },
    { name: 'videoEmbedUrl', type: 'text', admin: { description: 'YouTube or Vimeo URL (preferred for large files)' } },
    { name: 'audio', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    seoFields,
  ],
}
