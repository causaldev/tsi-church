import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const Pastor: GlobalConfig = {
  slug: 'pastor',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'name', type: 'text', localized: true, required: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'summary', type: 'textarea', localized: true },
    { name: 'biography', type: 'richText', localized: true },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
  ],
}
