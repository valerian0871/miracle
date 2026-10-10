import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-01'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local, then run again.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

let counter = 0
const key = () => `k${String((counter += 1)).padStart(3, '0')}`

const lines = (kind, language, texts) =>
  texts.map((text) => ({ _key: key(), _type: 'copyLine', text, kind, language }))

const settings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'Olu-Peters Miracle',
  role: 'Creative strategist and copywriter',
  location: 'Lagos, Nigeria',
  siteDescription:
    'Portfolio of Olu-Peters Miracle, a creative strategist and copywriter at Leo Burnett Lagos. Culture-led campaigns for Nigerian brands.',

  // DRAFT: replace with her own words
  heroLines: ['Culture-led campaigns,', 'written from the insight up.'],
  intro:
    'Creative strategist and copywriter at Leo Burnett Lagos. I turn consumer and cultural insight into campaign platforms, lines and concepts.',
  manifesto: [
    'A brief tells you what to say.',
    'An insight tells you why anyone would listen.',
    'I start with the second, then write the first.',
  ],

  capabilities: [
    {
      _key: key(),
      _type: 'capability',
      title: 'Strategy',
      summary: 'Turning consumer insight and cultural trends into the message a campaign is built on.',
      items: [
        'Consumer and cultural insight',
        'Campaign platforms',
        'Communication planning for activations',
      ],
    },
    {
      _key: key(),
      _type: 'capability',
      title: 'Copy',
      summary: 'Lines, calls to action and long-form writing that keep a brand sounding like itself.',
      items: ['Taglines and campaign lines', 'CTAs and long-form copy', 'Brand voice consistency'],
    },
    {
      _key: key(),
      _type: 'capability',
      title: 'Concepts',
      summary: 'Integrated ideas that carry across digital, print, social and experiential channels.',
      items: [
        'Integrated campaign concepts',
        'CSR campaign ideas',
        'Influencer and user-generated content concepts',
      ],
    },
  ],

  aboutParagraphs: [
    'I am a creative strategist and copywriter at Leo Burnett Lagos. I joined in July 2025, and my work covers digital, print, social and experiential campaigns.',
    'I studied Mass Communication at Joseph Ayo Babalola University and wrote my thesis on how advertising influences consumer purchase decisions.',
    'I am most interested in human-interest storytelling and culture-driven marketing.',
  ],
  experience: [
    {
      _key: key(),
      _type: 'experienceItem',
      organisation: 'Leo Burnett Lagos',
      role: 'Creative strategist and copywriter',
      period: 'July 2025 to present',
      note: 'Joined as a copywriting intern during the NYSC year, then retained.',
    },
    {
      _key: key(),
      _type: 'experienceItem',
      organisation: 'Crest FM, Akure',
      role: 'Broadcast intern, News and Current Affairs',
      period: 'July to October 2023',
      note: 'Wrote and edited radio news stories.',
    },
  ],
  education: [
    {
      _key: key(),
      _type: 'educationItem',
      institution: 'Joseph Ayo Babalola University',
      award: "Bachelor's degree in Mass Communication, second class upper",
      period: 'May 2020 to July 2024',
    },
  ],
}

const olojo = {
  _id: 'project-olojo-festival-2026',
  _type: 'project',
  title: 'Olojo Festival 2026',
  slug: { _type: 'slug', current: 'olojo-festival-2026' },
  brand: "Seaman's Schnapps",
  agency: 'Leo Burnett Lagos',
  year: 2026,
  disciplines: ['copy'],
  roleSummary: 'Copywriter: campaign lines and headlines across the executions',
  tagline: 'A festival campaign carried by one line: the true spirit of our culture.',
  order: 10,
  permissionStatus: 'verbal',
  permissionNote: 'Verbal go-ahead from Leo Burnett. Written confirmation pending.',
  copyLines: [
    ...lines('strapline', 'en', [
      'The true spirit of our culture welcomes you to',
      'The true spirit of our culture walks with you.',
    ]),
    ...lines('headline', 'en', [
      'Where tradition lives on.',
      'The crown of Ile-Ife. The pride of our culture.',
      'From the first dawn, a legacy endures.',
      'Honouring the throne. Upholding tradition.',
    ]),
    ...lines('body', 'en', ['Celebrating the living heritage that keeps Yoruba culture alive.']),
  ],
}

const palton = {
  _id: 'project-palton-morgan-independence',
  _type: 'project',
  title: 'Palton Morgan Independence Day',
  slug: { _type: 'slug', current: 'palton-morgan-independence-day' },
  brand: 'Palton Morgan Holdings',
  agency: 'Leo Burnett Lagos',
  disciplines: ['copy'],
  roleSummary: 'Copywriter: headlines and body copy',
  tagline: "Independence Day executions that pair national pride with the brand's building vision.",
  order: 20,
  permissionStatus: 'verbal',
  permissionNote: 'Verbal go-ahead from Leo Burnett. Written confirmation pending. Confirm the year.',
  copyLines: [
    ...lines('headline', 'en', ['Freedom to dream. Vision to build.', "Freedom to build what's next."]),
    ...lines('body', 'en', [
      'Our freedom inspires possibility. Our vision turns it into progress.',
      'Independence gave us the courage to dream, vision gives the dream a place to flourish.',
    ]),
  ],
}

const concert = {
  _id: 'project-back-to-my-roots-concert',
  _type: 'project',
  title: 'Back to my roots: a night of music and culture',
  slug: { _type: 'slug', current: 'back-to-my-roots-concert' },
  brand: "Seaman's Schnapps",
  agency: 'Leo Burnett Lagos',
  year: 2026,
  disciplines: ['copy'],
  roleSummary: 'Copywriter: headlines, invitation and event copy',
  tagline: 'A night of music and culture, built on the same platform line as Olojo.',
  order: 30,
  permissionStatus: 'verbal',
  permissionNote:
    'Verbal go-ahead from Leo Burnett. Event moved to 12 October. Not launched. Check the named musician and the countdown lines before showing anything.',
  publishAfter: '2026-10-12T00:00:00+01:00',
  copyLines: [
    ...lines('headline', 'en', ['Home is where our roots are', 'Answer the call']),
    ...lines('strapline', 'en', [
      'The true spirit of our culture is going back to the roots.',
      'The true spirit of our culture is calling.',
    ]),
    ...lines('invite', 'en', [
      "Seaman's Schnapps invites you to join us for a night of music and culture as we go back to our roots.",
    ]),
  ],
}

const docs = [settings, olojo, palton, concert]

// createIfNotExists means running this twice never overwrites her edits
const transaction = client.transaction()
for (const doc of docs) transaction.createIfNotExists(doc)
const result = await transaction.commit()
console.log(`Done. ${result.results.length} documents checked or created.`)