# Software Development Prominence & Booking Conversion — NovaTech

> **OWNER CONFIRMATION 2026-08-12.** The owner directed a rebalance of the offer hierarchy:
> software development (web, mobile, SaaS) becomes the **lead** offer track because it is the
> dominant Ethiopian market, and the site is designed as a **conversion funnel** that turns a
> visitor into a booked client with a no-brainer path to booking software development work.
> Decisions confirmed in order:
> 1. **Ranking: Software leads (Option A)** — web/mobile/SaaS precede AI on every surface; AI is
>    the specialist second track.
> 2. **Brand: "NovaTech" (Option B)** — "AI" is removed from the brand name and every brand
>    string (logo, nav, footer, SEO, modal copy, translations in EN/AM/OM). Domain unaffected.
> 3. **Home ladder structure (Option B)** — 4 rows: Workflow Audit → **Software development**
>    (Web from 20,000 · Mobile from 40,000 · SaaS from 3,500/mo) → **AI automation** (from
>    40,000) → Support & maintenance. Two equal-height build tracks, software first.
> 4. **Primary conversion: Book the Workflow Audit** (15,000 ETB, 100% credited toward the
>    build) — the least-risky paid first step. Supporting paths: **free Discovery Call** and
>    **one-tap WhatsApp/Telegram booking** for visitors not ready to pay on first visit.
> 5. **Booking mechanics (Option A): book now, pay later** — instant confirmation screen
>    ("Slot held for 48 hours"), invoice + Telebirr/bank transfer details by email, human
>    confirmation within 1 business day. No online checkout (payment rails blocked).
> 6. **Risk-reversal guarantee: YES** — "If the audit doesn't produce a usable blueprint, you
>    don't pay." Surfaced on the booking confirmation and the Workflow Audit page; reflected in
>    the Policy page audit terms (owner stands behind the promise).
>
> This document **extends** `pricing-revert-and-motion.md` (prices, discounts, motion remain
> locked and unchanged) and **supersedes the AI-forward framing** in `launch-readiness.md`
> and `visual-system-lumen.md` where copy/ordering contradicts software-first prominence.
> Brand rename supersedes `brand.name` usages everywhere. ADR-001 ETB-only policy unchanged.
>
> **STATUS: NOT YET IMPLEMENTED — pending @architect handoff and build.**

## 1. Locked facts (do not touch — carried from previous contracts)

Prices (P-1 table in `pricing-revert-and-motion.md`) · audit-first entry offer · ETB-only
policy (ADR-001) · discount program (3 months free maintenance, 3-month bug-fix warranty,
Save 2 months, 100% audit credit, one Web+AI 10% bundle line) · visual system (Lumen Night)
· editorial motion rules (M-1…M-6, G-1…G-5) · copy-trim budgets (no new walls of text) ·
i18n architecture (EN/AM/OM parity) · truth rules (no fabricated proof, no invented
testimonials, no fake urgency).

## 2. Software-first prominence rules

### S-1. Track ordering — software leads everywhere
- **Actor:** site visitor on Home, Services, Pricing, any service page, or the instant-quote wizard.
- **Trigger:** viewing any surface that lists offer tracks (ladder, delivery tracks, hero chips,
  apparatus callouts, meter labels, wizard service selector, SEO copy).
- **Visible state:** software development (web → mobile → SaaS) appears **before** AI automation
  in every such list; AI automation appears as the second, specialist track.
- **Expected outcome:** a visitor who came for a website, app, or SaaS platform sees their
  product first on every page; an AI visitor still finds AI clearly named immediately after.
- **Failure outcome:** any surface ordering AI before software is a defect; the E2E parity test
  catches it (software track index < AI track index on Home + Services).
- **Edge cases:** Workflow Audit remains the entry offer and stays **above** both build tracks on
  the Home ladder; wizard quote bands and prices are unchanged (ordering only).
- **Acceptance examples:**
  1. Home ladder rows: Audit → Software development → AI automation → Support.
  2. Services delivery tracks: Web, Mobile, SaaS, then AI automation.
  3. Instant-quote service selector lists software services before AI.

### S-2. No subordination language
- **Actor:** site visitor reading any offer description.
- **Trigger:** reading hero chips, ladder notes, delivery track text, page-hero meta, apparatus
  labels, or SEO descriptions.
- **Visible state:** software development is described as a first-class offer; the phrase
  "interface layer" (or any equivalent subordination of web/mobile/SaaS to AI) never appears;
  AI is described as "where it solves a real bottleneck", not as the core everything hangs off.
- **Expected outcome:** both tracks read as parallel specialisms; neither is a footnote to the other.
- **Failure outcome:** the forbidden-string grep gate fails the build (blocker).
- **Edge cases:** the Web+AI bundle line ("10% off when booked together") stays exactly once on
  /pricing — it references both tracks without subordinating either.
