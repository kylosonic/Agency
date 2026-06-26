import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import PricingScenarioPlanner from '../components/PricingScenarioPlanner';

const AUTOMATION_TIERS = [
  {
    title: 'Tier 1: Foundational Automation (SMBs)',
    setup: '$2,000 - $15,000',
    monthly: '$200 - $1,000',
    includes: [
      'Customer support chatbots',
      'Lead routing tools',
      'Basic internal workflow automation',
    ],
  },
  {
    title: 'Tier 2: Operational Intelligence (Mid-Market)',
    setup: '$20,000 - $80,000',
    monthly: '$2,000 - $8,000',
    includes: [
      'Multi-agent systems',
      'Department workflows',
      'CRM integrations and document generation',
    ],
  },
  {
    title: 'Tier 3: Enterprise Agentic Systems',
    setup: '$100,000 - $300,000+',
    monthly: '$10,000 - $25,000+',
    includes: [
      'Fully autonomous systems with private deployment options',
      'Enterprise governance and audit trails',
      'Cross-department orchestration workflows',
      'Advanced analytics and optimization loops',
    ],
  },
];

const INTERFACE_PRICING = [
  {
    title: 'Web Development (Starter)',
    price: '$1,000 - $3,000',
  },
  {
    title: 'Web Development (Growth)',
    price: '$5,000 - $12,000',
  },
  {
    title: 'Web Development (Enterprise)',
    price: '$20,000 - $50,000',
  },
  {
    title: 'Mobile App (Basic Utility)',
    price: '$15,000 - $25,000',
  },
  {
    title: 'Mobile App (Business / E-Commerce)',
    price: '$30,000 - $50,000',
  },
  {
    title: 'Mobile App (Enterprise / FinTech / Custom SaaS)',
    price: '$120,000+',
  },
  {
    title: 'Management SaaS Subscriptions',
    price: '$200 - $1,000/mo',
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
            Pricing is structured around operational impact: we start with AI workflow audits, then scope AI automation and web/mobile/SaaS product engineering as equal delivery tracks.
          </p>
          <div className="page-hero-meta" aria-label="Pricing model notes">
            <span className="page-hero-chip">Setup + monthly retainers</span>
            <span className="page-hero-chip">Scope tied to integration depth</span>
            <span className="page-hero-chip">Product engineering co-equal track</span>
            <span className="page-hero-chip">Audit-first engagement model</span>
          </div>
        </div>
      </section>

      <section className="section ai-pricing-section" id="pricing-models">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Pricing Structure"
              title="AI Automation + Product Engineering"
              subtitle="Use the toggle to inspect both active tracks: automation systems and web/mobile/SaaS product builds."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <PricingScenarioPlanner />
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
                Product Engineering (Web/Mobile/SaaS)
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
                      Includes workflow mapping, bottleneck classification, data-readiness review, integration discovery, and a delivery-ready automation roadmap.
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
                  This product engineering track is co-equal and fully active for standalone and AI-integrated builds. Final scope depends on architecture depth, integrations, and compliance requirements.
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
