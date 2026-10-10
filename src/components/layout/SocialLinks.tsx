import type { SocialLink } from '@/sanity/types'

const LABELS: Record<SocialLink['platform'], string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  x: 'X',
  behance: 'Behance',
  other: 'Link',
}

export function SocialLinks({ links }: { links: SocialLink[] }) {
  const valid = links.filter((link) => link.url?.startsWith('https://'))
  if (valid.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {valid.map((link) => (
        <li key={link._key}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-line text-small">
            {link.label || LABELS[link.platform]}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}