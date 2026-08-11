import { Link } from 'react-router-dom';
import IconGlyph from '../components/IconGlyph';
import { useLanguage } from '../i18n/useLanguage';
import BandCta from '../components/BandCta';

/**
 * 404 page — B27 documented exception (TECH-15): band-1 is intentionally
 * absent on the error page (there is no services index / content block to
 * follow); only the shared band-2 pre-footer BandCta renders. The E2E
 * exactly-two-bands invariant (N2) covers live routes only, which never
 * include a 404 page.
 */
export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="section not-found-section">
      <div className="container">
        <div className="not-found-card glass-card">
          <span className="not-found-status" aria-hidden="true">404</span>
          <span className="not-found-icon" aria-hidden="true">
            <IconGlyph name="search" size={28} />
          </span>
          <div className="eyebrow">01 · STATUS</div>
          <h1>{t('notFound.title', 'Page Not Found')}</h1>
          <p>
            {t(
              'notFound.text',
              'The page you are looking for does not exist or has been moved. Use one of the links below to continue.'
            )}
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              {t('notFound.goHome', 'Go to Homepage')}
            </Link>
            <Link to="/web-development" className="btn btn-secondary">
              {t('notFound.exploreServices', 'Explore Services')}
            </Link>
            <Link to="/workflow-audit" className="btn btn-secondary">
              {t('actions.bookWorkflowAudit', 'Book Workflow Audit')}
            </Link>
          </div>
        </div>
      </div>
      </section>

      <BandCta />
    </>
  );
}
