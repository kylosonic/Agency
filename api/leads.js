import crypto from 'node:crypto';
import { appendFile, mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_STORAGE_PATH = path.join(process.cwd(), 'storage', 'leads.jsonl');
const STORAGE_PATH = process.env.LEAD_INTAKE_STORAGE_PATH || DEFAULT_STORAGE_PATH;
const WEBHOOK_URL = process.env.LEAD_INTAKE_WEBHOOK_URL || '';
const API_KEY = process.env.LEAD_INTAKE_API_KEY || '';
const ALLOWED_ORIGIN = process.env.LEAD_INTAKE_ALLOWED_ORIGIN || '*';
const MAX_BODY_BYTES = 32_768;

const DEFAULT_WEBHOOK_PENDING_PATH = path.join(process.cwd(), 'storage', 'leads-webhook-pending.jsonl');
const WEBHOOK_PENDING_PATH = process.env.LEAD_INTAKE_WEBHOOK_PENDING_PATH || DEFAULT_WEBHOOK_PENDING_PATH;
const WEBHOOK_MAX_PENDING_RECORDS = 500;
const WEBHOOK_DRAIN_BATCH_SIZE = 5;
const WEBHOOK_MAX_ATTEMPTS = 5;

if (!WEBHOOK_URL) {
  console.warn(
    '[api/leads] LEAD_INTAKE_WEBHOOK_URL is not set. Leads are stored locally but are NOT forwarded to the team inbox (B18 rail). Set it before launch (owner action OA-6).'
  );
}

const ALLOWED_TYPES = new Set([
  'discovery_booking',
  'instant_quote',
  'contact_form',
  'pricing_guide',
  'general_inquiry',
]);

function setCorsHeaders(req, res) {
  const requestOrigin = req.headers?.origin;
  const allowOrigin = ALLOWED_ORIGIN === 'request-origin' && requestOrigin ? requestOrigin : ALLOWED_ORIGIN;

  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Api-Key');
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function normalizeString(value, maxLength = 500) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function normalizeEmail(value) {
  return normalizeString(value, 320).toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeContext(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      if (Array.isArray(entry)) {
        return [key, entry.map((item) => normalizeString(String(item), 240)).filter(Boolean).slice(0, 30)];
      }

      if (typeof entry === 'number' || typeof entry === 'boolean') {
        return [key, entry];
      }

      return [key, normalizeString(String(entry ?? ''), 800)];
    })
  );
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return JSON.parse(req.body || '{}');
  }

  let rawBody = '';

  for await (const chunk of req) {
    rawBody += chunk;

    if (Buffer.byteLength(rawBody) > MAX_BODY_BYTES) {
      const error = new Error('Request body too large');
      error.statusCode = 413;
      throw error;
    }
  }

  return JSON.parse(rawBody || '{}');
}

function assertFutureSlot(context) {
  if (!context.selectedSlot) {
    return;
  }

  const slotTime = new Date(context.selectedSlot).getTime();
  if (!Number.isFinite(slotTime) || slotTime <= Date.now()) {
    const error = new Error('Selected booking slot must be in the future.');
    error.statusCode = 422;
    throw error;
  }
}

function buildRecord(payload, req) {
  const lead = payload.lead || {};
  const email = normalizeEmail(lead.email);
  const type = normalizeString(payload.type, 80) || 'general_inquiry';
  const context = normalizeContext(payload.context);

  if (!ALLOWED_TYPES.has(type)) {
    const error = new Error('Unsupported lead type.');
    error.statusCode = 422;
    throw error;
  }

  if (!isValidEmail(email)) {
    const error = new Error('A valid email address is required.');
    error.statusCode = 422;
    throw error;
  }

  if (type === 'discovery_booking') {
    assertFutureSlot(context);
  }

  const createdAt = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    createdAt,
    type,
    source: normalizeString(payload.source, 180) || 'website',
    channel: normalizeString(payload.channel, 100) || 'website',
    routePath: normalizeString(payload.routePath, 180) || '/',
    lead: {
      name: normalizeString(lead.name, 160),
      email,
      company: normalizeString(lead.company, 180),
      phone: normalizeString(lead.phone, 80),
      message: normalizeString(lead.message, 1400),
    },
    context,
    consent: {
      type: normalizeString(payload.consent?.type, 120) || 'lead_intake',
      capturedAt: createdAt,
      copy: normalizeString(payload.consent?.copy, 400),
    },
    request: {
      userAgent: normalizeString(req.headers?.['user-agent'], 400),
      referer: normalizeString(req.headers?.referer || req.headers?.referrer, 400),
    },
  };
}

