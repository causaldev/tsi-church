import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: { useAsTitle: 'name' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    slugField('name'),
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'Ethiopia', value: 'ethiopia' },
        { label: 'International', value: 'international' },
      ],
    },
    { name: 'city', type: 'text', localized: true },
    { name: 'address', type: 'textarea', localized: true },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'mapUrl', type: 'text' },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
