import { defineArrayMember, defineField, defineType } from 'sanity'

const imageFields = [
  defineField({
    name: 'alt',
    title: 'Alternative text',
    type: 'string',
    description: 'Describe what the image shows for someone who cannot see it. Required.',
    validation: (rule) => rule.required().max(200),
  }),
  defineField({ name: 'caption', title: 'Caption', type: 'string' }),
]

export const project = defineType({
  name: 'project',
  title: 'Case study',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'story', title: 'The story' },
    { name: 'lines', title: 'Copy lines' },
    { name: 'visuals', title: 'Images' },
    { name: 'publishing', title: 'Permission and publishing' },
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basics',
      description: 'The name of the campaign, for example "Olojo Festival 2026"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'basics',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'agency',
      title: 'Agency',
      type: 'string',
      group: 'basics',
      initialValue: 'Leo Burnett Lagos',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'basics',
      description: 'Leave empty if unsure. The pre-launch check will remind her.',
      validation: (rule) => rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: 'disciplines',
      title: 'What she did',
      type: 'array',
      group: 'basics',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Strategy', value: 'strategy' },
          { title: 'Copy', value: 'copy' },
          { title: 'Concept', value: 'concept' },
        ],
      },
    }),
    defineField({
      name: 'roleSummary',
      title: 'Her role in one line',
      type: 'string',
      group: 'basics',
      description: 'Be specific. For example "Copywriter: campaign platform line, headlines and body copy".',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'tagline',
      title: 'One-line description',
      type: 'string',
      group: 'basics',
      description: 'Shown in the work list on the home page.',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'basics',
      description: 'Lower numbers come first in the work list.',
      initialValue: 10,
    }),

    defineField({ name: 'brief', title: 'The brief', type: 'text', rows: 4, group: 'story' }),
    defineField({
      name: 'insight',
      title: 'The insight',
      type: 'text',
      rows: 4,
      group: 'story',
      description: 'The human or cultural truth the idea rests on.',
    }),
    defineField({ name: 'idea', title: 'The idea', type: 'text', rows: 4, group: 'story' }),
    defineField({
      name: 'execution',
      title: 'The execution',
      type: 'text',
      rows: 4,
      group: 'story',
      description: 'What was made, and where it ran.',
    }),
    defineField({
      name: 'result',
      title: 'The result',
      type: 'text',
      rows: 3,
      group: 'story',
      description:
        'Leave empty if there is no measured result or feedback she can stand behind. Never estimate.',
    }),

    defineField({
      name: 'copyLines',
      title: 'Copy lines she wrote',
      type: 'array',
      group: 'lines',
      of: [defineArrayMember({ type: 'copyLine' })],
    }),

    defineField({
      name: 'heroImage',
      title: 'Main image',
      type: 'image',
      group: 'visuals',
      options: { hotspot: true },
      fields: imageFields,
      description: 'Use the hotspot to mark the focal point. Do not crop here.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'visuals',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: imageFields })],
    }),
    defineField({
      name: 'credits',
      title: 'Team credits',
      type: 'array',
      group: 'visuals',
      of: [defineArrayMember({ type: 'credit' })],
      description: 'Name everyone she can. Credit costs nothing and shows she works well with others.',
    }),

    defineField({
      name: 'permissionStatus',
      title: 'Permission to show this work',
      type: 'string',
      group: 'publishing',
      options: {
        layout: 'radio',
        list: [
          { title: 'Pending: not cleared. Will not appear on the site', value: 'pending' },
          { title: 'Verbal go-ahead only', value: 'verbal' },
          { title: 'Written permission on file', value: 'written' },
        ],
      },
      initialValue: 'pending',
      validation: (rule) => [
        rule.required(),
        rule
          .custom((value) =>
            value === 'verbal'
              ? 'Verbal go-ahead only. Get it confirmed in writing before the site is promoted.'
              : true,
          )
          .warning(),
      ],
    }),
    defineField({
      name: 'permissionNote',
      title: 'Permission notes',
      type: 'text',
      rows: 3,
      group: 'publishing',
      description: 'Who gave permission, when, and for which pieces. Not shown on the site.',
    }),
    defineField({
      name: 'publishAfter',
      title: 'Do not show before',
      type: 'datetime',
      group: 'publishing',
      description:
        'Optional. Use it for work that has not launched. The site shows the project from this moment, within an hour at most.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'brand', media: 'heroImage', status: 'permissionStatus' },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${subtitle ?? ''}${status ? ` · ${status}` : ''}`,
        media,
      }
    },
  },
})