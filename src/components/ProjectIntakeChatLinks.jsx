import { useMemo, useState } from 'react';
import { QUOTE_BUDGET_BANDS } from '../services/pricingData';
import { buildTelegramDirectLink, buildWhatsAppMessageLink } from '../config/siteConfig';
import { useLanguage } from '../i18n/useLanguage';

/**
 * TECH-46 (NB-46 / A21, R-7 final CTA): compact one-tap chat prefill —
 * scope select + budget band select + optional note → WhatsApp/Telegram via
 * the existing C-4 helpers (buildWhatsAppMessageLink / buildTelegramDirectLink).
 * Message pattern mirrors SupportPathLinks: "I need a [scope] build ·
 * budget: [band] · [note]". Channels come from SITE_CONTACT only; links are
 * presentational anchors (no new analytics events).
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

export default function ProjectIntakeChatLinks() {
  const { t } = useLanguage();
  const [scope, setScope] = useState('web');
  const [budgetBand, setBudgetBand] = useState(QUOTE_BUDGET_BANDS[1]);
  const [note, setNote] = useState('');

  const message = useMemo(() => buildMessage(scope, budgetBand, note), [scope, budgetBand, note]);
  const whatsappHref = buildWhatsAppMessageLink(message);
  const telegramHref = buildTelegramDirectLink(message);

  return (
    <div className="intake-chat-links">
      <div className="quote-two-column">
        <label>
          {t('home.intake.chat.scope', 'Scope')}
          <select value={scope} onChange={(event) => setScope(event.target.value)}>
            {SCOPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          {t('home.intake.chat.budget', 'Budget band')}
          <select value={budgetBand} onChange={(event) => setBudgetBand(event.target.value)}>
            {QUOTE_BUDGET_BANDS.map((band) => (
              <option key={band} value={band}>{band}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        {t('home.intake.chat.note', 'Note (optional)')}
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t('home.intake.chat.notePlaceholder', 'What is the problem or idea?')}
          rows={2}
        />
      </label>

      <div className="cta-actions">
        <a href={whatsappHref} className="btn btn-secondary" target="_blank" rel="noreferrer">
          {t('channels.whatsapp', 'WhatsApp')}
        </a>
        <a href={telegramHref} className="btn btn-secondary" target="_blank" rel="noreferrer">
          {t('channels.telegram', 'Telegram')}
        </a>
      </div>
    </div>
  );
}
