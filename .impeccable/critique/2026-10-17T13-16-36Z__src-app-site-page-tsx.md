---
target: homepage
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\user\\OneDrive\\Documents\\Peters\\portfolio\\src\\app\\(site)\\page.tsx"
target_fingerprint: "sha256:500420eae03439e9dee96b927cff55547ddd4ffb8bf9f086d2836e3e0e3b2eea"
target_path: "C:\\Users\\user\\OneDrive\\Documents\\Peters\\portfolio\\src\\app\\(site)\\page.tsx"
timestamp: 2026-10-17T13-16-36Z
slug: src-app-site-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

## Design Health Score (applicable max 32; 7 and 10 n/a, Experience surface)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | Empty work state gives no timeline or alternative |
| 2 | Match system / real world | 2 | Name renders as "Portfolio"; role repeated in eyebrow and h1 |
| 3 | User control and freedom | 3 | Intro skippable (button, Esc, failsafe); page behind intro not inert |
| 4 | Consistency and standards | 3 | Contact offered 5 ways under 3 labels |
| 5 | Error prevention | 2 | Empty CMS fields produce a brand-damaging page |
| 6 | Recognition over recall | 3 | Menu hides only 3 items |
| 7 | Flexibility and efficiency | n/a | Portfolio |
| 8 | Aesthetic and minimalist design | 2 | ~2,800px of mostly empty black with fallbacks; dead space above h1 |
| 9 | Error recovery | 2 | "See the work" leads to "being prepared" |
| 10 | Help and documentation | n/a | Portfolio |
| **Total** | | **19/32** | Acceptable |

## Design specificity
LLM: generic — near-black, condensed caps, single ochre accent, index list + accordion; nothing says Lagos, Yoruba or Miracle. Detector: CLI clean (0 findings, 33 files). Browser: 1 finding at 1440 and 375, `hero-eyebrow-chip` at Hero.tsx:21 (valid structurally, not a pill); it exposes duplicate role text from the headline fallback.

## Priority issues
- [P0] Site ships as "Portfolio" with no work (Sanity empty; DEFAULT_SETTINGS name). Fix: seed settings; default name to Miracle Olu-Peters. /impeccable harden
- [P1] Empty work state is a dead end behind the primary CTA. Fix: hide CTA / swap to "ask for the reel" contact prompt. /impeccable harden
- [P1] No cultural or personal signal in the visual language. Fix: her copy lines (incl. Yoruba) as hero material, Lagos cue. /impeccable bolder
- [P2] Intro gates a time-short audience and shows only name/role; page behind not inert. Fix: shorten, carry a real line, inert the page. /impeccable distill
- [P2] Hero repeats the role and leaves ~47% dead space. Fix: h1 = her line; name+role as eyebrow. /impeccable layout

## Persona red flags
- Time-short Lagos ECD (phone, mobile data): loader → "PORTFOLIO" → job title → "Case studies are being prepared". No name, agency, line or email. Leaves in <10 s.
- Screen-reader user: Tab reaches header links behind the intro overlay for ~1.6–2 s.
- Distracted mobile visitor: hero CTAs at the very bottom of 812 px; nothing found on first scroll.

## Minor
Menu taglines pushed far right on desktop; Capabilities "+" low affordance in paper-2; Manifesto starts at 0.18 opacity; inactive WorkIndex rows at 50% opacity reduce metadata contrast. CLS 0, no console errors, focus ring visible on every stop, reduced motion honoured.

## What stays
Palette, Barlow + Source, fixed-string copy voice, accent tabular indices, skip link, native dialog, accordion semantics, reduced-motion handling, tone-mark-safe masks, Latin Extended subsets, focus ring, JSON-LD, section structure, permission/embargo gating.
