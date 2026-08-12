import type { Field } from 'payload'

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return value
        const source = data?.[fieldToUse]
        if (typeof source === 'string') {
          return source
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return value
      },
    ],
  },
})

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
