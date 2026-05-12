const CONTACT_API_ENDPOINT = (import.meta.env.VITE_CONTACT_API_ENDPOINT || '').trim();
const CONTACT_API_KEY = (import.meta.env.VITE_CONTACT_API_KEY || '').trim();
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_CONTACT_TIMEOUT_MS || 9000);
const DEFAULT_CONTACT_EMAIL = 'nahomgwmichael@gmail.com';
const FALLBACK_CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${DEFAULT_CONTACT_EMAIL}`;

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
  const endpoint = CONTACT_API_ENDPOINT || FALLBACK_CONTACT_ENDPOINT;

  if (!isValidPayload(payload)) {
    return {
      ok: false,
      type: 'validation-error',
      payload,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (CONTACT_API_KEY) {
      headers['X-Api-Key'] = CONTACT_API_KEY;
    }

    const body = {
      ...payload,
      _subject: `New Project Inquiry - ${payload.name || 'Website Visitor'}`,
      _replyto: payload.email,
      _captcha: 'false',
      _source: 'novatech_homepage_contact_form',
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
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
    clearTimeout(timeoutId);
  }
}
