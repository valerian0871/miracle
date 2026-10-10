import type { SiteSettings } from '@/sanity/types'

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export const NAV = [
  { href: '/#work', label: 'Work', tagline: 'Campaigns and the thinking behind them' },
  { href: '/about', label: 'About', tagline: 'Who writes the brief and the lines' },
  { href: '/contact', label: 'Contact', tagline: 'Send a note about a project' },
] as const

/**
 * Used only when no settings document exists yet, so the site still renders
 * before the content is seeded. It contains no invented claims.
 */
export const DEFAULT_SETTINGS: SiteSettings = {
  name: 'Portfolio',
  role: 'Creative strategist and copywriter',
  location: '',
  siteDescription: 'Portfolio of a creative strategist and copywriter.',
  heroLines: [],
  intro: '',
  manifesto: [],
  capabilities: [],
  aboutParagraphs: [],
  experience: [],
  education: [],
  portrait: null,
  publicEmail: null,
  socials: [],
  availability: null,
  rightsNote: null,
}