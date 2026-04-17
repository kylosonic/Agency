# Release QA Checklist

## Automated Verification

- [x] Run lint: npm run lint
- [x] Run build: npm run build

## Manual Route Walkthrough

Check each route in both desktop and mobile breakpoints:

- [ ] / : hero CTA, pricing modal, contact form statuses, footer links
- [ ] /web-development : pricing cards, proof strip, dual CTA
- [ ] /mobile-development : pricing cards, proof strip, dual CTA
- [ ] /saas-solutions : system cards, proof strip, dual CTA
- [ ] /additional-services : service table, featured cards, dual CTA
- [ ] /policy : policy blocks, proof strip, dual CTA

## Tracking Spot Checks

- [ ] pricing_guide_intent events fire from navbar, floating button, and page CTAs
- [ ] pricing_guide_form_submitted and pricing_guide_opened fire from lead modal
- [ ] discovery_call_clicked events fire from all page CTA links
- [ ] contact_form_attempt and contact_form_outcome fire on homepage submission
- [ ] contact_channel_clicked events fire for homepage/footer contact links

## Accessibility Checks

- [ ] Skip link is keyboard reachable and sends focus to main content
- [ ] Mobile menu is closable with Escape key
- [ ] Lead modal closes on Escape and backdrop click
- [ ] Form status text updates are announced via aria-live regions
