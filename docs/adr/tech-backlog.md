# Tech Backlog — Launch Readiness Sprint

> Technical execution tickets derived from `docs/behaviors/pending-behaviors.md` (NB-XX) and
> governed by `docs/behaviors/launch-readiness.md` (B-rules) and `docs/adr/ADR-001-pricing-model-etb-only.md`.
> Priority: **P0** = launch blocker · **P1** = must before launch · **P2** = after launch · **BLOCKED** = waiting on external dependency.

## ✅ DONE — Phase 1 — Proof Strip + Pricing Engine Swap + Policy Rewrite (P0)

> TECH-01, TECH-02, TECH-03 resolved in commit `adc2302` (QA APPROVED, 58/58 E2E, lint + build clean).
> NB-01, NB-02, NB-03, NB-04, NB-07 marked [IMPLEMENTED] in the behavior ledger.

## ✅ DONE — Phase 2 — Conversion Consistency (P0)

> TECH-04, TECH-05 resolved in commit `191d8e3` (QA APPROVED, 67/67 E2E incl. exhaustive floor property, lint + build clean).
> NB-05, NB-06 marked [IMPLEMENTED] in the behavior ledger.
> Follow-up logged: `PricingScenarioPlanner.jsx` still hardcodes AI anchors (currently match locked table) — derive from `pricingData` in a later cleanup ticket.

## ✅ DONE — Phase 3 — Design Redesign (P1)

> TECH-06 resolved in commit `a2d7d1a` (QA APPROVED, 67/67 E2E with byte-identical spec, lint + build clean, 31 screenshots).
> NB-08 marked [IMPLEMENTED] in the behavior ledger.

## ✅ DONE — Phase 4 — Copy Humanization (P1)

> TECH-07 resolved in commit `963ba8c` (QA APPROVED, 67/67 E2E with byte-identical spec, lint + build clean).
> NOTE: NB-09 remains OPEN in the behavior ledger until the owner records the native Amharic + Afaan Oromo review gate.

## ✅ DONE — Phase 5 — Ops & Launch Config (P1)

> TECH-08, TECH-09, TECH-10 resolved in commit `660ac49` (QA APPROVED, 67/67 E2E byte-identical spec, 21/21 handler-harness checks).
> Code shipped; NB-10/12/13/14 remain OPEN in the behavior ledger pending owner actions OA-1…OA-9 (domain email, GA4 ID, webhooks, SiteSpeak ID, PDF human-diff, deployment runtime).
> Owner action log: see `docs/plans/phase5-ops-launch-config.md` §5 (OA-1…OA-9 with deadlines).

## ✅ DONE — Phase 6 — Post-Launch Docs (P2)

> TECH-12, TECH-13 resolved in commit `57847de` (QA APPROVED).
> NB-17 marked [IMPLEMENTED]; NB-16 code-side complete, owner-executed items remain open pre-launch.
> TECH-11 (real internal demo system) — DEFERRED to its own dedicated sprint (product build, not a site change). NB-11 remains OPEN until then.

## Deferred

### TECH-14 — Post-license payment rails (BLOCKED on business license)
- **Maps to:** NB-15 (B25)
- **Scope:** Telebirr merchant + Chapa integration, tax/invoice reflection, USD rail evaluation
- **Acceptance:** Enabled only after license is secured; site then reflects real capabilities.

## ✅ DONE — Phase 7 — Fortune-500 Visual System (P1)

> TECH-21, TECH-15, TECH-16, TECH-17, TECH-18, TECH-19, TECH-20 resolved in commits
> `3e39452` (E2E re-baseline 67→76, red state recorded) · `76b41b8` (light-first base + dual dark
> bands) · `8b38348` (typography system + Ethiopic display) · `7d0a67e` (type-led heroes) ·
> `e3caffe` (services editorial index) · `f588973` (5-destination nav + lean footer) ·
> `4abf0d8` (calm motion + reduced-motion). QA APPROVED per ticket (orchestrator-level audits).
> Final gate: 76/76 fresh E2E, lint + build clean, G1–G13 all pass, 36 trilingual screenshots
> captured (`reports/phase7-screenshots/`), 0/12 Amharic glyph issues. NB-18–NB-24 marked
> [IMPLEMENTED] in the behavior ledger.
> Follow-up logged (P2): `InteractivePricing.jsx` one-shot entrance lacks an explicit
> `useReducedMotion` branch — residual reduced-motion gap (QA note, TECH-20).
> Pre-existing flags (out of scope, still open): JSON-LD nav in `index.html` (11 items) is stale
> against B34's 5-destination nav; `amFinalOverrides.nav.bookCall` carries an EN value (NB-09
> native-review list); `PricingScenarioPlanner.jsx` AI anchors hardcoding (TECH-02 follow-up).

