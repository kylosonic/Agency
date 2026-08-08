# Phase 1 Blueprint — Proof Strip, ETB Pricing Lock, Policy Rewrite (TECH-01, TECH-02, TECH-03)

**Date:** 2026-08-07 · **Author:** @plan · **Governed by:** launch-readiness B1–B15, ADR-001, pending-behaviors NB-01/02/03/04/07
**Arbitrated by @architect:** R6 ACCEPTED (in scope) · R7 NOTED (owner-side flag)

## Goal
Strip all fabricated proof (case studies, portfolio, hero stats, fake demo, implied-benchmark ROI calculator) and all USD pricing from the rendered site, replace the pricing data layer with the ADR-001 ETB-only locked table as single source of truth, and rewrite the policy page to bank-transfer-only payment terms — in one atomic, reference-safe commit set.

## Decision: REMOVE vs. FLAG-GATE (homepage demo/ROI/stats)
**Approach chosen: REMOVE (hard delete of sections and component files).**
Justification: B2/B3 prohibit the content from *existing*, not merely from displaying — a disabled flag still ships fabricated claims in the bundle, i18n dictionaries, and data modules; TECH-01 acceptance demands removal from rendered site, sitemap, and metadata; TECH-11 will deliberately reintroduce a real demo later, and a clean removal forces that reintroduction to be intentional. Flag-gating creates drift and a compliance audit surface for no benefit.

---

## 1. Files to Modify / Create / Delete

### DELETE (7 files)
| Path | Reason |
|---|---|
| `src/pages/CaseStudiesPage.jsx` | Renders fabricated case studies (B2) |
| `src/pages/PortfolioPage.jsx` | Renders fabricated portfolio items (B2) |
| `src/pages/HomePage.jsx` | Unrouted dead page (never imported by `App.jsx`) containing fabricated stats 150+/50+/99%, testimonials, portfolio cards — compliance risk if ever routed |
| `src/components/TiltCard.jsx` | Sole consumer was `HomePage.jsx` — orphaned by its deletion |
| `src/components/AgentOpsShowcase.jsx` | Simulated demo (B3) — sole consumer `Home.jsx` |
| `src/components/AutomationImpactCalculator.jsx` | Implied-benchmark ROI calculator, renders USD (`$`) — sole consumer `Home.jsx` |
| `src/components/AnimatedMetric.jsx` | Sole consumer was the hero-stats block in `Home.jsx` |

### CREATE (1 directory)
- `docs/plans/` — does not exist; create before persisting this blueprint.

### MODIFY (17 files)
1. `src/config/contentData.js`
2. `src/services/pricingData.js`
3. `src/pages/Pricing.jsx`
4. `src/components/PricingScenarioPlanner.jsx`
5. `src/pages/Home.jsx`
6. `src/pages/WebDevelopmentPage.jsx`
7. `src/pages/MobileDevelopmentPage.jsx`
8. `src/pages/PolicyPage.jsx`
9. `src/App.jsx`
10. `src/components/Navbar.jsx`
11. `src/components/Footer.jsx`
12. `src/services/seoService.js`
13. `src/pages/IndustryLandingPage.jsx`
14. `src/i18n/translations.js`
15. `public/sitemap.xml`
16. `tests/live-site.spec.js`
17. `src/components/PricingCard.jsx` — **no change needed** (already renders a single ETB price field; listed for verification only)

---

## 2. Strict Import Map (dependencies that break, and the replacements)

