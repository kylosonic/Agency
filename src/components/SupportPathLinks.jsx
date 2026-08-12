import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { QUOTE_BUDGET_BANDS } from '../services/pricingData';
import { buildTelegramDirectLink, buildWhatsAppMessageLink } from '../config/siteConfig';

/**
 * TECH-41 (NB-43 / C-4, A7): supporting paths for visitors not ready to pay on
 * first visit — compact scope select (Web / Mobile / SaaS) + budget band
 * select + optional note, feeding one-tap WhatsApp/Telegram messages:
 * "I need a [web / mobile / SaaS] build · budget: [band] · [optional note]".
 *
 * Channels come from SITE_CONTACT config only (no new integrations); links are
 * presentational anchors built at render from the current select values
 * (no new analytics events). The free Discovery Call stays visible but
 * secondary (C-1). Copy is hardcoded EN matching the audit page pattern;
 * flagged NB-09 in src/i18n/translations.js.
 */
const SCOPE_OPTIONS = [
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'saas', label: 'SaaS' },
];

function buildMessage(scope, budgetBand, note) {
  const scopeLabel = SCOPE_OPTIONS.find((option) => option.value === scope)?.value || 'web';
  const trimmedNote = String(note || '').trim();
  return `I need a ${scopeLabel} build · budget: ${budgetBand} · ${trimmedNote}`;
}

export default function SupportPathLinks() {
  const [scope, setScope] = useState('web');
  const [budgetBand, setBudgetBand] = useState(QUOTE_BUDGET_BANDS[1]);
  const [note, setNote] = useState('');

  const message = useMemo(() => buildMessage(scope, budgetBand, note), [scope, budgetBand, note]);
  const whatsappHref = buildWhatsAppMessageLink(message);
  const telegramHref = buildTelegramDirectLink(message);

  return (
    <div className="editorial-panel glass-card">
      <p className="editorial-kicker">Not ready to book yet?</p>
      <h3>One-tap chat with your scope pre-filled.</h3>
      <p>
        Pick the build scope and budget band; the message opens ready to send.
      </p>

      <div className="quote-two-column">
        <label>
          Scope
          <select value={scope} onChange={(event) => setScope(event.target.value)}>
            {SCOPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          Budget band
          <select value={budgetBand} onChange={(event) => setBudgetBand(event.target.value)}>
            {QUOTE_BUDGET_BANDS.map((band) => (
              <option key={band} value={band}>{band}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Note (optional)
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="What is the bottleneck you want to solve?"
          rows={2}
        />
      </label>

      <div className="cta-actions">
        <a href={whatsappHref} className="btn btn-secondary" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a href={telegramHref} className="btn btn-secondary" target="_blank" rel="noreferrer">
          Telegram
        </a>
        <Link to="/book-discovery-call" className="btn btn-secondary">
          Book a free Discovery Call
        </Link>
      </div>
    </div>
  );
}
