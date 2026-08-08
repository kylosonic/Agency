// THROWAWAY Phase-5 handler harness driver — NOT committed, NOT production.
// Orchestrates the blueprint §1.3 verification procedure:
//   A) Happy path per form (JSONL + webhook + ok:true + no fallback keys)
//   B) Failure injection -> localStorage fallback -> flush on reload
//   C) Webhook dead port -> pending file grows (bounded) -> drains on recovery
//   D) Startup warnings when webhook env unset
import { spawn } from 'node:child_process';
import { mkdir, readFile, rm, writeFile, appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EVIDENCE_DIR = __dirname;
const RUNTIME_DIR = path.join(EVIDENCE_DIR, '.harness-runtime');
const SCREENSHOT_DIR = path.join(EVIDENCE_DIR, 'screenshots');
const HARNESS_PORT = 8787;
const HARNESS_URL = `http://127.0.0.1:${HARNESS_PORT}`;

const results = [];
const logs = [];
let serverChild = null;
let serverOutput = [];

function check(name, condition, detail = '') {
  results.push({ name, pass: Boolean(condition), detail });
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

function spawnHarness({ webhook, storageDir, logDir, port = HARNESS_PORT }) {
  const env = {
    ...process.env,
    HARNESS_PORT: String(port),
    HARNESS_STORAGE_DIR: storageDir,
    HARNESS_LOG_DIR: logDir,
  };
  if (webhook === 'dead') {
    env.HARNESS_WEBHOOK_URL = 'http://127.0.0.1:9/__webhook__';
  } else if (webhook === 'unset') {
    env.HARNESS_WEBHOOK_URL = '';
  }
  // Explicitly unset any ambient webhook vars from the parent environment.
  delete env.LEAD_INTAKE_WEBHOOK_URL;
  delete env.MAILING_LIST_WEBHOOK_URL;

  serverOutput = [];
  const child = spawn(process.execPath, ['server-throwaway.mjs'], {
    cwd: __dirname,
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', (chunk) => serverOutput.push(chunk.toString()));
  child.stderr.on('data', (chunk) => serverOutput.push(chunk.toString()));
  return child;
}

async function waitForHarness(child, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (serverOutput.join('').includes('listening on')) {
      return;
    }
    if (child.exitCode !== null) {
      throw new Error(`harness exited early (${child.exitCode}): ${serverOutput.join('')}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`harness did not start in ${timeoutMs}ms`);
}

async function stopHarness(child) {
  if (child && child.exitCode === null) {
    child.kill('SIGTERM');
    await new Promise((resolve) => {
      child.once('exit', resolve);
      setTimeout(resolve, 3000);
    });
  }
}

function serverLogText() {
  return serverOutput.join('');
}

async function readJsonlLines(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8');
    return raw.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

async function readPendingCount(dir, name) {
  return (await readJsonlLines(path.join(dir, name))).length;
}

// ---------------------------------------------------------------------------
// Browser helpers
// ---------------------------------------------------------------------------
async function newBrowserContext(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  // Route: mock formsubmit.co (primary contact rail), serve localhost normally,
  // abort everything external (fonts/sitespeak/etc.) for determinism.
  await context.route('**/*', async (route) => {
    const url = route.request().url();
    if (url.startsWith('https://formsubmit.co/')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
      return;
    }
    if (url.startsWith('http://127.0.0.1:8787') || url.startsWith('http://localhost:8787')) {
      await route.continue();
      return;
    }
    await route.abort();
  });
  await context.addInitScript(() => {
    window.dataLayer = [];
  });
  return context;
}

async function dataLayerEvents(page) {
  return page.evaluate(() => {
    if (!Array.isArray(window.dataLayer)) {
      return [];
    }
    return window.dataLayer.filter((entry) => entry?.event);
  });
}

async function fallbackKeys(page) {
  return page.evaluate(() => Object.keys(localStorage).filter((key) => key.includes(':fallback')));
}

async function submitContactForm(page, { name = 'Harness Contact Tester', email = 'harness-contact@example.com', message = 'Phase 5 harness contact mirror submission.' } = {}) {
  await page.locator('#contact-name').fill(name);
  await page.locator('#contact-email').fill(email);
  await page.locator('#contact-message').fill(message);
  await page.getByRole('button', { name: 'Send Message' }).click();
  await page.getByText('Thanks. Your message was sent successfully and our team will respond within 24 hours.').waitFor({ timeout: 15000 });
}

async function submitQuoteWizard(page) {
  await page.goto(`${HARNESS_URL}/instant-quote`, { waitUntil: 'networkidle' });
  const continueButton = page.getByRole('button', { name: 'Continue' });
  await continueButton.waitFor({ timeout: 15000 });
  await continueButton.click();
  await continueButton.click();
  await continueButton.click();
  await page.locator('input[type="text"]').first().fill('Harness Quote Tester');
  await page.locator('input[type="email"]').fill('harness-quote@example.com');
  await page.getByRole('button', { name: 'Generate Estimate' }).click();
  await page.locator('.quote-result-card').waitFor({ timeout: 15000 });
}

async function submitDiscoveryBooking(page) {
  await page.goto(`${HARNESS_URL}/book-discovery-call`, { waitUntil: 'networkidle' });
  await page.locator('#booking-name').fill('Harness Booking Tester');
  await page.locator('#booking-email').fill('harness-booking@example.com');
  await page.locator('#booking-company').fill('Harness PLC');
  await page.locator('#booking-agenda').fill('Phase 5 harness discovery booking.');
  await page.getByRole('button', { name: 'Confirm Session' }).click();
  await page.getByText('Thanks. Your booking details were captured').waitFor({ timeout: 15000 });
}

async function submitLeadModal(page) {
  await page.goto(`${HARNESS_URL}/web-development`, { waitUntil: 'networkidle' });
  await page.locator('.cta-section .cta-actions button.btn.btn-primary').first().click();
  await page.locator('.modal-slide-panel').waitFor({ timeout: 15000 });
  await page.locator('#lead-name').fill('Harness Modal Tester');
  await page.locator('#lead-email').fill('harness-modal@example.com');
  await page.locator('#lead-company').fill('Harness Ltd');
  await page.locator('.modal-slide-panel form button.btn.btn-primary.btn-lg').click();
  await page.locator('.modal-success-state').waitFor({ timeout: 15000 });
}

// ---------------------------------------------------------------------------
async function main() {
  await mkdir(RUNTIME_DIR, { recursive: true });
  await mkdir(SCREENSHOT_DIR, { recursive: true });

  // ==========================================================================
  // PHASE A — happy path per form
  // ==========================================================================
  logs.push('===== PHASE A — HAPPY PATH (all four forms) =====');
  const phaseAStorage = path.join(RUNTIME_DIR, 'A-storage');
  const phaseALogs = path.join(RUNTIME_DIR, 'A-logs');
  await rm(phaseAStorage, { recursive: true, force: true });
  await rm(phaseALogs, { recursive: true, force: true });
  await mkdir(phaseAStorage, { recursive: true });
  await mkdir(phaseALogs, { recursive: true });

  serverChild = spawnHarness({ webhook: 'live', storageDir: phaseAStorage, logDir: phaseALogs });
  await waitForHarness(serverChild);
  const apiResponses = [];

  const browser = await chromium.launch();
  const context = await newBrowserContext(browser);

  // 1) Home contact form -> primary formsubmit (mocked) + mirror POST /api/leads
  const homePage = await context.newPage();
  homePage.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      apiResponses.push({ url: response.url(), status: response.status(), body: await response.text().catch(() => '') });
    }
  });
  await homePage.goto(`${HARNESS_URL}/`, { waitUntil: 'networkidle' });
  await submitContactForm(homePage);
  await homePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'A-home-contact-sent.png') });

  // 2) Instant quote wizard -> /api/leads (instant_quote)
  const quotePage = await context.newPage();
  quotePage.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      apiResponses.push({ url: response.url(), status: response.status(), body: await response.text().catch(() => '') });
    }
  });
  await submitQuoteWizard(quotePage);
  await quotePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'A-quote-result.png') });

  // 3) Discovery booking -> /api/leads (discovery_booking)
  const bookingPage = await context.newPage();
  bookingPage.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      apiResponses.push({ url: response.url(), status: response.status(), body: await response.text().catch(() => '') });
    }
  });
  await submitDiscoveryBooking(bookingPage);
  await bookingPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'A-booking-submitted.png') });

  // 4) Lead capture modal -> /api/mailing-list (pricing_guide)
  const modalPage = await context.newPage();
  modalPage.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      apiResponses.push({ url: response.url(), status: response.status(), body: await response.text().catch(() => '') });
    }
  });
  await submitLeadModal(modalPage);
  await modalPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'A-modal-success.png') });

  // Give async mirror/flush a moment to settle, then read storage.
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const leadsRowsA = await readJsonlLines(path.join(phaseAStorage, 'leads.jsonl'));
  const mailingRowsA = await readJsonlLines(path.join(phaseAStorage, 'mailing-list.jsonl'));
  const webhookRowsA = await readJsonlLines(path.join(phaseALogs, 'webhook-captured.jsonl'));

  const leadTypesA = leadsRowsA.map((row) => JSON.parse(row).type);
  const webhookTypesA = webhookRowsA.map((row) => JSON.parse(row).type || JSON.parse(row).listName || 'unknown');

  check('A1: leads.jsonl has 3 rows (contact_form, instant_quote, discovery_booking)',
    leadTypesA.filter((t) => ['contact_form', 'instant_quote', 'discovery_booking'].includes(t)).length === 3,
    JSON.stringify(leadTypesA));
  check('A2: mailing-list.jsonl has 1 row (pricing_guide)', mailingRowsA.length === 1, `count=${mailingRowsA.length}`);
  check('A3: webhook receiver captured 4 payloads (B18 forward rail)',
    webhookRowsA.length === 4, `count=${webhookRowsA.length}`);
  const okTrue = apiResponses.filter((r) => {
    try {
      return JSON.parse(r.body).ok === true;
    } catch {
      return false;
    }
  }).length;
  check('A4: every /api/* response has ok:true', okTrue === 4, `okResponses=${okTrue}/4`);
  check('A5: rows carry id + createdAt',
    leadsRowsA.every((row) => { const r = JSON.parse(row); return r.id && r.createdAt; }) &&
    mailingRowsA.every((row) => { const r = JSON.parse(row); return r.id && r.createdAt; }));
  const fallbacksA = await Promise.all([
    fallbackKeys(homePage),
    fallbackKeys(quotePage),
    fallbackKeys(bookingPage),
    fallbackKeys(modalPage),
  ]);
  check('A6: zero fallback queue keys in localStorage across all pages',
    fallbacksA.every((keys) => keys.length === 0), JSON.stringify(fallbacksA));

  await context.close();

  // ---- Phase A evidence excerpt ----
  const excerptA = [];
  excerptA.push('## Server log (excerpt)');
  excerptA.push(serverLogText().split('\n').filter((line) => line.includes('/api/') || line.includes('WEBHOOK_RECEIVED')).slice(0, 30).join('\n'));
  excerptA.push('', '## leads.jsonl rows');
  excerptA.push(leadsRowsA.join('\n'));
  excerptA.push('', '## mailing-list.jsonl rows');
  excerptA.push(mailingRowsA.join('\n'));
  excerptA.push('', '## /api/* response bodies');
  excerptA.push(apiResponses.map((r) => `${r.url} ${r.status} ${r.body}`).join('\n'));
  excerptA.push('', '## webhook receiver payload summaries');
  excerptA.push(webhookRowsA.map((row) => { const r = JSON.parse(row); return `${r.type || r.listName} id=${r.id} email=${r.lead?.email}`; }).join('\n'));
  excerptA.push('', '## localStorage fallback keys');
  excerptA.push(JSON.stringify(fallbacksA, null, 2));
  await writeFile(path.join(EVIDENCE_DIR, '01-happy-path.log'), excerptA.join('\n'), 'utf8');
  logs.push(`[A] leads=${leadsRowsA.length} mailing=${mailingRowsA.length} webhook=${webhookRowsA.length} fallbackKeys=${JSON.stringify(fallbacksA)}`);
  await stopHarness(serverChild);

  // ==========================================================================
  // PHASE B — failure injection -> localStorage fallback -> flush on reload
  // ==========================================================================
  logs.push('===== PHASE B — FALLBACK QUEUE + FLUSH ON RELOAD =====');
  const phaseBStorage = path.join(RUNTIME_DIR, 'B-storage');
  const phaseBLogs = path.join(RUNTIME_DIR, 'B-logs');
  await rm(phaseBStorage, { recursive: true, force: true });
  await rm(phaseBLogs, { recursive: true, force: true });
  await mkdir(phaseBStorage, { recursive: true });
  await mkdir(phaseBLogs, { recursive: true });

  serverChild = spawnHarness({ webhook: 'live', storageDir: phaseBStorage, logDir: phaseBLogs });
  await waitForHarness(serverChild);
  const contextB = await newBrowserContext(browser);
  const homeB = await contextB.newPage();
  const modalB = await contextB.newPage();
  await homeB.goto(`${HARNESS_URL}/`, { waitUntil: 'networkidle' });
  await modalB.goto(`${HARNESS_URL}/web-development`, { waitUntil: 'networkidle' });
  await modalB.locator('.cta-section .cta-actions button.btn.btn-primary').first().click();
  await modalB.locator('.modal-slide-panel').waitFor({ timeout: 15000 });

  // Server DOWN -> both submissions fall back to localStorage queues.
  await stopHarness(serverChild);
  await submitContactForm(homeB);
  await modalB.locator('#lead-name').fill('Harness Fallback Tester');
  await modalB.locator('#lead-email').fill('harness-fallback@example.com');
  await modalB.locator('.modal-slide-panel form button.btn.btn-primary.btn-lg').click();

  // The failed fetch rejects after ~2s; poll until BOTH fallback records exist.
  let bothQueued = false;
  for (let i = 0; i < 60; i += 1) {
    const keys = await Promise.all([fallbackKeys(homeB), fallbackKeys(modalB)]);
    if (
      keys[0].includes('novatech-lead-intake:fallback') &&
      keys[1].includes('novatech-mailing-list:fallback')
    ) {
      bothQueued = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  check('B1: both fallback queues written while harness down', bothQueued);
  const queuedB = await Promise.all([
    homeB.evaluate(() => localStorage.getItem('novatech-lead-intake:fallback')),
    modalB.evaluate(() => localStorage.getItem('novatech-mailing-list:fallback')),
  ]);
  logs.push(`[B] queued before flush: lead=${queuedB[0]} mailing=${queuedB[1]}`);
  await homeB.screenshot({ path: path.join(SCREENSHOT_DIR, 'B-fallback-queued.png') });

  // Server UP again -> reload both pages -> App flush re-POSTs oldest-first.
  serverChild = spawnHarness({ webhook: 'live', storageDir: phaseBStorage, logDir: phaseBLogs });
  await waitForHarness(serverChild);

  const leadsBeforeFlush = await readJsonlLines(path.join(phaseBStorage, 'leads.jsonl'));
  const mailingBeforeFlush = await readJsonlLines(path.join(phaseBStorage, 'mailing-list.jsonl'));
  logs.push(`[B] storage before reload: leads=${leadsBeforeFlush.length} mailing=${mailingBeforeFlush.length}`);

  await homeB.reload({ waitUntil: 'networkidle' });
  await modalB.reload({ waitUntil: 'networkidle' });

  // Poll until both queues drain (flush is async, fire-and-forget).
  let drained = false;
  for (let i = 0; i < 40; i += 1) {
    const [hk, mk] = await Promise.all([fallbackKeys(homeB), fallbackKeys(modalB)]);
    if (!hk.length && !mk.length) {
      drained = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  check('B2: fallback queues emptied after reload flush', drained);

  const leadsAfterFlush = await readJsonlLines(path.join(phaseBStorage, 'leads.jsonl'));
  const mailingAfterFlush = await readJsonlLines(path.join(phaseBStorage, 'mailing-list.jsonl'));
  check('B3: flush re-POSTed the queued lead -> leads.jsonl incremented',
    leadsAfterFlush.length === leadsBeforeFlush.length + 1,
    `${leadsBeforeFlush.length} -> ${leadsAfterFlush.length}`);
  check('B4: flush re-POSTed the queued mailing list lead -> mailing-list.jsonl incremented',
    mailingAfterFlush.length === mailingBeforeFlush.length + 1,
    `${mailingBeforeFlush.length} -> ${mailingAfterFlush.length}`);

  const eventsB = await dataLayerEvents(homeB);
  const eventNamesB = eventsB.map((e) => e.event);
  check('B5: analytics fallback_backlog_detected observed', eventNamesB.includes('fallback_backlog_detected'));
  check('B6: analytics lead_intake_fallback_flush observed', eventNamesB.includes('lead_intake_fallback_flush'));
  check('B7: analytics mailing_list_fallback_flush observed', eventNamesB.includes('mailing_list_fallback_flush'));
  logs.push(`[B] dataLayer events: ${JSON.stringify(eventNamesB)}`);

  await homeB.screenshot({ path: path.join(SCREENSHOT_DIR, 'B-after-flush.png') });

  // ---- Phase B evidence excerpt ----
  const excerptB = [];
  excerptB.push('## Fallback queue contents (before flush)');
  excerptB.push(`leads: ${queuedB[0]}`);
  excerptB.push(`mailing: ${queuedB[1]}`);
  excerptB.push('', '## Storage row counts');
  excerptB.push(`leads.jsonl: ${leadsBeforeFlush.length} -> ${leadsAfterFlush.length}`);
  excerptB.push(`mailing-list.jsonl: ${mailingBeforeFlush.length} -> ${mailingAfterFlush.length}`);
  excerptB.push('', '## Re-flushed lead row (type contact_form, oldest-first re-POST)');
  excerptB.push(leadsAfterFlush[leadsAfterFlush.length - 1] || '(none)');
  excerptB.push('', '## Re-flushed mailing row');
  excerptB.push(mailingAfterFlush[mailingAfterFlush.length - 1] || '(none)');
  excerptB.push('', '## dataLayer events observed after reload flush');
  excerptB.push(eventsB.map((e) => JSON.stringify(e)).join('\n'));
  await writeFile(path.join(EVIDENCE_DIR, '02-browser-fallback-and-flush.log'), excerptB.join('\n'), 'utf8');

  await contextB.close();
  await stopHarness(serverChild);

  // ==========================================================================
  // PHASE C — webhook dead port -> pending file grows (bounded) -> drains on recovery
  // ==========================================================================
  logs.push('===== PHASE C — WEBHOOK PENDING-RETRY FILE =====');
  const phaseCStorage = path.join(RUNTIME_DIR, 'C-storage');
  const phaseCLogs = path.join(RUNTIME_DIR, 'C-logs');
  await rm(phaseCStorage, { recursive: true, force: true });
  await rm(phaseCLogs, { recursive: true, force: true });
  await mkdir(phaseCStorage, { recursive: true });
  await mkdir(phaseCLogs, { recursive: true });

  const makePayload = (i) => ({
    type: 'instant_quote',
    source: 'harness_pending_test',
    channel: 'harness',
    routePath: '/instant-quote',
    lead: {
      name: `Pending Tester ${i}`,
      email: `pending${i}@example.com`,
      phone: '',
      message: `webhook pending row ${i}`,
    },
    context: { harnessRow: i },
    consent: { type: 'harness_test', capturedAt: new Date().toISOString(), copy: 'harness' },
  });

  serverChild = spawnHarness({ webhook: 'dead', storageDir: phaseCStorage, logDir: phaseCLogs });
  await waitForHarness(serverChild);

  const pendingPath = path.join(phaseCStorage, 'leads-webhook-pending.jsonl');
  const pendingResponses = [];
  let maxPendingObserved = 0;

  const postLead = async (i) => {
    const response = await fetch(`${HARNESS_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(makePayload(i)),
    });
    const body = await response.json();
    pendingResponses.push(body);
    const count = await readPendingCount(phaseCStorage, 'leads-webhook-pending.jsonl');
    if (count > maxPendingObserved) {
      maxPendingObserved = count;
    }
    return body;
  };

  const r1 = await postLead(1);
  check('C1: response ok:true with webhook.ok:false + retriesRemaining + pendingCount',
    r1.ok === true && r1.webhook?.ok === false && r1.webhook?.retriesRemaining === 4 && r1.webhook?.pendingCount === 1,
    JSON.stringify(r1.webhook));
  logs.push(`[C] first response webhook block: ${JSON.stringify(r1.webhook)}`);

  for (let i = 2; i <= 8; i += 1) {
    await postLead(i);
  }
  const pendingAfter8 = await readPendingCount(phaseCStorage, 'leads-webhook-pending.jsonl');
  const pendingSample = await readJsonlLines(pendingPath);
  const attemptsInFile = pendingSample.every((row) => {
    try {
      return (JSON.parse(row).webhookAttempts ?? 0) >= 1;
    } catch {
      return false;
    }
  });
  check('C2: failed webhook forwards retained in pending file (keep-on-failure) with attempt counters',
    pendingAfter8 >= 1 && attemptsInFile,
    `pending=${pendingAfter8} rowsWithAttempts=${attemptsInFile}`);
  check('C2b: every submission reported webhook.ok:false + retriesRemaining:4 while webhook down',
    pendingResponses.every((r) => r.webhook?.ok === false && r.webhook?.retriesRemaining === 4));
  logs.push(`[C] after 8 submissions: pending=${pendingAfter8} (drain drops rows at the 5-attempt cap)`);

  // Bounded burst: 508 submissions against a dead port must never exceed ~500 pending rows.
  for (let i = 9; i <= 508; i += 1) {
    await postLead(i);
  }
  const pendingAfterBurst = await readPendingCount(phaseCStorage, 'leads-webhook-pending.jsonl');
  check('C3: pending file bounded at ~500 (never exceeds cap)',
    pendingAfterBurst <= 500 && maxPendingObserved <= 500,
    `final=${pendingAfterBurst} maxObserved=${maxPendingObserved}`);
  logs.push(`[C] after 508 submissions: pending=${pendingAfterBurst} maxObserved=${maxPendingObserved}`);

  // ---- Phase C evidence excerpt ----
  const excerptC = [];
  excerptC.push('## First response webhook block');
  excerptC.push(JSON.stringify(r1.webhook));
  excerptC.push('', '## Pending file sample (first 3 rows)');
  excerptC.push((await readJsonlLines(pendingPath)).slice(0, 3).join('\n'));
  excerptC.push('', `## Pending file line count after burst: ${pendingAfterBurst} (cap 500)`);
  excerptC.push('', '## Server log excerpt (capacity warnings)');
  excerptC.push(serverLogText().split('\n').filter((line) => line.includes('capacity') || line.includes('at capacity')).slice(0, 5).join('\n'));
  await writeFile(path.join(EVIDENCE_DIR, '03-webhook-pending.log'), excerptC.join('\n'), 'utf8');
  await stopHarness(serverChild);

  // ---- Recovery: live webhook again; next requests drain the pending file. ----
  serverChild = spawnHarness({ webhook: 'live', storageDir: phaseCStorage, logDir: phaseCLogs });
  await waitForHarness(serverChild);

  let drainedTotal = 0;
  let drainedRounds = 0;
  for (let i = 0; i < 110; i += 1) {
    const body = await postLead(9000 + i);
    drainedTotal += body.webhookDrain?.drained || 0;
    drainedRounds += 1;
    if ((body.webhookDrain?.remaining || 0) === 0 && !pendingResponses.length) {
      // keep draining until pending file is empty
    }
    const remaining = await readPendingCount(phaseCStorage, 'leads-webhook-pending.jsonl');
    if (remaining === 0) {
      break;
    }
  }
  const pendingAfterRecovery = await readPendingCount(phaseCStorage, 'leads-webhook-pending.jsonl');
  const webhookRecovered = await readJsonlLines(path.join(phaseCLogs, 'webhook-captured.jsonl'));
  check('C4: pending file fully drained after recovery',
    pendingAfterRecovery === 0, `pending=${pendingAfterRecovery}`);
  check('C5: drained forwards re-delivered to the webhook receiver',
    webhookRecovered.length >= pendingAfterBurst - 50, // allow for cap-dropped rows
    `recovered=${webhookRecovered.length} (pending at recovery ~${pendingAfterBurst})`);

  const excerptRecovery = [];
  excerptRecovery.push(`## Drain rounds: ${drainedRounds}, total drained: ${drainedTotal}`);
  excerptRecovery.push(`## Pending file after recovery: ${pendingAfterRecovery}`);
  excerptRecovery.push('', '## Recovered webhook payload samples');
  excerptRecovery.push(webhookRecovered.slice(0, 3).join('\n'));
  excerptRecovery.push('', '## Last drain response webhook block');
  excerptRecovery.push(JSON.stringify(pendingResponses[pendingResponses.length - 1].webhook));
  excerptRecovery.push('', '## Server log excerpt (recovery)');
  excerptRecovery.push(serverLogText().split('\n').filter((line) => line.includes('WEBHOOK_RECEIVED')).slice(-5).join('\n'));
  await writeFile(path.join(EVIDENCE_DIR, '04-recovery-drain.log'), excerptRecovery.join('\n'), 'utf8');
  logs.push(`[C] recovery: drained=${drainedTotal} recovered=${webhookRecovered.length} pending=${pendingAfterRecovery}`);
  await stopHarness(serverChild);

  // ==========================================================================
  // PHASE D — startup warnings when webhook env unset
  // ==========================================================================
  logs.push('===== PHASE D — STARTUP WARNINGS =====');
  const phaseDStorage = path.join(RUNTIME_DIR, 'D-storage');
  await rm(phaseDStorage, { recursive: true, force: true });
  await mkdir(phaseDStorage, { recursive: true });
  serverChild = spawnHarness({ webhook: 'unset', storageDir: phaseDStorage, logDir: phaseDStorage });
  await waitForHarness(serverChild);
  const startupLog = serverLogText();
  check('D1: api/leads startup warning when LEAD_INTAKE_WEBHOOK_URL unset',
    startupLog.includes('LEAD_INTAKE_WEBHOOK_URL is not set'));
  check('D2: api/mailing-list startup warning when MAILING_LIST_WEBHOOK_URL unset',
    startupLog.includes('MAILING_LIST_WEBHOOK_URL is not set'));
  await writeFile(path.join(EVIDENCE_DIR, '05-startup-warning.log'), startupLog, 'utf8');
  await stopHarness(serverChild);

  await browser.close();

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  const passCount = results.filter((r) => r.pass).length;
  const failCount = results.filter((r) => !r.pass).length;

  const summary = [];
  summary.push('# Phase 5 — Local Handler Harness Evidence (TECH-08)');
  summary.push('');
  summary.push(`Generated: ${new Date().toISOString()}`);
  summary.push(`Node: ${process.version}`);
  summary.push(`Result: ${failCount === 0 ? 'ALL CHECKS PASSED' : `${failCount} CHECK(S) FAILED`} (${passCount}/${results.length})`);
  summary.push('');
  summary.push('Checks:');
  for (const r of results) {
    summary.push(`- [${r.pass ? 'x' : ' '}] ${r.name}${r.detail ? ` (${r.detail})` : ''}`);
  }
  summary.push('');
  summary.push('Log files:');
  summary.push('- 01-happy-path.log — Phase A (JSONL + webhook + ok:true + no fallback keys)');
  summary.push('- 02-browser-fallback-and-flush.log — Phase B (fallback queue -> flush on reload)');
  summary.push('- 03-webhook-pending.log — Phase C (dead port -> pending file grows, bounded)');
  summary.push('- 04-recovery-drain.log — Phase C (recovery -> drain <=5/invocation)');
  summary.push('- 05-startup-warning.log — Phase D (webhook-unset startup warnings)');
  summary.push('');
  summary.push('Driver trace:');
  summary.push(logs.join('\n'));
  await writeFile(path.join(EVIDENCE_DIR, '00-summary.md'), summary.join('\n'), 'utf8');

  // Clean up runtime artifacts (keep only the curated excerpts).
  await rm(RUNTIME_DIR, { recursive: true, force: true });

  console.log(summary.join('\n'));
  process.exit(failCount === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error('HARNESS DRIVER FAILURE:', error);
  if (serverChild) {
    stopHarness(serverChild);
  }
  process.exit(2);
});
