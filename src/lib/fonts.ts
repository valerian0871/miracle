import { Barlow_Condensed, Source_Sans_3 } from 'next/font/google'

/*
  Yoruba needs more than basic Latin. Letters such as ẹ, ọ and ṣ, and tone marks
  stacked on them, sit in the Latin Extended and Vietnamese ranges, so all three
  subsets are loaded. Both families publish those subsets on Google Fonts.
*/
export const displayFont = Barlow_Condensed({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

export const bodyFont = Source_Sans_3({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-source',
  display: 'swap',
})