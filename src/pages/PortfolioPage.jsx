import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { industryLandingContent, portfolioProjects } from '../config/contentData';
import { useLanguage } from '../i18n/useLanguage';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'education', label: 'Education' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'real-estate', label: 'Real Estate' },
  { key: 'logistics', label: 'Logistics' },
];

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioProjects;
    }

    return portfolioProjects.filter((project) => project.industry === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>{t('portfolio.hero.title', 'Portfolio')}</h1>
          <p>{t('portfolio.hero.subtitle', 'Filter by industry to explore projects and architecture patterns relevant to your business model.')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('portfolio.header.tag', 'Project Library')}
              title={t('portfolio.header.title', 'Filter by Industry')}
              subtitle={t('portfolio.header.subtitle', 'Use industry filters to focus on examples close to your operational context.')}
            />
          </ScrollReveal>

          <div className="portfolio-filter-row" role="tablist" aria-label={t('portfolio.filters.aria', 'Portfolio industry filters')}>
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className={`portfolio-filter ${activeFilter === filter.key ? 'active' : ''}`.trim()}
                onClick={() => setActiveFilter(filter.key)}
              >
                {t(`portfolio.filters.${filter.key}`, filter.label)}
              </button>
            ))}
          </div>

          <div className="portfolio-library-grid">
            {visibleProjects.map((project) => {
              const hasIndustryLanding = Boolean(industryLandingContent[project.industry]);
              const projectLink = hasIndustryLanding ? `/industries/${project.industry}` : project.path;

              return (
                <article key={project.id} className="portfolio-library-card glass-card">
                  <p className="portfolio-library-category">{t(`portfolio.items.${project.id}.category`, project.category)}</p>
                  <h3>{t(`portfolio.items.${project.id}.name`, project.name)}</h3>
                  <p>{t(`portfolio.items.${project.id}.outcome`, project.outcome)}</p>
                  <Link className="btn btn-secondary" to={projectLink}>
                    {hasIndustryLanding
                      ? t('portfolio.actions.viewPlaybook', 'View Industry Playbook')
                      : t('portfolio.actions.viewRelated', 'View Related Work')}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
