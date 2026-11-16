import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import BrutalPriceBoard from '../components/BrutalPriceBoard';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { getSaasPackages } from '../services/pricingData';

const SAAS_PRICE_ROWS = [
  { label: 'Ready-made SaaS', price: 'from 4,500 ETB / mo' },
  { label: 'Implementation', price: '40,000 – 60,000 ETB' },
  { label: 'Custom SaaS build', price: 'from 180,000 ETB' },
];

export default function SaasSolutionsPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const saasData = await getSaasPackages();
        setPackages(saasData);
      } catch (error) {
        console.error('Failed to load SaaS pricing data:', error);
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
              <div className="eyebrow">01 · SAAS</div>
              <HeroChoreoHeadline>
                <em className="verb">run</em>&nbsp;core operations on a live subscription.
              </HeroChoreoHeadline>
              <p>
                School, clinic, and real estate systems with published setup, monthly, and annual pricing.
              </p>
              <div className="page-hero-meta" aria-label="SaaS pricing notes">
                <span className="page-hero-chip">Setup + monthly pricing</span>
                <span className="page-hero-chip">Annual plan saves 2 months</span>
                <span className="page-hero-chip">ETB only</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <BrutalPriceBoard
              title="SaaS rate sheet"
              rows={SAAS_PRICE_ROWS}
              note="Annual plans bill 10 months. Custom builds add product architecture, billing, and multi-tenancy."
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="READY-MADE SAAS · FROM 4,500 ETB / MO" labelRight="CUSTOM SAAS · FROM 180,000 ETB" />

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · PLANS"
              title="Three SaaS systems with live pricing."
              subtitle="One-time setup plus a monthly subscription; annual billing saves 2 months."
              align="left"
            />
          </ScrollReveal>

          {loading ? (
            <div className="loading-state">
              <p>Loading plans...</p>
            </div>
          ) : (
            <div className="editorial-card-grid">
              {packages.map((pkg) => (
                <ScrollReveal key={pkg.title}>
                  <article className="editorial-card glass-card editorial-track-card">
                    <div className="editorial-card-top">
                      <span className="ai-preview-icon" aria-hidden="true">
                        <IconGlyph name={pkg.icon} size={18} />
                      </span>
                      <h3>{pkg.title}</h3>
                    </div>
                    <p className="editorial-price-tag">{pkg.price}</p>
                    <p className="editorial-meta-line">
                      Setup {pkg.setupFee.toLocaleString()} ETB · Annual {pkg.annual.toLocaleString()} ETB · {pkg.billingNote}
                      {pkg.recommended ? ' · Recommended' : ''}
                    </p>
                    <ul className="editorial-checklist compact">
                      {pkg.features.map((feature) => (
                        <li key={feature}>
                          <IconGlyph name="check" size={14} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link className="btn btn-primary" to="/book-discovery-call">
                      {pkg.ctaText}
                    </Link>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section band-dark band-1">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel glass-card">
              <p className="editorial-kicker">How billing works</p>
              <div className="eyebrow">03 · TERMS</div>
              <h2>Published prices. No hidden subscription math.</h2>
              <ul className="editorial-checklist compact">
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>Setup covers configuration, team onboarding, and first-month migration.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>Monthly subscription covers hosting, backups, monitoring, and support.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>Annual billing covers 10 months for the price of 12.</span>
                </li>
              </ul>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="editorial-panel glass-strong">
              <p className="editorial-kicker">If you need a custom system now</p>
              <h3>Start with a scoped software build.</h3>
              <p>
                Fits one of these products? We scope the setup directly. Need something different? We
                scope a custom SaaS build around your product and operating model.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Choose the direct path</p>
            <div className="eyebrow">04 · FIRST STEP</div>
            <h2>Pick a plan or start a project to scope the setup.</h2>
            <p>
              Both pages come from the same ETB table — what you see is what gets quoted.
            </p>
            <div className="cta-actions">
              {/* R-6 (TECH-46): Start a Project primary → Home intake form. */}
              <Link to="/#project-intake" className="btn btn-primary btn-lg">
                Start a Project
              </Link>
              <Link to="/pricing" className="btn btn-secondary btn-lg">
                Review Full Pricing
              </Link>
              <Link to="/book-discovery-call" className="btn btn-dark btn-sm">
                Discuss Your Software Idea
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
