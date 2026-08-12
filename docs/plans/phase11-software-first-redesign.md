# Phase 11 — Software-First Brand Redesign & Build-Intake Conversion (NB-44…NB-52)

> **Gate A blueprint — @plan.** Branch: `phase11-software-first-redesign`. Governed by
> `docs/behaviors/software-first-redesign.md` (R-1…R-19 — **owner-confirmed 2026-08-12**, every rule
> binding), extending `docs/behaviors/software-development-prominence.md` (S-2, S-4, C-2, C-3, C-4
> carry forward) and `docs/behaviors/pricing-revert-and-motion.md` (prices P-1, discounts, motion
> M-1…M-6, G-1…G-5, copy-trim budgets — locked). **Supersedes:** S-1 track ordering (new 6-track
> hierarchy R-5), C-1 primary CTA (→ "Start a Project", R-6), S-3 Home ladder placement (→ removed,
> R-19), and the Lumen Night **palette** (→ light-first, R-16; structure retained). ADR-001 ETB-only
> policy, ADR-003 figures, audit booking mechanics (C-2/C-3) unchanged. ADR-005 (new, in-batch)
> records the CTA supersession + palette change.
>
> **Graphify note (AGENTS.md §9):** no Graphify report/graph artifacts exist in this repo
> (`**/graphify*`, `**/*.graph*` = none). Manual dependency analysis of the eight behavior-level
> surfaces + the component/service graph was performed instead; the limitation is recorded rather
> than simulated.
>
> All file facts below verified against code on 2026-08-12 (main `536c6ab`).

---

## 1. Goal

