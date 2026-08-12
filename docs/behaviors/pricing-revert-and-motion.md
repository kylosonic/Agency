# Pricing Revert, Discounts, Copy Trim & Editorial Motion — NovaTech AI

> **OWNER CONFIRMATION 2026-08-11.** The owner reviewed the price inflation evidence
> (original March 2026 table vs. the August 2026 locked table) and confirmed, in order:
> 1. Keep Workflow Audit + AI as products, repriced to original-era levels (**Scenario B**).
> 2. Trim further: audit 15,000 ETB; AI from 40k / 100k / 200k+ ETB (**confirmed as-is**).
> 3. Discounts: restore original promos + Web+AI bundle discount (**Option 3**).
> 4. Copy trim site-wide (**Option B** — deep cut on Home + Pricing, repeat-kill elsewhere).
> 5. Animation style: editorial motion, restrained (**Option 1**).
>
> This document **supersedes** the conflicting pricing rules in `launch-readiness.md`
> (B5, B6, B8, B9, B10, B11) and the pricing figures in `visual-system-fortune500.md` /
> `visual-system-lumen.md` where they reference locked figures. ADR-001's ETB-only policy
> remains in force; its *figures* are replaced by the table below. A formal ADR amendment
> (ADR-003 or amendment to ADR-001) is required so docs and code do not contradict.
>
> **STATUS: NOT YET IMPLEMENTED — pending @architect handoff and build.**

## 1. Pricing Table (single source of truth)

| Product | Published price | Cadence | Notes |
|---|---|---|---|
| Workflow Audit | **15,000 ETB fixed** | One-time | Delivered in 5 business days; 100% credited toward any implementation project that follows |
| Web — Digital Presence (Starter) | **from 20,000 ETB** | One-time | Includes **3 months free maintenance** |
| Web — Growth & Conversion | **50,000 – 80,000 ETB** | One-time | Scope-led |
| Web — Enterprise | **150,000+ ETB** | One-time | Custom |
| Mobile — Basic Utility App | **40,000 – 60,000 ETB** | One-time | Includes **3-month bug-fix warranty** |
| Mobile — Business & E-Commerce App | **80,000 – 150,000 ETB** | One-time | Scope-led |
| Mobile — Enterprise / FinTech App | **200,000+ ETB** | One-time | Custom (tier restored) |
| AI — Tier 1 Foundational | **from 40,000 ETB** | One-time + monthly | Monthly support **10,000 – 25,000 ETB / month** |
| AI — Tier 2 Operational | **from 100,000 ETB** | One-time + monthly | Monthly support **10,000 – 25,000 ETB / month** |
| AI — Tier 3 Enterprise | **from 200,000+ ETB** | One-time + monthly | Monthly support **10,000 – 25,000 ETB / month** |
| SaaS — School Management | **3,500 ETB / month** | Monthly | Setup 25,000 ETB; annual 35,000 ETB ("Save 2 months") |
| SaaS — Clinic/Hospital ERP | **5,000 ETB / month** | Monthly | Setup 35,000 ETB; annual 50,000 ETB ("Save 2 months") |
| SaaS — Real Estate CRM | **3,000 ETB / month** | Monthly | Setup 20,000 ETB; annual 30,000 ETB ("Save 2 months") |
| Web Maintenance | **8,000 – 20,000 ETB / year** | Annual | Reverts to annual (original model); written commitment |
| Domain & Cloud Hosting | **1,500 – 5,000 ETB / year** | Annual | Domain registration |
| Cloud Web Hosting | **5,000 – 15,000 ETB / year** | Annual | High-speed cloud server |
| Logo & Visual Identity | **5,000 – 15,000 ETB** | One-time | |
| Copywriting | **3,000 – 10,000 ETB / project** | One-time | |
| Commercial Photography | **5,000 – 20,000 ETB / session** | One-time | |

