import { Container } from '@/components/ui/Container'
import type { CopyKind, CopyLine } from '@/sanity/types'

const KIND_LABEL: Record<CopyKind, string> = {
  headline: 'Headline',
  strapline: 'Platform line',
  body: 'Body copy',
  invite: 'Invitation',
  teaser: 'Teaser',
}

export function CopyLines({ lines }: { lines: CopyLine[] }) {
  if (lines.length === 0) return null

  return (
    <section aria-labelledby="lines-title" className="py-10">
      <Container>
        <h2 id="lines-title" className="mb-6 text-h3">
          The lines
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {lines.map((line) => {
            const isSupporting = line.kind === 'body' || line.kind === 'invite'
            return (
              <li key={line._key} className="grid gap-1 py-4 md:grid-cols-12 md:gap-3">
                <p className="text-caption uppercase tracking-widest text-paper-3 md:col-span-3">
                  {KIND_LABEL[line.kind]}
                  {line.language === 'yo' ? ', Yoruba' : ''}
                </p>
                <div className="md:col-span-9">
                  <p
                    lang={line.language === 'yo' ? 'yo' : undefined}
                    className={isSupporting ? 'text-lead text-paper-2' : 'font-display text-h3 uppercase'}
                  >
                    {line.text}
                  </p>
                  {line.quotedFrom ? (
                    <p className="mt-1 text-caption text-paper-3">Quoted from {line.quotedFrom}</p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}