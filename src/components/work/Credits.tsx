import { Container } from '@/components/ui/Container'
import type { Credit } from '@/sanity/types'

export function Credits({ credits }: { credits: Credit[] }) {
  if (credits.length === 0) return null

  return (
    <section aria-labelledby="credits-title" className="py-10">
      <Container>
        <h2 id="credits-title" className="mb-6 text-h3">
          Team
        </h2>
        <dl className="grid gap-x-3 gap-y-4 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {credits.map((credit) => (
            <div key={credit._key}>
              <dt className="text-caption uppercase tracking-widest text-paper-3">{credit.role}</dt>
              <dd className="mt-1 text-small">{credit.name}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}