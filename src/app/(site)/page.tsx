import type { Metadata } from 'next'
import Link from 'next/link'
import { Capabilities } from '@/components/home/Capabilities'
import { ClosingCta } from '@/components/home/ClosingCta'
import { Hero } from '@/components/home/Hero'
import { Lede } from '@/components/home/Lede'
import { Manifesto } from '@/components/home/Manifesto'
import { WorkIndex, type WorkItem, type WorkMedia } from '@/components/home/WorkIndex'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { CAMPAIGN_MEDIA, CAMPAIGNS } from '@/lib/campaigns'
import { getProjects, getSettings } from '@/sanity/data'
import { toImage } from '@/sanity/lib/image'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const local = (slug: string) => {
  const media = CAMPAIGN_MEDIA[slug]
  return {
    main: media ? ({ kind: 'local', image: media.main } as WorkMedia) : null,
    detail: media?.detail ? ({ kind: 'local', image: media.detail } as WorkMedia) : null,
  }
}

export default async function HomePage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()])

  // Published Sanity projects come first. Until there are any, the cleared
  // campaigns in public/works stand in, without links to case-study pages.
  const items: WorkItem[] =
    projects.length > 0
      ? projects.map((project) => {
          const hero = toImage(project.heroImage, project.title)
          const fallback = local(project.slug)
          return {
            key: project._id,
            title: project.title,
            brand: project.brand,
            year: project.year,
            roleSummary: project.roleSummary,
            tagline: project.tagline,
            lines: [],
            href: `/work/${project.slug}`,
            main: hero ? { kind: 'sanity', image: hero } : fallback.main,
            detail: hero ? null : fallback.detail,
          }
        })
      : CAMPAIGNS.map((campaign) => ({
          key: campaign.slug,
          title: campaign.title,
          brand: campaign.brand,
          year: campaign.year,
          roleSummary: campaign.roleSummary,
          tagline: campaign.tagline,
          lines: campaign.lines,
          ...local(campaign.slug),
        }))

  return (
    <>
      <Hero
        name={settings.name}
        lines={settings.heroLines}
        role={settings.role}
        location={settings.location}
        hasWork={items.length > 0}
      />

      {settings.intro ? <Lede text={settings.intro} /> : null}

      {settings.manifesto.length > 0 ? <Manifesto lines={settings.manifesto} /> : null}

      <section id="work" aria-labelledby="work-title" className="pt-20 md:pt-32">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4 pb-10 md:pb-14">
              <h2 id="work-title">Selected work</h2>
              {items.length > 0 ? (
                <p className="text-small text-paper-2">
                  {items.length} {items.length === 1 ? 'campaign' : 'campaigns'}
                </p>
              ) : null}
            </div>
          </Reveal>
        </Container>
        {items.length > 0 ? (
          <WorkIndex items={items} />
        ) : (
          <Container>
            <p className="max-w-xl pb-20 text-lead text-paper-2">
              Campaigns are being cleared with clients before they appear here.{' '}
              <Link href="/contact" className="link-line text-paper">
                Ask about recent work
              </Link>
              .
            </p>
          </Container>
        )}
      </section>

      {settings.capabilities.length > 0 ? (
        <section aria-labelledby="capabilities-title" className="py-24 md:py-36">
          <Container>
            <Reveal>
              <h2 id="capabilities-title" className="pb-10 md:pb-14">
                What I do
              </h2>
            </Reveal>
            <Capabilities items={settings.capabilities} />
          </Container>
        </section>
      ) : null}

      <ClosingCta email={settings.publicEmail ?? null} availability={settings.availability ?? null} />
    </>
  )
}
