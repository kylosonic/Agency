# Visual System — Lumen Night (Phase 8)

> SUPERSEDED (2026-08-12, ADR-004): AI-forward positioning/framing superseded by software-first prominence + brand rename to "NovaTech" (docs/behaviors/software-development-prominence.md). Locked prices/figures remain in force per ADR-003.

> ⚠️ **NOT YET IMPLEMENTED.** These rules describe the Phase 8 full visual
> redesign (the "Lumen Night" system). They supersede the Phase 7
> Fortune-500 light-first rules (B26–B38) for every page, across all three
> languages, once the build lands. Until then, the Phase 7 system remains live.
> Governed by `design.md` (project root). Build plan: `docs/plans/phase8-lumen-visual-system.md`.

## B39 — Dark canvas, warm brass

A visitor on any page sees a dark cool-violet canvas (never pure black), near-white
headlines, warm-grey body text, and ONE molten-brass accent. No light-paper
sections anywhere — the page is dark from edge to edge. Exactly two diffuse
brass emission washes may sit behind the hero; no animated background, no orbs.

## B40 — Two-register typography

All prose renders lowercase (headlines, lede, body, buttons, nav, brand, footer,
acronyms included). All mono labels render UPPERCASE (eyebrows, callouts, meter
labels, stat labels). No italic appears anywhere — the emphasised word in a
headline is brass-coloured with a 1px brass underline that draws in once.
Exactly one brass word per headline, and it is always a verb. Amharic text is
unaffected (Ethiopic has no case; `:lang(am)` overrides set line-height 1.8,
letter-spacing 0, no transforms).

**B40a — Per-page verb lock (approved 2026-08-10, NB-35).** The brass verb for
every page headline is a locked value; the build never improvises it.

| Page | Headline (renders lowercase) | Brass verb |
|---|---|---|
| Home | fix the workflow before you commission the build | fix |
| Services | what we actually build after the workflow audit | build |
| Workflow Audit | audit the workflow before the build | audit |
| Web | web systems that help the business move, not just look presentable | move |
| Mobile | mobile products for teams that work in motion | work |
| SaaS | get on the SaaS waitlist | get |
| Additional services | supporting services, quoted plainly | quoted |
| Pricing | read the live pricing and engagement model | read |
| Policy | commercial terms, plainly stated | stated |
| Discovery call | book a discovery call | book |
| Instant quote | get a working range without a long intake flow | get |
| 404 | (i18n) | exempt — status page |
| Industries | (dynamic) | exempt — until real content exists |

Three headlines are amended (Workflow Audit, SaaS, Pricing): JSX literals
only, i18n untouched, copy intent preserved, QA-flagged. The verb renders
upright (`font-style: normal`), brass, with a 1px brass underline drawn in
once (320 ms @ 900 ms), `&nbsp;`-guarded on both sides. Exactly one per
headline, never a noun.

## B41 — Instrument typography stack

Display headlines use a classical serif (Instrument Serif, upright, lowercase,
with Noto Serif Ethiopic fallback for Amharic); body copy uses a humanist sans
(Geist, with Noto Sans Ethiopic fallback); numbers, prices, and labels use
monospace (JetBrains Mono) with tabular numerals. Every section carries a mono
eyebrow (`01 · ROLE`) above its heading. Switching languages never clips glyphs,
collides lines, or changes how numbers and prices look.

## B42 — One hand-built apparatus per marketing page

Every marketing page hero shows exactly one hand-built CSS/SVG apparatus
(topology graph, filament chamber, or indicator dial — never a glowing orb),
240–480 px on desktop, ~180 px on mobile, with 3–5 mono leader-line callouts
that carry real published figures (85,000 ETB · 5 business days · 40/30/30).
The apparatus pulses at 3 % intensity on a 4 s period; it never rotates.
Reduced-motion users see it static at full intensity. Content and form pages
have no apparatus.

**B42a — Per-page callout lock (approved 2026-08-10, NB-35).** The 3–5
leader-line callouts per marketing apparatus are locked values, all from the
published figure set (B48).

