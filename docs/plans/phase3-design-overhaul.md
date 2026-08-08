# Phase 3 Blueprint — Design System Overhaul (TECH-06 / B20–B22 / NB-08)

**Date:** 2026-08-07 · **Author:** @plan · **Governed by:** launch-readiness B20–B22, pending-behaviors NB-08, tech-backlog TECH-06, mandatory skill `design-taste-frontend` (baseline 8/6/4), Phase 2 blueprint (commit `191d8e3`)
**Arbitrated by @architect:** decisions 1–5 ACCEPTED (dark zinc base; ochre accent; zero-rename CSS strategy; font additions; centered subpage heroes kept).

## Goal
Replace the dark-navy/blue/teal "AI template" visual system (glass-everywhere, 3-equal-card rows, gradient CTAs) with a zinc-neutral base + ONE desaturated ochre accent, bordered/elevated surfaces, asymmetric grids, and solid-state CTAs — across all 11 routes, all 3 languages, all 4 E2E viewports, with the 67-test suite untouched and green.

## Locked decisions
1. **Base: DARK zinc (keep dark-only).** E2E suite hard-asserts `html[data-theme="dark"]` and `.dark-mode-toggle` count 0. Zinc (pure gray, zero blue undertone) removes the "AI navy" cast.
2. **ONE accent: desaturated ochre/gold `hsl(38, 61%, 56%)` ≈ `#d4a24c`.** Ethiopian identity (coffee-gold + flag yellow); maximum distance from banned blue/teal; saturation 61% < 80%; ~7.5:1 contrast on zinc-950; dark-text-on-ochre buttons pass AA. All old `--green*`/`--blue*` roles collapse onto this one family.
3. **Zero-JSX-rename strategy:** repurpose `.glass-card`/`.glass-strong`/`.glass` as bordered/elevated/plain tinted surface classes (blur is what's banned — class names don't render). Grid variance via CSS `:nth-child` spans, not markup edits. Result: NO E2E hook changes, no spec edits, near-zero JSX churn.
4. **Typography:** keep Space Grotesk / Manrope / JetBrains Mono (numbers + `tabular-nums`). JetBrains Mono is referenced but NEVER loaded (falls back to Consolas) — add to Google Fonts link.
5. **Ethiopic rendering:** neither Manrope nor Space Grotesk has Ethiopic glyphs; Amharic currently renders via uncontrolled OS fallback. Add `Noto Sans Ethiopic` to the Google Fonts link and both font stacks BEFORE the generic `sans-serif` fallback.

---

## 1. Change surface

### MODIFY (8 files)
| File | What changes |
|---|---|
| `src/index.css` | Token block, glass system → surface system, gradients → solid, grids → asymmetric, `100vh` → `100dvh`, dead-CSS deletion, accent retint (~60 selectors), mono numbers |
| `index.html` | Google Fonts URL gains JetBrains Mono + Noto Sans Ethiopic; `theme-color` `#070f1e` → `#09090b` |
| `src/components/PageTransition.jsx` | REMOVE `filter: blur()` from initial/animate/exit (motion violation) |
| `src/components/ScrollReveal.jsx` | Spring retune to `stiffness: 100, damping: 20`; keep transform+opacity |
| `src/components/LeadCaptureModal.jsx` | VERIFY-only (restyled via CSS) |
| `src/components/InteractivePricing.jsx` | VERIFY-only (grid variance in CSS) |
| `src/components/PilotOfferSection.jsx` | NO markup change — styling via `.pilot-offer-card` CSS overrides |
| `tests/live-site.spec.js` | **NO CHANGES — byte-identical. 67/67 must pass untouched.** |

### DELETE (CSS blocks inside `src/index.css` — dead markup confirmed)
`.hero-stats`/`.hero-stat*`, `.ai-hero-stats/.ai-hero-stat`, `.ai-agent-*`, `.ai-impact-*`, `.about-*`, `.testimonials-*`, `.portfolio-*` + `.portfolio-library-*`, `.case-study-*`, `.process-grid/.process-step`, `.testimonial-avatar` gradient, the mega `:is(...)` glass block (~lines 2673–2735).

