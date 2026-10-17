const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-01'

if (!projectId) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local first.')
  process.exit(1)
}

const query = `{
  "settings": *[_id == "siteSettings"][0]{
    name, role, siteDescription, intro,
    "heroLines": count(heroLines),
    "manifesto": count(manifesto),
    "capabilities": count(capabilities),
    "paragraphs": count(aboutParagraphs),
    "hasPortrait": defined(portrait.asset),
    "portraitAlt": portrait.alt,
    "socials": count(socials),
    publicEmail,
    rightsNote
  },
  "projects": *[_type == "project"]{
    title,
    "slug": slug.current,
    permissionStatus,
    publishAfter,
    year,
    "hasHero": defined(heroImage.asset),
    "heroAlt": heroImage.alt,
    "gallery": gallery[]{ "hasAsset": defined(asset), alt },
    "story": count([brief, insight, idea, execution][defined(@)]),
    "credits": count(credits),
    "lines": copyLines[]{ kind, language, "quoted": defined(quotedFrom) }
  },
  "all": {
    "settings": *[_id == "siteSettings"][0],
    "projects": *[_type == "project"]
  }
}`

const url =
  `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}` +
  `?perspective=published&query=${encodeURIComponent(query)}`

const response = await fetch(url)
if (!response.ok) {
  console.error(`Sanity returned ${response.status}. Check the project ID and that the dataset is public.`)
  process.exit(1)
}
const { result } = await response.json()
const { settings, projects, all } = result

const blockers = []
const warnings = []
const info = []

// ---------- Settings ----------
if (!settings) {
  blockers.push('There is no published Site settings document.')
} else {
  if (!settings.name) blockers.push('Site settings: name is empty.')
  if (!settings.siteDescription) blockers.push('Site settings: the search description is empty.')
  if (!settings.heroLines) warnings.push('Site settings: no headline lines. The home page falls back to her name.')
  if (!settings.intro) warnings.push('Site settings: the short introduction is empty.')
  if (!settings.manifesto) warnings.push('Site settings: no manifesto lines, so that section is hidden.')
  if (!settings.capabilities) warnings.push('Site settings: no capabilities, so that section is hidden.')
  if (!settings.paragraphs) warnings.push('Site settings: the About text is empty.')
  if (!settings.hasPortrait) warnings.push('Site settings: no portrait uploaded. The About page shows a monogram.')
  if (settings.hasPortrait && !settings.portraitAlt) blockers.push('Site settings: the portrait has no alternative text.')
  if (!settings.socials) warnings.push('Site settings: no social links. None are shown.')
  if (!settings.publicEmail) info.push('Site settings: no public email. Visitors use the contact form only.')
  if (!settings.rightsNote) {
    info.push('Site settings: no rights note in the footer. Add one once written permission is on file.')
  }
}

// ---------- Projects ----------
const now = new Date()
const liveNow = []

for (const project of projects ?? []) {
  const label = `Case study "${project.title}"`
  const cleared = project.permissionStatus === 'verbal' || project.permissionStatus === 'written'
  const scheduled = project.publishAfter && new Date(project.publishAfter) > now

  if (!cleared) {
    info.push(`${label}: permission is pending, so it does not appear on the site.`)
    continue
  }
  if (scheduled) {
    info.push(`${label}: scheduled to appear on ${new Date(project.publishAfter).toDateString()}.`)
  } else {
    liveNow.push(project)
  }

  if (project.permissionStatus === 'verbal') {
    warnings.push(`${label}: only a verbal go-ahead is recorded. Get written confirmation (Appendix C).`)
  }
  if (!project.year) warnings.push(`${label}: no year.`)
  if (!project.hasHero) warnings.push(`${label}: no main image, so the work list and page show a fallback.`)
  if (project.hasHero && !project.heroAlt) blockers.push(`${label}: the main image has no alternative text.`)
  for (const [index, image] of (project.gallery ?? []).entries()) {
    if (image.hasAsset && !image.alt) blockers.push(`${label}: gallery image ${index + 1} has no alternative text.`)
  }
  if (!project.story) warnings.push(`${label}: no brief, insight, idea or execution. The strategy side of her role is not shown.`)
  if (!project.credits) warnings.push(`${label}: no team credits.`)
  if (!project.lines) warnings.push(`${label}: no copy lines.`)

  for (const line of project.lines ?? []) {
    if (line.kind === 'teaser' && !line.quoted) {
      warnings.push(`${label}: a teaser line has no "quoted from". Check whether it quotes a song.`)
    }
  }
  if ((project.lines ?? []).some((line) => line.language === 'yo')) {
    info.push(`${label}: includes Yoruba lines. Check tone marks and underdots against the source files.`)
  }
}

if (liveNow.length === 0) blockers.push('No case study is visible on the site right now.')

// ---------- Dashes in her copy ----------
// The brief asks for no em dashes. This lists any in the content so they can be rewritten.
const dashPattern = /[\u2013\u2014]/
const walk = (value, path, found) => {
  if (typeof value === 'string') {
    if (dashPattern.test(value)) found.push(path)
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, found))
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (!key.startsWith('_')) walk(item, path ? `${path}.${key}` : key, found)
    }
  }
}
const dashFound = []
walk(all, '', dashFound)
for (const path of dashFound) warnings.push(`Dash character in content at ${path}. Rewrite with a full stop, comma or colon.`)

// ---------- Environment (local file only) ----------
if ((process.env.NEXT_PUBLIC_SITE_URL ?? '').includes('localhost')) {
  warnings.push('NEXT_PUBLIC_SITE_URL points to localhost. Set the real address in Vercel before launch.')
}
if ((process.env.CONTACT_FROM_EMAIL ?? '').includes('onboarding@resend.dev')) {
  warnings.push('CONTACT_FROM_EMAIL is the Resend test sender. Verify her domain in Resend and change it in Vercel.')
}
info.push('Environment checks read .env.local only. Confirm the same values in the Vercel dashboard.')

// ---------- Report ----------
const print = (title, items) => {
  console.log(`\n${title} (${items.length})`)
  for (const item of items) console.log(`  - ${item}`)
}
print('BLOCKERS', blockers)
print('WARNINGS', warnings)
print('INFO', info)
console.log(blockers.length ? '\nNot ready to share.' : '\nNo blockers.')
process.exit(blockers.length ? 1 : 0)