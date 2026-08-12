# Software-First Brand Redesign & Build-Intake Conversion — NovaTech

> **OWNER CONFIRMATION 2026-08-12.** The owner directed a full repositioning of the site:
> NovaTech is a **software development and digital solutions company first**, with **AI
> automation as a secondary but premium capability**. The Ethiopian market is the primary
> context. The brand message is **"Software first. AI when it adds value."**
> Decisions confirmed in order (2026-08-12):
> 1. **Conversion model:** a client who wants NovaTech to build them software (website, app,
>    business system, SaaS). **"Start a Project" is the primary CTA site-wide**; AI automation
>    is secondary but always visible.
> 2. **"Start a Project" destination:** inline project-intake form on the Homepage (no new
>    page); "Discuss Your Software Idea" → existing Discovery Call page; "Explore AI &
>    Automation" → AI section anchor. Post-submit: instant confirmation + existing lead
>    pipeline (store, forward, follow-up queue, mailto fallback). No new integrations.
> 3. **Workflow Audit:** still for sale at Homepage section 13 with its **exact current
>    mechanics unchanged** (15,000 ETB, 5-day delivery, 48h hold, pay-later, 100% credit,
>    risk-reversal guarantee — C-2/C-3 carry forward). Demoted from hero; no longer primary CTA.
> 4. **Case studies:** two real delivered products — Stealth Overlay (AI interview assistant)
>    and Rhobot Academy (Amharic forex learning platform). Claim level: **"Designed and
>    developed by NovaTech."** Client business claims (4,000+ students, six-figure capital,
>    Exness partnership) are excluded.
> 5. **Screenshots:** real Playwright captures of both live products, one desktop capture
>    each, shown only inside the Selected Work cards; dropped if a page cannot render
>    meaningfully. This batch amends the "no imagery anywhere" rule (B-36/NB-23) narrowly for
>    these two cards only.
> 6. **Brand:** wordmark stays **"NovaTech"** (Phase 10 S-4 continues; no "NovaTech AI" in UI).
> 7. **Hero headline (direction 1):** **"Software built around your business."**
> 8. **Process section:** 5 steps from locked facts only (Discovery → optional Workflow Audit →
>    Scoped proposal → Build 40/30/30 → Support).
> 9. **Industries section:** buildable system categories tied to local-reality problems; **no
>    specialization claims** (no "trusted by", no stats).
> 10. **Home pricing ladder:** removed from Home; audit terms carry at section 13 with a
>     "View Live Pricing" link; hero trust row shows software-first anchors; marquee keeps
>     locked figures; meter labels re-cut software-first.
> 11. **Visual change:** **new light-first palette within the existing design system** (Option
>     1 — structure kept: typography-led heroes, hairline cards, apparatus, meter, marquee,
>     receipt rows, restrained editorial motion). Palette direction: warm off-white/paper
>     canvas, near-black ink, one deep **forest-green** accent (exact hex produced at build
>     under owner review). Supersedes the Lumen Night palette (cool violet + molten brass).
>
> This document **extends** `software-development-prominence.md` (S-2, S-4, C-2, C-3, C-4
> carry forward) and **supersedes**: S-1 track ordering (new 6-track hierarchy below), C-1
> primary CTA (now "Start a Project"), the Home ladder placement in S-3, and the Lumen Night
> **palette** in `visual-system-lumen.md` (structure retained). Prices, discounts, motion
> rules, ETB-only policy (ADR-001), and ADR-003 figures remain locked and unchanged.
> An ADR amendment (ADR-005 recommended) must record the CTA supersession + palette change.
>
> **STATUS: NOT YET IMPLEMENTED — pending @architect handoff and build.**

## 1. Locked facts (do not touch — carried from previous contracts)

