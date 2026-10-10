import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-dvh flex-col justify-center pb-10 pt-14">
      <p className="text-caption uppercase tracking-widest text-paper-2">Error 404</p>
      <h1 className="mt-2 text-h2">That page does not exist</h1>
      <p className="mt-3 max-w-xl text-lead text-paper-2">
        The link may be out of date, or the case study may not be published yet.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ButtonLink href="/">Back to the home page</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact
        </ButtonLink>
      </div>
    </Container>
  )
}