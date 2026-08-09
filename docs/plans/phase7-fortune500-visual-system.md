# Phase 7 Blueprint — Fortune-500 Visual System (TECH-15→21 / B26–B38 / NB-18–24)

**Date:** 2026-08-08 · **Author:** @plan (drafted) · **Persisted & arbitrated by:** @architect
**Governed by:** `docs/behaviors/visual-system-fortune500.md` (B26–B38), `docs/adr/tech-backlog.md` §ACTIVE Phase 7, ADR-002, prior analogues phase3-design-overhaul + phase4-copy-humanization (constraint conventions, merge-chain precedence)

## Arbitration rulings (@architect — 2026-08-08)

1. **ACCEPTED — "Contact" nav destination → `/book-discovery-call`.** No `/contact` route exists; the discovery call page is the site's real contact mechanism. The B34 "Contact" label stays visible and routes to the discovery call page — a visitor reaches a working contact instrument in one click, satisfying the user-facing intent of the rule.
2. **ACCEPTED — minimal NEW-copy surface (nav labels + BandCta heading, EN/AM/OM, native-flagged).** B34/B27 mandate the 5-destination nav, the "Start a project" action, and the band headings; no existing locked string can serve them. Constraints: (a) the surface is strictly limited to the listed keys — nothing else; (b) reuse existing action strings (`actions.*`, `nav.startProject`) wherever possible; (c) AM/OM values are machine-translated and flagged for the existing native-review gate (extends the NB-09 review list); (d) no new claims — copy stays factual per B24.
3. **Route-count note:** behavior contract reads "all 11 pages"; @plan's audit found 12–13 actual routes. Not a behavior change — the E2E matrix strategy ("loop all routes") covers every route regardless of count; acceptance is measured against the NB-18–24 criteria, which apply site-wide.

---

## Goal
Flip the site from dark-only to a light-first Fortune-500 system — two fixed near-black bands per page, dual-mode bronze/gold accent, Neue Montreal/Manrope/JetBrains Mono + Ethiopic serif/sans typography, type-led heroes, ruled editorial service index, 5-destination nav with one Services dropdown, 4-column footer, zero-imagery calm motion — across all routes × 3 languages, landing with a deliberately re-baselined E2E suite (TECH-21 first, TDD red) at 76 green tests.

## 1. Change surface

