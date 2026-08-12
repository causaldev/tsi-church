import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    { name: 'intro', type: 'textarea', localized: true },
  ],
}
