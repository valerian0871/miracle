import { SanityImage } from '@/components/ui/SanityImage'
import { toImage } from '@/sanity/lib/image'
import type { Maybe, SanityImageData } from '@/sanity/types'

/** First letters of the first and last words of the name */
function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return `${first}${last}`.toUpperCase()
}

export function Portrait({ image, name }: { image: Maybe<SanityImageData>; name: string }) {
  const photo = toImage(image, `Portrait of ${name}`)

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-line bg-ink-raised">
      {photo ? (
        <SanityImage
          image={photo}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full items-center justify-center"
          role="img"
          aria-label={`Monogram for ${name}`}
        >
          <span className="font-display text-h1 uppercase text-paper-3">{initials(name)}</span>
        </div>
      )}
    </div>
  )
}