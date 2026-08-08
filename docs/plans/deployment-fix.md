# Deployment Fix Plan — novatech23.vercel.app (root-cause + fix)

**Date:** 2026-08-08 · **Author:** @visionary (investigation) · **Executor:** @architect / @build (terminal access required)
**Status:** AWAITING EXECUTION — verified read-only; no further mutations performed after the incident.

## 1. What the user observed

- The project was **already live** on `novatech23.vercel.app` (GitHub repo `kylosonic/Agency` connected to Vercel) **before** today's CLI deploys.
- Recent CLI deploys appeared to land on a **different domain** (`novatech23-delta.vercel.app` and hashed deployment URLs), and `novatech23.vercel.app` was not serving the newest build.
- Question: why did the deploy go to a different domain, and how do we get the launch-ready site on `novatech23.vercel.app`?

## 2. Verified findings (evidence-based)

### 2.1 Git state (from `.git/config`)
- Remote: `https://github.com/kylosonic/Agency.git` — **confirmed connected**.
- `main` tracks `origin/main`. `feat/launch-readiness` exists and is **NOT merged into main**.
- All launch-readiness work (phases 1–6 + deploy prep) lives ONLY on `feat/launch-readiness` (8 commits: `adc2302` → `e15c71f`).
- **Implication:** `main` still contains the pre-launch code (fabricated case studies, USD pricing, glass template). If GitHub integration auto-deploys `main`, the OLD site is what production serves by default.

### 2.2 Vercel state
- CLI authenticated as `kylosonic`, team `kylosonics-projects`.
- Project `novatech23` (`prj_KSw2gJItPDYmboM7UnCHyIHKWsaC`) — **linked to the GitHub repo** ("Connecting GitHub repository: https://github.com/kylosonic/Agency > Connected").
- Env vars set on the project (production): `VITE_SITE_URL=https://novatech23.vercel.app`, `VITE_CONTACT_EMAIL=nahomgwmichael@gmail.com`.
- Aliases existing: `novatech23.vercel.app`, `novatech23-delta.vercel.app`, `novatech23-kylosonic-kylosonics-projects.vercel.app`, `novatech23-kylosonics-projects.vercel.app`, plus hashed URLs.

### 2.3 Live build comparison (fetched 2026-08-08, both URLs)
| Domain | Bundle | Canonical / og:url | Conclusion |
|---|---|---|---|
| `novatech23.vercel.app` | `index-DwFkgG5-.js` | `https://novatech.et/` | **OLD CLI deploy #1** (pre-hostname-swap) |
| `novatech23-delta.vercel.app` | `index-BhfagNkM.js` | `https://novatech23.vercel.app/` | **NEWEST CLI deploy #2** (post-hostname-swap, correct) |

- Both builds ARE the launch-ready code (fonts include JetBrains Mono + Noto Sans Ethiopic; no case-studies/portfolio in JSON-LD — the static JSON-LD was rebuilt with 11 live routes).
- The difference between the two: `novatech23.vercel.app` serves **deploy #1** whose static metadata still points at `novatech.et`; `novatech23-delta.vercel.app` serves **deploy #2** with correct `novatech23.vercel.app` metadata.

### 2.4 Root cause (the "why did it go to a different domain")
1. The CLI's first `vercel deploy --prod` created a NEW deployment; the automatic production alias resolution found `novatech23.vercel.app` already claimed (by the pre-existing GitHub-integrated project) and auto-assigned **`novatech23-delta.vercel.app`** instead.
2. A manual `vercel alias set <deploy-1-url> novatech23.vercel.app` re-pointed the main alias to **deploy #1** (pre-hostname-swap).
3. The second `vercel deploy --prod` (after the hostname-swap commit `e15c71f`) produced deploy #2, which landed on the **delta alias**; `novatech23.vercel.app` was left pointing at deploy #1.
4. Net effect: the user's main URL shows the older build; the newest build is only visible on the delta alias. **Not a content problem — an alias/re-pointing problem.**

### 2.5 Additional findings (must be addressed in the same fix)
- `public/sitemap.xml` + `public/robots.txt` still reference `https://novatech.et` (statically served). While `novatech.et` is not live, crawlers would read a dead canonical — harmless until the domain is ready, but must flip to `novatech23.vercel.app` (or be left until OA-2). Decide with @architect.
- **GitHub integration hazard:** if the integration deploys on push to `main`, the next push to main would deploy the OLD site (fake proof) over everything. The durable fix is merging `feat/launch-readiness` → `main` so the repo and production agree.

