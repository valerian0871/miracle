'use client'

import { useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { prefersReducedMotion } from '@/lib/motion'

export function Manifesto({ lines }: { lines: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    let revert: (() => void) | undefined
    let cancelled = false

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      const context = gsap.context(() => {
        root.querySelectorAll<HTMLElement>('[data-line]').forEach((line) => {
          gsap.fromTo(
            line,
            { opacity: 0.18 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: line, start: 'top 85%', end: 'top 45%', scrub: true },
            },
          )
        })
      }, root)

      revert = () => context.revert()

      // Web fonts change line heights after load, so measure again once they are ready
      void document.fonts?.ready.then(() => ScrollTrigger.refresh())
    })()

    return () => {
      cancelled = true
      revert?.()
    }
  }, [])

  return (
    <section aria-label="Manifesto" className="py-20">
      <Container>
        <div ref={rootRef} className="max-w-6xl space-y-4">
          {lines.map((line, index) => (
            <p key={`${index}-${line}`} data-line className="font-display text-h2 uppercase">
              {line}
            </p>
          ))}
        </div>
      </Container>
    </section>
  )
}