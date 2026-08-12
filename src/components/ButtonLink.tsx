import Link from 'next/link'
import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  className?: string
}

const styles = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-sm',
  secondary:
    'bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20 backdrop-blur-sm',
  ghost:
    'bg-transparent text-primary ring-1 ring-primary/30 hover:bg-secondary',
  gold:
    'bg-gold text-ink hover:bg-gold-soft shadow-sm',
}

export function ButtonLink({ href, children, variant = 'primary', className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
