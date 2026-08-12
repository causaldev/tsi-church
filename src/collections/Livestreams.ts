import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const Livestreams: CollectionConfig = {
  slug: 'livestreams',
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
    { name: 'embedUrl', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ended', value: 'ended' },
      ],
    },
    { name: 'startsAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
  ],
}