| Deleted / Changed symbol | Current consumers | Replacement in same commit |
|---|---|---|
| `caseStudies` (export, `contentData.js`) | `CaseStudiesPage.jsx` (deleted) | none |
| `portfolioProjects` (export, `contentData.js`) | `PortfolioPage.jsx` (deleted) | none |
| `liveChatPromptsByRoute['/case-studies']`, `['/portfolio']` | No consumer found (whole object appears dead — LiveChatDock uses i18n `liveChat.prompts`) | remove the two entries; keep the rest |
| `getMarketingAddons` (export, `pricingData.js`) | `WebDevelopmentPage.jsx`, `MobileDevelopmentPage.jsx` (marketing sections removed) | delete export; delete `MARKETING_ADDONS`/`APP_MARKETING_PACKAGES` constants; strip the `getMarketingAddons` import + `addons` state + section from both pages |
| `AI_PREMIUM_PRICING` (internal, `pricingData.js`) | `Pricing.jsx` product panel (renders USD rows) | delete constant; delete the "AI integration premium" sub-block in `Pricing.jsx`; drop `aiPremiumPricing` from `getPricingGuideSummary` return and from the `Pricing.jsx` destructure |
| `globalPrice` / `globalSetup` / `globalMonthly` / `globalPricing` fields | `Pricing.jsx` (`PriceValues` Global rows), `getPricingGuideSummary` mapping | strip all `global*` fields from every array; `PriceValues` renders single ETB value |
| `getWebPackages` / `getMobilePackages` / `getSaasPackages` / `getAdditionalServices` / `getFeaturedAddons` / `getPricingGuideSummary` | `WebDevelopmentPage`, `MobileDevelopmentPage`, `SaasSolutionsPage`, `AdditionalServicesPage`, `Pricing` | **signatures unchanged** — only data shapes inside change; pages keep working |
| `getAddonsGrid` (export, `pricingData.js`) | none (dead export) | optional removal; safe to keep |
| `CaseStudiesPage`, `PortfolioPage` (lazy imports, `App.jsx` lines 49–50, routes 345–346) | routes `/case-studies`, `/portfolio` | remove imports + `<Route>` lines |
| `Navbar`: `PRIMARY_LINKS` Results entry (`/case-studies`), `SERVICE_LINKS` entries, `RESULTS_ROUTES` set, `isPrimaryLinkActive` `/case-studies` branch | renders nav links to removed routes | remove all; the `/industries/` active state is already handled by the services-menu check |
| `Footer` links to `/case-studies`, `/portfolio` (lines 46–47) | renders dead links | remove both list items |
| `seoService.SEO_BY_ROUTE['/case-studies']`, `['/portfolio']` (3 languages each) | metadata for removed routes | remove 6 blocks |
| `sitemap.xml` entries for `/portfolio`, `/case-studies` | crawlable dead URLs | remove 2 `<url>` entries |
| `IndustryLandingPage` link `to="/portfolio"` (notFound state) | dead link | repoint to `/services`; repurpose `industry.notFound.action` + `.subtitle` strings (EN/AM/OM) so they no longer reference the portfolio |
| i18n keys (full list in §4) | Navbar/Footer/removed pages | remove or repurpose in the same commit (EN/AM/OM layers) |
| `tests/live-site.spec.js` routes array entries `/case-studies`, `/portfolio`; language-switch test `goto('/portfolio')` | E2E navigations to removed routes | remove entries; repoint test to `/policy` |

---

## 3. Step-by-Step Execution (behavior only, no code)

### Step 1 — Create `docs/plans/` (parent of this file).

### Step 2 — `src/config/contentData.js` (MODIFY)
- Delete the exported `caseStudies` array and `portfolioProjects` array in their entirety.
- Delete the `'/case-studies'` and `'/portfolio'` entries from `liveChatPromptsByRoute`.
- Leave `industryLandingContent`, `serviceFaqs`, `quoteWizardOptions` untouched (wizard unification is TECH-04).
- **Import-map consequence:** the only two pages that imported these arrays are deleted in Step 4; nothing else may import them (verified by grep during build).

