'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { SplitWords } from '@/components/ui/SplitWords'
import { useScene } from '@/lib/useScene'

/** Her introduction, brought up to full strength word by word as it is read */
export function Lede({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (root, { gsap }) => {
    gsap.fromTo(
      root.querySelectorAll('[data-word]'),
      { opacity: 0.15, y: '0.4em' },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 55%', scrub: true },
      },
    )
  })

  return (
    <section ref={ref} aria-label="Introduction" className="py-20 md:py-32">
      <Container>
        <p className="max-w-[26ch] text-[clamp(1.75rem,1rem+2.6vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.01em] text-balance">
          <SplitWords text={text} />
        </p>
      </Container>
    </section>
  )
}
