/**
 * One icon set, drawn for this site: 24px grid, 1.5px stroke, round caps and
 * joins, currentColor. Add new icons here rather than importing a library.
 */
const PATHS = {
  menu: 'M4 9h16M4 15h16',
  close: 'M6 6l12 12M18 6L6 18',
  'arrow-right': 'M4 12h15M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17L17 7M8.5 7H17v8.5',
  'arrow-down': 'M12 4v15M6 13l6 6 6-6',
  'arrow-up': 'M12 20V5M6 11l6-6 6 6',
  plus: 'M12 5v14M5 12h14',
  external: 'M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4',
} as const

export type IconName = keyof typeof PATHS

type Props = {
  name: IconName
  /** Rendered size in px */
  size?: number
  className?: string
}

export function Icon({ name, size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
