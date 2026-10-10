import { defineArrayMember, defineField, defineType } from 'sanity'

export const copyLine = defineType({
  name: 'copyLine',
  title: 'Copy line',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Line',
      type: 'text',
      rows: 2,
      description: 'Type it as it was published. Capitalisation of the layout is applied by the site.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Type of line',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Headline', value: 'headline' },
          { title: 'Strapline or platform line', value: 'strapline' },
          { title: 'Body copy', value: 'body' },
          { title: 'Invitation copy', value: 'invite' },
          { title: 'Teaser', value: 'teaser' },
        ],
      },
      initialValue: 'headline',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'English', value: 'en' },
          { title: 'Yoruba', value: 'yo' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quotedFrom',
      title: 'Quoted from',
      type: 'string',
      description:
        'Fill this in only if the line is quoted from a song, poem or other source, for example "Song title, songwriter". It is credited on the page so the line is not presented as hers.',
    }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'kind' },
  },
})

export const credit = defineType({
  name: 'credit',
  title: 'Credit',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'For example Art director, Creative director, Strategist',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'role' } },
})

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'X', value: 'x' },
          { title: 'Behance', value: 'behance' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'linkedin',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Shown as the link text. Needed when the platform is Other.',
    }),
    defineField({
      name: 'url',
      title: 'Address',
      type: 'url',
      description: 'The full link, starting with https://',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
  ],
  preview: { select: { title: 'platform', subtitle: 'url' } },
})

export const capability = defineType({
  name: 'capability',
  title: 'Capability',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'What it includes',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: { select: { title: 'title' } },
})

export const experienceItem = defineType({
  name: 'experienceItem',
  title: 'Experience',
  type: 'object',
  fields: [
    defineField({ name: 'organisation', title: 'Organisation', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'For example "July 2025 to present"',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'note', title: 'One-line note', type: 'string' }),
  ],
  preview: { select: { title: 'organisation', subtitle: 'role' } },
})

export const educationItem = defineType({
  name: 'educationItem',
  title: 'Education',
  type: 'object',
  fields: [
    defineField({ name: 'institution', title: 'Institution', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'award', title: 'Award', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'period', title: 'Period', type: 'string', validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'institution', subtitle: 'award' } },
})