- **Acceptance examples:**
  1. Services hero chip reads parallel framing (e.g. "Software builds and AI automation — scoped
     to the bottleneck"), never "Web and mobile when an interface layer is needed".
  2. Home hero subcopy names software first: "software systems — web, mobile, SaaS — and AI
     automation where it solves a real bottleneck" (≤2 sentences, copy-trim budget respected).

### S-3. Home ladder structure
- **Actor:** Home visitor.
- **Trigger:** viewing the offer ladder.
- **Visible state:** exactly 4 rows: (1) Workflow Audit — 15,000 ETB, 5-day delivery;
  (2) **Software development** — Web from 20,000 ETB · Mobile from 40,000 ETB · SaaS from
  3,500 ETB / month; (3) **AI automation** — from 40,000 / 100,000 / 200,000+ ETB;
  (4) Support & maintenance. Both build rows carry equal visual weight (same card treatment).
  (Correction 2026-08-12: the owner-confirmed enumeration is 4 rows — the earlier "5 rows"
  wording was an arithmetic error; the enumeration above is authoritative.)
- **Expected outcome:** the software row is the dominant build offer; AI is clearly present as
  the second track.
- **Failure outcome:** rows render with unequal weight, missing prices, or AI above software.
- **Edge cases:** prices render from the locked data sources (never hardcoded); mobile viewport
  wraps rows without clipping.
- **Acceptance examples:**
  1. Ladder shows "Software development" with all three price anchors before the AI row.
  2. E2E asserts row order and locked figure strings.

### S-4. Brand rename — "NovaTech AI" → "NovaTech"
- **Actor:** visitor on any page, any language.
- **Trigger:** reading the wordmark, nav, footer, page titles, meta descriptions, modal copy, or
  contact surfaces.
- **Visible state:** the brand reads **"NovaTech"** everywhere; the string "NovaTech AI" never
  appears in rendered content, meta tags, or translations.
- **Expected outcome:** the brand is neutral; AI remains a named service track, not part of the
  company name.
- **Failure outcome:** any residual "NovaTech AI" (EN/AM/OM) fails the grep gate.
- **Edge cases:** domain/URLs unaffected; the PDF guide and legal/company registration documents
  are owner-side and out of code scope (noted in pending ledger); SEO title/description brand
  strings updated.
- **Acceptance examples:**
  1. Logo wordmark renders "NovaTech".
  2. `brand.name` EN/AM/OM translations updated; page titles updated.
  3. Grep gate: zero "NovaTech AI" in src/, tests/, public/ rendered sources.

## 3. Conversion rules

### C-1. Primary conversion action — Book the Workflow Audit
- **Actor:** visitor on any marketing page (Home, Services, Pricing, service pages, audit page).
- **Trigger:** arriving with intent to build software.
- **Visible state:** the primary CTA on every marketing hero is **"Book Workflow Audit"** (or
  equivalent per language), always accompanied by the trust pills (15,000 ETB fixed · 5 business
  days · 100% credited toward the build).
- **Expected outcome:** the paid audit booking is the obvious first action on every page; the
  free Discovery Call and one-tap chat are visible but visually secondary.
- **Failure outcome:** if the CTA hierarchy is inverted on any page (free call outranking the
  audit), the E2E catches it.
- **Edge cases:** form pages (instant quote, discovery call) keep their own primary actions; the
  audit CTA remains the marketing default.
- **Acceptance examples:**
  1. Home hero: primary button "Book Workflow Audit", secondary "View Live Pricing".
  2. Each service page hero carries the audit booking CTA or an equivalent path that lands on it.

### C-2. Booking flow — book now, pay later
- **Actor:** visitor who clicks "Book Workflow Audit".
- **Trigger:** clicking the booking CTA.
- **Preconditions:** visitor provides name, email, phone, and (optional) company.
- **Action:** form submits; the system confirms immediately.
- **Visible state:** instant confirmation screen: "Slot held for 48 hours" · next steps
  (invoice + Telebirr/bank transfer details arrive by email) · human confirmation within
  1 business day · the guarantee line (see C-3) visible on the confirmation and the audit page.
- **Expected outcome:** visitor leaves with certainty: their slot is held, they know exactly what
  to do (pay via transfer after invoice), and they know when to expect contact.
- **Failure outcome:** if the submission endpoint fails, the existing fallback behavior applies
  (mailto fallback with the same content) — the booking must never silently vanish.
- **Edge cases:** duplicate submissions (same email within 48h) must not double-book; AM/OM
  translations render the confirmation without clipping; the 48h hold is a stated commitment —
  if the owner cannot honor it, the copy must say "held until confirmed" instead (owner decision
  recorded 2026-08-12: hold is honored).
- **Acceptance examples:**
  1. Confirmation screen text contains "48" hours hold, invoice, Telebirr/bank, 1 business day.
  2. E2E fills the booking form on /workflow-audit and asserts the confirmation copy.
  3. No online payment step appears anywhere in the flow (payment rails remain blocked).

### C-3. Risk-reversal guarantee
- **Actor:** visitor considering the audit.
- **Trigger:** reading the audit offer (booking confirmation, Workflow Audit page, Home audit
  surfaces).
- **Visible state:** the guarantee appears as a short line: "If the audit doesn't produce a
  usable blueprint, you don't pay." — in EN/AM/OM.
- **Expected outcome:** the visitor understands the 15,000 ETB first step carries no downside if
  the deliverable fails.
- **Failure outcome:** if the guarantee renders on surfaces where it isn't authorized (pricing
  page, wizard), it's a copy defect — it belongs on the audit surfaces + booking confirmation +
  Policy page audit terms.
