'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Mark } from '@/components/ui/Mark'
import { DOOR_MS, INTRO } from '@/lib/motion'

type Stage = 'wait' | 'draw' | 'line' | 'close' | 'open' | 'gone'

/** Page regions that stay out of reach while the intro covers them */
const shell = () => document.querySelectorAll<HTMLElement>('[data-shell]')

function remember() {
  try {
    sessionStorage.setItem('intro-seen', '1')
    localStorage.setItem('intro-seen', '1')
  } catch {
    // Private browsing can block storage. The intro may replay, which is harmless.
  }
}

/**
 * First visit: the mark draws itself, the name and one line sweep in, then two
 * doors close and part to show the hero (3.3s). Returning visitors get the
 * doors only (1.2s). Same session, reduced motion and back/forward: nothing.
 */
export function Intro({ name, line }: { name: string; line: string | null }) {
  const [stage, setStage] = useState<Stage>('wait')
  const timers = useRef<number[]>([])
  const exiting = useRef(false)

  const schedule = useCallback((plan: [Stage, number][]) => {
    timers.current.forEach(window.clearTimeout)
    timers.current = plan.map(([next, at]) =>
      window.setTimeout(() => {
        setStage(next)
        const root = document.documentElement
        if (next === 'open') {
          // The hero starts rising behind the parting doors
          root.dataset.intro = 'reveal'
          shell().forEach((el) => (el.inert = false))
        }
        if (next === 'gone') {
          root.dataset.intro = 'done'
          remember()
        }
      }, at),
    )
  }, [])

  const exit = useCallback(() => {
    if (exiting.current) return
    exiting.current = true
    const { open, gone } = INTRO.short
    schedule([
      ['close', 0],
      ['open', open],
      ['gone', gone],
    ])
  }, [schedule])

  useEffect(() => {
    const mode = document.documentElement.dataset.intro
    if (mode !== 'playing' && mode !== 'short') return

    shell().forEach((el) => (el.inert = true))

    if (mode === 'short') {
      exit()
    } else {
      const { line: lineAt, close, open, gone } = INTRO.full
      // One frame on "wait" so the stroke-draw has a start state to transition from
      schedule([
        ['draw', 32],
        ...(line ? ([['line', lineAt]] as [Stage, number][]) : []),
        ['close', close],
        ['open', open],
        ['gone', gone],
      ])
      timers.current.push(window.setTimeout(() => (exiting.current = true), close))
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') exit()
    }
    window.addEventListener('keydown', onKey)
    const pending = timers
    return () => {
      pending.current.forEach(window.clearTimeout)
      window.removeEventListener('keydown', onKey)
      shell().forEach((el) => (el.inert = false))
    }
  }, [exit, line, schedule])

  return (
    <div className="intro" data-stage={stage} style={{ '--door-ms': `${DOOR_MS}ms` } as CSSProperties}>
      <div className="grain" />
      <div className="intro-content" aria-hidden="true">
        <Mark className="intro-mark w-24 text-accent md:w-32" />
        <p className="intro-name font-display text-h3 uppercase">{name}</p>
        {line ? <p className="intro-line max-w-xl text-lead text-paper-2">{line}</p> : null}
      </div>
      <div className="intro-door" data-side="left" />
      <div className="intro-door" data-side="right" />
      <button type="button" onClick={exit} className="intro-skip label">
        Skip intro
        <Icon name="arrow-right" size={16} />
      </button>
    </div>
  )
}