### Step 3 — `src/services/pricingData.js` (MODIFY — the core swap; single source of truth)
- **`WEB_PACKAGES`:** replace the 3 entries with the ADR-001 anchored set — Digital Presence from 45,000 ETB; Growth & Conversion from 150,000 ETB; Enterprise from 250,000 ETB. Each keeps its `features`, `timeline`, `idealFor`, `ctaText`, `recommended`/`badgeText`. Replace the `price`/`localPrice` range strings with a single anchored `price` string ("from X ETB"). Delete every `globalPrice`/`localPrice` field.
- **`MOBILE_PACKAGES`:** replace with 2 tiers — Basic/Informational from 200,000 ETB; Business & E-Commerce from 400,000 ETB (drop the third "Enterprise / FinTech" tier, since the locked table lists only two mobile tiers). Same field cleanup as web.
- **`AI_IMPLEMENTATION_TIERS`:** replace with the 3 locked tiers anchored from 250,000 / 750,000 / 1,500,000+ ETB. Each tier keeps `title`, `bestFor`, `timeline`, `scope` (the scope drivers that raise the price — this is what B6 requires), and an expanded `includes` list. Add a monthly support band of 30,000–70,000 ETB per month on each tier, and a support-includes list that names hosting, model usage, monitoring, a defined number of support hours, and a response-time commitment (B7). Delete all `globalSetup`/`globalMonthly`/`localSetup`/`localMonthly` fields.
- **`SAAS_PACKAGES`:** keep the 3 products and the "Coming soon" availability fields as-is (already waitlist-only per B11); strip the `globalPricing`/`localPricing` fields so no currency exists even in data.
- **Delete `MARKETING_ADDONS` and `APP_MARKETING_PACKAGES` entirely, and the `getMarketingAddons` export (B12).**
- **Delete `AI_PREMIUM_PRICING` entirely.**
- **`ADDITIONAL_SERVICES`:** delete the "App Store Developer Accounts" row (money-losing, TECH-02); replace "Annual Web Maintenance 10,000–20,000 ETB / year" with "Monthly Web Maintenance 5,000–15,000 ETB / month" including the written service commitment (B9); delete `globalPrice` from every remaining row; keep Domain & Cloud Hosting, Logo & Visual Identity, Professional Copywriting, Commercial Photography.
- **`FEATURED_ADDONS` and the `getAddonsGrid` list:** mirror the same changes — remove the App Store row, convert Annual Web Maintenance to monthly 5,000–15,000 ETB, drop all `globalPrice` fields.
- **`getPricingGuideSummary`:** rebuild the return shape — `geographicPolicy` becomes the ETB-only statement: prices in ETB, "international engagements quoted individually" (the only USD-adjacent phrasing allowed); `workflowAudit` becomes the fixed 85,000 ETB entry offer, delivered within 5 business days, full fee credited toward any following implementation project, keeping the `outputs` list; `automationTiers` maps the new tier objects; `productEngineering` derives from the same `WEB_PACKAGES`/`MOBILE_PACKAGES`/`SAAS_PACKAGES` arrays (map each to category/title/timeline/ETB price/note — no global fields); remove `aiPremiumPricing` and `growthRetainers` from the summary; `additionalServices` maps the cleaned list.
- **Remote override (`VITE_PRICING_DATA_ENDPOINT`):** keep the fetch-with-static-fallback mechanism, but harden the contract — the remote `webPackages` payload must now be validated to be ETB-only; any payload containing `global*` or `$` fields must be rejected and the static fallback used. (See Risk R1.)
- **Import-map:** all exported function names/signatures unchanged except the deleted `getMarketingAddons`.

### Step 4 — Delete the proof pages and orphaned components
- `src/pages/CaseStudiesPage.jsx`, `src/pages/PortfolioPage.jsx`, `src/pages/HomePage.jsx` (unrouted), `src/components/TiltCard.jsx`, `src/components/AgentOpsShowcase.jsx`, `src/components/AutomationImpactCalculator.jsx`, `src/components/AnimatedMetric.jsx`.
- **Broken-reference checklist executed in the same commit:** `App.jsx` lazy imports/routes (Step 8), `Navbar`/`Footer` links (Steps 10–11), `seoService` entries (Step 12), `sitemap.xml` (Step 15), `tests/live-site.spec.js` (Step 16), i18n keys (Step 14), `IndustryLandingPage` notFound link (Step 13).

### Step 5 — `src/pages/Home.jsx` (MODIFY)
- Delete the `HERO_METRICS` constant and the `hero-stats` block (the three glass cards with animated 1,800+/40+/92% metrics) and the `AnimatedMetric` import. The hero keeps its left-aligned split layout: left `hero-copy` column and right `hero-panel` aside remain untouched.
- Replace the `"ETB and USD pricing"` trust pill with an ETB-only pill ("ETB pricing" / international engagements quoted individually wording per B4).
- Delete the entire "Agentic Replay" demo section (`#agent-demo`, lazy `AgentOpsShowcase`) including its `SectionHeader` and the lazy import + `Suspense` block.
- Delete the entire "ROI Modeling" impact-calculator section (`#impact-calculator`, lazy `AutomationImpactCalculator`) and its lazy import.
- Keep the contact form, methodology, product tracks, AI solutions, and bottom CTA sections as-is. No i18n work needed here — this page uses hardcoded English copy (verified), which is consistent with it being a non-i18n page.

