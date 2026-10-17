'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { MENU_IMAGE } from '@/lib/campaigns'
import { getLenis, prefersReducedMotion, smoothHashClick } from '@/lib/motion'
import { NAV } from '@/lib/site'
import type { SocialLink } from '@/sanity/types'
import { SocialLinks } from './SocialLinks'

/** Matches dialog.menu's clip-path transition */
const MENU_MS = 600

type Props = {
  name: string
  socials: SocialLink[]
  email: string | null
}

export function Header({ name, socials, email }: Props) {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const openMenu = () => {
    const dialog = dialogRef.current
    const button = buttonRef.current
    if (!dialog || !button) return
    // The circle grows from the centre of the button that opened it
    const box = button.getBoundingClientRect()
    dialog.style.setProperty('--menu-x', `${box.left + box.width / 2}px`)
    dialog.style.setProperty('--menu-y', `${box.top + box.height / 2}px`)
    dialog.showModal()
    getLenis()?.stop()
    setOpen(true)
    requestAnimationFrame(() => (dialog.dataset.state = 'open'))
  }

  const closeMenu = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog?.open) return
    delete dialog.dataset.state
    setOpen(false)
    getLenis()?.start()
    window.setTimeout(() => dialog.close(), prefersReducedMotion() ? 0 : MENU_MS)
  }, [])

  // Close the menu after navigating to another page
  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  return (
    <>
      <header data-shell className="site-header fixed inset-x-0 top-0 z-50">
        <Container className="flex h-11 items-center justify-between">
          <Link href="/" className="header-mark font-display text-lead font-semibold uppercase" aria-label={`${name}, home`}>
            {name}
          </Link>
          <button
            ref={buttonRef}
            type="button"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="menu-button"
          >
            <span>Menu</span>
            <Icon name="menu" size={20} />
          </button>
        </Container>
      </header>

      <dialog
        ref={dialogRef}
        className="menu"
        aria-label="Menu"
        onCancel={(event) => {
          // Escape: play the closing circle instead of vanishing
          event.preventDefault()
          closeMenu()
        }}
      >
        <div className="flex h-full flex-col">
          <Container className="menu-bar flex h-11 shrink-0 items-center justify-between">
            <span className="font-display text-lead font-semibold uppercase">{name}</span>
            <button type="button" onClick={closeMenu} className="menu-button" aria-label="Close menu">
              <span aria-hidden="true">Close</span>
              <Icon name="close" size={20} />
            </button>
          </Container>

          <nav aria-label="Main" className="min-h-0 flex-1">
            <ul className="menu-cols flex h-full flex-col border-y border-line lg:flex-row">
              {NAV.map((item, index) => {
                const current = item.href === pathname || (item.href === '/#work' && pathname === '/')
                return (
                  <li
                    key={item.href}
                    className="menu-col border-b last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
                    style={{ '--i': index } as CSSProperties}
                  >
                    {item.href === '/#work' ? (
                      <div className="menu-col-media">
                        <Image src={MENU_IMAGE.src} alt="" fill sizes="(min-width: 64rem) 50vw, 100vw" className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
                      </div>
                    ) : null}
                    <Link
                      href={item.href}
                      onClick={(event) => {
                        closeMenu()
                        smoothHashClick(event, item.href)
                      }}
                      aria-current={current && item.href !== '/#work' ? 'page' : undefined}
                      className="relative flex w-full flex-col justify-end gap-2 p-3 md:p-5"
                    >
                      <span className="flex items-center gap-2">
                        <Icon name="arrow-up-right" size={32} className="menu-arrow shrink-0 text-accent" />
                        <span className="relative font-display text-h2 uppercase">
                          <span className="menu-label-outline type-outline text-paper">{item.label}</span>
                          <span className="menu-label-solid absolute inset-0 text-paper">{item.label}</span>
                        </span>
                      </span>
                      <span className="menu-tagline max-w-xs text-small text-paper-2">{item.tagline}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Container className="menu-bar flex min-h-11 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2">
            {email ? (
              <a href={`mailto:${email}`} className="link-line text-small">
                {email}
              </a>
            ) : (
              <span />
            )}
            <SocialLinks links={socials} />
          </Container>
        </div>
      </dialog>
    </>
  )
}
