'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

/** Actions the settings document must not offer: there is exactly one, and it must always exist */
const BLOCKED_SETTINGS_ACTIONS: readonly string[] = ['unpublish', 'delete', 'duplicate']

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((item) => item.templateId !== 'siteSettings') : prev,
    actions: (prev, { schemaType }) =>
      schemaType === 'siteSettings'
        ? prev.filter((item) => !BLOCKED_SETTINGS_ACTIONS.includes(item.action ?? ''))
        : prev,
  },
})