### Step 6 — `src/pages/Pricing.jsx` (MODIFY)
- Replace the hero chip `"Global USD + local ETB"` with ETB-only messaging plus the "quoted individually" phrasing.
- `PriceValues`: reduce from dual "Global/Local" rows to a single ETB value render (the component itself can stay; call sites pass one entry instead of two). Update all call sites: audit card (single 85,000 ETB fixed), automation tier cards (single setup anchor + single monthly support band with the support-includes list per B7), product-engineering cards (single anchored price).
- Remove the "AI integration premium for custom apps" block (no longer in the data model).
- Retitle the third tab from "Growth & Add-ons" to "Support & Add-ons"; delete the ad-spend disclaimer block; the panel renders the monthly support retainer details and the cleaned `additionalServices` list instead of marketing retainers.
- Keep the audit-first CTA row.

### Step 7 — `src/components/PricingScenarioPlanner.jsx` (MODIFY)
- Strip all `$`-denominated fields (`setupRange`, `monthlyRange`, `formatUsd`, `Projected global setup/monthly` outputs) and the USD-ETB multiplier model. Rebase the tier model on the new ADR-001 ETB tiers (250k / 750k / 1.5M+ setup, 30–70k monthly support) so the planner projects ETB-only values. The interactive sliders and "Recommended tier" output stay; all outputs become ETB.
- (TECH-04 will later derive this from `pricingData` directly; for TECH-02 the requirement is simply: no USD may render here, and values must not contradict the locked table.)

### Step 8 — `src/App.jsx` (MODIFY)
- Remove the `CaseStudiesPage` and `PortfolioPage` lazy imports and their two `<Route>` entries.
- Remove `'portfolio'` from the `getLeadCaptureVariant` `quote_offer` path list.
- Everything else (lead-capture engine, `trackPageView`, metadata) is untouched.

### Step 9 — `src/pages/WebDevelopmentPage.jsx` + `src/pages/MobileDevelopmentPage.jsx` (MODIFY)
- Remove the `getMarketingAddons` import, the `addons` state variable, the fetch pair, the loading state usage, and the entire "Monthly Digital Marketing Packages" / "App Marketing" section (including its `SectionHeader` and add-on grid) from both pages.
- Keep the package tiers (now fed by the new ETB-only arrays via the unchanged `getWebPackages`/`getMobilePackages`), `RouteProofStrip`, `RoiEstimator`, FAQ, and CTA sections.
- The `RoiEstimator` is user-input modeling, not a fabricated claim — it stays (the removed ROI element is the homepage `AutomationImpactCalculator` only).

### Step 10 — `src/pages/PolicyPage.jsx` (MODIFY) — TECH-03 [R6 ACCEPTED: SaaS billing claims fixed in this same commit]
- Replace the entire "Digital Marketing Terms" section (including its three service cards and, critically, the "International Card Handling: 15–20%" note — B15) with a new "Payment Methods" section stating: until the business license is secured, payment is accepted by bank transfer (CBE Birr) only; after licensing, Telebirr merchant, Chapa, and card payments will be added (B25 note, explicitly framed as the plan, not current capability).
- Verify and keep the milestone grid: 40% at kickoff / 30% at design approval / 30% before deployment, and the full-ownership-on-final-payment guarantee — the current copy already matches B14 exactly (40/30/30 percentages, "Upfront Deposit", "After Design / Prototype Approval", "Before Final Deployment", 100% IP ownership on final payment); re-read to confirm and only touch if a drift is found.
- Rewrite the "SaaS Subscription Terms" section to waitlist-only wording ("in development — tell us you want it"), deleting the monthly/annual billing claims and the 2-month annual discount, per B11/B15.
- Keep the hero chips (milestone/IP/support) and CTA section; optionally add a "Bank transfer only" chip.
- New i18n keys for EN/AM/OM (Step 14): `policy.sections.payments.*` (title, intro, bank-transfer statement, post-license plan, and the removal of all card-handling copy), plus repurposed SaaS waitlist note.

### Step 11 — `src/components/Navbar.jsx` (MODIFY)
- Remove the `'/case-studies'` entry from `PRIMARY_LINKS` (the "Results" link), both `'/case-studies'` and `'/portfolio'` entries from `SERVICE_LINKS`, the `RESULTS_ROUTES` set, and the `isPrimaryLinkActive` special-case for `/case-studies`. The primary row now shows AI Automation / Product Engineering / Pricing; the services menu keeps the four product pages and Operations Policy. The `/industries/` active-state check already lives in the services-menu logic and is retained.

### Step 12 — `src/components/Footer.jsx` (MODIFY)
- Remove the Case Studies and Portfolio list items from the Company column. No other link changes.

