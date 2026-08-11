# Design — NovaTech AI

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

<!-- Hallmark · genre: atmospheric · macrostructure: Marquee Hero family · theme: lumen (night) · enrichment: Tier-B apparatus · nav: N1b flat · footer: Ft5 Statement · pre-emit critique: P5 H5 E5 S4 R4 V5 · scope: app · governed-by: docs/behaviors/visual-system-lumen.md -->

## Genre

atmospheric — the premium AI-tool register (Modal / Anthropic / ElevenLabs school).
Dark canvas, one warm accent, instrument-grade confidence. The site sells AI
automation engineering; it should look engineered, not beige.

## Macrostructure family

Pick one base macrostructure for marketing pages, one for content pages. Pages
within a family share the family's shape; they vary only in component archetypes.

- **Marketing pages:** Marquee Hero — apparatus at hero-right, lowercase
  classical-serif headline at hero-left (one brass verb landmark), blueprint
  grid + emission wash on the canvas, meter strip beneath the hero. Sections
  below follow the SaaS sequence: proof → features → rate sheet → FAQ → CTA.
  Varying knobs: apparatus type (per-page verb), section order, hero archetype.
- **Pricing / rate-sheet pages:** Marquee Hero family; the pricing surface is a
  **receipt-style rate sheet** (Modal-homepage "the receipt is the artwork"):
  ruled rows, mono UPPERCASE labels, tabular-nums ETB figures. Never bento
  tiles, never tier cards with icon tops.
- **Content pages (policy, 404, industries):** Long Document — continuous
  prose, inline mono eyebrows, hairline rules. No apparatus.
- **App / form pages (instant quote, discovery call):** Long Document family —
  the form IS the page; hairline surfaces, mono labels, brass submit.

## Theme

Lumen · Night Foundry (drop: night). All values in OKLCH.

- `--color-paper:      oklch(13% 0.014 265)` — late-night studio, violet tilt
- `--color-paper-2:    oklch(17% 0.016 265)` — raised surface (chambers, cards)
- `--color-paper-3:    oklch(21% 0.018 265)` — hover surface
- `--color-ink:        oklch(96% 0.006 262)` — near-white headlines
- `--color-ink-2:      oklch(86% 0.008 262)` — body text
- `--color-ink-3:      oklch(72% 0.01 262 / 0.72)` — muted / tertiary
- `--color-rule:       oklch(96% 0.006 262 / 0.08)` — hairline
- `--color-rule-2:     oklch(96% 0.006 262 / 0.16)` — strong hairline
- `--color-accent:     oklch(76% 0.17 50)` — molten brass (emits)
- `--color-accent-2:   oklch(68% 0.16 18)` — coral chord (verb landmark only)
- `--color-glow:       oklch(80% 0.16 50 / 0.42)` — dense halo (apparatus only)
- `--color-paper-emit: oklch(76% 0.17 50 / 0.04)` — inner-emit canvas wash
- `--rule-blueprint:   oklch(96% 0.006 262 / 0.04)` — grid hairline
- `--color-focus:      oklch(76% 0.17 50 / 0.9)` — focus ring (brass)
- `--color-btn-ink:    oklch(13% 0.014 265)` — text on brass fills (stamped)

Accent discipline: brass on fills, focus rings, small tags, and the apparatus.
Coral (accent-2) ONLY on the single verb landmark per headline. Never accent on
display text outside the verb landmark. ≤ 5 % accent per viewport. Never a
gradient on text. Never a glowing orb — the apparatus is the only emitter.

## Typography

- Display: `Instrument Serif` 400, **upright, all-lowercase** — `'Instrument Serif', 'Noto Serif Ethiopic', 'Tiempos Headline', Georgia, serif`
- Body: `Geist` 400/500 — `'Geist', 'Noto Sans Ethiopic', 'Segoe UI', sans-serif`
- Mono: `JetBrains Mono` 400/500 — `'JetBrains Mono', 'SFMono-Regular', Menlo, Consolas, monospace`
- Display tracking: `-0.032em`; line-height `1.02`
- Type scale anchor: `--text-display = clamp(2.75rem, 6vw + 1rem, 5.5rem)`
- **Two-register system (non-negotiable):** ALL prose is lowercase (headlines,
  lede, body, buttons, nav, brand, footer — acronyms included). ALL mono labels
  are UPPERCASE (eyebrows, callouts, meter labels, stat labels). Implement via
  `text-transform: lowercase` on `body` + `text-transform: uppercase` on label
  classes. Write markup in normal case (screen readers); CSS renders the case.