Prices (P-1 table in `pricing-revert-and-motion.md`) · ETB-only policy (ADR-001) · discount
program · audit booking mechanics (C-2: book now/pay later, 48h hold, invoice + Telebirr/bank,
1 business day) · risk-reversal guarantee (C-3) · supporting chat paths (C-4) · editorial
motion rules (M-1…M-6, G-1…G-5) · copy-trim budgets (no new walls of text) · i18n architecture
(EN/AM/OM parity) · truth rules (no fabricated proof, no invented testimonials, no fake
urgency) · brand "NovaTech" (S-4).

## 2. Positioning rules

### R-1. Software-first brand message
- **Actor:** site visitor, any page, any language.
- **Trigger:** reading the hero, brand statements, section intros, SEO copy.
- **Visible state:** the first impression is "NovaTech builds software and digital systems for
  businesses." The second is "they also have advanced AI and automation capabilities that make
  those systems smarter." The brand message **"Software first. AI when it adds value."** is a
  guiding principle of all copy.
- **Expected outcome:** a visitor leaves thinking "NovaTech builds software" and then "and they
  can make that software intelligent with AI."
- **Failure outcome:** any surface that leads with AI (hero, section order, SEO title) is a
  defect; the ordering gates below catch it.
- **Edge cases:** the AI service track and AI section remain clearly visible and named — the
  goal is hierarchy, not hiding AI.
- **Acceptance examples:**
  1. Home hero and SEO title lead with software, not AI.
  2. AI appears as a named, premium capability after the software story is established.

### R-2. Home hero
- **Actor:** Home visitor.
- **Trigger:** first viewport.
- **Visible state:** headline **"Software built around your business."** (direction 1;
  exact final copy within copy-trim budgets under owner review); subcopy carries the
  directive's supporting message: "NovaTech builds custom software, web platforms, mobile
  applications, SaaS products, and business systems for organizations in Ethiopia and beyond —
  with AI automation available where it creates real business value." CTA row, in order:
  1. **Start a Project** (primary, btn-primary) → scrolls to the project-intake form on Home
  2. **Discuss Your Software Idea** (secondary, btn-secondary) → `/discovery-call`
  3. **Explore AI & Automation** (tertiary, smaller) → anchor to the Home AI section
  Trust row shows software-first anchors (locked figures only): "Web from 20,000 ETB · Mobile
  from 40,000 ETB · SaaS from 3,500 ETB / month".
- **Expected outcome:** the visitor immediately reads "software company"; AI is one click away,
  visibly named, never leading.
- **Failure outcome:** AI-first headline, audit-first headline, or inverted CTA hierarchy is a
  defect (E2E).
- **Edge cases:** audit trust pills (15,000 ETB fixed / 5 business days / 100% credit) move to
  the audit surface (section 13) — they do not occupy the hero trust row; apparatus/meter
  follow the new palette and software-first labels.
- **Acceptance examples:**
  1. Hero H1 contains "Software built around your business."
  2. E2E asserts CTA order and locked anchor strings.

### R-3. Homepage section order
- **Actor:** Home visitor scrolling.
- **Trigger:** full-page scroll.
- **Visible state:** exactly the following order (approximate — numbering as mono eyebrows):
  1. Hero (R-2)
  2. Trust / capabilities (derived from locked facts only: published fixed ETB pricing,
     milestone billing 40/30/30, 5-day audit delivery, written support commitment, response
     SLA, Addis Ababa-based — no invented metrics)
  3. **What We Build** (R-4 — the main section)
  4. Custom Software Development
  5. Web & Mobile Development
  6. Business Systems
  7. SaaS & Product Engineering
  8. AI & Automation (R-12)
  9. Process (R-9)
  10. Selected Work / Case Studies (R-10)
  11. Why NovaTech (derived differentiators from locked facts; no fabricated claims)
  12. Industries / Business Use Cases (R-11)
  13. Workflow Audit / Digital Transformation (R-8)
  14. Final CTA (R-7: intake form + "Prefer a number now? Use the instant quote tool" + one-tap
      WhatsApp)
  15. Footer
