import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Ministries: CollectionConfig = {
  slug: 'ministries',
  admin: { useAsTitle: 'title' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
