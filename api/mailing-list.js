import crypto from 'node:crypto';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_STORAGE_PATH = path.join(process.cwd(), 'storage', 'mailing-list.jsonl');
const STORAGE_PATH = process.env.MAILING_LIST_STORAGE_PATH || DEFAULT_STORAGE_PATH;
const WEBHOOK_URL = process.env.MAILING_LIST_WEBHOOK_URL || '';
const LIST_NAME = process.env.MAILING_LIST_NAME || 'nocatechai';
const API_KEY = process.env.MAILING_LIST_API_KEY || '';
const ALLOWED_ORIGIN = process.env.MAILING_LIST_ALLOWED_ORIGIN || '*';
const MAX_BODY_BYTES = 16_384;

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

function normalizeString(value, maxLength = 240) {
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

function buildRecord(payload, req) {
  const lead = payload.lead || {};
  const email = normalizeEmail(lead.email);

  if (!isValidEmail(email)) {
    const error = new Error('A valid email address is required.');
    error.statusCode = 422;
    throw error;
  }

  const createdAt = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    createdAt,
    listName: normalizeString(payload.listName, 80) || LIST_NAME,
    source: normalizeString(payload.source, 160) || 'lead_capture_modal',
    variant: normalizeString(payload.variant, 80) || 'pricing_guide',
    routePath: normalizeString(payload.routePath, 160) || '/',
    lead: {
      name: normalizeString(lead.name, 160),
      email,
      company: normalizeString(lead.company, 180),
    },
    consent: {
      type: 'pricing_guide_download',
      capturedAt: createdAt,
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
  } finally {
    clearTimeout(timeoutId);
  }
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
    const webhook = await forwardRecord(record);

    sendJson(res, 200, {
      ok: true,
      id: record.id,
      listName: record.listName,
      stored: true,
      webhook,
    });
  } catch (error) {
    const statusCode = Number(error.statusCode) || 400;
    sendJson(res, statusCode, {
      ok: false,
      error: statusCode >= 500 ? 'Server error' : error.message,
    });
  }
}