## 3. Fix plan (ordered)

### Step 1 — Re-point the main alias to the newest deployment
```bash
vercel alias set <newest-deployment-url> novatech23.vercel.app
```
- Obtain the newest deployment URL via `vercel ls novatech23` (identify the deployment whose build includes the hostname swap — verify by fetching and checking `canonical` = `novatech23.vercel.app`).
- After re-pointing, verify: `https://novatech23.vercel.app/` serves bundle `index-BhfagNkM.js` (or the latest hash) with canonical `novatech23.vercel.app`.

### Step 2 — Make the repo authoritative (merge to main)
- Merge `feat/launch-readiness` → `main` (all 8 commits, including deploy prep).
- Push to `origin/main`.
- **Verify the GitHub integration deployment:** after push, `novatech23.vercel.app` should be redeployed by the integration with the same content. If the integration is set to a different branch, confirm the production branch setting in the Vercel project dashboard.
- This closes the "stale main overwrites live site" hazard.

### Step 3 — Align static SEO files
- `public/sitemap.xml`: flip `https://novatech.et` → `https://novatech23.vercel.app` (temporary until OA-2, then flip back).
- `public/robots.txt`: same treatment for the Sitemap line.
- Commit on the branch (post-merge if merged) and redeploy via the integration.
- **Note:** `index.html` static metadata is already swapped (commit `e15c71f`). The runtime `seoService` derives canonical from `VITE_SITE_URL` which is set on the project — consistent.

### Step 4 — Clean up aliases (optional)
- Remove the delta alias once the main alias is verified (`vercel alias rm novatech23-delta.vercel.app`) or keep it as a staging alias. Recommend: keep until the main URL is verified, then remove to avoid future confusion.

### Step 5 — Final verification checklist
- [ ] `https://novatech23.vercel.app/` serves the launch-ready build (bundle hash = newest; canonical = novatech23.vercel.app)
- [ ] No `case-studies`/`portfolio` references anywhere in served HTML (JSON-LD + noscript)
- [ ] No `novatech.et` in served static HTML (except intentional future-state references)
- [ ] ETB pricing renders on `/pricing` (audit 85,000 ETB, AI 250k/750k/1.5M+)
- [ ] Policy page states bank-transfer-only payment + CBE Birr
- [ ] Email `nahomgwmichael@gmail.com` renders in contact surfaces
- [ ] `/api/leads` + `/api/mailing-list` respond on the Vercel domain (serverless functions execute)
- [ ] Env vars on the project: `VITE_SITE_URL`, `VITE_CONTACT_EMAIL` confirmed

## 4. Owner decisions required (before/with execution)
1. **Merge to main now?** (Recommended: yes — makes the repo the source of truth and stops the GitHub integration from ever deploying stale code. The UAT on the live URL serves as the approval.)
2. **Keep `nahomgwmichael@gmail.com`** as the contact until the domain mailbox exists — confirmed by owner on 2026-08-08.
3. **Sitemap/robots flip** to `novatech23.vercel.app` temporarily — confirm.
4. **OA-6 (webhook URLs)** and **OA-9 (runtime)** remain owner-side — the serverless functions will execute on Vercel by default; storage JSONL will be ephemeral per-function unless a persistent store is configured (acceptable pre-launch; webhooks remain the durable rail once provided).

## 5. Risks
- R1: Executing alias commands from the CLI while the GitHub integration owns production could conflict if the integration is configured with "protected production" — check project settings before `alias set` (or use the dashboard).
- R2: Pushing to `main` triggers an integration deploy — if that deploy builds from the wrong env (missing `VITE_SITE_URL` for production), the canonical could regress to `novatech.et`; verify env scoping (production) before pushing.
- R3: The delta alias serving the newest build is a trap for future confusion — resolve alias cleanup in Step 4.
- R4: If the GitHub integration is NOT configured to auto-deploy (only connected for source), the CLI deploys are authoritative and Step 2 is still recommended for repo hygiene but the integration check in Step 2 must confirm actual behavior.

**Handoff:** @architect executes Steps 1–5 with terminal access, then reports verification results to the owner.
