import { cache } from 'react'
import { DEFAULT_SETTINGS } from '@/lib/site'
import { DEMO_SETTINGS, demoEnabled } from './demo'
import { sanityFetch } from './lib/fetch'
import { PROJECT_QUERY, PROJECTS_QUERY, SETTINGS_QUERY } from './queries'
import type { Project, ProjectSummary, SiteSettings } from './types'

function isLive(project: { publishAfter?: string | null }, now: Date): boolean {
  return !project.publishAfter || new Date(project.publishAfter) <= now
}

function normaliseSettings(raw: Record<string, unknown> | null): SiteSettings {
  const merged: Record<string, unknown> = { ...DEFAULT_SETTINGS, ...(demoEnabled() ? DEMO_SETTINGS : {}) }
  if (raw) {
    for (const [key, value] of Object.entries(raw)) {
      if (value !== null && value !== undefined) merged[key] = value
    }
  }
  return merged as unknown as SiteSettings
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const raw = await sanityFetch<Record<string, unknown> | null>({
    query: SETTINGS_QUERY,
    tags: ['siteSettings'],
  })
  return normaliseSettings(raw)
})

/** Published projects whose publish date has passed, in display order */
export const getProjects = cache(async (): Promise<ProjectSummary[]> => {
  const all = await sanityFetch<ProjectSummary[]>({ query: PROJECTS_QUERY, tags: ['project'] })
  const now = new Date()
  return (all ?? []).filter((project) => isLive(project, now))
})

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  const project = await sanityFetch<Project | null>({
    query: PROJECT_QUERY,
    params: { slug },
    tags: ['project'],
  })
  if (!project || !isLive(project, new Date())) return null
  return project
})