# Phase 5 Blueprint — Ops & Launch Config (TECH-08 / TECH-09 / TECH-10)

**Date:** 2026-08-07 · **Author:** @plan · **Governed by:** launch-readiness B18–B19 (B13/B15 landed), pending-behaviors NB-10/NB-12/NB-13/NB-14, tech-backlog TECH-08/09/10, Phase-1 R7 (PDF divergence confirmed)
**Arbitrated by @architect:** blueprint accepted as-is. Owner actions OA-1…OA-9 are owner-side; @build executes the code surface.

## Goal
Close the lead-handling gap (B18–B19), harden all launch configuration so no personal Gmail remains primary and every production value is verified or owner-flagged, and contract the pricing-guide PDF sync as a human-diff owner action — without breaking the 67-test E2E suite.

## 0. Verified baseline
- Four lead forms: home contact (formsubmit.co → personal Gmail target), pricing-guide modal (→ /api/mailing-list), instant quote (→ /api/leads), discovery booking (→ /api/leads).
- **No runtime executes api/*.js** — no vercel.json/netlify.toml/server script/vite proxy.
- JSONL storage is process-local (ephemeral on serverless).
- Webhooks: awaited, 8s timeout, ZERO retry, zero failure surfacing.
- Fallback queues (`novatech-lead-intake:fallback` cap 120, `novatech-mailing-list:fallback` cap 100): written on failure, **never read/flushed/surfaced**.
- CRM queue (`novatech-crm-queue` via `queueLeadFollowups`): written by all four forms; `getQueuedLeads`/`clearQueuedLeads` have ZERO callers (TECH-11 consumer; keep).
- Personal Gmail: exactly 5 literals — siteConfig.js:20, contactService.js:4-5 (hardcoded formsubmit URL), index.html:39 (JSON-LD), index.html:132 (noscript mailto), .env.example:5.
- index.html: JSON-LD SiteNavigationElement lists /case-studies + /portfolio; noscript links both + "Proof and Planning" section (B1/B2 violation) + "The Searchable Brain" service (verify) + personal Gmail mailto.
- **No GA4/GTM script anywhere**; VITE_ANALYTICS_ENDPOINT empty → production has NO analytics sink.
- SiteSpeak default ID resolves (lighthouse evidence) — owner confirm (OA-5).
- sitemap.xml: exact match to 15 live routes (incl. 4 industry slugs). robots.txt correct. No change.
- E2E passes through fallback/mocked paths; no test exercises server handlers.
- PDF: exists; **confirmed divergent** (legacy USD table per Phase-1 R7).

## 1. TECH-08 — Lead delivery verification (B18–B19)

### 1.1 Gaps
- **G1 — Fallback queues are dead ends.** Fix: bounded flush consumer (re-POST oldest-first on app load + after every successful API submission; delete only on 2xx; keep on failure) + owner visibility (console.warn summary in production, analytics events for backlog/flush outcomes).
- **G2 — Webhook is fire-once.** Fix: server-side pending-retry file per handler (`LEAD_INTAKE_WEBHOOK_PENDING_PATH` default `storage/leads-webhook-pending.jsonl`, bounded ~500), drained oldest-first on subsequent requests (≤5 forwards/invocation), retry counts in API response.
- **G3 — Home contact form has no durable store.** Fix: best-effort non-blocking mirror POST to `/api/leads` (type `contact_form`) alongside the existing flow; failures silently ignored (UI/E2E untouched).
- **G4 — No production runtime** → owner action OA-9 (deploy decision), not code.
- **G5 — B19 copy-only** → copy alignment this phase; automation is TECH-11.
- **G6 — Misleading copy:** instant-quote "Our team has queued a follow-up" → soften to "our team will follow up".

### 1.2 SLA copy alignment (add missing 3-day/5-day statements)
- Discovery success: append "We respond within one business day, schedule your discovery call within three, and deliver a proposal within five business days of discovery." (keep existing prefix byte-for-byte — E2E substring dependency).
- Instant quote result card: append "We respond within one business day and deliver a written proposal within five business days of our discovery call."
- Lead modal success (quote_offer / book_call_offer variants): same 1/3/5-day statement.
- Home: no change (1-day copy verified).
- New translation keys en/am/om: `discovery.form.sla`, `instantQuote.result.sla`, `leadCapture.quote_offer.successSla`, `leadCapture.book_call_offer.successSla`. AM/OM subject to NB-09 native-review gate (OA-8).

### 1.3 Verification procedure (@build evidence)
1. Handler harness: throwaway Node script binding both handlers locally (not committed; Vite preview cannot serve them).
2. Happy path per form: JSONL row appended (id/createdAt), webhook receiver log, `ok:true`, success screenshot, no fallback keys in localStorage.
3. Failure injection: stop harness → submit → fallback queue record; restart → reload → flush re-posts (JSONL increments, queue empties).
4. Webhook failure injection: dead port → pending-retry file grows, response reports failure; recover → next request drains.
5. SLA copy check: grep 4 success surfaces en/am/om + screenshots.
6. Evidence of "delivery confirmed": (a) JSONL rows all 4 forms, (b) webhook payloads captured, (c) zero records in both fallback queues at end, (d) analytics events observed, (e) screenshots.

## 2. TECH-09 — Contact & launch configuration (NB-13, NB-14)

### 2.1 Domain email swap (5 literals + derived surfaces)
1. `siteConfig.js` L20 — default → domain email after OA-1.
2. `contactService.js` L4-5 — **remove hardcoded personal Gmail**; formsubmit fallback URL derives from VITE_CONTACT_EMAIL (new optional `VITE_CONTACT_FORM_SUBMIT_ENDPOINT` override). E2E mocks `https://formsubmit.co/**` — derived URL still matches glob, tests stay green.
3. `index.html` L39 JSON-LD — set domain email after OA-1; until then REMOVE the `email` property (runtime seoService re-injects with env email).
4. `index.html` L132 noscript — remove mailto link entirely (keep phone) until OA-1.
5. `.env.example` L5 — update after OA-1 + `# REQUIRED before launch` comment.
- Derived surfaces (DISCOVERY_CALL_MAILTO, buildProjectInquiryMailto, seoService.buildOrganizationSchema, Footer/Home links): self-heal via SITE_CONTACT.email; verify with grep asserting zero `nahomgwmichael` matches.

### 2.2 index.html stale JSON-LD + noscript cleanup (in scope)
- JSON-LD SiteNavigationElement: delete /case-studies + /portfolio; rebuild from live nav: services, workflow-audit, pricing, industries, web-development, mobile-development, saas-solutions, additional-services, policy, instant-quote, book-discovery-call.
- Organization schema: email per 2.1; rest verified correct.
- Noscript: drop both removed links; **delete "Proof and Planning" section** (B1/B2); drop personal-Gmail mailto; verify service list against Services page, remove "The Searchable Brain" if absent.
- Hardcoded canonical/og:url `https://novatech.et` — leave (OA-2).

### 2.3 Launch config checklist (verify + prove)
| Item | State | Proof | Owner action |
|---|---|---|---|
| VITE_SITE_URL | default novatech.et | grep origin in built output | OA-2 domain ownership/DNS |
| robots.txt | correct | verify served | — |
| sitemap.xml | matches 15 routes | diff in QA report | — |
| SiteSpeak ID | default resolves | script 200 + launcher renders | OA-5 confirm production ID |
| Analytics | NO GA4, endpoint empty | prove window.gtag undefined | OA-4 GA4 ID or endpoint |
| Webhook targets | empty | no runtime to test | OA-6 both webhook URLs |
| .env.example | keys consistent | cross-check README | fix SiteSpeak doc-default mismatch |

### 2.4 Env validation (behavior only)
- `src/main.jsx`: DEV-only console warning table for unset launch-critical vars. No build failure, no production output.
- `api/leads.js` + `api/mailing-list.js`: startup warning when webhook env unset.

## 3. TECH-10 — Pricing guide PDF sync (NB-12)

### 3.1 Owner action contract (OA-7 — binary asset, human diff)
1. Open PDF side-by-side with `src/pages/Pricing.jsx` (locked table).
2. Verify verbatim: audit 85,000 ETB fixed; AI 250k/750k/1.5M+; web 45k/150k/250k; mobile 200k/400k; support 30–70k/mo; maintenance 5–15k/mo.
3. Hard rules: ETB only (no USD); bank-transfer (CBE Birr) terms; no marketing retainers; SaaS waitlist with no prices.
4. Divergence → regenerate (owner tooling, out of repo), replace at SAME path/filename (referenced by PRICING_GUIDE_ASSET_PATH, opened by LeadCaptureModal) or new filename + tell @build to update the constant.
5. Return file into `public/` (binary travels via repo).
6. Record diff result in TECH-10 acceptance note.

### 3.2 Reference verification (@build)
- PRICING_GUIDE_ASSET_PATH points at existing file (verified). Only consumer: LeadCaptureModal (window.open) — verified.

## 4. Change surface

### MODIFY (16)
1. `src/services/leadIntakeService.js` — add `flushFallbackQueue` + `getFallbackQueueStats` exports; flush re-POSTs oldest-first, deletes on 2xx, keeps on failure, bounded per session; analytics events on flush/backlog.
2. `src/services/mailingListService.js` — same for `novatech-mailing-list:fallback`.
3. `src/App.jsx` — first-mount fire-and-forget flush of both queues; one-time backlog warning event.
4. `src/pages/Home.jsx` — best-effort non-blocking mirror POST (type `contact_form`) in contact submit handler; existing flow untouched.
5. `src/services/contactService.js` — env-derived formsubmit endpoint (remove hardcoded Gmail).
6. `src/pages/DiscoveryCallPage.jsx` — SLA sentence via new key (existing prefix preserved).
7. `src/pages/InstantQuotePage.jsx` — SLA sentence via new key; soften "queued a follow-up" (G6).
8. `src/components/LeadCaptureModal.jsx` — SLA line for quote_offer/book_call_offer variants.
9. `src/i18n/translations.js` — 4 new SLA keys en/am/om.
10. `index.html` — JSON-LD nav rebuild, org email handling, noscript cleanup.
11. `api/leads.js` — webhook pending-retry file + drain + `webhook.retriesRemaining` in response + startup warning.
12. `api/mailing-list.js` — same.
13. `src/main.jsx` — DEV-only env warning table.
14. `.env.example` — REQUIRED markers; new vars VITE_CONTACT_FORM_SUBMIT_ENDPOINT, VITE_GA4_MEASUREMENT_ID, LEAD_INTAKE_WEBHOOK_PENDING_PATH, MAILING_LIST_WEBHOOK_PENDING_PATH; SiteSpeak doc-default fix.
15. `README.md` — flush behavior, pending files, new env vars, SLA commitments.
16. Ledger docs — post-QA updates.

### CREATE (0). DELETE (0).
### NOT TOUCHED: `tests/live-site.spec.js` (zero changes; exception clause only if contact flow re-routed — not recommended), robots.txt, sitemap.xml, leadAutomationService.js, analyticsService.js, seoService.js.

### Strict import map (new edges only)
- `leadIntakeService.js` + `mailingListService.js` → `import { trackEvent } from '../services/analyticsService'`
- `App.jsx` → flush imports (aliased)
- `Home.jsx` → `import { submitLeadIntake } from '../services/leadIntakeService'`
- `api/leads.js` + `api/mailing-list.js` → extend node:fs/promises with readFile, unlink; env reads

## 5. Owner actions (launch-relative deadlines)
| ID | Action | Deadline |
|---|---|---|
| OA-1 | Create + confirm domain mailbox (e.g., hello@novatech.et); provide exact address | 1 week pre-launch |
| OA-2 | Confirm novatech.et ownership/DNS + canonical origin | 1 week pre-launch |
| OA-3 | Activate formsubmit (or equivalent) forwarding for final contact address | 1 week pre-launch |
| OA-4 | Provide GA4 Measurement ID (or real analytics endpoint) — no analytics sink exists today | 1 week pre-launch |
| OA-5 | Confirm SiteSpeak production bot ID | 1 week pre-launch |
| OA-6 | Provide LEAD_INTAKE_WEBHOOK_URL + MAILING_LIST_WEBHOOK_URL — the B18 delivery rail | 1 week pre-launch |
| OA-7 | PDF human diff vs locked table + regeneration (known USD divergence) | 2 weeks pre-launch |
| OA-8 | Native AM/OM review of new SLA strings (NB-09 gate) | Post-code, pre-launch |
| OA-9 | **Deployment runtime decision for api/*.js** (Vercel/Netlify/VPS) — no config exists; blocks TECH-08 acceptance on real domain | Before launch |

## 6. Risks
R1 (critical): no confirmed runtime for handlers → production today lands everything in per-visitor localStorage. OA-9 gates. · R2: JSONL ephemeral on serverless — webhook (OA-6) is the durable rail. · R3: fallback queues per-device — flush only works if visitor returns; SLA copy must not over-promise on fallback path. · R4: E2E never exercises handlers — local-harness evidence mandatory. · R5: removing JSON-LD/noscript email until OA-1 → short window without static SEO email — accepted vs leaking personal inbox. · R6 (test guard): preserve asserted strings verbatim: `Thanks. Your booking details were captured`, `Thanks. Your message was sent successfully and our team will respond within 24 hours.`, `.modal-success-state` visibility, `pricing_guide_opened` analytics. · R7: graphify unavailable — grep-based tracing. · R8: .env.example/README SiteSpeak mismatch fixed.

**Blueprint status:** complete. Ready for @build execution.
