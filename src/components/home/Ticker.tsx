'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const STEP_MS = 2400

/**
 * One line that rolls upwards through a short list, holding each item long
 * enough to read. The full list is in the accessible text; the rolling copy
 * is hidden from assistive technology.
 */
export function Ticker({ items, className = '' }: { items: string[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (items.length < 2 || prefersReducedMotion()) return
    const timer = window.setInterval(() => {
      setAnimate(true)
      setIndex((i) => i + 1)
    }, STEP_MS)
    return () => window.clearInterval(timer)
  }, [items.length])

  // After showing the repeated first item, jump back to the real one without a transition
  useEffect(() => {
    if (index !== items.length) return
    const reset = window.setTimeout(() => {
      setAnimate(false)
      setIndex(0)
    }, 700)
    return () => window.clearTimeout(reset)
  }, [index, items.length])

  if (items.length === 0) return null

  return (
    <span className={`relative inline-block h-[1.5em] overflow-hidden align-bottom ${className}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <span
        aria-hidden="true"
        className="block"
        style={{
          transform: `translateY(${-index * 1.5}em)`,
          transition: animate ? 'transform 700ms var(--ease-out)' : 'none',
        }}
      >
        {[...items, items[0]].map((item, i) => (
          <span key={`${i}-${item}`} className="block h-[1.5em] leading-[1.5em]">
            {item}
          </span>
        ))}
      </span>
    </span>
  )
}