### MODIFY (25 files)
| # | File | What changes |
|---|---|---|
| 1 | `index.html` | `data-theme="dark"`→`"light"`, `color-scheme` dark→light, `theme-color` `#09090b`→`#fafaf9`; Google Fonts link: drop Space Grotesk, add `Noto+Serif+Ethiopic`; ADD Fontshare CDN link `https://api.fontshare.com/v2/css?f[]=neue-montreal@400,500,600,700,800&display=swap` (keep preconnects; add `https://api.fontshare.com` preconnect). JSON-LD nav stale (11 items vs 5) → FLAG follow-up only, do NOT edit (SEO out of scope) |
| 2 | `src/index.css` | Token block rewrite (light-first + band tokens + dual-mode accent), delete all 40 `[data-theme='dark']` blocks, grain replaces `--page-noise` radials + grid overlay `body::after`, `:lang(am)` block, band component CSS, hero/typography scale, services ruled index, nav/footer reskin, motion timings, CTA band reskin, mono numerals |
| 3 | `src/components/Navbar.jsx` | PRIMARY_LINKS → 5 destinations (Services trigger, Pricing, Instant Quote, Policy, Contact→`/book-discovery-call`); SERVICE_LINKS → Web, Mobile, SaaS, AI Automation (`/services`), Workflow Audit; CTA button → "Start a project" → `/instant-quote`; label keys per §5; keep `.navbar-links`, `.mobile-menu-toggle`, `.mobile-nav`, `.navbar-mobile-actions`, `.language-switcher-select` hooks; blur-on-scroll class stays `.scrolled` |
| 4 | `src/components/Footer.jsx` | Regroup into 4 columns + `.footer-bottom` legal bar; `.footer-links` class kept on every list; Connect column keeps the `mailto:` anchor FIRST (E2E hook); zero new copy (reuse existing `footer.links.*` keys) |
| 5 | `src/pages/Home.jsx` | Hero: `.hero-panel` aside → `.hero-facts` ruled list (SOLUTION_PREVIEWS kept, numbered 01–03, no box — rules only; `.hero-panel` class name DELETED from markup); add `band-1` to `#methodology`, `band-2` to `.ai-home-cta` |
| 6 | `src/pages/Services.jsx` | `band-1` on `.searchable-brain-section`, `band-2` on `.ai-supporting-service` section; restructure CORE_SERVICES render only if needed for ruled rows (prefer CSS) |
| 7 | `src/pages/Pricing.jsx` | `band-1` on `<PilotOfferSection band="1">`; insert `<BandCta />` after it (band-2) |
| 8 | `src/pages/WorkflowAudit.jsx` | `band-1` on `<PilotOfferSection band="1">`; insert `<BandCta />` after it (band-2) |
| 9 | `src/pages/WebDevelopmentPage.jsx` | `<RoiEstimator band="1" …/>`; `.cta-section` gets `band-2` |
| 10 | `src/pages/MobileDevelopmentPage.jsx` | same as 9 |
| 11 | `src/pages/SaasSolutionsPage.jsx` | same as 9; verify StaggeredText reduced-motion after TECH-20 |
| 12 | `src/pages/AdditionalServicesPage.jsx` | `<FaqAccordion band="1" …/>`; `.cta-section` gets `band-2` |
| 13 | `src/pages/PolicyPage.jsx` | `band-1` on the closing policy-terms block (last content block inside the policy body section — builder locates; invariant: between tables and `.cta-section`); `.cta-section` gets `band-2` |
| 14 | `src/pages/InstantQuotePage.jsx` | `band-1` on the result/waitlist block; insert `<BandCta />` at end (band-2) |
| 15 | `src/pages/DiscoveryCallPage.jsx` | insert `<BandCta />` at end (band-2); `band-1` on post-form block if one exists (else band-2 only + documented exception below) |
| 16 | `src/pages/IndustryLandingPage.jsx` | `band-1` on first section after hero content; `band-2` = `<BandCta />` at end |
| 17 | `src/pages/NotFoundPage.jsx` | insert `<BandCta />` (band-2); band-1 intentionally absent (error page — documented exception in spec comment) |
| 18 | `src/components/PageTransition.jsx` | Orchestrated page-open reveal: duration → 0.55s, y 10→12/8, add `useReducedMotion` (duration 0 when reduced) |
| 19 | `src/components/ScrollReveal.jsx` | hidden y: 30→12, spring→tween (`duration 0.45, ease-out`), stagger 0.12→0.06, keep reduced-motion branch |
| 20 | `src/components/StaggeredText.jsx` | Add `useReducedMotion` (static when reduced), drop `rotateX`, y 20→10, spring damping 15→25 (no overshoot) |
| 21 | `src/components/PilotOfferSection.jsx` | Optional `band` prop → adds `band-dark` + `band-1/band-2` to the section className (no other change; `data-testid="pilot-offer"` preserved) |
| 22 | `src/components/RoiEstimator.jsx` | Optional `band` prop → className += `band-dark band-1` on `.roi-section`; inputs/controls re-skinned via band CSS |
| 23 | `src/components/FaqAccordion.jsx` | Optional `band` prop → className += `band-dark band-1`; accordion styling per band CSS |
| 24 | `src/i18n/translations.js` | Nav label delta only (§5 — locked list, EN base + AM/OM mirrors in the SAME override layer where sibling `nav.*` keys live; native-review flag) |
| 25 | `tests/live-site.spec.js` | TECH-21 re-baseline: 2 MUTATE, 9 NEW, header diff-record comment (B38) |

### CREATE (1 file)
| File | Purpose |
|---|---|
| `src/components/BandCta.jsx` | Shared pre-footer near-black CTA band (band-2) for pages lacking one: `section className="band-cta band-dark band-2"` + `.cta-inner`-style content; heading via NEW locked i18n keys (`band.cta.title` + `band.cta.subtitle` — arbitration 2); CTA buttons reuse existing `t('actions.*')` strings where present else `nav.startProject`-style nav keys; renders `<Link>`s only (no analytics changes) |

