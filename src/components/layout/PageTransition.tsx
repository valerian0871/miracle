'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { getLenis, prefersReducedMotion } from '@/lib/motion'

type State = 'idle' | 'cover' | 'reveal'

const COVER_MS = 540
const REVEAL_MS = 520

/**
 * A curtain covers the page while the route changes, then lifts. It handles
 * same-site links to another page; in-page anchors, new tabs, modified
 * clicks and downloads are left to the browser.
 */
export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<State>('idle')
  const pending = useRef<{ path: string; hash: string } | null>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (prefersReducedMotion()) return
      const link = (event.target as Element | null)?.closest('a')
      if (!link || link.target || link.hasAttribute('download')) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return
      if (url.pathname.startsWith('/studio')) return

      event.preventDefault()
      pending.current = { path: url.pathname, hash: url.hash }
      setState('cover')
      window.setTimeout(() => router.push(url.pathname + url.search + url.hash), COVER_MS)
    }
    // Capture phase, so this runs before Next.js's own link handler
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  useEffect(() => {
    if (pending.current === null || pathname !== pending.current.path) return
    const { hash } = pending.current
    pending.current = null
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) getLenis()?.scrollTo(target, { immediate: true, offset: -96 })
    else if (!hash) getLenis()?.scrollTo(0, { immediate: true })
    // Let the new page paint under the curtain before lifting it
    const lift = window.setTimeout(() => setState('reveal'), 60)
    const done = window.setTimeout(() => setState('idle'), 60 + REVEAL_MS)
    return () => {
      window.clearTimeout(lift)
      window.clearTimeout(done)
    }
  }, [pathname])

  return <div className="curtain" data-state={state} aria-hidden="true" />
}
