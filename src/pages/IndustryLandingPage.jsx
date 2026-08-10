import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { industryLandingContent } from '../config/contentData';

function toTitleCase(value) {
  return value
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export default function IndustryLandingPage() {
  const { industrySlug = '' } = useParams();
  const content = industryLandingContent[industrySlug];

  if (!content) {
    return (
      <section className="section">
        <div className="container industry-not-found glass-card">
          <h1>{toTitleCase(industrySlug)} industry page is not available yet</h1>
          <p>We are still building this sector note. Explore the main services in the meantime.</p>
          <Link className="btn btn-primary" to="/services">Explore Services</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="eyebrow">01 · INDUSTRY</div>
          <h1>{content.title}</h1>
          <p>{content.hero}</p>
          <div className="page-hero-meta" aria-label="Industry playbook details">
            <span className="page-hero-chip">Sector-specific workflow notes</span>
            <span className="page-hero-chip">Audit-first commercial path</span>
            <span className="page-hero-chip">Live ETB pricing sits on the pricing page</span>
          </div>
        </div>
      </section>

      <section className="section band-dark band-1">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · SECTOR VIEW"
              title="What usually breaks first in this sector"
              subtitle={content.scope}
            />
          </ScrollReveal>

          <div className="industry-grid">
            <article className="industry-card glass-card">
              <h3>Common pain points</h3>
              <ul>
                {content.pains.map((pain) => (
                  <li key={pain}>{pain}</li>
                ))}
              </ul>
            </article>

            <article className="industry-card glass-card">
              <h3>What the audit usually clarifies</h3>
              <ul>
                {content.solutions.map((solution) => (
                  <li key={solution}>{solution}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="industry-actions">
            <Link className="btn btn-primary" to="/workflow-audit">Book Workflow Audit</Link>
            <Link className="btn btn-secondary" to="/pricing">Review Pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