- **Expected outcome:** the software-development story is fully established before AI appears;
  the visitor sees the whole offer ladder in a natural narrative.
- **Failure outcome:** sections out of order, AI before software story, or the audit story
  restored to the top is a defect (E2E index comparison).
- **Edge cases:** existing locked facts power every claim; no new figures anywhere.

### R-4. "What We Build" — the main section
- **Actor:** Home visitor.
- **Trigger:** reaching section 3.
- **Visible state:** real-world software categories, each one line: Business Management
  Systems · Inventory & Logistics Platforms · Customer Management Systems · Financial &
  Administrative Software · Web Applications · Mobile Applications · SaaS Platforms ·
  E-commerce Platforms · Internal Operations Tools · AI-Powered Software. Each item is
  business-problem framed ("replace the spreadsheet / the paper ledger / the WhatsApp thread"),
  not tech-stack framed.
- **Expected outcome:** the visitor immediately understands "they can build the actual software
  my business needs."
- **Failure outcome:** tech-stack-first descriptions or a wall of text (copy-trim budget) is a
  defect.
- **Edge cases:** this section is the strongest section on the page; AI appears only as the
  final "AI-Powered Software" item.
- **Acceptance examples:**
  1. All 10 categories render with business-value descriptions.
  2. No category claims industry specialization or client counts.

### R-5. Service hierarchy — site-wide
- **Actor:** site visitor on any surface listing offers (Home sections, Services, Pricing
  tracks, wizard selector, SEO copy).
- **Trigger:** viewing any track/offer list.
- **Visible state:** services render in this order:
  1. Custom Software Development (business software, enterprise systems, internal platforms,
     workflow management, operations platforms, customer portals, digital transformation)
  2. Web Development (business websites, web apps, portals, dashboards, e-commerce, corporate
     sites)
  3. Mobile App Development (Android, iOS, cross-platform, business apps, customer apps,
     workforce apps)
  4. SaaS & Product Development (SaaS platforms, MVP, startup products, multi-tenant,
     subscription software, product engineering)
  5. Business Systems (inventory, CRM, ERP-style, HR, finance, logistics, school management,
     retail, industry-specific software — framed as buildable systems, no specialization
     claims without evidence)
  6. AI & Automation (AI assistants, AI agents, process automation, document processing,
     intelligent search, knowledge systems, RAG, workflow automation, AI-powered internal
     tools)
- **Expected outcome:** the software tracks lead everywhere; AI is the named specialist track.
- **Failure outcome:** AI before software on any surface is a defect (supersedes S-1 ordering).
- **Edge cases:** prices unchanged; Workflow Audit remains the entry *offer* but is not a
  build track.
- **Acceptance examples:**
  1. Services page track order: Custom Software → Web → Mobile → SaaS → Business Systems → AI.
  2. Wizard selector lists software services before AI.

## 3. Conversion rules

### R-6. CTA system — site-wide
- **Actor:** visitor on any marketing page (Home, Services, service pages, Pricing).
- **Trigger:** reading any hero or final CTA.
- **Visible state:** **"Start a Project"** is the primary CTA on every marketing hero and final
  CTA; **"Discuss Your Software Idea"** is secondary (→ /discovery-call); **"Explore AI &
  Automation"** is tertiary (Home → AI section anchor; other pages → /services AI track). From
  any non-Home page, "Start a Project" links to the Home intake form (`/#project-intake`).
  **Exception:** the Workflow Audit page keeps "Book Workflow Audit" as its own primary CTA
  (that page is the audit); the audit booking remains visible but secondary on all other
  surfaces.
- **Expected outcome:** one conversion model everywhere — the visitor asks for a build; the
  audit is a supporting path.
- **Failure outcome:** any marketing hero inverts the hierarchy (audit or AI outranking
  "Start a Project") — E2E catches it.
- **Edge cases:** form pages (Instant Quote, Discovery Call) keep their own primary actions;
  Pricing keeps pricing-led actions with "Start a Project" as the hero primary.
