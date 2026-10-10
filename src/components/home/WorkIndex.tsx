'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SanityImage } from '@/components/ui/SanityImage'
import type { ImageProps } from '@/sanity/lib/image'

export type WorkItem = {
  _id: string
  slug: string
  title: string
  brand: string
  year?: number | null
  roleSummary: string
  image: ImageProps | null
}

function Thumb({ item, sizes }: { item: WorkItem; sizes: string }) {
  return item.image ? (
    <SanityImage image={item.image} fill sizes={sizes} className="object-cover" />
  ) : (
    <div className="flex h-full items-center justify-center p-3 text-center">
      <span className="font-display text-h3 uppercase text-paper-3">{item.brand}</span>
    </div>
  )
}

export function WorkIndex({ items }: { items: WorkItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?._id)

  if (items.length === 0) {
    return <p className="text-lead text-paper-2">Case studies are being prepared.</p>
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <ol className="border-t border-line lg:col-span-7">
        {items.map((item, index) => (
          <li key={item._id} className="border-b border-line">
            <Link
              href={`/work/${item.slug}`}
              data-active={item._id === activeId}
              onMouseEnter={() => setActiveId(item._id)}
              onFocus={() => setActiveId(item._id)}
              className="group block py-4 transition-opacity duration-(--duration-base) ease-brand lg:data-[active=false]:opacity-50"
            >
              <span className="flex gap-3">
                <span className="w-4 shrink-0 text-small tabular-nums text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-h3 uppercase">{item.title}</span>
                  <span className="mt-1 block text-small text-paper-2">
                    {item.brand}
                    {item.year ? `, ${item.year}` : ''}
                  </span>
                  <span className="block text-small text-paper-3">{item.roleSummary}</span>
                </span>
              </span>

              <span className="relative mt-3 block aspect-[4/3] overflow-hidden rounded-md border border-line bg-ink-raised lg:hidden">
                <Thumb item={item} sizes="100vw" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
        <div className="sticky top-12 relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-ink-raised">
          {items.map((item) => (
            <div
              key={item._id}
              className={`absolute inset-0 transition-opacity duration-(--duration-slow) ease-brand ${
                item._id === activeId ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Thumb item={item} sizes="40vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}