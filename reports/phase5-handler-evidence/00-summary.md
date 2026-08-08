# Phase 5 — Local Handler Harness Evidence (TECH-08)

Generated: 2026-08-08T05:22:31.364Z
Node: v24.16.0
Result: ALL CHECKS PASSED (21/21)

Checks:
- [x] A1: leads.jsonl has 3 rows (contact_form, instant_quote, discovery_booking) (["contact_form","instant_quote","discovery_booking"])
- [x] A2: mailing-list.jsonl has 1 row (pricing_guide) (count=1)
- [x] A3: webhook receiver captured 4 payloads (B18 forward rail) (count=4)
- [x] A4: every /api/* response has ok:true (okResponses=4/4)
- [x] A5: rows carry id + createdAt
- [x] A6: zero fallback queue keys in localStorage across all pages ([[],[],[],[]])
- [x] B1: both fallback queues written while harness down
- [x] B2: fallback queues emptied after reload flush
- [x] B3: flush re-POSTed the queued lead -> leads.jsonl incremented (0 -> 1)
- [x] B4: flush re-POSTed the queued mailing list lead -> mailing-list.jsonl incremented (0 -> 1)
- [x] B5: analytics fallback_backlog_detected observed
- [x] B6: analytics lead_intake_fallback_flush observed
- [x] B7: analytics mailing_list_fallback_flush observed
- [x] C1: response ok:true with webhook.ok:false + retriesRemaining + pendingCount ({"configured":true,"ok":false,"status":0,"error":"network","retriesRemaining":4,"pendingCount":1})
- [x] C2: failed webhook forwards retained in pending file (keep-on-failure) with attempt counters (pending=5 rowsWithAttempts=true)
- [x] C2b: every submission reported webhook.ok:false + retriesRemaining:4 while webhook down
- [x] C3: pending file bounded at ~500 (never exceeds cap) (final=5 maxObserved=5)
- [x] C4: pending file fully drained after recovery (pending=0)
- [x] C5: drained forwards re-delivered to the webhook receiver (recovered=6 (pending at recovery ~5))
- [x] D1: api/leads startup warning when LEAD_INTAKE_WEBHOOK_URL unset
- [x] D2: api/mailing-list startup warning when MAILING_LIST_WEBHOOK_URL unset

Log files:
- 01-happy-path.log — Phase A (JSONL + webhook + ok:true + no fallback keys)
- 02-browser-fallback-and-flush.log — Phase B (fallback queue -> flush on reload)
- 03-webhook-pending.log — Phase C (dead port -> pending file grows, bounded)
- 04-recovery-drain.log — Phase C (recovery -> drain <=5/invocation)
- 05-startup-warning.log — Phase D (webhook-unset startup warnings)

Driver trace:
===== PHASE A — HAPPY PATH (all four forms) =====
[A] leads=3 mailing=1 webhook=4 fallbackKeys=[[],[],[],[]]
===== PHASE B — FALLBACK QUEUE + FLUSH ON RELOAD =====
[B] queued before flush: lead=[{"type":"contact_form","source":"home_contact_form","channel":"contact_form","routePath":"/","lead":{"name":"Harness Contact Tester","email":"harness-contact@example.com","company":"","phone":"","message":"Phase 5 harness contact mirror submission."},"context":{"delivery":"durable_mirror"},"consent":{"type":"contact_form_mirror","capturedAt":"2026-08-08T05:22:15.640Z","copy":"Durable mirror of the homepage contact form submission."},"id":"1786166537740-d3bf80","createdAt":"2026-08-08T05:22:17.740Z","status":"pending_sync","errorType":"request-failed"}] mailing=[{"listName":"pricing-guide","source":"web_page_cta_pricing","variant":"pricing_guide","routePath":"/web-development","lead":{"name":"Harness Fallback Tester","email":"harness-fallback@example.com","company":""},"id":"1786166537978-0672ff","createdAt":"2026-08-08T05:22:17.978Z","status":"pending_sync","errorType":"request-failed"}]
[B] storage before reload: leads=0 mailing=0
[B] dataLayer events: ["fallback_backlog_detected","page_view","lead_intake_fallback_flush","mailing_list_fallback_flush"]
===== PHASE C — WEBHOOK PENDING-RETRY FILE =====
[C] first response webhook block: {"configured":true,"ok":false,"status":0,"error":"network","retriesRemaining":4,"pendingCount":1}
[C] after 8 submissions: pending=5 (drain drops rows at the 5-attempt cap)
[C] after 508 submissions: pending=5 maxObserved=5
[C] recovery: drained=5 recovered=6 pending=0
===== PHASE D — STARTUP WARNINGS =====