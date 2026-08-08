# Phase 4 Blueprint — Copy Humanization Pass EN/AM/OM (TECH-07 / B23 / NB-09)

**Date:** 2026-08-07 · **Author:** @plan · **Governed by:** launch-readiness B23 (also B1, B14, B24 constraint checks), pending-behaviors NB-09, tech-backlog TECH-07, Phase 2/3 blueprints (locked copy surfaces)
**Arbitrated by @architect:** blueprint accepted as-is. Spec ships byte-identical (verified: no asserted string is a violation). NB-09 stays unmarked until the native-speaker review gate (§8.6) is recorded by the owner.

## 0. Headline finding
The E2E spec can stay byte-identical — no asserted string is a B23 violation. Violations live in FAQ answers, proof-strip titles, section headers, placeholders, and card/hero copy (none asserted). Result: **12 KEEP / 0 UPDATE / 0 RISK** — 67 tests must pass with a zero-diff spec.

## 1. Violation inventory (the work list)

### A. Uniform "Yes." FAQ openings (the #1 tell)
**A1. EN — `src/config/contentData.js` → `serviceFaqs` (8 of 13):** `web[0]`, `web[2]`, `mobile[0]`, `mobile[1]`, `mobile[2]`, `saas[1]`, `additional[0]`, `additional[2]` all begin "Yes." (already-clean: `web[1]`, `saas[0]`, `saas[2]`, `additional[1]` — leave them).
**A2. AM — `amContentOverrides.faqs`:** 8 answers begin "አዎ።" (lines ~1015–1065).
**A3. OM — `omContentOverrides.faqs`:** 8 answers begin "Eeyyee." (lines ~1534–1584).
**A4. SEO JSON-LD — `seoService.js` line 233:** `/policy` FAQ schema answer "Yes. After final payment, clients receive full ownership…"

### B. Filler words
- **B1** `Home.jsx` line 52: "We design a **streamlined** technical blueprint…"
- **B2** `AdditionalServicesPage.jsx` line 84 fallback: "…launch, maintain, and **elevate** your digital products."
- **B3/B4** `Services.jsx` line 25: "**cutting-edge** frameworks… **unstoppable** scraping engines"
- **B5** `Services.jsx` line 18: "…complete **peace of mind**."
- **B6** `Home.jsx` line 203: "Systems Built for **Throughput, Not Busywork**" ("X, Not Y" AI-slogan form)
- Clean confirmed: no `seamless/unleash/next-gen/unlock/empower/harness` anywhere in src/ (all layers). Do not re-introduce.

### C. Placeholder-sounding names/numbers
- **C1–C9:** "Hana Bekele" / "team@company.et" / "Aster Ventures" in `translations.js` EN base (138/140/142), AM overrides (1106), AM final overrides (1670/1671), OM overrides (1106), OM final overrides (1795/1796/1797).
- **C10** `Home.jsx` 325/338 hardcoded duplicates. **C11** `LeadCaptureModal.jsx` 305/317/329 EN fallbacks.
- **C12–C14:** "Kickoff In **48 Hours**" (web.proof.0.title fallback + AM/OM mirrors) — fabricated precision contradicting its own body text ("within two business days").
- **NOT violations (locked policy — do not touch):** 85,000 ETB, 5 business days, 250k/750k/1.5M+, 45k/150k/250k, 200k/400k, 30–70k/mo, 5–15k/mo, 40%/30%/30%, 15–20%, "within 24 hours".

