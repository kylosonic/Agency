# Design — NovaTech software studio

A locked, app-wide system for a software development firm. Every page uses the
same neo-brutalist visual language. Content and commercial facts remain the
source of truth.

<!-- Hallmark · genre: editorial-technical · macrostructure: Split Studio · theme: concrete citrus · enrichment: hand-built price board · nav: solid utility bar · footer: statement ledger · pre-emit critique: P5 H4 E5 S4 R5 V5 · scope: app -->

## Macrostructure

- Marketing and service pages use **Split Studio**: a direct headline on the
  left, a useful hand-built price board on the right, then serial proof and
  commercial sections below.
- Pricing uses the same split hero and a ruled rate sheet. Sources stay visible.
- Form pages lead with the form and use a compact estimate panel. Function is
  the enrichment.
- Long documents use a narrow reading measure with heavy rules and generous
  spacing.

## Theme

- Paper: `oklch(96.8% 0.012 92)`
- Raised paper: `oklch(91.5% 0.018 92)`
- Ink: `oklch(18% 0.025 264)`
- Accent: acid yellow `oklch(87% 0.19 95)`
- Blue focus: `oklch(63% 0.2 252)`
- Borders: 2–3 px square rules
- Shadows: hard 4–11 px offsets, no blur
- Corners: zero radius

The paper canvas carries a faint 32 px blueprint grid. Dark bands invert the
paper and ink tokens while keeping the acid accent. Gradients, glass, blur,
orbs, and soft cards are not part of the system.

## Typography

- Display: Bricolage Grotesque 800, uppercase, tight tracking.
- Body: IBM Plex Sans 400–700.
- Labels: IBM Plex Mono 500–600, uppercase.
- Ethiopic: Noto Sans Ethiopic.
- Headlines are roman and wrap with `overflow-wrap: anywhere`.
- Body copy stays sentence case. Labels and actions use uppercase mono.

## Layout and spacing

- Container: 1320 px maximum with fluid gutter.
- Sections: 64–144 px vertical rhythm, separated by 3 px rules.
- Cards: flat paper or acid fills, hard outlines, useful internal padding.
- Buttons: square, hard shadow, explicit hover and active translation.
- Tables: ruled, compact, horizontally safe inside a bordered wrapper.

## Components

- Price boards list real starting prices from `pricingData.js`, with a visible
  route to the full pricing page.
- Every marketing hero has one primary action, one secondary action, and a
  direct pricing path.
- Forms use square inputs, visible labels, immediate focus rings, disabled,
  error, success, and local fallback states.
- Source ledger links are underlined and paired with the evidence statement.

## Motion

- Interaction motion is limited to 120–220 ms translations and shadow changes.
- Scroll reveals fade only and collapse under reduced motion.
- Marquees pause on hover and reduced motion.
- No decorative endless animation.

## Responsive floor

- Verify at 320, 375, 414, 768, 1024, and 1440 px.
- No horizontal document overflow.
- Single column below 960 px; full width primary actions below 640 px.
- Price rows become stacked at phone widths.
- Clickable text must stay on one line unless it is inherently long.
- Image-bearing grids use `minmax(0, 1fr)`.

## Content rules

- NovaTech is a software development firm. Public services are limited to
  software strategy, web, mobile, SaaS, custom business systems, integration,
  modernization, QA, maintenance, and hosting.
- No invented metrics, logos, testimonials, or client counts.
- Prices must come from `src/services/pricingData.js`.
- Pricing claims must show the research date and public market source ledger.
- ETB is the public currency. International benchmarks are planning inputs only.

## Accessibility

- Focus is always visible.
- Ink and accent pairings must retain readable contrast.
- Status messages remain in the document flow.
- Reduced-motion preferences are honored.
- Headings preserve document order and labels preserve accessible names.
