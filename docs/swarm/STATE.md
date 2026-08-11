# Swarm State — Phase 8 Lumen Night Visual System

> Maintained by @scribe / @architect. Updated after every major gate.

## Current phase

**UAT — STOPPED, awaiting human approval** (2026-08-11). All engineering gates passed on
`phase8-lumen-night` @ `1bec8ab`. Do NOT merge/deploy without explicit owner approval.

## Feature branch

`phase8-lumen-night` (single batch branch — do not create another)

## Batch scope

Full visual replacement: Phase 7 light-first → Phase 8 Lumen Night (dark canvas,
molten brass, two-register typography, apparatus heroes, receipt rate sheets,
flat nav, statement footer, calm motion). Governed by `design.md`,
`docs/behaviors/visual-system-lumen.md` (B39–B48), blueprint
`docs/plans/phase8-lumen-visual-system.md` (TECH-22 → TECH-29).
Owner direction confirmed 2026-08-11 ("yes thats premium") — recorded in
`docs/behaviors/pending-behaviors.md` header.

## Active TECH tickets

| Ticket | Title | Status |
|---|---|---|
| TECH-22 | E2E re-baseline to Lumen Night (red state 76→85) | ✅ COMMITTED `ee20a60` |
| TECH-23 | Dark canvas + token layer (NB-25/B39) | ✅ COMMITTED `7698495` |
| TECH-24 | Two-register typography + brass verbs (NB-26/NB-27) | ✅ COMMITTED `d9e193d` |
| TECH-25 | Heroes + apparatus + meter strips (NB-28/NB-30/NB-31) | ✅ COMMITTED `7158deb` |
| TECH-26 | Receipt rate sheets + ruled services (NB-29/B43) | ✅ COMMITTED `f8a1b8c` |
| TECH-27 | Flat nav + statement footer + chrome (NB-32/B46) | ✅ COMMITTED `9c9821e` |
| TECH-28 | Calm motion + reduced-motion (NB-33/B47) | ✅ COMMITTED `5b20af3` |
| TECH-29 | E2E green + full sweep + QA flip to APPROVED | 🔄 IN PROGRESS — drift fixes in working tree (noscript dark, InteractivePricing reduced-motion, `:lang(am)` case fix, modal aria) |

## Completed gates

- Gate A (Blueprint): ✅ `docs/plans/phase8-lumen-visual-system.md` (a62e76b)
- Gate B (Implement): ✅ TECH-23…TECH-28 committed; TECH-29 drift fixes + D1–D3 fixes in working tree (App.jsx route guard, FloatingCTA focus guard, ScrollReveal static prop, form-page static surfaces, spec timing hardening, noscript dark, InteractivePricing reduced-motion, `:lang(am)` case fix, modal aria)
- Gate C (QA): ✅ **QA APPROVED 2026-08-11** — 2 consecutive independent full-suite runs (85/85 each, exit 0); spec header flipped `QA-review: APPROVED`; D1–D3 verified compliant; business invariants intact; G1–G10 clean
- Gate D (Security): ✅ **SECURITY NOT REQUIRED** — rationale: the slice is visual-layer only (CSS tokens, JSX presentation, FloatingCTA route/focus guards, ScrollReveal static prop, test spec). No auth, permissions, user-data handling, payments, uploads, secrets, external inputs, dependency, or infrastructure changes. Form submission logic, lead capture, analytics, and API calls are untouched (verified by suite). No security-sensitive surface in the diff.
- Gate E (Integration): ✅ PASSED 2026-08-11 — 4 independent `npm run build` successes (webServer auto-build in fixer + 2×QA + fixer-full runs); cross-agent contracts verified (FloatingCTA guard consumed in App.jsx, `static` prop consumed in 3 pages — QA-reviewed); no migrations; integrated path covered by 85/85 ×2; no unresolved TODO/placeholder markers (grep verified — only intentional copy/attrs); working tree contains batch files + evidence only (`.opencode/` + AGENTS.md churn excluded)
- Gate F (Commit): 🔄 in progress — atomic commit below
- UAT: ⏳ STOP — architect halts before merge/deploy for human approval

## Pending verification evidence

- `npm run test:e2e` result (85-check re-baselined suite, expected GREEN after TECH-29 fixes)
- Grep gates G1–G10 per blueprint §5
- @qa acceptance sweep vs NB-25…NB-35 user criteria
- 3-language route walk (EN/AM/OM): glyph clipping, numeral identity, lowercase rendering, apparatus/meter presence

## Failed gates / retries

- **Gate C — TECH-29 suite run 2026-08-11: 78 passed / 7 failed (retry count 0)**
  1. `live-site.spec.js:554` Phase 2 wizard/pricing — same web scope quotes same numbers
  2. `live-site.spec.js:582` Phase 2 entry floor with every integration selected
  3. `live-site.spec.js:645` Phase 2 audit-first hierarchy (home/pricing/workflow-audit foreground audit)
  4. `live-site.spec.js:670` Phase 2 SaaS waitlist-only (no pricing-guide framing)
  5. `live-site.spec.js:704` N2 — no light-paper sections; brass final-CTA band closes page
  6. `live-site.spec.js:822` N6 — single molten-brass accent drives every primary CTA
  7. `live-site.spec.js:922` N1 — dark canvas + brass accent on every matrix route
  - **Known root cause (N1):** authored token is `oklch(76% 0.17 50)` (verified in `src/index.css:19`); Chrome serializes computed custom property as `oklch(76% .17 50)` (drops leading zero) → assertion compares authored string to serialized value → test fragility, not implementation defect.
  - **@fixer loop 1:** all 7 classified stale-assertion (0 genuine defects); `tests/live-site.spec.js` hardened (normalizeProse NBSP, audit-first phrase union, N2 descendant selector + effective-surface walk-up). Claimed 85/85 green — **NOT independently reproduced.**

- **Gate C — independent @qa run 2026-08-11: 82 passed / 3 failed — QA REJECTED (retry count 1)**
  - **D1 (REAL defect):** FloatingCTA (mounted globally `App.jsx:421`, `z-index:920`, bottom:1rem) + `nav.navbar.scrolled` intercept pointer events over form submit buttons at 390×844 (call logs `e2e-run.log:128-150`) — discovery booking + contact form time out.
  - **D2 (REAL defect):** reveal/transition animation instability (ScrollReveal/PageTransition) — repeated "element is not stable" retries consume 30s click budget on the same form tests.
  - **D3 (test flake):** entry-floor E2E (`spec:605`) load-sensitive — fails full-suite parallel, passes 2/2 isolated; exhaustive property test `:619` proves logic correct.
  - Gates G1–G10 ALL PASS · re-baseline hygiene PASS · acceptance sweep PASS (verbs 11/11, callouts 6/6, meters 6/6, en-dash verified) · 6/7 original failures now green.
  - **Dispatched @fixer loop 2** for D1–D3. QA re-verification requires 2 consecutive green runs before flipping `QA-review: APPROVED`.

## Unresolved risks

- Untracked `reports/phase8-screenshots/` — decide keep vs ignore at commit gate
- `.opencode/` + `AGENTS.md` working-tree churn is swarm infra, NOT batch scope — must not leak into the atomic commit
- No `docs/swarm/STATE.md` existed before this session (created now, 2026-08-11)
