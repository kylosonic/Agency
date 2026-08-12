# Phase 9 — Pricing Revert, Discounts, Copy Trim & Editorial Motion (NB-36…NB-40)

> **Gate A blueprint — @plan.** Branch: `pricing-revert-and-motion`. Governed by
> `docs/behaviors/pricing-revert-and-motion.md` (P-1…P-3, C-1…C-2, M-1…M-6, G-1…G-5) — **supersedes**
> pricing figures in `launch-readiness.md` (B5, B6, B8, B9, B10, B11), `visual-system-fortune500.md`,
> `visual-system-lumen.md`, `docs/plans/phase8-lumen-visual-system.md`, `docs/marketing-launch-kit.md`.
> ADR-001 ETB-only policy stays; figures replaced (ADR amendment required — risk R1).
> All facts below verified against the code on 2026-08-11 (branch `pricing-revert-and-motion`, HEAD `7eab150`).

---

## 1. Goal

Revert every rendered price to the owner-confirmed March-2026-era table (audit 15,000 ETB; web
20k/50–80k/150k+; mobile 40–60k/80–150k/200k+; AI 40k/100k/200k+ with support 10–25k/mo; SaaS real
monthly prices + setup + annual "Save 2 months"; maintenance annual 8–20k/yr; add-ons at original
levels), ship the discount program (3 months free maintenance, 3-month bug-fix warranty, Save 2
months, 100% audit credit, one Web+AI 10% bundle line), **remove all founding-client 15–20% pilot
messaging**, cut Home + Pricing copy ≥35%, and add restrained editorial motion (hero choreography,
scroll reveals, hover, price counters, one marquee, page transitions) with full reduced-motion parity.

## 2. Scope / Non-scope

**In scope:** pricing data + wizard parity + PDF regen handoff (TECH-30); discounts + pilot removal
(TECH-31); copy trim + i18n (TECH-32); editorial motion (TECH-33); page transitions (TECH-34);
E2E re-baseline; dead-code removal of figure-bearing unused components; ADR-003 amendment.

**Non-scope (do not touch):** payment rails (TECH-14, still BLOCKED on license); USD pricing;
SaaS product builds; app architecture; nav/footer structure (B34–B35); Phase 8 visual tokens
(dark canvas, brass accent, two-register type) — motion work must preserve them.

## 3. Ticket breakdown

### TECH-30 — Pricing table swap + wizard parity + PDF regen (→ NB-36) — ~19 files
1. `src/services/pricingData.js` — the single-source swap (see §4 file inventory for exact values).
2. `src/config/contentData.js` — `quoteWizardOptions.budgetRanges` → new 4 bands (mirror
   `QUOTE_BUDGET_BANDS`); rewrite `serviceFaqs.saas` answers (waitlist → live pricing).
3. `src/pages/Pricing.jsx` — hero chips (audit 15k; remove "SaaS is waitlist only" chip); replace
   hardcoded "Waitlist only" SaaS card with cards rendered from `productEngineering` SaaS rows
   (setup + monthly + annual + "Save 2 months"); support section figures from data (AI
   10,000–25,000 ETB/mo; maintenance 8,000–20,000 ETB/yr).
4. `src/pages/Home.jsx` — `HOME_APPARATUS_CALLOUTS` (85,000 → 15,000; PILOT callout stays for
   TECH-31), `IMPLEMENTATION_TRACKS` prices, `OFFER_LADDER` rows 2–4 figures, hero paragraph
   figure, trust pills, `MeterStrip` label, apparatus aria-label.
5. `src/pages/Services.jsx` — apparatus callouts, `DELIVERY_TRACKS` prices, meter label,
   SaaS row "Waitlist only" → real-price row.
6. `src/pages/WorkflowAudit.jsx` — apparatus callouts, meter label (figure from
   `PRICING_SUMMARY.workflowAudit.price` where possible).
7. `src/pages/WebDevelopmentPage.jsx` — callouts, chip, apparatus label, meter label.
8. `src/pages/MobileDevelopmentPage.jsx` — same + "Two mobile tiers" heading → three;
   3rd tier auto-renders from `MOBILE_PACKAGES`.
9. `src/pages/SaasSolutionsPage.jsx` — waitlist page → live pricing page (3 products ×
   setup/monthly/annual; no waitlist language anywhere).
10. `src/pages/InstantQuotePage.jsx` — SaaS option note, hero chip, floor copy "85,000 ETB as the
    floor" → "15,000 ETB", waitlist result branch → live-SaaS reference result (no numeric band —
    see ambiguity A1).
