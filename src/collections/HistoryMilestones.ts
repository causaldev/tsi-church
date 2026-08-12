import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const HistoryMilestones: CollectionConfig = {
  slug: 'history-milestones',
  admin: { useAsTitle: 'title', defaultColumns: ['order', 'eraLabel', 'title'] },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'eraLabel', type: 'text', localized: true, admin: { description: 'e.g. Early Calling — only use labels from official content; do not invent exact years' } },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'body', type: 'textarea', required: true, localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
  ],
}
