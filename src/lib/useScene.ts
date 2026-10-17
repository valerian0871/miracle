'use client'

import { useEffect, type DependencyList, type RefObject } from 'react'
import { loadGsap, prefersReducedMotion } from './motion'

type Tools = Awaited<ReturnType<typeof loadGsap>>

/**
 * Runs a GSAP scroll scene scoped to one element. Everything created inside
 * `build` is reverted on unmount. Nothing runs for reduced motion: the
 * component's static layout is the reduced-motion version.
 */
export function useScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  build: (root: T, tools: Tools) => void | (() => void),
  deps: DependencyList = [],
  /** False keeps the static layout, for example when there is too little content to pin */
  enabled = true,
) {
  useEffect(() => {
    const root = ref.current
    if (!root || !enabled || prefersReducedMotion()) return

    let revert: (() => void) | undefined
    let cancelled = false

    void loadGsap().then((tools) => {
      if (cancelled) return
      // Switch the markup to its animated layout before anything is measured
      root.dataset.scene = 'on'
      const context = tools.gsap.context(() => build(root, tools), root)
      revert = () => context.revert()
      // Web fonts change line heights after load, so measure again once they are ready
      void document.fonts?.ready.then(() => tools.ScrollTrigger.refresh())
    })

    return () => {
      cancelled = true
      revert?.()
      delete root.dataset.scene
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps])
}

/** Records a pinned range on the element so SmoothScroll can snap to its edges */
export function markPin(el: HTMLElement, start: number, end: number) {
  el.dataset.pinStart = String(Math.round(start))
  el.dataset.pinEnd = String(Math.round(end))
}
