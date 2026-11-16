import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import BrutalPriceBoard from '../components/BrutalPriceBoard';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { getWebPackages, QUOTE_ANCHORS } from '../services/pricingData';

const WEB_PRICE_ROWS = [
  { label: 'Launch website', price: `from ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB` },
  { label: 'Growth website', price: '60,000 – 120,000 ETB' },
  { label: 'Custom web platform', price: 'from 150,000 ETB' },
];

const WEB_CONTEXT = [
  {
    title: 'A better site is usually part of a bigger fix',
    text: 'The site often needs to support quoting, intake, content operations, or customer handoff. We define that surrounding software scope before the build.',
  },
  {
    title: 'The build should serve a real commercial motion',
    text: 'A premium site helps a founder sell, a team respond faster, or customers complete the next step.',
  },
  {
    title: 'We do not pad scope with surface polish alone',
    text: 'If five pages solve the need, we say that. If a portal or dashboard is needed, we scope that instead.',
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
        <div className="container marquee-hero-grid">
          <div className="page-hero-content">
            {/* M-1 (TECH-33): one choreographed reveal — eyebrow → headline →
                subcopy → meta chips, 150ms apart, ≤ 1.2s total. */}
            <HeroChoreo>
              <div className="eyebrow">01 · WEB</div>
              <HeroChoreoHeadline>
                web systems that help the business <em className="verb">move</em>,&nbsp;not just look presentable.
              </HeroChoreoHeadline>
              <p>
                Websites, portals, and dashboards when the business needs a clearer commercial path,
                better intake, or a cleaner operating surface.
              </p>
              <div className="page-hero-meta" aria-label="Web delivery highlights">
                <span className="page-hero-chip">Web from {QUOTE_ANCHORS.web[0].toLocaleString()} ETB</span>
                <span className="page-hero-chip">Portal and dashboard capable</span>
                <span className="page-hero-chip">Architecture and integration planning included</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <BrutalPriceBoard
              title="Web build rates"
              rows={WEB_PRICE_ROWS}
              note="Scope, design, development, QA, deployment, and handover are included."
            />
          </div>
        </div>
      </section>

      <MeterStrip
        labelLeft={`WEB · FROM ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB`}
        labelRight="PLATFORMS · FROM 150,000 ETB"
      />

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
              eyebrow="02 · PACKAGE ANCHORS"
              title="The web pricing ladder is straightforward."
              subtitle="Choose the size that fits the business need. Unsure? Start a project and we will scope it."
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
            <div className="eyebrow">03 · FIRST STEP</div>
            <h2>Tell us what you need — we scope it from the live table.</h2>
            <p>
              Start a project for a scoped proposal, or use the instant quote tool for a quick number.
            </p>
            <div className="cta-actions">
              {/* R-6 (TECH-46): Start a Project primary → Home intake form. */}
              <Link to="/#project-intake" className="btn btn-primary btn-lg">
                Start a Project
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-lg">
                Discuss Your Software Idea
              </Link>
              <Link to="/instant-quote" className="btn btn-dark btn-sm">
                Use the Instant Quote Tool
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
