# Section Mapping & Motion Spec

_Step 4 of the rebuild workflow. Revised 2026-10-17 against browser-observed values in
[`reference-notes.md`](./reference-notes.md). Nothing below is built yet. Review, mark up, then reply
"proceed"._

**What changed from the previous draft (Δ):** Lenis is now confirmed on the reference and recommended;
the project stack is vertical clip-path panels, not horizontal; the location ticker is vertical; the
menu is a circle-clip overlay with accordion columns; the client strip is a vertical credits roll; the
intro is 8.8 s on the reference and is deliberately shortened here; one easing family replaces the
mixed curves; and every section has a content gate, because the local Sanity dataset is empty.

### Decisions recorded 2026-10-17
| Topic | Decision | Effect on the build |
|---|---|---|
| `public/works/` images (Seaman's Schnapps "Back to Our Roots" / Olójó Festival, Palton Morgan) | **Permitted** | Used as campaign imagery: hero photo fallback, menu column images, Work panels (until Sanity projects exist), interstitial background |
| Intro length | **Shortened, 3.4 s** (repeat visits ≈ 1.2 s doors only) | As in the L1–L5 spec below |
| Custom cursor | **Skip** | Native cursor everywhere |
| Brand mark | **Original open quotation mark** | Part D |

---

## Part A — Section mapping

**Content gate.** Each section renders only when its data exists. Nothing is invented. When data is
missing the section is left out or swapped for the fallback named below. Copy marked _her copy_ must
come from Miracle.

| # | ownitt.fr section (observed) | Miracle's section | Action | Data it needs | If the data is missing |
|---|---|---|---|---|---|
| 1 | `IntroAnimation`: grain → image grid → logo stroke-draw → tagline sweep → two-door wipe (8.8 s) | `layout/Intro.tsx` | **Rebuild, shortened** Δ | Name; one tagline line (`settings.intro` first sentence or a new `introLine` field) | Name only, no tagline stage |
| 2 | Fixed header: transparent, hides during pinned scenes, logo clip-reveals after the hero | `layout/Header.tsx` | **Rebuild** | — | — |
| 3 | `BurgerMenu`: circle clip from the button; 5 accordion columns; rows on mobile | Menu inside `Header.tsx` | **Rebuild the inside; keep `<dialog>`** | `NAV` (3 items with taglines, already in `site.ts`) | — |
| 4 | `AsteriskHero`: photo + Ken Burns, stacked headline, vertical ticker, scroll cue, pinned exit where the monogram scales to fill the screen | `home/Hero.tsx` | **Rebuild** | `heroLines`, `role`, `location`, `portrait` (field exists) | No photo: ink background plus grain, same pinned exit |
| 5 | `LocalAnchor`: one paragraph, words sharpen in | New `home/Lede.tsx` (uses `settings.intro`) | **Add** | `intro` | Section left out |
| 6 | `Showreel`: pinned frame grows to fullscreen with sound/fullscreen controls | — | **Reserve slot, don't build** | A reel video plus poster | Left out (open issue 4) |
| 7 | `Manifesto` beats: pinned, one beat per screen, lead words rise, italic accent line, mark spins faster with scroll velocity | `home/Manifesto.tsx` | **Rebuild** (already GSAP) | `manifesto[]` (each line is a beat; `*accent*` markup is optional) | Left out |
| 8 | Dictionary definition with brackets | — | **Skip by default** | _Her copy_ for a definition | Open issue 5 |
| 9 | `QuestionScene` ×3: pinned photo, giant word behind, question words fly in, wipe | New `home/Interstitial.tsx`, used once before Work | **Add, gated** | _Her copy_ for the question; optional image | Left out |
| 10 | `Projects`: pinned vertical stack, each panel revealed bottom-up by clip-path, numbered rail, big outline numeral, per-panel colour | `home/WorkIndex.tsx` | **Rebuild** Δ | `projects[]` (title, brand, year, roleSummary, tagline, heroImage). Panel colour comes from a new optional `accentTone` field or rotates through 4 tokens | **3 or more:** pinned stack. **1–2:** unpinned full-width panels. **0:** no "See the work" button; the section becomes a "Ask for the reel" contact prompt (fixes critique P1) |
| 11 | `ProjectsWall`: slow name marquee rows, outline → solid hover, pointer-following preview | `home/WorkWall.tsx` | **Add, gated** | 4 or more projects | Left out |
| 12 | `Services`: 5 rows; the active row runs a solid title marquee plus a reversed keyword marquee | `home/Capabilities.tsx` | **Rebuild** | `capabilities[]` (title, summary, items) | Left out |
| 13 | `ClientLogos`: vertical film-credits roll | New `home/Credits.tsx` | **Add, gated** Δ | Brand names **derived from published projects** (already permission-gated) | Left out below 4 brands |
| 14 | `BlogTeaser` (journal) | — | **Skip** | No journal | — |
| 15 | `AstronautCTA` + newsletter | `home/ClosingCta.tsx` | **Restyle** | Existing copy, `publicEmail`, `availability` | Contact link only |
| 16 | Footer revealed from under the page, outline wordmark stroke-draw | `layout/Footer.tsx` | **Rebuild** | Settings | — |
| 17 | Page transition: curtain clip on internal links (540 ms out / 520 ms in) | New `layout/PageTransition.tsx` | **Add** | — | — |
| 18 | Custom cursor (dot + ring, `cursor: none`) | — | **Skip by default** | — | Open issue 3 |

Homepage order after the rebuild: Intro → Hero → Lede → Manifesto → Interstitial → Work → Wall →
Capabilities → Credits → Closing CTA → Footer. Routes, Sanity queries, permission/embargo gating, the
contact API and the case-study pages are unchanged. Case studies get the new tokens, header and
transitions only.

### What stays from the current site (from the critique)
The ink/paper/ochre palette, Barlow Condensed + Source Sans, the copy voice in fixed strings, accent
tabular indices, the skip link, native `<dialog>`, the accessible accordion semantics (reused as the
touch fallback for Capabilities), the tone-mark-safe `.mask`, the Latin Extended font subsets, JSON-LD,
the focus ring, and reveals that hide content only when JS is running.

---

## Part B — Motion spec

### B1. One easing family: exponential

The reference mixes about 8 curves. This build uses the expo family only, which also matches Lenis's
own expo-out wheel easing, so scroll and UI motion decelerate the same way.

| Token | CSS | GSAP | Use |
|---|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | `expo.out` | Entrances, reveals, hover-in, menu items |
| `--ease-in-out` | `cubic-bezier(0.87, 0, 0.13, 1)` | `expo.inOut` | Wipes, doors, menu circle, panel clip, page curtain |
| `--ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | `expo.in` | Exits that leave the screen (hero pinned exit, beat exit) |
| `linear` | `linear` | `none` | Marquees, tickers, scrubbed progress only |

`--ease-brand` and `--ease-brand-in-out` are renamed to these tokens; Tailwind utilities are updated
in the same commit.

### B2. Durations (taken from the reference ladder)

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 180 ms | Colour/opacity hover feedback |
| `--dur-quick` | 350 ms | Menu column image, tags, small transforms |
| `--dur-base` | 600 ms | Reveals, menu open, header hide/show |
| `--dur-slow` | 1050 ms | Hero headline rise, door wipe half, stroke-draw |
| Stagger | 40 ms (menu), 60 ms (lines), 22 ms (words) | — |
| Scrub lag | 0.6 s (one value for every scene; the reference uses 0.5–1) | — |

### B3. Inventory

Each row gives purpose · property · easing · duration. Anything without a purpose was removed (listed in B4).

#### Global
| # | Element | Purpose | Property | Easing | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| G1 | Lenis smooth wheel | One continuous scroll feel that the pinned scenes need to stay in sync | scroll position (virtual) | expo-out (Lenis default) | `duration: 1.1` | **Lenis not started**; native scroll |
| G2 | `Reveal` | Pace content as it arrives | `opacity`, `translateY(24px→0)` | `--ease-out` | 600 ms | Shown, no transition |
| G3 | Pin snap | Stop a scene being left half-finished | Lenis `scrollTo` | `--ease-out` | 500 ms after 90 ms idle; snaps when <14 % or >86 % | Off (no pins) |
| G4 | Page curtain | Hide the route swap and keep continuity | `clip-path inset` | `--ease-in-out` | 540 out / 520 in | 200 ms opacity fade |

#### Intro (shortened from 8.8 s to 3.4 s on first visit)
| # | Element | Purpose | Property | Easing | Timing | Reduced motion |
|---|---|---|---|---|---|---|
| L1 | Grain | Texture so the black screen doesn't read as broken | `opacity 0→.18` (drift is static) | `--ease-out` | 0–600 ms | Not rendered |
| L2 | Name mark stroke-draw | Identity is the first thing seen | `stroke-dashoffset 1→0` (`pathLength=1`) | `--ease-in-out` | 100–1300 ms | Not rendered |
| L3 | Fill + tagline sweep | Her own line as the hook (critique P2: the intro must carry a real line) | `opacity`, `translateX(48px→0)` (**no blur**) | `--ease-out` | 1000–2000 ms | Not rendered |
| L4 | Doors close/open | Hand-off to the hero with no flash | `translateX(∓100%→0→∓100%)` | `--ease-in-out` | 2100–3300 ms (48/52 % hold) | Not rendered |
| L5 | Hero text | Starts as the doors part | existing `.mask/.rise` | `--ease-out` | from 2700 ms | Instant |

- **Repeat visits:** in the same session, no intro (existing `sessionStorage`). On a later visit (`localStorage` flag), only L4, about 1.2 s total. Internal navigation and back/forward never show it.
- **Skip:** button visible from 0 ms, plus Escape. Either jumps to L4. The page behind is `inert` while the intro is up (fixes Assessment B's finding).
- **No layout shift:** the overlay is `position: fixed` above an already-rendered page, and scroll is locked with `overflow: hidden` on `<html>` plus `scrollbar-gutter: stable` so the page doesn't jump when the scrollbar disappears.

#### Header + menu
| # | Element | Purpose | Property | Easing | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| H1 | Header hide in pinned scenes | Give full-bleed scenes the whole screen | `translateY(-100%)`, `opacity` | `--ease-out` | 600 ms | Header always visible |
| H2 | Wordmark reveal after the hero | The hero already shows the name; the header takes over once it's gone | `clip-path inset` | `--ease-in-out` | 600 ms | Always visible |
| H3 | Menu button label | Show the word "Menu" on intent | `clip-path` on the label (**not** `max-width`) | `--ease-out` | 350 ms | Label always shown |
| H4 | Lines → × | State change | `transform` | `--ease-in-out` | 350 ms | Instant |
| M1 | Overlay circle from the button | Ties the menu to the button that opened it | `clip-path: circle(0→150% at button)` | `--ease-in-out` | 600 ms | 200 ms opacity |
| M2 | Columns rise in | Sequence the choices | `translateY(32px→0)`, `opacity` | `--ease-out` | 600 ms, 40 ms stagger | Shown |
| M3 | Column grows on hover/focus | Preview the destination | `flex-grow` ★ | `--ease-in-out` | 600 ms | No grow |
| M4 | Outline → solid label, tagline in | Confirm the target | `opacity` (two stacked labels) | `--ease-out` | 350 ms | Instant |

#### Hero
| # | Element | Purpose | Property | Easing | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| HE1 | Headline lines | First read, in order | `translateY(112%→0)` in `.mask`, 60 ms stagger | `--ease-out` | 1050 ms | Instant |
| HE2 | Location ticker (vertical) | Lagos-first context without a sentence | `translateY(0→-50%)` | linear | 18 s | First item, static |
| HE3 | Scroll cue dot | Tell people the page continues under a full-screen hero | `translateY`, `opacity` | `--ease-in-out` | 2.2 s loop | Hidden |
| HE4 | Photo drift | Keep a still photo from feeling frozen while the headline is read | `transform: scale(1→1.08)` | `--ease-in-out` | 32 s alternate | Static |
| HE5 | Pinned exit (`+100%`, scrub) | Hand off from identity to argument | headline `yPercent -120` + fade; mark `scale → 60` + `rotate +180`; veil `opacity` | `--ease-in` | scrubbed | No pin; normal flow |

#### Lede, manifesto, interstitial
| # | Element | Purpose | Property | Easing | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| LE1 | Lede words | Read at the speed of scroll | `opacity .15→1`, `translateY(.4em→0)` (**no blur**), scrubbed | linear (scrub) | scrubbed | Full opacity |
| MA1 | Beat pin (`+100% × beats`) | One idea per screen | — | — | — | No pin; stacked |
| MA2 | Lead words | Emphasis order | `yPercent 24→0`, `opacity .12→1`, 40 ms stagger | `--ease-out` | scrubbed | Shown |
| MA3 | Accent line | The turn of each beat | `yPercent 26→0`, `opacity` | `--ease-out` | scrubbed | Shown |
| MA4 | Beat exit | Clear the stage | `xPercent ±10`, `opacity` | `--ease-in` | scrubbed | — |
| MA5 | Mark rotation from velocity | Physical response to the reader's scroll speed | `rotate` | lerp 0.02 | continuous | Static |
| IN1 | Question words fly in | Stop the reader before the work | `x/y/rotate → 0`, `opacity` | `--ease-out` | scrubbed | Shown |
| IN2 | Wipe | Hand-off into Work | `clip-path inset` ★ | linear (scrub) | scrubbed | — |

#### Work, wall, capabilities, credits, footer
| # | Element | Purpose | Property | Easing | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| W1 | Panel reveal (pinned `+(n+0.85)×vh`) | One campaign at a time, full attention (principle 1) | `clip-path: inset(100% 0 0 0)→inset(0)` ★ | `--ease-in-out` | scrubbed | Plain stacked panels |
| W2 | Media settle | Depth as the panel lands | `scale 1.05→1` | `--ease-out` | scrubbed | Static |
| W3 | Rail active item | Where am I, how many left | `opacity`, `translateX` | `--ease-out` | 600 ms | Instant |
| WW1 | Name rows marquee | Breadth at a glance | `translateX` | linear | 380–460 s | Static |
| WW2 | Preview follows the pointer (fine pointer only) | Show the work while scanning names | `transform` lerp 0.15 | — | rAF | Off |
| C1 | Active row title marquee | Signal "this row is open" | `translateX` (`play-state` paused→running) | linear | 22 s | Static title |
| C2 | Keyword marquee | List the specifics | `translateX` reversed | linear | 28 s | Static list |
| C3 | Underline + indent | Confirm the selection | `scaleX`, `translateX(16px)` (**not** padding) | `--ease-out` | 600 ms | Instant |
| CR1 | Credits roll | Who she's worked for, read like film credits | `translateY` | linear | 46 s | Static list |
| F1 | Footer reveal from under the page | A clear ending | `position: sticky` underlay (no animation) | — | — | Same |
| F2 | Outline name stroke-draw | Closes the loop with the intro mark | `stroke-dashoffset` ★ | `--ease-in-out` | 1050 ms on enter | Drawn |

**Touch:** Capabilities rows become buttons (`aria-expanded`). A tap opens one row and its marquees run.
The wall has no follower; tapping a name goes to the project. All hover CSS is inside
`@media (hover: hover) and (pointer: fine)`.

### ★ Non-transform/opacity properties (ground rule 5)
| Property | Where | Why it's accepted |
|---|---|---|
| `clip-path` | M1, H2, H3, IN2, W1, G4 (the intro doors use `transform`) | Composited in Chromium/WebKit for inset/circle; it is the only way to reveal without scaling content. The reference uses the same |
| `stroke-dashoffset` | L2, F2 | Only way to draw a stroke; small SVG, one element per path |
| `flex-grow` | M3 (3 columns only) | Text must keep its size; a scale would distort it. Three elements in a fixed-size overlay, runs only on hover |
| Scrolled `background-color` | none | Reference uses it; replaced with a veil `opacity` layer |

### B4. Removed from the reference (no purpose here)
Image-grid intro stage (no permitted images; adds 2.3 s), tagline blur, the hero accent "breathing"
loops, grain drift steps, numeral pulse loops in Services, label letter-spacing breathe, polaroid sway,
the custom cursor (see open issue 3), the Showreel scene (no reel), the definition scene (no copy).

---

## Part C — Dependencies

| Library | Status | Decision | Bundle cost (gz) |
|---|---|---|---|
| GSAP 3.15.0 core | installed | Keep: timelines, scrub | ≈ 28 KB (already paid) |
| ScrollTrigger | inside `gsap` | Keep: pins, scrub, velocity | ≈ 18 KB (already loaded lazily by Manifesto; now loaded on the homepage) |
| **Lenis** | **add** | Needed: the reference's smooth wheel and stable pinned scenes; `autoRaf: false`, driven by `gsap.ticker` | ≈ 4–5 KB (checked at install) |
| Framer Motion / Motion | in `node_modules` via Sanity only | Do not import | 0 |
| DrawSVG / SplitText | — | Not needed: `pathLength=1` + dashoffset; word splitting in React | 0 |

Total new JS on the homepage: Lenis only. GSAP + ScrollTrigger stay dynamically imported, after the
first paint.

---

## Part D — Icons (one original set)

24 px grid, 1.5 px stroke, round caps and joins, 2 px corner radius, `currentColor`, no fills except the mark.
Set: `menu` (two lines), `close`, `arrow-up-right`, `arrow-right`, `arrow-down` (scroll cue),
`plus`, `play`, `sound-on`, `sound-off`, `fullscreen`, `external`. Brand mark: an **original open
quotation mark** drawn as a single path (a copywriter's mark, not an asterisk). It is used for the
intro stroke-draw, the hero pinned exit and the footer. It does not reuse Ownitt's asterisk, brackets
or wordmark.

---

## Part E — Build order (once approved)
1. Tokens: easing/duration rename, Lenis CSS, grain utility, marquee keyframes
2. Layout primitives: `Marquee`, `SplitWords`, `Icon`, `Grain`, `SmoothScroll` provider (Lenis + ticker + pin snap + reduced-motion gate)
3. Intro
4. Scroll system: shared `useScene` hook (gsap.context, matchMedia for reduced motion and breakpoints)
5. Section reveals and scenes: Hero → Lede → Manifesto → Interstitial → Work → Wall → Capabilities → Credits → CTA → Footer
6. Header + menu + page transition, hover states
7. Icons and mark
8. Emil motion pass, then Impeccable audit + polish at 375/768/1440, reduced motion, 4× CPU + Fast 3G throttling
