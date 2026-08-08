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

- VITE_CONTACT_FORM_SUBMIT_ENDPOINT
	- Optional override for the formsubmit.co endpoint used by the homepage contact form.
	- When empty, the URL is derived from VITE_CONTACT_EMAIL as `https://formsubmit.co/ajax/<email>`.
	- No personal email address is hardcoded anywhere; both values are owner-supplied before launch (OA-1/OA-3).

- VITE_CONTACT_API_KEY
	- Optional API key sent as X-Api-Key when submitting contact form payloads.

- VITE_CONTACT_TIMEOUT_MS
	- Optional request timeout in milliseconds.
	- Default: 9000.

- VITE_GA4_MEASUREMENT_ID
	- GA4 Measurement ID for production analytics (owner action OA-4).
	- Unset today: production currently has no analytics sink unless VITE_ANALYTICS_ENDPOINT is provided.

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
	- Required before launch (OA-6): this is the durable delivery rail for B18.

- MAILING_LIST_WEBHOOK_PENDING_PATH
	- Bounded pending-retry file (default: storage/mailing-list-webhook-pending.jsonl) for webhook forwards that failed.
	- Rows are re-forwarded oldest-first (up to 5 per request) and deleted only on a 2xx response.

- VITE_LEAD_INTAKE_ENDPOINT
	- Endpoint used by the instant quote wizard, discovery booking form, and the homepage contact mirror.
	- Default: /api/leads.

- VITE_LEAD_INTAKE_API_KEY / LEAD_INTAKE_API_KEY
	- Optional shared API key sent as X-Api-Key when configured.

- LEAD_INTAKE_STORAGE_PATH
	- Server-side JSONL destination for quote and booking requests.
	- Default: storage/leads.jsonl.

- LEAD_INTAKE_WEBHOOK_URL
	- Optional server-side webhook for CRM, calendar, or automation handoff.
	- Required before launch (OA-6): this is the durable delivery rail for B18.

- LEAD_INTAKE_WEBHOOK_PENDING_PATH
	- Bounded pending-retry file (default: storage/leads-webhook-pending.jsonl) for webhook forwards that failed.
	- Rows are re-forwarded oldest-first (up to 5 per request) and deleted only on a 2xx response.

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
2. In parallel, a best-effort non-blocking durable mirror POSTs the same inquiry to /api/leads (type `contact_form`). Mirror failures are silently ignored and never block the primary flow.
3. On success, shows API success status.
4. On endpoint issues (unconfigured/network/timeout/request failure), falls back to a prefilled mailto flow.

Implementation references:

- src/services/contactService.js
- src/pages/Home.jsx

## Pricing Guide Mailing List

NovaTechAI pricing guide downloads now use a dedicated lead-capture path:

1. The modal validates the email address.
2. The frontend posts the lead to VITE_MAILING_LIST_ENDPOINT.
3. The server function at api/mailing-list.js appends the record to MAILING_LIST_STORAGE_PATH.
4. If MAILING_LIST_WEBHOOK_URL is configured, the same record is forwarded to that unified mailing list. Failed forwards land in MAILING_LIST_WEBHOOK_PENDING_PATH and are retried on later requests.
5. If the endpoint is temporarily unavailable in the browser, the lead is queued in localStorage under novatech-mailing-list:fallback and is flushed automatically on the next page load (oldest-first, deleted only on success).

Captured server records are ignored from git by storage/.gitignore.

## Lead Intake Flow

Quote, booking, and home-contact-mirror submissions post to api/leads.js first. The handler validates the email, stores a JSONL lead record, and can forward the same payload to LEAD_INTAKE_WEBHOOK_URL. If the browser cannot reach the endpoint, the frontend stores a bounded local fallback under novatech-lead-intake:fallback so the visitor still sees a clear status instead of silently losing the request. On the next page load the fallback queue is re-posted oldest-first; rows are removed only after a successful (2xx) submission, and a per-session budget prevents hammering a down endpoint.

## Lead Delivery & SLA

Delivery guarantees (B18–B19) and how they are enforced:

- Every inquiry (quote request, booking request, contact form, guide download) is stored server-side as JSONL and forwarded to the team inbox via the configured webhook (OA-6). The webhook pending-retry file covers transient failures; the browser fallback queues cover frontend outages.
- Published SLA copy: we respond within one business day, schedule the discovery call within three, and deliver a proposal within five business days of discovery. This copy is present on the discovery booking success message, the instant quote result card, and the lead-capture modal success state (quote/booking variants) in English, Amharic, and Afaan Oromo.
- Server handlers log a startup warning when webhook URLs are unset; the dev client logs a launch-config table when required VITE_* variables are missing.

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
