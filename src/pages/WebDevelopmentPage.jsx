import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { getWebPackages } from '../services/pricingData';

const WEB_CONTEXT = [
  {
    title: 'A better site is usually part of a bigger fix',
    text: 'The website often needs to support quoting, intake, content operations, or customer handoff. That is why we still recommend the Workflow Audit when the operational picture is unclear.',
  },
  {
    title: 'The build should serve a real commercial motion',
    text: 'A premium site should help a founder sell, help a team respond faster, or help customers complete the next step without confusion.',
  },
  {
    title: 'We do not pad scope with surface polish alone',
    text: 'If a five-page site solves the need, we say that. If the business really needs a portal, dashboard, or intake system, we scope that instead.',
  },
];

export default function WebDevelopmentPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const webData = await getWebPackages();
        setPackages(webData);
      } catch (error) {
        console.error('Failed to load web pricing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>Web systems that help the business move, not just look presentable.</h1>
          <p>
            We build websites, portals, and dashboard layers when the business needs a clearer commercial path,
            better intake, or a cleaner operating surface around the workflow.
          </p>
          <div className="page-hero-meta" aria-label="Web delivery highlights">
            <span className="page-hero-chip">Web from 45,000 ETB</span>
            <span className="page-hero-chip">Portal and dashboard capable</span>
            <span className="page-hero-chip">Workflow Audit recommended when scope is unclear</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container editorial-card-grid">
          {WEB_CONTEXT.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="editorial-card glass-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section band-dark band-1">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Package anchors"
              title="The web pricing ladder is straightforward."
              subtitle="Choose the size of build that fits the actual business need. If the answer is still fuzzy, go back one step and start with the Workflow Audit."
              align="left"
            />
          </ScrollReveal>

          {loading ? (
            <div className="loading-state">
              <p>Loading packages...</p>
            </div>
          ) : (
            <div className="editorial-card-grid editorial-card-grid-dark">
              {packages.map((pkg) => (
                <ScrollReveal key={pkg.title}>
                  <article className="editorial-card glass-card editorial-track-card">
                    <p className="editorial-price-tag">{pkg.price}</p>
                    <h3>{pkg.title}</h3>
                    <p className="editorial-meta-line">{pkg.timeline}</p>
                    <p>{pkg.idealFor}</p>
                    <ul className="editorial-checklist compact">
                      {pkg.features.map((feature) => (
                        <li key={feature}>
                          <IconGlyph name="check" size={14} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Best next step</p>
            <h2>Book the Workflow Audit if the website is tied to a bigger operational issue.</h2>
            <p>
              If you already know the exact web scope, use the instant quote tool. If the site is part of a larger quoting, intake, or internal workflow problem, the audit is the better starting point.
            </p>
            <div className="cta-actions">
              <Link to="/workflow-audit" className="btn btn-primary btn-lg">
                Book Workflow Audit
              </Link>
              <Link to="/instant-quote" className="btn btn-secondary btn-lg">
                Start Instant Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
