# Tech Backlog — Launch Readiness Sprint

> Technical execution tickets derived from `docs/behaviors/pending-behaviors.md` (NB-XX) and
> governed by `docs/behaviors/launch-readiness.md` (B-rules) and `docs/adr/ADR-001-pricing-model-etb-only.md`.
> Priority: **P0** = launch blocker · **P1** = must before launch · **P2** = after launch · **BLOCKED** = waiting on external dependency.

## Phase 1 — Proof Strip (P0)

### TECH-01 — Remove all fabricated proof content
- **Maps to:** NB-01 (B1–B3)
- **Scope:**
  - Delete `caseStudies` array and `portfolioProjects` from `src/config/contentData.js`
  - Remove/repurpose `/case-studies` and `/portfolio` routes, pages, nav links, footer links, i18n keys, and SEO metadata entries
  - Remove `HERO_METRICS` (1,800+ hours, 40+ systems, 92%) from `src/pages/Home.jsx`
  - Remove `AgentOpsShowcase` (fake demo) and `AutomationImpactCalculator` (implied benchmarks) sections from the homepage, or gate them behind a real-system flag
  - Purge all case-study/portfolio i18n translations (EN/AM/OM)
- **Acceptance:** No fabricated client story, testimonial, portfolio item, aggregate stat, or simulated demo remains anywhere in the rendered site, sitemap, or metadata.

## Phase 1 — Pricing Engine Swap (P0)

### TECH-02 — Locked ETB pricing table + remove USD display
- **Maps to:** NB-02, NB-03 (B4–B9, B11, B12)
- **Scope:**
  - Replace `src/services/pricingData.js` arrays with the ADR-001 table: audit 85,000 fixed; AI tiers from 250k/750k/1.5M+; web from 45k/150k/250k; mobile from 200k/400k; AI support 30–70k/mo; maintenance 5–15k/mo
  - Strip all `globalPrice`/`global*` fields and USD columns from rendered pages (Pricing, WebDevelopment, MobileDevelopment, AdditionalServices, guide summary)
  - Replace "Global USD + local ETB" chips and "ETB and USD pricing" trust pills with ETB-only messaging; international = "quoted individually"
  - Remove `MARKETING_ADDONS`/`APP_MARKETING_PACKAGES` from the pricing page (marketing cut per B12); SaaS packages render as waitlist only (B11)
  - Remove money-losing lines: app-store "About 4,500 ETB / year" and annual maintenance 10–20k/year
- **Acceptance:** Every price rendered on every page matches ADR-001; no USD figure appears anywhere; no marketing retainer or priced SaaS line exists.

### TECH-03 — Policy page payment terms rewrite
- **Maps to:** NB-04, NB-07 (B13–B15)
- **Scope:**
  - Replace marketing/card-handling policy blocks with: payments by bank transfer (CBE Birr) only until license; Telebirr/Chapa/cards post-license (B25 note)
  - Verify milestone 40/30/30 + IP ownership copy is accurate (B14)
  - Remove the 15–20% international card handling block (B15)
- **Acceptance:** Policy page states bank-transfer-only payment and the post-license plan; no capability the business lacks is claimed.

## Phase 2 — Conversion Consistency (P0)

### TECH-04 — Unify instant quote wizard with pricing table
- **Maps to:** NB-05 (B16–B17)
- **Scope:**
  - `InstantQuotePage.jsx`: replace hardcoded `SERVICE_BASE_RANGES` with ranges derived from the same pricing data source as the pricing page (share a single source module)
  - Align budget options with the entry offer: remove "Under 50k ETB" or re-map it to guide toward the audit (B17)
  - Ensure wizard output for a given scope matches published package prices
- **Acceptance:** Same scope in wizard and pricing page produces the same numbers; wizard can no longer quote below the entry offer.

### TECH-05 — Founding-client pilot offer
- **Maps to:** NB-06 (B10)
- **Scope:**
  - Add pilot copy: first three implementation projects at 15–20% off, exchanged for case study rights + testimonial + referral
  - Place on homepage (replacing removed proof section), pricing page CTA area, workflow audit page
  - i18n keys for EN/AM/OM; analytics event `pilot_offer_cta_clicked`
