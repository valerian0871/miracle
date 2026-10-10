'use client'

import { useId, useState } from 'react'
import type { Capability } from '@/sanity/types'

export function Capabilities({ items }: { items: Capability[] }) {
  const [openKey, setOpenKey] = useState<string | null>(items[0]?._key ?? null)
  const baseId = useId()

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const open = openKey === item._key
        const buttonId = `${baseId}-button-${item._key}`
        const panelId = `${baseId}-panel-${item._key}`

        return (
          <li key={item._key}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenKey(open ? null : item._key)}
                className="flex w-full items-baseline justify-between gap-3 py-4 text-left"
              >
                <span className="flex items-baseline gap-3">
                  <span className="w-4 shrink-0 font-body text-small font-normal tabular-nums text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.title}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`inline-block text-lead text-paper-2 transition-transform duration-(--duration-base) ease-brand ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
            </h3>

            <div id={panelId} role="region" aria-labelledby={buttonId} className="panel" data-open={open} inert={!open}>
              <div>
                <div className="grid gap-3 pb-6 md:grid-cols-12">
                  <p className="text-lead text-paper-2 md:col-span-6 md:col-start-5">{item.summary}</p>
                  {item.items?.length ? (
                    <ul className="space-y-1 text-small text-paper-2 md:col-span-3 md:col-start-5">
                      {item.items.map((entry) => (
                        <li key={entry} className="border-t border-line pt-1">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}