# ownitt.fr — Reference Notes

_Observed 2026-10-17 in headless Chromium (Playwright 1.64) at 1440×900 and 375×812._

**Method (ground rule 2).** Loaded the live site, sampled fixed layers every frame during the loader,
screenshotted the load at 100 ms → 7 s, stepped the page in half-viewport increments with Lenis
`scrollTo`, ran a slow wheel pass (100 px every 60 ms) and a fast one (1600 px bursts), opened the
menu, hovered service rows and the project wall. Durations and easings come from the computed CSS
rules (`document.styleSheets`) and from the shipped JS bundles (GSAP timelines, Lenis options,
`setTimeout` stage tables). Raw captures live outside the repo in `C:\Users\user\tools\ownitt-capture\`.

**Legend.** ✅ = read from source/computed style · 👁 = observed visually only · Δ = differs from the
previous static-HTML draft of this file.

**Current stack** (for the last column): Next.js 16.4, React 19.3, Tailwind v4, GSAP 3.15.0
(ScrollTrigger ships inside the `gsap` package), no smooth-scroll library.

---

## 0. Libraries and global systems

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable (current stack)? |
|---|---|---|---|---|---|---|
| Framework | — | Next.js App Router, Turbopack chunks, CSS Modules | — | — | Next.js ✅ | **Yes** — same framework |
| Smooth scroll Δ | Wheel | Lenis virtual scroll on `window`; `smoothWheel: true`, touch is native (`syncTouch` off) | `duration: 1.1` s ✅ | `t => min(1, 1.001 − 2^(−10t))` (expo-out) ✅ | **Lenis 1.3.23** ✅ | **No — add `lenis`** (≈ 4 KB gz). Only new dependency |
| Lenis ↔ GSAP glue | Every frame | `lenis.on('scroll', ScrollTrigger.update)`; `gsap.ticker.add(t => lenis.raf(t*1000))`; `gsap.ticker.lagSmoothing(0)` ✅ | — | — | Lenis + GSAP | **Yes** once Lenis is added |
| Scroll scenes Δ | Scroll | GSAP timelines with `scrollTrigger: { pin, scrub }`; scrub lag 0.5–1 s | per scene (below) | per tween (`power1–4`, `back.out(2)`) ✅ | **GSAP 3.15.0 + ScrollTrigger + Observer** ✅ | **Yes** — identical GSAP version already installed |
| Pin snapping Δ | Scroll idle 90 ms | Inside a pinned range, if progress < 14 % snap to start, > 86 % snap to end; `[data-snap-section]` snaps when ≥ 22 % on screen | 0.5 s ✅ | ease-out cubic ✅ | Custom + Lenis `scrollTo` | **Yes** — ~30 lines |
| Easing tokens Δ | — | `--ease-out-elegant: cubic-bezier(.16,1,.3,1)` (dominant), `--ease-snap (.85,0,.15,1)`, `--ease-slow-in (.65,0,.35,1)`, `--ease-rubber (.34,1.56,.64,1)`; also `.77,0,.175,1` and `.76,0,.24,1` for wipes ✅ | — | — | CSS vars | **Yes** — tokens |
| Duration tokens Δ | — | `--dur-instant .18s`, `--dur-quick .35s`, `--dur-base .6s`, `--dur-slow 1.05s`, `--dur-cinema 2s` ✅ | — | — | CSS vars | **Yes** |
| `[data-reveal]` Δ | IntersectionObserver | `opacity` + `transform` | 0.72 s ✅ | `(.16,1,.3,1)` ✅ | CSS + IO | **Yes** — current `Reveal` already does this |
| Reduced motion Δ | `prefers-reduced-motion` | Every infinite animation set to `none`; reveals `transition: none`; intro replaced by 0.3 s fade; menu keeps only `flex-grow 0.3s` ✅ | — | — | CSS | **Yes** |
| Custom cursor Δ | `(hover: hover) and (pointer: fine)` | `cursor: none` on everything; 6 px dot + 52 px ring; ring grows on clickables (`width/height 0.3s (.77,0,.175,1)`), shows a "scroll" label with a travelling dot in pinned scenes ✅ | 0.2–0.42 s | `(.77,0,.175,1)`, `(.16,1,.3,1)` | Custom JS | **Yes** — but see deviations |
| Page transition Δ | Internal link | Curtain `clip-path: inset(0 0 102%) → inset(0 0 -2px)` + grain; router push at 540 ms; enter rise 520 ms ✅ | 540 / 520 ms ✅ | — | CSS + custom `TransitionLink` | **Yes** |
| Palette Δ | — | `#000` / `#0a0a0b` ink, `#f4f1ea` cream, `#98ff03` acid-green accent, fg-dim `#ffffff9e` ✅ | — | — | — | **Pattern only** — keep Miracle's palette |
| Type Δ | — | Titles: Elza Condensed 800, uppercase, −0.025em; Text: IvyPresto Display (italic for accents); labels 12 px uppercase +0.3em ✅ | — | — | Adobe Fonts | **Pattern only** — current Barlow Condensed + Source Serif map 1:1 |