- **No `font-style: italic` anywhere.** The verb landmark is brass colour + a
  1px brass underline that draws in over 320 ms. `<em>` renders upright.
- One brass verb per headline, never a noun, never two words. Force `&nbsp;`
  around the landmark word so it never hangs at a line break.
- Mono eyebrow above every section: `01 · ROLE` — JetBrains Mono, 11 px,
  tracking 0.10em, ink at 0.55 opacity, numbered ordinal + middot + role.
- Ethiopic: `:lang(am)` line-height 1.8, headings 1.3, `letter-spacing: 0`,
  `text-transform: none` on all label classes (Amharic has no case — the
  lowercase/uppercase registers are Latin-only surfaces). Digits always render
  from the Latin families via `font-variant-numeric: tabular-nums` (B30).

## Spacing

4-point named scale. Values live in `tokens.css`. Pages must use named tokens
(`var(--space-md)`), never raw values. Section rhythm: `--space-3xl` minimum
between major sections; the section break is the visual rhythm — no sub-rows.

## Motion

- Easings: `--ease-soft: cubic-bezier(0.16, 1, 0.3, 1)` · `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`
- Durations: `--dur-fast: 220ms` · `--dur-med: 320ms` · `--dur-slow: 600ms` · `--dur-pulse: 4s`
- Reveal pattern: fade-in only. No slide on scroll for cards; section heads
  fade 0→1 + translateY 12px→0, 600 ms, 60 ms stagger. Page transition kept
  (0.55 s, fade + 12px).
- Apparatus (Night): pulse = 3 % intensity oscillation, 4 s period. **Never rotates.**
- Verb landmark underline: draws in 320 ms, `delay: 900 ms`, once.
- Meter strip: static — a printed readout, not a streaming feed.
- **Reduced motion:** everything collapses to instant final state; pulses freeze
  at maximum intensity; reveals become static.

## Microinteractions stance

- Silent success. No celebratory toasts. Form feedback = small mono status line.
- Hover: cards lift `translateY(-4px)` + inner-glow brighten (6 % → 12 %), 220 ms.
- Hover on brass fills: brighten to `oklch(80% 0.17 50)`, lift 2px.
- Focus delay 0 ms — `:focus-visible` shows the brass ring immediately.
- No magnetic cursors (neutralise MagneticButton to a simple hover lift).
- No `transition-all`; transition specific properties only.

## CTA voice

- **Primary CTA:** brass fill (`--color-accent`), text `--color-btn-ink`
  (stamped dark), pill radius, lowercase, mono micro-label above when space
  allows. Hover: brighten + 2px lift. This is the ONLY pill surface in the system.
- **Secondary CTA:** hairline border (`--color-rule-2`), transparent fill,
  ink text, pill radius, lowercase. Hover: paper-3 fill, 2px lift.
- Copy pattern: verbs ("book the audit", "start a project") — never
  "get started today" / "unlock".

## Per-page allowances

- Marketing pages MAY use the apparatus (Tier-B hand-built CSS/SVG): **one per
  page, never two**, 240–480 px desktop, ~180 px mobile, pure CSS/SVG (no
  `<img>`, no icon fonts, no Figma exports), leader-line callouts carrying REAL
  values from the brief. Apparatus types by page verb: Home = topology graph
  (traverses the workflow) · Services = filament chamber (produces output) ·
  WorkflowAudit = indicator dial (measures) · Web/Mobile/SaaS = filament
  chamber or topology.
- App/form pages MUST NOT use enrichment — function carries the page.
- Content pages: typography only.

## What pages MUST share

