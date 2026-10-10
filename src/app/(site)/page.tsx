import type { Metadata } from 'next'
import { Capabilities } from '@/components/home/Capabilities'
import { ClosingCta } from '@/components/home/ClosingCta'
import { Hero } from '@/components/home/Hero'
import { Manifesto } from '@/components/home/Manifesto'
import { WorkIndex, type WorkItem } from '@/components/home/WorkIndex'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { getProjects, getSettings } from '@/sanity/data'
import { toImage } from '@/sanity/lib/image'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()])

  const items: WorkItem[] = projects.map((project) => ({
    _id: project._id,
    slug: project.slug,
    title: project.title,
    brand: project.brand,
    year: project.year,
    roleSummary: project.roleSummary,
    image: toImage(project.heroImage, project.title),
  }))

  return (
    <>
      <Hero
        lines={settings.heroLines}
        intro={settings.intro}
        role={settings.role}
        location={settings.location}
      />

      {settings.manifesto.length > 0 ? <Manifesto lines={settings.manifesto} /> : null}

      <section id="work" aria-labelledby="work-title" className="py-20">
        <Container>
          <Reveal>
            <h2 id="work-title" className="mb-8">
              Selected work
            </h2>
          </Reveal>
          <WorkIndex items={items} />
        </Container>
      </section>

      {settings.capabilities.length > 0 ? (
        <section aria-labelledby="capabilities-title" className="py-20">
          <Container>
            <Reveal>
              <h2 id="capabilities-title" className="mb-8">
                What I do
              </h2>
              <Capabilities items={settings.capabilities} />
            </Reveal>
          </Container>
        </section>
      ) : null}

      <ClosingCta />
    </>
  )
}