---

## 1. Loading screen (`IntroAnimation`)

Stage table read from the bundle (ms from mount) ✅:

| Stage | First visit | Returning visit (`localStorage.ownitt_intro_seen`) | Skip pressed |
|---|---|---|---|
| grain on | 0 | 0 | — |
| image grid in | 100 | — (no grid) | — |
| grid converges | 1700 | — | — |
| logo stroke-draw | 2300 | 150 | — |
| tagline sweep | 4800 | 2400 | — |
| doors close (exit) | 6300 | 3700 | 0 |
| hero revealed under doors | 7200 | 4600 | 900 |
| loader fades | 8300 | 5700 | 1800 |
| unmounted | 8800 | 6200 | 2300 |

No intro at all for: reduced motion, internal navigation (`sessionStorage.ownitt_skip_intro`), back/forward.

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Grain | Mount | SVG `feTurbulence` rect fades to 0.2, then drifts in `steps(6)` | 0.7 s fade, 1.8 s drift loop ✅ | ease-out / `steps(6)` | CSS | **Yes** |
| Image grid Δ | 100 ms | 10 cells; each `clip-path: inset(50%) → 0` + `translateY(14px)`; every 3rd cell flips `rotateY` | 0.9 s cells, 1 s flip, 75 ms stagger ✅ | `(.65,0,.35,1)`, `(.77,0,.175,1)` | CSS | **Yes — needs 10 permitted images** (open issue) |
| Grid converge Δ | 1700 ms | Grid scales in + blurs out | 1.2 s transform, 0.7 s opacity ✅ | `(.65,0,.35,1)` | CSS | **Yes** (blur is a filter — see motion spec) |
| Logo stroke-draw Δ | 2300 ms | Every path `pathLength=1`, `stroke-dashoffset → 0`; then fill fades in and a slash `rect` strikes via `clip-path` | 2 s draw, 0.9 s fill, 0.46 s strike ✅ | `(.77,0,.175,1)` | CSS | **Yes** — needs an outline SVG of Miracle's mark |
| Tagline sweep Δ | 4800 ms | Italic tagline from `translateX(110px)` + `blur(20px)` + 0 opacity; underline `scaleX` draws after 0.65 s | 1.2 s / 0.8 s ✅ | `(.16,1,.3,1)` / `(.77,0,.175,1)` | CSS | **Yes** |
| Two-door wipe Δ | 6300 ms | Left/right panels `translateX(∓100%) → 0` (48 %), hold, → `∓100%`; hero is revealed behind them at the midpoint | 2 s total ✅ | `(.45,0,.55,1)` ✅ | CSS keyframes | **Yes** — already guessed, timing corrected |
| Skip ("Passer →") | Visible from mount | Fades in; jumps straight to the exit stage | 0.6 s fade-in ✅ | ease | React | **Yes** — current "Skip intro" exists |
| Scroll lock | Mount | `body.style.overflow = hidden` until unmount ✅ | — | — | React | **Yes** |

