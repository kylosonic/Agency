// THROWAWAY Phase-5 handler harness server — NOT committed, NOT production.
// Serves the built SPA (dist/) AND binds api/leads.js + api/mailing-list.js on
// the same origin so the frontend's default /api/* endpoints resolve locally.
// Also hosts a capture-only webhook receiver at /__webhook__.
import { createServer } from 'node:http';
import { readFile, appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.HARNESS_PORT || 8787);
const DIST = path.resolve(__dirname, '../../dist');
const LOG_DIR = process.env.HARNESS_LOG_DIR || path.resolve(__dirname, '.harness-runtime');
const WEBHOOK_URL = process.env.HARNESS_WEBHOOK_URL === undefined
  ? `http://127.0.0.1:${PORT}/__webhook__`
  : process.env.HARNESS_WEBHOOK_URL;
const STORAGE_DIR = process.env.HARNESS_STORAGE_DIR || path.join(LOG_DIR, 'storage');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

process.env.LEAD_INTAKE_STORAGE_PATH = path.join(STORAGE_DIR, 'leads.jsonl');
process.env.LEAD_INTAKE_WEBHOOK_URL = WEBHOOK_URL;
process.env.LEAD_INTAKE_WEBHOOK_PENDING_PATH = path.join(STORAGE_DIR, 'leads-webhook-pending.jsonl');
process.env.LEAD_INTAKE_ALLOWED_ORIGIN = '*';
process.env.MAILING_LIST_STORAGE_PATH = path.join(STORAGE_DIR, 'mailing-list.jsonl');
process.env.MAILING_LIST_WEBHOOK_URL = WEBHOOK_URL;
process.env.MAILING_LIST_WEBHOOK_PENDING_PATH = path.join(STORAGE_DIR, 'mailing-list-webhook-pending.jsonl');
process.env.MAILING_LIST_ALLOWED_ORIGIN = '*';

// Import the REAL repo handlers after env is configured (env is read at module eval).
const { default: leadsHandler } = await import('../../api/leads.js');
const { default: mailingListHandler } = await import('../../api/mailing-list.js');

async function logLine(line) {
  const stamp = new Date().toISOString();
  console.log(`[${stamp}] ${line}`);
}

async function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  let filePath = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);

  if (!filePath.startsWith(DIST)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  try {
    let content = await readFile(filePath);
    res.setHeader('Content-Type', MIME[path.extname(filePath)] || 'application/octet-stream');
    res.statusCode = 200;
    res.end(content);
  } catch {
    // SPA fallback for client-side routes without a file extension.
    try {
      const indexHtml = await readFile(path.join(DIST, 'index.html'));
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.statusCode = 200;
      res.end(indexHtml);
    } catch {
      res.statusCode = 500;
      res.end('dist/ not found — run npm run build first');
    }
  }
}

async function handleWebhookReceiver(req, res) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
  }
  await mkdir(LOG_DIR, { recursive: true });
  await appendFile(path.join(LOG_DIR, 'webhook-captured.jsonl'), `${raw}\n`, 'utf8');
  await logLine(`WEBHOOK_RECEIVED ${req.url} ${raw.slice(0, 220)}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ received: true }));
}

const server = createServer(async (req, res) => {
  const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const startedAt = Date.now();

  try {
    if (urlPath === '/__webhook__') {
      await handleWebhookReceiver(req, res);
      await logLine(`${req.method} ${urlPath} 200 (${Date.now() - startedAt}ms)`);
      return;
    }

    if (urlPath === '/api/leads' || urlPath === '/api/leads/') {
      await leadsHandler(req, res);
      await logLine(`${req.method} ${urlPath} ${res.statusCode} (${Date.now() - startedAt}ms)`);
      return;
    }

    if (urlPath === '/api/mailing-list' || urlPath === '/api/mailing-list/') {
      await mailingListHandler(req, res);
      await logLine(`${req.method} ${urlPath} ${res.statusCode} (${Date.now() - startedAt}ms)`);
      return;
    }

    await serveStatic(req, res);
    await logLine(`${req.method} ${urlPath} ${res.statusCode} (${Date.now() - startedAt}ms)`);
  } catch (error) {
    await logLine(`ERROR ${req.method} ${urlPath} ${error.message}`);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end('Internal harness error');
    }
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[harness] listening on http://127.0.0.1:${PORT}`);
  console.log(`[harness] webhook target: ${WEBHOOK_URL}`);
  console.log(`[harness] storage dir: ${STORAGE_DIR}`);
});
