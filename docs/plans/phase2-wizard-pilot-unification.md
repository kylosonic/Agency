# Phase 2 Blueprint — Wizard/Pricing Unification + Founding-Client Pilot Offer (TECH-04, TECH-05)

**Date:** 2026-08-07 · **Author:** @plan · **Governed by:** launch-readiness B10, B16, B17 (B5, B6, B11 referenced); ADR-001 §4; pending-behaviors NB-05, NB-06; tech-backlog TECH-04, TECH-05; Phase 1 blueprint (commit `adc2302`)
**Arbitrated by @architect:** decisions 1–8 ACCEPTED; R5 (B5 gap on /workflow-audit) confirmed in scope; R6 logged as follow-up ticket.

## Goal
Make the instant quote wizard quote from the same locked ETB anchors as the pricing page with a hard floor at the 85,000 ETB entry offer (B16/B17), and publish the founding-client pilot offer (B10) on the homepage, pricing page, and workflow audit page with i18n and analytics.

## Arbitration decisions (locked)

1. **SaaS option: KEEP, waitlist-labeled, zero numeric estimate.** The wizard's "SaaS Platform" option stays but renders the B11 phrasing ("in development — tell us you want it") and, when selected, the result view shows waitlist copy with no ETB range instead of a quote.
2. **AI workflow options ('AI Invoice Processing', 'Engineering Knowledge Assistant', 'Sales Order Automation'): KEEP, mapped to the three AI tier anchors (250k / 750k / 1.5M+).** B6 defines the only sanctioned AI price anchors; these three named workflows are concrete use cases inside the AI automation family.
3. **'Branding and Additional Services': REMOVE from the wizard.** Add-on-only needs are served by `/additional-services` and the contact/discovery flows. Removes the last sub-floor anchor path.
4. **B17 floor resolution:** wizard budget options all start at 85k; wizard computed minimum is `max(anchor, 85,000)`. Pricing page anchors remain the table floor; B17 prevents the wizard from inviting sub-entry scopes.
5. **Integration load multiplier REMOVED.** Integrations remain scope metadata in the lead payload; the band max (next anchor, or 2× top anchor) is the directional ceiling.
6. **Band maxes for top tiers (2 × top anchor)** are new unpublished numbers, labeled directional by the existing result subtitle. Accepted.
7. **B5 gap on `/workflow-audit` IN SCOPE:** hero chip "1-2 week audit cycle" contradicts locked "5 business days"; page never states the 85,000 ETB fixed fee or credit-toward-implementation. Terms must be re-derived from `getPricingGuideSummary().workflowAudit`.
8. **`PricingScenarioPlanner.jsx`: VERIFY ONLY, do not refactor.** Its hardcoded anchors currently match the locked table; derivation deferred to a follow-up ticket.

---

## 1. Files to Modify / Create / Delete

### CREATE (1 source file + 1 doc)
| Path | Reason |
|---|---|
| `src/components/PilotOfferSection.jsx` | New reusable pilot-offer section (i18n-driven via `useLanguage`); accepts analytics `source` prop; stable E2E hook `data-testid="pilot-offer"`. |
| `docs/plans/2026-08-07-phase2-wizard-pilot-unification.md` | This blueprint (orchestrator-persisted). |

### MODIFY (9 files)
1. `src/services/pricingData.js` — export numeric anchor map + entry floor; make module Node-importable (lazy env read).
2. `src/pages/InstantQuotePage.jsx` — replace hardcoded ranges/modifier with anchor-derived band logic; SaaS waitlist branch; new option sets.
3. `src/config/contentData.js` — `quoteWizardOptions` serviceTypes + budgetRanges.
4. `src/i18n/translations.js` — wizard budget/service key changes + new `pilotOffer.*` tree (EN/AM/OM).
5. `src/services/analyticsService.js` — new `trackPilotOfferClick` helper.
6. `src/pages/Home.jsx` — pilot section between `#methodology` and `#contact`.
7. `src/pages/Pricing.jsx` — pilot section after `ai-pricing-actions`.
8. `src/pages/WorkflowAudit.jsx` — B5 terms fix (derive from `pricingData`) + pilot section.
9. `tests/live-site.spec.js` — Phase-2 assertions.

