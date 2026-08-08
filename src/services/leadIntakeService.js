import { trackEvent } from './analyticsService';

const LEAD_INTAKE_ENDPOINT = (import.meta.env.VITE_LEAD_INTAKE_ENDPOINT || '/api/leads').trim();
const LEAD_INTAKE_API_KEY = (import.meta.env.VITE_LEAD_INTAKE_API_KEY || '').trim();
const LEAD_INTAKE_TIMEOUT_MS = Number(import.meta.env.VITE_LEAD_INTAKE_TIMEOUT_MS || 9000);
const FALLBACK_STORAGE_KEY = 'novatech-lead-intake:fallback';
const FLUSH_SESSION_KEY = 'novatech-lead-intake:flush-session-count';
const MAX_FLUSH_PER_SESSION = 20;

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

function getSessionStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage;
}

function safeParseRecords(rawValue) {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readFallbackRecords() {
  const storage = getLocalStorage();
  if (!storage) {
    return [];
  }

  return safeParseRecords(storage.getItem(FALLBACK_STORAGE_KEY));
}

function writeFallbackRecords(records) {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  if (!records.length) {
    storage.removeItem(FALLBACK_STORAGE_KEY);
    return;
  }

  storage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records.slice(0, 120)));
}

function readSessionFlushCount() {
  const storage = getSessionStorage();
  if (!storage) {
    return 0;
  }

  const raw = Number(storage.getItem(FLUSH_SESSION_KEY));
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
}

function writeSessionFlushCount(count) {
  const storage = getSessionStorage();
  if (storage) {
    storage.setItem(FLUSH_SESSION_KEY, String(count));
  }
}

export function getFallbackQueueStats() {
  const records = readFallbackRecords();

  if (!records.length) {
    return { count: 0, oldestAt: null, newestAt: null };
  }

  const timestamps = records
    .map((record) => (record.createdAt ? new Date(record.createdAt).getTime() : null))
    .filter((value) => Number.isFinite(value));

  return {
    count: records.length,
    oldestAt: timestamps.length ? new Date(Math.min(...timestamps)).toISOString() : null,
    newestAt: timestamps.length ? new Date(Math.max(...timestamps)).toISOString() : null,
  };
}

export async function flushFallbackQueue() {
  const records = readFallbackRecords();

  if (!records.length) {
    return { attempted: 0, flushed: 0, failed: 0, remaining: 0 };
  }

  const sessionBudget = Math.max(0, MAX_FLUSH_PER_SESSION - readSessionFlushCount());

  if (sessionBudget <= 0) {
    return { attempted: 0, flushed: 0, failed: 0, remaining: records.length };
  }

  // Oldest-first: records are unshifted on write, so the oldest live at the end.
  const batch = records.slice(-sessionBudget);
  const kept = records.slice(0, Math.max(0, records.length - batch.length));

  let flushed = 0;
  const failed = [];

  for (const record of batch) {
    try {
      const response = await fetch(LEAD_INTAKE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(LEAD_INTAKE_API_KEY ? { 'X-Api-Key': LEAD_INTAKE_API_KEY } : {}),
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        failed.push(record);
        continue;
      }

      flushed += 1;
    } catch {
      failed.push(record);
    }
  }

  writeFallbackRecords([...kept, ...failed]);
  writeSessionFlushCount(readSessionFlushCount() + flushed + failed.length);

  const remaining = readFallbackRecords().length;

  trackEvent('lead_intake_fallback_flush', {
    attempted: batch.length,
    flushed,
    failed: failed.length,
    remaining,
  });

  return { attempted: batch.length, flushed, failed: failed.length, remaining };
}

function normalizeLead(lead = {}) {
  return {
    name: normalizeValue(lead.name),
    email: normalizeValue(lead.email).toLowerCase(),
    company: normalizeValue(lead.company),
    phone: normalizeValue(lead.phone),
    message: normalizeValue(lead.message),
  };
}

function persistFallbackRecord(record) {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  const records = safeParseRecords(storage.getItem(FALLBACK_STORAGE_KEY));
  records.unshift(record);
  storage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records.slice(0, 120)));
  return record;
}

export function isValidLeadEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeValue(email).toLowerCase());
}

export async function submitLeadIntake({
  type = 'general_inquiry',
  source = 'website',
  channel = 'website',
  routePath = '/',
  lead = {},
  context = {},
  consent = {},
} = {}) {
  const normalizedLead = normalizeLead(lead);

  if (!isValidLeadEmail(normalizedLead.email)) {
    return {
      ok: false,
      type: 'validation',
      payload: { lead: normalizedLead },
    };
  }

  const payload = {
    type: normalizeValue(type) || 'general_inquiry',
    source: normalizeValue(source) || 'website',
    channel: normalizeValue(channel) || 'website',
    routePath: normalizeValue(routePath) || '/',
    lead: normalizedLead,
    context,
    consent,
  };

  const fallbackRecord = (errorType = 'request-failed') => persistFallbackRecord({
    ...payload,
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: 'pending_sync',
    errorType,
  });

  if (!LEAD_INTAKE_ENDPOINT) {
    const fallback = fallbackRecord('unconfigured');
    return {
      ok: Boolean(fallback),
      type: fallback ? 'local-fallback' : 'unavailable',
      payload,
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), LEAD_INTAKE_TIMEOUT_MS);

  try {
    const response = await fetch(LEAD_INTAKE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(LEAD_INTAKE_API_KEY ? { 'X-Api-Key': LEAD_INTAKE_API_KEY } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Lead intake request failed with ${response.status}`);
    }

    return {
      ok: true,
      type: 'api',
      payload,
    };
  } catch (error) {
    const errorType = error.name === 'AbortError' ? 'timeout' : 'request-failed';
    const fallback = fallbackRecord(errorType);

    return {
      ok: Boolean(fallback),
      type: fallback ? 'local-fallback' : errorType,
      payload,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