### P-1. Single source of truth
- **Actor:** site visitor on any pricing surface (pricing page, service pages, instant quote wizard, PDF guide).
- **Trigger:** viewing any price.
- **Visible state:** the number shown matches the table above exactly (including ranges and "from X ETB" anchors).
- **Expected outcome:** the same scope quoted in the wizard and on the pricing page yields the same number; no USD anywhere; SaaS shows real prices (waitlist messaging removed).
- **Failure outcome:** if a source diverges, the static table wins and the divergence is logged as a defect.
- **Edge cases:** remote pricing endpoint (`VITE_PRICING_DATA_ENDPOINT`) must be updated or removed — a stale endpoint showing old figures is a release blocker.
- **Acceptance examples:**
  1. Pricing page web starter shows "from 20,000 ETB" with "3 months free maintenance" in features.
  2. Instant quote for a small web scope returns a band that starts at 20,000 ETB (never below).
  3. SaaS school card shows "3,500 ETB / month" + setup + annual "Save 2 months" — no "Waitlist only".
  4. PDF pricing guide matches the table (human diff passes).

### P-2. Audit entry offer
- **Actor:** site visitor.
- **Trigger:** viewing the audit offer on Home, Pricing, or Workflow Audit page.
- **Visible state:** "15,000 ETB fixed", "delivered within 5 business days", "100% credited toward your build".
- **Expected outcome:** a visitor understands the audit is the affordable paid first step and that the fee is not lost if they continue.
- **Failure outcome:** any page still showing 85,000 ETB fails the gate.
- **Edge cases:** the audit price also appears in hero callouts, meter strips, apparatus callouts, and the PDF — all must show 15,000.
- **Acceptance examples:**
  1. Home hero trust pills read "15,000 ETB fixed", "Delivered in 5 business days", "Fee credited toward implementation".
  2. Workflow Audit page heading and CTA panel show the new figure.

### P-3. Discount program
- **Actor:** site visitor.
- **Trigger:** viewing any pricing surface or the Home offer ladder.
- **Visible state:**
  - Web starter: "3 months free maintenance" listed as an included feature.
  - Mobile: "3-month bug-fix warranty" listed as an included feature.
  - SaaS cards: annual billing shows "Save 2 months".
  - Web + AI bundle: "10% off when booked together" shown once on the pricing page (not repeated site-wide).
  - Audit credit: "100% credited" on all audit mentions.
- **Expected outcome:** a visitor can identify at least one concrete discount without scrolling the whole page.
- **Failure outcome:** conflicting discount claims (e.g., "20% off" leftovers from the founding-client pilot) fail the gate; the pilot 15–20% offer is **removed** (replaced by the new program).
- **Edge cases:** the 10% bundle discount must be computable in the instant quote tool when both Web and AI are selected, or the claim is hidden from the wizard.
- **Acceptance examples:**
  1. No page anywhere mentions "founding-client pilot" or "15–20% off" (grep fails).
  2. Pricing page shows exactly one bundle line: "Web + AI automation booked together: 10% off".

## 2. Copy Trim (site-wide)

### C-1. Deep cut — Home and Pricing
- **Actor:** site visitor reading Home or Pricing.
- **Trigger:** page load.
- **Visible state:** total visible word count reduced by roughly 40% vs. current build; every paragraph ≤ 2 lines on desktop; no repeated message appears more than twice per page.
- **Expected outcome:** a visitor can state what NovaTech sells and the price of a starter web site after one 10-second scan.
- **Failure outcome:** sections that read like policy disclaimers ("no fake urgency, no hidden currency logic…") remain; the gate fails.
- **Edge cases:** Amharic/Afaan Oromo translations must be re-cut to match the shorter English copy (no orphaned long strings); contact form and legal copy are exempt from trimming.
- **Acceptance examples:**
  1. Home hero paragraph is ≤ 2 sentences; "audit fee credited" appears once on Home.
  2. Pricing AI tier scope paragraphs are ≤ 1 sentence plus a bullet list of scope drivers.
  3. No section repeats "SaaS is waitlist only" (SaaS now has real prices — that whole disclaimer family is deleted).

