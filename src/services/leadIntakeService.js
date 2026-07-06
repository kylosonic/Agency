const LEAD_INTAKE_ENDPOINT = (import.meta.env.VITE_LEAD_INTAKE_ENDPOINT || '/api/leads').trim();
const LEAD_INTAKE_API_KEY = (import.meta.env.VITE_LEAD_INTAKE_API_KEY || '').trim();
const LEAD_INTAKE_TIMEOUT_MS = Number(import.meta.env.VITE_LEAD_INTAKE_TIMEOUT_MS || 9000);
const FALLBACK_STORAGE_KEY = 'novatech-lead-intake:fallback';

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
