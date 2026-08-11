# Swarm State — Pricing Revert, Discounts, Copy Trim & Editorial Motion

> Maintained by @scribe / @architect. Updated after every major gate.

## Current phase

**PLANNING** — intake complete, contract locked, branch created. Gate A (Blueprint) is
**PENDING** (@plan has not produced the blueprint yet). No implementation has started.

Prior batch context: Phase 8 Lumen Night is **DEPLOYED** to production (merge `cf159b1` →
`main`, Vercel deployment `dpl_7VrzQkABk3TEHAqhMEJapJ5TPKK3` READY,
https://novatech23.vercel.app — health checks 8/8). Rollback if ever needed:
`git revert -m 1 cf159b1` → push → Vercel auto-redeploys.

## Feature branch

`pricing-revert-and-motion` (single batch branch — do not create another)

## Batch scope

Owner-confirmed batch (2026-08-11, decisions in order: **B / trim / 3 / B / 1**), governed by
`docs/behaviors/pricing-revert-and-motion.md` (P-1…P-3, C-1…C-2, M-1…M-6, G-1…G-5) and tracked
as NB-36…NB-40 in `docs/behaviors/pending-behaviors.md`. **SUPERSEDES** the pricing figures in
`launch-readiness.md` B5, B6, B8, B9, B10, B11 and in `visual-system-fortune500.md` /
`visual-system-lumen.md` where they reference locked figures. ADR-001's ETB-only policy remains
in force; its *figures* are replaced (ADR amendment required — see Unresolved risks).

- **Pricing revert** — revert to owner's original March-2026-era table + trim: audit
  **15,000 ETB fixed**; AI **40k / 100k / 200k+ ETB** (support 10,000–25,000 ETB/mo); web
  **20k / 50–80k / 150k+ ETB**; mobile **40–60k / 80–150k / 200k+ ETB**; SaaS **3,500 / 5,000 /
  3,000 ETB monthly** + setup + annual "Save 2 months"; maintenance **8,000–20,000 ETB / year**
  (annual model restored); original add-ons restored.
- **Discount program** — web starter "3 months free maintenance"; mobile "3-month bug-fix
  warranty"; SaaS annual "Save 2 months"; audit "100% credited"; Web+AI bundle "10% off when
  booked together" (shown once). **REMOVE** founding-client 15–20% pilot messaging everywhere.
- **Copy trim (site-wide)** — Home + Pricing ≥ 35% word cut; repeat-kill elsewhere; EN/AM/OM
  parity (trimmed copy mirrored, no orphaned long strings); contact/legal copy exempt.
- **Editorial motion (restrained)** — hero choreography ≤ 1.2 s, single reveal, no loop;
  scroll reveals lift+fade, fire once; hover micro-interactions ≤ 4 px lift (focus-visible
  parity); animated price counters landing exactly on locked figures; one marquee ≤ 20 px/s per
  page; 200–300 ms page transitions (~250 ms); reduced-motion fully static; no layout shift.

Sequencing (owner, 2026-08-11): NB-36…NB-40 execute **AFTER** Phase 8 Lumen Night lands
(Phase 8 is already deployed; if it shipped stale figures, NB-36 re-baselines them). Phase 8
ticket work should read figures from `pricing-revert-and-motion.md` §1.

## Active TECH tickets

| Ticket | Title | Status |
|---|---|---|
| TECH-30 | TBD — pricing table swap + wizard anchors + PDF (slice 1) | PENDING — awaiting blueprint gate |
| TECH-31 | TBD — discount program + pilot removal (slice 2) | PENDING — awaiting blueprint gate |
| TECH-32 | TBD — copy trim + i18n (slice 3) | PENDING — awaiting blueprint gate |
| TECH-33 | TBD — editorial motion system (slice 4) | PENDING — awaiting blueprint gate |
| TECH-34 | TBD — page transitions (slice 5) | PENDING — awaiting blueprint gate |

Titles are TBD placeholders pending @plan's blueprint. Do not treat slices or titles as
locked until Gate A produces `docs/plans/` artifacts.

## Completed gates

- Intake: ✅ complete
- Contract locked: ✅ owner confirmed 2026-08-11 — **B / trim / 3 / B / 1** (Scenario B keep
  Audit+AI reprice; trim audit 15k + AI 40k/100k/200k+; discounts Option 3 + Web+AI bundle;
  copy trim Option B site-wide; editorial motion Option 1 restrained). Recorded in
  `docs/behaviors/pricing-revert-and-motion.md` header + `docs/behaviors/pending-behaviors.md`
  header (incl. sequencing note).
- Branch: ✅ `pricing-revert-and-motion` created
- Gate A (Blueprint): 🔄 PENDING — @plan
- Gate B (Implement): ⏳ PENDING
- Gate C (QA): ⏳ PENDING
- Gate D (Security): ⏳ PENDING
- Gate E (Integration): ⏳ PENDING
- Gate F (Commit): ⏳ PENDING
- UAT: ⏳ PENDING — human approval required before merge/deploy

## Pending verification evidence

Acceptance gate per `docs/behaviors/pricing-revert-and-motion.md` §5:
1. **Grep gate** — no "85,000", "250,000 / 750,000 / 1,500,000", "from 45,000 ETB",
   "from 200,000 ETB", "founding-client", "15–20%", "Waitlist only",
   "5,000 to 15,000 ETB / month" anywhere in rendered content.
2. **Figure gate** — every rendered price on every page matches the P-1 table.
3. **Wizard parity** — instant quote bands match P-1 anchors (web [20000..80000],
   mobile [40000..150000], AI [40000..200000+]); no band below 15,000.
4. **Copy gate** — Home + Pricing ≥ 35% word reduction (rendered text); no repeated
   message > 2× per page.
5. **Motion gate** — hero choreography ≤ 1.2 s; scroll reveals fire once; hover lift ≤ 4 px;
   exactly one marquee per page; reduced-motion build shows zero animation; no layout shift.
6. **i18n gate** — Amharic + Afaan Oromo mirrors of trimmed copy render without clipping;
   prices render identically across languages.
7. **E2E** — existing Playwright suite passes with re-baselined selectors.

## Failed gates / retries

- None this batch. Retry counters all at 0.

## Unresolved risks

- (a) **ADR contradiction** — ADR-001's figures are superseded by the locked table; an ADR
  amendment (ADR-003 or amendment to ADR-001) is required so docs and code do not contradict.
- (b) **Remote pricing endpoint** — `VITE_PRICING_DATA_ENDPOINT` could serve stale figures;
  must be updated or removed (contract P-1 marks a stale endpoint a release blocker).
- (c) **PDF pricing guide** — needs regeneration + human diff (NB-12 / owner action OA-7).
- (d) **E2E re-baseline** — existing Playwright suite asserts old figures; must be
  re-baselined with @qa before the E2E gate can pass.
- (e) **i18n parity** — trimmed English copy must be mirrored in AM/OM (re-cut, no orphaned
  long strings, no clipping).
