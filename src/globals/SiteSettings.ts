import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'churchName', type: 'text', localized: true, required: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'watchLiveUrl', type: 'text' },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'address', type: 'textarea', localized: true },
        { name: 'phoneHQ', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'fax', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'youtube', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
  ],
}
