import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';

/**
 * Shared pre-footer near-black CTA band (band-2, B27): rendered as the final
 * call-to-action band before the footer on pages that lack a dedicated one
 * (Pricing, WorkflowAudit, InstantQuote, DiscoveryCall, IndustryLanding,
 * NotFound). Exactly three destinations — Instant Quote, Discovery Call, and
 * Pricing — so every visitor reaches the core conversion paths in one click.
 *
 * Copy surface (TECH-15, arbitration 2): only `band.cta.title` +
 * `band.cta.subtitle` are new locked keys; button labels reuse existing
 * `actions.*` strings (nav label keys belong to TECH-19 and are untouched).
 */
export default function BandCta() {
  const { t } = useLanguage();

  return (
    <section className="band-cta band-dark band-2" aria-labelledby="band-cta-title">
      <div className="container">
        <div className="cta-inner">
          <h2 id="band-cta-title">{t('band.audit.title', 'Tell us what you want to build.')}</h2>
          <p>{t('band.audit.subtitle', 'Start a project with scope and budget context — we respond within 1 business day.')}</p>
          <div className="cta-actions">
            {/* A8 (TECH-46): BandCta primary → Start a Project → Home intake form. */}
            <Link to="/#project-intake" className="btn btn-primary btn-lg">
              {t('actions.startProject', 'Start a Project')}
            </Link>
            <Link to="/instant-quote" className="btn btn-secondary btn-lg">
              {t('actions.startQuote')}
            </Link>
            <Link to="/pricing" className="btn btn-secondary btn-lg">
              {t('footer.links.pricing', 'Pricing')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