- **Acceptance examples:**
  1. Home hero CTA order: Start a Project → Discuss Your Software Idea → Explore AI & Automation.
  2. /web-development hero primary button is "Start a Project" linking to `/#project-intake`.
  3. /workflow-audit hero primary remains "Book Workflow Audit".

### R-7. Project intake — inline on Home
- **Actor:** visitor who clicks "Start a Project" (or reaches the Final CTA section).
- **Trigger:** clicking the CTA or scrolling to section 14.
- **Preconditions:** form is inline on the Homepage (`#project-intake`); no new page, no new
  integrations.
- **Action:** visitor completes the form. Fields:
  - Full name — text, required
  - Email — email, required
  - Phone — tel, required (Ethiopian follow-up reality)
  - Company — text, optional
  - What do you need? — select, required: Website / Web application / Mobile app / Business
    system / SaaS product / AI & automation / **Not sure yet**
  - Budget band — select, optional: 15k–40k / 40k–100k / 100k–250k / 250k+ / **Not sure**
    (locked band strings)
  - What's the problem or idea? — textarea, required
- **Visible state:** instant on-page confirmation — "Your project request was received. We'll
  respond within 1 business day with next steps." Lead stored, forwarded, follow-up queued via
  the existing services (submitLeadIntake → submitContactInquiry → queueLeadFollowups);
  mailto fallback if the endpoint fails — the request must never silently vanish.
- **Expected outcome:** the visitor leaves certain their request is received and knows when to
  expect contact; the lead arrives with scope + budget context.
- **Failure outcome:** endpoint failure without mailto fallback is a defect.
- **Edge cases:** "Not sure yet" options are valid selections (no dead ends); duplicate
  submissions handled by the existing pipeline; AM/OM translations render without clipping.
- **Acceptance examples:**
  1. E2E fills the intake form and asserts the confirmation copy.
  2. Confirmation states the 1-business-day response.
  3. Final CTA section also offers the instant-quote link + one-tap WhatsApp (pre-filled
     scope/budget message per C-4 pattern).

### R-8. Workflow Audit — demoted but unchanged
- **Actor:** Home visitor / audit buyer.
- **Trigger:** reaching Home section 13 or visiting /workflow-audit.
- **Visible state:** section 13 renders the audit offer with locked terms — 15,000 ETB fixed ·
  5 business days · 100% credited toward the build — plus the guarantee line (C-3) and a
  "View Live Pricing" link. All C-2 mechanics (48h hold, book-now-pay-later, invoice +
  Telebirr/bank, 1-business-day confirmation) and C-4 supporting paths (free Discovery Call,
  one-tap WhatsApp/Telegram) remain exactly as deployed.
- **Expected outcome:** the audit is still clearly for sale and functional, positioned as the
  smart first step for clients who don't yet know the right build.
- **Failure outcome:** broken booking flow or missing locked figures is a defect.
- **Edge cases:** the Home offer ladder is removed (R-19); prices render only from locked
  data sources.
- **Acceptance examples:**
  1. Section 13 shows the audit card with locked terms + guarantee.
  2. Booking flow E2E (existing C-2 test) still passes unchanged.

### R-9. Process section (Home section 9)
- **Actor:** Home visitor.
- **Trigger:** reading the Process section.
- **Visible state:** five steps from locked facts:
  01 Discovery — free call; response within 1 business day, call within 3, proposal within 5
  of discovery · 02 Workflow Audit (optional) — 15,000 ETB fixed, 5 business days, 100%
  credited toward the build · 03 Scoped proposal — fixed ETB quote from the published table ·
  04 Build — milestone billing 40/30/30, full ownership on final payment · 05 Support &
  maintenance — written commitment: 40 support hours/year + next-business-day response on
  critical issues (web maintenance 8,000–20,000 ETB/year).
