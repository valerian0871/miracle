import { ImageResponse } from 'next/og'
import { getSettings } from '@/sanity/data'

export const alt = 'Portfolio of a creative strategist and copywriter'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const settings = await getSettings()

  // Image generation cannot read CSS variables. These hex values mirror the tokens in globals.css.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0d0e0d',
          color: '#f1eee6',
          padding: 64,
        }}
      >
        <div style={{ display: 'flex', width: 96, height: 8, background: '#d4a24a' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1 }}>
            {settings.name}
          </div>
          <div style={{ fontSize: 40, color: '#bab7ad', marginTop: 24 }}>{settings.role}</div>
        </div>
      </div>
    ),
    { ...size },
  )
}