import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  admin: { useAsTitle: 'title' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
}
