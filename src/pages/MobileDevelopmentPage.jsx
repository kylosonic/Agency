import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { getMobilePackages } from '../services/pricingData';

const MOBILE_CONTEXT = [
  {
    title: 'Mobile only makes sense when the work itself is mobile',
    text: 'Field operations, approvals, collections, logistics, and customer action flows are usually the places where a mobile layer actually changes outcomes.',
  },
  {
    title: 'The app is never the whole system',
    text: 'The question is not just which screens to build. It is what data, payment, approval, and reporting logic must sit behind the app to make it reliable.',
  },
  {
    title: 'We scope around operational reality',
    text: 'If a lightweight web layer is enough, we say that. If the team really needs offline behavior, maps, payments, or field workflows, we build for that instead.',
  },
];

export default function MobileDevelopmentPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mobileData = await getMobilePackages();
        setPackages(mobileData);
      } catch (error) {
        console.error('Failed to load mobile pricing data:', error);
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
          <div className="eyebrow">01 · MOBILE</div>
          <h1>
            mobile products for teams that <em className="verb">work</em>&nbsp;in motion.
          </h1>
          <p>
            We build mobile apps for field teams, approvals, customer actions, and operational workflows that need to move beyond desktop or chat-based coordination.
          </p>
          <div className="page-hero-meta" aria-label="Mobile delivery highlights">
            <span className="page-hero-chip">Mobile from 200,000 ETB</span>
            <span className="page-hero-chip">Cross-platform delivery</span>
            <span className="page-hero-chip">Payments, maps, and field operations supported</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container editorial-card-grid">
          {MOBILE_CONTEXT.map((item) => (
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
              eyebrow="02 · PACKAGE ANCHORS"
              title="Two mobile tiers, scoped from the live ETB table."
              subtitle="The difference between them is not decoration. It is the operational depth behind the app: users, payments, maps, admin logic, and integrations."
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
            <p className="editorial-kicker">Before you commit</p>
            <div className="eyebrow">03 · FIRST STEP</div>
            <h2>If the app depends on a messy workflow underneath, start with the audit.</h2>
            <p>
              Mobile builds go better when the process, integrations, and data flow are clear first. That is exactly what the Workflow Audit is for.
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
