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

## Phase 5 — Ops & Launch Config (P1)

### TECH-08 — Lead delivery verification
- **Maps to:** NB-10 (B18–B19)
- **Scope:** Verify lead intake + mailing-list flows store and forward to a working inbox; verify discovery-call booking flow; confirm fallback behavior; align SLA copy (1-day response / 3-day discovery / 5-day proposal)
- **Acceptance:** A test submission through each form is stored, forwarded, and confirmed; no silent loss path remains.

### TECH-09 — Contact & launch configuration hardening
- **Maps to:** NB-13, NB-14 (ops)
- **Scope:** Domain email decision + swap in siteConfig/env; confirm canonical domain, robots.txt, sitemap.xml, SiteSpeak bot ID, analytics endpoint/GA4, webhook targets
- **Acceptance:** All production env values verified on the real domain; no personal Gmail remains as primary contact.

### TECH-10 — Pricing guide PDF sync
- **Maps to:** NB-12
- **Scope:** Human diff PDF vs new ETB table; regenerate PDF if divergent (out of repo — flag to owner)
- **Acceptance:** PDF matches the site table exactly, or a regeneration task is queued to the owner.

## Phase 6 — Post-Launch (P2)

### TECH-11 — Real internal lead-pipeline demo system
- **Maps to:** NB-11 remainder (B3)
- **Scope:** Build a real internal system (lead triage/follow-up automation on the business's own pipeline); record a real run; publish as the demo/case-study replacement
- **Acceptance:** The demo shown to visitors is a real running system with real data.

### TECH-12 — Marketing launch kit rewrite
- **Maps to:** NB-17
- **Scope:** Rewrite `docs/marketing-launch-kit.md` to contract-first, published-prices, payment-reliability positioning; remove fabricated proof references; add pilot program
- **Acceptance:** Launch kit contains no claim the site cannot prove.

### TECH-13 — QA checklist completion
- **Maps to:** NB-16
- **Scope:** Complete manual route walkthroughs, accessibility checks, analytics spot-checks
- **Acceptance:** `docs/qa-checklist.md` fully checked.

## Deferred

### TECH-14 — Post-license payment rails (BLOCKED on business license)
- **Maps to:** NB-15 (B25)
- **Scope:** Telebirr merchant + Chapa integration, tax/invoice reflection, USD rail evaluation
- **Acceptance:** Enabled only after license is secured; site then reflects real capabilities.
