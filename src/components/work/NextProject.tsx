import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { ProjectSummary } from '@/sanity/types'

export function NextProject({ project }: { project: ProjectSummary }) {
  return (
    <section aria-label="Next case study" className="py-20">
      <Container>
        <Link href={`/work/${project.slug}`} className="group block border-t border-line pt-6">
          <p className="text-caption uppercase tracking-widest text-paper-3">Next case study</p>
          <p className="mt-2 font-display text-h2 uppercase transition-colors duration-(--duration-base) ease-brand group-hover:text-accent">
            {project.title}
          </p>
          <p className="mt-2 text-small text-paper-2">{project.brand}</p>
        </Link>
      </Container>
    </section>
  )
}