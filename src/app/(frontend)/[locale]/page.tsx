import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { HomeView } from '@/components/HomeView'
import { getHomePage } from '@/lib/cms'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  try {
    const home = await getHomePage(locale as Locale)
    return {
      title: home.hero?.headline?.replace(/\n/g, ' ') || 'Gospel Light International Church',
      description:
        home.hero?.subheadline ||
        'A Christ-centered church shining the light of Christ throughout Ethiopia and the nations.',
      alternates: {
        languages: { en: '/en', am: '/am' },
      },
    }
  } catch {
    return { title: 'Gospel Light International Church' }
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomeView locale={locale as Locale} />
}
