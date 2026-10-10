import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'
import type { Maybe, SanityImageData } from '../types'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/** Plain, serialisable image data for the client-side image component */
export interface ImageProps {
  /** Base CDN URL with no size parameters. The loader adds width and format. */
  src: string
  alt: string
  width: number
  height: number
  blur?: string
  /** Focal point from the Studio hotspot, 0 to 1 on each axis */
  focal?: { x: number; y: number }
}

/**
 * Converts Sanity image data into props for <SanityImage>. Returns null when
 * there is no uploaded asset, so callers can render a fallback.
 *
 * It deliberately builds the URL from the asset alone. Studio crop rectangles
 * are ignored; only the hotspot is used, as an object-position. That keeps
 * every image's behaviour predictable.
 */
export function toImage(image: Maybe<SanityImageData>, fallbackAlt = ''): ImageProps | null {
  if (!image?.asset?._ref) return null
  const dims = image.dimensions
  return {
    src: urlFor({ asset: image.asset }).url(),
    alt: image.alt || fallbackAlt,
    width: dims?.width ?? 1600,
    height: dims?.height ?? 900,
    blur: image.lqip ?? undefined,
    focal: image.hotspot ? { x: image.hotspot.x, y: image.hotspot.y } : undefined,
  }
}
/**
 * A 1200 by 630 link-preview image. The ad is letterboxed on the site's ink colour
 * and not cropped, so the copy inside it is never cut off.
 */
export function ogImageUrl(image: Maybe<SanityImageData>): string | undefined {
  if (!image?.asset?._ref) return undefined
  return urlFor({ asset: image.asset })
    .width(1200)
    .height(630)
    .fit('fill')
    .bg('0d0e0d')
    .auto('format')
    .url()
}