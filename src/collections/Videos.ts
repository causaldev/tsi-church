import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { seoFields, slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: { useAsTitle: 'title' },
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
    { name: 'description', type: 'textarea', localized: true },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'video', type: 'upload', relationTo: 'media' },
    { name: 'embedUrl', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    seoFields,
  ],
}
