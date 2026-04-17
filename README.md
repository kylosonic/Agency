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

## Environment Variables

Configure these in .env (see .env.example):

- VITE_CONTACT_API_ENDPOINT
	- Optional API endpoint for form submissions.
	- If missing or unavailable, homepage contact form falls back to mail client submission.

- VITE_CONTACT_API_KEY
	- Optional API key sent as X-Api-Key when submitting contact form payloads.

- VITE_CONTACT_TIMEOUT_MS
	- Optional request timeout in milliseconds.
	- Default: 9000.

- VITE_ANALYTICS_ENDPOINT
	- Optional endpoint for custom analytics events.
	- Events are also forwarded to window.gtag and window.dataLayer if available.

## Contact Submission Flow

Homepage contact form behavior:

1. Attempts API submission first via VITE_CONTACT_API_ENDPOINT.
2. On success, shows API success status.
3. On endpoint issues (unconfigured/network/timeout/request failure), falls back to a prefilled mailto flow.

Implementation references:

- src/services/contactService.js
- src/pages/HomePage.jsx

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
3. Manual route walkthrough (desktop + mobile)

See docs/qa-checklist.md for the structured checklist.
