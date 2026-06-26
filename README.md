# NovaTech Agency Website

Modern multi-page React marketing site for NovaTech digital services. This project includes a full UI overhaul, route transitions, conversion-focused CTA flows, contact capture, and analytics instrumentation.

## Tech Stack

- React 19
- React Router 7
- Framer Motion
- Vite 8
- ESLint 9

## Quick Start

1. Install dependencies:

	 npm install

2. Copy environment defaults:

	 copy .env.example .env

3. Start development server:

	 npm run dev

4. Create a production build:

	 npm run build

## Available Scripts

- npm run dev: start local dev server
- npm run build: production build
- npm run lint: lint project files
- npm run preview: preview production build locally
- npm run test:e2e: run responsive smoke E2E tests (auto-builds and auto-starts preview server)
- npm run test:e2e:all: run all Playwright tests

## Environment Variables

Configure these in .env (see .env.example):

- VITE_SITE_URL
	- Canonical production origin used for runtime SEO, Open Graph, and JSON-LD metadata.
	- Default: https://novatech.et.

- VITE_CONTACT_EMAIL / VITE_CONTACT_PHONE_DISPLAY / VITE_CONTACT_PHONE_HREF
	- Public sales contact channels rendered across forms, footer links, and structured data.

- VITE_WHATSAPP_NUMBER / VITE_TELEGRAM_HANDLE / VITE_TELEGRAM_URL / VITE_LINKEDIN_URL
	- Public social and messaging channels used in footer/contact CTAs.

- VITE_LOCATION_LABEL / VITE_MAPS_URL
	- Public location label and map destination used in contact sections and footer links.

- VITE_CONTACT_API_ENDPOINT
	- Optional API endpoint for form submissions.
	- If missing or unavailable, homepage contact form falls back to mail client submission.

- VITE_CONTACT_API_KEY
	- Optional API key sent as X-Api-Key when submitting contact form payloads.

- VITE_CONTACT_TIMEOUT_MS
	- Optional request timeout in milliseconds.
	- Default: 9000.

- VITE_MAILING_LIST_ENDPOINT
	- Nocatechai guide capture endpoint.
	- Default: /api/mailing-list.

- VITE_MAILING_LIST_API_KEY / MAILING_LIST_API_KEY
	- Optional shared API key for nocatechai mailing-list submissions.
	- The frontend sends VITE_MAILING_LIST_API_KEY as X-Api-Key when configured.

- MAILING_LIST_STORAGE_PATH
	- Server-side JSONL destination for captured nocatechai guide emails.
	- Default: storage/mailing-list.jsonl.

- MAILING_LIST_WEBHOOK_URL
	- Optional server-side webhook that receives every captured lead after local storage succeeds.
	- Use this to sync into a unified CRM, newsletter, or marketing automation list.

- VITE_ANALYTICS_ENDPOINT
	- Optional endpoint for custom analytics events.
	- Events are also forwarded to window.gtag and window.dataLayer if available.

- VITE_PRICING_DATA_ENDPOINT
	- Optional endpoint that returns pricing JSON.
	- Expected shape: { "webPackages": [ ... ] }.
	- When missing or invalid, the app falls back to static pricing data.

- VITE_SITESPEAK_BOT_ID
	- Optional SiteSpeak bot identifier for live chat.
	- Default: f1f5fc15-c1e9-4d01-864b-1e7a756a61b4.

## Contact Submission Flow

Homepage contact form behavior:

1. Attempts API submission first via VITE_CONTACT_API_ENDPOINT.
2. On success, shows API success status.
3. On endpoint issues (unconfigured/network/timeout/request failure), falls back to a prefilled mailto flow.

Implementation references:

- src/services/contactService.js
- src/pages/Home.jsx

## Pricing Guide Mailing List

NovaTechAI pricing guide downloads now use a dedicated lead-capture path:

1. The modal validates the email address.
2. The frontend posts the lead to VITE_MAILING_LIST_ENDPOINT.
3. The server function at api/mailing-list.js appends the record to MAILING_LIST_STORAGE_PATH.
4. If MAILING_LIST_WEBHOOK_URL is configured, the same record is forwarded to that unified mailing list.
5. If the endpoint is temporarily unavailable in the browser, the lead is queued in localStorage under novatech-mailing-list:fallback for manual recovery.

Captured server records are ignored from git by storage/.gitignore.

## Analytics Tracking

The app tracks:

- page views on route changes
- pricing guide CTA intent/open actions
- discovery call CTA clicks
- contact form attempts and outcomes
- contact/social outbound clicks in footer and homepage contact section

Implementation references:

- src/services/analyticsService.js
- src/App.jsx
- src/components/LeadCaptureModal.jsx

## Quality Checks

Before release:

1. npm run lint
2. npm run build
3. npm run test:e2e
4. Manual route walkthrough (desktop + mobile)

See docs/qa-checklist.md for the structured checklist.

## E2E Analytics Coverage

The responsive smoke suite includes analytics assertions for core events:

- page_view
- pricing_guide_intent
- pricing_guide_form_submitted
- pricing_guide_opened
- discovery_call_clicked
- contact_form_attempt
- contact_form_outcome
- contact_channel_clicked
