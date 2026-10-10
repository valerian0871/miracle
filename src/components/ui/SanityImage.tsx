'use client'

import Image, { type ImageLoaderProps } from 'next/image'
import type { ImageProps as SanityImageProps } from '@/sanity/lib/image'

function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 80))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}

type Props = {
  image: SanityImageProps
  /** Tells the browser how wide the image will be, so it downloads the right size */
  sizes: string
  priority?: boolean
  /** Fill the parent, which must have position: relative and a set aspect ratio */
  fill?: boolean
  className?: string
}

export function SanityImage({ image, sizes, priority = false, fill = false, className }: Props) {
  const objectPosition = image.focal
    ? `${image.focal.x * 100}% ${image.focal.y * 100}%`
    : undefined

  const common = {
    loader: sanityLoader,
    src: image.src,
    alt: image.alt,
    sizes,
    priority,
    placeholder: image.blur ? ('blur' as const) : ('empty' as const),
    blurDataURL: image.blur,
    className,
    style: objectPosition ? { objectPosition } : undefined,
  }

  return fill ? (
    <Image {...common} fill />
  ) : (
    <Image {...common} width={image.width} height={image.height} />
  )
}