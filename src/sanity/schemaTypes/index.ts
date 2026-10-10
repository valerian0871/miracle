import type { SchemaTypeDefinition } from 'sanity'
import { capability, copyLine, credit, educationItem, experienceItem, socialLink } from './objects'
import { project } from './project'
import { siteSettings } from './siteSettings'

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  project,
  copyLine,
  credit,
  socialLink,
  capability,
  experienceItem,
  educationItem,
]