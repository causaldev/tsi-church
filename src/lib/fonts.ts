import { Cormorant_Garamond, Manrope, Noto_Sans_Ethiopic, Source_Sans_3 } from 'next/font/google'

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
})

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const notoSansEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-sans-ethiopic',
  display: 'swap',
})

export const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-sans-3',
  display: 'swap',
})

export const fontVariables = [
  cormorantGaramond.variable,
  manrope.variable,
  notoSansEthiopic.variable,
  sourceSans3.variable,
].join(' ')
