# ADR-002: Light-First Fortune-500 Visual System

**Status:** Accepted
**Date:** 2026-08-08
**Decision makers:** Business owner, @vision (design research), @architect
**Source of truth:** `docs/behaviors/visual-system-fortune500.md` (B26–B38); supersedes B20–B22 in `docs/behaviors/launch-readiness.md`

## Context

Phase 3 (TECH-06) shipped a dark-only zinc + ochre system to remove the "AI template" look. The
owner then commissioned a full redesign with an explicit requirement: the site must read as a
Fortune-500 brand (Apple/NVIDIA/Meta class) and must never look AI-generated. Design research
(2026-08-08) established three things: (1) Fortune-500 premium is restraint — one accent, three
type levels per block, extreme whitespace, calm motion; (2) the AI-tell catalog includes design
elements currently in use — Space Grotesk (now a flagged font), floating UI-mockup heroes, equal
card rows, gradient accents, ambient glows, decorative grid backgrounds; (3) no brand has ever
shipped a premium Ethiopic display treatment on the web — a genuine category-defining opportunity
for the Amharic track. The automated visitor checks hard-assert a dark-only site, so a light-first
system necessarily changes those checks (a deliberate re-baseline, not a drift).

## Decision

1. **Light-first base.** Near-white surfaces, near-black text, muted gray secondary — on every
   page, all three languages. Exactly two near-black bands per page in fixed positions: after the
   services index, and as the pre-footer CTA band. Apple-style contrast sequencing.
2. **One accent, two modes.** Deep bronze on light surfaces for anything carrying text (AA
   contrast enforced); bright gold on dark bands and large decorative moments only. Accent
   gradients are banned.
3. **Font system.** Distinctive display grotesque + separate body family + monospaced numerals and
   labels. Amharic display in a serif Ethiopic family; Amharic body in a sans Ethiopic family.
   Ethiopic rendering rules: taller line-heights, never negative tracking, no italics, no
   uppercase transforms, Latin-first font stacks, Latin digits for all data.
4. **Zero-imagery system.** No photography, illustrations, or generated imagery anywhere.
   Typography, grain, thin rules, and real on-site artifacts carry the page.
5. **Structure.** Typography-led heroes (three levels, aligned to one side, real published numbers
   only); services as a ruled editorial index with monospaced numerals; 5-destination nav plus one
   action; lean 4-column footer plus legal bar; calm motion with one orchestrated page-open reveal
   and reduced-motion respect.
6. **E2E re-baseline (B38).** The automated visitor checks are deliberately rewritten from
   dark-only to light-first expectations; the diff is documented and QA-reviewed before the
   redesign counts as done (NB-24).

## Consequences

- The site becomes the first Ethiopian agency site with a premium Ethiopic display treatment —
  a marketing moat no competitor template can replicate.
- The dark-only contract ends. The automated visitor checks change deliberately and must be
  re-baselined with a recorded, QA-approved diff before merge.
- Copy, pricing, and inquiry flows are untouched: B1–B19 and B23–B25 remain in force;
  B20–B22 are superseded by B26–B38.
- Highest-risk surface: Amharic glyph integrity at display sizes. Mitigation: `:lang(am)`-scoped
  typography rules, screenshot verification in all three languages, and a locked font stack order.
