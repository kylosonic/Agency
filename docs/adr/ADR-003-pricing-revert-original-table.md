# ADR-003: Pricing Revert to Original March-2026 Table

**Status:** Accepted (owner-confirmed 2026-08-11)
**Date:** 2026-08-11
**Decision makers:** Business owner, @architect
**Source of truth:** `docs/behaviors/pricing-revert-and-motion.md` §1
**Supersedes:** the pricing figures in ADR-001 Decision item 3 (all other ADR-001 decisions remain in force)

## Context

ADR-001 locked an ETB-only pricing table with inflated figures: audit 85,000 ETB; web 45k / 150k / 250k; mobile 200k / 400k; AI 250k / 750k / 1.5M+; maintenance 5–15k ETB/month; SaaS shown as waitlist only. The owner reviewed the inflation evidence against the original March-2026 table and determined these prices sit far above the market ("way way above market"). The owner directed a revert to the original pricing first provided in March 2026, with the Workflow Audit and AI products kept but repriced to original-era levels (Scenario B), confirmed 2026-08-11.

## Decision

1. **Figures superseded.** The pricing figures in ADR-001 Decision item 3 are SUPERSEDED by the table in `docs/behaviors/pricing-revert-and-motion.md` §1:
   - Workflow Audit: **15,000 ETB fixed** (delivered in 5 business days; 100% credited toward any following implementation).
   - Web: **from 20,000 ETB** / **50,000 – 80,000 ETB** / **150,000+ ETB**.
   - Mobile: **40,000 – 60,000 ETB** / **80,000 – 150,000 ETB** / **200,000+ ETB** (3rd tier restored).
   - AI: **from 40,000 ETB** / **from 100,000 ETB** / **from 200,000+ ETB**, monthly support **10,000 – 25,000 ETB / month**.
   - SaaS becomes a live priced offer: School 25,000 ETB setup + **3,500 ETB / month** (annual 35,000 ETB); Clinic/Hospital 35,000 ETB setup + **5,000 ETB / month** (annual 50,000 ETB); Real Estate 20,000 ETB setup + **3,000 ETB / month** (annual 30,000 ETB); annual billing shows "Save 2 months".
   - Web Maintenance: **8,000 – 20,000 ETB / year** (annual model restored; written commitment).
   - Original add-ons restored: Domain & Cloud Hosting 1,500 – 5,000 ETB / year; Cloud Web Hosting 5,000 – 15,000 ETB / year; Logo & Visual Identity 5,000 – 15,000 ETB; Copywriting 3,000 – 10,000 ETB / project; Commercial Photography 5,000 – 20,000 ETB / session.
2. **Policy unchanged.** The ETB-only policy and the anchored ("from X ETB") / range publishing style from ADR-001 remain in force; only the figures change.
3. **Products kept.** Workflow Audit and AI remain as products, repriced to original-era levels.
4. **Discount program replaces the pilot.** The founding-client 15–20% pilot offer is removed and replaced by: web starter "3 months free maintenance"; mobile "3-month bug-fix warranty"; SaaS annual "Save 2 months"; audit "100% credited"; Web+AI bundle "10% off when booked together" (shown once).
5. **Static table is the sole source of truth.** The `VITE_PRICING_DATA_ENDPOINT` remote override mechanism is removed so stale payloads cannot override the table; a stale endpoint serving old figures is a release blocker (P-1).

## Consequences

- Prices are competitive with the local market the owner targets; Audit and AI remain saleable products; SaaS becomes a live priced offer instead of a waitlist.
- Every price surface must be updated to match §1: `pricingData.js`, pricing/service pages, wizard anchors and budget bands, PDF pricing guide, apparatus callouts, meter labels, and E2E assertions.
- Discount claims must be consistent everywhere; any "founding-client" / "15–20% off" residue fails the grep gate.
- The PDF pricing guide must be regenerated from the new table and human-diffed (NB-12 / owner action OA-7) before release.
- Rollback path: restore the ADR-001 figures on the same branch (or revert the implementation commit) and amend this record again; docs and code must never contradict the table.

## References

- ADR-001 — ETB-Only Launch Pricing with Anchored Starting Prices (policy kept; figures superseded)
- `docs/behaviors/pricing-revert-and-motion.md` — owner confirmation 2026-08-11, §1 table, P-1…P-3, §5 acceptance gate
- `docs/behaviors/pending-behaviors.md` — NB-36…NB-40
- `docs/swarm/STATE.md` — batch scope, gate status, unresolved risks
- `docs/plans/phase9-pricing-revert-motion.md` — TECH-30…TECH-34 implementation blueprint