### DELETE (0 files)
Constants `SERVICE_BASE_RANGES`/`BUDGET_MODIFIER` die inside MODIFY files; i18n keys `instantQuote.options.budget.under50` and `instantQuote.options.service.additional` purged from all three language layers.

### VERIFY ONLY (2 files)
- `src/components/PricingScenarioPlanner.jsx` — anchors still match locked table (no edit).
- `src/App.jsx` — no change.

---

## 2. Strict Import Map

| Symbol / construct | Current consumers | Change |
|---|---|---|
| `SERVICE_BASE_RANGES`, `BUDGET_MODIFIER` (module-local) | only `calculateRange` in same file | DELETE; replace with band derivation reading new `pricingData` exports |
| `quoteWizardOptions` (`contentData.js`) | `InstantQuotePage.jsx` only | Keep export; array contents change; update `INITIAL_STATE`, `SERVICE_TYPE_LABEL_KEYS`, `BUDGET_LABEL_KEYS` in lockstep |
| `getPricingGuideSummary` + existing pricing exports | existing page consumers | Signatures unchanged; additions only |
| NEW: `QUOTE_ANCHORS`, `ENTRY_OFFER_FLOOR`, `deriveEstimateBand(formState)` | `InstantQuotePage.jsx`, `tests/live-site.spec.js` (Node import) | **Prerequisite:** move module-scope `import.meta.env` read inside `getRemoteWebPackages` so Node import works |
| NEW: `trackPilotOfferClick(source)` | `PilotOfferSection.jsx` | New helper, existing exports untouched |
| NEW: `PilotOfferSection` component | `Home.jsx`, `Pricing.jsx`, `WorkflowAudit.jsx` | Imports `Link`, `useLanguage`, `analyticsService` — all exist |
| NEW: `getPricingGuideSummary()` import in `WorkflowAudit.jsx` | replaces hardcoded audit numbers | Absolute import |
| i18n keys `instantQuote.options.budget.under50`, `.service.additional` | `InstantQuotePage.jsx` only | Remove from EN base + `amContentOverrides` + `omContentOverrides` |
| NEW i18n tree `pilotOffer.*` | `PilotOfferSection.jsx` only | Add to EN base + `amContentOverrides` + `omContentOverrides` |

---

## 3. Step-by-Step Execution (behavior only, no code)

### Step 1 — `src/services/pricingData.js` (MODIFY)
- Move the `VITE_PRICING_DATA_ENDPOINT` environment read out of module scope into `getRemoteWebPackages` body (lazy; identical browser behavior, Node-safe).
- Add numeric anchor constant derived from the locked table: web 45,000/150,000/250,000; mobile 200,000/400,000; AI 250,000/750,000/1,500,000; SaaS null. Export as `QUOTE_ANCHORS`.
- Export `ENTRY_OFFER_FLOOR = 85000`.
- Add pure export `deriveEstimateBand(formState)`: (a) map service type → family (web/mobile/ai/saas); (b) SaaS → null; (c) select tier index from budget-band table; (d) `min = max(anchors[family][index], ENTRY_OFFER_FLOOR)`; (e) `max = anchors[family][index+1]` else `2 × anchors[family][index]`; (f) return `{min, max}` in ETB integers.
- Existing exports and remote-override ETB validation stay byte-identical in behavior.

### Step 2 — `src/config/contentData.js` (MODIFY)
- `serviceTypes`: remove `'Branding and Additional Services'`. Order preserved for the rest.
- `budgetRanges`: `['85k - 150k ETB', '150k - 400k ETB', '400k - 1M ETB', '1M+ ETB']`.
- `timelineRanges`/`integrations`: untouched.

### Step 3 — `src/pages/InstantQuotePage.jsx` (MODIFY)
- Import `deriveEstimateBand`, `ENTRY_OFFER_FLOOR` (all math inside `deriveEstimateBand`).
- DELETE `SERVICE_BASE_RANGES`, `BUDGET_MODIFIER`, old `calculateRange`; replace with thin `useMemo` wrapper calling `deriveEstimateBand(formState)`; estimate is `null` for SaaS.
- `BUDGET_LABEL_KEYS`: re-key to new option strings → `instantQuote.options.budget.entry/.mid/.high/.enterprise`; drop `under50`.
- `SERVICE_TYPE_LABEL_KEYS`: remove `'Branding and Additional Services'` entry; render `instantQuote.options.service.saasWaitlist` note under the SaaS option in step 0 (B11).
- Submit flow: `null` estimate (SaaS) still submits lead (service, budget, timeline, integrations, goals) but context omits `minEstimate`/`maxEstimate`; analytics events fire without numeric fields.
- Result view: `null` → waitlist result card (new keys `instantQuote.result.waitlistTitle/.waitlistSubtitle`, B11 phrasing) with discovery-call and start-again actions, NO `.quote-result-range` element. Otherwise existing range card unchanged.
- `INITIAL_STATE` keeps `budgetRanges[1]` default (now "150k - 400k ETB").
- `formatCurrency`, step navigation, integration toggles untouched.

