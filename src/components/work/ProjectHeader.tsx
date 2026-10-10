import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SanityImage } from '@/components/ui/SanityImage'
import type { ImageProps } from '@/sanity/lib/image'
import type { Discipline, Project } from '@/sanity/types'

const DISCIPLINE_LABEL: Record<Discipline, string> = {
  strategy: 'Strategy',
  copy: 'Copy',
  concept: 'Concept',
}

export function ProjectHeader({ project, image }: { project: Project; image: ImageProps | null }) {
  const facts = [
    { label: 'Brand', value: project.brand },
    { label: 'Agency', value: project.agency },
    { label: 'Year', value: project.year ? String(project.year) : null },
    { label: 'Her role', value: project.roleSummary },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

  const portrait = image ? image.height > image.width : false

  return (
    <header className="pb-10 pt-14">
      <Container>
        <Link href="/#work" className="link-line inline-block py-2 text-small text-paper-2">
          All work
        </Link>

        <h1 className="mt-3 max-w-5xl text-h2">{project.title}</h1>

        {project.disciplines?.length ? (
          <ul className="mt-4 flex flex-wrap gap-1" aria-label="Disciplines">
            {project.disciplines.map((discipline) => (
              <li
                key={discipline}
                className="rounded-pill border border-line-strong px-2 py-0.5 text-caption text-paper-2"
              >
                {DISCIPLINE_LABEL[discipline]}
              </li>
            ))}
          </ul>
        ) : null}

        <dl className="mt-8 grid gap-4 border-t border-line pt-4 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-caption uppercase tracking-widest text-paper-3">{fact.label}</dt>
              <dd className="mt-1 text-small">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {image ? (
          <div className={`mt-8 ${portrait ? 'mx-auto max-w-xl' : ''}`}>
            <SanityImage
              image={image}
              priority
              sizes={portrait ? '(min-width: 768px) 576px, 100vw' : '100vw'}
              className="h-auto w-full rounded-md border border-line"
            />
          </div>
        ) : null}
      </Container>
    </header>
  )
}