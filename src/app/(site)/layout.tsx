import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Intro } from '@/components/layout/Intro'
import { PageTransition } from '@/components/layout/PageTransition'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
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

  // The intro carries one real line: her hero line when there is one, otherwise her title
  const introLine = settings.heroLines.length > 0 ? settings.heroLines.join(' ') : settings.role

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Intro name={settings.name} line={introLine} />
      <SmoothScroll />
      <PageTransition />
      <Header name={settings.name} socials={settings.socials} email={settings.publicEmail ?? null} />
      {/* The page scrolls away to uncover the footer underneath it */}
      <div data-shell className="relative z-10 bg-ink">
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </div>
      <Footer settings={settings} />
      <JsonLd data={person} />
    </>
  )
}