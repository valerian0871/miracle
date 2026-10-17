'use client'

import Link from 'next/link'
import { useEffect, useRef, type MouseEvent } from 'react'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Mark } from '@/components/ui/Mark'
import { getLenis, smoothHashClick } from '@/lib/motion'
import { NAV } from '@/lib/site'
import type { SiteSettings } from '@/sanity/types'
import { SocialLinks } from './SocialLinks'

/**
 * Sits underneath the page and is uncovered as the last section scrolls
 * away. The mark draws itself once, closing the loop with the intro.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear()
  const markRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = markRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toTop = (event: MouseEvent) => {
    const lenis = getLenis()
    if (!lenis) return
    event.preventDefault()
    lenis.scrollTo(0, { duration: 1.6 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer data-shell className="sticky bottom-0 z-0 bg-ink-raised pb-6 pt-16 md:pt-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div ref={markRef} className="footer-mark w-20 text-accent md:w-28">
              <Mark outline className="w-full" />
            </div>
            <p className="mt-6 font-display text-[clamp(3rem,1.4rem+6.4vw,8rem)] font-semibold uppercase leading-[0.9]">
              {settings.name}
            </p>
            <p className="mt-3 text-lead text-paper-2">{settings.role}</p>
          </div>

          <div className="grid gap-6 text-small sm:grid-cols-2 md:col-span-4 md:grid-cols-1">
            <nav aria-label="Footer">
              <ul className="space-y-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={(event) => smoothHashClick(event, item.href)} className="link-line">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-1">
              {settings.publicEmail ? (
                <p>
                  <a href={`mailto:${settings.publicEmail}`} className="link-line">
                    {settings.publicEmail}
                  </a>
                </p>
              ) : null}
              {settings.availability ? <p className="text-paper-2">{settings.availability}</p> : null}
              <SocialLinks links={settings.socials} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-4 text-caption text-paper-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.name}
          </p>
          {settings.rightsNote ? <p className="max-w-xl">{settings.rightsNote}</p> : null}
          <a href="#main" onClick={toTop} className="arrow-link text-caption text-paper-2">
            Back to top
            <span className="arrow-link-circle size-8">
              <Icon name="arrow-up" size={16} />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  )
}
