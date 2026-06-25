import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import IconGlyph from '../components/IconGlyph';
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

const ARCHITECTURE_PATTERNS = [
  {
    title: 'Conversion Platforms',
    text: 'Public websites, storefronts, and portals with clear journeys, analytics, SEO foundations, and lead capture built into the architecture.',
    icon: 'globe',
  },
  {
    title: 'Operations Systems',
    text: 'Internal dashboards, approval flows, CRM layers, and mobile tools that reduce manual coordination across teams.',
    icon: 'settings',
  },
  {
    title: 'AI-Enabled Products',
    text: 'Search, automation, and assistant layers added where they make product workflows faster, more inspectable, and easier to scale.',
    icon: 'spark',
  },
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
      <section className="page-hero" aria-labelledby="portfolio-hero-title">
        <div className="container page-hero-content">
          <h1 id="portfolio-hero-title">{t('portfolio.hero.title', 'Portfolio')}</h1>
          <p>{t('portfolio.hero.subtitle', 'Filter by industry to explore projects and architecture patterns relevant to your business model.')}</p>
        </div>
      </section>

      <section className="section portfolio-pattern-section" aria-labelledby="portfolio-pattern-title">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Architecture Patterns"
              title={<span id="portfolio-pattern-title">What We Reuse Across Strong Builds</span>}
              subtitle="Projects vary by industry, but production-ready delivery usually combines one or more of these architecture patterns."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="content-balance-grid">
              {ARCHITECTURE_PATTERNS.map((pattern) => (
                <article key={pattern.title} className="content-balance-card glass-card">
                  <span className="content-balance-icon" aria-hidden="true">
                    <IconGlyph name={pattern.icon} size={18} />
                  </span>
                  <h3>{pattern.title}</h3>
                  <p>{pattern.text}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section portfolio-library-section" aria-labelledby="portfolio-library-title">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('portfolio.header.tag', 'Project Library')}
              title={<span id="portfolio-library-title">{t('portfolio.header.title', 'Filter by Industry')}</span>}
              subtitle={t('portfolio.header.subtitle', 'Use industry filters to focus on examples close to your operational context.')}
            />
          </ScrollReveal>

          <div className="portfolio-filter-row" role="tablist" aria-label={t('portfolio.filters.aria', 'Portfolio industry filters')}>
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.key}
                aria-controls="portfolio-library-grid"
                className={`portfolio-filter ${activeFilter === filter.key ? 'active' : ''}`.trim()}
                onClick={() => setActiveFilter(filter.key)}
              >
                {t(`portfolio.filters.${filter.key}`, filter.label)}
              </button>
            ))}
          </div>

          <div id="portfolio-library-grid" className="portfolio-library-grid" role="tabpanel">
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
