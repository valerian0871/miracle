import type Lenis from 'lenis'

/**
 * Intro timing in milliseconds. Keep in step with the intro rules in globals.css:
 * the mark draws over 1200ms and the doors run for DOOR_MS.
 */
export const INTRO = {
  /** First visit: draw the mark, sweep in the line, then the doors */
  full: { line: 1000, close: 2100, open: 2700, gone: 3300 },
  /** Returning visitor: doors only */
  short: { line: 0, close: 0, open: 600, gone: 1200 },
} as const
export const DOOR_MS = 1200

/**
 * The intro state is written to <html data-intro> by the inline script in the
 * root layout: "playing" (first visit), "short" (returning visitor), then
 * "reveal" while the doors part, then "done".
 */
export function isIntroRunning(): boolean {
  const state = document.documentElement.dataset.intro
  return state === 'playing' || state === 'short'
}

/** Scrub lag for every scroll scene, in seconds */
export const SCRUB = 0.6

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True on a mouse or trackpad. Hover-only effects are gated on this. */
export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

type Gsap = typeof import('gsap').gsap
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger

let gsapPromise: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTriggerType }> | null = null

/** GSAP and ScrollTrigger load after first paint and register once */
export function loadGsap() {
  gsapPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger)
      return { gsap, ScrollTrigger }
    },
  )
  return gsapPromise
}

/** The page's Lenis instance, or null when smooth scrolling is off */
let lenis: Lenis | null = null
export const getLenis = () => lenis
export const setLenis = (instance: Lenis | null) => {
  lenis = instance
}

/**
 * Page-level flags read by CSS on <html>:
 * data-chrome="hidden" hides the header during full-screen scenes,
 * data-hero="visible" keeps the header wordmark clipped while the hero shows the name.
 */
export function setRootFlag(name: 'chrome' | 'hero', value: string | null) {
  const root = document.documentElement
  if (value === null) delete root.dataset[name]
  else root.dataset[name] = value
}

/**
 * Link click handler for "/#section" links. On the home page it scrolls there
 * with Lenis instead of jumping; anywhere else the normal navigation runs.
 */
export function smoothHashClick(event: { preventDefault: () => void }, href: string) {
  const lenis = getLenis()
  if (!lenis || !href.startsWith('/#') || window.location.pathname !== '/') return
  const target = document.getElementById(href.slice(2))
  if (!target) return
  event.preventDefault()
  lenis.scrollTo(target, { offset: -96 })
  history.replaceState(null, '', href)
}