### CREATE (0 files) — CSS-only overhaul with repurposed class names.

---

## 2. Token layer

**Neutral base (zinc family):**
- `--bg-primary: #09090b` (zinc-950) · `--bg-secondary: #111113` · `--bg-tertiary: #1c1c1f` · `--surface-1: #131316` · `--surface-2: #1c1c1f` · `--bg-dark: #070707` (never `#000`) · `--bg-dark-soft: #0a0a0c`
- `--border-subtle: #26262a` (zinc-800) · `--border-strong: #3f3f46` (zinc-700) · `--border-faint: rgba(244, 244, 245, 0.08)`

**ONE accent family (ochre):**
- `--accent: #d4a24c` · `--accent-light: #e2b46a` · `--accent-dark: #a87e33` · `--accent-bg: rgba(212, 162, 76, 0.14)` · `--accent-border: rgba(212, 162, 76, 0.32)` · `--text-accent: #e0b469` · `--shadow-accent: 0 14px 34px rgba(212, 162, 76, 0.20)`

**Text (zinc):** `--text-primary: #f4f4f5` · `--text-secondary: #a1a1aa` · `--text-tertiary: #71717a` · `--text-inverse: #09090b` · `--text-on-dark: #f4f4f5`
**Functional:** error `#ef4444`/`#fca5a5` unchanged. Shadows: all `rgba(2,6,23,…)` → `rgba(0,0,0,…)`.
**Radial ambience:** `--page-noise` loses blue/teal radials → two zinc glows + one ochre whisper ≤5% opacity; grid overlay 0.08 → 0.05.

**Old → new map (longest-match-first order MANDATORY):**
- `--green-light/--green-dark/--green-bg/--green-border/--green` → `--accent-light/--accent-dark/--accent-bg/--accent-border/--accent`
- `--blue-*` (5) → same five `--accent*` targets · `--text-green` → `--text-accent` · `--shadow-green` → `--shadow-accent`
- `--glass-bg/--glass-bg-hover/--glass-bg-strong/--glass-bg-card/--glass-bg-dark` → `--surface-1/--surface-2/--bg-secondary/--surface-1/--bg-dark`
- `--glass-border/--glass-border-hover` → `--border-subtle/--border-strong` · `--glass-blur/--glass-blur-strong` → DELETED
- `--bg-card/--bg-card-hover` → `--surface-1/--surface-2`
- Literal hex to replace project-wide: `#1d4f96, #146068, #133463, #11515b, #19457f, #0f4f57` (gradient stops → solid accent-dark surface), `#60a5fa/#3b82f6/#93c5fd`, `#2dd4bf/#5eead4/#14b8a6` → accent, `rgba(96,165,250,…)`/`rgba(45,212,191,…)`/`rgba(59,130,246,…)`/`rgba(37,99,235,…)` → accent equivalents, `rgba(224,231,255,…)` (indigo glass borders) → `rgba(244,244,245,0.08–0.2)`, `#e5eefc/#c1d0e8/#8fa5c6/#091220` → zinc text tokens, `rgba(22,34,56,0.75)` form bg → `--surface-1`, `rgba(7,13,28,0.42)` modal backdrop → `rgba(9,9,11,0.72)`.

**Font stacks:**
- `--font-heading: 'Space Grotesk', 'Noto Sans Ethiopic', 'Kefa', 'Segoe UI', 'Ebrima', sans-serif`
- `--font-body: 'Manrope', 'Noto Sans Ethiopic', 'Kefa', 'Segoe UI', 'Ebrima', sans-serif`
- `index.html` font URL gains `JetBrains+Mono:wght@400;500;600;700` and `Noto+Sans+Ethiopic:wght@400;500;600;700`, `display=swap` retained.

---

## 3. Surface strategy (B21)

