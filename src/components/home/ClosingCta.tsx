import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="py-20">
      <Container>
        <h2 id="closing-title" className="max-w-4xl">
          Have a brief that needs an insight first?
        </h2>
        <p className="mt-4 max-w-xl text-lead text-paper-2">
          Send the brief, the audience and the timeline. A message is enough to start.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact">Send a message</ButtonLink>
        </div>
      </Container>
    </section>
  )
}