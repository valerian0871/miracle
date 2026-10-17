import type { ReactNode } from 'react'
import { bodyFont, displayFont } from '@/lib/fonts'

/*
  Runs before the first paint. Decides how the intro screen plays:
  "playing" on a first visit, "short" (doors only) for a returning visitor,
  and "done" (no intro) later in the same session, on back/forward, or for
  visitors who prefer reduced motion.
*/
const introFlag = `(function(){var d=document.documentElement;try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('intro-seen')==='1';var n=performance.getEntriesByType('navigation')[0];var b=n&&n.type==='back_forward';var e=localStorage.getItem('intro-seen')==='1';d.setAttribute('data-intro',(r||s||b)?'done':e?'short':'playing');}catch(x){d.setAttribute('data-intro','done');}})();`

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