### C-2. Repeat-kill — all other pages
- **Actor:** site visitor on any service page (Web, Mobile, SaaS, Additional Services, Instant Quote, Discovery Call, Industries).
- **Trigger:** page load.
- **Visible state:** duplicate messages (audit credit, ETB-only note, response commitments) appear at most once per page; no sentence is repeated verbatim on two pages.
- **Expected outcome:** pages feel shorter without losing the required policy/contact/legal content.
- **Failure outcome:** pages where trimming removes required legal/policy statements fail the gate.
- **Edge cases:** all three languages stay in parity after the cut.
- **Acceptance examples:**
  1. "ETB only / quoted individually" appears once on Pricing and once on Policy, nowhere else.
  2. SaaS page shows live prices + annual discount, no "coming soon" language.

## 3. Editorial Motion (restrained — Option 1)

### M-1. Hero entrance choreography
- **Actor:** site visitor landing on any marketing page hero (Home, Pricing, Services, Web, Mobile, SaaS, AI, Workflow Audit).
- **Trigger:** first paint.
- **Visible state:** one choreographed reveal: eyebrow → headline (staggered words or line masks) → subcopy → CTA row, each ~120–200 ms apart; total ≤ 1.2 s; nothing moves after.
- **Expected outcome:** the page feels crafted, not busy; the hero is fully readable within 1.2 s.
- **Failure outcome:** looping/continuous animation in the hero; elements still animating after 2 s; layout shift during reveal.
- **Edge cases:** reduced-motion users see the hero fully rendered, static; Amharic headlines reveal as one block (no per-word stagger — Ethiopic word splitting must not clip).
- **Acceptance examples:**
  1. Hard-refresh Home: eyebrow appears, then headline lines, then copy, then buttons — no overlap.
  2. With OS reduced-motion on: hero is static on first paint.

### M-2. Scroll reveal motion
- **Actor:** site visitor scrolling any page.
- **Trigger:** a section enters the viewport (≥ 20% visible).
- **Visible state:** sections lift + fade in (translateY 16–24 px → 0, opacity 0 → 1, 500–700 ms, ease-out); cards inside a grid stagger 60–100 ms; no blur required (blur only if GPU-safe — otherwise omit).
- **Expected outcome:** motion supports hierarchy; content is readable mid-animation.
- **Failure outcome:** elements already in the viewport on load animating again on scroll; cards jumping (layout shift); reveal never firing for above-the-fold content.
- **Edge cases:** forms and interactive controls render static (no reveal delay on inputs/buttons that users need to click); reduced-motion = no transform/opacity animation, elements visible immediately.
- **Acceptance examples:**
  1. Scroll to the offer ladder: rows lift in sequence, not simultaneously.
  2. Contact form appears without animation on Home.

### M-3. Hover micro-interactions
- **Actor:** site visitor hovering cards, buttons, or links.
- **Trigger:** pointer enters the element.
- **Visible state:** cards lift ≤ 4 px with a border/background tint; buttons shift color and lift ≤ 2 px; links get an underline sweep; duration 150–250 ms.
- **Expected outcome:** interactive elements feel alive without competing with content.
- **Failure outcome:** hover triggers on touch devices causing stuck states; large scale/rotate effects; hover on non-interactive elements.
- **Edge cases:** keyboard focus gets the same treatment as hover (focus-visible); reduced-motion users get color-only feedback.
- **Acceptance examples:**
  1. Hovering a pricing card lifts it 4 px with a subtle accent border.
  2. Tabbing to a button shows the same lift via focus-visible.

