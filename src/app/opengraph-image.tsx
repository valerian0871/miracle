import { ImageResponse } from 'next/og'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SETTINGS_QUERY } from '@/sanity/queries'
import type { SiteSettings } from '@/sanity/types'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const settings = await sanityFetch<SiteSettings>({ query: SETTINGS_QUERY })
  const name = settings?.name ?? 'Portfolio'
  const role = settings?.role ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          backgroundColor: '#0d0e0d',
          color: '#f1eee6',
          fontFamily: 'Arial Narrow, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, textTransform: 'uppercase', lineHeight: 0.92, color: '#f1eee6' }}>
          {name}
        </div>
        {role ? (
          <div style={{ fontSize: 28, marginTop: 24, color: '#d4a24a', textTransform: 'uppercase', letterSpacing: 2 }}>
            {role}
          </div>
        ) : null}
      </div>
    ),
    { ...size },
  )
}

