# Phase 8 Blueprint — Lumen Night Visual System (B39–B48 / NB-25–34)

**Date:** 2026-08-10 · **Author:** @visionary (design, per Hallmark) · **Persisted & arbitrated by:** @architect
**Governed by:** `design.md` (locked system, project root), `docs/behaviors/visual-system-lumen.md` (B39–B48), `docs/behaviors/pending-behaviors.md` (NB-25–35)
**Supersedes:** Phase 7 Fortune-500 light-first rules (B26–B38) on every page once built

## Arbitration rulings (@architect — pending)

1. **OWNER MANDATE — full visual replacement.** The owner explicitly rejected the Phase 7 look ("I hate how everything looks") and approved a complete redesign of the visual layer across every page. This blueprint replaces the light-first stone/bronze system with the dark Lumen Night system. **What is preserved:** all routes, all copy intent and locked figures (ETB table, SLA, 40/30/30, pilot 15–20%), all business logic (forms, analytics, lead capture, i18n, fallback queues), the trilingual surface (EN/AM/OM), and the Ethiopic font fallbacks.
2. **Zero file deletions.** Every existing component file survives; components are re-skinned in place. Only CSS rule blocks and JSX classNames change. `BandCta.jsx` is re-skinned into the brass final-CTA band (its `band-dark` chrome dies in CSS, the component lives).
3. **E2E first.** The 76-test suite asserts the Phase 7 light-first system. Per the TECH-21 precedent (B38), the suite is re-baselined FIRST to a recorded red state, then the build flips it green. Acceptance is the fresh suite, not the old assertions.

---

## Goal

Replace the light-first Fortune-500 visual system with the dark Lumen Night system — cool-violet near-black canvas, molten-brass accent, lowercase serif display + humanist sans body + mono labels (two-register case system), one hand-built apparatus per marketing hero, receipt-style rate sheets, blueprint grid + meter strip, flat hairline nav, statement footer, calm motion — across all routes × 3 languages, landing with a re-baselined E2E suite at full green.

## 1. Change surface

