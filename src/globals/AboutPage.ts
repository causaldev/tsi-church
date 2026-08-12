import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidatePublic } from '../hooks/revalidate'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidatePublic] },
  fields: [
    { name: 'introHeading', type: 'text', localized: true },
    { name: 'introBody', type: 'textarea', localized: true },
    { name: 'historyIntro', type: 'textarea', localized: true },
    { name: 'visionStatement', type: 'textarea', localized: true },
    { name: 'beliefs', type: 'textarea', localized: true },
    { name: 'commitment', type: 'textarea', localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
  ],
}
