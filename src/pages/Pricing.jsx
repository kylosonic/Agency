import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { getPricingGuideSummary } from '../services/pricingData';

const PRICING_SUMMARY = getPricingGuideSummary();

function FeatureList({ items }) {
  return (
    <ul className="editorial-checklist">
      {items.map((item) => (
        <li key={item}>
          <IconGlyph name="check" size={14} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing({ onDownloadClick }) {
  const { workflowAudit, automationTiers, productEngineering, additionalServices } = PRICING_SUMMARY;
  const webTracks = productEngineering.filter((item) => item.category === 'Web Development');
  const mobileTracks = productEngineering.filter((item) => item.category === 'Mobile Apps');
  const saasTracks = productEngineering.filter((item) => item.category === 'Management SaaS');

  // C-1 (TECH-32): the three support terms shared by every AI tier render once
  // here instead of repeating inside each tier card (repeat-kill ≤2x/page).
  const COMMON_SUPPORT_TERMS = ['Hosting and infrastructure management', 'Model usage and API costs', 'Monitoring and alerting'];
  const tierSupportIncludes = (tier) => tier.supportIncludes.filter((item) => !COMMON_SUPPORT_TERMS.includes(item));

  return (
    <>
      <section className="page-hero ai-pricing-hero">
        <div className="container page-hero-content ai-pricing-hero-content">
          {/* M-1 (TECH-33): one choreographed reveal — eyebrow → headline →
              subcopy → meta chips → CTA row, 150ms apart, ≤ 1.2s total. */}
          <HeroChoreo>
            <div className="eyebrow">01 · RATES</div>
            <HeroChoreoHeadline>
              <em className="verb">read</em>&nbsp;the live pricing and engagement model.
            </HeroChoreoHeadline>
            <p>
              The same ETB table as the downloadable sheet.
            </p>
            <div className="page-hero-meta" aria-label="Pricing model notes">
              <span className="page-hero-chip">Workflow Audit: 15,000 ETB fixed</span>
              <span className="page-hero-chip">ETB only</span>
              <span className="page-hero-chip">International engagements quoted individually</span>
              <span className="page-hero-chip">SaaS: live monthly pricing</span>
            </div>
            <div className="hero-actions pricing-hero-actions">
              <Link className="btn btn-primary btn-lg" to="/workflow-audit">
                Book Workflow Audit
              </Link>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => onDownloadClick?.('pricing_page_download_sheet', { variant: 'download_sheet' })}
              >
                Download Current Pricing Sheet
              </button>
            </div>
          </HeroChoreo>
        </div>
      </section>

      <section className="section" id="workflow-audit-pricing">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel">
              <div className="eyebrow">02 · AUDIT</div>
              <h2>{workflowAudit.title}</h2>
              {/* B43 (TECH-26): the audit panel is a ruled receipt — label row,
                  description, deliverables as receipt lines (locked pricingData). */}
              <div className="receipt" aria-label="Workflow Audit rate">
                <div className="receipt-row">
                  <span className="receipt-row__label">Audit · {workflowAudit.price} · Fixed</span>
                </div>
                <div className="receipt-row">
                  <p className="receipt-row__content">{workflowAudit.description}</p>
                </div>
                <div className="receipt-row">
                  <span className="receipt-row__label">Deliverables</span>
                  <ul className="receipt-row__list">
                    {workflowAudit.outputs.map((output) => (
                      <li key={output}>{output}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="editorial-panel glass-card">
              <p className="editorial-kicker">Why it exists</p>
              <h3>The audit keeps scope honest.</h3>
              <p>
                You avoid the wrong build, and the fee is 100% credited toward implementation.
              </p>
              <div className="editorial-note-panel">
                <strong>Timeline:</strong> delivered within 5 business days.
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="ai-automation-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="03 · AUTOMATION"
              title="Anchored, then scoped honestly."
              subtitle="Starting prices, support band, and scope drivers."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid receipt-stack">
            {automationTiers.map((tier) => (
              <ScrollReveal key={tier.title}>
                {/* B43 (TECH-26): one ruled receipt row per tier — no card box,
                    no icon top; setup price stays a mono tabular figure. */}
                <article className="editorial-card pricing-tier-editorial-card">
                  <p className="receipt-row__label">Setup</p>
                  <p className="editorial-price-tag">{tier.setupPrice}</p>
                  <h3>{tier.title}</h3>
                  <p className="editorial-meta-line">{tier.bestFor} / {tier.timeline}</p>
                  <p>{tier.scope}</p>
                  <div className="editorial-note-panel">
                    <strong>Support:</strong> {tier.monthlySupport}
                  </div>
                  <h4>Setup includes</h4>
                  <FeatureList items={tier.includes} />
                  <h4>Support includes</h4>
                  <FeatureList items={tierSupportIncludes(tier)} />
                </article>
              </ScrollReveal>
            ))}
            <ScrollReveal>
              <p className="editorial-note-panel">
                <strong>Every tier's support includes:</strong> hosting, model usage and API costs, monitoring
                and alerting.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section band-dark band-1" id="product-build-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="04 · BUILDS"
              title="Web and mobile, from fixed ETB anchors."
              subtitle="Clear starting prices, audience fit, and SaaS terms on one sheet."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid editorial-card-grid-dark receipt-stack">
            {webTracks.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card editorial-track-card pricing-track-card">
                  <p className="editorial-price-tag">{item.price}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="editorial-meta-line">{item.timeline}</p>
                    <p>{item.note}</p>
                    <ul className="editorial-checklist compact">
                      {item.features.map((feature) => (
                        <li key={feature}>
                          <IconGlyph name="check" size={14} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}

            {mobileTracks.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card editorial-track-card pricing-track-card">
                  <p className="editorial-price-tag">{item.price}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="editorial-meta-line">{item.timeline}</p>
                    <p>{item.note}</p>
                    <ul className="editorial-checklist compact">
                      {item.features.map((feature) => (
                        <li key={feature}>
                          <IconGlyph name="check" size={14} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}

            {saasTracks.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card editorial-track-card pricing-track-card">
                  <p className="editorial-price-tag">{item.price}</p>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="editorial-meta-line">
                      Setup {item.setupFee.toLocaleString()} ETB · Annual {item.annual.toLocaleString()} ETB · {item.billingNote}
                    </p>
                    <p>{item.note}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <div className="editorial-note-panel">
              <strong>Web + AI automation booked together: 10% off</strong>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="support-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="05 · SUPPORT"
              title="Recurring support, plainly quoted."
              subtitle="Maintenance is an annual plan with a written commitment."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-two-column">
            <ScrollReveal>
              <article className="editorial-panel glass-card">
                <p className="editorial-kicker">Support bands</p>
                <h3>Ongoing support</h3>
                <div className="offer-ladder">
                  <article className="offer-ladder-row">
                    <div className="offer-ladder-stage">AI support</div>
                    <div className="offer-ladder-main">
                      <p>Hosting, monitoring, and response commitments are quoted together.</p>
                    </div>
                    <div className="offer-ladder-price">
                      <strong>10,000 – 25,000 ETB / month</strong>
                      <span>Quoted after implementation scope is known</span>
                    </div>
                  </article>
                  <article className="offer-ladder-row">
                    <div className="offer-ladder-stage">Web maintenance</div>
                    <div className="offer-ladder-main">
                      <p>Security patches, backups, and content changes under a written commitment.</p>
                    </div>
                    <div className="offer-ladder-price">
                      <strong>8,000 – 20,000 ETB / year</strong>
                      <span>Annual, written commitment</span>
                    </div>
                  </article>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <article className="editorial-panel glass-card">
                <p className="editorial-kicker">Supporting services</p>
                <h3>Additional line items</h3>
                <ul className="editorial-price-list">
                  {additionalServices.map((item) => (
                    <li key={item.service}>
                      <div>
                        <strong>{item.service}</strong>
                        <span>{item.description}</span>
                      </div>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Recommended first move</p>
            <div className="eyebrow">06 · NEXT</div>
            <h2>Clarifying scope? Book the Workflow Audit.</h2>
            <p>
              Know the direction? Use instant quote; otherwise the audit sets the path.
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
