/*
  Campaign media committed in public/works, cleared for use on the site
  (confirmed 2026-10-17). Keyed by the project slug used in Sanity and in
  scripts/seed.mjs, so a Sanity project without uploaded images still shows
  its campaign artwork.

  CAMPAIGNS mirrors the three projects in scripts/seed.mjs word for word. It is
  shown only while Sanity has no published projects, and its panels do not
  link to case-study pages, because those pages need the Sanity documents.
*/

export type LocalImage = {
  src: string
  width: number
  height: number
  alt: string
}

const img = (n: number, width: number, height: number, alt: string): LocalImage => ({
  src: `/works/photo_${n}_2026-10-14_17-18-14.jpg`,
  width,
  height,
  alt,
})

export const CAMPAIGN_MEDIA: Record<string, { main: LocalImage; detail?: LocalImage }> = {
  'olojo-festival-2026': {
    main: img(12, 1280, 640, "Seaman's Schnapps Olójó Festival 2026 banner: a celebrant raises a carved staff beside the festival title"),
    detail: img(3, 548, 1280, "Olójó Festival 2026 portrait banner: 'The true spirit of our culture walks with you'"),
  },
  'palton-morgan-independence-day': {
    main: img(20, 1024, 1280, "Palton Morgan Independence Day poster: 'Freedom to dream. Vision to build.' over a close-up of an eye reflecting a city"),
    detail: img(21, 1024, 1280, "Palton Morgan poster: 'Freedom to build what's next' beside a Nigerian desk flag"),
  },
  'back-to-my-roots-concert': {
    main: img(23, 1280, 914, "Seaman's Schnapps 'Going back to my roots' billboard showing an orchestra on stage"),
    detail: img(14, 1041, 1280, "Seaman's Schnapps poster: 'Home is where our roots are' with the bottle on a piano"),
  },
}

/** Used for the menu's Work column */
export const MENU_IMAGE = img(24, 1280, 914, "Seaman's Schnapps concert billboard in a station concourse")

export type Campaign = {
  slug: string
  title: string
  brand: string
  year?: number
  roleSummary: string
  tagline: string
  lines: string[]
}

export const CAMPAIGNS: Campaign[] = [
  {
    slug: 'olojo-festival-2026',
    title: 'Olojo Festival 2026',
    brand: "Seaman's Schnapps",
    year: 2026,
    roleSummary: 'Copywriter: campaign lines and headlines across the executions',
    tagline: 'A festival campaign carried by one line: the true spirit of our culture.',
    lines: ['The true spirit of our culture walks with you.', 'Where tradition lives on.'],
  },
  {
    slug: 'palton-morgan-independence-day',
    title: 'Palton Morgan Independence Day',
    brand: 'Palton Morgan Holdings',
    roleSummary: 'Copywriter: headlines and body copy',
    tagline: "Independence Day executions that pair national pride with the brand's building vision.",
    lines: ['Freedom to dream. Vision to build.', "Freedom to build what's next."],
  },
  {
    slug: 'back-to-my-roots-concert',
    title: 'Back to my roots: a night of music and culture',
    brand: "Seaman's Schnapps",
    year: 2026,
    roleSummary: 'Copywriter: headlines, invitation and event copy',
    tagline: 'A night of music and culture, built on the same platform line as Olojo.',
    lines: ['Home is where our roots are', 'Answer the call'],
  },
]
