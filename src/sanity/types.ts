export type Maybe<T> = T | null | undefined

export interface SanityImageData {
  asset?: { _ref: string; _type: 'reference' }
  alt?: Maybe<string>
  caption?: Maybe<string>
  hotspot?: Maybe<{ x: number; y: number; width: number; height: number }>
  dimensions?: Maybe<{ width: number; height: number; aspectRatio: number }>
  lqip?: Maybe<string>
}

export type CopyKind = 'headline' | 'strapline' | 'body' | 'invite' | 'teaser'
export type CopyLanguage = 'en' | 'yo' | 'other'

export interface CopyLine {
  _key: string
  text: string
  kind: CopyKind
  language: CopyLanguage
  quotedFrom?: Maybe<string>
}

export interface Credit {
  _key: string
  name: string
  role: string
}

export type Discipline = 'strategy' | 'copy' | 'concept'
export type PermissionStatus = 'pending' | 'verbal' | 'written'

export interface ProjectSummary {
  _id: string
  title: string
  slug: string
  brand: string
  agency?: Maybe<string>
  year?: Maybe<number>
  disciplines?: Maybe<Discipline[]>
  roleSummary: string
  tagline?: Maybe<string>
  order?: Maybe<number>
  publishAfter?: Maybe<string>
  heroImage?: Maybe<SanityImageData>
}

export interface Project extends ProjectSummary {
  permissionStatus: PermissionStatus
  brief?: Maybe<string>
  insight?: Maybe<string>
  idea?: Maybe<string>
  execution?: Maybe<string>
  result?: Maybe<string>
  copyLines?: Maybe<CopyLine[]>
  gallery?: Maybe<SanityImageData[]>
  credits?: Maybe<Credit[]>
}

export interface SocialLink {
  _key: string
  platform: 'linkedin' | 'instagram' | 'x' | 'behance' | 'other'
  label?: Maybe<string>
  url: string
}

export interface Capability {
  _key: string
  title: string
  summary: string
  items: string[]
}

export interface ExperienceItem {
  _key: string
  organisation: string
  role: string
  period: string
  note?: Maybe<string>
}

export interface EducationItem {
  _key: string
  institution: string
  award: string
  period: string
}

export interface SiteSettings {
  name: string
  role: string
  location: string
  siteDescription: string
  heroLines: string[]
  intro: string
  manifesto: string[]
  capabilities: Capability[]
  aboutParagraphs: string[]
  experience: ExperienceItem[]
  education: EducationItem[]
  portrait?: Maybe<SanityImageData>
  publicEmail?: Maybe<string>
  socials: SocialLink[]
  availability?: Maybe<string>
  rightsNote?: Maybe<string>
}