### Step 4 — `src/i18n/translations.js` (MODIFY — EN/AM/OM, all three layers)
- Budget keys: remove `under50`; retarget `mid/high/enterprise`; add `entry`. EN strings: "85k - 150k ETB", "150k - 400k ETB", "400k - 1M ETB", "1M+ ETB"; AM/OM equivalents authored to match (localized phrasing, same numerals).
- Service keys: remove `service.additional` (3 layers). Keep web/mobile/saas/invoiceProcessing/engineeringKnowledge/salesOrderAutomation.
- New keys (3 layers): `service.saasWaitlist`, `result.waitlistTitle/.waitlistSubtitle`, entire `pilotOffer.*` tree: `tag`, `title`, `intro` (time-boxed: "Open to the first three implementation clients"), `discount` (15–20% off, founding-client rates), `exchangeTitle`, `exchangeItems` (case study rights, testimonial, referral permission), `cta` ("Claim founding-client rate"), `finePrint` (implementation projects only).
- Purge gate: grep `src/` for `under50`, `instantQuote.options.service.additional` — zero matches.

### Step 5 — `src/services/analyticsService.js` (MODIFY)
- Add `trackPilotOfferClick(source)` → `trackEvent('pilot_offer_cta_clicked', { source })`. Mirror `trackDiscoveryCallClick` pattern.

### Step 6 — `src/components/PilotOfferSection.jsx` (CREATE)
- Root class `pilot-offer-section`, `data-testid="pilot-offer"`.
- Props: `source` (string: `home_pilot_offer`/`pricing_pilot_offer`/`audit_pilot_offer`).
- Content (all via `useLanguage` from `pilotOffer.*`): kicker, headline, time-box framing, 15–20% founding-client-rate statement, exchange-terms list, primary CTA `Link` to `/book-discovery-call` firing `trackPilotOfferClick(source)`.
- Single column; no three-card row (B20/B21 belong to Phase 3); reuse existing section/container classes.
- Copy constraints: no `$`/`USD` characters in any language layer; no resurrected proof phrases ("Projects Delivered"/"Active Clients"/"Client Satisfaction").

### Step 7 — `src/pages/Home.jsx` (MODIFY)
- Insert `<PilotOfferSection source="home_pilot_offer" />` between `#methodology` and `#contact`.
- Add import. Nothing else changes.

### Step 8 — `src/pages/Pricing.jsx` (MODIFY)
- Insert `<PilotOfferSection source="pricing_pilot_offer" />` after `ai-pricing-actions`. DOM order: after audit card, so `getByText('85,000 ETB').first()` still resolves to the audit card.

### Step 9 — `src/pages/WorkflowAudit.jsx` (MODIFY — B5 alignment)
- Import `getPricingGuideSummary`; derive audit object once at module scope.
- Replace hardcoded hero chips with B5-faithful data-driven chips: fixed fee 85,000 ETB, "delivered within 5 business days", "full fee credited toward your implementation project". **Remove the "1-2 week audit cycle" chip (contradicts locked 5-business-day term).**
- Add fixed-fee + credit line in the deliverables card (page currently shows no price).
- Append `<PilotOfferSection source="audit_pilot_offer" />` after the audit grid section.
- Page stays hardcoded English; pilot section is the i18n surface.

### Step 10 — `tests/live-site.spec.js` (MODIFY — new Phase-2 describe blocks)
See §5. Additions only; existing 58 tests untouched.

