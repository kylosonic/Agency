import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { getMobilePackages } from '../services/pricingData';

/* B42a (TECH-25): locked filament-apparatus callouts for the Mobile hero. */
const MOBILE_APPARATUS_CALLOUTS = [
  'MOBILE · FROM 40,000 ETB',
  'MILESTONES · 40/30/30',
  'RESPONSE · 1 BUSINESS DAY',
];

const MOBILE_CONTEXT = [
  {
    title: 'Mobile only makes sense when the work itself is mobile',
    text: 'Field operations, approvals, collections, logistics, and customer action flows are where a mobile layer changes outcomes.',
  },
  {
    title: 'The app is never the whole system',
    text: 'The question is what data, payment, approval, and reporting logic must sit behind the app to make it reliable.',
  },
  {
    title: 'We scope around operational reality',
    text: 'If a lightweight web layer is enough, we say that. If offline behavior or field workflows are needed, we build for that.',
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
        <div className="container marquee-hero-grid">
          <div className="page-hero-content">
            {/* M-1 (TECH-33): one choreographed reveal — eyebrow → headline →
                subcopy → meta chips, 150ms apart, ≤ 1.2s total. */}
            <HeroChoreo>
              <div className="eyebrow">01 · MOBILE</div>
              <HeroChoreoHeadline>
                mobile products for teams that <em className="verb">work</em>&nbsp;in motion.
              </HeroChoreoHeadline>
              <p>
                Mobile apps for field teams, approvals, and customer actions that need to move beyond
                desktop or chat-based coordination.
              </p>
              <div className="page-hero-meta" aria-label="Mobile delivery highlights">
                <span className="page-hero-chip">Mobile from 40,000 ETB</span>
                <span className="page-hero-chip">Cross-platform delivery</span>
                <span className="page-hero-chip">Payments, maps, and field operations supported</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="filament"
              callouts={MOBILE_APPARATUS_CALLOUTS}
              label="Filament apparatus: mobile from 40,000 ETB, milestones 40/30/30, response within 1 business day"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="MOBILE · FROM 40,000 ETB" labelRight="MILESTONES · 40/30/30" />

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
              title="Three mobile tiers, scoped from the live ETB table."
              subtitle="The difference is operational depth: users, payments, maps, admin logic, and integrations."
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
            <h2>Tell us what the app needs to do — we scope it from the live table.</h2>
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