### DELETE (0 files; CSS blocks inside `src/index.css`)
All 40 `[data-theme='dark']` selector blocks · `body::after` grid overlay · `--page-noise` radial block · `.gradient-text` rule (solid accent) · accent `linear-gradient`s per §7 grep gate · `.hero-panel`/`.hero-panel-label`/`.hero-features`/`.hero-feature-card` box styles (replaced by `.hero-facts`) · old `.ai-service-card` box styles (→ ruled rows) · overshoot `--ease-spring` · any hover `translateY` > 4px.

### VERIFY ONLY (no edits expected; re-check after each TECH)
`InteractivePricing.jsx`, `PricingCard.jsx`, `LeadCaptureModal.jsx`, `FloatingCTA.jsx` (transform-only, no bounce), `MagneticButton.jsx` (pointer-follow — keep, confirm no decorative loop), `LiveChatDock.jsx`, `ScrollToTopButton.jsx`, `IconGlyph.jsx`, `LogoMark.jsx`, `LanguageSwitcher.jsx`, `App.jsx`, `seoService.js`, `siteConfig.js` (OG image = social meta, out of scope → follow-up flag), `contentData.js` (quoteWizardOptions — untouched).

## 2. Token layer (light-first)

**Light base (stone family — near-white, zero blue):**
- `--bg-primary: #fafaf9` · `--bg-secondary: #f5f5f4` · `--bg-tertiary: #e7e5e4`
- `--surface-1: #ffffff` · `--surface-2: #fafaf9` (delete `--bg-dark`/`--bg-dark-soft` from base → become band tokens)
- `--border-subtle: #e7e5e4` · `--border-strong: #d6d3d1` · `--border-faint: rgba(28, 25, 23, 0.08)`
- Text: `--text-primary: #1c1917` · `--text-secondary: #57534e` (7.7:1 ✓ AA) · `--text-tertiary: #78716c` (4.8:1 ✓ AA) · `--text-inverse: #1c1917` (dark text on accent buttons) · `--text-on-dark: #f5f5f4`

**Dark bands (near-black, never `#000`):**
- `--band-bg: #0c0c0e` · `--band-bg-soft: #141416` · `--band-border: rgba(255,255,255,0.12)` · `--band-text: #f5f5f4` · `--band-text-secondary: #d6d3d1`

