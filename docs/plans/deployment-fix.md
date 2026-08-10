# Deployment Fix Plan — novatech23.vercel.app (root-cause + fix) — RESOLVED

**Date:** 2026-08-08 · **Author:** @visionary (investigation) · **Executor:** @architect (terminal) 
**Status:** ✅ RESOLVED — all verification gates passed 2026-08-08.

## True root cause (discovered during execution)

**There are TWO Vercel projects in the `kylosonics-projects` team:**

| Project | Owns alias | GitHub integration | Env vars | Role |
|---|---|---|---|---|
| **`agency`** (`prj_ImoEpvWPCWM9we3dBdrgFJqM0qsf`) | **`novatech23.vercel.app`** ✓ | YES (repo `kylosonic/Agency`) | Was EMPTY — now all 6 set | **THE REAL PROJECT** |
| `novatech23` (`prj_KSw2gJItPDYmboM7UnCHyIHKWsaC`) | delta + hashed aliases only | connected | Had the vars | CLI-created duplicate |

1. The owner's original project is **`agency`** — it owns `novatech23.vercel.app` and auto-deploys from GitHub pushes to `main`.
2. The earlier CLI work accidentally created/used a **second project** named `novatech23` — env vars and CLI deploys went there, which is why the main URL never reflected them.
3. Two additional production bugs were found and fixed during live verification:
   - **SPA fallback missing** in `vercel.json` — `/pricing` etc. 404'd on Vercel (local preview masks it). Fixed with `rewrites: [{ "source": "/((?!api/).*)", "destination": "/" }]` (commit `80cff32`).
   - **Read-only filesystem on serverless** — handlers wrote JSONL to `process.cwd()/storage` which is read-only on Vercel Lambda. Fixed by setting `*_STORAGE_PATH` and `*_WEBHOOK_PENDING_PATH` to `/tmp/...` on the **`agency`** project (6 env vars).

## What was done
1. Re-pointed `novatech23.vercel.app` → newest deployment (superseded by integration deploys below).
2. Merged `feat/launch-readiness` → `main` (all 8 commits) and pushed (`5cf8201`). Main now carries the launch-ready code — the GitHub integration can no longer deploy the old fake-proof site.
3. Added SPA fallback rewrite to `vercel.json` and pushed (`80cff32`).
4. Switched local Vercel link to the correct `agency` project.
5. Added all 6 production env vars to `agency`:
   - `VITE_SITE_URL=https://novatech23.vercel.app`
   - `VITE_CONTACT_EMAIL=nahomgwmichael@gmail.com`
   - `LEAD_INTAKE_STORAGE_PATH=/tmp/leads.jsonl`
   - `LEAD_INTAKE_WEBHOOK_PENDING_PATH=/tmp/leads-webhook-pending.jsonl`
   - `MAILING_LIST_STORAGE_PATH=/tmp/mailing-list.jsonl`
   - `MAILING_LIST_WEBHOOK_PENDING_PATH=/tmp/mailing-list-webhook-pending.jsonl`
6. Triggered fresh integration deployment (`agency-imwwkj9l9`) via no-op commit push (`faefe92`).

## Final verification (all passed)
- **15/15 routes return 200** on `novatech23.vercel.app` (/, pricing, workflow-audit, services, web/mobile/saas development, policy, instant-quote, book-discovery-call, additional-services, 4× industries)
- **`/api/leads` → 200, `{"ok":true,"stored":true}`** — lead persisted to `/tmp/leads.jsonl`
- **`/api/mailing-list` → 200, `{"ok":true,"stored":true}`**
- Canonical/OG/JSON-LD all point at `novatech23.vercel.app`; zero `novatech.et` in static HTML; zero case-studies/portfolio references
- Deployment source: GitHub integration (push to main → auto-deploy), pipeline now owned by the repo

## Remaining owner actions (unchanged)
- **OA-6:** webhook URLs (response shows `"webhook":{"configured":false}`) — the durable lead-delivery rail still needs a target (inbox/CRM/Telegram)
- **OA-4:** GA4 measurement ID — no analytics sink yet
- **OA-7:** PDF human-diff + regeneration (still shows legacy USD table)
- **OA-8:** native AM/OM review of new translation strings
- **OA-9:** runtime decision — resolved by default: Vercel serverless runs the handlers; storage is ephemeral `/tmp` per-function (acceptable pre-launch; webhooks will be the durable rail)
- Optional cleanup: the duplicate `novatech23` project (delta aliases) can be deleted or left as a staging sandbox — owner decision

## Note on the duplicate project
The `novatech23` project is harmless but confusing (it holds the delta alias). Recommend the owner delete it in the Vercel dashboard, or repurpose it as a staging environment. Not deleted from CLI to avoid unintended destructive action without owner confirmation.