### MODIFY (26 files)
| # | File | What changes |
|---|---|---|
| 1 | `index.html` | `data-theme="light"`→`"dark"`, `color-scheme` light→dark, `theme-color` `#fafaf9`→`#14141c` (paper-2 equivalent); Google Fonts link: drop Manrope + Neue Montreal Fontshare link, ADD `Instrument+Serif` + `Geist`; KEEP `JetBrains+Mono` + `Noto+Sans+Ethiopic` + `Noto+Serif+Ethiopic`; drop the Fontshare preconnect/link (no longer needed) |
| 2 | `src/index.css` | Full token rewrite per `design.md` § Exports (paper/ink/rule/accent/glow/blueprint, fonts, radii, easings, durations); body: `background: var(--color-paper)`, `color: var(--color-ink-2)`, `text-transform: lowercase`, `font-variant-numeric: tabular-nums`; delete all light-surface tokens, `[data-theme='dark']` blocks are gone entirely (dark is the only theme), `.band-dark` scope re-bound to paper-2 + brass, grain `body::before` → blueprint grid + emission wash (`.hero`-scoped), `:lang(am)` block KEPT + extended (line-height 1.8, headings 1.3, letter-spacing 0, `text-transform: none` on all label classes); `.btn` re-skin (brass fill / hairline pill, lowercase, mono micro-label support); `.glass*` → hairline cards with inner emission; form controls dark re-skin; meter strip + apparatus component CSS; eyebrow system; route-loader/fade utilities re-skinned; ALL uppercase label rules converted to mono UPPERCASE |
| 3 | `src/components/Navbar.jsx` | Structure unchanged (flat bar re-skin is CSS-only): drop `.navbar-inner` pill styles in CSS (flat hairline bar, `border-bottom: 1px solid var(--color-rule)`), wordmark left, Services dropdown centre, language switcher + brass CTA right; labels render lowercase via body rule; keep `.scrolled` state but change to hairline-stronger (no blur — B46 bans backdrop-filter) |
| 4 | `src/components/Footer.jsx` | Markup restructure → Ft5 Statement: one lowercase statement sentence (existing footer brand copy, re-used), hairline, then wordmark + minimal links + contact in muted mono. Keep `.footer-links` class and the `mailto:` anchor FIRST in Connect (E2E hook). Zero new copy — reuse existing `footer.links.*` / `brand.*` keys |
| 5 | `src/components/BandCta.jsx` | Re-skin in place: section becomes brass final-CTA band (paper-2 + emission wash, hairline top), heading lowercase, CTA buttons = brass pill + hairline pill; classNames `band-cta` kept |
| 6 | `src/pages/Home.jsx` | Marquee Hero: apparatus (topology graph) at hero-right + lowercase serif headline at hero-left (one brass verb, e.g. "fix the workflow before you commission the build." — verb = "fix"); meter strip below hero (left `AUDIT · 85,000 ETB · FIXED`, right `DELIVERY · 5 BUSINESS DAYS`); hero-facts list → receipt rows; sections re-ordered per SaaS sequence; band-dark sections → paper-2 hairline sections; contact section re-skin (hairline form, mono labels, brass submit) |
| 7 | `src/pages/Services.jsx` | Marquee Hero + filament-chamber apparatus; service grid → ruled receipt rows (mono numerals 01–04); supporting tracks → hairline rows |
| 8 | `src/pages/Pricing.jsx` | Receipt-style rate sheet (ruled rows, mono UPPERCASE labels, tabular ETB, no tier-card icons); InteractivePricing + PricingCard re-skinned via CSS (verify no markup change needed); PilotOfferSection → paper-2 hairline |
| 9 | `src/pages/WorkflowAudit.jsx` | Marquee Hero + indicator-dial apparatus; audit steps as numbered Long-Document sections; deliverables as receipt checklist |
| 10 | `src/pages/WebDevelopmentPage.jsx` | Marquee Hero (filament chamber); track sections as hairline rows; ROI estimator re-skinned (dark inputs, brass accents) |
| 11 | `src/pages/MobileDevelopmentPage.jsx` | same as 10 |
| 12 | `src/pages/SaasSolutionsPage.jsx` | same as 10; waitlist note as mono callout |
| 13 | `src/pages/AdditionalServicesPage.jsx` | Rate-sheet rows for add-ons; FAQ accordion re-skinned (hairline, brass chevrons) |
| 14 | `src/pages/PolicyPage.jsx` | Long Document: continuous prose, mono eyebrows on sections, hairline rules; no apparatus; tables → ruled receipts |
| 15 | `src/pages/IndustryLandingPage.jsx` | Long Document family (dynamic content page): mono eyebrow hero, hairline sections, no apparatus |
| 16 | `src/pages/InstantQuotePage.jsx` | Long Document: wizard form on hairline surface, mono labels, brass submit; results as receipt rows |
| 17 | `src/pages/DiscoveryCallPage.jsx` | Long Document: form as the page; mono labels, brass submit |
| 18 | `src/pages/NotFoundPage.jsx` | Long Document: lowercase serif 404 statement + mono eyebrow; no apparatus |
| 19 | `src/components/PageTransition.jsx` | Keep orchestrated reveal; verify duration 0.55 s + fade + 12px, `useReducedMotion` → 0 when reduced (B47) |
| 20 | `src/components/ScrollReveal.jsx` | Keep fade-only (no slide on cards); hidden y 12, 600 ms, stagger 60 ms; reduced-motion static |
| 21 | `src/components/StaggeredText.jsx` | Keep; drop rotateX if present, y 10, damping 25 (no overshoot); reduced-motion static |
| 22 | `src/components/MagneticButton.jsx` | **Neutralise magnetic pointer-follow** (B47 bans cursor followers): keep component API, replace pointer-follow with simple hover lift (translateY(-2px)); or if simpler, pages switch to `.btn` and the component is retired from use (file kept) |
| 23 | `src/components/FloatingCTA.jsx` | Re-skin: brass pill (the system's one pill surface), dark shadow, no bounce |
| 24 | `src/components/LiveChatDock.jsx` | Re-skin: hairline card, brass icon; no motion beyond hover |
| 25 | `src/components/LeadCaptureModal.jsx` | Re-skin: paper-2 slide panel, hairline, mono labels, brass submit + close |
| 26 | `tests/live-site.spec.js` | TECH-22 re-baseline: MUTATE the Phase 7 light/band/typography assertions to Lumen Night expectations (dark canvas, brass accent, lowercase serif display, mono UPPERCASE eyebrows, receipt rows, apparatus presence, meter strip, flat nav, statement footer, reduced-motion). Header diff-record comment (B38 convention). See §4 impact map |

### CREATE (2 files)
| File | Purpose |
|---|---|
| `src/components/Apparatus.jsx` | Shared Tier-B hand-built apparatus: `type` prop (`topology` / `filament` / `dial`), pure CSS + inline SVG, 240–480 px desktop / ~180 px mobile, 3–5 leader-line callouts (props: `callouts` array — real figures only), 4 s pulse animation with `prefers-reduced-motion` freeze. No `<img>`, no orb |
| `src/components/MeterStrip.jsx` | 32–48 px static band: 60–80 procedurally varied ticks (sine/gaussian envelope — deterministic, seeded), mono end-labels (props: `labelLeft`, `labelRight` — real figures only), hairline top/bottom |

### DELETE (0 files; CSS blocks + classNames inside existing files)
All Phase 7 light tokens, grain overlay, `.band-dark` chrome (scope re-bound), `.navbar-inner` pill/blur styles, `.glass*` box shadows (→ hairline + inner emission), uppercase sentence-case label rules (→ mono UPPERCASE), accent `linear-gradient`s, `--ease-spring` overshoot, `backdrop-filter` everywhere except none (banned), `band-1`/`band-2` classNames from page JSX (replaced by paper-2 hairline sections + brass final CTA).

### VERIFY ONLY (no edits expected; re-check after each ticket)
`IconGlyph.jsx` (swap stroke colors via CSS `currentColor`), `LogoMark.jsx` (renders lowercase via CSS — verify glyph legibility on dark), `LanguageSwitcher.jsx` (dark re-skin via CSS), `RoiEstimator.jsx` (re-skin via CSS if possible), `PilotOfferSection.jsx`, `FaqAccordion.jsx`, `InteractivePricing.jsx`, `PricingCard.jsx`, `PricingScenarioPlanner.jsx`, `ScrollToTopButton.jsx`, `ErrorBoundary.jsx`, `App.jsx`, all `src/services/*`, `src/config/*`, `src/i18n/*` (NO copy changes — B40's lowercase is CSS-rendered, markup stays sentence-case for a11y/SEO).

## 2. Token layer (dark-first, per `design.md`)

**Canvas:** `--color-paper: oklch(13% 0.014 265)` · raised `--color-paper-2: oklch(17% 0.016 265)` · hover `--color-paper-3: oklch(21% 0.018 265)`
**Ink:** `--color-ink: oklch(96% 0.006 262)` (headlines) · `--color-ink-2: oklch(86% 0.008 262)` (body) · `--color-ink-3: oklch(72% 0.01 262 / 0.72)` (muted)
**Rules:** `--color-rule: oklch(96% 0.006 262 / 0.08)` · `--color-rule-2: oklch(96% 0.006 262 / 0.16)`
**Accent:** `--color-accent: oklch(76% 0.17 50)` (molten brass) · `--color-accent-2: oklch(68% 0.16 18)` (coral verb — one per headline, max) · `--color-btn-ink: oklch(13% 0.014 265)` (stamped text on brass)
**Emission:** `--color-glow: oklch(80% 0.16 50 / 0.42)` (apparatus halo only) · `--color-paper-emit: oklch(76% 0.17 50 / 0.04)` · `--rule-blueprint: oklch(96% 0.006 262 / 0.04)`
**Focus:** `--color-focus: oklch(76% 0.17 50 / 0.9)` — `:focus-visible` ring, 2px, offset 2px

**Old → new rename map (longest-match-first MANDATORY):**
1. `--bg-primary/secondary/tertiary`, `--surface-1/2`, `--text-primary/secondary/tertiary/inverse/on-dark`, `--border-subtle/strong/faint` → Lumen names above (delete or alias per context)
2. `--accent` keeps its NAME → brass value; `--accent-gold` → `--color-accent` alias; `--accent-deep` → delete (brass brightens on hover instead of darkening); `--accent-tint` → `--color-paper-emit`; `--accent-tint-border` → `--color-rule-2`
3. `--band-bg` → `--color-paper-2`; `--band-bg-soft` → `--color-paper-3`; `--band-border` → `--color-rule-2`; `--band-text` → `--color-ink`; `--band-text-secondary` → `--color-ink-3`
4. `--shadow-gold` / all soft shadows → Lumen card shadow `0 24px 60px -28px oklch(0% 0 0 / 0.55)` (elevated chrome only; hairline cards use inner emission, NOT shadows)
5. `--ease-out` stays (re-point to `--ease-soft` cubic-bezier(0.16,1,0.3,1)); `--ease-smooth` → `--ease-out`; `--ease-spring` → DELETE (no overshoot anywhere)
6. `--radius-sm/md/lg/xl/2xl` → `--radius-card: 12px` · `--radius-input: 10px` · `--radius-pill: 999px` (pills ONLY on CTAs)
7. `--font-heading` → `--font-display: 'Instrument Serif', 'Noto Serif Ethiopic', 'Tiempos Headline', Georgia, serif`; `--font-body` → `'Geist', 'Noto Sans Ethiopic', 'Segoe UI', sans-serif`; `--font-mono` stays

**Typography (B40/B41):**
- `body { text-transform: lowercase; }` — CSS-rendered; markup stays sentence-case (a11y/SEO). Mono label classes (`[class*='eyebrow'], [class*='label'], [class*='kicker'], [class*='tag'], [class*='meter'], .callout, .stat__label, th`) get `text-transform: uppercase; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em;`
- Display: Instrument Serif 400, `letter-spacing: -0.032em`, `line-height: 1.02`, size `--text-display`; exactly one brass verb per headline via `<em>` (upright, `font-style: normal`, brass, 1px underline draw-in 320 ms @ 900 ms)
- `:lang(am)`: line-height 1.8 / headings 1.3, `letter-spacing: 0`, `text-transform: none` on every label class, `font-style: normal`; digits guaranteed Latin via mono/body order (B30)

**Radii discipline:** cards 12px · inputs 10px · CTAs pill. Nothing else rounded.

## 3. Per-ticket execution order (atomic)

**TECH-22 — E2E re-baseline (FIRST — TDD red state):**
1. Rewrite `tests/live-site.spec.js` per §4 impact map: MUTATE light/band/typography assertions → Lumen Night expectations (dark canvas, brass, lowercase serif display, mono UPPERCASE eyebrows, receipt rows, apparatus, meter strip, flat nav, statement footer, reduced-motion).
2. Add spec header comment: re-baseline diff record (date, ticket TECH-22, light→dark, NB-25–34, QA-review status field).
3. Run suite → confirm RED on the new dark assertions (light site fails them); untouched assertions (routes, forms, i18n, lead capture) still pass — recorded red state.

**TECH-23 — Dark canvas + tokens:**
4. `index.html` meta/theme/fonts (§1 row 1).
5. `index.css` token rewrite + rename map (longest-first) + body lowercase/tabular + delete light tokens + blueprint grid/emission (`.hero`-scoped; DELETE grain overlay).
6. `.btn` re-skin (brass pill + hairline pill, mono micro-labels), `.glass*` → hairline cards w/ inner emission, form controls, focus ring.
7. Accent gradient audit: delete all accent `linear-gradient`s (keep only apparatus filament gradient + emission washes — inspect each).
8. Grep gates G1–G5 (§5) → 0.

**TECH-24 — Typography two-register:**
9. Font stacks + `:lang(am)` block + label-class uppercase sweep; verify AM/OM/EN numeral identity.
10. Display scale + brass verb landmark (`.hero__title em` pattern) — exactly one verb per headline, `&nbsp;` guards.
11. Eyebrow system (`01 · ROLE`) above every section; gates G6–G7.

**TECH-25 — Heroes + apparatus + meter:**
12. `Apparatus.jsx` + `MeterStrip.jsx` (CREATE) with real callouts per page (Home topology · Services filament · WorkflowAudit dial · Web/Mobile/SaaS filament) — callouts: `AUDIT · 85,000 ETB · FIXED`, `DELIVERY · 5 BUSINESS DAYS`, `KICKOFF · 40%`, `DESIGN · 30%`, `DEPLOY · 30%`, `PILOT · 15–20% OFF` (all real).
13. Home Marquee Hero restructure (§1 row 6); subpage heroes re-skinned; meter strip under every marketing hero.
14. Hero enrichment gates: apparatus is pure CSS/SVG, no orb, one per page, 240–480 px, pulse-only, reduced-motion freeze.

**TECH-26 — Receipt rate sheets + services:**
15. Pricing page → receipt rows (no tier-card icons); InteractivePricing/PricingCard re-skin; AdditionalServices add-ons → receipt rows.
16. Services page → ruled rows with mono numerals; supporting tracks → hairline rows; Home facts/offer ladder → receipt rows.
17. Gate G8 (locked figures) — no invented numbers anywhere.

**TECH-27 — Nav + footer + chrome:**
18. Navbar flat hairline re-skin (no blur, no pill), Services dropdown re-skin, CTA brass.
19. Footer → Ft5 Statement (existing copy, mono contact block).
20. FloatingCTA/LiveChatDock/LeadCaptureModal/ScrollToTopButton/BandCta re-skins; MagneticButton neutralised.

**TECH-28 — Motion + reduced-motion:**
21. PageTransition/ScrollReveal/StaggeredText verification per B47; pulse + underline anims gated by `prefers-reduced-motion`.
22. Full-page reduced-motion pass: everything static, final state.
23. Grep gates G9–G10 (§5) → 0.

**TECH-29 — E2E green + full sweep:**
24. Run re-baselined suite → green; fix any drift.
25. Full route walk × 3 languages (manual/scripted): glyph clipping, numeral identity, lowercase rendering, apparatus presence, meter labels.
26. QA review per B38 convention; flip QA-review field to APPROVED.

## 4. E2E impact map (TECH-22)

- **MUTATE:** theme-color/dark canvas assertions (was light `#fafaf9` → dark), accent assertions (bronze `#8a5a2b` → brass `oklch(76% 0.17 50)`), font assertions (Neue Montreal/Manrope → Instrument Serif/Geist), band assertions (two light bands → paper-2 hairline sections + brass final CTA), nav pill → flat bar, footer 4-column → statement footer, hero facts → receipt rows, pricing tier cards → receipt rows.
- **NEW (9):** N1 dark canvas + brass accent present · N2 lowercase display serif + mono UPPERCASE eyebrow · N3 apparatus present in marketing hero (no orb class) · N4 meter strip with real end-labels · N5 pricing renders ruled receipt rows · N6 services render ruled rows with mono numerals · N7 flat nav (no pill class) · N8 statement footer (no 4-column) · N9 reduced-motion: no animation classes active.
- **UNTOUCHED:** route smoke tests, form submission flows, i18n switch (EN→AM→OM), lead-capture modal, fallback queue, analytics events, skip-link, 404.

## 5. Grep gates (audit commands)

- **G1:** `backdrop-filter` → 0 matches (banned everywhere)
- **G2:** `font-style: italic` → 0 (no italics anywhere)
- **G3:** `text-transform: uppercase` on non-label, non-mono selectors → 0 (uppercase = mono labels only)
- **G4:** `linear-gradient` count → ≤ 4, each inspected (apparatus filament, emission washes only; no accent text gradients)
- **G5:** `#fff|#000|#fafaf9|#f5f5f4|#e7e5e4|#d6d3d1|#8a5a2b|#e8b962` (old palette) → 0 in CSS
- **G6:** headline `em` count per page → ≤ 1; every `em` has `font-style: normal`
- **G7:** eyebrow pattern `^\d{2} · ` present above every section head
- **G8:** every number in markup matches locked figures (audit 85,000 · 5 days · 250k/750k/1.5M+ · 45k/150k/250k · 200k/400k · 30–70k · 5–15k · 40/30/30 · 15–20%) — no new numbers
- **G9:** `transition: all` / `transition-all` → 0
- **G10:** `@keyframes` count → ≤ 4 (pulse, underline-draw, page-open, none-else); each has reduced-motion freeze

## 6. Acceptance (user-facing, per NB-25–34)

A visitor lands on any page in any language and sees: a dark cool-violet canvas with near-white serif lowercase headlines, one brass verb per headline with a drawn underline, mono UPPERCASE `01 · ROLE` eyebrows, a hand-built apparatus with real-figure callouts (marketing pages), a static meter strip under the hero, prices as ruled receipt rows, a flat hairline nav, a statement footer, and calm fade-only motion that goes fully static under reduced motion. No italic, no white sections, no floating pill, no orb, no invented numbers.

## 7. Design lock — per-page values (approved 2026-08-10 · NB-35)

Locked by @visionary per Hallmark, approved by the owner. @build uses these
values verbatim; nothing here is a suggestion.

### 7.1 Brass verb landmark (B40)

| Page | Headline (renders lowercase) | Brass verb | Action |
|---|---|---|---|
| Home | fix the workflow before you commission the build | fix | none |
| Services | what we actually build after the workflow audit | build | none |
| Workflow Audit | audit the workflow before the build | audit | AMEND h1 (JSX) |
| Web | web systems that help the business move, not just look presentable | move | none |
| Mobile | mobile products for teams that work in motion | work | none |
| SaaS | get on the SaaS waitlist | get | AMEND h1 (JSX) |
| Additional services | supporting services, quoted plainly | quoted | none |
| Pricing | read the live pricing and engagement model | read | AMEND h1 (JSX) |
| Policy | commercial terms, plainly stated | stated | none |
| Discovery call | book a discovery call | book | none |
| Instant quote | get a working range without a long intake flow | get | none |
| 404 | (i18n) | — | EXEMPT — status page, no landmark |
| Industries | (dynamic content.title) | — | EXEMPT — until real industry content exists |

The three AMENDs are JSX literals only (marketing h1s are hardcoded English —
the i18n surface is untouched). Each preserves copy intent and is flagged for
QA (B48). Rendering: verb inside `<em>` with `font-style: normal`, brass
colour, 1px brass underline drawn in once (320 ms @ 900 ms), `&nbsp;`-guarded
on both sides, exactly one per h1.

### 7.2 Apparatus callouts (B42)

| Page | Apparatus | Callouts (mono, leader-lined — real figures only) |
|---|---|---|
| Home | topology | AUDIT · 85,000 ETB · FIXED · DELIVERY · 5 BUSINESS DAYS · CREDIT · 100% TOWARD BUILD · KICKOFF · 40% · PILOT · 15–20% OFF |
| Services | filament | AUTOMATION · FROM 250,000 ETB · WEB · FROM 45,000 ETB · MOBILE · FROM 200,000 ETB · MILESTONES · 40/30/30 |
| Workflow Audit | dial | AUDIT · 85,000 ETB · FIXED · DELIVERY · 5 BUSINESS DAYS · CREDIT · 100% TOWARD BUILD |
| Web | filament | WEB · 45,000 / 150,000 / 250,000 ETB · MILESTONES · 40/30/30 · RESPONSE · 1 BUSINESS DAY |
| Mobile | filament | MOBILE · 200,000 / 400,000 ETB · MILESTONES · 40/30/30 · RESPONSE · 1 BUSINESS DAY |
| SaaS | filament | SAAS · WAITLIST ONLY · PILOT · 15–20% OFF · RESPONSE · 1 BUSINESS DAY |

No apparatus on Pricing, Policy, Instant Quote, Discovery Call, 404, or
Industries (rate-sheet / content / form pages — B42).

### 7.3 Meter strips (B45)

| Page | Left label | Right label |
|---|---|---|
| Home | AUDIT · 85,000 ETB · FIXED | DELIVERY · 5 BUSINESS DAYS |
| Services | AUTOMATION · FROM 250,000 ETB | MILESTONES · 40/30/30 |
| Workflow Audit | AUDIT · 85,000 ETB · FIXED | DELIVERY · 5 BUSINESS DAYS |
| Web | WEB · FROM 45,000 ETB | MILESTONES · 40/30/30 |
| Mobile | MOBILE · FROM 200,000 ETB | MILESTONES · 40/30/30 |
| SaaS | SAAS · WAITLIST ONLY | PILOT · 15–20% OFF |

### 7.4 Eyebrow enumeration (B41)

Pattern: JetBrains Mono, 11 px, tracking 0.10em, ink at 0.55 opacity,
`NN · ROLE`, UPPERCASE via CSS, ordinals continuous from 01 per page.

- **Home:** 01 · ENTRY (hero) · 02 · WHY AUDIT (#why-audit-first) · 03 · DELIVERABLES (#audit-deliverables) · 04 · TRACKS (#implementation-tracks) · 05 · LADDER (#offer-ladder) · 06 · CONTACT (#contact)
- **Services:** 01 · OFFER (hero) · 02 · LANES (#service-lanes) · 03 · MODEL (#delivery-model) · 04 · TRACKS (#delivery-tracks) · 05 · FIRST STEP (closing card)
- **Workflow Audit:** 01 · ENTRY (hero) · 02 · RECEIVE (two-column panel) · 03 · TIMELINE (#audit-timeline) · 04 · FIRST STEP (closing card)
- **Pricing:** 01 · RATES (hero) · 02 · AUDIT (#workflow-audit-pricing) · 03 · AUTOMATION (#ai-automation-pricing) · 04 · BUILDS (#product-build-pricing) · 05 · SUPPORT (#support-pricing) · 06 · NEXT (closing card)
- **All other pages:** derive `NN · ROLE` from the section id (ROLE = id words in mono caps, e.g. `#support-pricing` → `05 · SUPPORT`), ordinals continuous from 01 on the hero. QA verifies presence + continuity on every section head.

The hero eyebrow replaces the Phase 7 hero badge (pills are CTA-only in this
system); the badge's positioning copy is re-homed into the hero lede's opening
clause during the TECH-25 restructure, flagged for QA.