- **Expected outcome:** the visitor understands how engagement works without new promises.
- **Failure outcome:** any step introduces a claim not present in the locked facts — defect.
- **Acceptance examples:**
  1. All 5 steps render; audit step is labeled optional.

## 4. Content sections

### R-10. Selected Work / Case Studies (Home section 10)
- **Actor:** Home visitor evaluating credibility.
- **Trigger:** reading the Selected Work section.
- **Visible state:** two cards, claim level **"Designed and developed by NovaTech"**, each
  linking to the live site (new tab):
  - **Stealth Overlay** — "AI interview assistant for coding interviews — real-time DSA
    guidance and problem-solving support during technical interview practice." Category:
    AI-powered web application. → https://www.stealthoverlay.com/
  - **Rhobot Academy** — "Amharic-language forex trading course platform — curriculum, student
    accounts, free registration, instructor-led content." Category: Learning platform / LMS.
    → https://rhobotcapital.com/
  Each card may show a **real screenshot** (see R-16 screenshot contract): one desktop-width
  Playwright capture of the live product homepage, framed as an artifact (hairline border,
  mono caption "LIVE PRODUCT · STEALTH OVERLAY" style, dark-canvas compatible), lazy-loaded,
  WebP, fixed max dimensions, alt text in EN/AM/OM. If a page cannot render meaningfully
  (login wall, blank SPA), the capture is dropped and the card ships text-only.
- **Expected outcome:** the visitor sees real, verifiable products — proof without fabricated
  claims.
- **Failure outcome:** any client business claim on the cards (4,000+ students, six-figure
  capital, Exness partnership) or any staged/edited screenshot is a defect.
- **Edge cases:** screenshots carry no numbers or claims beyond card copy; static images
  (reduced-motion unaffected).
- **Acceptance examples:**
  1. Both cards render with confirmed copy + live links.
  2. Screenshot alt text present in all three languages.

### R-11. Industries / Business Use Cases (Home section 12)
- **Actor:** Home visitor in a specific industry.
- **Trigger:** reading section 12.
- **Visible state:** buildable system categories, each one line, framed against local-reality
  problems: inventory & stock control, customer management/CRM, finance & admin, HR & payroll,
  logistics & delivery tracking, school management, retail & POS, procurement — each described
  as a system that replaces the spreadsheet / paper ledger / WhatsApp thread / disconnected
  tools. Section anchored by the message: "We understand the realities of local businesses and
  build software around how they actually work."
- **Expected outcome:** the visitor thinks "they could build my system" — not "they claim to be
  an industry expert."
- **Failure outcome:** specialization claims, "trusted by" lines, or industry statistics render
  — defect (truth rule).
- **Edge cases:** no client names, no counts, no logos.
- **Acceptance examples:**
  1. Section renders system categories with local-reality framing.
  2. Grep gate: no industry-stat or client-count strings.

### R-12. AI & Automation section (Home section 8) — "Add intelligence to your software."
- **Actor:** Home visitor who has seen the software story.
- **Trigger:** reading section 8.
- **Visible state:** the section explains AI as a multiplier for software already in place,
  with transformation pairs:
  Software → AI assistant · Documents → Automated extraction · Customer support → AI support
  agent · Operations → Automated workflows · Company knowledge → Searchable AI knowledge base
  · Reporting → Intelligent analysis.
  Messaging: "Make your software smarter." / "Add intelligent automation where it actually
  saves time." / "Turn existing business workflows into intelligent systems." / "Integrate AI
  into the software your business already depends on." CTA: **"Explore AI & Automation"** →
  AI service track.
- **Expected outcome:** AI feels like a natural extension of NovaTech's software engineering —
  never a separate, unrelated service.
- **Failure outcome:** AI framing as a standalone product line with no software anchor —
  defect.
- **Edge cases:** AI remains visibly premium and named; it simply appears after the software
  story.
- **Acceptance examples:**
  1. Section title "Add intelligence to your software." renders.
  2. All six transformation pairs render.