- **Acceptance:** A visitor can find the founding-client offer on at least two pages, in all three languages, with the exchange terms stated.

## Phase 3 — Design Redesign (P1)

### TECH-06 — Design system overhaul (mandatory skill: `design-taste-frontend`)
- **Maps to:** NB-08 (B20–B22)
- **Scope (per skill rules):**
  - Replace dark-navy/blue/teal token palette with neutral base + ONE desaturated accent; no AI blue/purple
  - Remove glassmorphism as default surface (kill `glass-card` overuse; keep elevation only where hierarchy requires)
  - Break equal 3-column card grids (asymmetric grids / zig-zag / varied spans)
  - Restyle gradient CTA buttons to solid desaturated with inner-border states
  - Keep Space Grotesk / Manrope / JetBrains Mono; `min-h-[100dvh]` over `h-screen`; transform/opacity-only animation
- **Acceptance:** The site no longer reads as a dark-glass AI template; skill rules hold on all pages, all breakpoints.

## Phase 4 — Copy Humanization (P1)

### TECH-07 — Copy humanization pass EN/AM/OM
- **Maps to:** NB-09 (B23)
- **Scope:**
  - Rewrite FAQ answers so openings vary (no uniform "Yes." pattern)
  - Remove filler words (elevate, seamless, unleash, next-gen, unlock) across copy
  - Vary section rhythms; remove placeholder-sounding names/numbers (e.g., "Hana Bekele" placeholder, "team@company.et")
  - Audit Amharic and Afaan Oromo translations for the same tells
- **Acceptance:** A reader cannot find the listed AI tells in any language; copy reads local and specific.

## Phase 5 — Ops & Launch Config (P1)

### TECH-08 — Lead delivery verification
- **Maps to:** NB-10 (B18–B19)
- **Scope:** Verify lead intake + mailing-list flows store and forward to a working inbox; verify discovery-call booking flow; confirm fallback behavior; align SLA copy (1-day response / 3-day discovery / 5-day proposal)
- **Acceptance:** A test submission through each form is stored, forwarded, and confirmed; no silent loss path remains.

### TECH-09 — Contact & launch configuration hardening
- **Maps to:** NB-13, NB-14 (ops)
- **Scope:** Domain email decision + swap in siteConfig/env; confirm canonical domain, robots.txt, sitemap.xml, SiteSpeak bot ID, analytics endpoint/GA4, webhook targets
- **Acceptance:** All production env values verified on the real domain; no personal Gmail remains as primary contact.

### TECH-10 — Pricing guide PDF sync
- **Maps to:** NB-12
- **Scope:** Human diff PDF vs new ETB table; regenerate PDF if divergent (out of repo — flag to owner)
- **Acceptance:** PDF matches the site table exactly, or a regeneration task is queued to the owner.

## Phase 6 — Post-Launch (P2)

### TECH-11 — Real internal lead-pipeline demo system
- **Maps to:** NB-11 remainder (B3)
- **Scope:** Build a real internal system (lead triage/follow-up automation on the business's own pipeline); record a real run; publish as the demo/case-study replacement
- **Acceptance:** The demo shown to visitors is a real running system with real data.

### TECH-12 — Marketing launch kit rewrite
- **Maps to:** NB-17
- **Scope:** Rewrite `docs/marketing-launch-kit.md` to contract-first, published-prices, payment-reliability positioning; remove fabricated proof references; add pilot program
- **Acceptance:** Launch kit contains no claim the site cannot prove.

### TECH-13 — QA checklist completion
- **Maps to:** NB-16
- **Scope:** Complete manual route walkthroughs, accessibility checks, analytics spot-checks
- **Acceptance:** `docs/qa-checklist.md` fully checked.

## Deferred

### TECH-14 — Post-license payment rails (BLOCKED on business license)
- **Maps to:** NB-15 (B25)
- **Scope:** Telebirr merchant + Chapa integration, tax/invoice reflection, USD rail evaluation
- **Acceptance:** Enabled only after license is secured; site then reflects real capabilities.
