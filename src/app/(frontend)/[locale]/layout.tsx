import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { locales, type Locale } from '@/i18n/config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/cms'
import { fontVariables } from '@/lib/fonts'
import '../styles.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  if (!locales.includes(localeParam as Locale)) notFound()
  const locale = localeParam as Locale
  setRequestLocale(locale)
  const messages = await getMessages()
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null
  try {
    settings = await getSiteSettings(locale)
  } catch {
    settings = null
  }

  return (
    <html lang={locale} data-locale={locale} className={fontVariables}>
      <body className="font-body">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} watchLiveUrl={settings?.watchLiveUrl} />
          <main>{children}</main>
          <Footer
            locale={locale}
            churchName={settings?.churchName}
            tagline={settings?.tagline}
            contact={settings?.contact}
            social={settings?.social}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
