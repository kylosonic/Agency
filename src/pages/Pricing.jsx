import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import PricingScenarioPlanner from '../components/PricingScenarioPlanner';
import { getPricingGuideSummary } from '../services/pricingData';

const PRICING_SUMMARY = getPricingGuideSummary();

function PriceValues({ values }) {
  return (
    <div className="ai-pricing-values ai-pricing-dual-values">
      {values.map((item) => (
        <p key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </p>
      ))}
    </div>
  );
}

function FeatureList({ items }) {
  return (
    <ul>
      {items.map((feature) => (
        <li key={feature}>
          <IconGlyph name="check" size={14} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const [activeTrack, setActiveTrack] = useState('automation');
  const {
    geographicPolicy,
    workflowAudit,
    automationTiers,
    productEngineering,
    additionalServices,
  } = PRICING_SUMMARY;

  const aiSupportIncludes = automationTiers[0]?.supportIncludes || [];

  return (
    <>
      <section className="page-hero ai-pricing-hero">
        <div className="container page-hero-content ai-pricing-hero-content">
          <h1>Comprehensive Pricing Guide</h1>
          <p>
            Pricing is structured around operational impact: we start with workflow audits, then scope AI automation, web/mobile/SaaS product engineering, and monthly support — all quoted in Ethiopian Birr.
          </p>
          <div className="page-hero-meta" aria-label="Pricing model notes">
            <span className="page-hero-chip">ETB-only pricing</span>
            <span className="page-hero-chip">International engagements quoted individually</span>
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
              title="AI Automation + Product Engineering"
              subtitle="Use the selector to inspect the active 2026 service menu: automation systems, product builds, monthly support, and operational add-ons."
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
                aria-selected={activeTrack === 'product'}
                aria-controls="product-pricing-panel"
                id="product-pricing-tab"
                className={activeTrack === 'product' ? 'active' : ''}
                onClick={() => setActiveTrack('product')}
              >
                Product Engineering (Web/Mobile/SaaS)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === 'support'}
                aria-controls="support-pricing-panel"
                id="support-pricing-tab"
                className={activeTrack === 'support' ? 'active' : ''}
                onClick={() => setActiveTrack('support')}
              >
                Support & Add-ons
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
                    <p className="ai-pricing-audit-kicker">{workflowAudit.kicker}</p>
                    <h3>{workflowAudit.title}</h3>
                    <PriceValues
                      values={[
                        { label: 'Fixed fee', value: workflowAudit.price },
                      ]}
                    />
                    <p>{workflowAudit.description}</p>
                    <FeatureList items={workflowAudit.outputs} />
                  </div>
                </article>
              </ScrollReveal>

              <div className="ai-pricing-tier-grid">
                {automationTiers.map((tier) => (
                  <ScrollReveal key={tier.title}>
                    <article className="ai-pricing-tier-card glass-card">
                      <h3>{tier.title}</h3>
                      <div className="ai-pricing-card-meta">{tier.bestFor} / {tier.timeline}</div>
                      <div className="ai-pricing-card-note">{tier.scope}</div>
                      <PriceValues
                        values={[
                          { label: 'From', value: tier.setupPrice },
                          { label: 'Monthly support', value: tier.monthlySupport },
                        ]}
                      />
                      <h4 className="ai-pricing-subheading">What the setup includes</h4>
                      <FeatureList items={tier.includes} />
                      <h4 className="ai-pricing-subheading">What monthly support includes</h4>
                      <FeatureList items={tier.supportIncludes} />
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ) : activeTrack === 'product' ? (
            <div
              id="product-pricing-panel"
              role="tabpanel"
              aria-labelledby="product-pricing-tab"
              className="ai-pricing-panel"
            >
              <ScrollReveal delay={0.12}>
                <div className="ai-interface-disclaimer glass-card">
                  {geographicPolicy} Final product scope depends on architecture depth, integrations, compliance requirements, and whether AI is layered into the build.
                </div>
              </ScrollReveal>

              <div className="ai-interface-pricing-grid">
                {productEngineering.map((item) => (
                  <ScrollReveal key={item.title}>
                    <article className="ai-interface-pricing-card glass-card">
                      <div className="ai-pricing-card-kicker">{item.category}</div>
                      <h3>{item.title}</h3>
                      <PriceValues
                        values={[
                          { label: 'Price', value: item.price },
                        ]}
                      />
                      <div className="ai-pricing-card-meta">{item.timeline}</div>
                      <div className="ai-pricing-card-note">{item.note}</div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ) : (
            <div
              id="support-pricing-panel"
              role="tabpanel"
              aria-labelledby="support-pricing-tab"
              className="ai-pricing-panel"
            >
              <ScrollReveal delay={0.12}>
                <div className="ai-interface-pricing-grid">
                  <ScrollReveal>
                    <article className="ai-interface-pricing-card glass-card">
                      <div className="ai-pricing-card-kicker">AI Support Retainers</div>
                      <h3>Monthly Support & Maintenance</h3>
                      <PriceValues
                        values={[
                          { label: 'Monthly band', value: '30,000 - 70,000 ETB / month' },
                        ]}
                      />
                      <div className="ai-pricing-card-note">
                        Every AI engagement includes a monthly support retainer. What it covers:
                      </div>
                      <FeatureList items={aiSupportIncludes} />
                    </article>
                  </ScrollReveal>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.14}>
                <h3 className="ai-pricing-subheading">Operational add-ons</h3>
              </ScrollReveal>

              <div className="ai-interface-pricing-grid">
                {additionalServices.map((item) => (
                  <ScrollReveal key={item.service}>
                    <article className="ai-interface-pricing-card glass-card">
                      <div className="ai-pricing-card-kicker">{item.type}</div>
                      <h3>{item.service}</h3>
                      <PriceValues
                        values={[
                          { label: 'Price', value: item.price },
                        ]}
                      />
                      <div className="ai-pricing-card-note">{item.description}</div>
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