### Step 11 — Build-level verification (executed by @build)
- `npm run build` clean; full Playwright suite green (58 existing + ~10 new).
- Grep gate: `under50` and `instantQuote.options.service.additional` absent from `src/`; `'Under 50k ETB'` and `'Branding and Additional Services'` absent from `src/config/contentData.js` and compiled bundle.
- Exhaustive floor property check runs in suite (Node-side import): all service × budget combos return `min ≥ 85,000`; web mid-band returns exactly 150,000; SaaS returns null.
- `graphify update .` per swarm rule — graphify CLI not installed in this workspace; flagged to @architect, not a blocker.

---

## 4. File tally

**0 DELETE, 2 CREATE (1 source + 1 doc), 9 MODIFY, 2 VERIFY.**

## 5. Testing Requirements

1. **Wizard/pricing parity (web):** `/instant-quote`, default service, budget "150k - 400k ETB", complete flow → `.quote-result-range` contains "150,000 ETB" and "250,000 ETB".
2. **No below-entry options:** budget select has no "Under 50k ETB"; step 0 renders no "Branding and Additional Services".
3. **Entry floor (spot check):** Web + "85k - 150k ETB" + ALL 8 integrations → result min is "85,000 ETB".
4. **Exhaustive floor property (Node-side):** import `deriveEstimateBand` + `ENTRY_OFFER_FLOOR` + budget bands; every service × budget combo asserts `min ≥ 85,000`, `min ≤ max`; web mid-band min === 150,000; SaaS returns null for all bands.
5. **SaaS waitlist behavior:** select SaaS → complete flow → waitlist copy rendered, `.quote-result-range` count 0, no numeric range.
6. **Pilot offer on ≥2 pages in all 3 languages:** for en/am/om × (`/`, `/pricing`, `/workflow-audit`): switch language, assert `data-testid="pilot-offer"` visible + localized headline. Use `dismissLeadModalIfOpen` helper.
7. **Pilot CTA analytics:** seed `dataLayer`; click pilot CTA on `/` → `expectAnalyticsEventWithSource('pilot_offer_cta_clicked', 'home_pilot_offer')`; repeat on `/pricing` with `pricing_pilot_offer`.
8. **Workflow audit B5:** `/workflow-audit` renders "85,000 ETB" and credit phrasing ("credited toward"); does NOT render "1-2 week audit cycle".

**Regression guardrails:** wizard-flow test (index-based defaults) passes unedited; `/pricing` locked-table test unaffected (pilot renders after audit card); USD scans hold (no `$`/`USD` in pilot/wizard copy); policy tests untouched (no pilot section on `/policy`).

## 6. Risks & Findings

- **R1 — Node-import of `pricingData.js`:** module-scope `import.meta.env` crashes in Node. Mandatory tiny fix: lazy env read inside `getRemoteWebPackages`. Zero browser behavior change.
- **R2 — Phase-1 suite regression surface:** wizard flow, `/pricing` `.first()` selection, USD scans — guardrails documented above; do not reorder sections casually.
- **R3 — SaaS submit with `null` estimate:** lead context must omit min/max; analytics must tolerate missing numeric metadata.
- **R4 — Top-tier band maxes (2 × anchor):** new unpublished numbers, labeled directional; do not publish elsewhere.
- **R5 — [CONFIRMED IN SCOPE] B5 contradiction on `/workflow-audit`:** "1-2 week audit cycle" vs "5 business days"; missing 85k/credit copy. Fixed in Step 9.
- **R6 — [LOGGED] `PricingScenarioPlanner` hardcodes AI anchors:** currently match the locked table; derivation deferred to a follow-up ticket.
- **R7 — i18n purge completeness:** `under50` and `service.additional` in three layers; partial purge violates Phase-1 hygiene. Grep gate.
- **R8 — Lead-capture modal interference:** `/` and `/pricing` in `AUTO_LEAD_CAPTURE_ROUTES`; reuse `dismissLeadModalIfOpen`.
- **R9 — Pilot copy compliance:** B10 exchange terms, founding-client framing, time-box, no fabricated scarcity (B1), no `$`/`USD`, no resurrected proof language.
- **R10 — `graphify` unavailable:** AST mapping via grep-based import analysis; flag tooling to @architect.
- **R11 — i18n for B5 block on `/workflow-audit`:** page is hardcoded English; B5 terms English-only while pilot section is trilingual. Acceptable; trilingual audit copy is Phase-4 work.

**Blueprint status:** complete and arbitrated. Ready for @build execution.
