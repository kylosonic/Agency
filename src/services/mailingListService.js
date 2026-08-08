import { trackEvent } from './analyticsService';

const MAILING_LIST_ENDPOINT = (import.meta.env.VITE_MAILING_LIST_ENDPOINT || '/api/mailing-list').trim();
const MAILING_LIST_API_KEY = (import.meta.env.VITE_MAILING_LIST_API_KEY || '').trim();
const MAILING_LIST_TIMEOUT_MS = Number(import.meta.env.VITE_MAILING_LIST_TIMEOUT_MS || 9000);
const FALLBACK_STORAGE_KEY = 'novatech-mailing-list:fallback';
const FLUSH_SESSION_KEY = 'novatech-mailing-list:flush-session-count';
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

  storage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records.slice(0, 100)));
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
      const response = await fetch(MAILING_LIST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(MAILING_LIST_API_KEY ? { 'X-Api-Key': MAILING_LIST_API_KEY } : {}),
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

  trackEvent('mailing_list_fallback_flush', {
    attempted: batch.length,
    flushed,
    failed: failed.length,
    remaining,
  });

  return { attempted: batch.length, flushed, failed: failed.length, remaining };
}

export function isValidEmailAddress(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeValue(email).toLowerCase());
}

function persistFallbackRecord(record) {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  const records = safeParseRecords(storage.getItem(FALLBACK_STORAGE_KEY));
  records.unshift(record);
  storage.setItem(FALLBACK_STORAGE_KEY, JSON.stringify(records.slice(0, 100)));
  return record;
}

export async function submitPricingGuideLead({ lead = {}, source = '', variant = 'pricing_guide', routePath = '/' }) {
  const normalizedLead = {
    name: normalizeValue(lead.name),
    email: normalizeValue(lead.email).toLowerCase(),
    company: normalizeValue(lead.company),
  };

  if (!isValidEmailAddress(normalizedLead.email)) {
    return {
      ok: false,
      type: 'validation',
      payload: normalizedLead,
    };
  }

  const payload = {
    listName: 'pricing-guide',
    source: normalizeValue(source) || 'lead_capture_modal',
    variant: normalizeValue(variant) || 'pricing_guide',
    routePath: normalizeValue(routePath) || '/',
    lead: normalizedLead,
  };

  if (!MAILING_LIST_ENDPOINT) {
    const fallback = persistFallbackRecord({
      ...payload,
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      status: 'pending_sync',
    });

    return {
      ok: Boolean(fallback),
      type: fallback ? 'local-fallback' : 'unavailable',
      payload,
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), MAILING_LIST_TIMEOUT_MS);

  try {
    const response = await fetch(MAILING_LIST_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(MAILING_LIST_API_KEY ? { 'X-Api-Key': MAILING_LIST_API_KEY } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Mailing list request failed with ${response.status}`);
    }

    return {
      ok: true,
      type: 'api',
      payload,
    };
  } catch (error) {
    const fallback = persistFallbackRecord({
      ...payload,
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      status: 'pending_sync',
      errorType: error.name === 'AbortError' ? 'timeout' : 'request-failed',
    });

    return {
      ok: Boolean(fallback),
      type: fallback ? 'local-fallback' : error.name === 'AbortError' ? 'timeout' : 'request-failed',
      payload,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
