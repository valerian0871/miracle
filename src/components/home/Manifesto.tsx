'use client'

import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Mark } from '@/components/ui/Mark'
import { SplitWords } from '@/components/ui/SplitWords'
import { SCRUB, setRootFlag } from '@/lib/motion'
import { markPin, useScene } from '@/lib/useScene'

/** Each manifesto line is one beat. The section holds while the beats play, one per screen. */
export function Manifesto({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLElement>(null)

  useScene(ref, (root, { gsap, ScrollTrigger }) => {
    const beats = gsap.utils.toArray<HTMLElement>('[data-beat]', root)
    const counter = root.querySelector<HTMLElement>('[data-counter]')
    gsap.set(beats.slice(1), { autoAlpha: 0 })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: `+=${beats.length * 100}%`,
        scrub: SCRUB,
        pin: true,
        onRefresh: (self) => markPin(root, self.start, self.end),
        // A statement per screen: the header steps aside while it plays
        onToggle: (self) => setRootFlag('chrome', self.isActive ? 'hidden' : null),
        onUpdate: (self) => {
          if (!counter) return
          const current = Math.min(beats.length, Math.floor(self.progress * beats.length) + 1)
          counter.textContent = String(current).padStart(2, '0')
        },
      },
    })

    beats.forEach((beat, index) => {
      const at = index * 1.2
      const words = beat.querySelectorAll('[data-word]')
      timeline
        .set(beat, { autoAlpha: 1 }, at)
        .fromTo(words, { yPercent: 24, opacity: 0.12 }, { yPercent: 0, opacity: 1, ease: 'expo.out', duration: 0.4, stagger: 0.04 }, at)
      if (index < beats.length - 1) {
        timeline.to(beat, { xPercent: index % 2 === 0 ? -10 : 10, autoAlpha: 0, ease: 'expo.in', duration: 0.3 }, at + 0.9)
      }
    })
    // Hold the last beat before the section lets go
    timeline.to({}, { duration: 0.4 })

    // The mark turns with the reader: faster scrolling spins it faster, then it settles
    const mark = root.querySelector<HTMLElement>('[data-spin]')
    let speed = 0.06
    let angle = 0
    let direction = 1
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (self.direction !== 0) direction = self.direction
        speed = 0.06 + Math.min(3e-4 * Math.abs(self.getVelocity()), 2.5)
      },
    })
    const spin = () => {
      speed += (0.06 - speed) * 0.02
      angle += speed * direction
      if (mark) mark.style.transform = `rotate(${angle}deg)`
    }
    gsap.ticker.add(spin)

    return () => {
      gsap.ticker.remove(spin)
      setRootFlag('chrome', null)
    }
  })

  return (
    <section ref={ref} aria-label="Manifesto" className="group relative overflow-hidden py-20 data-[scene=on]:flex data-[scene=on]:h-svh data-[scene=on]:items-center data-[scene=on]:py-0">
      <div className="pointer-events-none absolute -right-[20vw] top-1/2 hidden w-[70vw] -translate-y-1/2 text-ink-raised group-data-[scene=on]:block">
        <div data-spin>
          <Mark className="w-full" />
        </div>
      </div>

      <Container className="relative w-full">
        <div className="grid gap-10 group-data-[scene=on]:block">
          {lines.map((line, index) => (
            <p
              key={`${index}-${line}`}
              data-beat
              className={`max-w-[18ch] font-display text-h2 font-semibold uppercase group-data-[scene=on]:absolute group-data-[scene=on]:top-1/2 group-data-[scene=on]:-translate-y-1/2 ${
                index === lines.length - 1 ? 'text-accent' : ''
              }`}
            >
              <SplitWords text={line} />
            </p>
          ))}
        </div>
      </Container>

      <div className="label absolute bottom-6 left-0 right-0 hidden text-paper-3 group-data-[scene=on]:block" aria-hidden="true">
        <Container>
          <span data-counter>01</span> / {String(lines.length).padStart(2, '0')}
        </Container>
      </div>
    </section>
  )
}