Reposition NovaTech as a **software development and digital solutions company first** ("Software
first. AI when it adds value."): rebuild the Homepage into the owner-confirmed 15-section
software-first narrative with the inline **project-intake form** as the primary conversion
("Start a Project" site-wide; audit demoted to Home section 13 with mechanics unchanged), add two
real case-study cards with Playwright-captured screenshots, and replace the Lumen Night palette
(cool violet + molten brass) with a **light-first palette** (warm paper canvas, near-black ink,
one deep forest-green accent) inside the retained design system — with EN/AM/OM parity, all 11
acceptance gates (§7 of the contract) green before merge.

## 2. Scope / Non-scope

**In scope:** palette token swap + visual re-baseline (R-16); Home 15-section rebuild (R-1…R-4,
R-8…R-13, R-19); Services 6-track hierarchy (R-5); site-wide CTA system (R-6); project-intake
form + confirmation + fallback (R-7); case studies + screenshot pipeline (R-10); i18n EN/AM/OM
parity for every changed string (R-17); truth/brand/i18n/regression gates (R-15, R-18, §7);
SEO re-cut + OG-image regeneration (R-1, R-15; closes the STATE.md Phase-10 leftover flag);
ADR-005; ledger rows NB-44…NB-52.

**Non-scope (do not touch):** prices/discounts (P-1), ETB-only policy (ADR-001), ADR-003 figures,
audit booking mechanics + guarantee (C-2/C-3 — the `/workflow-audit` booking flow must pass its
existing E2E **unchanged**), editorial motion rules (M-1…M-6, G-1…G-5), i18n architecture,
payment rails (blocked), legal/company docs, PDF pricing guide (owner-side; the generator script
accent is aligned but the artifact itself is out of scope), nav structure (labels/destinations
inside existing menus; only the CTA button label/destination changes), Discovery Call mechanics
(copy/ordering only), InstantQuote mechanics (ordering verify only), LeadCaptureModal mechanics
(see A10), no new analytics events, no new dependencies, no new runtime network calls
(screenshots are static build-time assets; external case-study links open in new tabs).

## 3. Ticket breakdown (TECH-42…TECH-50 → NB-44…NB-52)

9 tickets, strictly linear. Each ticket carries its own E2E assertions (never a green suite masking
the new contract — phase-8/10 precedent). Intermediate states may reference `#project-intake`
before TECH-46 creates the anchor; the batch commits atomically after all gates (AGENTS.md §5).

### TECH-42 — Light-first palette token swap + visual E2E re-baseline (→ NB-51 / R-16, §7 gate 7)
1. `src/index.css` — **values-only** replacement of the `:root` token block (lines 1–67): paper
   family → warm off-white, ink family → near-black warm, rules → near-black hairlines, accent →
   deep forest-green family (exact OKLCH under owner review, candidate set in §14 A1), glow/emit →
   forest at low alpha, `--shadow-lumen` → soft light shadow. **No token renames, no structural
   edits**; `html`/`body` surface settings flip (`color-scheme: light`); `.band-dark` re-skinned
   to deep ink-green with AA-white ink. Sweep the file for any residual brass/violet literals
   outside `:root` (none found at write time — re-verify with grep in build).
2. `index.html` — `data-theme="light"`, `meta name="color-scheme" content="light"`,
   `theme-color` → paper hex, noscript block colors.
3. `scripts/theme-contrast-audit.mjs` + `scripts/theme-visual-audit.mjs` — palette expectations
   re-pointed to the light-first tokens (dev evidence tooling, both theme branches).
4. `scripts/generate-pricing-guide.mjs` — `--accent` (line 111) → forest accent so any owner-side
   PDF regeneration cannot resurrect brass (artifact itself remains owner-side).
5. `tests/live-site.spec.js` — re-baseline diff record header (B38 convention: mutated +
   new tests listed, QA-reviewed); MUTATE N1 (light canvas, `data-theme="light"`, no toggle),
   N2 (light-first sections, exactly two dark bands per A5), N6 (accent = forest green, not
   brass); ADD new palette gates (§6 item 1).
- **Exit criteria:** all 10 matrix routes render light-first; no computed violet (hue≈265) or
  brass (hue≈50) surfaces; `.btn-primary` contrast ≥ 4.5:1; `npm run lint` + `npm run build`
  clean; visual E2E palette block green.

### TECH-43 — Home hero + trust + What We Build + 15-section skeleton (→ NB-44 / R-1…R-4, R-3)
1. `src/pages/Home.jsx` — **full-page restructure**: hero (H1 "Software built around your
   business.", subcopy per R-2, CTA row Start a Project → `/#project-intake` / Discuss Your
   Software Idea → `/book-discovery-call` / Explore AI & Automation → `#ai-automation` anchor,
   trust row "Web from 20,000 ETB · Mobile from 40,000 ETB · SaaS from 3,500 ETB / month",
   software-first apparatus callouts from locked facts — A19); trust/capabilities section (R-3
   item 2, locked facts only); **What We Build** (R-4, 10 one-line business-framed categories,
   final item AI-Powered Software); DELETE the old audit-first sections (why-audit-first,
   audit-deliverables, implementation-tracks, offer-ladder, contact) and `OFFER_LADDER` /
   `HOME_APPARATUS_CALLOUTS` / `IMPLEMENTATION_TRACKS` / `AUDIT_REASONS` / `WHAT_WE_NEED`
   constants; create the 15-section skeleton with shells (id + mono eyebrow only, per A2) for
   sections 4–15.
2. `tests/live-site.spec.js` — MUTATE hero test (Phase 1 real-facts strip → software-first
   anchors); ADD positioning assertion (H1 string), R-3 section-order index assertion
   (15 section ids in exact order), What We Build 10-item assertion (single-line each at
   1440×900).
- **Exit criteria:** hero H1 + CTA order + trust anchors exact; section-order gate green;
  What We Build renders 10 business-framed items, no tech-stack leads; no audit-first section
  remains on Home.

### TECH-44 — Home service sections + AI + Process + Why + Industries (→ NB-45, NB-48, NB-50 / R-5, R-9, R-11…R-14)
1. `src/pages/Home.jsx` — fill shells: Custom Software Development (4), Web & Mobile (5),
   Business Systems (6), SaaS & Product Engineering (7) — business-value-first copy (R-14),
   one-line category rows (B43 receipt style, mono numerals); AI & Automation (8, R-12: title
   "Add intelligence to your software." + six transformation pairs + "Explore AI & Automation"
   CTA → AI track); Process (9, R-9: 5 steps, audit step labeled optional, locked facts only);
   Why NovaTech (11, R-3 item 11: derived differentiators from locked facts — milestone
   40/30/30, written support commitment, response SLA, Addis Ababa, published ETB pricing);
   Industries (12, R-11: 8 buildable system categories, local-reality framing, anchoring line,
   no specialization claims).
2. `src/pages/Services.jsx` — `DELIVERY_TRACKS` → **6 tracks** per R-5 (Custom Software
   Development, Web, Mobile, SaaS, Business Systems, AI & Automation); hero chips software-first
   (S-2 parallel framing kept); DELIVERY_STEPS/AUTOMATION_LANES verified against R-5 ordering.
3. `src/config/contentData.js` — `liveChatPromptsByRoute['/']` → software-first prompt;
   `quoteWizardOptions` verify-only (already software-first; R-5 acceptance 2).
4. `src/pages/SaasSolutionsPage.jsx` / `WebDevelopmentPage.jsx` / `MobileDevelopmentPage.jsx` /
   `AdditionalServicesPage.jsx` — R-14 copy review: service descriptions open with business
   outcomes, stack names only on technical surfaces (light touch; no structural changes).
5. `tests/live-site.spec.js` — ADD: R-12 AI section title + 6 pairs; R-9 five process steps +
   optional audit label; R-11 industries list + no "trusted by"/stat strings; Services 6-track
   order gate (extends S1 index comparison); R-5 wizard selector order verify.
- **Exit criteria:** all five service surfaces follow R-5 order; AI section renders title + 6
  pairs; process steps match locked facts only; industries/why contain zero fabricated claims
  (grep-verified).

### TECH-45 — Workflow Audit section 13 + pricing redistribution + meter/marquee (→ NB-47 / R-8, R-19)
1. `src/pages/Home.jsx` — fill section 13 shell: audit card with locked terms (15,000 ETB · 5
   business days · 100% credit), guarantee line (C-3), "View Live Pricing" → `/pricing`,
   audit CTA secondary (`/workflow-audit`); audit price renders through `PriceCounter`
   (M-4 re-point per A11); Home meter labels → software-first (`WEB · FROM 20,000 ETB` /
   `MOBILE · FROM 40,000 ETB` per R-19); marquee items kept to locked figures (existing content
   valid; software-first ordering per R-5).
2. `tests/live-site.spec.js` — MUTATE the two M4 counter tests (line 781/793: selector →
   section-13 audit card, still lands on 15,000 ETB); MUTATE offer-ladder gap test (line 922 →
   re-point to audit card or delete — the ladder no longer exists); MUTATE contact-spacing test
   (line 888: Home contact cards removed — re-point to section 14 intake card, A6); ADD R-19
   assertions (no `.offer-ladder` on Home; meter label strings; "View Live Pricing" link;
   audit terms + guarantee visible in section 13).
- **Exit criteria:** ladder absent from Home; section 13 renders locked audit terms + guarantee
  + View Live Pricing; booking-flow E2E on `/workflow-audit` (existing C-2 test) passes
  **unchanged**; marquee/meter carry locked figures only.

### TECH-46 — CTA system site-wide + project-intake form + final CTA (→ NB-46 / R-6, R-7)
1. NEW `src/components/ProjectIntakeForm.jsx` — inline form (`#project-intake`): Full name
   (text, req), Email (email, req), Phone (tel, req), Company (text, opt), What do you need?
   (select, req — Website / Web application / Mobile app / Business system / SaaS product /
   AI & automation / **Not sure yet**), Budget band (select, opt — `QUOTE_BUDGET_BANDS` +
   **Not sure**), What's the problem or idea? (textarea, req). Submit pipeline mirrors
   `AuditBookingForm` exactly: `submitLeadIntake` (type `project_intake`, context carries
   need + budget band) → `submitContactInquiry` → `queueLeadFollowups` → mailto fallback via
   `buildProjectInquiryMailto` on endpoint failure (never silently vanish); analytics reuse
   `trackContactFormAttempt/Outcome` (source `project_intake`); confirmation copy: "Your
   project request was received. We'll respond within 1 business day with next steps."
   Status states: sending / sent / fallback / error.
2. NEW `src/components/ProjectIntakeChatLinks.jsx` (compact, A21) — scope select + budget band
   select + optional note → prefilled WhatsApp/Telegram via existing
   `buildWhatsAppMessageLink` / `buildTelegramDirectLink` (C-4 pattern).
3. `src/pages/Home.jsx` — fill section 14 (Final CTA): intake form + "Prefer a number now? Use
   the instant quote tool" → `/instant-quote` + one-tap WhatsApp (ProjectIntakeChatLinks).
4. `src/pages/Pricing.jsx`, `Services.jsx`, `WebDevelopmentPage.jsx`,
   `MobileDevelopmentPage.jsx`, `SaasSolutionsPage.jsx`, `AdditionalServicesPage.jsx` —
   hero/final primary CTA → **"Start a Project"** → `/#project-intake`; secondary "Discuss
   Your Software Idea" → `/book-discovery-call`; tertiary "Explore AI & Automation" →
   `/services` AI track (Home → `#ai-automation` anchor). `/workflow-audit` primary remains
   **"Book Workflow Audit"** (R-6 exception). Audit CTA secondary on all other surfaces.
5. `src/components/Navbar.jsx` — nav CTA `Book Workflow Audit` → **"Start a Project"** →
   `/#project-intake` (desktop + mobile, A7); `src/components/FloatingCTA.jsx` same;
   `src/components/BandCta.jsx` same (A8); `src/pages/IndustryLandingPage.jsx` primary →
   Start a Project (A9); `src/pages/NotFoundPage.jsx` verify-only.
6. `tests/live-site.spec.js` — MUTATE C1 test (Start a Project primary on all marketing heroes;
   audit page exception asserted); ADD intake-flow E2E (fill → confirmation copy with
   1-business-day line; "Not sure yet"/"Not sure" selections submit; fallback path: intercept
   endpoint failure → mailto/fallback feedback asserted); ADD CTA-hierarchy test (Home hero
   order + non-Home primary href `/#project-intake`); MUTATE home-contact-form analytics test
   (source `project_intake`).
- **Exit criteria:** one conversion model everywhere; intake E2E green incl. confirmation +
   fallback; audit page primary unchanged; nav/floating/band CTAs re-pointed.

### TECH-47 — Case studies + screenshot pipeline (→ NB-49 / R-10, R-16 imagery exception)
1. NEW `scripts/capture-case-studies.mjs` — Playwright (existing devDependency; no new deps):
   per site (`https://www.stealthoverlay.com/`, `https://rhobotcapital.com/`) capture one
   **1440×900** full-page screenshot → WebP (`page.screenshot({ fullPage: true, type: 'webp',
   quality: 80 })`) into `public/case-studies/stealth-overlay.webp` /
   `public/case-studies/rhobot-academy.webp`. **Failure handling (R-10):** if the page cannot
   render meaningfully — navigation timeout, blank SPA (no `h1`, `<main>` text < ~120 chars,
   login wall detected) — the script prints `SKIP <site> — <reason>`, writes **no** asset,
   exits **0**; the build proceeds text-only. Log every capture (URL, status, bytes).
2. NEW `src/components/CaseStudyCard.jsx` — hairline-framed artifact card: mono caption
   ("LIVE PRODUCT · STEALTH OVERLAY" style), `loading="lazy"` WebP with fixed max dimensions,
   alt text via i18n (EN/AM/OM), `onError` → hide image (text-only card if asset missing);
   card copy = R-10 locked copy ("Designed and developed by NovaTech", category, one-line
   description), external link `target="_blank" rel="noopener noreferrer"`.
3. `src/pages/Home.jsx` — fill section 10 shell with two CaseStudyCards.
4. `src/i18n/translations.js` — case-study copy + alt keys (EN; AM/OM in TECH-48).
5. `tests/live-site.spec.js` — ADD case-study gate: both cards render locked copy + live links
   (new tab); alt text present in all three languages; zero client business claims
   ("4,000+ students", "six-figure", "Exness" absent — truth gate); imagery count on Home =
   exactly 2 `<img>` max (N4 exception, A14).
- **Exit criteria:** pipeline captures both sites or prints SKIP (exit 0); assets committed;
   cards render with confirmed copy; alt EN/AM/OM; no client business claims.

### TECH-48 — i18n EN/AM/OM parity for all new strings (→ NB-52 part / R-17)
1. `src/i18n/translations.js` — add `home.*` trees (hero, trust, What We Build, service
   sections, AI, process, why, industries, audit card, final CTA, intake form + confirmation,
   case studies + alt) EN/AM/OM via the existing merge-layers; convert Home.jsx +
   ProjectIntakeForm + CaseStudyCard + ProjectIntakeChatLinks from hardcoded EN to
   `useLanguage().t` lookups; new `actions.startProject` / CTA keys; AM/OM values
   machine-translated and flagged on the NB-09 native-review list (precedent). Non-Home page
   bodies remain hardcoded EN per precedent (A18 — architect sign-off).
2. `tests/live-site.spec.js` — ADD i18n gate: switch Home to AM and OM — sections render,
   no horizontal clipping at 390px (existing overflow probe), prices identical across
   languages; intake-form labels resolve in AM/OM.
- **Exit criteria:** every new EN string has an AM/OM mirror; Home renders trilingually
  without clipping; prices identical in all three languages.

### TECH-49 — E2E new gates + full regression + truth/brand greps (→ NB-52 / R-18, §7)
1. `tests/live-site.spec.js` — final sweep: all §7 gates as automated checks (§6); re-baseline
   the Home word-count constant (A12 — measured from the trimmed EN build at Gate C, phase-9
   precedent); delete the obsolete ≥35%-vs-pretrim baseline constant and Phase-2 audit-first
   Home assertion (superseded by R-3); regression suite green (prices unchanged, C-2 booking
   flow untouched, motion/reduced-motion/transitions still pass, wizard parity).
2. Grep gates (run as E2E source scans + QA shell evidence): zero "NovaTech AI" in `src/`,
   `tests/`, `public/` (binary PDF excluded per S-4 precedent; `og-image.png` covered by
   TECH-50); zero client business claims ("4,000+ students", "six-figure", "Exness", "trusted
   by", "4,000 students"); zero Lumen remnants (violet/brass token values) in `src/`.
3. Hygiene (optional, pending architect): add `test-results/` to `.gitignore` + `git rm
   --cached test-results/.last-run.json` (STATE.md unresolved risk f).
- **Exit criteria:** full suite green (existing ~110 + new/mutated); all 11 contract gates
  have recorded evidence; lint + build clean; ledger rows NB-44…NB-52 ready to flip after UAT.

### TECH-50 — SEO re-cut + OG image regeneration + brand-gate close-out (→ R-1, R-15, §7 gate 8)
1. `src/services/seoService.js` — all route titles/descriptions re-cut software-first with
   "NovaTech" brand: `/` title leads with software (e.g. "NovaTech | Custom Software, Web,
   Mobile, SaaS & AI Automation" — exact at build); `SERVICE_SCHEMA_BY_ROUTE['/services']`
   name "AI Automation and Agentic Systems" → software-first service name; `/workflow-audit`,
   `/pricing` metas verified.
2. `index.html` — static meta title/description re-cut software-first; JSON-LD `OfferCatalog`
   re-cut software-first (Custom Software → Web → Mobile → SaaS → AI; A16); `ItemList` synced
   to the current nav; `og:image` cache-bust param bumped (A15).
3. `scripts/generate-og-image.mjs` — brand "NovaTech AI" → "NovaTech", "AI-first" headline →
   software-first headline, palette → light-first forest; regenerate `public/og-image.png`
   (closes the STATE.md leftover flag).
4. `public/favicon.svg` — accent rect re-pointed to the forest accent (A17).
5. `tests/live-site.spec.js` — brand gate: doc title "NovaTech" and no "NovaTech AI" in
   rendered meta/OG; SEO positioning: `/` title contains software-first lead terms; grep gate
   over regenerated asset.
- **Exit criteria:** zero "NovaTech AI" in src/, tests/, public/ (incl. og-image.png);
   SEO leads with software on every route; OG image regenerated + cache-busted; brand gate
   green.

## 4. Exact file inventory (verified against code 2026-08-12, main `536c6ab`)

| File | Change | Ticket |
|---|---|---|
| `src/index.css` | `:root` token block (lines 1–67) **values-only** swap to light-first; `html`/`body` color-scheme; `.band-dark` re-skin; residual literal sweep | TECH-42 |
| `index.html` | `data-theme="light"`, color-scheme/theme-color meta, noscript colors, static SEO title/desc, JSON-LD OfferCatalog/ItemList re-cut, og cache-bust | TECH-42, TECH-50 |
| `src/pages/Home.jsx` | **Full 15-section rebuild**: hero/trust/What We Build (43), sections 4–9 + 11 + 12 (44), section 13 + meter/marquee (45), section 14 + intake (46), section 10 (47), i18n conversion (48) | 43–48 |
| `src/pages/Services.jsx` | 6-track DELIVERY_TRACKS (R-5), hero chips, closing CTA (46) | 44, 46 |
| `src/pages/Pricing.jsx` | Hero/final CTA per R-6 (tracks already software-first; SaaS rows untouched) | 46 |
| `src/pages/WorkflowAudit.jsx` | **verify-only** — hero primary stays "Book Workflow Audit"; C-2/C-3/C-4 surfaces untouched | 46 (verify) |
| `src/pages/WebDevelopmentPage.jsx` / `MobileDevelopmentPage.jsx` / `SaasSolutionsPage.jsx` / `AdditionalServicesPage.jsx` | R-14 copy review; hero CTA per R-6 | 44, 46 |
| `src/pages/InstantQuotePage.jsx` | verify-only (selector already software-first; form primaries kept per R-6 edge) | 44 (verify) |
| `src/pages/DiscoveryCallPage.jsx` | copy/ordering verify-only (mechanics unchanged) | 46 (verify) |
| `src/pages/PolicyPage.jsx` | verify-only (audit terms + guarantee unchanged) | 45 (verify) |
| `src/pages/IndustryLandingPage.jsx` | primary CTA → Start a Project → `/#project-intake` (A9) | 46 |
| `src/pages/NotFoundPage.jsx` | verify-only (BandCta handled below, A8) | 46 |
| `src/components/Navbar.jsx` | nav CTA label/destination → Start a Project → `/#project-intake` (desktop + mobile) | 46 |
| `src/components/FloatingCTA.jsx` | → Start a Project → `/#project-intake` | 46 |
| `src/components/BandCta.jsx` | → Start a Project → `/#project-intake`; band copy re-cut software-first | 46 |
| NEW `src/components/ProjectIntakeForm.jsx` | R-7 intake form + confirmation + fallback (mirrors AuditBookingForm pipeline) | 46 |
| NEW `src/components/ProjectIntakeChatLinks.jsx` | scope/budget/note → WhatsApp/Telegram prefill (C-4 pattern) | 46 |
| NEW `src/components/CaseStudyCard.jsx` | artifact-framed screenshot card, lazy WebP, onError text-only, i18n alt | 47 |
| `src/config/contentData.js` | `liveChatPromptsByRoute['/']` software-first; wizard verify-only | 44 |
| `src/services/seoService.js` | all route metas software-first; SERVICE_SCHEMA re-cut; `/` title software lead | 50 |
| `src/i18n/translations.js` | `home.*` EN/AM/OM trees; case-study keys; CTA keys (`actions.startProject`); intake keys; NB-09 flags; band re-cut | 46–48 |
| `src/services/leadIntakeService.js` / `contactService.js` / `leadAutomationService.js` / `analyticsService.js` | **unchanged** (reused as-is by ProjectIntakeForm) | — |
| `src/components/HeroChoreo.jsx` / `Apparatus.jsx` / `MeterStrip.jsx` / `MarqueeStrip.jsx` / `PriceCounter.jsx` / `ScrollReveal.jsx` / `SectionHeader.jsx` / `IconGlyph.jsx` / `SupportPathLinks.jsx` / `AuditBookingForm.jsx` / `LeadCaptureModal.jsx` / `Footer.jsx` / `LiveChatDock.jsx` | **unchanged** — reused (A4) | — |
| NEW `scripts/capture-case-studies.mjs` | 1440×900 full-page WebP capture of both live products; SKIP semantics; exit 0 | 47 |
| `scripts/theme-contrast-audit.mjs` / `theme-visual-audit.mjs` | palette expectations re-pointed light-first | 42 |
| `scripts/generate-pricing-guide.mjs` | accent → forest (artifact owner-side) | 42 |
| `scripts/generate-og-image.mjs` | "NovaTech AI" → "NovaTech", software-first headline, light-first palette | 50 |
| NEW `public/case-studies/stealth-overlay.webp` | generated capture (committed) | 47 |
| NEW `public/case-studies/rhobot-academy.webp` | generated capture (committed) | 47 |
| `public/og-image.png` | regenerated software-first | 50 |
| `public/favicon.svg` | accent rect → forest (optional, A17) | 50 |
| `tests/live-site.spec.js` | header re-baseline record; MUTATE ~14 tests; DELETE 2; ADD ~20; word-gate constant | 42–50 |
| NEW `docs/adr/ADR-005-software-first-redesign.md` | scribe artifact, in-batch: CTA supersession (C-1 → R-6) + palette change (Lumen → light-first) + imagery exception | in-batch (Gate F) |
| `docs/behaviors/pending-behaviors.md` | NB-44…NB-52 → [IMPLEMENTED] after UAT (scribe) | after UAT |
| `docs/swarm/STATE.md` | phase/branch/gate ledger updates (scribe) | after gates |
| `.gitignore` | `test-results/` hygiene (optional, A-architect) | 49 |

**Screenshot pipeline spec (R-10):** `scripts/capture-case-studies.mjs` — Node + Playwright
(`@playwright/test` already installed; no new deps). Per site: chromium, viewport 1440×900,
`goto` with 45 s timeout, settle wait, `fullPage` WebP (`quality: 80`) to
`public/case-studies/<slug>.webp`. Meaningfulness probe before capture: page must contain an
`h1` and ≥ ~120 chars of body text after settle; otherwise `SKIP <site> — <reason>` + exit 0.
Runtime fallback: `CaseStudyCard` `onError` hides the image → text-only card (covers both
build-time SKIP and a missing/blocked asset). Assets are static; no runtime network calls.

## 5. Dependency DAG

```
TECH-42 (palette + visual re-baseline) ──┐ (index.css/index.html/tests — everything re-baselines on it)
TECH-43 (Home skeleton + hero/trust/WWB) ──┐ (Home.jsx full rewrite; order gate)
TECH-44 (service/AI/process/why/industries) ──┐ (Home.jsx shells; Services 6-track; contentData)
TECH-45 (audit §13 + meter/marquee) ──┐ (Home.jsx; M4/counter re-points)
TECH-46 (CTA system + intake form + final CTA) ──┐ (all marketing pages + Navbar/FloatingCTA/BandCta + new components)
TECH-47 (case studies + screenshots) ──┐ (Home.jsx §10; new component + script + assets)
TECH-48 (i18n parity) ──┐ (translations.js + Home i18n conversion — needs final EN strings from 43–47)
TECH-49 (E2E sweep + regression + greps) ──┐ (final suite + word-gate constant)
TECH-50 (SEO + OG + brand close-out) ──┐ (seoService/index.html/og script — last)
        ▼
lint/build → QA (C) → Security (D) → Integration (E) → Commit (F) → UAT → merge → deploy
```
**Rationale — no safe parallelism (AGENTS.md §7):** every ticket 42–50 writes
`tests/live-site.spec.js`; tickets 43–48 write `src/pages/Home.jsx`; 46–48/50 write
`translations.js`; 46 touches CTA lines in eight pages. Any concurrent pair would produce merge
conflicts and invalidate each other's assertions. Strictly linear 42→50.

## 6. Test strategy

**Re-baseline (MUTATE) — existing tests:** N1 (dark→light canvas), N2 (no-light-paper→
light-first + two dark bands), N4 (zero-imagery→narrow 2-img exception), N6 (brass→forest
accent), C1 (Book Workflow Audit→Start a Project, audit-page exception), M4 ×2 (ladder→§13
audit card counter), Phase-2 audit-first Home assertion (→software-first), home-contact-form
E2E (→intake flow), contact-spacing ×2 (→§14 intake card), hero real-facts test, contact-form
analytics test (source `project_intake`), Home word-gate constant, `site defaults dark` smoke
→ light.

**Delete:** offer-ladder gap test (ladder removed).

**New gates (per contract §7):**
1. **Palette/visual (TECH-42)** — computed `body` background light (L > 0.8); accent hue in
   green family (≈120–170) on `.btn-primary`; **no** computed violet (≈265) or brass (≈50)
   surfaces on any matrix route; AA spot-check: `.btn-primary` text contrast ≥ 4.5:1 (dark
   bands: ≥ 4.5:1 with white ink); exactly two `.band-dark` sections on Home; imagery limited
   to the two case-study cards (N4 re-baseline).
2. **Section-order (TECH-43→49)** — `main section` index comparison: 15 ids in exact R-3
   order (Hero, Trust, What We Build, Custom Software, Web & Mobile, Business Systems, SaaS,
   AI & Automation, Process, Selected Work, Why NovaTech, Industries, Workflow Audit, Final
   CTA, Footer).
3. **CTA hierarchy (TECH-46)** — Home hero CTA order [Start a Project → `/#project-intake`,
   Discuss Your Software Idea → `/book-discovery-call`, Explore AI & Automation → Home AI
   anchor]; non-Home marketing hero primary "Start a Project" → `/#project-intake`;
   `/workflow-audit` primary stays "Book Workflow Audit"; audit CTA secondary elsewhere.
4. **Intake flow (TECH-46)** — fill name/email/phone/need/budget/message → submit →
   confirmation "received… respond within 1 business day"; "Not sure yet" + "Not sure" options
   submit; endpoint-failure route → mailto/fallback feedback asserted; no dead-end selections.
5. **Audit gate (TECH-45)** — §13 locked terms + guarantee + "View Live Pricing"; existing C-2
   booking E2E passes unchanged; ladder absent.
6. **Case-study gate (TECH-47)** — two cards: locked copy, live links (new tab), claim level
   "Designed and developed by NovaTech"; alt text EN/AM/OM; no client business claims.
7. **Brand grep (TECH-50)** — zero "NovaTech AI" in `src/`, `tests/`, `public/` (binary PDF
   exempt, documented); wordmark/title/metas "NovaTech".
8. **Truth grep (TECH-49)** — zero "4,000+ students" / "six-figure" / "Exness" / "trusted by" /
   industry stats; every rendered number is a locked figure (P-1 figure gate re-run).
9. **i18n (TECH-48)** — AM/OM Home renders without clipping (390px overflow probe, Ethiopic
   line-height), prices identical across languages, intake labels resolve.
10. **Copy-trim budget (TECH-49/A12)** — new Home word-count constant measured at Gate C from
    the trimmed EN build (evidence-based re-baseline, phase-9 precedent); single-line E2E for
    What We Build (10), Industries (8), transformation pairs (6) at 1440×900.
11. **Regression (TECH-49)** — prices unchanged (P-1), C-2 booking flow green, motion
    M-1…M-6 + reduced-motion, page transitions, wizard parity, existing suite green with
    re-baselined selectors.

## 7. Integration risks + mitigations

- **R1 — i18n string-key vs translations.js parity (high).** Home copy starts hardcoded EN
  (TECH-43–47), converted to `t()` in TECH-48; a missed key leaves AM/OM gaps. Mitigation:
  TECH-48 conversion is exhaustive (grep every string literal in Home + new components);
  E2E i18n gate + QA key-coverage check; NB-09 native-review flag for all new AM/OM values.
- **R2 — contentData.js vs hardcoded strings.** `quoteWizardOptions`, `liveChatPromptsByRoute`
  and page constants can drift from R-5/R-2 copy. Mitigation: verify-only ticket scope; E2E
  order/string assertions pin the contract; truth-gate grep covers claims.
- **R3 — `/#project-intake` deep links (high).** Every non-Home marketing hero + nav +
  floating CTA lands on the Home anchor; the anchor only exists after TECH-46. Mitigation:
  linear order (46 before any CTA E2E gate), atomic batch commit, final E2E asserts hrefs
  AND anchor presence on Home.
- **R4 — screenshot assets + trilingual alt (medium).** Capture may SKIP; assets must not
  break builds; alt must exist in 3 languages. Mitigation: SKIP exits 0 + `onError` text-only
  fallback; alt keys in `translations.js` before card render; E2E asserts alt regardless of
  image presence.
- **R5 — marquee/meter locked figures (low-medium).** R-19 forbids new figures; meter labels
  are re-cut. Mitigation: labels built from locked strings only (`QUOTE_ANCHORS` +
  `SAAS_ENTRY_PRICE`), E2E asserts exact strings, QA figure gate re-run.
- **R6 — copy-trim budget blowout (medium).** 15 sections vs the 616-word Home gate — the old
  constant dies. Mitigation: A12 evidence-based re-baseline at Gate C + single-line list E2E +
  QA editorial review per section.
- **R7 — SEO meta two-source drift (medium).** `seoService.js` (runtime) and `index.html`
  (static) both carry metas. Mitigation: TECH-50 updates both in one ticket; E2E asserts the
  rendered `document.title`/description; brand grep covers both.
- **R8 — OG-image leftover (medium).** `generate-og-image.mjs` still writes "NovaTech AI"
  (STATE.md leftover); the committed binary contains the old brand until TECH-50. Mitigation:
  TECH-50 regenerates + cache-busts; brand grep includes the binary post-TECH-50 (excluded
  only pre-regeneration, documented like the PDF).
- **R9 — test blast radius of the Home rebuild (high).** ~14 existing tests reference Home
  structures being deleted (ladder, contact, audit-first hero). Mitigation: exhaustive
  MUTATE/DELETE list in §6 landed per-ticket; TECH-49 full-suite gate before commit.
- **R10 — BandCta/NotFound and IndustryLanding interpretation (low).** R-6's surface list omits
  these. Mitigation: A8/A9 recommended defaults recorded; owner review at UAT.
- **R11 — audit-flow regression (critical).** C-2/C-3 mechanics are locked. Mitigation:
  `/workflow-audit` is verify-only; its C-2 booking E2E must pass **unchanged**; TECH-45 only
  touches the Home §13 *display* of audit terms.

## 8. Observability / logging

- Intake submits reuse `trackContactFormAttempt` / `trackContactFormOutcome` (source
  `project_intake`) and `queueLeadFollowups`; channel clicks reuse `trackContactChannelClick`.
  No new analytics events (non-goal).
- Screenshot pipeline logs per site: URL, HTTP status, rendered-text length, capture
  `SKIP|captured` + byte size — build-time evidence for the case-study gate.
- No new server-side logging; lead fallback queue stats unchanged (`leadIntakeService`).

## 9. Security implications

- No new runtime network calls, no new dependencies, no new env vars. Screenshots are static
  assets captured at build time by a dev script (no secrets; external product URLs are the
  owner's own sites). External case-study links use `target="_blank" rel="noopener
  noreferrer"`.
- Forms reuse the validated intake pipeline (`isValidLeadEmail`); mailto fallback prevents
  silent loss. Chat links are presentational anchors from `SITE_CONTACT`.
- Security gate (D) = re-run brand/truth greps + confirm zero new network/deps + no secrets in
  committed docs; the capture script is flagged as dev tooling making outbound GETs at build
  time only.

## 10. Data / schema changes

None — no DB, no schema. New static content structures (What We Build, Industries, Process,
Transformation Pairs, Case Studies, Why NovaTech, Trust facts) live as component/data constants;
new `home.*` i18n trees in `translations.js`; two static WebP assets; regenerated `og-image.png`.
Lead payload shape unchanged (`leadIntakeService` normalization; need/budget ride in `context`).

## 11. Error / loading / empty states

- **Intake form:** `sending` (button disabled) → `sent` (confirmation, 1-business-day line) /
  `fallback` (mailto opened + feedback) / `error` (retry + direct-contact fallback) — mirror
  `AuditBookingForm` states; form renders static (no reveal delay — M-2 forms rule).
- **Case-study image:** asset missing / blocked → `onError` hides image; card stays text-only
  with caption + link (R-10 SKIP contract).
- **Capture pipeline:** non-rendering page → `SKIP` + exit 0; build proceeds text-only.
- **Anchor target:** `#project-intake` created in TECH-46; interim links inert until then
  (atomic batch commit).

## 12. Import / interface map (strict)

- `Home.jsx` imports (after rebuild): `HeroChoreo`/`HeroChoreoHeadline`, `ScrollReveal`,
  `SectionHeader`, `Apparatus`, `MeterStrip`, `MarqueeStrip`, `PriceCounter`, `IconGlyph`,
  `CaseStudyCard`, `ProjectIntakeForm`, `ProjectIntakeChatLinks`, `useLanguage` (TECH-48),
  `QUOTE_ANCHORS` + `getPricingGuideSummary` (`pricingData`), `SITE_CONTACT` +
  `buildProjectInquiryMailto` (`siteConfig`), `submitLeadIntake`, `submitContactInquiry`,
  `queueLeadFollowups`, `trackContactFormAttempt`/`trackContactFormOutcome`. **No new imports
  from outside these modules.**
- `ProjectIntakeForm.jsx` imports: `submitLeadIntake`, `submitContactInquiry`,
  `queueLeadFollowups`, `buildProjectInquiryMailto`, `trackContactFormAttempt`/`Outcome`,
  `QUOTE_BUDGET_BANDS` (`pricingData`), `useLanguage`.
- `CaseStudyCard.jsx` imports: `useLanguage` only (copy/alt via `t`); asset URL via public
  path constant.
- `capture-case-studies.mjs` imports: `chromium` from `@playwright/test` only.
- No component may import another page; no new cross-service imports; `WorkflowAudit.jsx`
  unchanged so the C-2 flow stays byte-identical.

## 13. Migration / rollback

No data migration. One feature branch (`phase11-software-first-redesign`, owned by @architect).
Commit order per AGENTS.md §5; atomic batch commit after all gates; UAT approval before merge.
Rollback if ever needed: `git revert -m 1 <merge>` → push → Vercel auto-redeploy (phase-9/10
precedent). Screenshot assets are additive (delete-safe); token swap is a single-file revert.

## 14. Ambiguity register (A1…A22 — recommended defaults, owner/architect review at UAT)

- **A1 — Exact forest-green accent.** Candidate token set (values-only, structure retained):
  `--color-paper oklch(96.5% 0.012 88)` / `paper-2 oklch(93% 0.01 88)` / `paper-3 oklch(89%
  0.01 88)`; `--color-ink oklch(23% 0.015 90)` / `ink-2 oklch(42% 0.02 90)` / `ink-3 oklch(58%
  0.02 90 / 0.9)`; `--color-accent oklch(35% 0.09 152)` (deep forest; white text ≈ 8:1) /
  `accent-2 oklch(30% 0.09 152)` (hover/pressed) / `--color-btn-ink oklch(96% 0.01 88)`;
  `--color-glow oklch(45% 0.1 152 / 0.35)` / `--color-paper-emit oklch(45% 0.1 152 / 0.05)`;
  `--rule-*`/`--rule-blueprint` near-black warm at low alpha; `.band-dark` = deep ink-green
  `oklch(16% 0.025 152)` with white ink. **Produced at build under owner review (R-16).**
- **A2 — Eyebrow numbering.** 15 sections numbered `01 … 14` (footer unnumbered): Hero `01 ·
  SOFTWARE`, Trust `02 · TRUST`, What We Build `03 · WHAT WE BUILD`, … Final CTA `14 · START
  A PROJECT`. Exact labels at build; E2E asserts the `/^\d{2} · /` pattern (existing N9).
- **A3 — Home CSS mapping.** Reuse existing classes (`.section`, `.container`,
  `.section-header`, `.editorial-card`, `.receipt-stack`, `.editorial-two-column`,
  `.glass-card`→hairline light skin, `.band-dark`) with **no new token names**; new classes
  only for genuinely new patterns: `.what-we-build-grid`, `.industry-grid`,
  `.transformation-pairs`, `.case-study-card`, `.audit-card`, `.intake-form` (in `index.css`).
- **A4 — Component reuse.** YES: `HeroChoreo` (new copy), `Apparatus` (software-first
  callouts), `MeterStrip`/`MarqueeStrip` (new labels/items), `PriceCounter` (§13 audit price),
  `ScrollReveal`, `SectionHeader`, `IconGlyph` — all unchanged code. New components only:
  `ProjectIntakeForm`, `ProjectIntakeChatLinks`, `CaseStudyCard`.
- **A5 — Dark-band positions (light-first).** Exactly two dark bands (NB-18 structure):
  band-1 after the services cluster (Process, section 9) and band-2 = Final CTA (section 14).
  All other sections on the paper canvas. AA re-verified on both.
- **A6 — Old Home `#contact` section.** Removed (replaced by section 14); contact info remains
  in the footer; contact-form E2E re-pointed to the intake form.
- **A7 — Nav CTA.** "Start a Project" → `/#project-intake` site-wide (desktop + mobile);
  `actions.startProject` label with existing AM/OM (`nav.startProject` values reused).
- **A8 — BandCta / NotFound.** Convert primary to "Start a Project" → `/#project-intake`;
  secondary Instant Quote + Pricing unchanged (band copy re-cut software-first).
- **A9 — IndustryLandingPage primary.** Convert "Book Workflow Audit" → "Start a Project" →
  `/#project-intake` (R-6 consistency; the page is a marketing content surface).
- **A10 — LeadCaptureModal.** Mechanics + variants untouched (R-6 governs heroes/final CTAs;
  auto-capture is a separate lead surface). Owner review at UAT.
- **A11 — M-4 counter placement.** Ladder gone → audit price at section 13 counts 0→15,000 ETB
  once (locked figure); ranges render static (existing A4 rule).
- **A12 — Home word gate.** Old 616 constant dies with the rebuild; new constant measured from
  the trimmed EN build at Gate C (evidence-based, phase-9 precedent) + single-line list E2E.
- **A13 — Services 6-track.** `DELIVERY_TRACKS` → Custom Software, Web, Mobile, SaaS, Business
  Systems, AI; wizard selector unchanged (already software-first); Business Systems is not a
  wizard type (R-5 edge).
- **A14 — Screenshot SKIP semantics.** SKIP → exit 0, no asset; runtime `onError` → text-only
  card; E2E asserts alt/copy/links unconditionally, image presence conditionally.
- **A15 — OG cache-bust.** `og-image.png?v=20260812` after regeneration.
- **A16 — index.html JSON-LD.** OfferCatalog re-cut software-first (Custom Software → Web →
  Mobile → SaaS → AI); ItemList synced to current nav (clears the stale-JSON-LD flag).
- **A17 — Favicon.** Accent rect → forest accent (one-line SVG; optional but recommended for
  the no-violet/brass gate).
- **A18 — AM/OM rendering scope (architect sign-off required).** Home = full trilingual
  rendering via `home.*` trees; nav/footer/modal already i18n; **other page bodies remain
  hardcoded EN** with new strings flagged NB-09 (existing precedent — page bodies have never
  rendered AM/OM). R-17 is thereby satisfied at the system level (Home is the rebuild surface;
  other pages change only CTA labels/ordering).
- **A19 — Home hero apparatus callouts.** Software-first locked facts only: `WEB · FROM 20,000
  ETB` / `MOBILE · FROM 40,000 ETB` / `SAAS · FROM 3,500 ETB / MO` / `MILESTONES · 40/30/30` /
  `SLA · 1 BUSINESS DAY`.
- **A20 — Trust row strings.** Exactly: "Web from 20,000 ETB · Mobile from 40,000 ETB · SaaS
  from 3,500 ETB / month" (locked anchors via `QUOTE_ANCHORS` + `SAAS_ENTRY_PRICE`).
- **A21 — Final-CTA chat prefill.** Compact `ProjectIntakeChatLinks` (scope/budget/note →
  WhatsApp/Telegram) mirroring the C-4 message pattern; `SupportPathLinks` untouched.
- **A22 — Operation signals.** The four audit-era operation signals (manual re-entry, single
  approver, slow response, unclear scope) move into the Trust section (section 2) framed
  software-first (R-13 edge allows reuse) or into the Industries intro; exact placement at
  build.

## 15. Verification commands

```bash
npm run build                 # vite build — must be clean
npm run lint                  # eslint . — must exit 0
npm run test:e2e              # playwright test tests/live-site.spec.js (full suite)
npx playwright test           # all specs (test:e2e:all)
node scripts/capture-case-studies.mjs          # screenshot pipeline — expect captured×2 or SKIP lines, exit 0
node scripts/generate-og-image.mjs             # regenerate public/og-image.png (TECH-50)
node scripts/theme-contrast-audit.mjs          # AA evidence (requires `npm run preview` on :4173)
# Grep gates (PowerShell):
Select-String -Path src/*.jsx,src/**/*.js,src/**/*.jsx,tests/*.js,public/*.html -Pattern "NovaTech AI" -SimpleMatch
Select-String -Path src,tests,public -Recurse -Pattern "4,000\+ students|six-figure|Exness|trusted by"
Select-String -Path src/index.css -Pattern "oklch\([^)]*265|oklch\([^)]* 50\b"   # residual Lumen tokens
```

## 16. Definition of Done

- All 11 acceptance gates (§7 of the contract) pass with recorded evidence (§6 matrix).
- Full E2E suite green (existing ~110 + new/mutated); lint + build clean; i18n AM/OM Home
  renders without clipping; prices identical across languages.
- C-2/C-3 booking flow E2E passes **unchanged**; P-1 prices unchanged; motion rules hold.
- ADR-005 merged (scribe); NB-44…NB-52 → [IMPLEMENTED] in the ledger after UAT; superseded
  docs annotated.
- Screenshot pipeline captured or SKIP-recorded both sites; assets committed; zero "NovaTech
  AI" in src/, tests/, public/ (binary PDF exempt, documented); og-image regenerated.
- UAT (human) approval before merge; rollback path documented in STATE.md.