### TECH-15 — Light-first base + dual dark bands (NB-18 / B26–B28)
- **Scope:** Global light-first token system across all 11 pages and 3 languages; exactly two
  near-black bands per page in fixed positions (after services index; pre-footer CTA band);
  dual-mode accent (bronze on light with AA contrast, gold on dark bands); remove dark-default
  surfaces; ban accent gradients project-wide.
- **Acceptance:** NB-18 criteria met — every page light-first, two dark bands in identical
  positions, accent text passes AA on light and dark, zero accent gradients.
- **Status:** ✅ DONE — commit `76b41b8` (20 files), QA APPROVED (D1–D4 accepted).

### TECH-16 — Typography system (NB-19 / B29–B31)
- **Scope:** Font family swap (display grotesque, body, mono; Ethiopic serif display + sans body)
  incl. font loading; `:lang(am)` rules (line-height ~1.8 body / ~1.3 display, no negative
  tracking, no italics, no uppercase, Latin-first stacks, Latin digits); three-level headline
  structure.
- **Acceptance:** NB-19 criteria met — families render per spec in EN/AM/OM, Amharic glyph
  integrity at all sizes, numbers identical across languages, three-level headline blocks only.
- **Status:** ✅ DONE — commit `8b38348` (2 files), QA APPROVED (D1 letter-spacing quirk, D2
  addon-price accepted).

### TECH-17 — Type-led heroes (NB-20 / B32)
- **Scope:** Hero restructure on every page: three levels, one-side alignment, oversized display
  type; remove mockups/panels/illustrations; real-facts mono strip using locked published figures
  only.
- **Acceptance:** NB-20 criteria met — no mockup/illustration on any hero, hero numbers match the
  locked table.
- **Status:** ✅ DONE — commit `7d0a67e` (6 files), QA APPROVED (i18n precedent accepted).

### TECH-18 — Services editorial index (NB-21 / B33)
- **Scope:** Convert service listings to ruled rows with monospaced numerals; remove equal-card
  rows; restrict bordered boxes to genuinely earned boundaries.
- **Acceptance:** NB-21 criteria met — no equal-box rows for services anywhere; rules + mono
  numerals carry listings.
- **Status:** ✅ DONE — commit `e3caffe` (1 file, CSS-only), QA APPROVED (services-grid@≤1080
  fallback ruled EXEMPT by @architect).

### TECH-19 — Nav + footer restructure (NB-22 / B34–B35)
- **Scope:** 5-destination header + single Services dropdown (Web, Mobile, SaaS, AI Automation,
  Workflow Audit) + one prominent action to Instant Quote + always-visible language switcher;
  soft blur on scroll; lean 4-column footer + legal bar.
- **Acceptance:** NB-22 criteria met — header hierarchy identical on every page, action leads to
  Instant Quote, footer structure per spec.
- **Status:** ✅ DONE — commit `f588973` (4 files), QA APPROVED (D1 production blur fix
  accepted; dist-level blur verified at Phase 8 gate).

### TECH-20 — Material & motion pass (NB-23 / B36–B37)
- **Scope:** Zero-imagery enforcement (no photo/illustration/generated anywhere); paper grain;
  one orchestrated page-open reveal; section fade-and-rise; hover = color/lift only; reduced
  motion renders static.
- **Acceptance:** NB-23 criteria met — zero imagery in source, motion restrained, reduced-motion
  path static.
- **Status:** ✅ DONE — commit `4abf0d8` (4 files), QA APPROVED (InteractivePricing
  reduced-motion gap logged as P2 follow-up).

### TECH-21 — E2E re-baseline (NB-24 / B38)
- **Scope:** Deliberate rewrite of the automated visitor checks: dark-only expectations →
  light-first expectations; written diff recorded; QA-reviewed; full suite green with the new
  spec before merge.
- **Acceptance:** NB-24 criteria met — re-baseline diff documented and reviewed, all checks pass.
- **Status:** Spec re-baseline committed `3e39452` (67→76: 2 MUTATE, 9 NEW, 0 DELETE); red state
  recorded (8 failures, all attributable to new contract); orchestrator-level @qa APPROVED.
  NB-24 remains OPEN — final green pending Phase 8 gate (QA-review field in spec header flips on
  final sign-off per G13).
