import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Intro } from '@/components/layout/Intro'
import { JsonLd } from '@/components/ui/JsonLd'
import { siteUrl } from '@/lib/site'
import { getSettings } from '@/sanity/data'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0d0e0d',
  colorScheme: 'dark',
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const title = `${settings.name}, ${settings.role}`
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${settings.name}` },
    description: settings.siteDescription,
    openGraph: {
      type: 'website',
      siteName: settings.name,
      locale: 'en_GB',
      title,
      description: settings.siteDescription,
    },
    twitter: { card: 'summary_large_image', title, description: settings.siteDescription },
  }
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings()
  const sameAs = settings.socials.map((link) => link.url)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    jobTitle: settings.role,
    url: siteUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Intro name={settings.name} role={settings.role} />
      <Header name={settings.name} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <JsonLd data={person} />
    </>
  )
}