**One accent, two modes (AA-verified):**
- Light mode: `--accent: #8a5a2b` (deep bronze — **5.9:1 vs #fff** ✓ AA; NOTE: phase-3 `#a87e33` fails at 3.7:1 — must darken) · `--accent-deep: #6f4520` (hover, 8:1) · `--accent-tint: rgba(138,90,43,0.12)` (decorative only — B28 bans text background washes) · `--accent-tint-border: rgba(138,90,43,0.30)`
- Dark mode (re-bound inside `.band-dark` scope): `--accent: var(--accent-gold)` where `--accent-gold: #e8b962` (**10.7:1 vs #0c0c0e** ✓) · `--accent-deep: #f0c878` · `--accent-tint: rgba(232,185,98,0.14)` · `--shadow-gold: 0 14px 34px rgba(232,185,98,0.18)`
- Mechanism: `.band-dark { --accent: var(--accent-gold); --accent-deep: #f0c878; --accent-tint: …; background: var(--band-bg); color: var(--band-text); }` — one scope, zero selector duplication. Accent NEVER a gradient (B28).

**Old → new rename map (longest-match-first MANDATORY):**
1. `--accent-light` → `--accent-gold`
2. `--accent-dark` → `--accent-deep` (re-pointed for light hover; dark scope re-binds)
3. `--accent-border` → `--accent-tint-border`
4. `--accent-bg` → `--accent-tint`
5. `--shadow-accent` → `--shadow-gold`
6. `--text-accent` → `--accent-gold` (was light-gold text; only valid on dark now — grep every usage)
7. `--bg-dark` → `--band-bg` · `--bg-dark-soft` → `--band-bg-soft`
8. `--accent` keeps its NAME (value → bronze `#8a5a2b`; dark bands re-bind)
9. Values re-pointed, names kept: `--bg-primary/secondary/tertiary`, `--surface-1/2`, `--border-*`, `--text-primary/secondary/tertiary/inverse/on-dark`
10. Shadow alpha: all `rgba(0,0,0,…)` shadows lighten (0.42–0.64 → 0.10–0.18) for light surfaces

**Fonts (B29/B30):**
- `--font-heading: 'Neue Montreal', 'Noto Serif Ethiopic', 'Noto Sans Ethiopic', Georgia, 'Segoe UI', sans-serif` — Ethiopic glyphs fall through to the serif display family (Latin-first stack)
- `--font-body: 'Manrope', 'Noto Sans Ethiopic', 'Noto Serif Ethiopic', 'Segoe UI', 'Ebrima', sans-serif`
- `--font-mono: 'JetBrains Mono', …` unchanged + `font-variant-numeric: tabular-nums` on `.pricing-amount`, `.ai-pricing-values strong`, `.price-cell`, `.milestone-card .percentage`, `.quote-result-range`, `.saas-price-item .value`, `.addon-card .price`, `.methodology-step-number`, new `.hero-facts` numerals, services index numerals
- NEW `:lang(am)` block (currently ABSENT — must be added): body line-height 1.8, headings 1.3, `letter-spacing: 0` (override the ~25 `uppercase/0.06–0.12em` label rules), `font-style: normal`, `text-transform: none` on `.section-tag`, `.hero-badge`, `.page-hero-chip`, `.pilot-offer-kicker`, kickers, mono labels. Digits: Latin-family digits guaranteed by `--font-mono`/`--font-body` order — never Ethiopic numerals.

## 3. Per-ticket execution order (atomic)

**TECH-21 — E2E re-baseline (FIRST — TDD red state):**
1. Rewrite `tests/live-site.spec.js` per §4 impact map: MUTATE tests 2 & 10, add 9 new tests (N1–N9).
2. Add spec header comment: re-baseline diff record (date, ticket TECH-21, dark→light, NB-24, QA-review status field).
3. Run suite → confirm RED on the new light-first/band assertions (dark site fails them) and that untouched assertions still pass — this is the recorded red state.

**TECH-15 — Light-first base + dual dark bands:**
4. `index.html` meta/theme/fonts (step 1 of §1 table).
5. `index.css`: token block rewrite + ordered rename map (longest-first) + delete 40 dark blocks + grain (`body::before` → SVG `feTurbulence` data-URI, opacity 0.04–0.06; DELETE grid overlay `body::after`).
6. `.band-dark`/`.band-1`/`.band-2` component CSS + band re-skin of every mapped section (§1 rows 5–17) + form controls inside bands (RoiEstimator inputs, FAQ toggles, wizard result) — gold accents, light text.
7. Accent gradient audit: delete all accent `linear-gradient` (14 total — inspect each; keep only neutral grain data-URI); `.gradient-text` → solid.
8. Grep gates G1–G5 (§7) → 0.

**TECH-16 — Typography:**
9. Font stacks + Fontshare link + Noto Serif Ethiopic (index.html + CSS).
10. `:lang(am)` block + scoped overrides; verify AM/OM/EN numeral identity via mono tokens.
11. Headline scale: display `clamp()` sizing (oversized, ~`clamp(2.5rem, 6vw, 4.5rem)`), three-level enforcement (SectionHeader = label + h2 + subtitle; heroes = chips-label + h1 + supporting line — no fourth level added anywhere).
12. Gate G6–G7 (§7).

**TECH-17 — Type-led heroes:**
13. Home: `.hero-panel` aside → `.hero-facts` ruled list (keep SOLUTION_PREVIEWS copy; mono 01/02/03; rules not boxes); hero-shell single-column left-aligned; trust row kept (real facts: "5 business days", ETB pricing).
14. Subpage heroes: CSS-only left-align + oversized display (`.page-hero-content`); chips = label level. Zero markup change.
15. Real-facts mono strip verified against locked figures (85,000 ETB / 5 business days / 40-30-30) — no invented numbers (G8).

**TECH-18 — Services editorial index:**
16. `.ai-service-grid` (Services) → ruled rows: `display:block` + `border-top: 1px solid var(--border-subtle)` + mono numerals 01–04 + icon + title + copy inline; `.glass-card` box styling removed for these rows.
17. Home `#ai-solutions` + `#product-engineering` grids → ruled rows (equal-card rows banned for service listings); `.ai-supporting-track-grid` pills → compact ruled rows.
18. Bordered boxes audit: keep only genuinely earned boundaries (objective selector board, automation use-case panel, pricing tier cards — pricing surfaces are distinct boundaries, RoiEstimator, quote wizard cards, contact form, not-found card, faq items); every `.glass`-box in a service-listing context → rules.
19. Gate G9 (§7): no `repeat(3|2, …)` equal-row grids in live service sections.

**TECH-19 — Nav + footer:**
20. Navbar.jsx restructure (§1 row 3; §5 labels; Contact → `/book-discovery-call` per arbitration 1).
21. translations.js nav delta (§5; merge-chain: mirror changed keys into the AM/OM override layer where sibling `nav.*` keys exist — verify by grep; native-review flag in code comment).
22. Footer.jsx → 4 columns + legal bar; `.footer-links` + mailto-first preserved.
23. Nav CSS: quiet on light, `backdrop-filter: blur` ONLY on `.navbar.scrolled .navbar-inner` + `.navbar-services-menu` + `.mobile-nav` + modal whitelist → `backdrop-filter` ≤ 5.
24. E2E: nav structure test N3 green; matrix overflow tests still green at 768×1024 with longer AM/OM labels.

**TECH-20 — Material & motion:**
25. PageTransition (0.55s, reduced-motion 0), ScrollReveal (y 12, tween 0.45, stagger 0.06), StaggeredText (reduced-motion + no rotateX), hover clamp (color/lift ≤ 4px, 150–300ms), delete overshoot ease.
26. Reduced-motion audit: every motion component static under `prefers-reduced-motion`; no marquee/parallax/loop (FloatingCTA, MagneticButton verified).
27. Grain pass: opacity 0.04–0.06, non-animated.

**Verify (all tickets):** §7 full gate suite → lint → build → Playwright 76/76 → 3-language screenshot pass.

## 4. E2E impact map (all 67 current assertions)

**KEEP (65 tests, 0 assertion changes):** the 40-viewport matrix (h1 visible + overflow ≤1px + no oversized `.btn-primary` — hero restructure must preserve both), services-table scroll, wizard completes, discovery booking, language switch, home contact form, all Phase-1 pricing/policy/404/sitemap/AM-OM/no-fabricated-stats tests (hooks `.navbar-mobile-actions .language-switcher-select`, `.contact-info-card`, `.footer-links`, `.cta-section .cta-actions`, `.cta-actions a.btn.btn-secondary.btn-lg[href^="mailto:"]`, `.dark-mode-toggle` 0, no /case-studies//portfolio) — ALL preserved by the §1 JSX strategy, all 9 Phase-2 wizard/pilot tests (`[data-testid="pilot-offer"]` untouched; pilot restyled dark on pricing/audit — testid survives).

**MUTATE (2):**
1. `mobile nav works and the site remains dark-only on home page` → "mobile nav works and the site defaults light-first": KEEP `.mobile-menu-toggle` open/close + `.navbar-links` hidden + `.dark-mode-toggle` 0; REPLACE `html[data-theme="dark"]` with `html[data-theme="light"]` + computed `body` background is light (`rgb` sum > 600).
2. `homepage proof strip removed while split hero is retained` → "homepage hero is typography-led with real-facts strip": KEEP `.hero-stats` 0, `#agent-demo` 0, `#impact-calculator` 0, `.hero-copy` visible, `.hero-trust-row` no-USD; REPLACE `.hero-panel` visible with `.hero-facts` visible + contains "5 business days"; body no-`$` kept.

**DELETE (0)** — no assertion fully dies; the two mutated tests retain their surviving halves.

**NEW (9) — TECH-21 additions:**
- N1 Light-first default: loop 10 matrix routes → `html[data-theme="light"]`, body bg light, `.dark-mode-toggle` 0.
- N2 Exactly two near-black bands: loop 12 routes (matrix + `/services` + `/workflow-audit`) → `.band-dark` count === 2; first `.band-dark` after hero; last `.band-dark` is the final section before `footer`.
- N3 Nav structure: desktop `.navbar-links` contains 5 destinations (Services trigger, Pricing, Instant Quote, Policy, Contact) + one `a.navbar-cta` labeled "Start a project" with `href="/instant-quote"`; `.navbar-services-menu` contains exactly Web, Mobile, SaaS, AI Automation, Workflow Audit; `.navbar-mobile-actions .language-switcher-select` visible.
- N4 Zero imagery: loop 12 routes → `document.querySelectorAll('img')` count 0 and no `background-image` with `url(` in computed body styles.
- N5 Mono numerals: computed `font-family` of `.quote-result-range` and `.pricing-amount` contains "JetBrains Mono".
- N6 Dual-mode accent: on `/`, computed color of a `.band-dark` accent element (e.g., `.band-cta a` or `.band-dark .btn-primary`) === `rgb(232, 185, 98)`; on a light section (`.section-tag`) === bronze `rgb(138, 90, 43)`.
- N7 Amharic guards: on `/policy` with `lang=am` → `h1` computed `font-family` contains "Noto Serif Ethiopic", `font-style` normal, `text-transform` none, `letter-spacing >= 0`.
- N8 Reduced motion: `page.emulateMedia({ reducedMotion: 'reduce' })` on `/` → hero `h1` visible immediately with no transition/animation on `.page-transition` (computed `transition-duration: 0s` or opacity 1).
- N9 Three-level heroes: loop 10 matrix routes → each hero contains `.page-hero-meta` (label level) + exactly 1 `h1` + 1 supporting `p`; home hero additionally has `.hero-facts`.

**Count target: 67 → 76** (2 MUTATE, 9 NEW, 0 DELETE).

## 5. Strict import map
- **Navbar.jsx:** imports UNCHANGED (`Link`, `useLocation`, `IconGlyph`, `LanguageSwitcher`, `LogoMark`, `useLanguage`). Only `PRIMARY_LINKS`/`SERVICE_LINKS` data + label keys change.
- **Footer.jsx:** imports UNCHANGED. **Home.jsx / Services.jsx / Pricing.jsx / WorkflowAudit.jsx / product pages / PolicyPage / InstantQuotePage / DiscoveryCallPage / IndustryLandingPage / NotFoundPage:** existing imports unchanged; ADD `import BandCta from '../components/BandCta';` in the 7 pages that insert it (Pricing, WorkflowAudit, InstantQuote, DiscoveryCall, IndustryLanding, NotFound; Services uses existing sections only).
- **BandCta.jsx (NEW):** imports `{ Link }` from `'react-router-dom'` and `{ useLanguage }` from `'../i18n/useLanguage'`; renders `.band-cta.band-dark.band-2` + `.cta-inner` + `.cta-actions`; CTA `to` values: `/instant-quote`, `/book-discovery-call`, `/pricing`.
- **PilotOfferSection.jsx / RoiEstimator.jsx / FaqAccordion.jsx:** optional `band` prop (string) merged into existing `className` — zero import changes, zero hook changes.
- **PageTransition.jsx:** ADD `useReducedMotion` to the existing `'framer-motion'` import. **ScrollReveal.jsx / StaggeredText.jsx:** no import changes.
- **translations.js:** VALUE-level edits only (nav label delta + `band.cta.*` keys in EN base + AM/OM override layers per merge-chain; no export/structural change). Nav keys: `nav.services` → 'Services'; `nav.policy` → 'Policy'; `nav.instantQuote` → 'Instant Quote' (AM `ፈጣን ዋጋ` / OM `Qorannoo Gatii` already exist — verify layer); NEW `nav.contact` (EN 'Contact', AM/OM native-flagged), NEW `nav.startProject` (EN 'Start a project', AM/OM native-flagged), NEW dropdown labels `nav.dropdownWeb` 'Web', `nav.dropdownMobile` 'Mobile', `nav.dropdownSaas` 'SaaS' (AM/OM native-flagged); reuse `nav.aiAutomation`, `nav.workflowAudit`, `footer.links.pricing`. **Do-not-touch:** every other string (locked copy list from phase 4 §7 applies).
- **live-site.spec.js:** imports UNCHANGED.

## 6. Verification gates
- G1 `data-theme="dark"` in `index.html` = 0; `[data-theme='dark']` in CSS = 0
- G2 `var(--accent-light|--accent-dark|--text-accent|--shadow-accent|--accent-bg|--accent-border|--bg-dark|--bg-dark-soft` = 0 (renamed map fully applied)
- G3 `Space Grotesk` anywhere = 0; Fontshare link present; `Noto Serif Ethiopic` in heading stack + font URL
- G4 `linear-gradient` in CSS ≤ 0 except grain/neutral overlays (target: 0 accent gradients); `.gradient-text` = 0
- G5 `<img` in `src/` = 0; `url(` in CSS = only the grain data-URI (no `url(/…png|jpg|svg)` assets)
- G6 `:lang(am)` block present with line-height 1.8/1.3, `letter-spacing ≥ 0`, `font-style: normal`, `text-transform: none`; Amharic digit check (no Ethiopic numerals in any price string)
- G7 hover `translateY` > 4px = 0; `backdrop-filter` ≤ 5 (whitelist); `--ease-spring` overshoot = 0; `rotateX` in motion components = 0; `100vh` ≤ 3 (fallback lines)
- G8 Hero numbers match locked table only: `rg "85,000|5 business days|40%|30%"` in hero regions — no invented figures
- G9 no equal-row service grids: `repeat(3, minmax(0, 1fr))` in service-listing contexts = 0 (pricing/quote card grids exempt)
- G10 Contrast: `--accent` #8a5a2b vs #ffffff ≥ 4.5 (5.9 ✓); `--accent-gold` #e8b962 vs #0c0c0e ≥ 4.5 (10.7 ✓); `--text-secondary`/`--text-tertiary` on light ≥ 4.5 (7.7/4.8 ✓) — document computation in spec comment
- G11 `npm run lint` + `npm run build` clean; `npx playwright test tests/live-site.spec.js` → **76/76**
- G12 Screenshot pass: `/`, `/services`, `/pricing`, `/instant-quote`, `/policy` + `/web-development` at 1440×900 and 390×844, all 3 languages — **Amharic glyph integrity at display sizes mandatory** (no clipping/collision in Noto Serif Ethiopic headlines), dark-band positions identical across pages
- G13 Re-baseline diff record present in spec header (TECH-21/NB-24) + QA-review field

## 7. Risks
1. **Amharic glyph integrity (highest):** Noto Serif Ethiopic at oversized display sizes — clipping, ligature collisions, and line-height collapse. Mitigation: `:lang(am)` line-heights (1.3 display / 1.8 body), zero negative tracking, no italic/uppercase anywhere in the chain (25+ CSS label rules need overrides), locked stack order, AM screenshot pass at both viewports; never fall back to OS Ethiopic fonts.
2. **i18n layout jumps:** AM/OM nav labels and band copy lengthen dramatically (e.g., 'Services' → አገልግሎቶች); desktop nav overflow at 768×1024 (matrix test) and band heading wrap at 390px. Mitigation: matrix test is the guard; nav uses compact labels + ellipsis-free wrapping; AM/OM values native-flagged; every band heading verified at 390×844 in AM.
3. **E2E flakiness during re-baseline:** 9 new tests + 2 mutations against motion-timed reveals (0.55s page-open), scroll-triggered band visibility, and 12-route × 4-viewport matrices; reduced-motion emulation must be deterministic. Mitigation: band/theme assertions are attribute/computed-style-based (not visibility-timing-based); `waitUntil: 'networkidle'` retained; N8 uses `emulateMedia` before goto; re-baseline red state recorded before implementation.

**Also flagged (follow-ups, out of scope):** JSON-LD nav in `index.html` (11 items) is stale against B34's 5-destination nav; `og-image.png` social asset exists (meta-only, allowed); `PricingScenarioPlanner.jsx` AI anchors hardcoding (pre-existing TECH-02 follow-up).

**File tally: MODIFY 25 · CREATE 1 · DELETE 0 · VERIFY 13. E2E delta: 67 → 76 (+9 new, 2 mutated, 0 deleted).**
