import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: { useAsTitle: 'title' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
