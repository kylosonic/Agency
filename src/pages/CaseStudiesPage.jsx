import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { caseStudies } from '../config/contentData';

export default function CaseStudiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>Case Studies</h1>
          <p>Real delivery stories with measurable before and after outcomes across priority industries.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Client Outcomes"
              title="Measured Impact"
              subtitle="Each case study captures business context, implementation path, and quantifiable results."
            />
          </ScrollReveal>

          <div className="case-study-list">
            {caseStudies.map((study) => (
              <article key={study.slug} id={study.slug} className="case-study-card glass-card">
                <header className="case-study-header">
                  <div>
                    <p className="case-study-industry">{study.industry}</p>
                    <h3>{study.title}</h3>
                    <p>{study.summary}</p>
                  </div>
                  <div className="case-study-timeline">Delivery: {study.timeline}</div>
                </header>

                <div className="case-study-grid">
                  <div>
                    <h4>Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  <div>
                    <h4>Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                  <div>
                    <h4>Stack</h4>
                    <ul className="case-study-stack">
                      {study.stack.map((stackItem) => (
                        <li key={stackItem}>{stackItem}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="case-study-results">
                  {study.results.map((result) => (
                    <div key={result.label} className="case-study-result-item">
                      <span>{result.label}</span>
                      <strong>{result.before} to {result.after}</strong>
                      <em>{result.delta}</em>
                    </div>
                  ))}
                </div>

                <blockquote>
                  "{study.testimonial}"
                  <cite>{study.contact}</cite>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
