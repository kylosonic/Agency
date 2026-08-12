import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { getSaasPackages } from '../services/pricingData';

/* B42a (TECH-25): locked filament-apparatus callouts for the SaaS hero. */
const SAAS_APPARATUS_CALLOUTS = [
  'SAAS · FROM 3,500 ETB / MO',
  'ANNUAL · SAVE 2 MONTHS',
  'RESPONSE · 1 BUSINESS DAY',
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
            <Apparatus
              type="filament"
              callouts={SAAS_APPARATUS_CALLOUTS}
              label="Filament apparatus: SaaS from 3,500 ETB per month, annual plan saves 2 months, response within 1 business day"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="SAAS · FROM 3,500 ETB / MO" labelRight="ANNUAL · SAVE 2 MONTHS" />

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
              <h3>Start with a Workflow Audit or scope a custom build.</h3>
              <p>
                Fits one of these products? We scope the setup directly. More specific? The Workflow Audit is the right first step.
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
            <h2>Pick a plan or book a call to scope the setup.</h2>
            <p>
              Both pages come from the same ETB table — what you see is what gets quoted.
            </p>
            <div className="cta-actions">
              <Link to="/pricing" className="btn btn-primary btn-lg">
                Review Full Pricing
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-lg">
                Book Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
