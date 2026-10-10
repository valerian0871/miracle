'use client'

import { useEffect } from 'react'
import { INTRO_MS } from '@/lib/motion'

function finishIntro() {
  const root = document.documentElement
  root.dataset.intro = 'done'
  try {
    sessionStorage.setItem('intro-seen', '1')
  } catch {
    // Private browsing can block storage. The intro may replay, which is harmless.
  }
}

export function Intro({ name, role }: { name: string; role: string }) {
  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'playing') return

    const timer = window.setTimeout(finishIntro, INTRO_MS)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finishIntro()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="intro" role="presentation">
      <div className="w-full max-w-md px-3 text-center">
        <p className="font-display text-h3 uppercase">{name}</p>
        <p className="mt-1 text-small text-paper-2">{role}</p>
        <div className="intro-bar mt-4" />
      </div>
      <button
        type="button"
        onClick={finishIntro}
        className="link-line absolute bottom-4 right-3 text-caption text-paper-2"
      >
        Skip intro
      </button>
    </div>
  )
}