### R-13. Ethiopian market positioning
- **Actor:** any visitor (local or international).
- **Trigger:** reading Home sections 2, 3, 6, 12, 13.
- **Visible state:** the site communicates understanding of environments where companies rely
  on manual workflows, spreadsheets, paper-based processes, WhatsApp-based operations,
  disconnected systems, manual reporting, fragmented customer information, legacy processes,
  and limited software customization. Positioning: "Ethiopian engineering capability with
  international-quality software development" — locally relevant without being geographically
  limited; international clients are addressed, not excluded.
- **Expected outcome:** an Ethiopian business feels understood; an international client sees a
  serious engineering firm with local depth.
- **Failure outcome:** copy that reads as Ethiopia-only, or that assumes international
  context without the local framing — defect.
- **Edge cases:** existing operation signals (manual re-entry, approvals on one person, slow
  response) may be reused; no new statistics.

### R-14. Business-first messaging
- **Actor:** visitor reading any service description.
- **Trigger:** reading service copy, category lines, section intros.
- **Visible state:** business value leads — e.g. "We build secure, scalable business
  applications that bring your operations, customers, and data into one system." Technology
  names (frameworks, stacks) appear only in technical surfaces, never as the lead message.
- **Expected outcome:** the visitor understands the business problem being solved before any
  technology mention.
- **Failure outcome:** tech-stack-led service descriptions — defect.
- **Acceptance examples:**
  1. Service cards open with business outcomes, not stack names.

## 5. Visual rules

### R-15. Brand — "NovaTech"
- S-4 continues unchanged: wordmark, nav, footer, titles, meta, translations render
  "NovaTech"; "NovaTech AI" appears nowhere in rendered content. The PDF guide and legal docs
  remain owner-side.

### R-16. New light-first palette within the existing design system
- **Actor:** visitor on any page, any language.
- **Trigger:** first paint.
- **Visible state:** a light-first engineering theme replaces the Lumen Night palette:
  warm off-white/paper canvas, near-black ink, muted secondary text, and one deep
  **forest-green** accent (exact hex produced at build under owner review; the accent family
  is deep green — not violet, not brass, not generic blue). The existing design structure is
  retained: typography-led heroes, hairline cards, apparatus, meter strip, marquee, receipt
  rows, editorial motion (M-1…M-6), AA contrast (B-26…B-28 rules re-applied to the new
  palette).
- **Expected outcome:** the site reads as a premium software engineering company — the
  AI-era violet/brass identity is gone.
- **Failure outcome:** residual Lumen violet/brass tokens in rendered surfaces — defect;
  contrast failures — defect.
- **Edge cases:** the two case-study screenshots are the only imagery allowed (narrow
  exception to B-36/NB-23, recorded as an ADR amendment); all other "no imagery" rules stand;
  reduced-motion rules unchanged.
- **Acceptance examples:**
  1. Visual E2E re-baselined to the light-first palette (dark-only expectations removed).
  2. Contrast checks pass AA on light surfaces and dark bands.
  3. Screenshots render only in the Selected Work cards.

### R-17. i18n parity
- Every changed string (hero, sections, intake form, case studies, process, industries, AI
  section, CTAs, confirmation copy) mirrors in Amharic and Afaan Oromo without clipping;
  prices render identically across languages; alt text for screenshots in EN/AM/OM.

### R-18. Truth rules
- No fabricated proof, no invented testimonials, no fake urgency, no invented metrics; every
  number is a locked figure; case-study claims limited to confirmed facts (R-10); screenshots
  are real captures only.

### R-19. Home pricing redistribution
- The 4-row offer ladder is **removed** from Home. Section 13 carries the audit terms (R-8) +
  "View Live Pricing" → /pricing. Hero trust row shows software-first anchors (locked figures:
  Web from 20,000 · Mobile from 40,000 · SaaS from 3,500/month). Marquee keeps locked figures
  only (existing content valid). Meter labels re-cut software-first (e.g. "WEB FROM 20,000 ETB"
  / "MOBILE FROM 40,000 ETB").
