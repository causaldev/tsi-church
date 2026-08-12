import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { seoFields, slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Books: CollectionConfig = {
  slug: 'books',
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
    { name: 'author', type: 'text', defaultValue: 'Apostle Daniel Makonnen', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'pdf', type: 'upload', relationTo: 'media' },
    { name: 'purchaseUrl', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
    seoFields,
  ],
}