### D. Parallel rhythm
- **D1:** Home — 4 consecutive SectionHeaders (AI Solutions / Product Engineering / Methodology / Contact) all tag+declarative+subtitle.
- **D2:** Home CTA band question — KEEP (page's single question).
- **D3:** RouteProofStrip ×5 pages — uniform Title-Case noun titles; one per page changes grammatical form.
- **D4:** "Need a Custom Quote?" / "Need Something Custom?" / "Need Clarification Before You Start?" — vary two of three.
- **D5/D6:** VERIFY ONLY. **D7:** `industryLandingContent.scope` week figures — verify against PDF (TECH-10); never invent.

### E. Light-touch overclaims
- **E1** `saas.hero.subtitle`: "instant deployment" → "fast deployment".
- **E2** `web.hero.subtitle`: "dominating your market" → "a platform your operation depends on".
- **E3** `seoService.js` `/services` desc: drop "for full operational transformation".
- **E4** `seoService.js` `/web-development` desc: concrete rewrite.

## 2. Rewrite directives (EN final; AM/OM follow same structure, machine-translation acceptable, ALL flagged for native review)

### FAQ answers — open with the situation, never "Yes.", facts byte-equivalent:
1. `web[0]` → "Once the final milestone payment clears, ownership of the source code and design files transfers fully to your team."
2. `web[2]` → "After launch, annual maintenance and growth retainers backed by an SLA keep the system stable — and we stay on hand for the next build."
3. `mobile[0]` → "Both platforms ship from the same codebase using cross-platform frameworks, with native bridges reserved for performance-critical modules."
4. `mobile[1]` → "Store submission is part of the build — we prepare the submission artifacts, policy compliance checks, and release checklists for both stores."
5. `mobile[2]` → "Telebirr, Chapa, and card gateways can be integrated; the right choice depends on your business model and where your users pay."
6. `saas[1]` → "Annual subscriptions are discounted and include planned optimization checkpoints."
7. `additional[0]` → "Each add-on can be scoped on its own or bundled with your development package."
8. `additional[2]` → "Bundles are built around your launch timeline and growth priorities, so pricing follows the scope you actually need."
- **A4** → "Once the final payment clears, clients receive full ownership of custom design assets, source code, and project intellectual property."

### Filler words:
- **B1** → "We design a technical blueprint that shows exactly where custom agents, local models, and autonomous browser scripts replace manual labor."
- **B2** → "Everything you need to launch, keep running, and grow your digital products."
- **B3/B4** → "Bypass the need for clean, official APIs. We build web navigators on frameworks like Stagehand and Browserbase that work a page the way a person would. These agents log into vendor portals, move through multi-page forms, and run scheduled scraping jobs that pull live competitor pricing into your database."
- **B5** → "You get zero token costs and zero cloud telemetry leaving your network."
- **B6** → Section-1 title: "Automation built for the work your team does every day".

### Placeholders (rule: affordance examples are not claims; example.com is IANA-reserved):
- Name → "Sara Tesfaye" (AM: "ሳራ ተስፋዬ" flag; OM: "Sara Tesfaye")
- Email → "sara.tesfaye@example.com" (all languages)
- Company → "Mesob Trading PLC" (AM: "ሜሶብ ንግድ PLC" flag; OM: "Mesob Trading PLC")
- Keep AM/OM "(ለምሳሌ)" / "(fakkeenya)" annotation convention.
- **C12–C14** → "Two Business Days to Kickoff" / "በ2 የስራ ቀን ውስጥ ጅምር" / "Kickoff guyyoota hojii lama keessatti".

### D3 proof-strip variation (one title per page changes form; body untouched):
- web: 0 → fragment "Two Business Days to Kickoff"; 2 → sentence "Launch readiness is included"
- mobile: 0 → sentence "The flow comes first"; 2 → imperative "Launch, then iterate"
- saas: 0 → fragment "A short path to go-live"; 2 → fragment "Security and platform updates, handled"
- additional: 1 → fragment "Renewals you can predict"
- policy: 1 → fragment "Billing with no surprises"
- AM/OM mirrors re-authored; flag native review.

### D4 CTA variation:
- web `web.cta.title` "Need a Custom Quote?" → KEEP
- additional fallback "Need Something Custom?" → "Custom requirements?"
- policy fallback "Need Clarification Before You Start?" → "Clarify the terms before you start"

### E light-touch per §1; AM/OM mirrors re-translated (flag).

## 3. Merge-chain precedence (authoritative — final layer wins)
- `faqs.*.answer` (×8/lang): EN in `contentData.js`; AM `amContentOverrides.faqs` (NOT amFinalOverrides); OM `omContentOverrides.faqs` (NOT omFinalOverrides)
- `leadCapture.form.fullNamePlaceholder`: EN 138; AM `amContentOverrides` 1106; OM `omFinalOverrides` 1795
- `leadCapture.form.emailPlaceholder`: EN 140; AM `amFinalOverrides` 1670; OM `omFinalOverrides` 1796
- `leadCapture.form.companyPlaceholder`: EN 142; AM `amFinalOverrides` 1671; OM `omFinalOverrides` 1797
- proof titles / catalog subtitle / CTA titles: JSX fallbacks (EN) + content/final override layers per blueprint §3
- After each layer edit: grep the key across all layers; no stale duplicate may shadow the edit.
- **JSX fallback duality:** every `t(key, fallback)` with changed copy requires BOTH the fallback literal and the language-layer values to change in lockstep.

## 4. Step-by-step execution (atomic order)
1. `src/config/contentData.js` — 8 EN FAQ answers.
2. `src/i18n/translations.js` — EN base placeholders; AM/OM FAQ answers + placeholders + proof titles + catalog subtitle + CTA titles + hero subtitles per §3 precedence.
3. `src/pages/Home.jsx` — §1 title (B6); §3 Methodology → tag dropped, title "What happens after the audit?"; §4 Contact → tag dropped, title "Tell us where the manual work lives."; §2 title → "The same delivery standard applies to web, mobile, and SaaS builds"; METHODOLOGY_STEPS[1] (B1); placeholders (325/338); CTA band + hero untouched.
4–8. `WebDevelopmentPage.jsx`, `MobileDevelopmentPage.jsx`, `SaasSolutionsPage.jsx`, `AdditionalServicesPage.jsx`, `PolicyPage.jsx` — fallback literals per §2.
9. `Services.jsx` — B3/B4/B5 copy blocks.
10. `LeadCaptureModal.jsx` — EN fallback placeholders (305/317/329).
11. `seoService.js` — FAQ schema answer (233); `/services` + `/web-development` EN descriptions; AM/OM mirrors.
12. `tests/live-site.spec.js` — NO CHANGES; `git diff -- tests/` must be empty.
13. Verification gates (§8), then graphify (unavailable — skip, note).

## 5. Placeholder rule
Replace with "Sara Tesfaye" / "sara.tesfaye@example.com" / "Mesob Trading PLC". Justification: form placeholders are affordance examples, not claims; example.com is IANA-reserved (RFC 2606); "Sara Tesfaye" is a common non-identifying Ethiopian name; "Mesob Trading PLC" is a word-name minimizing real-entity collision. Spec impact: none (no test asserts placeholders).

## 6. Parallel-rhythm plan
§1 declarative (rewritten concrete), §2 declarative (rewritten, breaks "…Is an Equal Core Track" apposition), §3 QUESTION (tag dropped), §4 IMPERATIVE FRAGMENT (tag dropped). CTA band keeps the page's only question. Proof strips: one title per page switches grammatical form. CTAs: web KEEP, additional + policy rewritten. Result: no two adjacent sections share a header structure; no two page CTAs share an opening word.

## 7. E2E impact map — ALL KEEP (spec byte-identical)
Asserted strings that must not change: leadCapture.closeAria, instantQuote.actions.generate, instantQuote.result.title, discovery.form.submit/success, "Send Message", "…respond within 24 hours.", "quoted individually", all pricing values, tab labels, "Coming soon" ×6, "bank transfer", "CBE Birr", "tell us you want it", absence of card-handling/marketing terms, "40%"/"30%" ×2, "Full Ownership Guarantee", localized payment-methods titles, absence of proof phrases, pilot offer strings ×8 + localized headlines + "Claim founding-client rate", absence of "Branding and Additional Services"/"Under 50k ETB", budget options list, "85,000 ETB" floor, "5 business days", "credited toward", absence "1-2 week audit cycle", localized page titles.
**Do-not-touch strings:** pilotOffer.*, saas.labels.comingSoon, budget/timeline labels, waitlist phrases, policy.sections.*, discovery.form.*, instantQuote.result.*, leadCapture.closeAria, Home button + success literals, every pricing value.

## 8. Verification gates
1. Filler gate: `rg -i "elevate|seamless|unleash|next-gen|unlock|empower|streamline|harness" src/` → 0
2. Yes-gate: no FAQ answer starts with `Yes.` / `አዎ።` / `Eeyyee.` (incl. seoService schema)
3. Placeholder gates: `rg "Hana Bekele|team@company\.et|Aster Ventures|48 hours|Kickoff In 48" src/ public/` → 0
4. E2E: 67/67 green; `git diff -- tests/live-site.spec.js` → empty
5. Lint + build clean
6. **Native-review gate (manual, owner-side, pre-launch):** flagged AM/OM strings reviewed by native Amharic + Afaan Oromo readers — list: 8 AM FAQs + 8 OM FAQs, AM/OM proof titles (web×2, mobile×2, saas×2, additional×1, policy×1), AM/OM catalog subtitle, AM/OM additional/policy CTA titles, AM/OM saas/web hero subtitles, AM/OM placeholders, AM/OM SEO descriptions. NB-09 stays open until recorded.

## 9. Risks
R1 merge-chain shadowing (precedence table authoritative) · R2 JSX fallback duality (grep both sides) · R3 spec collisions (do-not-touch list; escalate, never edit spec opportunistically) · R4 SEO surface in scope; index.html static JSON-LD + noscript stale entries OUT of scope (TECH-09) · R5 AM/OM machine-translation quality (native gate) · R6 locked-copy regressions (pilot/waitlist/policy/pricing) · R7 industry week figures vs PDF (TECH-10) · R8 launch kit out of bounds (TECH-12) · R9 graphify unavailable.

## 10. File tally
**MODIFY (11):** contentData.js · translations.js · Home.jsx · WebDevelopmentPage.jsx · MobileDevelopmentPage.jsx · SaasSolutionsPage.jsx · AdditionalServicesPage.jsx · PolicyPage.jsx · Services.jsx · LeadCaptureModal.jsx · seoService.js
**MODIFY (0):** tests/live-site.spec.js — byte-identical
**CREATE (0). VERIFY ONLY (2):** Pricing.jsx (D5), IndustryLandingPage/industryLandingContent (D7).

**Blueprint status:** complete and arbitrated. Ready for @build execution.
