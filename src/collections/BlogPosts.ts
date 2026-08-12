import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { seoFields, slugField } from '../fields'
import { revalidatePublic } from '../hooks/revalidate'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'publishedAt', '_status'] },
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
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'relationship', relationTo: 'blog-categories' },
    { name: 'publishedAt', type: 'date' },
    { name: 'author', type: 'text', localized: true },
    seoFields,
  ],
}
