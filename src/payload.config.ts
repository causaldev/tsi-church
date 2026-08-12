import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Sermons } from './collections/Sermons'
import { SermonCategories } from './collections/SermonCategories'
import { Videos } from './collections/Videos'
import { Livestreams } from './collections/Livestreams'
import { Books } from './collections/Books'
import { Events } from './collections/Events'
import { BlogPosts } from './collections/BlogPosts'
import { BlogCategories } from './collections/BlogCategories'
import { Locations } from './collections/Locations'
import { Ministries } from './collections/Ministries'
import { HistoryMilestones } from './collections/HistoryMilestones'
import { CoreValues, MissionItems } from './collections/CoreValues'
import { GalleryItems } from './collections/GalleryItems'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { Pastor } from './globals/Pastor'
import { GivingPage } from './globals/GivingPage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — GLIC Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Sermons,
    SermonCategories,
    Videos,
    Livestreams,
    Books,
    Events,
    BlogPosts,
    BlogCategories,
    Locations,
    Ministries,
    HistoryMilestones,
    CoreValues,
    MissionItems,
    GalleryItems,
  ],
  globals: [SiteSettings, HomePage, AboutPage, Pastor, GivingPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || `file:${path.resolve(dirname, '../data/glic.db')}`,
    },
  }),
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'am', label: 'አማርኛ' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  sharp,
  plugins: [],
})
