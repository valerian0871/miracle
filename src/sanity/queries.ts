/*
  Every image field is projected with its dimensions and a low-quality blur
  placeholder, both stored by Sanity when the file is uploaded.
*/
const IMAGE = `{ ..., "dimensions": asset->metadata.dimensions, "lqip": asset->metadata.lqip }`

export const SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  name,
  role,
  location,
  siteDescription,
  heroLines,
  intro,
  manifesto,
  capabilities[]{ _key, title, summary, items },
  aboutParagraphs,
  experience[]{ _key, organisation, role, period, note },
  education[]{ _key, institution, award, period },
  portrait${IMAGE},
  publicEmail,
  socials[]{ _key, platform, label, url },
  availability,
  rightsNote
}`

const SUMMARY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  brand,
  agency,
  year,
  disciplines,
  roleSummary,
  tagline,
  order,
  publishAfter,
  heroImage${IMAGE}
`

/* Only projects with a recorded go-ahead are ever returned */
const ALLOWED = `_type == "project" && defined(slug.current) && permissionStatus in ["verbal", "written"]`

export const PROJECTS_QUERY = `*[${ALLOWED}] | order(order asc, year desc){ ${SUMMARY_FIELDS} }`

export const PROJECT_QUERY = `*[${ALLOWED} && slug.current == $slug][0]{
  ${SUMMARY_FIELDS},
  permissionStatus,
  brief,
  insight,
  idea,
  execution,
  result,
  copyLines[]{ _key, text, kind, language, quotedFrom },
  gallery[]${IMAGE},
  credits[]{ _key, name, role }
}`