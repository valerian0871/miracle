import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[70dvh] flex-col items-start justify-center gap-8 py-24">
      <p className="font-display text-[clamp(6rem,20vw,14rem)] font-semibold uppercase leading-none text-line-strong">
        404
      </p>
      <div className="flex flex-col gap-4">
        <h1 className="text-h3">Page not found</h1>
        <p className="text-paper-2 max-w-prose">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
      </div>
      <Link href="/" className="link-line text-accent font-semibold">
        Back to home
      </Link>
    </Container>
  )
}