- The wordmark (renders lowercase via CSS).
- The brass accent and its placement (≤ 5 % per viewport; apparatus + verb + fills).
- The display + body + mono fonts and the two-register case system.
- The CTA voice (brass pill / hairline pill, lowercase verbs).
- The mono eyebrow rhythm (`01 · ROLE`) above every section.
- The blueprint grid + emission wash on the hero canvas; hairline cards with
  inner emission everywhere else.
- The meter strip beneath every marketing hero (real values only).

## What pages MAY differ on

- Apparatus type (per-page verb: traverse / produce / measure).
- Hero archetype within the Marquee Hero family.
- Section order within the SaaS sequence.
- Long Document pages may omit the meter strip.

## What is banned (hard)

- Glowing orbs / spheres / rings of any kind.
- `font-style: italic` anywhere on the page.
- Sentence-case or title-case prose — everything lowercase except mono labels.
- Lowercase mono labels — eyebrows/callouts/meters are UPPERCASE.
- Bento grids, glassmorphism / `backdrop-filter` blur, "trusted by" logo walls,
  three-feature-card rows with icon tops, emoji in eyebrows.
- Invented metrics, testimonials, logos, or case-study counts. Every number is
  a locked published figure (audit 85,000 ETB · 5 business days · 250k/750k/
  1.5M+ AI · 45k/150k/250k web · 200k/400k mobile · 30–70k/mo AI support ·
  5–15k/mo maintenance · 40/30/30 milestone billing).
- Re-drawn browser chrome. Real screenshots only (none exist — typography only).
- Light-paper sections inside the dark build. No sneaking white back in.

## Exports

Drop-in formats for re-using this design system in other projects.

### tokens.css

```css
:root {
  --color-paper:      oklch(13% 0.014 265);
  --color-paper-2:    oklch(17% 0.016 265);
  --color-paper-3:    oklch(21% 0.018 265);
  --color-ink:        oklch(96% 0.006 262);
  --color-ink-2:      oklch(86% 0.008 262);
  --color-ink-3:      oklch(72% 0.01 262 / 0.72);
  --color-rule:       oklch(96% 0.006 262 / 0.08);
  --color-rule-2:     oklch(96% 0.006 262 / 0.16);
  --color-accent:     oklch(76% 0.17 50);
  --color-accent-2:   oklch(68% 0.16 18);
  --color-glow:       oklch(80% 0.16 50 / 0.42);
  --color-paper-emit: oklch(76% 0.17 50 / 0.04);
  --rule-blueprint:   oklch(96% 0.006 262 / 0.04);
  --color-focus:      oklch(76% 0.17 50 / 0.9);
  --color-btn-ink:    oklch(13% 0.014 265);

  --font-display: "Instrument Serif", "Noto Serif Ethiopic", "Tiempos Headline", Georgia, serif;
  --font-body:    "Geist", "Noto Sans Ethiopic", "Segoe UI", sans-serif;
  --font-mono:    "JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace;

  --space-3xs: 0.25rem;  --space-2xs: 0.5rem;  --space-xs: 0.75rem;
  --space-sm:  1rem;     --space-md:  1.5rem;  --space-lg:  2rem;
  --space-xl:  3rem;     --space-2xl: 4.5rem;  --space-3xl: 7rem;

  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-md: 1.125rem;
  --text-lg: 1.375rem; --text-xl: 1.75rem;  --text-2xl: 2.25rem;
  --text-display: clamp(2.75rem, 6vw + 1rem, 5.5rem);

  --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out:  cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 220ms; --dur-med: 320ms; --dur-slow: 600ms; --dur-pulse: 4s;

  --radius-card: 12px; --radius-pill: 999px; --radius-input: 10px;
}
```

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper:   oklch(13% 0.014 265);
  --color-ink:     oklch(96% 0.006 262);
  --color-accent:  oklch(76% 0.17 50);
  --font-display:  "Instrument Serif", "Noto Serif Ethiopic", Georgia, serif;
  --font-body:     "Geist", "Noto Sans Ethiopic", sans-serif;
  --spacing-md:    1.5rem;
  --text-display:  clamp(2.75rem, 6vw + 1rem, 5.5rem);
  --ease-soft:     cubic-bezier(0.16, 1, 0.3, 1);
  /* mirror the rest of tokens.css with `--spacing-*` for Tailwind's spacing utilities */
}
```
