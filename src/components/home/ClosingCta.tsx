import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

type Props = {
  email: string | null
  availability: string | null
}

export function ClosingCta({ email, availability }: Props) {
  return (
    <section aria-labelledby="closing-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <Reveal>
          <h2 id="closing-title" className="max-w-[16ch] text-[clamp(3rem,1.6rem+5.6vw,7rem)] leading-[0.92]">
            Have a brief that needs an insight <span className="text-accent">first?</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <p className="max-w-xl text-lead text-paper-2 md:col-span-6">
              Send the brief, the audience and the timeline. A message is enough to start.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-6 md:justify-end">
              <ButtonLink href="/contact">Send a message</ButtonLink>
              {email ? (
                <a href={`mailto:${email}`} className="link-line text-small">
                  {email}
                </a>
              ) : null}
            </div>
          </div>
          {availability ? <p className="mt-6 text-small text-paper-3">{availability}</p> : null}
        </Reveal>
      </Container>
    </section>
  )
}
