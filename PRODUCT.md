# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Creative directors, ECDs, and brand-side marketing leads at agencies and companies — typically in Lagos, West Africa, or internationally — evaluating Miracle for a freelance brief. They are time-short, taste-conscious, and read portfolios to judge cultural intelligence and strategic instinct before they read headlines.

## Product Purpose

A personal portfolio for Miracle Olu-Peters, a freelance creative strategist and copywriter based in Lagos. The site exists to turn interest into a brief: a visitor should leave convinced she is the right hire and confident enough to get in touch. Success means an inbound enquiry from a qualified creative or brand decision-maker.

## Positioning

Miracle works at the intersection of strategic rigour and cultural fluency — she thinks the brief through and writes to match it, with a specific command of Yoruba-language and West African cultural registers that a generalist copywriter cannot replicate. She is not a production writer; she is the person in the room who finds the idea and then writes it.

## Operating Context

- Work shown is primarily advertising campaigns: TV, OOH, digital, and activation, produced mainly at Leo Burnett Lagos and for Nigerian brands.
- Work is gated by explicit client permission (verbal or written) before it appears on the site.
- Case studies follow a consistent brief → insight → idea → execution → result narrative.
- Copy lines (headlines, straplines, body copy, teasers) are shown verbatim alongside campaign context.
- The site is managed by Miracle herself through a Sanity Studio at `/studio`.

## Capabilities and Constraints

- Portfolio pages: Home (hero, manifesto, work index, capabilities, closing CTA), About, Contact, individual case study pages.
- Disciplines covered: strategy, copywriting, concept.
- Languages supported: English and Yoruba (Latin Extended + Vietnamese subsets loaded for diacritics).
- No work index route (`/work` redirects to `/#work`).
- Projects are embargoed until a `publishAfter` date and hidden until client permission is confirmed.
- Contact form powered by Resend; enquiries go to her email.
- Stack: Next.js 16 (App Router, Turbopack), Tailwind CSS v4, Sanity v3, GSAP, Resend, deployed to Vercel.

## Brand Commitments

- Name on the site: **Miracle Olu-Peters**
- Role title: **Creative strategist and copywriter**
- No invented claims, metrics, or client testimonials may be added without her approval.
- Client work requires explicit permission before being shown.

## Evidence on Hand

- Sanity schema defines: campaign title, brand, agency, year, brief, insight, idea, execution, result, copy lines (with language and kind), gallery images, and team credits.
- Default agency pre-filled as Leo Burnett Lagos.
- Rights/permission workflow built into the CMS (pending → verbal → written).
- No campaign assets or images are committed to the repository; all media is managed through Sanity.

## Product Principles

1. **The work speaks; the site gets out of the way.** Interface chrome recedes so campaign work and copy lines hold full attention.
2. **Cultural specificity is the credential.** Yoruba language, Lagos context, and West African cultural references are features, not footnotes.
3. **Honesty before polish.** Nothing appears without permission; nothing is claimed without evidence.
4. **Strategic before decorative.** Every design decision should serve the goal of earning a brief, not simply looking impressive.
5. **One clear next action.** Every page resolves to either seeing more work or starting a conversation.

## Accessibility & Inclusion

- Yoruba tone marks and extended Latin characters must render correctly across all text.
- Reduced-motion preference is respected: the intro screen and scroll animations are disabled when `prefers-reduced-motion` is set.
- Skip-to-content link is present on every page.
