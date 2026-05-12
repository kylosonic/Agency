import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';

const AUTOMATION_TIERS = [
  {
    title: 'Tier 1: Foundational Automation (SMBs)',
    setup: '$2,000 - $15,000',
    monthly: '$200 - $1,000',
    includes: [
      'Single-channel customer support chatbots',
      'Intelligent voice agents ("The Night Shift" receptionist)',
      'Automated lead follow-up systems',
    ],
  },
  {
    title: 'Tier 2: Operational Intelligence (Mid-Market)',
    setup: '$20,000 - $80,000',
    monthly: '$2,000 - $8,000',
    includes: [
      'Custom multi-agent systems',
      'Complex CRM and Slack integrations',
      'Customized RFP generation engines',
      'Internal unstructured data pipelines',
    ],
  },
  {
    title: 'Tier 3: Enterprise & Air-Gapped Deployments',
    setup: '$100,000 - $300,000+',
    monthly: '$10,000 - $25,000+',
    includes: [
      '100% private local LLM hardware deployment',
      'Custom compliance guardrails',
      'Multi-department autonomous orchestration',
      'Continuous proprietary model fine-tuning',
    ],
  },
];

const INTERFACE_PRICING = [
  {
    title: 'Small Business Web Presence',
    price: '$1,000 - $5,000',
  },
  {
    title: 'Corporate Website / eCommerce',
    price: '$10,000 - $30,000',
  },
  {
    title: 'Custom SaaS / Web Application',
    price: '$50,000 - $150,000+',
  },
  {
    title: 'Mobile Application (Utility/MVP)',
    price: '$15,000 - $50,000',
  },
  {
    title: 'Mobile Application (Enterprise/Complex)',
    price: '$120,000 - $250,000+',
  },
];

export default function Pricing() {
  const [activeTrack, setActiveTrack] = useState('automation');

  return (
    <>
      <section className="page-hero ai-pricing-hero">
        <div className="container page-hero-content ai-pricing-hero-content">
          <h1>Comprehensive Pricing Guide</h1>
          <p>
            Pricing is structured around operational impact: AI automation systems are scoped by integration depth and autonomy, while interface engineering is scoped as a supporting delivery layer.
          </p>
          <div className="page-hero-meta" aria-label="Pricing model notes">
            <span className="page-hero-chip">Setup + monthly retainers</span>
            <span className="page-hero-chip">Scope tied to integration depth</span>
            <span className="page-hero-chip">Audit-first engagement model</span>
          </div>
        </div>
      </section>

      <section className="section ai-pricing-section" id="pricing-models">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Pricing Structure"
              title="AI Automation Services vs. Interface Development"
              subtitle="Use the toggle to inspect pricing by delivery track."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="ai-pricing-toggle" role="tablist" aria-label="Pricing category selector">
              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === 'automation'}
                aria-controls="automation-pricing-panel"
                id="automation-pricing-tab"
                className={activeTrack === 'automation' ? 'active' : ''}
                onClick={() => setActiveTrack('automation')}
              >
                AI Automation Services
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === 'interface'}
                aria-controls="interface-pricing-panel"
                id="interface-pricing-tab"
                className={activeTrack === 'interface' ? 'active' : ''}
                onClick={() => setActiveTrack('interface')}
              >
                Interface Development (Web/Mobile)
              </button>
            </div>
          </ScrollReveal>

          {activeTrack === 'automation' ? (
            <div
              id="automation-pricing-panel"
              role="tabpanel"
              aria-labelledby="automation-pricing-tab"
              className="ai-pricing-panel"
            >
              <ScrollReveal delay={0.12}>
                <article className="ai-pricing-audit-card glass-strong">
                  <div className="ai-pricing-audit-icon" aria-hidden="true">
                    <IconGlyph name="search" size={20} />
                  </div>
                  <div>
                    <p className="ai-pricing-audit-kicker">The Workflow Audit (Entry Point)</p>
                    <h3>$2,500 - $10,000 Flat Fee</h3>
                    <p>
                      Includes a deep-dive operational discovery, workflow mapping, concrete ROI estimates, and a complete implementation blueprint.
                    </p>
                  </div>
                </article>
              </ScrollReveal>

              <div className="ai-pricing-tier-grid">
                {AUTOMATION_TIERS.map((tier) => (
                  <ScrollReveal key={tier.title}>
                    <article className="ai-pricing-tier-card glass-card">
                      <h3>{tier.title}</h3>
                      <div className="ai-pricing-values">
                        <p>
                          <span>Setup</span>
                          <strong>{tier.setup}</strong>
                        </p>
                        <p>
                          <span>Monthly Retainer</span>
                          <strong>{tier.monthly}</strong>
                        </p>
                      </div>
                      <ul>
                        {tier.includes.map((feature) => (
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
            </div>
          ) : (
            <div
              id="interface-pricing-panel"
              role="tabpanel"
              aria-labelledby="interface-pricing-tab"
              className="ai-pricing-panel"
            >
              <ScrollReveal delay={0.12}>
                <div className="ai-interface-disclaimer glass-card">
                  Prices reflect standard interface development. Deep AI-integrated applications require custom scoping to account for data pipeline complexity.
                </div>
              </ScrollReveal>

              <div className="ai-interface-pricing-grid">
                {INTERFACE_PRICING.map((item) => (
                  <ScrollReveal key={item.title}>
                    <article className="ai-interface-pricing-card glass-card">
                      <h3>{item.title}</h3>
                      <p>{item.price}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          <ScrollReveal delay={0.16}>
            <div className="ai-pricing-actions">
              <Link to="/workflow-audit" className="btn btn-primary btn-lg">
                Book a Custom Workflow Audit
              </Link>
              <Link to="/services" className="btn btn-secondary btn-lg">
                Compare AI Solutions
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
