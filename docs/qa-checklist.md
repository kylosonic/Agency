# Release QA Checklist

> Status: code-side verification COMPLETE (last verified at commit `660ac49`, QA APPROVED — 67/67 E2E).
> Remaining items are **owner-executed** and gate launch; each maps to an owner action (OA-ID) from
> `docs/plans/phase5-ops-launch-config.md` §5.

## Automated Verification — ✅ COMPLETE

- [x] Run lint: `npm run lint` (clean)
- [x] Run build: `npm run build` (clean)
- [x] Run E2E suite: 67/67 passing as of `660ac49` (full suite via `npm run test:e2e:all`; smoke via `npm run test:e2e`)

## Launch Configuration

- [ ] Confirm production domain is correct in canonical, robots, and sitemap files — **OPEN, owner (OA-2: domain ownership/DNS + canonical origin)**
- [ ] Confirm contact channels are final (email, phone, WhatsApp, Telegram, LinkedIn) — **OPEN, owner (OA-1: create + confirm domain mailbox)**
- [ ] Confirm SiteSpeak bot id in env if using a production-specific chatbot — **OPEN, owner (OA-5: confirm production bot ID)**
- [ ] Confirm lead intake endpoint/webhook is configured for quote and booking submissions — **OPEN, owner (OA-6: LEAD_INTAKE_WEBHOOK_URL + MAILING_LIST_WEBHOOK_URL)**
- [x] Confirm pricing guide PDF and OG image are current assets for campaign sharing — ✅ **COMPLETE** (asset existence and reference chain verified at `660ac49`; PDF currency vs the locked ETB table remains **OPEN, owner (OA-7: human diff + regeneration — known USD divergence)**)

## Manual Route Walkthrough — owner-executed pre-launch

Check each route in both desktop and mobile breakpoints (current live routes):

- [ ] `/` : hero CTA, pricing modal, contact form statuses, footer links
- [ ] `/services` : service cards, proof strip, dual CTA
- [ ] `/pricing` : scenario planner, tabbed pricing, CTA paths
- [ ] `/workflow-audit` : audit offer, pricing, CTA paths
- [ ] `/web-development` : pricing cards, proof strip, dual CTA
- [ ] `/mobile-development` : pricing cards, proof strip, dual CTA
- [ ] `/saas-solutions` : system cards, proof strip, dual CTA
- [ ] `/additional-services` : service table, featured cards, dual CTA
- [ ] `/policy` : policy blocks, proof strip, dual CTA
- [ ] `/instant-quote` : all wizard steps, estimate result, saved request status
- [ ] `/book-discovery-call` : future slots, submission status, fallback message
- [ ] `/industries/*` : industry landing pages, proof strip, dual CTA (one representative slug)

## Tracking Spot Checks

- [x] E2E analytics smoke (`npm run test:e2e`) validates core events: page_view, pricing_guide_intent, pricing_guide_form_submitted, pricing_guide_opened, discovery_call_clicked, contact_form_attempt, contact_form_outcome, contact_channel_clicked — ✅ **COMPLETE**
- [ ] Validate event payload values and aggregate counts in production analytics dashboards — **OPEN, owner (OA-4: GA4 Measurement ID or real analytics endpoint — no analytics sink exists today)**

## Accessibility Checks — owner-executed

- [ ] Skip link is keyboard reachable and sends focus to main content
- [ ] Mobile menu is closable with Escape key
- [ ] Lead modal closes on Escape and backdrop click
- [ ] Form status text updates are announced via aria-live regions

## Marketing Readiness — owner-executed

- [ ] Prepare launch copy from `docs/marketing-launch-kit.md` (rewritten to contract-first / published-prices / payment-reliability / pilot positioning — TECH-12)
- [ ] Add UTM-tagged URLs for each launch channel
- [ ] Verify social preview cards with metadata debuggers (LinkedIn/X/Facebook)
- [ ] Native AM/OM review of SLA strings — **OPEN, owner (OA-8: NB-09 gate)**

## Owner Actions Gate (pre-launch)

| ID | Item | Deadline |
|---|---|---|
| OA-1 | Contact channels final (domain mailbox created + confirmed) | 1 week pre-launch |
| OA-2 | Domain canonical confirmed (novatech.et ownership/DNS) | 1 week pre-launch |
| OA-3 | Formsubmit forwarding activated for final contact address | 1 week pre-launch |
| OA-4 | GA4 Measurement ID or real analytics endpoint provided | 1 week pre-launch |
| OA-5 | SiteSpeak production bot ID confirmed | 1 week pre-launch |
| OA-6 | Lead intake + mailing-list webhook URLs provided | 1 week pre-launch |
| OA-7 | PDF human diff vs locked ETB table + regeneration | 2 weeks pre-launch |
| OA-8 | Native AM/OM review of new SLA strings | Post-code, pre-launch |
| OA-9 | Deployment runtime decision for api/*.js | Before launch |
