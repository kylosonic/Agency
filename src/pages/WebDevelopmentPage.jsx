import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { getWebPackages } from '../services/pricingData';

/* B42a (TECH-25): locked filament-apparatus callouts for the Web hero. */
const WEB_APPARATUS_CALLOUTS = [
  'WEB · FROM 20,000 ETB',
  'MILESTONES · 40/30/30',
  'RESPONSE · 1 BUSINESS DAY',
];

const WEB_CONTEXT = [
  {
    title: 'A better site is usually part of a bigger fix',
    text: 'The site often needs to support quoting, intake, content operations, or customer handoff. That is why we recommend the Workflow Audit when the picture is unclear.',
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
                <span className="page-hero-chip">Web from 20,000 ETB</span>
                <span className="page-hero-chip">Portal and dashboard capable</span>
                <span className="page-hero-chip">Workflow Audit recommended when scope is unclear</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="filament"
              callouts={WEB_APPARATUS_CALLOUTS}
              label="Filament apparatus: web from 20,000 ETB, milestones 40/30/30, response within 1 business day"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="WEB · FROM 20,000 ETB" labelRight="MILESTONES · 40/30/30" />

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
              subtitle="Choose the size that fits the business need. Unsure? Start with the Workflow Audit."
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
            <h2>Book the Workflow Audit if the website is tied to a bigger operational issue.</h2>
            <p>
              Know the exact scope? Use the instant quote tool. Part of a bigger workflow? Start with the audit.
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
