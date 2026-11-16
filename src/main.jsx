import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './brutalist.css'
import App from './App.jsx'

function warnAboutLaunchConfig() {
  if (!import.meta.env.DEV) {
    return;
  }

  const env = import.meta.env;

  const checks = [
    { key: 'VITE_SITE_URL', value: env.VITE_SITE_URL || '', required: true, note: 'canonical origin (OA-2)' },
    { key: 'VITE_CONTACT_EMAIL', value: env.VITE_CONTACT_EMAIL || '', required: true, note: 'domain mailbox (OA-1)' },
    { key: 'VITE_CONTACT_API_ENDPOINT', value: env.VITE_CONTACT_API_ENDPOINT || '', required: false, note: 'homepage form API; else formsubmit-derived or mailto fallback (OA-3)' },
    { key: 'VITE_CONTACT_FORM_SUBMIT_ENDPOINT', value: env.VITE_CONTACT_FORM_SUBMIT_ENDPOINT || '', required: false, note: 'override; derived from VITE_CONTACT_EMAIL (OA-3)' },
    { key: 'VITE_GA4_MEASUREMENT_ID', value: env.VITE_GA4_MEASUREMENT_ID || '', required: true, note: 'GA4 ID or VITE_ANALYTICS_ENDPOINT (OA-4)' },
    { key: 'VITE_ANALYTICS_ENDPOINT', value: env.VITE_ANALYTICS_ENDPOINT || '', required: false, note: 'alternative analytics sink (OA-4)' },
    { key: 'VITE_SITESPEAK_BOT_ID', value: env.VITE_SITESPEAK_BOT_ID || '', required: false, note: 'default resolves; confirm production ID (OA-5)' },
    { key: 'VITE_LEAD_INTAKE_ENDPOINT', value: env.VITE_LEAD_INTAKE_ENDPOINT || '/api/leads', required: true, note: 'server handler; runtime decision (OA-9)' },
    { key: 'VITE_MAILING_LIST_ENDPOINT', value: env.VITE_MAILING_LIST_ENDPOINT || '/api/mailing-list', required: true, note: 'server handler; runtime decision (OA-9)' },
  ];

  const rows = checks.map(({ key, value, required, note }) => ({
    Variable: key,
    Status: value ? 'SET' : required ? 'MISSING — required before launch' : 'unset (optional)',
    Note: note,
  }));

  const missing = rows.filter((row) => row.Status.includes('MISSING'));

  if (missing.length) {
    console.warn(`[launch-config] ${missing.length} launch-critical variable(s) unset. Complete .env (see .env.example) before launch.`);
    console.table(rows);
  }
}

warnAboutLaunchConfig();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
