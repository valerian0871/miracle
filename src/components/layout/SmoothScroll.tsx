'use client'

import { useEffect } from 'react'
import { isIntroRunning, loadGsap, prefersReducedMotion, setLenis } from '@/lib/motion'

/** How close to a pinned scene's edge, as a share of its length, before it snaps there */
const SNAP_EDGE = 0.14

/**
 * Smooth wheel scrolling with Lenis, driven by GSAP's ticker so scroll scenes
 * and the scroll position update in the same frame. Off for reduced motion,
 * where the browser's own scrolling is used.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import('lenis'),
        loadGsap(),
      ])
      if (cancelled) return

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -96 } })
      setLenis(lenis)
      if (isIntroRunning()) lenis.stop()

      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      // Stop a pinned scene being left half-played: once scrolling rests near
      // either end of a pin, finish the move to that end.
      let idle: number | undefined
      let snapping = false
      const snap = () => {
        if (snapping) return
        const y = window.scrollY
        for (const el of document.querySelectorAll<HTMLElement>('[data-pin-start]')) {
          const start = Number(el.dataset.pinStart)
          const end = Number(el.dataset.pinEnd)
          if (!(end > start) || y <= start + 4 || y >= end - 4) continue
          const progress = (y - start) / (end - start)
          const target = progress < SNAP_EDGE ? start : progress > 1 - SNAP_EDGE ? end : null
          if (target !== null) {
            snapping = true
            lenis.scrollTo(target, { duration: 0.5, onComplete: () => (snapping = false) })
          }
          return
        }
      }
      const onScroll = () => {
        window.clearTimeout(idle)
        idle = window.setTimeout(snap, 90)
      }
      lenis.on('scroll', onScroll)

      // Start once the intro has finished
      const observer = new MutationObserver(() => {
        if (!isIntroRunning()) lenis.start()
      })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] })

      cleanup = () => {
        observer.disconnect()
        window.clearTimeout(idle)
        gsap.ticker.remove(tick)
        lenis.destroy()
        setLenis(null)
      }
    })()

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return null
}
