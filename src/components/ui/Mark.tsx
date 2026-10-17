/**
 * The site's mark: an opening quotation mark, drawn for this site.
 * Each glyph is one closed path with pathLength=1, so it can be drawn
 * with stroke-dashoffset from 1 to 0.
 */
const GLYPH = 'M40 6C21 14 7 31 6 57A16 16 0 1 0 22 41C19 41 17 41.5 15 42.5C19 29 28 19 45 13Z'

type Props = {
  className?: string
  /** Outline only, for stroke-draw */
  outline?: boolean
}

export function Mark({ className, outline = false }: Props) {
  return (
    <svg viewBox="0 0 92 80" className={className} aria-hidden="true" focusable="false">
      <g fill={outline ? 'none' : 'currentColor'} stroke={outline ? 'currentColor' : 'none'}>
        <path d={GLYPH} pathLength={1} />
        <path d={GLYPH} pathLength={1} transform="translate(44 0)" />
      </g>
    </svg>
  )
}
