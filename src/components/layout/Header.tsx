'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { NAV } from '@/lib/site'

export function Header({ name }: { name: string }) {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu after navigating to another page
  useEffect(() => {
    dialogRef.current?.close()
  }, [pathname])

  const openMenu = () => {
    dialogRef.current?.showModal()
    setMenuOpen(true)
  }
  const closeMenu = () => dialogRef.current?.close()

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-(--duration-base) ease-brand ${
          scrolled ? 'border-line bg-ink' : 'border-transparent bg-transparent'
        }`}
      >
        <Container className="flex h-9 items-center justify-between">
          <Link href="/" className="font-display text-lead uppercase" aria-label={`${name}, home`}>
            {name}
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="link-line hidden text-small md:inline">
              Contact
            </Link>
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="btn btn-secondary"
            >
              Menu
            </button>
          </div>
        </Container>
      </header>

      <dialog
        ref={dialogRef}
        className="sheet"
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
      >
        <Container className="flex h-9 items-center justify-between">
          <span className="font-display text-lead uppercase">{name}</span>
          <button type="button" onClick={closeMenu} className="btn btn-secondary">
            Close
          </button>
        </Container>

        <Container className="pt-8">
          <nav aria-label="Main">
            <ul className="divide-y divide-line border-y border-line">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between"
                  >
                    <span className="font-display text-h2 uppercase transition-colors duration-(--duration-base) ease-brand group-hover:text-accent">
                      {item.label}
                    </span>
                    <span className="text-small text-paper-2">{item.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </dialog>
    </>
  )
}