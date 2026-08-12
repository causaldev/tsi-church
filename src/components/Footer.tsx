import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/config'

type Props = {
  locale: Locale
  churchName?: string | null
  tagline?: string | null
  contact?: {
    address?: string | null
    phoneHQ?: string | null
    phone?: string | null
    email?: string | null
  } | null
  social?: {
    youtube?: string | null
    facebook?: string | null
    instagram?: string | null
  } | null
}

export async function Footer({ locale, churchName, tagline, contact, social }: Props) {
  const t = await getTranslations('footer')
  const nav = await getTranslations('nav')

  const links = [
    { href: `/${locale}/about`, label: nav('about') },
    { href: `/${locale}/pastor`, label: nav('ourPastor') },
    { href: `/${locale}/ministries`, label: nav('ministries') },
    { href: `/${locale}/locations`, label: nav('locations') },
    { href: `/${locale}/media/sermons`, label: nav('sermons') },
    { href: `/${locale}/events`, label: nav('events') },
    { href: `/${locale}/blog`, label: nav('blog') },
    { href: `/${locale}/give`, label: nav('give') },
    { href: `/${locale}/contact`, label: nav('contact') },
  ]

  return (
    <footer className="bg-primary-deep text-white">
      <div className="container-glic grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
            <div>
              <p className="font-display text-lg font-semibold">{churchName || 'Gospel Light International Church'}</p>
              <p className="text-sm text-white/70">Aware Branch</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
            {tagline ||
              'A Christ-centered church shining the light of Christ throughout Ethiopia and the nations.'}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-mid">{t('quickLinks')}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-mid">{t('contact')}</h3>
          <div className="mt-4 space-y-2 text-sm text-white/80">
            {contact?.address ? <p className="whitespace-pre-line">{contact.address}</p> : null}
            {contact?.phoneHQ ? <p>HQ: {contact.phoneHQ}</p> : null}
            {contact?.phone ? <p>{contact.phone}</p> : null}
            {contact?.email ? (
              <a href={`mailto:${contact.email}`} className="block hover:text-white">
                {contact.email}
              </a>
            ) : null}
          </div>
          <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-secondary-mid">{t('follow')}</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {social?.youtube ? <a href={social.youtube} className="hover:text-gold">YouTube</a> : null}
            {social?.facebook ? <a href={social.facebook} className="hover:text-gold">Facebook</a> : null}
            {social?.instagram ? <a href={social.instagram} className="hover:text-gold">Instagram</a> : null}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-glic flex flex-col gap-2 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {t('rights')}</p>
          <p>Aware, Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </footer>
  )
}