| Page | Apparatus | Callouts (mono, leader-lined) |
|---|---|---|
| Home | topology | AUDIT · 85,000 ETB · FIXED · DELIVERY · 5 BUSINESS DAYS · CREDIT · 100% TOWARD BUILD · KICKOFF · 40% · PILOT · 15–20% OFF |
| Services | filament | AUTOMATION · FROM 250,000 ETB · WEB · FROM 45,000 ETB · MOBILE · FROM 200,000 ETB · MILESTONES · 40/30/30 |
| Workflow Audit | dial | AUDIT · 85,000 ETB · FIXED · DELIVERY · 5 BUSINESS DAYS · CREDIT · 100% TOWARD BUILD |
| Web | filament | WEB · 45,000 / 150,000 / 250,000 ETB · MILESTONES · 40/30/30 · RESPONSE · 1 BUSINESS DAY |
| Mobile | filament | MOBILE · 200,000 / 400,000 ETB · MILESTONES · 40/30/30 · RESPONSE · 1 BUSINESS DAY |
| SaaS | filament | SAAS · WAITLIST ONLY · PILOT · 15–20% OFF · RESPONSE · 1 BUSINESS DAY |

No apparatus on rate-sheet, content, or form pages (Pricing, Policy, Instant
Quote, Discovery Call, 404, Industries).

## B43 — Receipt-style rate sheets

Wherever prices appear (pricing page, quote results, service tables), they
render as a ruled receipt: hairline rows, mono UPPERCASE labels, tabular-nums
ETB figures, no tier cards with icon tops, no bento tiles. The published ETB
table matches the locked figures exactly (audit 85,000; AI 250k/750k/1.5M+;
web 45k/150k/250k; mobile 200k/400k; support 30–70k/mo; maintenance 5–15k/mo).

## B44 — Blueprint ground

The hero and the meter strip sit on a ruled blueprint grid at 4 % opacity with
a brass emission wash beneath it. Everywhere else, surfaces are hairline cards
(1px rule border, inner brass glow 6 % rest / 12 % hover, lift 4 px on hover).
No glassmorphism, no backdrop blur, no drop-shadow cards.

## B45 — Meter strip under every marketing hero

A full-bleed 32–48 px band under each marketing hero shows 60–80 procedurally
varied vertical ticks with mono labels at each end carrying real values
(e.g. `AUDIT · 85,000 ETB · FIXED` left, `DELIVERY · 5 BUSINESS DAYS` right).
The strip is static — a printed readout, never an animation. Reduced-motion
users see it unchanged (it never moves anyway).

**B45a — Per-page meter labels (approved 2026-08-10, NB-35).** Locked
left/right end-labels per marketing page.

| Page | Left label | Right label |
|---|---|---|
| Home | AUDIT · 85,000 ETB · FIXED | DELIVERY · 5 BUSINESS DAYS |
| Services | AUTOMATION · FROM 250,000 ETB | MILESTONES · 40/30/30 |
| Workflow Audit | AUDIT · 85,000 ETB · FIXED | DELIVERY · 5 BUSINESS DAYS |
| Web | WEB · FROM 45,000 ETB | MILESTONES · 40/30/30 |
| Mobile | MOBILE · FROM 200,000 ETB | MILESTONES · 40/30/30 |
| SaaS | SAAS · WAITLIST ONLY | PILOT · 15–20% OFF |

## B46 — Quiet nav, statement footer

The header is a flat hairline bar (no floating pill, no blur): wordmark left,
links + Services dropdown centre, language switcher + one brass CTA right.
The footer closes the page with one lowercase statement sentence, a hairline
rule, then wordmark, minimal links, and contact in muted mono beneath.
No four-column link maze.

## B47 — Calm motion

A page opens with one choreographed reveal (0.55 s fade + 12 px). Section heads
fade in gently on view (600 ms, 60 ms stagger). Cards lift 4 px on hover.
Nothing else moves: no slide-in panels, no bounce, no marquees, no parallax,
no cursor followers. A visitor who requests reduced motion sees a static page.

## B48 — Real facts only

Every number, label, and callout on the site is a locked published figure from
the pricing table or the SLA (1/3/5 business days, milestone 40/30/30, pilot
15–20 %). No metric, testimonial, logo count, or case-study figure exists
without a real source. If a number isn't real, it isn't on the page.
