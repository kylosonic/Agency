# Pending Behaviors — Gap Ledger

> Every ticket below maps to one or more rules in `docs/behaviors/launch-readiness.md`.
> Priority: **P0** = launch blocker · **P1** = must land before launch · **P2** = after launch.
> Acceptance is measured by the user-facing criteria, not by implementation details.

| ID | Priority | Rule(s) | Affected features | User-acceptance criteria |
|---|---|---|---|---|
| NB-01 | P0 | B1–B3 | Case studies, portfolio, home hero, agent demo, ROI calculator | No client story, testimonial, portfolio item, or aggregate statistic exists anywhere on the site without a real source; the demo section is removed until a real system runs. |
| NB-02 | P0 | B4, B24 | Pricing page, homepage chips, policy page | The site displays ETB prices only; USD appears solely as "international engagements quoted individually"; no homepage claim references dual-currency pricing. |
| NB-03 | P0 | B5–B9, B11, B12 | Pricing page, service pages, PDF guide | The published table matches the locked figures (audit 85,000; AI 250k/750k/1.5M+; web 45k/150k/250k; mobile 200k/400k; support 30–70k/mo; maintenance 5–15k/mo); every tier lists scope drivers; SaaS shows waitlist only; marketing services are absent. |
| NB-04 | P0 | B13, B15 | Policy page | The policy page states bank-transfer-only payment with the post-license plan, and contains no mention of capabilities that don't exist (card handling). |
| NB-05 | P0 | B16, B17 | Instant estimate wizard, pricing page | Quoting the same scope in the wizard and the pricing page yields the same number; wizard options cannot produce estimates below the entry offer. |
| NB-06 | P0 | B10 | Homepage, pricing page, workflow audit page | A visitor can see the founding-client pilot offer: first three implementations at 15–20% off, exchanged for case study rights, testimonial, and referral. |
| NB-07 | P0 | B14 | Policy page | Milestone billing 40/30/30 and full ownership on final payment are visible and accurate. |
| NB-08 | P1 | B20–B22 | All pages | A visitor on any page sees one desaturated accent on a neutral base; no frosted-glass-everywhere, no equal three-card rows, no gradient CTAs, no template blue palette. |
| NB-09 | P1 | B23 | All copy in English, Amharic, and Afaan Oromo | A reader cannot find filler words, uniform FAQ openings, identical section rhythms, or placeholder-sounding names, numbers, or quotes in any language. |
| NB-10 | P1 | B18, B19 | Lead handling, discovery call, contact flows | A visitor's inquiry is confirmed as received, stored, and forwarded to the team's working inbox; the team's first response happens within one business day. |
| NB-11 | P1 | B2, B3 | Homepage demo section | The demo section is either removed or shows a real, running system built on the business's own operations (lead triage and follow-up). |
| NB-12 | P1 | B4 | PDF pricing guide | A human diff confirms the PDF matches the new ETB table exactly; regenerated if not. |
| NB-13 | P1 | — (ops) | Contact channels | Business inquiries land in a business address (domain email), not a personal inbox. |
| NB-14 | P1 | — (ops) | Launch configuration | Canonical domain, search files, live-chat ID, lead forwarding, and analytics dashboards are confirmed working on the production domain before launch. |
| NB-15 | P2 | B25 | Policy, pricing, payments | After licensing: Telebirr and Chapa are accepted and shown; tax and invoice requirements are reflected; USD receipt is re-evaluated with a stated exchange policy. |
| NB-16 | P2 | — (ops) | QA checklist | Manual route walkthroughs, accessibility checks, and analytics spot-checks are completed and checked off. |
| NB-17 | P2 | B24 | Marketing launch kit | The launch kit is rewritten to the new positioning (contract-first, published prices, payment-reliability specialty, pilot program) and no longer references fabricated proof. |
