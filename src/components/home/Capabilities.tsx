import { Marquee } from '@/components/ui/Marquee'
import type { Capability } from '@/sanity/types'

/**
 * One row per capability. Everything is visible at rest: number, title,
 * summary and the item list. On a mouse or trackpad, the row under the pointer
 * swaps its outline title for a running solid one and rolls its items, which
 * marks where you are without hiding anything from touch or keyboard users.
 */
export function Capabilities({ items }: { items: Capability[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((item, index) => {
        const list = item.items ?? []
        return (
          <li key={item._key} className="cap-row relative border-b border-line py-5 md:py-6">
            <span aria-hidden="true" className="cap-rule absolute inset-x-0 bottom-[-1px] h-px bg-accent" />
            <div className="cap-shift grid gap-3 md:grid-cols-12 md:items-start md:gap-6">
              <span className="font-body text-small tabular-nums text-accent md:col-span-1 md:pt-3">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="relative min-w-0 md:col-span-7">
                <h3 className="text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] leading-[0.95]">
                  <span className="cap-ghost type-outline block text-paper">{item.title}</span>
                </h3>
                {/* Decorative running copy of the title; the heading above is the real one */}
                <Marquee duration={22} className="cap-solid pointer-events-none absolute inset-0 hidden items-center md:flex">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="pr-[0.4em] font-display text-[clamp(2.5rem,1.4rem+4.4vw,5.5rem)] font-semibold uppercase leading-[0.95]">
                      {item.title}
                      <span className="text-accent"> · </span>
                    </span>
                  ))}
                </Marquee>
              </div>

              <div className="md:col-span-4 md:pt-2">
                <p className="text-small text-paper-2">{item.summary}</p>
              </div>
            </div>

            {list.length > 0 ? (
              <div className="relative mt-3 md:ml-[calc(100%/12)]">
                <ul className="cap-static flex flex-wrap gap-x-3 gap-y-1 text-small text-paper-3">
                  {list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
                <Marquee duration={28} reverse className="cap-items absolute inset-0 hidden items-center [@media(hover:hover)_and_(pointer:fine)]:md:flex">
                  {[...list, ...list].map((entry, i) => (
                    <span key={`${i}-${entry}`} className="label whitespace-nowrap pr-6 text-paper-2">
                      {entry}
                      <span className="pl-6 text-accent">·</span>
                    </span>
                  ))}
                </Marquee>
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