- **Expected outcome:** no price information is lost from Home; no new figures appear.

## 6. Surfaces inventory (behavior-level; exact strings produced at build under owner review)

1. Home: full 15-section rebuild (hero, trust, What We Build, service sections, AI, process,
   case studies, why, industries, audit, final CTA), intake form + confirmation, meter/marquee
   labels, SEO.
2. Services: track order per R-5, hero CTA per R-6, hero chip copy, SEO.
3. Service pages (Web/Mobile/SaaS/Additional): hero CTA per R-6 (Start a Project →
   /#project-intake), copy per R-14, SEO.
4. Pricing: hero CTA per R-6; track ordering where tracks appear; SaaS rows untouched (locked);
   bundle line once.
5. WorkflowAudit: hero CTA unchanged (Book Workflow Audit primary); supporting paths (C-4);
   guarantee (C-3) unchanged.
6. InstantQuote: service selector order per R-5 (software first); wizard mechanics unchanged.
7. Nav/Footer: CTA labels updated to "Start a Project" where applicable; brand strings per R-15.
8. SEO: meta titles/descriptions re-cut software-first with "NovaTech" brand.
9. i18n: EN/AM/OM parity for every changed string.
10. Policy: audit terms + guarantee unchanged (C-3); no other legal changes.
11. Visual: palette tokens swapped site-wide per R-16; screenshot assets for two cards.
12. E2E: re-baseline changed strings; new tests for section order (R-3), CTA hierarchy (R-6),
    intake flow (R-7), case-study cards (R-10), palette/visual gates (R-16).

## 7. Acceptance gates (for QA/security, run before any merge)

1. **Positioning gate** — hero + SEO lead with software; AI section after the software story;
   "Software first. AI when it adds value." reflected in copy.
2. **Ordering gate** — Home section order matches R-3; service surfaces match the R-5
   6-track hierarchy (E2E index comparisons; supersedes S-1 test expectations).
3. **CTA gate** — "Start a Project" primary on all marketing heroes (audit page excepted);
   "Discuss Your Software Idea" secondary; "Explore AI & Automation" tertiary; audit CTA
   secondary elsewhere.
4. **Intake gate** — intake form E2E: fields → submit → confirmation ("received… respond
   within 1 business day"); mailto fallback path intact; no dead-end selections.
5. **Audit gate** — section 13 shows locked audit terms + guarantee; C-2 booking E2E passes
   unchanged; Home ladder absent (R-19).
6. **Case-study gate** — two cards with confirmed copy + live links; no client business
   claims; screenshots real and framed (or dropped); alt text in EN/AM/OM.
7. **Visual gate** — light-first palette everywhere; no Lumen violet/brass in rendered
   surfaces; AA contrast passes; imagery limited to the two screenshot cards; reduced-motion
   rules hold.
8. **Brand gate** — "NovaTech" only; zero "NovaTech AI" in src/, tests/, public/ (grep).
9. **Truth gate** — no fabricated stats, no new unconfirmed claims; every number is a locked
   figure.
10. **i18n gate** — AM/OM mirrors render without clipping; prices identical across languages.
11. **Regression gate** — prices unchanged (P-1/ADR-003); booking flow green; motion/visual
    gates re-baselined; existing Playwright suite green with re-baselined selectors.

## 8. Non-goals / explicitly unchanged

Prices and discount program · audit booking mechanics (C-2) and guarantee (C-3) · ETB-only
policy (ADR-001) · ADR-003 figures · editorial motion rules · copy-trim budgets · i18n
architecture · payment rails (blocked) · legal/company registration documents · PDF guide
(owner-side) · no new analytics events, no new dependencies, no new network calls (screenshots
are static assets; external case-study links open in new tabs).