### Step 13 — `src/services/seoService.js` (MODIFY)
- Delete the `'/case-studies'` and `'/portfolio'` blocks from `SEO_BY_ROUTE` (all three languages). No other SEO entries reference removed content; the FAQ schema's policy entries (40/30/30, ownership) stay because they remain accurate.

### Step 14 — `src/i18n/translations.js` (MODIFY — orphan purge + new keys, EN/AM/OM)
Remove every key listed below from the English base **and** from every override layer where it appears (`amOverrides`, `amContentOverrides`, `amFinalOverrides`, `omOverrides`, `omContentOverrides`, `omFinalOverrides`) — the merge chain means an orphaned override is unreachable but must still be purged for hygiene:
- `nav.results`, `nav.caseStudies`, `nav.portfolio`
- entire `caseStudies.*` tree (hero, header, delivery, labels, and per-slug `items` in `amContentOverrides`/`omContentOverrides`)
- entire `portfolio.*` tree (hero, header, filters, actions, per-project `items` in content overrides)
- entire `home.*` tree in all layers (hero incl. `stats`, about, services, `roi`, `testimonials` incl. fabricated `items`, process, `portfolio` incl. fabricated cards, contact, bottomCta) — sole consumer was the deleted `HomePage.jsx`; the live `Home.jsx` uses hardcoded English and no `t('home.*')` keys (verified)
- `liveChat.prompts.caseStudies`, `liveChat.prompts.portfolio` (EN base + am/om prompt layers)
- `states.loadingMarketingAddons` (EN base + am/om content overrides), `web.sections.addons.*`, `web.addons.*`, `mobile.sections.marketing.*`, `mobile.addons.*` (the marketing sections are gone)
- `amFinalOverrides.home.contact.form.emailPlaceholder`/`testimonials.items`, `omFinalOverrides.home.*`, `omFinalOverrides.portfolio.hero.title`, `amFinalOverrides.caseStudies.labels.stack`, `omFinalOverrides.caseStudies.labels.stack`
- Repurpose: `leadCapture.pricing_guide.subtitle` (EN/AM/OM) — drop "in ETB and USD", state ETB-only pricing; `industry.notFound.subtitle` and `.action` (EN/AM/OM) — no portfolio reference, action repointed to services.
- Add new EN/AM/OM keys: `policy.sections.payments.*` (per Step 10), `policy.sections.saas.waitlistNote`, and the ETB-only wording constants if any page needs them.
- Keep: `roi.*` (RoiEstimator still used on web/mobile/saas pages), `instantQuote.*`, `discovery.*`, `web.*`/`mobile.*`/`saas.*`/`additional.*` heroes & CTAs, `policy.sections.development.*` (40/30/30 stays), `faqs.*`, `channels.*`, `actions.*`.
- **Verification gate:** after the purge, grep the repo for `t('home.`, `t('caseStudies.`, `t('portfolio.`, `caseStudies.items`, `portfolio.items` — zero matches must remain in `src/`.

### Step 15 — `public/sitemap.xml` (MODIFY)
- Remove the `/portfolio` and `/case-studies` URL entries. `robots.txt` needs no change.

### Step 16 — `tests/live-site.spec.js` (MODIFY)
- Remove `'/case-studies'` and `'/portfolio'` from the `routes` array.
- Repoint the language-switch metadata test from `goto('/portfolio')` to `goto('/policy')`.
- Add phase-1 assertions (§5).

### Step 17 — Build-level verification (executed by @build, not this blueprint)
- `npm run build` must succeed with the deleted imports fully resolved; run the Playwright suite; grep the compiled bundle for `USD`/`$`-prefixed price strings and for case-study slugs — zero hits.
- Include in the commit message the TECH-10 owner flag: *"PDF pricing guide at public/NovaTechAI_2026_Service_Menu_and_Pricing_Guide.pdf still contains the legacy USD table — regeneration is owner-side (TECH-10), not handled in this commit."*
- Run `graphify update .` after the file changes so the AST graph stays current (swarm rule).

---

## 4. Testing Requirements

