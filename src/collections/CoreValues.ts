import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const CoreValues: CollectionConfig = {
  slug: 'core-values',
  admin: { useAsTitle: 'title', defaultColumns: ['order', 'title'] },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
  ],
}

export const MissionItems: CollectionConfig = {
  slug: 'mission-items',
  admin: { useAsTitle: 'title', defaultColumns: ['order', 'title'] },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
  ],
}
