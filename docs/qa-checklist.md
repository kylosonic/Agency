# Release QA Checklist

## Automated Verification

- [x] Run lint: npm run lint
- [x] Run build: npm run build
- [x] Run responsive smoke E2E: npm run test:e2e

## Launch Configuration

- [ ] Confirm production domain is correct in canonical, robots, and sitemap files
- [ ] Confirm contact channels are final (email, phone, WhatsApp, Telegram, LinkedIn)
- [ ] Confirm SiteSpeak bot id in env if using a production-specific chatbot
- [ ] Confirm pricing guide PDF and OG image are current assets for campaign sharing

## Manual Route Walkthrough

Check each route in both desktop and mobile breakpoints:

- [ ] / : hero CTA, pricing modal, contact form statuses, footer links
- [ ] /web-development : pricing cards, proof strip, dual CTA
- [ ] /mobile-development : pricing cards, proof strip, dual CTA
- [ ] /saas-solutions : system cards, proof strip, dual CTA
- [ ] /additional-services : service table, featured cards, dual CTA
- [ ] /policy : policy blocks, proof strip, dual CTA

## Tracking Spot Checks

- [x] E2E analytics smoke (npm run test:e2e) validates core events: page_view, pricing_guide_intent, pricing_guide_form_submitted, pricing_guide_opened, discovery_call_clicked, contact_form_attempt, contact_form_outcome, contact_channel_clicked
- [ ] Validate event payload values and aggregate counts in production analytics dashboards

## Accessibility Checks

- [ ] Skip link is keyboard reachable and sends focus to main content
- [ ] Mobile menu is closable with Escape key
- [ ] Lead modal closes on Escape and backdrop click
- [ ] Form status text updates are announced via aria-live regions

## Marketing Readiness

- [ ] Prepare launch copy from docs/marketing-launch-kit.md
- [ ] Add UTM-tagged URLs for each launch channel
- [ ] Verify social preview cards with metadata debuggers (LinkedIn/X/Facebook)