**Three tiers:**
1. **Bordered surface** (default): near-opaque `--surface-1` + 1px `--border-subtle` + radius, no blur, no shadow → what `.glass-card` becomes.
2. **Elevated surface**: bordered + `--shadow-md` + `--border-strong` → `.glass-strong`. Only where hierarchy demands.
3. **Refraction surface** (rare, legitimate glass): 1px `--border-faint` + `inset 0 1px 0 rgba(255,255,255,0.08)`, NO `backdrop-filter` outside the overlay whitelist.
4. **Rules & negative space** replace boxes: `divide-y`/`border-t`/`border-l` lists.

**Per-usage:**
- **ELEVATED (7):** `.hero-panel` (via `.ai-hero-panel` solid zinc + `--border-strong` + `--shadow-md`), `.ai-pricing-audit-card` (accent border-left rule + shadow), `.ai-audit-card.glass-strong`, `.ai-home-cta-inner`, `.pilot-offer-card` (accent border-top 2px, shadow), `.automation-use-case-panel`, `.ai-supporting-service-card`
- **BORDERED SURFACE (23):** `.ai-preview-card`, `.ai-pricing-tier-card`, `.ai-interface-pricing-card`, `.ai-audit-card.glass-card`, `.contact-form-card`, `.quote-wizard-card` + `.quote-result-card`, `.discovery-card`, `.industry-card`, `.industry-not-found`, `.not-found-card`, `.error-boundary-card`, `.pricing-scenario-planner`, `.ai-service-objective-board`, `.ai-service-card`, `.micro-proof-card`, `.roi-card`, `.faq-item`, `.saas-card`/`.pricing-card`, `.addon-card`, `.saas-price-item`
- **RULES INSTEAD OF BOXES (6):** `.contact-info-card` (divide-y column; class + mailto kept), `.hero-features/.hero-feature-card` (divided list inside panel), `.ai-data-layer-item` (divide-y rows), `.pilot-offer-list` (divide-y rows), `.ai-interface-disclaimer` (`border-left: 2px solid --accent` callout)
- **LEGIT REFRACTION/OVERLAY (keep blur — floating layers):** `.navbar-inner`, `.navbar-services-menu`, `.mobile-nav` (+ `.mobile-nav-backdrop`), `.modal-backdrop-blur`, `.modal-slide-panel`. Total `backdrop-filter`: 8 → ≤5.
- **DELETE (dead):** the `:is()` mega-block, `.micro-proof-card` blur, `.portfolio-coming-soon`, `.section-scrollbar` (verify dead before deleting).

---

## 4. Grid variance — all spans via CSS `:nth-child`, zero markup edits

| Grid | New desktop structure | Mobile (≤768px) |
|---|---|---|
| `ai-preview-grid` #1 (Home AI solutions) | 12-col: card1 `span 6`, cards 2–3 `span 3` | all `span 12` |
| `ai-preview-grid` #2 (Home product tracks) | `span 5 / 4 / 3` declining emphasis | span 12 |
| `methodology-timeline` (Home) | 1-col vertical rule timeline: `border-left` + ochre dot markers + mono step numbers, no boxes | inherent 1-col |
| `ai-pricing-tier-grid` | `span 4 / 5 / 3` (750k middle emphasized + elevated) | existing cascade + span reset |
| `ai-interface-pricing-grid` (×3) | web `3/3/2`, mobile `2/2`; Support card `span 7`, add-ons `span 5` | span 12 |
| `pricing-grid` (InteractivePricing) | recommended `span 5`, others `span 4 / 3` | span 12 |
| `saas-pricing-row` | `1.25fr 1fr 1fr` | 1fr |
| `micro-proof-grid` | `1.3fr 1fr 1fr` | 1fr |
| `milestone-grid` | `2fr 1fr 1fr` (40% kickoff emphasized) | 1fr |
| `services-grid` (×2) | `1.4fr 1fr 1fr` | 1fr |
| `ai-data-layer-list` | `repeat(2, 1fr)` | 1fr |
| `ai-supporting-track-grid` | `repeat(2, 1fr)` | 1fr |
| `automation-use-case-grid` | `1.15fr 0.85fr` two-up + third card full-width | 1fr |