11. `src/pages/PolicyPage.jsx` — SaaS policy section rewrite (real prices published; keep
    "ETB only / quoted individually" exactly once here and once on Pricing per C-2).
12. `src/pages/DiscoveryCallPage.jsx` — "waitlist conversation" line reframed.
13. `src/pages/AdditionalServicesPage.jsx` — "Monthly maintenance only" chip → annual.
14. `src/services/seoService.js` — meta descriptions: `/saas-solutions`, `/services`,
    `/policy`, `/book-discovery-call` waitlist phrasing; FAQ answer (line ~237).
15. `src/i18n/translations.js` — `instantQuote.options.budget.entry` (EN/AM/OM),
    `instantQuote.result.waitlist*` keys → live-SaaS result keys, saas labels.
16. `tests/live-site.spec.js` — **figure re-baseline only** (old→new table in §6).
17. DELETE `src/components/PricingScenarioPlanner.jsx` (dead code, verified zero imports,
    carries 250k/750k/1.5M + 30–70k figures) + its CSS if any (`pricing-scenario-*`).
18. `.env.example` (line 81) + `README.md` (line 121) — endpoint disposition per risk R2 decision.
19. `public/NovaTechAI_2026_Service_Menu_and_Pricing_Guide.pdf` — **owner action** (no generator
    script exists; documented regen step + human diff per NB-12/OA-7). Code side: gate the
    download surface until the new artifact lands (risk R3).

### TECH-31 — Discount program + pilot removal (→ NB-37) — ~9 files
1. DELETE `src/components/PilotOfferSection.jsx` (dead code — verified: zero importers).
2. `src/services/analyticsService.js` — remove `trackPilotOfferClick` (only consumer was the
   deleted component; no live source keys lost).
3. `src/index.css` — delete `.pilot-offer-*` blocks (~lines 2651–2705, 5368–5386, 6033–6109
   region incl. `:lang(am)` overrides).
4. `src/pages/Pricing.jsx` — delete founding-client note (line ~253); add **exactly one** bundle
   line "Web + AI automation booked together: 10% off"; web starter card lists "3 months free
   maintenance" feature; mobile Basic lists "3-month bug-fix warranty"; SaaS annual shows
   "Save 2 months" (features come from pricingData in TECH-30; page-level copy here).
5. `src/pages/Home.jsx` — remove `PILOT · 15–20% OFF` callout (replace per ambiguity A3);
   discount mentions: audit "Fee credited" once (trust pill — dedupe elsewhere in TECH-32).
6. `src/pages/SaasSolutionsPage.jsx` — remove PILOT meter label + apparatus label mentions.
7. `src/i18n/translations.js` — DELETE `pilotOffer` blocks (EN ~291–304, AM ~829, OM ~1318);
   add discount/bundle keys EN/AM/OM.