async function storeRecord(record) {
  await mkdir(path.dirname(STORAGE_PATH), { recursive: true });
  await appendFile(STORAGE_PATH, `${JSON.stringify(record)}\n`, 'utf8');
}

async function forwardRecord(record) {
  if (!WEBHOOK_URL) {
    return { configured: false, ok: false };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
      signal: controller.signal,
    });

    return { configured: true, ok: response.ok, status: response.status };
  } catch (error) {
    // Network-level failures must never bubble up: the lead is already stored,
    // and the pending-retry file keeps the record until the webhook recovers.
    return {
      configured: true,
      ok: false,
      status: 0,
      error: error.name === 'AbortError' ? 'timeout' : 'network',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function readPendingWebhookRecords() {
  try {
    const raw = await readFile(WEBHOOK_PENDING_PATH, 'utf8');
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

async function writePendingWebhookRecords(records) {
  if (!records.length) {
    try {
      await unlink(WEBHOOK_PENDING_PATH);
    } catch {
      // No pending file yet — nothing to clean up.
    }
    return;
  }

  // Bounded: keep the oldest records first (delivery priority), cap at 500.
  const bounded = records.slice(0, WEBHOOK_MAX_PENDING_RECORDS);
  await mkdir(path.dirname(WEBHOOK_PENDING_PATH), { recursive: true });
  await writeFile(
    WEBHOOK_PENDING_PATH,
    `${bounded.map((record) => JSON.stringify(record)).join('\n')}\n`,
    'utf8'
  );
}

async function queuePendingWebhookRecord(record) {
  const records = await readPendingWebhookRecords();

  if (records.length >= WEBHOOK_MAX_PENDING_RECORDS) {
    const dropped = records.shift();
    console.warn(
      `[api/leads] webhook pending file at capacity (${WEBHOOK_MAX_PENDING_RECORDS}); dropped oldest record ${dropped?.id || '(unknown)'}.`
    );
  }

  records.push({
    ...record,
    webhookQueuedAt: new Date().toISOString(),
    webhookAttempts: 1,
  });

  await writePendingWebhookRecords(records);
}

// Re-forwards up to WEBHOOK_DRAIN_BATCH_SIZE oldest pending records.
// 2xx deletes the pending row; failures bump webhookAttempts and are kept
// until WEBHOOK_MAX_ATTEMPTS is reached, then dropped with a warning.
async function drainPendingWebhookRecords() {
  const records = await readPendingWebhookRecords();

  if (!records.length) {
    return { drained: 0, remaining: 0, failed: 0 };
  }

  const batch = records.slice(0, WEBHOOK_DRAIN_BATCH_SIZE);
  const rest = records.slice(WEBHOOK_DRAIN_BATCH_SIZE);
  let drained = 0;
  const kept = [];

  for (const pending of batch) {
    const { webhookQueuedAt, webhookAttempts, ...record } = pending;
    const result = await forwardRecord(record);

    if (result.ok) {
      drained += 1;
      continue;
    }

    if (webhookAttempts >= WEBHOOK_MAX_ATTEMPTS) {
      console.warn(
        `[api/leads] dropping pending webhook record ${record.id || '(unknown)'} after ${webhookAttempts} failed attempts.`
      );
      continue;
    }

    kept.push({ ...record, webhookQueuedAt, webhookAttempts: webhookAttempts + 1 });
  }

  const remaining = rest.length + kept.length;
  await writePendingWebhookRecords([...rest, ...kept]);

  return { drained, remaining, failed: kept.length };
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  if (API_KEY && req.headers?.['x-api-key'] !== API_KEY) {
    sendJson(res, 401, { ok: false, error: 'Unauthorized' });
    return;
  }

  try {
    const payload = await readJsonBody(req);
    const record = buildRecord(payload, req);
    await storeRecord(record);

    // Drain older pending forwards first (oldest-first, bounded batch).
    const webhookDrain = await drainPendingWebhookRecords();

    const webhook = await forwardRecord(record);
    let retriesRemaining = null;
    let pendingCount = 0;

    if (WEBHOOK_URL && !webhook.ok) {
      await queuePendingWebhookRecord(record);
      retriesRemaining = WEBHOOK_MAX_ATTEMPTS - 1;
      pendingCount = (await readPendingWebhookRecords()).length;
    }

    sendJson(res, 200, {
      ok: true,
      id: record.id,
      stored: true,
      webhook: {
        ...webhook,
        retriesRemaining,
        pendingCount,
      },
      webhookDrain,
    });
  } catch (error) {
    const statusCode = Number(error.statusCode) || 400;
    sendJson(res, statusCode, {
      ok: false,
      error: statusCode >= 500 ? 'Server error' : error.message,
    });
  }
}
