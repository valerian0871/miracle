'use client'

import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Mark } from '@/components/ui/Mark'
import { SCRUB, setRootFlag, smoothHashClick } from '@/lib/motion'
import { markPin, useScene } from '@/lib/useScene'
import { Ticker } from './Ticker'

type Props = {
  name: string
  lines: string[]
  role: string
  location: string
  hasWork: boolean
}

const step = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero({ name, lines, role, location, hasWork }: Props) {
  const ref = useRef<HTMLElement>(null)

  // Her line is the headline when she has written one; otherwise her name is
  const headline = lines.length > 0 ? lines : name.split(' ')
  const city = location.split(',')[0]?.trim()
  const ticker = [city, 'Strategy', 'Copy', 'Concepts', 'English and Yorùbá'].filter(Boolean) as string[]

  useScene(ref, (root, { gsap }) => {
    setRootFlag('hero', 'visible')
    const timeline = gsap.timeline({
      defaults: { ease: 'expo.in' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: '+=100%',
        scrub: SCRUB,
        pin: true,
        onRefresh: (self) => markPin(root, self.start, self.end),
        // The header wordmark takes over once the name has left the screen
        onUpdate: (self) => setRootFlag('hero', self.progress > 0.6 ? null : 'visible'),
      },
    })
    timeline
      .to('[data-hero-copy]', { yPercent: -40, autoAlpha: 0, duration: 0.5 }, 0)
      .to('[data-hero-meta]', { yPercent: 60, autoAlpha: 0, duration: 0.4 }, 0)
      .to('[data-hero-mark]', { scale: 40, rotation: 150, duration: 0.85 }, 0.05)
      .to('[data-hero-veil]', { opacity: 1, ease: 'none', duration: 0.3 }, 0.7)
    return () => setRootFlag('hero', null)
  })

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-6 pt-14" aria-labelledby="hero-title">
      <div className="grain" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center md:place-items-end md:justify-items-end md:pb-[18vh] md:pr-[8vw]">
        <div data-hero-mark className="w-[42vw] max-w-[28rem] text-accent md:w-[24vw]">
          <Mark className="fade-up w-full" />
        </div>
      </div>
      <div data-hero-veil className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

      <Container className="relative">
        <h1 id="hero-title" data-hero-copy className="max-w-[14ch]">
          {headline.map((line, index) => (
            <span key={`${index}-${line}`} className="mask">
              <span className="mask-inner rise" style={step(index)}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div data-hero-meta className="mt-6 grid gap-4 border-t border-line pt-4 md:grid-cols-12 md:items-end">
          <p className="fade-up text-lead md:col-span-6" style={step(headline.length)}>
            {lines.length > 0 ? <span className="block font-semibold">{name}</span> : null}
            <span className="block text-paper-2">{role}</span>
            <Ticker items={ticker} className="text-paper-3" />
          </p>
          <div className="fade-up flex items-end justify-between gap-4 md:col-span-6 md:justify-end md:gap-8" style={step(headline.length + 1)}>
            {hasWork ? (
              <Link href="/#work" onClick={(event) => smoothHashClick(event, '/#work')} className="arrow-link">
                See the work
                <span className="arrow-link-circle">
                  <Icon name="arrow-down" size={18} />
                </span>
              </Link>
            ) : (
              <Link href="/contact" className="arrow-link">
                Start a conversation
                <span className="arrow-link-circle">
                  <Icon name="arrow-right" size={18} />
                </span>
              </Link>
            )}
            <span className="label flex flex-col items-center gap-2 text-paper-3" aria-hidden="true">
              Scroll
              <span className="relative block h-12 w-px bg-line">
                <span className="scroll-cue-dot absolute -left-[2px] top-0 block size-[5px] rounded-full bg-accent" />
              </span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
