import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { trackPilotOfferClick } from '../services/analyticsService';

const EXCHANGE_ITEM_KEYS = [
  'pilotOffer.exchangeItems.0',
  'pilotOffer.exchangeItems.1',
  'pilotOffer.exchangeItems.2',
];

/**
 * Founding-client pilot offer (B10): first three implementation clients at
 * 15–20% off, exchanged for case study rights, a testimonial, and referral
 * permission. Copy is fully i18n-driven; the section accepts an analytics
 * `source` so every placement reports where the CTA was clicked.
 */
export default function PilotOfferSection({ source }) {
  const { t } = useLanguage();

  return (
    <section className="section pilot-offer-section" data-testid="pilot-offer">
      <div className="container">
        <div className="pilot-offer-card glass-card">
          <p className="pilot-offer-kicker">{t('pilotOffer.tag')}</p>
          <h2>{t('pilotOffer.title')}</h2>
          <p>{t('pilotOffer.intro')}</p>
          <p className="pilot-offer-discount">{t('pilotOffer.discount')}</p>
          <h3>{t('pilotOffer.exchangeTitle')}</h3>
          <ul className="pilot-offer-list">
            {EXCHANGE_ITEM_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
          <div className="pilot-offer-actions">
            <Link
              className="btn btn-primary btn-lg"
              to="/book-discovery-call"
              onClick={() => trackPilotOfferClick(source)}
            >
              {t('pilotOffer.cta')}
            </Link>
          </div>
          <p className="pilot-offer-fine-print">{t('pilotOffer.finePrint')}</p>
        </div>
      </div>
    </section>
  );
}
