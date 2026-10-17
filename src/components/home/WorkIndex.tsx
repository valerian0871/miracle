'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SanityImage } from '@/components/ui/SanityImage'
import type { LocalImage } from '@/lib/campaigns'
import { SCRUB } from '@/lib/motion'
import { markPin, useScene } from '@/lib/useScene'
import type { ImageProps } from '@/sanity/lib/image'

export type WorkMedia = { kind: 'sanity'; image: ImageProps } | { kind: 'local'; image: LocalImage }

export type WorkItem = {
  key: string
  title: string
  brand: string
  year?: number | null
  roleSummary: string
  tagline?: string | null
  lines: string[]
  /** Case-study page, when one exists */
  href?: string
  main: WorkMedia | null
  detail?: WorkMedia | null
}

/** Fewer than this and the panels simply stack; pinning two panels feels like a stall */
const MIN_PINNED = 3

function Media({ media, sizes, className }: { media: WorkMedia; sizes: string; className?: string }) {
  // Intrinsic size, capped by max-height in className, so artwork is never cropped
  const classes = `block h-auto rounded-sm ${className ?? ''}`
  return media.kind === 'sanity' ? (
    <SanityImage image={media.image} sizes={sizes} className={classes} />
  ) : (
    <Image src={media.image.src} alt={media.image.alt} width={media.image.width} height={media.image.height} sizes={sizes} className={classes} />
  )
}

export function WorkIndex({ items }: { items: WorkItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const pinned = items.length >= MIN_PINNED
  const total = String(items.length).padStart(2, '0')

  useScene(
    ref,
    (root, { gsap }) => {
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', root)
      const rail = gsap.utils.toArray<HTMLElement>('[data-rail-item]', root)
      const setActive = (active: number) =>
        rail.forEach((item, index) => item.toggleAttribute('data-active', index === active))
      setActive(0)

      gsap.set(panels.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
      const timeline = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${Math.round((panels.length - 1 + 0.85) * window.innerHeight)}`,
          scrub: SCRUB,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => markPin(root, self.start, self.end),
          onUpdate: (self) => {
            const span = (panels.length - 1 + 0.85) * self.progress
            setActive(Math.min(panels.length - 1, Math.round(span)))
          },
        },
      })

      panels.slice(1).forEach((panel, i) => {
        const at = i
        timeline
          .fromTo(panel, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'expo.inOut' }, at)
          .fromTo(panel.querySelector('[data-main]'), { scale: 1.05 }, { scale: 1, ease: 'expo.out' }, at)
          .fromTo(panel.querySelector('[data-text]'), { yPercent: 12 }, { yPercent: 0, ease: 'expo.out' }, at)
      })
      // Hold on the last panel before letting go
      timeline.to({}, { duration: 0.85 })
    },
    [items.length],
    pinned,
  )

  return (
    <div ref={ref} className="group relative data-[scene=on]:h-svh data-[scene=on]:overflow-hidden">
      <ol className="relative h-full">
        {items.map((item, index) => (
          <li
            key={item.key}
            data-panel
            className="relative overflow-hidden group-data-[scene=on]:absolute group-data-[scene=on]:inset-0"
            style={{ backgroundColor: `var(--color-tone-${(index % 4) + 1})`, zIndex: index + 1 } as CSSProperties}
          >
            <Container className="relative grid min-h-svh items-center gap-6 pb-10 pt-16 md:grid-cols-12 md:gap-8 md:pt-20 group-data-[scene=on]:h-svh group-data-[scene=on]:min-h-0">
              <div data-text className="relative z-10 md:col-span-5">
                <p className="label text-paper-2">
                  {item.brand}
                  {item.year ? ` · ${item.year}` : ''}
                </p>
                <h3 className="mt-3 text-[clamp(2rem,1.2rem+3vw,4rem)] leading-[0.95]">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-accent focus-visible:text-accent">
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-3 max-w-md text-small text-paper-2">{item.roleSummary}</p>
                {item.lines.length > 0 ? (
                  <ul className="mt-5 space-y-2 border-l border-accent/60 pl-3 md:mt-6">
                    {item.lines.map((line) => (
                      <li key={line} className="text-lead leading-snug">
                        “{line}”
                      </li>
                    ))}
                  </ul>
                ) : item.tagline ? (
                  <p className="mt-5 max-w-md text-lead">{item.tagline}</p>
                ) : null}
                {item.href ? (
                  <Link href={item.href} className="arrow-link mt-6 md:mt-8" tabIndex={-1} aria-hidden="true">
                    View the case study
                    <span className="arrow-link-circle">
                      <Icon name="arrow-right" size={18} />
                    </span>
                  </Link>
                ) : null}
              </div>

              <div className="relative md:col-span-7 md:pr-16 lg:pr-24">
                {item.main ? (
                  <div data-main className="relative mx-auto w-fit">
                    <Media
                      media={item.main}
                      sizes="(min-width: 768px) 55vw, 90vw"
                      className="max-h-[38svh] w-auto max-w-full shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)] md:max-h-[64svh]"
                    />
                    {item.detail ? (
                      <Media
                        media={item.detail}
                        sizes="(min-width: 768px) 18vw, 30vw"
                        className="absolute -bottom-6 -left-6 hidden max-h-[30svh] w-auto shadow-[0_20px_50px_-16px_rgb(0_0_0/0.7)] md:block"
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>

              <span
                aria-hidden="true"
                className="type-outline pointer-events-none absolute -bottom-[0.18em] right-3 font-display text-[clamp(7rem,22vw,20rem)] font-semibold leading-none text-paper/25 md:right-5"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </Container>
          </li>
        ))}
      </ol>

      {/* Where am I: the rail marks the panel on screen */}
      <nav aria-label="Projects" className="pointer-events-none absolute inset-y-0 right-3 z-40 hidden items-center group-data-[scene=on]:md:flex md:right-5">
        <ol className="pointer-events-auto space-y-2 text-right">
          {items.map((item, index) => (
            <li key={item.key} data-rail-item className="group/rail label text-paper-3 transition-colors duration-(--dur-quick) ease-out data-[active]:text-paper">
              <span className="inline-block w-0 overflow-hidden whitespace-nowrap align-bottom opacity-0 transition-[opacity] duration-(--dur-quick) ease-out group-data-[active]/rail:w-auto group-data-[active]/rail:opacity-100">
                {item.brand}&nbsp;
              </span>
              {String(index + 1).padStart(2, '0')}
            </li>
          ))}
          <li className="label text-paper-3" aria-hidden="true">
            / {total}
          </li>
        </ol>
      </nav>
    </div>
  )
}