- **Edge cases:** Policy page audit terms gain one line reflecting the guarantee (legal surface —
  owner confirmed 2026-08-12); no other legal language changes.
- **Acceptance examples:**
  1. Workflow Audit page shows the guarantee line once.
  2. Booking confirmation shows the guarantee line.
  3. Policy page audit terms include the refund/blueprint promise.

### C-4. Supporting paths — free call + one-tap chat
- **Actor:** visitor not ready to pay on first visit.
- **Trigger:** deciding the paid audit is too much commitment right now.
- **Visible state:** on the Workflow Audit page and contact surfaces, two secondary paths:
  (a) "Book a free Discovery Call" (SLA: response within 1 business day, call within 3,
  proposal within 5 of discovery) and (b) one-tap chat (WhatsApp/Telegram) with a pre-filled
  message: "I need a [web / mobile / SaaS] build · budget: [band] · [optional note]".
- **Expected outcome:** a not-ready visitor can reach the owner in one tap without losing the
  context they already typed.
- **Failure outcome:** if the pre-filled message drops the scope or budget context, the E2E
  fails; channels must use the existing contact configuration (no new integrations).
- **Edge cases:** chat links open with the correct pre-filled text in all three languages;
  no new analytics events required (presentational links).
- **Acceptance examples:**
  1. Audit page shows both supporting paths below the primary booking CTA.
  2. WhatsApp link contains the pre-filled scope/budget message.
  3. Discovery Call page unchanged in mechanics (existing flow), only ordering/copy adjusted.

## 4. Surfaces inventory (behavior-level; exact strings produced at build under owner review)

1. Home: hero subcopy, ladder rows/notes, apparatus callouts, meter label, marquee content
   (locked figures only), hero chips, SEO description.
2. Services: delivery tracks order, hero chips, meter label, apparatus label, SEO description.
3. WorkflowAudit: hero copy, apparatus callouts, meter label, booking form + confirmation
   (C-2/C-3), guarantee line, supporting paths (C-4).
4. Web/Mobile/SaaS/Additional pages: hero chips, callouts, meter labels (software-first naming).
5. Pricing: track ordering where tracks appear; SaaS rows untouched (locked); bundle line once.
6. InstantQuote: service selector order (software first), intro copy.
7. Nav/Footer: dropdown order already software-first (verify); brand strings (S-4); footer brand.
8. SEO: meta titles/descriptions re-cut (software-first, brand "NovaTech").
9. i18n: EN/AM/OM parity for every changed string (NB-09 native review flag for new strings).
10. Policy: audit terms + guarantee line (C-3); legal copy otherwise untouched.
11. E2E: re-baseline changed strings; new parity/order tests (S-1, S-2), booking-flow test
    (C-2), guarantee surface test (C-3), brand grep (S-4), chat prefilled-link test (C-4).

## 5. Acceptance gates (for QA/security, run before any merge)

1. **Ordering gate** — software track renders before AI track on Home + Services + wizard
   (E2E index comparison).
2. **Forbidden-string gate** — "NovaTech AI" (EN/AM/OM), "interface layer", and any
   subordination phrasing absent from src/, tests/, public/.
3. **Brand gate** — wordmark, titles, metas render "NovaTech".
4. **Booking gate** — booking flow E2E: fill → confirm ("Slot held for 48 hours", invoice +
   Telebirr/bank, 1 business day, guarantee line); no checkout step.
5. **Guarantee gate** — guarantee line present on audit page + booking confirmation; Policy
   audit terms updated.
6. **Support-path gate** — free call + one-tap chat present on audit page; pre-filled message
   carries scope + budget; correct in all three languages.
7. **Regression gate** — existing suite (101 E2E + new tests) green; prices unchanged; motion/
   reduced-motion/visual gates still pass; i18n renders without clipping.

## 6. Non-goals / explicitly unchanged

Prices and discount program · audit entry offer · ETB-only policy · Lumen Night visual system ·
editorial motion rules · copy-trim budgets (new copy must stay within trimmed budgets) ·
i18n architecture · nav structure (labels/order inside existing menus only) · payment rails
(blocked; booking flow works without them) · legal/company registration documents · PDF guide
(owner-side) · no new analytics events, no new dependencies, no new network calls.
