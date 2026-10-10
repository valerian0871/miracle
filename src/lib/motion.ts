/** How long the intro screen plays, in milliseconds. Keep in step with the 1400ms bar animation in globals.css. */
export const INTRO_MS = 1600

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}