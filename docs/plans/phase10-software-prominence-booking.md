# Phase 10 — Software Prominence & Booking Conversion (NB-41…NB-43)

> **Gate A blueprint — @plan.** Branch: `software-prominence-booking`. Governed by
> `docs/behaviors/software-development-prominence.md` (S-1…S-4, C-1…C-4) — **supersedes** the
> AI-forward framing in `launch-readiness.md` / `visual-system-lumen.md` where copy/ordering
> contradicts software-first prominence. Prices, discounts, motion, visual system, i18n
> architecture, ETB-only policy (ADR-001) unchanged. ADR-004 (new, in-batch) records the brand
> rename + software-first prominence ruling.
>
> **RECONSTRUCTION NOTICE (Gate A):** this blueprint was rebuilt on 2026-08-12 from
> authoritative artifacts (behavior contract, NB-41…43 ledger rows, phase-9 plan format, architect
> rulings A1…A11) after the original Gate A output was lost with its session. TECH-35…41 scopes,
> §12 ambiguity wording, and file inventory are reconstruction — flagged F1…F5 in §14. **Gate A
> accepted by @architect on 2026-08-12 after re-review; F2 resolved (ladder = 4 rows per the
> owner-confirmed enumeration; the behavior contract was corrected to match).**

---

## 1. Goal

Make software development (web → mobile → SaaS) the lead offer track on every surface, rename
the brand "NovaTech AI" → **"NovaTech"**, restructure the Home ladder to 4 rows (software before
AI), and convert the marketing site into a booking funnel whose primary action is **Book Workflow
Audit** — an instant, no-checkout booking ("Slot held for 48 hours", invoice + bank transfer
details by email, human confirmation within 1 business day) backed by the risk-reversal guarantee
("If the audit doesn't produce a usable blueprint, you don't pay."), with free Discovery Call and
one-tap WhatsApp/Telegram as secondary support paths.

## 2. Scope / Non-scope

**In scope:** brand rename (TECH-35); software-first ordering + subordination-language removal
(TECH-36); Home ladder restructure + hero copy + word gate (TECH-37); Pricing section swap +
bundle placement (TECH-38); booking form + confirmation + guarantee (TECH-39); primary-CTA
rework + auto-capture route change (TECH-40); support paths + SEO + E2E re-baseline + i18n
parity (TECH-41); ADR-004.

**Non-scope (do not touch):** prices/discounts/motion/visual system (locked); payment rails
(TECH-14, still BLOCKED — booking works without them); nav structure (labels/order inside
existing menus only); domain/URLs; PDF pricing guide + legal/company registration documents
(owner-side); no new analytics events, no new dependencies, no new network calls; Discovery Call
mechanics (ordering/copy only).

## 3. Ticket breakdown (TECH-35…41 — reconstruction, see F1)

### TECH-35 — Brand rename "NovaTech AI" → "NovaTech" (NB-42 / S-4)
1. `src/i18n/translations.js` — `brand.name` EN/AM/OM (line 11 EN); footer description (line 79
   "AI-first automation consultancy…" → software-first, no "AI-first"); `actions.pricingGuide`
   "AI Pricing Guide" → "Pricing Guide"; `actions.bookDiscoveryCall` → "Book Workflow Audit";
   audit/rename remaining AI-brand strings; AM/OM mirrors; new strings → NB-09 native-review list.
2. `src/services/seoService.js` — all "NovaTech AI" titles/descriptions → "NovaTech"
   (verified lines 12, 68, 72, 76 + sweep).
3. `src/components/LeadCaptureModal.jsx`, `Navbar.jsx`, `Footer.jsx`, `BandCta.jsx` — brand
   strings via i18n only (verify zero hardcoded "NovaTech AI").
4. `tests/live-site.spec.js` — brand grep test (zero "NovaTech AI" rendered).

