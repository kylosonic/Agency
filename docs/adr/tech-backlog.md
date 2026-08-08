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
