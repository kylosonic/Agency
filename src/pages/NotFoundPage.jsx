import { Link } from 'react-router-dom';
import IconGlyph from '../components/IconGlyph';
import { useLanguage } from '../i18n/useLanguage';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="section not-found-section">
      <div className="container">
        <div className="not-found-card glass-card">
          <span className="not-found-status" aria-hidden="true">404</span>
          <span className="not-found-icon" aria-hidden="true">
            <IconGlyph name="search" size={28} />
          </span>
          <h1>{t('notFound.title', 'Page Not Found')}</h1>
          <p>
            {t(
              'notFound.text',
              'The page you are looking for does not exist or has been moved. Let us help you find what you need.'
            )}
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              {t('notFound.goHome', 'Go to Homepage')}
            </Link>
            <Link to="/web-development" className="btn btn-secondary">
              {t('notFound.exploreServices', 'Explore Services')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
