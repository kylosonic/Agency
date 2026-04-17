const CONTACT_API_ENDPOINT = (import.meta.env.VITE_CONTACT_API_ENDPOINT || '').trim();
const CONTACT_API_KEY = (import.meta.env.VITE_CONTACT_API_KEY || '').trim();
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_CONTACT_TIMEOUT_MS || 9000);

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeContactPayload(formData) {
  return {
    name: normalizeValue(formData.name),
    email: normalizeValue(formData.email),
    message: normalizeValue(formData.message),
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPayload(payload) {
  return Boolean(payload.name && payload.message && isValidEmail(payload.email));
}

export async function submitContactInquiry(formData) {
  const payload = normalizeContactPayload(formData);

  if (!isValidPayload(payload)) {
    return {
      ok: false,
      type: 'validation-error',
      payload,
    };
  }

  if (!CONTACT_API_ENDPOINT) {
    return {
      ok: false,
      type: 'unconfigured',
      payload,
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (CONTACT_API_KEY) {
      headers['X-Api-Key'] = CONTACT_API_KEY;
    }

    const response = await fetch(CONTACT_API_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        type: 'request-failed',
        status: response.status,
        payload,
      };
    }

    return {
      ok: true,
      type: 'submitted',
      payload,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        ok: false,
        type: 'timeout',
        payload,
      };
    }

    return {
      ok: false,
      type: 'network-error',
      payload,
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
