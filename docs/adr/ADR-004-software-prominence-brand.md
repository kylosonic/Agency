# ADR-004: Software Development Prominence & Brand Rename to "NovaTech"

**Status:** Accepted (owner-confirmed 2026-08-12)
**Date:** 2026-08-12
**Decision makers:** Business owner, @architect
**Source of truth:** `docs/behaviors/software-development-prominence.md` (S-1…S-4, C-1…C-4)
**Supersedes:** the AI-forward offer framing in `launch-readiness.md`, `docs/behaviors/visual-system-lumen.md`, and `CONTEXT.md` where it contradicts software-first prominence. ADR-001 policy and ADR-003 figures remain in force.

## Context

The Ethiopian market is software-development dominant. The site previously framed AI
automation as the core offer, with web/mobile presented as a subordinate "interface layer",
and the brand name "NovaTech AI" carried the AI signal. The owner directed a rebalance
(confirmed 2026-08-12): software development leads the offer hierarchy, the brand drops the
"AI" suffix, and conversion centers on booking the Workflow Audit as the least-risky paid
first step.

## Decision

1. **Software leads.** Software development (web → mobile → SaaS) is the **lead offer track on
   every surface** (ladder, delivery tracks, hero chips, apparatus callouts, meter labels,
   wizard selector, SEO copy); AI automation is the specialist second track. No subordination
   language ("interface layer" or equivalent) remains anywhere.
2. **Brand rename.** The brand is renamed to **"NovaTech"** — "AI" is removed from all brand
   strings (logo, nav, footer, titles, metas, translations EN/AM/OM). The domain is unaffected;
   PDF and legal docs remain owner-side (out of code scope).
3. **Conversion.** **Book Workflow Audit** is the primary action: book now / pay later, 48-hour
   slot hold, bank transfer active (Telebirr when activated), human confirmation within
   1 business day — with the risk-reversal guarantee ("If the audit doesn't produce a usable
   blueprint, you don't pay."). Free Discovery Call and one-tap WhatsApp/Telegram are
   supporting paths, visibly secondary.

## Consequences

- The AI-forward framing in `launch-readiness.md`, `visual-system-lumen.md`, and `CONTEXT.md`
  is superseded for ordering/positioning; those docs carry a SUPERSEDED annotation (2026-08-12).
- Prices, discounts, motion, visual system, and the ETB-only policy (ADR-001) are unchanged;
  **ADR-003 figures remain in force**.
- Brand sweep must catch every "NovaTech AI" / "AI-first" string across components, meta,
  i18n (EN/AM/OM), and scripts — including `scripts/generate-og-image.mjs` (leftover flag
  recorded in `docs/swarm/STATE.md`; regenerating `public/og-image.png` before the script is
  fixed would reintroduce old branding).
- Rollback path: revert the phase-10 implementation commit on the same branch and amend this
  record; docs and code must never contradict the software-first hierarchy.

## References

- ADR-001 — ETB-Only Launch Pricing with Anchored Starting Prices (policy unchanged)
- ADR-003 — Pricing Revert to Original March-2026 Table (figures remain in force)
- `docs/behaviors/software-development-prominence.md` — owner confirmation 2026-08-12, S-1…S-4, C-1…C-4
- `docs/behaviors/pending-behaviors.md` — NB-41…NB-43
- `docs/plans/phase10-software-prominence-booking.md` — TECH-35…TECH-41 implementation blueprint
- `docs/swarm/STATE.md` — batch scope, gate status, unresolved risks
