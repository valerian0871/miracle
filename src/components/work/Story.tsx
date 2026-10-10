import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import type { Project } from '@/sanity/types'

const SECTIONS = [
  ['brief', 'The brief'],
  ['insight', 'The insight'],
  ['idea', 'The idea'],
  ['execution', 'The execution'],
  ['result', 'The result'],
] as const

export function Story({ project }: { project: Project }) {
  const sections = SECTIONS.flatMap(([key, label]) => {
    const text = project[key]
    return text ? [{ key, label, text }] : []
  })

  if (sections.length === 0) return null

  return (
    <section aria-label="The story" className="py-10">
      <Container>
        <div className="divide-y divide-line border-y border-line">
          {sections.map((section, index) => (
            <Reveal key={section.key}>
              <div className="grid gap-2 py-6 md:grid-cols-12 md:gap-3">
                <h2 className="text-caption font-body font-normal normal-case tracking-widest text-paper-3 md:col-span-3">
                  <span className="mr-2 tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <span className="uppercase">{section.label}</span>
                </h2>
                <p className="whitespace-pre-line text-lead md:col-span-7">{section.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}