---

## 2. Fixed header

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Header bar Δ | Pinned "question" scenes | Hides (`translateY(-119.5px)`, `opacity 0`) while a question scene is pinned; returns after ✅👁. It does **not** hide on scroll direction (tested) | 0.5–0.6 s ✅ | `(.16,1,.3,1)` | CSS + scene callbacks | **Yes** |
| Logo Δ | Hero leaves | Logo revealed by `clip-path` once the hero has scrolled (`ownitt:hero-entered` event at 72 % hero progress) | 0.9 s, 0.12 s delay ✅ | `(.76,0,.24,1)` | CSS | **Yes** |
| Background Δ | — | Transparent throughout (no fill on scroll) 👁 | — | — | — | **Yes** — differs from current filled header |
| Menu button Δ | Hover (fine pointer) | Circle grows into a pill and the word "MENU" slides in (`max-width`, `padding-left`) | 0.8 s ✅ | `(.65,0,.35,1)` | CSS | **Partial** — layout property; use `clip-path`/`transform` instead (motion spec) |
| Burger lines Δ | Open | Two lines → ×, `transform` | 0.5 s ✅ | `(.77,0,.175,1)` | CSS | **Yes** |

---

## 3. Full-screen menu (`BurgerMenu`)

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Overlay Δ | Open/close | `clip-path: circle(0 → 150% at <button centre>)`. Escape closes ✅ | 0.6 s ✅ | `(.77,0,.175,1)` ✅ | CSS | **Yes** |
| Layout Δ | — | Desktop: 5 full-height **vertical columns** (accordion). Mobile: 5 stacked rows with a photo background ✅👁 | — | — | — | **Yes** |
| Column hover Δ | `mouseenter` | Hovered column grows (`flex-grow`), shows an image + veil, arrow slides in, outline label → solid label, tagline appears | grow 0.5 s, img 0.35 s, tag 0.35 s +80 ms ✅ | `(.76,0,.24,1)`, `(.16,1,.3,1)` | CSS | **Partial** — `flex-grow` is layout; accepted for 5 elements (see spec) |
| Column entrance | Open | Columns rise in, staggered 40 ms per column ✅ | 0.45–0.5 s | `(.16,1,.3,1)` | CSS | **Yes** |
| Top/bottom bars | Open | Fade + rise, 50 ms / 150 ms delay ✅ | 0.4 s | `(.16,1,.3,1)` | CSS | **Yes** |
| A11y Δ | — | Overlay has **no** `role="dialog"` / `aria-modal`; focus moves to the overlay container ✅ | — | — | — | **Improve** — keep the current `<dialog>` |

---

## 4. Hero (`AsteriskHero`)

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Full-bleed photo Δ | Load | B/W photograph with slow Ken Burns `scale(1 → 1.14)` + small translate, alternate | 32 s loop ✅ | ease-in-out | CSS | **Needs a portrait/campaign image** |
| Headline Δ | Intro done | Two condensed uppercase lines + one italic serif line, masked rise (`translateY(112%) → 0`, accent also `scale .96 → 1`) | — | `(.16,1,.3,1)` | CSS | **Yes** — current `.mask/.rise` |
| Location ticker Δ | Continuous | **Vertical** roll (`translateY(0 → −50%)`), not horizontal | 18 s ✅ | linear | CSS | **Yes** |
| Brand stamp | Intro done | `opacity`, `translateY` enter | 0.95 s, 0.2 s delay ✅ | `(.16,1,.3,1)` | CSS | **Yes** |
| Scroll cue | Continuous | Dot travels down a line, fades at ends | 2.2 s ✅ | `(.4,0,.2,1)` | CSS | **Yes** |
| Monogram spin | Continuous | Asterisk rotates | 22 s ✅ | linear | CSS | **Original mark required** |
| Pinned exit Δ | Scroll, pin `+100%`, scrub 0.5 ✅ | Logo `yPercent −170` + fade, lower group `+170` + fade, asterisk `scale → 92` + `rotation +600` (fills the screen), bg → `#0a0a0b`, dark veil fades in | timeline 0–0.6 ✅ | `power2.in`, `power1.in` | GSAP ScrollTrigger | **Yes** |
| Hover swap | Hover "agence" word | Word swaps, brackets slide apart | 0.55–1 s ✅ | `(.16,1,.3,1)`, `(.22,1,.36,1)` | CSS | **Yes**, gate to `hover:hover` |

