import type { CSSProperties } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

type Props = {
  lines: string[]
  intro: string
  role: string
  location: string
}

const step = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero({ lines, intro, role, location }: Props) {
  // Before any content exists, fall back to the title so the page is never empty
  const headline = lines.length > 0 ? lines : [role]

  return (
    <section className="flex min-h-dvh flex-col justify-end pb-8 pt-14" aria-labelledby="hero-title">
      <Container>
        <p className="fade-up text-caption uppercase tracking-widest text-paper-2" style={step(0)}>
          {role}
          {location ? `, ${location}` : ''}
        </p>

        <h1 id="hero-title" className="mt-3">
          {headline.map((line, index) => (
            <span key={`${index}-${line}`} className="mask">
              <span className="mask-inner rise" style={step(index + 1)}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
          {intro ? (
            <p className="fade-up text-lead text-paper-2 md:col-span-5" style={step(headline.length + 1)}>
              {intro}
            </p>
          ) : null}
          <div className="fade-up flex flex-wrap gap-2 md:col-span-5 md:col-start-8 md:justify-end" style={step(headline.length + 2)}>
            <ButtonLink href="/#work">See the work</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}