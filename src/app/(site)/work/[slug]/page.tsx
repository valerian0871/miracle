import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Credits } from '@/components/work/Credits'
import { CopyLines } from '@/components/work/CopyLines'
import { Gallery, type GalleryItem } from '@/components/work/Gallery'
import { NextProject } from '@/components/work/NextProject'
import { ProjectHeader } from '@/components/work/ProjectHeader'
import { Story } from '@/components/work/Story'
import { JsonLd } from '@/components/ui/JsonLd'
import { siteUrl } from '@/lib/site'
import { getProject, getProjects, getSettings } from '@/sanity/data'
import { ogImageUrl, toImage } from '@/sanity/lib/image'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}

  const description = project.tagline || project.roleSummary
  const image = ogImageUrl(project.heroImage) ?? '/opengraph-image'

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description,
      url: `/work/${project.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: 'summary_large_image', title: project.title, description, images: [image] },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, projects, settings] = await Promise.all([getProject(slug), getProjects(), getSettings()])
  if (!project) notFound()

  const hero = toImage(project.heroImage, project.title)

  const gallery: GalleryItem[] = (project.gallery ?? []).flatMap((entry) => {
    const image = toImage(entry, project.title)
    return image ? [{ ...image, caption: entry.caption ?? null }] : []
  })

  const position = projects.findIndex((entry) => entry._id === project._id)
  const next = projects.length > 1 && position >= 0 ? projects[(position + 1) % projects.length] : null

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.tagline || project.roleSummary,
    url: `${siteUrl}/work/${project.slug}`,
    author: { '@type': 'Person', name: settings.name },
  }

  return (
    <article>
      <ProjectHeader project={project} image={hero} />
      <Story project={project} />
      <CopyLines lines={project.copyLines ?? []} />
      <Gallery items={gallery} />
      <Credits credits={project.credits ?? []} />
      {next ? <NextProject project={next} /> : null}
      <JsonLd data={creativeWork} />
    </article>
  )
}