1. **Update `tests/live-site.spec.js`** as in Step 16; the full responsive smoke must pass on all remaining routes and viewports.
2. **New E2E assertions (add to the spec):**
   - `/pricing`, `/web-development`, `/mobile-development`, `/additional-services`, `/` render no visible `USD`, `$`, or "Global USD" text; `/pricing` renders the "quoted individually" phrasing.
   - `/pricing` renders: audit 85,000 ETB; AI tiers anchored 250,000 / 750,000 / 1,500,000+ ETB; web from 45,000 / 150,000 / 250,000 ETB; mobile from 200,000 / 400,000 ETB; support 30,000–70,000 ETB/month; maintenance 5,000–15,000 ETB/month; no marketing retainer rows; SaaS rows show waitlist only.
   - Homepage: no `.hero-stats`, no `#agent-demo`, no `#impact-calculator`, hero split layout still present (`.hero-copy` + `.hero-panel`), trust row contains no "USD".
   - `/policy`: bank-transfer (CBE Birr) statement visible; no "15–20%" and no "International Card Handling" text; 40/30/30 milestones still visible; ownership guarantee still visible.
   - Nav/footer: no links to `/case-studies` or `/portfolio` (desktop + mobile nav); direct `goto('/case-studies')` and `goto('/portfolio')` land on the 404 page.
   - `public/sitemap.xml` does not contain `/portfolio` or `/case-studies`.
   - i18n completeness: with language set to `am` and `om`, `/policy` renders the payments section (no English fallback for the new keys), and removed keys are absent (no `home.hero.stats` strings render anywhere in any language).
3. **Data-layer test (unit, if a test runner exists; otherwise a build-time script):** `getPricingGuideSummary()` returns no `global*`, `$`, or `USD` values in any branch; every tier carries scope drivers and the monthly support band; `getWebPackages`/`getMobilePackages` anchors match the locked table; the remote-override validator rejects USD-bearing payloads.
4. **E2E tests referencing removed content:** only the two locations in `live-site.spec.js` (routes list + language-switch test route). No other test in `tests/` references case studies, portfolio, hero stats, or the deleted analytics events — verified by reading the single spec file; analytics events `page_view`, `pricing_guide_intent`, `pricing_guide_opened`, `pricing_guide_form_submitted`, `contact_form_*`, `contact_channel_clicked`, `discovery_call_clicked`, `instant_quote_*` all remain and stay covered.

---

## 5. Risks & Findings

- **R1 — Remote pricing override (`VITE_PRICING_DATA_ENDPOINT`):** if configured, the remote payload can resurrect USD/old ranges over the locked table. Mitigation: schema validation rejecting non-ETB payloads (Step 3) + a build-time check if the env var is set in CI.
- **R2 — `HomePage.jsx` orphan:** unrouted but contains fabricated proof; deletion is included so it can never be accidentally routed. Its `home.*` i18n tree is removed with it (Step 14) — the largest i18n purge; grep-gate required.
- **R3 — Orphaned exports/keys:** `getAddonsGrid` (dead export) and `liveChatPromptsByRoute` (no consumer) exist today; the two removed route entries are purged; both may be left in place but should be flagged to @architect for a later cleanup ticket.
- **R4 — Analytics:** no analytics events become orphaned by TECH-01..03 (all tracked events remain on live pages). No new events are required in phase 1; TECH-05 will add `pilot_offer_cta_clicked`.
- **R5 — Wizard below-entry quotes:** `InstantQuotePage`'s hardcoded `SERVICE_BASE_RANGES` and the "Under 50k ETB" budget option can still quote below the 85k entry offer; this is TECH-04 (phase 2) and is intentionally left untouched here — do NOT partially refactor it in this commit.
- **R6 — [ACCEPTED] Policy SaaS section:** currently claims monthly/annual billing with a 2-month annual discount for products that do not exist (B11). Fixed in this same commit per Step 10.
- **R7 — [NOTED] PDF pricing guide (`public/NovaTechAI_2026_Service_Menu_and_Pricing_Guide.pdf`):** binary asset still shows the old USD table; regeneration is TECH-10 (out-of-repo, owner action). Flagged to owner in the commit message per Step 17.
- **R8 — `sitemap.xml` + SEO metadata:** purged in Steps 12/15; without this, Google-indexed dead URLs would contradict TECH-01 acceptance.
- **R9 — `PricingCard.jsx`:** verified already single-currency (renders one `price` + `currency='ETB'`); no edit needed — listed only so @build does not "fix" it.
- **R10 — `docs/plans/` missing:** confirmed absent; Step 1 creates it.

---

**Files in the change surface (final tally):** 7 DELETE + 17 MODIFY/VERIFY + 1 directory CREATE = 25 entries; zero new source modules (the ETB table lives in the existing `pricingData.js` single source of truth).

**Blueprint status:** complete and arbitrated. Ready for @build execution.
