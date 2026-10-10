'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SanityImage } from '@/components/ui/SanityImage'
import type { ImageProps } from '@/sanity/lib/image'

export type GalleryItem = ImageProps & { caption?: string | null }

export function Gallery({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)

  const step = useCallback(
    (direction: number) => setIndex((current) => (current + direction + items.length) % items.length),
    [items.length],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!dialogRef.current?.open) return
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step])

  if (items.length === 0) return null

  const current = items[index] ?? items[0]

  return (
    <section aria-labelledby="gallery-title" className="py-10">
      <Container>
        <h2 id="gallery-title" className="mb-6 text-h3">
          The work
        </h2>

        <ul className="gap-3 md:columns-2">
          {items.map((item, itemIndex) => (
            <li key={`${item.src}-${itemIndex}`} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => {
                  setIndex(itemIndex)
                  dialogRef.current?.showModal()
                }}
                aria-label={`Open image ${itemIndex + 1} of ${items.length}${item.alt ? `: ${item.alt}` : ''}`}
                className="lift block w-full rounded-md border border-line"
              >
                <SanityImage
                  image={item}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-auto w-full rounded-md"
                />
              </button>
              {item.caption ? <p className="mt-1 text-caption text-paper-3">{item.caption}</p> : null}
            </li>
          ))}
        </ul>

        <dialog ref={dialogRef} className="sheet" aria-label="Image viewer">
          <div className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between gap-2 pb-2">
              <p className="text-small text-paper-2" aria-live="polite">
                {index + 1} of {items.length}
              </p>
              <div className="flex gap-1">
                {items.length > 1 ? (
                  <>
                    <button type="button" onClick={() => step(-1)} className="btn btn-secondary">
                      Previous
                    </button>
                    <button type="button" onClick={() => step(1)} className="btn btn-secondary">
                      Next
                    </button>
                  </>
                ) : null}
                <button type="button" onClick={() => dialogRef.current?.close()} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center">
              <SanityImage
                image={current}
                sizes="100vw"
                className="h-auto max-h-[80dvh] w-auto max-w-full object-contain"
              />
            </div>

            {current.caption ? (
              <p className="pt-2 text-center text-small text-paper-2">{current.caption}</p>
            ) : null}
          </div>
        </dialog>
      </Container>
    </section>
  )
}