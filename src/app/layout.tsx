import type { ReactNode } from 'react'
import { bodyFont, displayFont } from '@/lib/fonts'

/*
  Runs before the first paint. Decides whether the intro screen will play:
  it plays once per browser session, and never for visitors who prefer reduced motion.
*/
const introFlag = `(function(){try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('intro-seen')==='1';document.documentElement.setAttribute('data-intro',(r||s)?'done':'playing');}catch(e){document.documentElement.setAttribute('data-intro','done');}})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introFlag }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}