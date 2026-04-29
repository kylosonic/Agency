import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { industryLandingContent } from '../config/contentData';
import { useLanguage } from '../i18n/useLanguage';

function toTitleCase(value) {
  return value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export default function IndustryLandingPage({ onDownloadClick }) {
  const { t } = useLanguage();
  const { industrySlug = '' } = useParams();
  const content = industryLandingContent[industrySlug];

  if (!content) {
    return (
      <section className="section">
        <div className="container industry-not-found glass-card">
          <h1>{t('industry.notFound.title', `${toTitleCase(industrySlug)} industry page is not available yet`)}</h1>
          <p>{t('industry.notFound.subtitle', 'We are still building this industry playbook. Explore the full portfolio in the meantime.')}</p>
          <Link className="btn btn-primary" to="/portfolio">{t('industry.notFound.action', 'Go to Portfolio')}</Link>
        </div>
      </section>
    );
  }

  const title = t(`industry.items.${industrySlug}.title`, content.title);
  const hero = t(`industry.items.${industrySlug}.hero`, content.hero);
  const scope = t(`industry.items.${industrySlug}.scope`, content.scope);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>{title}</h1>
          <p>{hero}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('industry.header.tag', 'Industry Playbook')}
              title={t('industry.header.title', 'Typical Challenges and Delivery Model')}
              subtitle={scope}
            />
          </ScrollReveal>

          <div className="industry-grid">
            <article className="industry-card glass-card">
              <h3>{t('industry.pains.title', 'Common pain points')}</h3>
              <ul>
                {content.pains.map((pain, index) => (
                  <li key={pain}>{t(`industry.items.${industrySlug}.pains.${index}`, pain)}</li>
                ))}
              </ul>
            </article>

            <article className="industry-card glass-card">
              <h3>{t('industry.solutions.title', 'Recommended solution stack')}</h3>
              <ul>
                {content.solutions.map((solution, index) => (
                  <li key={solution}>{t(`industry.items.${industrySlug}.solutions.${index}`, solution)}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="industry-actions">
            <button type="button" className="btn btn-primary" onClick={() => onDownloadClick(`industry_${industrySlug}_pricing`)}>
              {t('actions.downloadPricingGuide', 'Download Pricing Guide')}
            </button>
            <Link className="btn btn-secondary" to="/book-discovery-call">{t('actions.bookDiscoveryCall', 'Book Discovery Call')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
