'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'history', label: 'History' },
  { id: 'vision', label: 'Vision & Mission' },
  { id: 'beliefs', label: 'Beliefs & Values' },
  { id: 'commitment', label: 'Commitment' },
]

export function AboutSectionNav({ locale }: { locale: string }) {
  const [active, setActive] = useState('who-we-are')

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.1, 0.35] },
    )

    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  const items = [
    ...sections.map((section) => ({
      key: section.id,
      href: `#${section.id}`,
      label: section.label,
      isActive: active === section.id,
    })),
    {
      key: 'pastor',
      href: `/${locale}/pastor`,
      label: 'Our Pastor',
      isActive: false,
    },
  ]

  return (
    <div className="bg-white">
      <nav className="container-glic flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-8 md:gap-x-10 md:gap-y-5 md:py-10 lg:gap-x-12">
        {items.map((item, index) => (
          <span key={item.key} className="inline-flex items-center gap-8 md:gap-10 lg:gap-12">
            {index > 0 ? (
              <span className="hidden text-ink/20 sm:inline" aria-hidden>
                ·
              </span>
            ) : null}
            <Link
              href={item.href}
              className={`text-sm tracking-wide transition ${
                item.isActive ? 'font-semibold text-primary' : 'font-medium text-ink/50 hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          </span>
        ))}
      </nav>
    </div>
  )
}
