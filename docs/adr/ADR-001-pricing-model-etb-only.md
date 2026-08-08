# ADR-001: ETB-Only Launch Pricing with Anchored Starting Prices

**Status:** Accepted
**Date:** 2026-08-07
**Decision makers:** Business owner, @architect
**Source of truth:** `docs/behaviors/launch-readiness.md` (B4–B17)

## Context

The prior pricing model published dual-currency (global USD + local ETB) ranges with "purchasing-power parity" discounts applied inconsistently (47%–96% depending on product), quoted ad spend below its actual cost, listed maintenance and app-store fees below their real cost, and contradicted itself between the instant quote wizard and the pricing page. The business cannot yet receive USD (bank transfer only, pending business license), has no office, and has no public proof layer.

## Decision

1. **ETB-only pricing** at launch. USD appears solely as "international engagements quoted individually" until a USD receipt rail exists.
2. **Anchored starting prices** ("from X ETB"), never open-ended ranges; each AI tier publishes explicit scope drivers that raise the price.
3. **One locked table** (see `docs/behaviors/launch-readiness.md` B5–B9): audit 85,000 ETB fixed (credited toward build); AI tiers from 250k / 750k / 1.5M+; web from 45k / 150k / 250k; mobile from 200k / 400k; AI support 30–70k/month; maintenance 5–15k/month with SLA.
4. **Single source of truth for pricing data**: the instant quote wizard must derive estimates from the same package table as the pricing page (B16), and its budget options must not invite scopes below the entry offer (B17).
5. **Bank-transfer-only payment** stated on the policy page until licensing; Telebirr/Chapa/card rails added post-license (B13, B25).
6. **Marketing retainers cut** from launch scope (B12). SaaS shown as waitlist only (B11).
7. **Founding-client pilot**: first three implementation clients at 15–20% off in exchange for case study rights, testimonial, referral (B10).

## Consequences

- One currency, one coherent price table — the market's only agency publishing anchored ETB prices (competitive moat per market research).
- No line item can lose money or contradict another surface of the site.
- The wizard becomes a trust instrument instead of an undercutting one.
- Future state (post-license): USD column may return with a stated exchange policy (B25).
