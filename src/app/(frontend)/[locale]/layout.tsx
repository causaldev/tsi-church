import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { locales, type Locale } from '@/i18n/config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/cms'
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
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=Noto+Sans+Ethiopic:wght@400;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body"
        style={{
          fontFamily:
            locale === 'am'
              ? '"Noto Sans Ethiopic", "Source Sans 3", system-ui, sans-serif'
              : '"Source Sans 3", "Noto Sans Ethiopic", system-ui, sans-serif',
        }}
      >
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