### M-4. Animated price counters
- **Actor:** site visitor on Pricing page or Home offer ladder.
- **Trigger:** a price figure enters the viewport.
- **Visible state:** the price counts up from a lower bound to its final value over 600–900 ms (e.g., 15,000 ETB), using tabular mono numerals; no decimal jitter.
- **Expected outcome:** prices draw attention and match the locked table exactly at rest.
- **Failure outcome:** counters landing on wrong values; counters re-triggering on every scroll pass; motion on reduced-motion.
- **Edge cases:** ranges ("50,000 – 80,000") animate the first bound only or render static — choose one, keep it consistent; SaaS monthly prices animate like others.
- **Acceptance examples:**
  1. Scroll to audit price: it counts 0 → 15,000 ETB and stays.
  2. Reduced-motion: price shows immediately, no counter.

### M-5. Marquee strip
- **Actor:** site visitor on Home (below hero) or Pricing.
- **Trigger:** page load.
- **Visible state:** one slow marquee (≤ 20 px/s) repeating key offers (e.g., "AUDIT 15,000 ETB · WEB FROM 20,000 · 3 MONTHS FREE MAINTENANCE · SAVE 2 MONTHS ANNUAL"); seamless loop, pause on hover.
- **Expected outcome:** the strip adds motion without stealing attention; text remains legible (adequate contrast, no clipping).
- **Failure outcome:** marquee on reduced-motion (must be static); content overflowing/clipping on mobile; more than one marquee per page.
- **Edge cases:** the strip must not duplicate the meter strip's position; on mobile it may sit under the hero.
- **Acceptance examples:**
  1. Home shows exactly one marquee strip with the locked figures.
  2. Reduced-motion: strip renders as a static single line.

### M-6. Page transitions
- **Actor:** site visitor navigating between routes.
- **Trigger:** route change.
- **Visible state:** a 200–300 ms fade/slide of the incoming page; no overlay spinner.
- **Expected outcome:** navigation feels continuous; back/forward work with the same transition.
- **Failure outcome:** transitions that block the target page's hero choreography (M-1) or trap focus; transitions on reduced-motion.
- **Edge cases:** first load has no transition (only hero choreography).
- **Acceptance examples:**
  1. Clicking Pricing from Home fades the new page in over ~250 ms.
  2. Reduced-motion: instant route swap, no fade.

## 4. Global motion constraints

- **G-1.** Every animation respects the existing reduced-motion media query; reduced-motion users see a fully static, fully readable page.
- **G-2.** Total animation budget per page: hero choreography + scroll reveals + hover feedback + at most one marquee. Nothing else moves.
- **G-3.** No element animates longer than 1.2 s per trigger; no infinite animation except the marquee (≤ 20 px/s) and the existing apparatus pulse.
- **G-4.** Animations must not cause layout shift (transform/opacity only, no width/height/top/left animation).
- **G-5.** All figures animated or displayed come from the locked pricing table (P-1); counters must land exactly on locked figures.

## 5. Acceptance gate (QA)

1. Grep gate: no "85,000", "250,000 / 750,000 / 1,500,000", "from 45,000 ETB", "from 200,000 ETB", "founding-client", "15–20%", "Waitlist only", "5,000 to 15,000 ETB / month" anywhere in rendered content (code may keep historical comments only).
2. Figure gate: every rendered price on every page matches the P-1 table.
3. Wizard parity: instant quote bands for web/mobile/AI match the P-1 anchors (web [20000..80000], mobile [40000..150000], AI [40000..200000+]); no band below 15,000.
4. Copy gate: Home + Pricing word counts are ≥ 35% lower than the current build (measured on rendered text); no repeated message > 2× per page.
5. Motion gate: hero choreography ≤ 1.2 s; scroll reveals fire once; hover lift ≤ 4 px; exactly one marquee per page; reduced-motion build shows zero animation; no layout shift on any reveal.
6. i18n gate: Amharic + Afaan Oromo mirrors of the trimmed copy exist and render without clipping; prices render identically across languages.
7. E2E: existing Playwright suite passes with the re-baselined selectors.
