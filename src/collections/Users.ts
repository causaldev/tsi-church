import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: authenticatedAdmin,
    create: async ({ req }) => {
      if (req.user) return true
      const users = await req.payload.find({ collection: 'users', limit: 0 })
      return users.totalDocs === 0
    },
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
    },
  ],
}
