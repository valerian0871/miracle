import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { PROJECTS_QUERY } from '@/sanity/queries'
import type { ProjectSummary } from '@/sanity/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const projects = await sanityFetch<ProjectSummary[]>({ query: PROJECTS_QUERY })

  const projectUrls: MetadataRoute.Sitemap = (projects ?? [])
    .filter((p) => !p.publishAfter || new Date(p.publishAfter) <= new Date())
    .map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ...projectUrls,
  ]
}

