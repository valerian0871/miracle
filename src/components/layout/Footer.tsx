import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { NAV } from '@/lib/site'
import type { SiteSettings } from '@/sanity/types'
import { SocialLinks } from './SocialLinks'

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-line py-10">
      <Container>
        <p className="font-display text-h2 uppercase">{settings.name}</p>
        <p className="mt-2 max-w-xl text-lead text-paper-2">{settings.role}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <nav aria-label="Footer">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line text-small">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-1 text-small">
            {settings.publicEmail ? (
              <p>
                <a href={`mailto:${settings.publicEmail}`} className="link-line">
                  {settings.publicEmail}
                </a>
              </p>
            ) : (
              <p>
                <Link href="/contact" className="link-line">
                  Send a message
                </Link>
              </p>
            )}
            {settings.availability ? <p className="text-paper-2">{settings.availability}</p> : null}
          </div>

          <SocialLinks links={settings.socials} />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-4 text-caption text-paper-3 md:flex-row md:justify-between">
          <p>
            © {year} {settings.name}
          </p>
          {settings.rightsNote ? <p className="max-w-xl">{settings.rightsNote}</p> : null}
        </div>
      </Container>
    </footer>
  )
}