**KEEP (already compliant):** `hero-shell` (1.08/0.92), `contact-grid`, `ai-audit-grid`, `discovery-grid`, `roi-grid`, `industry-grid`, `ai-service-grid`, `searchable-brain-shell`, `footer-grid` (footer, not feature row), `quote-option-grid`, `quote-two-column`, `saas-card-header`.
**E2E stability:** every new span reset must be added to the existing 820px/860px media blocks so `scrollWidth ≤ innerWidth + 1` holds at 390/375/414/768.

---

## 5. CTA restyle

- `.btn-primary`: solid `--accent` bg, dark text `--text-inverse`, `--shadow-accent`, transparent 1px border. Hover: `--accent-light` + inset highlight + `translateY(-2px)`. Active: `translateY(-1px) scale(0.98)`.
- `.btn-secondary`: solid `--surface-1` + `--border-subtle`; hover `--surface-2` + `--border-strong`; active `scale(0.98)`. `.btn-dark`: zinc-800 treatment.
- **Delete every gradient override:** `.btn-primary` base, `.cta-inner .btn-primary`, `.brand-mark`, `.pricing-badge`, `.pricing-tab-active-bg`, `.ai-pricing-toggle button.active`, `.quote-step-dot.active`, `.saas-price-item-highlight`, `.addon-card-featured`, `.pricing-card.recommended`, `.floating-cta-btn`, `.live-chat-toggle`, `.testimonial-avatar` (dead), `.ai-agent-progress-track span` (dead). Featured/recommended variants become solid accent-dark tinted surfaces (`--accent-dark` bg or `--accent-bg` wash + `--accent-border`) — never gradients.
- `.floating-cta-btn`: solid accent pill + `--shadow-accent`, active `scale(0.98)`.
- E2E clicks `.btn.btn-primary` / `.btn.btn-secondary.btn-lg` by class — names unchanged.

---

## 6. Motion audit

| Component | Status | Action |
|---|---|---|
| `ScrollReveal.jsx` | transform (y) + opacity only; spring | Retune `stiffness: 100, damping: 20`; keep reduced-motion branch |
| `PageTransition.jsx` | ✗ VIOLATION: animates `filter: blur(4px→0)` | Remove filter — opacity + y only |
| `LeadCaptureModal.jsx` | x-transform slide + spring; no filter | Keep |
| `FloatingCTA.jsx` | y/x transform + opacity; spring | Keep |
| `MagneticButton.jsx` | `useMotionValue` + `useSpring` on x/y; no `useState` motion loop | Keep |
| `.mobile-menu-toggle span` | ✗ animates `width` | Middle line via `scaleX(0.2)` transform only |
| `100vh` audit | `.page-transition`, `body`, `.modal-slide-panel`, `.mobile-nav` | `min-height: 100dvh` (with `100vh` fallback line first) / `height: 100dvh` for modal |

---

## 7. E2E impact map (mandatory — spec is byte-identical)

**KEEP (restyle only):** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-lg`, `.btn-sm`, `.mobile-menu-toggle`, `.mobile-nav.open`, `.navbar-links`, `.navbar-mobile-actions .language-switcher-select`, `.services-table-wrapper`, `.services-table`, `.quote-step`, `.quote-option`, `.quote-wizard-card`, `.quote-result-card`, `.quote-result-range`, `.discovery-slot`, `#booking-*`, `#contact-*`, `.hero-copy`, `.hero-panel`, `.hero-trust-row`, `.not-found-card`, `.cta-section`, `.cta-actions`, `.modal-slide-panel`, `.modal-success-state`, `#lead-*`, `.contact-info-card`, `.footer-links`, `[data-testid="pilot-offer"]`.
**Text assertions:** untouched copy (ETB strings, "Coming soon" ×6, "quoted individually", "bank transfer", "CBE Birr", "tell us you want it", "40%"/"30%" ×2, "Full Ownership Guarantee", "5 business days", "credited toward", localized titles).
**Absence assertions:** `.hero-stats` 0 (CSS deleted — still 0), `#agent-demo`/`#impact-calculator` 0, `.dark-mode-toggle` 0, no `/case-studies`/`/portfolio` hrefs, sitemap content.
**RENAME: NONE. REPLACE: NONE.**

