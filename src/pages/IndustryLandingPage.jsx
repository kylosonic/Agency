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

export default function IndustryLandingPage({ onDownloadClick }) {
  const { industrySlug = '' } = useParams();
  const content = industryLandingContent[industrySlug];

  if (!content) {
    return (
      <section className="section">
        <div className="container industry-not-found glass-card">
          <h1>{toTitleCase(industrySlug)} industry page is not available yet</h1>
          <p>We are still building this industry playbook. Explore the full portfolio in the meantime.</p>
          <Link className="btn btn-primary" to="/portfolio">Go to Portfolio</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>{content.title}</h1>
          <p>{content.hero}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Industry Playbook"
              title="Typical Challenges and Delivery Model"
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
              <h3>Recommended solution stack</h3>
              <ul>
                {content.solutions.map((solution) => (
                  <li key={solution}>{solution}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="industry-actions">
            <button type="button" className="btn btn-primary" onClick={() => onDownloadClick(`industry_${industrySlug}_pricing`)}>
              Download Pricing Guide
            </button>
            <Link className="btn btn-secondary" to="/book-discovery-call">Book Discovery Call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