### TECH-36 — Software-first ordering + subordination removal (NB-41 / S-1, S-2)
1. `src/pages/Home.jsx` — `IMPLEMENTATION_TRACKS` reorder (Web, Mobile, AI); `OFFER_LADDER`
   software row before AI row (detail in TECH-37); marquee/callouts re-cut if AI-first.
2. `src/pages/Services.jsx` — `DELIVERY_TRACKS` reorder: Web, Mobile, SaaS, then AI automation
   (line 58 currently AI-first); hero chip (line 102) → A2 exact string; meter label → A2.
3. `src/pages/InstantQuotePage.jsx` — service selector software services before AI (line 24
   "AI automation" first).
4. `src/pages/SaasSolutionsPage.jsx`, `WebDevelopmentPage.jsx`, `MobileDevelopmentPage.jsx`,
   `AdditionalServicesPage.jsx` — verify track/meter/chip ordering software-first.
5. `tests/live-site.spec.js` — ordering gate (index comparison software < AI on Home + Services +
   wizard); forbidden-string gate ("interface layer", "Add the interface layer", equivalents).

### TECH-37 — Home ladder 4-row restructure + hero copy + word gate (NB-41 / S-3, A2, A9)
1. `src/pages/Home.jsx` — OFFER_LADDER (lines 109-138): exactly 4 rows per S-3 — (1) Workflow
   Audit; (2) **Software development** (Web from 20,000 · Mobile from 40,000 · SaaS from
   3,500/mo) — ladder stage label **"Software development"** (A2); (3) **AI automation** (from
   40,000 / 100,000 / 200,000+); (4) Support & maintenance; equal card weight; delete "Add the
   interface layer" stage (forbidden). Resolution F2: enumeration is authoritative (4 rows).