---

## 5. Local anchor + Showreel

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Local anchor paragraph | In view | Words go from `opacity .15 + blur(6px) + 0.6em` to sharp | — ✅ | — | CSS | **Yes** (blur — spec) |
| Showreel Δ | Pin `+140%`, scrub 0.6 ✅ (desktop only; not pinned at 375) | Wall bg `#0a0a0b → #f4f1ea`; video frame grows from 30 % to full size with `clip-path: inset(35% round 8px) → final`; heading lifts away; controls (Sound / Fullscreen) fade in at 58 %, out at 78 %; letterbox bars close | timeline ✅ | `power2.inOut` | GSAP | **Yes — needs a video or reel** (open issue) |

---

## 6. Manifesto beats

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Beat stage Δ | Pin `+100% × beats`, scrub 1 ✅ | Each beat: lead words `opacity .12 → 1`, `yPercent 24 → 0`, stagger 0.04; sub-line at +0.3; italic accent (green) at +0.58 rises `yPercent 26 → 0`; a `--ink` mask sweeps the accent; beat exits `xPercent ±10` + fade | per beat 1.2 units ✅ | `power3.out`, `power2.out`, `power2.in` | GSAP | **Yes** — current Manifesto already uses GSAP; extend |
| Background asterisk Δ | Scroll velocity | Rotation speed = `0.06 + min(3e-4·|velocity|, 2.5)` °/frame, decays back; direction follows scroll | continuous ✅ | lerp 0.02 | ScrollTrigger `getVelocity` + rAF | **Yes** |

---

## 7. Dictionary definition (`defSection`)

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Section Δ | Pin `+100%`, scrub 0.8 ✅ | bg `#050505 → #f4f1ea`; brackets slide in from `xPercent ∓260`; kicker, word (`yPercent 120 → 0`), asterisk pops (`scale .4 → 1`, `back.out(2)`), pronunciation, definition words stagger 0.022, synonyms, press logos | timeline ✅ | `power2–4.out`, `back.out(2)` | GSAP | **Yes** — original brackets |
| Press marquee | Continuous | Horizontal track `−33.333%` | 34 s ✅ | linear | CSS | **Content needed** |

---

## 8. Question scenes (×3 interstitials)

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Pin Δ | Pin `+1.2 × innerHeight`, scrub 0.6 ✅ | Full-bleed photo scales `1.08 → 1`; giant brand word behind; question words fly in from scattered `x/y/rotate` with 0.04 stagger; a `clip-path: inset(0 100% 0 0) → 0` wipe at 60 % | timeline ✅ | `power3.out`, `none` | GSAP | **Yes** |
| Header | While pinned | Header hidden ✅ | 0.55 s | `(.16,1,.3,1)` | CSS | **Yes** |

---

