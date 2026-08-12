# ADR-005: Software-First Redesign — CTA Supersession, Light-First Palette & Narrow Imagery Exception

**Status:** ADOPTED (owner-confirmed contract 2026-08-12; in-batch for Phase 11)
**Date:** 2026-08-12
**Decision makers:** Business owner, @architect
**Source of truth:** `docs/behaviors/software-first-redesign.md` (R-1…R-19)
**Supersedes:** the C-1 primary CTA ("Book Workflow Audit") and audit-first hero ordering from
`docs/behaviors/software-development-prominence.md`; the S-1 track ordering (→ R-5 6-track
hierarchy); the S-3 Home ladder placement (→ removed, R-19); the Lumen Night palette (cool
violet + molten brass) from `docs/behaviors/visual-system-lumen.md`; and — narrowly — the
B-36/NB-23 no-imagery rule for two case-study cards. ADR-001 policy, ADR-003 figures, and
ADR-004 brand decisions (S-2, S-4) remain in force.

## Context

Phase 8 locked the Lumen Night palette (cool violet + molten brass); Phase 10 (ADR-004) made
"Book Workflow Audit" the primary conversion under a strict no-imagery rule. The owner rebalanced
again on 2026-08-12: NovaTech is a **software development company first** — the primary
conversion is a client asking NovaTech to *build* software, the visual identity moves to a
light-first engineering theme, and real screenshots of two delivered products become the first
(and only) imagery on the site. Prices, discounts, motion rules, the ETB-only policy, and the
audit booking mechanics are untouched.

## Decision

1. **CTA supersession (C-1 → R-6).** **"Start a Project"** is the primary CTA site-wide on every
   marketing hero and final CTA, linking to the Home project-intake form (`/#project-intake`);
   "Discuss Your Software Idea" is secondary (→ `/discovery-call`); "Explore AI & Automation" is
   tertiary (Home → AI section anchor; other pages → `/services` AI track). **Exception:** the
   `/workflow-audit` page keeps **"Book Workflow Audit"** as its own primary (that page is the
   audit); the audit CTA is secondary everywhere else.
2. **Palette change (Lumen Night → light-first).** The Lumen Night palette is superseded by a
   light-first palette **within the retained design system** (typography-led heroes, hairline
   cards, apparatus, meter strip, marquee, receipt rows, editorial motion all kept; AA contrast
   rules B-26…B-28 re-applied). Exact token set (plan §14 A1 candidate set — values-only, no
   token renames):
   - paper: `oklch(96.5% 0.012 88)` · paper-2 `oklch(93% 0.01 88)` · paper-3 `oklch(89% 0.01 88)`
   - ink: `oklch(23% 0.015 90)` · ink-2 `oklch(42% 0.02 90)` · ink-3 `oklch(58% 0.02 90 / 0.9)`
   - accent (deep forest-green): `oklch(35% 0.09 152)` · accent-2 hover `oklch(30% 0.09 152)` ·
     btn-ink `oklch(96% 0.01 88)`
   - glow `oklch(45% 0.1 152 / 0.35)` · paper-emit `oklch(45% 0.1 152 / 0.05)`; `.band-dark` deep
     ink-green `oklch(16% 0.025 152)` with white ink
   - No violet (hue ≈265) or brass (hue ≈50) surfaces remain in rendered output.
3. **Narrow imagery exception (B-36/NB-23 amendment).** Two case-study screenshot cards (Stealth
   Overlay, Rhobot Academy) are the **only** imagery allowed: real Playwright full-page captures
   (1440×900), static WebP assets, alt text in EN/AM/OM, `onError` → text-only card fallback.
   No other imagery is permitted anywhere.
4. **Home ladder removal + audit demotion (R-19, R-8).** The 4-row Home offer ladder is removed;
   the Workflow Audit renders at Home section 13 with locked terms (15,000 ETB · 5 business
   days · 100% credit) + guarantee + "View Live Pricing"; booking mechanics unchanged (C-2/C-3).
5. **Service hierarchy (S-1 → R-5).** Services render site-wide in the 6-track order: Custom
   Software Development → Web → Mobile → SaaS → Business Systems → AI & Automation.

## Consequences

- The audit remains for sale with identical mechanics but is no longer the primary conversion;
  ADR-004's booking/guarantee decisions (C-2/C-3) are unchanged.
- The Lumen Night palette is superseded in rendered surfaces; the design *structure* survives.
  Superseded docs (`software-development-prominence.md` C-1/S-1/S-3, `visual-system-lumen.md`
  palette) carry SUPERSEDED annotations.
- The no-imagery rule stands everywhere except the two case-study cards; screenshots are static
  build-time assets (no runtime network calls), real captures only (truth rule R-18).
- Prices, discounts, motion rules, ETB-only policy (ADR-001), and ADR-003 figures are unchanged.
- Rollback path: revert the phase-11 implementation commit on the same branch and amend this
  record; docs and code must never contradict the software-first hierarchy.

## References

- ADR-001 — ETB-Only Launch Pricing with Anchored Starting Prices (policy unchanged)
- ADR-003 — Pricing Revert to Original March-2026 Table (figures remain in force)
- ADR-004 — Software Development Prominence & Brand Rename to "NovaTech" (brand S-4 unchanged)
- `docs/behaviors/software-first-redesign.md` — owner confirmation 2026-08-12, R-1…R-19
- `docs/behaviors/pending-behaviors.md` — NB-44…NB-52
- `docs/plans/phase11-software-first-redesign.md` — TECH-42…TECH-50 implementation blueprint
  (§14 A1 token set)
- `docs/swarm/STATE.md` — batch scope, gate status, unresolved risks