2. Hero subcopy — software first, ≤2 sentences (A2; e.g. "software systems — web, mobile,
   SaaS — and AI automation where it solves a real bottleneck", exact string at build).
3. Home hero CTA primary **"Book Workflow Audit"** → `/workflow-audit#booking`; secondary
   "View Live Pricing" (C-1).
4. Word gate: rendered Home EN ≤ **616** words (phase-9 constant; A9); if QA measures exceed,
   evidence-based re-baseline at Gate C per phase-9 /pricing precedent.

### TECH-38 — Pricing section swap + bundle placement (NB-41 / A8)
1. `src/pages/Pricing.jsx` — move `#product-build-pricing` (04 · BUILDS, line 154) **before**
   `#ai-automation-pricing` (03 · AUTOMATION, line 112); renumber eyebrows (BUILDS → 03,
   AUTOMATION → 04); bundle line "Web + AI automation booked together: 10% off" (line 226) stays
   **exactly once** in the BUILDS section; verify no anchor/E2E depends on old order.

### TECH-39 — Booking flow: AuditBookingForm + confirmation + guarantee (NB-43 / C-2, C-3, A1, A6)
1. NEW `src/components/AuditBookingForm.jsx` — fields **Full Name / Email / Phone / Company
   (optional)** (A6), reusing existing form labels/i18n keys where possible; submit reuses
   `submitLeadIntake` + `queueLeadFollowups` + `buildProjectInquiryMailto` fallback (C-2: booking
   must never silently vanish); dedupe duplicate submissions (same email within 48h); analytics
   reuse `trackContactFormAttempt/Outcome` (source `'booking'`).
2. `src/pages/WorkflowAudit.jsx` — new `#booking` section hosting the form; confirmation screen
   copy family (A6): "Slot held for 48 hours" · invoice + bank transfer details by email (bank
   transfer / CBE Birr = active method; "Telebirr when activated" — never a live-Telebirr claim,
   A1) · human confirmation within 1 business day · guarantee line (C-3) · no online checkout.
   EN/AM/OM; NB-09 native-review flag.
3. Guarantee line "If the audit doesn't produce a usable blueprint, you don't pay." — audit page
   + confirmation (C-3) + Policy audit terms (TECH-40 item 4).

### TECH-40 — Primary CTA rework + auto-capture route change (NB-43 / C-1, A3, A4, A5)
1. `src/App.jsx` — REMOVE `'/workflow-audit'` from `AUTO_LEAD_CAPTURE_ROUTES` (line 66) so the
   auto-capture modal never competes with the primary booking form (A3).
2. `src/pages/WorkflowAudit.jsx` — primary CTA **"Book Workflow Audit"** anchoring to in-page
   `#booking` (replaces closing-panel primary "Book Audit Session" → `/book-discovery-call`,
   lines 157-159); secondary "Review Pricing" stays.
3. `src/pages/SaasSolutionsPage.jsx` — closing panel primary → **"Book Workflow Audit"**; SaaS
   card CTAs keep discovery-call destination (A4).
4. `src/pages/PolicyPage.jsx` — audit terms gain the guarantee line (C-3); payment lines
   unchanged (A1: bank transfer only + Telebirr after licensing, lines 86-91); page CTA
   unchanged (A5 — legal page, exempt from C-1).
5. Home/Pricing/Services/service-page heroes — primary CTA "Book Workflow Audit" (or equivalent
   path landing on it) per C-1; form pages (InstantQuote, DiscoveryCall) keep their own
   primaries (C-1 edge case).

### TECH-41 — Support paths + SEO + E2E re-baseline + i18n parity (NB-41/42/43 / C-4, A2, A7, A10)
1. NEW `src/components/SupportPathLinks.jsx` (on /workflow-audit below primary CTA) — compact
   scope select (Web / Mobile / SaaS) + budget-band select (reuse `QUOTE_BUDGET_BANDS`) +
   optional note → prefilled message "I need a [web / mobile / SaaS] build · budget: [band] ·
   [optional note]" via `buildWhatsAppMessageLink` (existing, unconsumed) + NEW
   `buildTelegramDirectLink` (F4) in `src/config/siteConfig.js`; channels from `SITE_CONTACT`
   only, no new integrations (C-4).
2. `src/pages/WorkflowAudit.jsx` — FIVE_DAY_FLOW step 2 (line 33) → "where a web or mobile
   surface is needed" (A10); support-paths block (A7).
3. `src/services/seoService.js` — `/services` title **"Services | NovaTech"** (A2); software-first
   descriptions; brand strings from TECH-35.
4. `src/pages/DiscoveryCallPage.jsx` — ordering/copy only (C-4).
5. `tests/live-site.spec.js` — booking-flow E2E (fill → confirm; asserts 'bank transfer' as in
   existing policy test lines 436-437, NOT a live-Telebirr claim — A1); guarantee-surface test;
   support-path prefilled-link test (scope+budget present, 3 languages); ordering gate; brand
   grep; word-gate constant 616 (A9); regression suite green.

## 4. Exact file inventory (verified against code 2026-08-12, branch main HEAD 5f1f8ab)

| File | Change |
|---|---|
| `src/App.jsx` | remove `'/workflow-audit'` from AUTO_LEAD_CAPTURE_ROUTES (line 66) |
| `src/config/siteConfig.js` | NEW `buildTelegramDirectLink`; brand/pricing-guide strings checked |
| `src/i18n/translations.js` | brand rename EN/AM/OM (line 11), footer (79), actions; nav label re-cuts ("Web Interfaces"/"Mobile Interfaces"/"SaaS Interfaces" lines 15-17); booking + confirmation + guarantee keys; NB-09 flag |
| `src/pages/Home.jsx` | hero subcopy, CTA row, OFFER_LADDER (109-138), IMPLEMENTATION_TRACKS (62-84), callouts/marquee ordering |
| `src/pages/Services.jsx` | DELIVERY_TRACKS order (58), hero chip (102), meter (A2) |
| `src/pages/Pricing.jsx` | section swap (112/154), eyebrows, bundle once (226), hero CTA |
| `src/pages/WorkflowAudit.jsx` | `#booking` section, primary CTA (157-159), FIVE_DAY_FLOW step 2 (33), guarantee, support paths |
| `src/pages/SaasSolutionsPage.jsx` | closing panel primary (A4); card CTAs unchanged |
| `src/pages/WebDevelopmentPage.jsx` / `MobileDevelopmentPage.jsx` / `AdditionalServicesPage.jsx` / `InstantQuotePage.jsx` | ordering + chip/meter labels software-first; wizard selector (24) |
| `src/pages/PolicyPage.jsx` | audit terms + guarantee line (C-3); payment copy + CTA untouched (A1/A5) |
| `src/pages/DiscoveryCallPage.jsx` | copy/ordering only |
| `src/services/seoService.js` | brand strings, /services title (A2), software-first metas |
| `src/components/Navbar.jsx` / `Footer.jsx` / `LeadCaptureModal.jsx` / `BandCta.jsx` | brand strings via i18n; BandCta label "Start Instant Quote" (A2) |
| NEW `src/components/AuditBookingForm.jsx` | booking form + confirmation (C-2/C-3/A1/A6) |
| NEW `src/components/SupportPathLinks.jsx` | scope/budget/note → chat links (A7) |
| `src/index.css` | form/confirmation styles only (existing form system, no new tokens) |
| `tests/live-site.spec.js` | §6 additions + re-baseline |
| NEW `docs/adr/ADR-004-brand-software-prominence.md` | scribe, in-batch (A11) |
| `docs/behaviors/software-development-prominence.md` | exists — committed this gate (unchanged) |
| `docs/behaviors/pending-behaviors.md` | exists — committed this gate (unchanged) |

## 5. Dependency DAG

```
TECH-35 (brand) ──┐ (translations/SEO shared with 36-38 — sequential)
TECH-36 (ordering) ──┐ (touches Home/Services/wizard/instant quote)
TECH-37 (ladder+hero+word gate) ──┐ (re-cuts Home copy TECH-36 changed)
TECH-38 (pricing swap) ──┐ (Pricing.jsx + anchors)
TECH-39 (booking form) ──┐ (new component; needs no CTA change)
TECH-40 (CTAs + auto-capture) ──┐ (rewires buttons to #booking — after form exists)
TECH-41 (support paths + SEO + E2E + i18n) ──┐ (final sweep — last)
        ▼
Grep gates + full E2E + lint/build → QA (C) → Security (D) → Integration (E) → Commit (F) → UAT
```
- Parallelism: none safe — every ticket touches `translations.js`/`live-site.spec.js`, most touch
  `Home.jsx`/`WorkflowAudit.jsx` (AGENTS.md §7). Strictly linear 35→41.
- E2E assertions land per-ticket (brand in 35, ordering in 36, word gate in 37, swap in 38,
  booking in 39, CTA in 40, support paths + final sweep in 41) — never a green suite masking the
  new contract (TECH-21/22 precedent).

## 6. Test strategy

1. **Ordering gate** — software track index < AI track index on Home ladder + Services delivery
   tracks + wizard selector (E2E index comparison).
2. **Forbidden-string gate** — `NovaTech AI` (EN/AM/OM), `interface layer`, `Add the interface
   layer`, `AI-first` absent from `src/` + `tests/` + rendered `public/` sources (binary PDF is
   owner-side — S-4 edge case; grep excludes the binary, documented).
3. **Brand gate** — wordmark, titles, metas render "NovaTech".
4. **Booking gate** — E2E: fill form on `/workflow-audit#booking` → confirmation asserts
   "Slot held for 48 hours", invoice, **bank transfer** (CBE Birr) as active + "Telebirr when
   activated"-style conditional phrasing, NOT a live-Telebirr claim (A1); 1 business day; guarantee
   line; no checkout step; mailto fallback path covered.
5. **Guarantee gate** — guarantee line on audit page + confirmation + Policy audit terms.
6. **Support-path gate** — WhatsApp link contains scope+budget+note; Telegram direct link same;
   correct in EN/AM/OM.
7. **Word gate** — rendered Home EN ≤ 616 (A9; re-baseline path per phase-9 §14 note if QA
   measures exceed).
8. **Regression gate** — existing 101 E2E + new tests green; prices/motion/visual/i18n gates
   still pass.

## 7. Integration risks

- **R1 — i18n lockstep:** every EN change mirrored AM/OM or gate fails; new keys → NB-09 native
  review list (existing precedent, phase-9 R4).
- **R2 — Word-gate drift:** new booking/support-path copy must not blow Home's 616 budget; A9
  defines the evidence-based re-baseline path.
- **R3 — No backend for booking:** fallback (mailto with same content) must never silently drop a
  submission; dedupe same-email-within-48h (C-2 edge case).
- **R4 — Auto-capture reduction:** removing `/workflow-audit` from AUTO_LEAD_CAPTURE_ROUTES
  shrinks modal reach by design (A3); verify other routes unaffected.
- **R5 — Pricing swap blast radius:** section anchors (`#product-build-pricing`,
  `#ai-automation-pricing`), E2E order assertions, and any deep links must be re-verified (A8).
- **R6 — Brand-grep blast radius:** "NovaTech AI" exists in `seoService.js`, `translations.js`,
  and the PDF binary (owner-side, exempt); sweep list in TECH-35 is exhaustive; QA re-runs grep.
- **R7 — E2E breadth:** booking-flow + ordering tests are new surface; spec must stay
  byte-consistent with the deployed contract (phase-4/7 precedent).
- **R8 — Ladder row count:** resolved (F2) — 4 rows per owner-confirmed enumeration.
- **R9 — Subordination remnants:** "Interfaces" nav labels and "AI-first" footer phrasing are
  documented residual surfaces (verified) — grep gate catches any missed one.

## 8. Observability / logging

- Booking submits reuse `trackContactFormAttempt` / `trackContactFormOutcome` (source
  `'booking'`); support-path clicks reuse `trackContactChannelClick` (no new analytics events —
  C-4); `trackDiscoveryCallClick` unchanged. No new server-side logging; lead fallback queue
  stats unchanged (`leadIntakeService`).

## 9. Security implications

- No new network calls, no new third-party dependencies, no new env vars; forms reuse existing
  validated intake paths (`isValidLeadEmail`); chat links are presentational anchors built from
  `SITE_CONTACT` config. Security gate (D) = re-run grep gates + confirm zero new network/deps +
  no secrets in committed docs.

## 10. Migration / rollback

- No data migration, no schema. Rollback = `git revert -m 1 <merge>` → Vercel auto-redeploy
  (phase-9 precedent, documented in STATE.md). One feature branch
  (`software-prominence-booking`), owned by @architect. Commit order per AGENTS.md §5; UAT
  approval before merge.

## 11. Definition of Done

- Behavior-contract §5 gates 1-7 all pass with recorded evidence (§6 above); word gate ≤616.
- ADR-004 merged (scribe); superseded AI-forward docs annotated.
- NB-41…NB-43 marked [IMPLEMENTED] in the behavior ledger after UAT.
- E2E suite green (101 existing + new), lint + build clean, i18n AM/OM no clipping.

## 12. Contract ambiguities for @architect/@vision (resolved in §13 — reconstruction, F3)

- **A1 — Payment method truth on the booking confirmation** (bank transfer vs Telebirr wording).
- **A2 — Exact plan-proposal strings** (hero subcopy, Services chip, Services meter, ladder stage
  label, /services SEO title, BandCta label).
- **A3 — /workflow-audit primary CTA destination + auto-capture modal competition.**
- **A4 — SaaS closing panel and SaaS card CTA destinations.**
- **A5 — Policy page CTA under the C-1 marketing-page rule.**
- **A6 — Booking field set + confirmation copy family + native-review flag.**
- **A7 — Support-paths block composition and prefilled-message mechanics.**
- **A8 — Pricing section order and bundle-line placement.**
- **A9 — Home word gate (616) and re-baseline path.**
- **A10 — FIVE_DAY_FLOW step 2 wording.**
- **A11 — ADR-004 brand-rename record (scribe, in-batch).**

## 13. Gate A ambiguity resolutions (@architect, under locked contract)

- **A1** — Truth-rules win: booking confirmation email lists **bank transfer (CBE Birr) as the
  active method** plus "Telebirr when activated"; Policy Telebirr line unchanged. E2E booking
  assertion asserts 'bank transfer' (already asserted at 436-437) and NOT a live-Telebirr claim.
- **A2** — Plan proposals locked as build targets: hero subcopy (≤2 sentences, software first),
  Services chip "Software builds and AI automation — scoped to the bottleneck", Services meter
  `WEB · FROM 20,000 ETB`, ladder stage label "Software development", /services SEO title
  "Services | NovaTech", BandCta label "Start Instant Quote". Exact full strings produced at
  build under owner review at UAT.
- **A3** — Primary CTA on /workflow-audit = "Book Workflow Audit" anchoring to the in-page
  `#booking` section (new AuditBookingForm). REMOVE `/workflow-audit` from
  AUTO_LEAD_CAPTURE_ROUTES in App.jsx so the auto-capture modal never competes with the primary
  booking form.
- **A4** — SaaS closing panel primary → "Book Workflow Audit"; SaaS card CTAs keep
  discovery-call destination (SaaS-specific path).
- **A5** — Policy page CTA unchanged (legal page, exempt from C-1 marketing-page rule).
- **A6** — Booking fields: Full Name / Email / Phone / Company (optional) — reuse existing form
  labels/keys where possible; confirmation copy family: "Slot held for 48 hours" + invoice +
  bank transfer details by email + human confirmation within 1 business day + guarantee line.
  EN/AM/OM, NB-09 native-review flag.
- **A7** — Support-paths block on /workflow-audit: compact scope select (Web / Mobile / SaaS) +
  budget band select + optional note input feeding pre-filled WhatsApp/Telegram messages via
  `buildWhatsAppMessageLink` (existing, unconsumed) and NEW `buildTelegramDirectLink`.
- **A8** — Pricing page: swap `#product-build-pricing` (04 · BUILDS) before
  `#ai-automation-pricing` (03 · AUTOMATION); renumber eyebrows; bundle line stays exactly once
  in BUILDS section.
- **A9** — Home word gate: trim to hold 616 first; if QA measures exceed, evidence-based
  re-baseline at Gate C per phase-9 /pricing precedent.
- **A10** — WorkflowAudit FIVE_DAY_FLOW step 2 → "where a web or mobile surface is needed".
- **A11** — ADR-004 (scribe, in-batch): records brand rename NovaTech AI → NovaTech +
  software-first prominence ruling; supersedes AI-forward framing in docs.

## 14. Reconstruction flags (Gate A accepted by @architect 2026-08-12)

- **F1** — TECH-35…41 ticket titles/scopes were reconstructed (tech-backlog.md ends at TECH-29;
  phase-9 tickets were TECH-30…34). Architect confirmed the 7-way split and mapping to
  NB-41/42/43 at Gate A review.
- **F2** — Ladder row count: RESOLVED — enumeration is authoritative (4 rows: Audit, Software
  development, AI automation, Support & maintenance); behavior contract corrected accordingly.
- **F3** — §12 ambiguity statements were reconstructed 1:1 from the §13 rulings; the rulings
  themselves are verbatim from @architect and binding.
- **F4** — `buildTelegramDirectLink` exact URL format (direct chat vs share/url) verified at
  build against Telegram's current link semantics.
- **F5** — Exact copy strings produced at build under owner review at UAT per A2.
