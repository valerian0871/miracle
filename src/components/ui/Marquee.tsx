import type { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Seconds for one full loop */
  duration?: number
  reverse?: boolean
  className?: string
}

/**
 * An endless horizontal loop. The content is rendered twice and the track
 * moves by half its width; the copy is hidden from assistive technology, so
 * callers must make sure the real text is available once elsewhere.
 */
export function Marquee({ children, duration = 30, reverse = false, className = '' }: Props) {
  const style = {
    '--marquee-duration': `${duration}s`,
    '--marquee-direction': reverse ? 'reverse' : 'normal',
  } as CSSProperties

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee" style={style}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  )
}