## 8. Strict import map
JSX/JS: NO import statements change. Only: (1) `index.html` font link URL gains two families; (2) CSS custom-property re-points per §2 ordered map; (3) new CSS-only constructs inside `src/index.css`.

---

## 9. Step-by-step execution (atomic order)

1. `index.html` — fonts URL + `theme-color`.
2. `src/index.css` token block — rewrite `:root`, collapse `[data-theme=dark]` to minimal alias, run ordered token rename (longest-match-first), grep gate `var(--blue|--green|--glass` = 0.
3. Surface system — delete `:is()` mega-block; re-skin `.glass*` tiers; per-usage enumeration; `backdrop-filter` ≤ 5 (overlay whitelist).
4. Grid variance — all §4 transforms via `:nth-child`; span resets in ≤820px/≤860px blocks; delete dead grid CSS.
5. CTA restyle — §5 re-skin + delete every gradient override; retint remaining accent touches (badges, tags, icons, checkmarks, focus rings, input focus, accent-color, hover rows) to ochre.
6. Numbers & type — `--font-mono` + `tabular-nums` on: `.pricing-amount`, `.ai-pricing-values strong`, `.price-cell`, `.milestone-card .percentage`, `.quote-result-range`, `.saas-price-item .value`, `.addon-card .price`. Font stacks + Ethiopic fallbacks.
7. Motion fixes — PageTransition filter removal; ScrollReveal spring tune; menu-toggle transform; `100vh`→`100dvh` sweep.
8. `PilotOfferSection` styling — `.pilot-offer-card` elevated + accent top rule + divide-y list + mono kicker/fine-print.
9. Verify — full gate suite (§10), `npm run lint`, `npm run build`, `npx playwright test tests/live-site.spec.js` — all 67 green with the UNTOUCHED spec.
10. Centered subpage `.page-hero` content KEPT (arbitrated).

## 10. Verification gates
- `backdrop-filter` in `src/` ≤ 5, all in overlay whitelist
- `linear-gradient` with `var(--blue|--green|#1d4f96|#146068|#60a5fa|#2dd4bf` = 0
- `repeat(3, minmax(0, 1fr))` in live sections = 0
- `var(--blue|--green|--glass` = 0; `#070f1e|#0f1b30|#15233d|#050b17` = 0
- `h-screen` = 0; `100vh` ≤ 3 (fallback lines only); `#000000` = 0
- Playwright screenshot pass: `/`, `/pricing`, `/services`, `/instant-quote`, `/policy` at 1440×900 + 390×844, all 3 languages (Amharic glyph check mandatory)
- E2E: 67/67, spec untouched · Lint + build clean

## 11. Risks
1. **Amharic glyph regression (highest):** add Noto Sans Ethiopic via webfont + stacks; verify via Amharic E2E + screenshots. Don't drop fallback chain.
2. **Token rename order:** longest-match-first mandatory (`--green-border` before `--green`); grep gate.
3. **E2E fragility:** zero-rename strategy; any accidental class change in PageTransition/ScrollReveal must be avoided (they touch no hooks).
4. **Mobile overflow:** every new span needs its media-query reset.
5. **i18n rendering:** zero translation strings touched; don't "helpfully" reformat copy.
6. **Dark-only contract:** no light theme, no `.dark-mode-toggle`.
7. **Out of scope:** JSON-LD stale entries in `index.html` (flag to TECH-09), `noscript` inline styles, `print` stylesheet.

**Blueprint status:** complete and arbitrated. Ready for @build execution.
