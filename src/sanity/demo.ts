import type { SiteSettings } from './types'

/*
  Development only. With DEMO_CONTENT=1 in the environment and NODE_ENV not
  "production", these values fill any settings Sanity leaves empty, so the
  content-driven sections can be checked before the dataset is seeded. The
  text is copied from scripts/seed.mjs, where it is marked as a draft for
  Miracle to replace. It is never used in a production build.
*/
export const DEMO_SETTINGS: Partial<SiteSettings> = {
  location: 'Lagos, Nigeria',
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
      _key: 'demo1',
      title: 'Strategy',
      summary: 'Turning consumer insight and cultural trends into the message a campaign is built on.',
      items: ['Consumer and cultural insight', 'Campaign platforms', 'Communication planning for activations'],
    },
    {
      _key: 'demo2',
      title: 'Copy',
      summary: 'Lines, calls to action and long-form writing that keep a brand sounding like itself.',
      items: ['Taglines and campaign lines', 'CTAs and long-form copy', 'Brand voice consistency'],
    },
    {
      _key: 'demo3',
      title: 'Concepts',
      summary: 'Integrated ideas that carry across digital, print, social and experiential channels.',
      items: ['Integrated campaign concepts', 'CSR campaign ideas', 'Influencer and user-generated content concepts'],
    },
  ],
}

export const demoEnabled = () => process.env.DEMO_CONTENT === '1' && process.env.NODE_ENV !== 'production'
