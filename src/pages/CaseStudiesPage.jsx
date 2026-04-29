import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { caseStudies } from '../config/contentData';
import { useLanguage } from '../i18n/useLanguage';

export default function CaseStudiesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>{t('caseStudies.hero.title', 'Case Studies')}</h1>
          <p>{t('caseStudies.hero.subtitle', 'Real delivery stories with measurable before and after outcomes across priority industries.')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('caseStudies.header.tag', 'Client Outcomes')}
              title={t('caseStudies.header.title', 'Measured Impact')}
              subtitle={t('caseStudies.header.subtitle', 'Each case study captures business context, implementation path, and quantifiable results.')}
            />
          </ScrollReveal>

          <div className="case-study-list">
            {caseStudies.map((study) => (
              <article key={study.slug} id={study.slug} className="case-study-card glass-card">
                <header className="case-study-header">
                  <div>
                    <p className="case-study-industry">{t(`caseStudies.items.${study.slug}.industry`, study.industry)}</p>
                    <h3>{t(`caseStudies.items.${study.slug}.title`, study.title)}</h3>
                    <p>{t(`caseStudies.items.${study.slug}.summary`, study.summary)}</p>
                  </div>
                  <div className="case-study-timeline">{t('caseStudies.delivery', 'Delivery')}: {t(`caseStudies.items.${study.slug}.timeline`, study.timeline)}</div>
                </header>

                <div className="case-study-grid">
                  <div>
                    <h4>{t('caseStudies.labels.challenge', 'Challenge')}</h4>
                    <p>{t(`caseStudies.items.${study.slug}.challenge`, study.challenge)}</p>
                  </div>
                  <div>
                    <h4>{t('caseStudies.labels.solution', 'Solution')}</h4>
                    <p>{t(`caseStudies.items.${study.slug}.solution`, study.solution)}</p>
                  </div>
                  <div>
                    <h4>{t('caseStudies.labels.stack', 'Stack')}</h4>
                    <ul className="case-study-stack">
                      {study.stack.map((stackItem) => (
                        <li key={stackItem}>{t(`caseStudies.items.${study.slug}.stack.${stackItem}`, stackItem)}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="case-study-results">
                  {study.results.map((result, resultIndex) => (
                    <div key={result.label} className="case-study-result-item">
                      <span>{t(`caseStudies.items.${study.slug}.results.${resultIndex}.label`, result.label)}</span>
                      <strong>{result.before} {t('common.to', 'to')} {result.after}</strong>
                      <em>{t(`caseStudies.items.${study.slug}.results.${resultIndex}.delta`, result.delta)}</em>
                    </div>
                  ))}
                </div>

                <blockquote>
                  "{t(`caseStudies.items.${study.slug}.testimonial`, study.testimonial)}"
                  <cite>{t(`caseStudies.items.${study.slug}.contact`, study.contact)}</cite>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