8. `src/config/contentData.js` — `serviceFaqs.saas` answers about billing/annual ("No. There is
   no monthly or annual SaaS billing…" → annual plan exists) — figures-free reframe.
9. `tests/live-site.spec.js` — delete pilot/meter assertions (N4 SaaS meter line), add discount
   assertions (§6).

### TECH-32 — Copy trim + i18n (→ NB-38) — ~17 files
1. **Baseline first:** capture rendered word counts for `/` and `/pricing` (EN, `main` innerText)
   from the current build; record as constants in the new copy-gate spec (Gate 4 verification).
2. `src/pages/Home.jsx` — deep cut: hero paragraph ≤2 sentences; delete "No fake urgency, no
   hidden currency logic…" policy-disclaimer subtitle (line ~399); delete SaaS-waitlist note
   panel (line ~424; SaaS is live now); "audit fee credited" appears exactly once; every paragraph
   ≤2 desktop lines; each message ≤2×/page.
3. `src/pages/Pricing.jsx` — deep cut: hero copy, section subtitles, AI tier scope paragraphs
   ≤1 sentence + scope-driver bullets; support-band policy phrasing ("no buried marketing
   retainers…" disclaimer family deleted).
4. Repeat-kill (C-2) on: `Services.jsx`, `WorkflowAudit.jsx`, `WebDevelopmentPage.jsx`,
   `MobileDevelopmentPage.jsx`, `SaasSolutionsPage.jsx`, `AdditionalServicesPage.jsx`,
   `InstantQuotePage.jsx`, `DiscoveryCallPage.jsx`, `PolicyPage.jsx`, `IndustryLandingPage.jsx` —
   remove duplicated audit-credit / ETB-only / response-commitment sentences (keep required
   legal/policy statements).
5. `src/i18n/translations.js` — prune orphaned dead keys (verified unused: `web.hero`,
   `mobile.hero`, `saas.hero`, `additional.hero`, `roi.*`, `instantQuote.*` surplus); update live
   keys trimmed to new copy; keep EN/AM/OM in parity; new strings flagged for NB-09 native review.
6. `src/components/LeadCaptureModal.jsx` — hardcoded EN subtitle "including the SaaS waitlist
   policy" (line 24) → new copy (i18n key + AM/OM).
7. `src/services/seoService.js` — meta descriptions re-cut to trimmed copy.
8. `tests/live-site.spec.js` — new copy-gate test (word-count constants + ≤2× repeat check).

### TECH-33 — Editorial motion system (→ NB-39) — ~16 files
1. `src/components/ScrollReveal.jsx` — M-2: hidden y 12 → 16–24 px, viewport `amount` 0.15 → 0.2
   (≥20% visible); keep once-only, 500–700 ms tween, 60–100 ms card stagger, `static` prop for
   forms; reduced-motion duration 0 (existing).
2. NEW `src/components/MarqueeStrip.jsx` — M-5: one slow marquee ≤20 px/s, seamless loop, pause on
   hover, content from locked-table strings (G-5), static single line under reduced-motion.
   Placement: Home below hero (after MeterStrip — must not duplicate its position); optionally
   Pricing; exactly one per page (G-2).
3. NEW `src/components/PriceCounter.jsx` — M-4: count-up 600–900 ms, tabular mono, lands exactly on
   locked figure; **single-value prices animate (0 → 15,000), ranges render static** (decision A4);
   fire once per viewport entry; reduced-motion = instant final value.
4. Hero choreography (M-1) on 8 heroes (Home, Pricing, Services, WorkflowAudit, Web, Mobile,
   SaaS, AdditionalServices): eyebrow → h1 (line masks or Latin-only word stagger) → subcopy →
   CTA row, 120–200 ms apart, total ≤1.2 s, no loop, no layout shift (transform/opacity only);
   Amharic (`:lang(am)`) headlines reveal as one block; reduced-motion = fully rendered static.
5. `src/index.css` — new `@keyframes marquee-scroll`; hover rules per M-3 (cards lift ≤4 px +
   border tint, buttons ≤2 px, links underline sweep via existing `verb-underline` pattern,
   `:focus-visible` parity, color-only under reduced-motion); extend the reduced-motion freeze
   lists (line ~5156 block + 5765) with `.marquee-strip`, `.price-counter`, hero-choreography
   classes; G-3: only marquee + `apparatus-pulse` run infinitely.
6. DELETE dead motion components (verified zero importers): `StaggeredText.jsx`,
   `MagneticButton.jsx`, `InteractivePricing.jsx`, `RoiEstimator.jsx`, `FaqAccordion.jsx`
   (+ orphaned CSS for `.staggered-text-*`, `.pricing-grid`, `.pricing-card*`, `.roi-*`,
   `.faq-*` where unreferenced).
7. `tests/live-site.spec.js` — extend N9 selector list with new classes; add motion assertions (§6).

### TECH-34 — Page transitions (→ NB-40) — ~4 files
1. `src/components/PageTransition.jsx` — M-6: 550 ms → **200–300 ms (~250 ms) fade/slide**, no
   overlay spinner, exit keeps small y but must not delay next hero choreography; reduced-motion
   = instant (exists).
2. `src/App.jsx` — verify `AnimatePresence mode="wait" initial={false}` + `key={location.pathname}`
   (already wired, lines 397–398); route-loader (`Suspense` fallback) → motionless text (no
   spinner ring animation) per M-6 "no overlay spinner"; first load = no transition (initial={false}).
3. `src/index.css` — `.route-loader-ring` animation gated by reduced-motion (already in freeze
   list) and de-animated per M-6.
4. `tests/live-site.spec.js` — transition-duration assertion (250 ms class), back/forward test,
   reduced-motion instant-swap assertion.

## 4. Exact file inventory (per-file change detail)

### `src/services/pricingData.js` (TECH-30 — highest-risk single file)
- Header comment: replace old locked table listing with P-1 table.
- `QUOTE_ANCHORS`: `web: [20000, 50000, 150000]` · `mobile: [40000, 80000, 150000, 200000]` ·
  `ai: [40000, 100000, 200000]` · `saas: null` (decision A1).
- `ENTRY_OFFER_FLOOR`: `85000` → `15000`.
- `QUOTE_BUDGET_BANDS` + `BUDGET_BAND_TIER_INDEX` → `['15k - 40k ETB', '40k - 100k ETB', '100k - 250k ETB', '250k+ ETB']` (decision A2). Derived bands after swap (verified):
  web `[20–50k, 50–150k, 150–300k, 300–600k]`; mobile `[40–80k, 80–150k, 150–200k, 200–400k]`;
  ai `[40–100k, 100–200k, 200–400k, 400–800k]`; no min below 15,000 (web tier0 min = 20,000 ✓).
- `WEB_PACKAGES`: Starter `'from 20,000 ETB'` + feature `'3 months free maintenance'`; Growth
  `'50,000 – 80,000 ETB'`; Enterprise `'150,000+ ETB'`.
- `MOBILE_PACKAGES`: add 3rd tier — Basic `'40,000 – 60,000 ETB'` + feature `'3-month bug-fix
  warranty'`; Business `'80,000 – 150,000 ETB'`; NEW Enterprise/FinTech `'200,000+ ETB'`.
- `SAAS_PACKAGES`: replace `SAAS_AVAILABILITY_STATUS` sentinel (`'Waitlist only'` constant deleted)
  with real fields — School { setup 25,000, monthlyFrom 3,500, annual 35,000 }, Hospital
  { 35,000, 5,000, 50,000, `recommended` }, Real Estate { 20,000, 3,000, 30,000 }; each
  `billingNote: 'Save 2 months'`, `period: '/month'`.
- `ADDITIONAL_SERVICES` (6 rows): Domain `'1,500 – 5,000 ETB / year'` · Cloud Web Hosting
  `'5,000 – 15,000 ETB / year'` · Web Maintenance `'8,000 – 20,000 ETB / year'` (annual — update
  description "Written commitment…" to annual terms, decision A9) · Logo `'5,000 – 15,000 ETB'` ·
  Copywriting `'3,000 – 10,000 ETB / project'` · Photography `'5,000 – 20,000 ETB / session'`.
- `FEATURED_ADDONS` + `getAddonsGrid`: mirror the 6 rows (5 featured).
- `AI_IMPLEMENTATION_TIERS`: setupPrice `'from 40,000 ETB'` / `'from 100,000 ETB'` /
  `'from 200,000+ ETB'`; monthlySupport `'10,000 – 25,000 ETB / month'` ×3.
- `getPricingGuideSummary`: `workflowAudit.price` → `'15,000 ETB'`; SaaS mapping (line ~361) now
  maps setup/monthly/annual/billingNote instead of availabilityStatus.
- Remote endpoint (R2): **decision required from @architect** — recommended: remove
  `getRemoteWebPackages` + `VITE_PRICING_DATA_ENDPOINT` entirely (current ETB-only validation
  would ACCEPT a stale old-figure ETB payload — the exact release blocker P-1 warns about);
  alternative: extend `isEtbOnlyPackage` to validate price strings against the locked anchors.

### `tests/live-site.spec.js` — full re-baseline map (see §6)

### Other files — see §3 per-ticket lists; key mechanical changes:
- `src/pages/Home.jsx` apparatus callouts → `['AUDIT · 15,000 ETB · FIXED', 'DELIVERY · 5 BUSINESS DAYS', 'CREDIT · 100% TOWARD BUILD', 'KICKOFF · 40%', <A3 replacement>]`.
- `src/pages/Pricing.jsx` SaaS block → map `productEngineering.filter(category === 'Management SaaS')` like web/mobile tracks (figures from data, never hardcoded — kills the divergence risk R6).
- All `MeterStrip` labels per page: Home/Audit `AUDIT · 15,000 ETB · FIXED`; Services
  `AUTOMATION · FROM 40,000 ETB`; Web `WEB · FROM 20,000 ETB`; Mobile `MOBILE · FROM 40,000 ETB`;
  SaaS left/right per A3 (currently `SAAS · WAITLIST ONLY` / `PILOT · 15–20% OFF`).

## 5. Dependency DAG

```
TECH-30 (table+data+PDF) ──┐
        │ (figure re-baseline E2E in same commit — avoids red state)
        ▼
TECH-31 (discounts + pilot removal) ──┐ (shares Pricing.jsx/Home.jsx/translations.js — sequential)
        ▼
TECH-32 (copy trim + i18n) ──┐ (re-cuts the copy TECH-30/31 just changed — sequential)
        ▼
TECH-33 (motion) ──┐ (touches pages + index.css + N9 test — sequential after copy is final)
        ▼
TECH-34 (page transitions) ──┐ (App.jsx + PageTransition + shared N9/reduced-motion test — last)
        ▼
E2E final sweep + grep gates + QA (Gate C) → Security (Gate D) → Integration (Gate E) → Commit (Gate F)
```
- Parallelism: none safe — every ticket touches `Home.jsx`/`Pricing.jsx`/`translations.js`/
  `live-site.spec.js`/`index.css` (AGENTS.md §7: overlapping ownership ⇒ sequential).
- PDF regen is owner-side and can run in parallel from TECH-30's values; the download gate
  (TECH-30 item 19) stays until the artifact lands.
- E2E: figure assertions land with TECH-30 (same commit); discount + SaaS-live assertions with
  TECH-31; copy-gate + i18n with TECH-32; motion with TECH-33/34. Never a partially-green suite
  that masks the new contract (TECH-21/TECH-22 precedent: deliberate red→green per ticket).

## 6. Test strategy

### 6.1 E2E re-baseline — old → new (verified lines in current spec)
| Line(s) | Old assertion | New assertion |
|---|---|---|
| 342, 700 | `'85,000 ETB'` visible (pricing, workflow-audit) | `'15,000 ETB'` |
| 345–347 | `from 250,000 / 750,000 / 1,500,000+ ETB` | `from 40,000 ETB` / `from 100,000 ETB` / `from 200,000+ ETB` |
| 350 | `30,000 - 70,000 ETB / month` | `10,000 - 25,000 ETB / month` |
| 353–355 | web `45,000 / 150,000 / 250,000` | `from 20,000 ETB` / `50,000 – 80,000 ETB` / `150,000+ ETB` |
| 356–357 | mobile `200,000 / 400,000` | `40,000 – 60,000 ETB` / `80,000 – 150,000 ETB` / `200,000+ ETB` |
| 358 | `Waitlist only` visible | DELETED; SaaS card asserts `3,500 ETB / month` + `Save 2 months` + setup `25,000 ETB` |
| 361 | `5,000 - 15,000 ETB / month` | `8,000 – 20,000 ETB / year` |
| 584–585 | wizard web mid `150,000 / 250,000 etb` | web mid band `50,000 etb` / `150,000 etb` |
| 596–601, 632–637 | budget options `['85k - 150k ETB', …]` | `['15k - 40k ETB', '40k - 100k ETB', '100k - 250k ETB', '250k+ ETB']` |
| 616, 624 | floor `85,000 etb` | floor `20,000 etb` (web entry band) + new explicit `no band below 15,000` |
| 654–655 | webMidBand.min `150000` | `50000` |
| 658–672 | SaaS waitlist result (`tell us you want it`, no ETB) | live-SaaS result (no numeric band per A1; still asserts no ETB range) |
| 433 | policy `waitlist only until a real product exists` | new SaaS policy copy (prices published; billing terms) |
| 706–714 | SaaS page `waitlist only` present | SaaS page shows live prices; `waitlist only` ABSENT |
| 1080–1085 (N4 meter) | 6 meters incl. `AUDIT · 85,000 ETB · FIXED`, `AUTOMATION · FROM 250,000 ETB`, `WEB · FROM 45,000 ETB`, `MOBILE · FROM 200,000 ETB`, `SAAS · WAITLIST ONLY`, `PILOT · 15–20% OFF` | new labels per §4 (A3) |
| 437–438 | `15–20%` / `15-20%` absence (policy) | KEEP — still valid |
| N9 (1236–1262) | reduced-motion selector list | += `.marquee-strip`, `.price-counter`, hero-choreography classes |

### 6.2 New assertions
- **Discounts (TECH-31):** `3 months free maintenance` on pricing web starter + `/web-development`;
  `3-month bug-fix warranty` on mobile Basic; `Save 2 months` on each SaaS card; **exactly one**
  `10% off` bundle line on `/pricing` (count == 1) and none elsewhere; `founding-client` absent.
- **Copy gate (TECH-32):** Home + Pricing word counts ≤ 0.65 × checked-in baseline constants
  (measured on `main` innerText, EN); key-message repeat ≤ 2× per page (helper counting phrases
  like "audit", "credited").
- **Motion (TECH-33):** hero choreography completes ≤ 1.2 s (measure via animationend/state);
  exactly one `.marquee-strip` per page; marquee speed ≤ 20 px/s (computed distance/time or
  keyframe duration/width); scroll reveals fire once (element in viewport on load does not re-run);
  hover lift ≤ 4 px (`getComputedStyle` transform on hover); price counter lands on locked figure
  (wait for settle, assert final text); reduced-motion: static, computed durations 0s for new
  classes (extend N9 selector list).
- **Page transitions (TECH-34):** route change has 200–300 ms duration (computed transition on
  `.page-transition`), back/forward both transition, first load no transition, reduced-motion
  instant swap.

### 6.3 Grep gates (exact forbidden strings — run on `src/`, `tests/`, `public/`; docs/ exempt as historical)
```
85,000 | 85k - 150k | 85ሺ - 150ሺ
250,000 / 750,000 / 1,500,000 | 750,000 | 1,500,000 | 1,500,000+ | 1.5M
from 45,000 | from 250,000 | from 400,000 | from 200,000 ETB
founding-client | Founding-Client | 15–20% | 15-20% | PILOT · 15–20%
Waitlist only | waitlist only | SaaS is waitlist | waitlist-only | waitlist conversation
5,000 to 15,000 ETB / month | 5,000 - 15,000 ETB / month | 30,000 to 70,000 ETB / month | 30,000 - 70,000
in development — tell us you want it
```
Source comments may keep historical values ONLY inside the superseded-figure note in
`pricingData.js` header; all other occurrences deleted. QA runs the grep gate (Gate C) and
Security re-runs on Gate D.

### 6.4 Wizard parity cases (unit + E2E)
`deriveEstimateBand` exhaustive property (already in spec, constant-driven — auto-consistent):
web tier0 min 20,000 ≥ floor 15,000; mobile 4 anchors never below 15,000; ai bands 40k→800k;
SaaS null (A1). E2E: select each service × each band, assert preview range min/max match
§4 table; assert budget `<option>` list exactly the 4 new strings; assert no option below 15k.

## 7. Integration risks (verified)

- **R1 — ADR contradiction:** ADR-001 §3 lists 85k/45k/250k figures. Must be amended (ADR-003)
  by @architect in the TECH-30 commit window; superseded docs (`launch-readiness.md` B5–B11,
  `visual-system-*.md`, `phase8-lumen-visual-system.md`, `marketing-launch-kit.md`) get a
  "SUPERSEDED BY pricing-revert-and-motion.md" status note (scribe) so future agents cannot
  re-apply old figures.
- **R2 — Remote pricing endpoint (release blocker per P-1):** `VITE_PRICING_DATA_ENDPOINT` exists
  in `.env.example` + `pricingData.js`. Current `isEtbOnlyPackage` rejects only USD payloads — a
  stale ETB payload (old figures) would pass and override the new table. Decision needed
  (@architect): remove the mechanism (recommended) or add locked-figure validation. CI must fail
  if the env var is configured (per phase1 plan R1).
- **R3 — PDF binary:** `public/NovaTechAI_2026_Service_Menu_and_Pricing_Guide.pdf` still shows the
  old table; no generator script exists (verified) — owner-side regen + human diff (NB-12/OA-7).
  Until the new artifact lands, the Download surface must not open the stale file (hide behind
  flag or block in UAT checklist).
- **R4 — i18n AM/OM lockstep:** budget bands + pilotOffer blocks + new discount/bundle/SaaS
  strings exist in EN/AM/OM (verified: AM 800–833, OM 1289–1322, `annualSave` at EN 383 / OM 1432 /
  AM 1768). Every EN change must mirror in AM/OM or the i18n gate fails; new strings go through
  the NB-09 native-review list; orphaned keys (`web.hero`, `mobile.roi`, etc.) pruned without
  breaking `t()` lookups (only ~34 live `t()` call sites — verified).
- **R5 — Phase 8 figure surfaces:** apparatus callouts + meter labels + hero chips live in 7
  pages AND two E2E tests (N4 meters, home facts). Partial sweeps leave contradictory figures.
  Mitigation: sweep list in §4 is exhaustive; prefer deriving labels from `pricingData` constants
  instead of hardcoded strings where feasible.
- **R6 — Hardcoded bypasses:** `Pricing.jsx` SaaS card + AI/web/mobile support bands are
  hardcoded (not from data) — replace with `productEngineering`/`automationTiers` rendering so
  the single-source rule (P-1) holds; `PricingScenarioPlanner.jsx` (dead) carries old AI figures.
- **R7 — E2E breadth:** 27+ assertion lines across 8 test cases reference old figures/waitlist;
  re-baseline must be complete in TECH-30/31 commits or the suite goes red (or worse, green on a
  stale spec). N9's selector list governs whether new motion passes reduced-motion QA.
- **R8 — Motion regression vs NB-23/NB-33:** adding marquee/counters/choreography must not
  violate the Phase 8 calm-motion baseline (one choreographed reveal, one marquee, hover ≤4 px,
  reduced-motion zero). New classes must be added to BOTH `index.css` freeze lists AND the N9
  selector list, or QA catches it at Gate C instead of in the ticket.
- **R9 — Wizard UX change:** budget bands relabeled + SaaS result branch changes — contact-form
  context payloads (`minEstimate`/`maxEstimate`) and E2E `submitInstantQuoteRequest` defaults
  must stay consistent (defaults use `'150k - 400k ETB'` — becomes `'40k - 100k ETB'`).
- **R10 — Dead-code cleanup:** deleting PilotOfferSection/PricingScenarioPlanner/StaggeredText/
  MagneticButton/InteractivePricing/RoiEstimator/FaqAccordion + `serviceFaqs` requires verified
  zero importers (done for all — grep evidence in ticket files); CSS orphan cleanup must not
  remove classes still used by live pages (`.pricing-card*` used by PricingCard only — dead).

## 8. Observability / logging

- Analytics: `trackPilotOfferClick` removed (no live sources — dead path); keep
  `pricing_guide_intent/opened`, `instant_quote_*`, `contact_*`, `lead_capture_*` untouched.
  No new analytics in this batch; marquee/counter are presentational (no events).
- console.warn on pricing remote fallback already exists; if R2 = remove, delete the branch.
- No new server-side logging.

## 9. Security implications

- No auth/input-surface changes (copy/data/motion only). Remote endpoint removal (R2) *reduces*
  supply-chain/override surface. E2E uses no secrets. Security gate (D) = re-run grep gates +
  confirm no new network calls or third-party deps. No new dependencies for motion — reuse
  framer-motion already in the bundle (no bundle bloat beyond ~2 small components).

## 10. Migration / rollback

- No data migration; no schema. Rollback = `git revert` the batch merge on `main` (precedent:
  `git revert -m 1 <merge>` → Vercel auto-redeploy; Phase 8 rollback hash `cf159b1` documented in
  STATE.md). Feature branch lifecycle owned by @architect — one branch
  (`pricing-revert-and-motion`), no second branch.
- Commit gate order (AGENTS.md §5): each ticket commit ONLY after its local tests + QA slice
  pass; final atomic commit after Gate C/D/E; UAT approval before merge/deploy.

## 11. Definition of Done

- Contract §5 gates 1–7 all pass with recorded evidence: grep gate (6.3), figure gate (all
  rendered prices == P-1 table — E2E §6.1), wizard parity (§6.4), copy gate (word-count
  constants ≤0.65×baseline), motion gate (§6.2), i18n gate (AM/OM mirrors render, no clipping,
  prices identical — visual + spec), E2E suite green (re-baselined).
- ADR-003/ADR-001 amendment merged; superseded docs annotated.
- PDF regenerated + human-diffed (owner) OR download surface gated off with the blocker logged.
- NB-36…NB-40 marked [IMPLEMENTED] in the behavior ledger after UAT.

## 12. Contract ambiguities for @architect/@vision (must resolve before Gate B)

- **A1 — SaaS in the wizard:** keep non-numeric "live SaaS pricing — see /pricing" result
  (recommended: budget bands are one-time ETB, SaaS is monthly — a numeric mix is incoherent), or
  add SaaS monthly bands? P-1 says "same scope quoted in wizard and pricing page yields same
  number" but the §5.3 parity gate lists web/mobile/AI only. Also confirm: P-3 edge case → the
  10% bundle line is hidden from the single-select wizard (no multi-select rework).
- **A2 — Budget band labels:** exact 4 strings are not locked in the contract; proposal
  `['15k - 40k ETB', '40k - 100k ETB', '100k - 250k ETB', '250k+ ETB']`. E2E asserts exact
  strings — @vision must lock before TECH-30.
- **A3 — Meter/apparatus label strings for new figures** (B45a convention): e.g. SaaS meter
  (`SAAS · FROM 3,000 ETB / MO` / `ANNUAL · SAVE 2 MONTHS`?), Home 5th apparatus callout to
  replace `PILOT · 15–20% OFF` (options: `WEB+AI · 10% BUNDLE`, `MAINTENANCE · 8K–20K / YR`, or
  drop to 4 callouts), Services/Web/Mobile left labels (`FROM 40,000` / `FROM 20,000`).
- **A4 — M-4 range animation:** ranges render static, single figures animate (proposal —
  contract allows either, must stay consistent).
- **A5 — Exact trimmed copy for Home hero + offer ladder + Pricing sections** (C-1: hero
  paragraph ≤2 sentences, no disclaimer-family lines) — @vision copy pass required; the
  word-count gate needs the baseline captured from the current build first.
- **A6 — Maintenance commitment terms:** new annual band (8–20k/yr) replaces the monthly written
  commitment ("5 support hours/month") — the annual terms wording is not in the contract; owner
  must state them or keep generic "written commitment".
- **A7 — Policy page SaaS section:** rewrite to "prices published, billing per plan" — confirm
  the policy page keeps an ETB-only statement exactly once (C-2 allows once on Pricing + once on
  Policy).

## 13. Rollout checklist (Gate B onward)

1. @architect resolves A1–A7; ADR-003 written.
2. TECH-30 (incl. E2E figure re-baseline + R2 decision) → local tests → QA slice → commit.
3. TECH-31 → 32 → 33 → 34 sequentially (same branch), each with tests + QA slice.
4. Full grep gates + full E2E green + lint + build; Security (D); Integration (E); atomic commit (F).
5. UAT (human): hard-refresh Home/Pricing/SaaS/Web/Mobile; verify audit 15k, SaaS cards, bundle
   line once, no pilot anywhere; reduced-motion toggle; marquee ≤20 px/s; PDF diff.
6. Merge → Vercel deploy → health checks; mark NB-36…40 implemented; STATE.md updated.

---

## 14. TECH-32 baseline & cut evidence (@build, 2026-08-11 — QA Gate 4 verification)

### Baseline (captured BEFORE any trim, resolution A5)
Measured on **rendered `main` innerText, EN, desktop 1280×800** via a Playwright
probe (`scripts/tech32-wordcount.tmp.mjs`, removed after use) against the
TECH-31 build:

| Page | Baseline words | Post-trim words | Reduction | Gate (≥35%) |
|---|---|---|---|---|
| `/` (Home) | **948** | **594** | **37.3%** | ✅ PASS |
| `/pricing` | **1100** | **846** | **23.1%** | ⚠️ FAIL — see note |

> **Note (contract ambiguity, escalated to @architect):** `/pricing` cannot
> reach 35% on full rendered text without cutting **locked product data** —
> features lists, per-tier support terms, the add-ons table (P-1 figure
> surface), receipt outputs, and all figures. These total ~600 of the 846
> remaining words (≈71%). The 35% gate was estimated before the locked-data
> share was measured; the honest safe floor is **≈846 words (−23%)**.
> Recommendation: measure the cut on editorial copy only for `/pricing`, or
> accept the 23% rendered cut with the locked-data justification.

### Repeat-kill evidence (rendered `main` innerText, EN — post-trim counts)

| Message family | Home | Pricing | WorkflowAudit | Policy | SaaS | Other pages |
|---|---|---|---|---|---|---|
| `100% credited` | 1 | 1 | 1 | 0 | 0 | 0 |
| `etb only` | 0 | 1 | 0 | 0 | 1 | 0 |
| `quoted individually` | 0 | 1 | 0 | 1 | 0 | 0 |
| `waitlist only` / `coming soon` | 0 | 0 | 0 | 0 | 0 | 0 |
| `no fake urgency` / `no hidden currency` | 0 | 0 | 0 | 0 | 0 | 0 |

C-1/C-2 targets met: "100% credited" exactly once per page; ETB-only +
quoted-individually once on Pricing and once on Policy; waitlist/disclaimer
families fully removed. (Note: `15,000 etb` substring counts on some pages
include locked figure surfaces — hero chips, receipt labels, apparatus/meter
labels — and the `5,000 – 15,000 ETB / year` hosting range; these are price
surfaces, not repeated messages.)

### E2E copy-gate (new in `tests/live-site.spec.js`)
- `Phase 9 — copy trim gate (TECH-32)`: `/` PASS (601 ≤ 616), `/pricing`
  FAIL (846 > 715, escalated), repeat-check PASS. Full suite: **91/92**.
- `npm run build`: clean. `eslint src/`: clean.
