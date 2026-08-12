'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { localeLabels, type Locale } from '@/i18n/config'

type NavProps = {
  locale: Locale
  watchLiveUrl?: string | null
}

export function Header({ locale, watchLiveUrl }: NavProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
  const solid = !isHome || scrolled

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const switchLocale = (next: Locale) => {
    const parts = pathname.split('/')
    parts[1] = next
    return parts.join('/') || `/${next}`
  }

  const aboutLinks = [
    { href: `/${locale}/about#who-we-are`, label: 'Who we are' },
    { href: `/${locale}/about#history`, label: t('history') },
    { href: `/${locale}/about#vision`, label: t('vision') },
    { href: `/${locale}/about#beliefs`, label: t('beliefs') },
    { href: `/${locale}/about#commitment`, label: t('commitment') },
    { href: `/${locale}/pastor`, label: t('ourPastor') },
  ]

  const mediaLinks = [
    { href: `/${locale}/media/sermons`, label: t('sermons') },
    { href: `/${locale}/media/videos`, label: t('videos') },
    { href: `/${locale}/media/livestream`, label: t('livestream') },
    { href: `/${locale}/media/books`, label: t('books') },
  ]

  const link = solid
    ? 'text-sm font-medium text-ink/75 transition hover:text-primary'
    : 'text-sm font-medium text-white/90 transition hover:text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid ? 'bg-white shadow-[0_1px_0_rgba(23,35,43,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="container-glic flex h-20 items-center justify-between gap-4 md:h-24">
        <Link href={`/${locale}`} className="flex items-center gap-4 md:gap-5">
          <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full md:h-[52px] md:w-[52px]">
            <Image
              src="/images/logo.png"
              alt="Gospel Light International Church"
              width={52}
              height={52}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span className={`hidden leading-tight sm:block ${solid ? 'text-primary-dark' : 'text-white'}`}>
            <span className="block text-sm font-semibold">Gospel Light</span>
            <span className={`block text-xs ${solid ? 'text-ink-muted' : 'text-white/75'}`}>
              International Church
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
          <Link href={`/${locale}`} className={link}>
            {t('home')}
          </Link>

          <div className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
            <Link href={`/${locale}/about`} className={link}>
              {t('about')}
            </Link>
            {aboutOpen ? (
              <div className="absolute left-0 top-full pt-3">
                <div className="min-w-[13rem] bg-white py-2 shadow-[0_16px_40px_rgba(23,35,43,0.1)]">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-ink/80 transition hover:bg-secondary/70 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Link href={`/${locale}/ministries`} className={link}>
            {t('ministries')}
          </Link>
          <Link href={`/${locale}/locations`} className={link}>
            {t('locations')}
          </Link>

          <div className="relative" onMouseEnter={() => setMediaOpen(true)} onMouseLeave={() => setMediaOpen(false)}>
            <button type="button" className={link}>
              {t('media')}
            </button>
            {mediaOpen ? (
              <div className="absolute left-0 top-full pt-3">
                <div className="min-w-[11rem] bg-white py-2 shadow-[0_16px_40px_rgba(23,35,43,0.1)]">
                  {mediaLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-ink/80 transition hover:bg-secondary/70 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Link href={`/${locale}/events`} className={link}>
            {t('events')}
          </Link>
          <Link href={`/${locale}/blog`} className={link}>
            {t('blog')}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${solid ? 'text-ink/45' : 'text-white/70'}`}>
            <Link href={switchLocale('en')} className={locale === 'en' ? (solid ? 'text-primary' : 'text-white') : 'hover:opacity-80'}>
              {localeLabels.en}
            </Link>
            <span className="opacity-40">|</span>
            <Link href={switchLocale('am')} className={locale === 'am' ? (solid ? 'text-primary' : 'text-white') : 'hover:opacity-80'}>
              {localeLabels.am}
            </Link>
          </div>

          {watchLiveUrl ? (
            <Link
              href={watchLiveUrl}
              className={`hidden text-xs font-semibold uppercase tracking-wider md:inline ${solid ? 'text-ink/70 hover:text-primary' : 'text-white/85 hover:text-white'}`}
            >
              {t('watchLive')}
            </Link>
          ) : null}

          <Link
            href={`/${locale}/give`}
            className="text-xs font-bold uppercase tracking-wider text-gold transition hover:text-gold-soft"
          >
            {t('give')}
          </Link>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 ${solid ? 'bg-ink' : 'bg-white'}`} />
              <span className={`block h-0.5 w-5 ${solid ? 'bg-ink' : 'bg-white'}`} />
              <span className={`block h-0.5 w-5 ${solid ? 'bg-ink' : 'bg-white'}`} />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className={`px-5 pb-8 pt-2 lg:hidden ${solid ? 'bg-white text-ink' : 'bg-primary-deep/95 text-white'}`}>
          <div className="flex flex-col gap-3.5 text-sm">
            <Link href={`/${locale}`} onClick={() => setOpen(false)}>
              {t('home')}
            </Link>
            <Link href={`/${locale}/about`} onClick={() => setOpen(false)}>
              {t('about')}
            </Link>
            {aboutLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="pl-3 opacity-75">
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/ministries`} onClick={() => setOpen(false)}>
              {t('ministries')}
            </Link>
            <Link href={`/${locale}/locations`} onClick={() => setOpen(false)}>
              {t('locations')}
            </Link>
            {mediaLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/events`} onClick={() => setOpen(false)}>
              {t('events')}
            </Link>
            <Link href={`/${locale}/blog`} onClick={() => setOpen(false)}>
              {t('blog')}
            </Link>
            <Link href={`/${locale}/give`} onClick={() => setOpen(false)}>
              {t('give')}
            </Link>
            <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
              {t('contact')}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
