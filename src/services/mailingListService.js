const MAILING_LIST_ENDPOINT = (import.meta.env.VITE_MAILING_LIST_ENDPOINT || '/api/mailing-list').trim();
const MAILING_LIST_API_KEY = (import.meta.env.VITE_MAILING_LIST_API_KEY || '').trim();
const MAILING_LIST_TIMEOUT_MS = Number(import.meta.env.VITE_MAILING_LIST_TIMEOUT_MS || 9000);
const FALLBACK_STORAGE_KEY = 'novatech-mailing-list:fallback';

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
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
