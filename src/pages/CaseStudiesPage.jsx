import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import IconGlyph from '../components/IconGlyph';
import { caseStudies } from '../config/contentData';
import { useLanguage } from '../i18n/useLanguage';

const REVIEW_POINTS = [
  {
    title: 'Baseline Before Build',
    text: 'Every engagement starts by documenting current cycle time, conversion, throughput, or staff load so the result has a measurable reference point.',
    icon: 'target',
  },
  {
    title: 'Implementation Path',
    text: 'Case studies separate the business challenge from the delivery path, including integrations, rollout cadence, and operational constraints.',
    icon: 'settings',
  },
  {
    title: 'Post-Launch Signal',
    text: 'Results highlight what changed after launch, including adoption, process reliability, and the operational metric that mattered most.',
    icon: 'chart',
  },
];

export default function CaseStudiesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero" aria-labelledby="case-studies-hero-title">
        <div className="container page-hero-content">
          <h1 id="case-studies-hero-title">{t('caseStudies.hero.title', 'Case Studies')}</h1>
          <p>{t('caseStudies.hero.subtitle', 'Real delivery stories with measurable before and after outcomes across priority industries.')}</p>
        </div>
      </section>

      <section className="section case-study-method-section" aria-labelledby="case-study-method-title">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Proof Architecture"
              title={<span id="case-study-method-title">How We Read Outcomes</span>}
              subtitle="These stories are structured for fast comparison: baseline, implementation path, stack, and measurable change."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="content-balance-grid">
              {REVIEW_POINTS.map((point) => (
                <article key={point.title} className="content-balance-card glass-card">
                  <span className="content-balance-icon" aria-hidden="true">
                    <IconGlyph name={point.icon} size={18} />
                  </span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section case-study-results-section" aria-labelledby="case-study-results-title">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('caseStudies.header.tag', 'Client Outcomes')}
              title={<span id="case-study-results-title">{t('caseStudies.header.title', 'Measured Impact')}</span>}
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
