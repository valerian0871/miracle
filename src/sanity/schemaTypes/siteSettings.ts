import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'home', title: 'Home', default: true },
    { name: 'about', title: 'About' },
    { name: 'contact', title: 'Contact and links' },
    { name: 'seo', title: 'Search and sharing' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'home',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Title',
      type: 'string',
      group: 'home',
      initialValue: 'Creative strategist and copywriter',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'location', title: 'Based in', type: 'string', group: 'home' }),
    defineField({
      name: 'heroLines',
      title: 'Headline on the home page',
      type: 'array',
      group: 'home',
      of: [defineArrayMember({ type: 'string' })],
      description: 'One entry per line. Two or three short lines work best.',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'intro',
      title: 'Short introduction',
      type: 'text',
      rows: 3,
      group: 'home',
    }),
    defineField({
      name: 'manifesto',
      title: 'Manifesto lines',
      type: 'array',
      group: 'home',
      of: [defineArrayMember({ type: 'string' })],
      description: 'One entry per line. Each line fades in as the visitor scrolls.',
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      group: 'home',
      of: [defineArrayMember({ type: 'capability' })],
    }),

    defineField({
      name: 'aboutParagraphs',
      title: 'About text',
      type: 'array',
      group: 'about',
      of: [defineArrayMember({ type: 'text', rows: 4 })],
      description: 'One entry per paragraph.',
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      description: 'Until a photograph is added, the site shows a typographic monogram.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required().max(200),
        }),
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      group: 'about',
      of: [defineArrayMember({ type: 'experienceItem' })],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'about',
      of: [defineArrayMember({ type: 'educationItem' })],
    }),

    defineField({
      name: 'publicEmail',
      title: 'Public email address',
      type: 'string',
      group: 'contact',
      description:
        'Optional. If filled in, it is shown on the contact page and in the footer. The contact form works without it.',
      validation: (rule) => rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }).warning(),
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({ type: 'socialLink' })],
      description: 'Only links added here appear on the site.',
    }),
    defineField({
      name: 'availability',
      title: 'Availability note',
      type: 'string',
      group: 'contact',
      description: 'Optional, for example "Taking on freelance briefs from January".',
    }),
    defineField({
      name: 'rightsNote',
      title: 'Rights note for the footer',
      type: 'text',
      rows: 2,
      group: 'contact',
      description:
        'Optional. Add it once written permission is on file, for example "Campaign work shown with the permission of Leo Burnett Lagos and the brands concerned."',
    }),

    defineField({
      name: 'siteDescription',
      title: 'Description for search engines',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Around 150 characters. Shown in search results and link previews.',
      validation: (rule) => [
        rule.required(),
        rule.max(160).warning('Search engines usually cut off after about 160 characters.'),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})