## 9. Projects — stacked panels

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Section pin Δ | Pin `+(n + 0.85) × innerHeight`, scrub 0.6 ✅ | **Vertical** stack, not horizontal: each panel is revealed bottom-up with `clip-path: inset(100% 0 0 0) → inset(0)`; main media `scale 1.05 → 1`, detail media `scale 1.06, yPercent 6 → 0`, text `yPercent 12 → 0`; 0.85 hold at the end | 1 unit per panel ✅ | `power2.inOut`, `power2.out` | GSAP | **Yes** |
| Panel colours | Per panel | Each panel has its own bg (deep green, teal, brown, navy…) 👁 | — | — | CSS vars | **Yes** — map to project data |
| Rail (01–08) Δ | Pinned | Right-hand numbered rail; active item moves; `width`/`opacity` | 0.5 s ✅ | `(.16,1,.3,1)` | CSS | **Yes** |
| Rail entrance | Before pin | Rail items `x 90 → 0`, `opacity .06 → 1`, stagger 0.12, scrub 0.8 | ✅ | `power3.out` | GSAP | **Yes** |
| Video | Panel active | Videos play only while the scene is active (`onToggle`) ✅ | — | — | — | **Yes** |
| Big number | Panel | Outline numeral `01`–`08` bottom-right 👁 | — | — | — | **Yes** |

---

## 10. Projects wall

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Name rows Δ | Continuous | 4 rows of project names, very slow marquee | 380–460 s ✅ | linear | CSS | **Yes** |
| Hover word | `mouseenter` | Outline → solid title, number fades in | 0.45 s ✅ | `(.16,1,.3,1)` | CSS | **Yes** |
| Polaroid follower | `mousemove` | Preview card follows the pointer, enters with `clip-path` + `transform`, sways | 0.7–0.75 s ✅, sway 6 s | `(.22,1,.36,1)` | Custom JS | **Yes** — fine pointer only; touch uses a scrim + CTA |
| Spinning mark | Continuous | Background asterisk | 90 s ✅ | linear | CSS | **Original mark** |

---

## 11. Services (`Services`)

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Rows (5) | Hover / tap | Active row: ghost (outline, breathing 4 s) title swapped for a running solid marquee of the title; keyword marquee runs in reverse below; numeral pulse speeds up; underline `scaleX` | marquee 22 s / 28 s ✅; swap 0.3–0.45 s; underline 0.55 s | `(.16,1,.3,1)` | CSS (marquee `animation-play-state: paused → running`) | **Yes** |
| Row padding Δ | Hover | `padding` transition | 0.5 s ✅ | `(.16,1,.3,1)` | CSS | **Replace** with `transform` (layout property) |
| A11y | — | Marquee copies `aria-hidden`; real list in a visually hidden paragraph ✅ | — | — | — | **Yes** |

---

## 12. Client credits, Journal, CTA, Footer

| Element | Trigger | Behaviour | Duration | Easing | Library | Replicable? |
|---|---|---|---|---|---|---|
| Client credits Δ | Continuous | **Vertical** film-credits roll of names (`translateY(−50% → 0)`), not a logo strip | 46 s ✅ | linear | CSS | **Needs permitted client list** |
| Journal | — | 3 rows: thumbnail, category, title, date 👁 | — | — | — | **No journal content** (open issue) |
| CTA + newsletter | — | Large prompt, email field with blinking caret 👁 | caret 1 s ✅ | steps | CSS | **Contact form exists**; newsletter out of scope |
| Footer reveal Δ | Scroll end | Footer sits under the page (`page.footerReveal`) and is uncovered as content scrolls away 👁 | — | — | CSS sticky | **Yes** |
| Footer mark | In view | Outline wordmark stroke-draw ✅ | — | — | CSS | **Yes** |

---

## Remaining unknowns

| Item | Status |
|---|---|
| Exact pointer lerp factor of the custom cursor | Not extracted (cursor module is in a minified chunk; behaviour observed only) |
| Touch behaviour of Services rows | Not tested on a real device; 375 px emulation shows rows stacked with marquees paused |
| CPU-throttled smoothness of the reference | Not measured; not needed to replicate |
