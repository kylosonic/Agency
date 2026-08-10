import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
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

  return (
    <>
      <section className="page-hero ai-pricing-hero">
        <div className="container page-hero-content ai-pricing-hero-content">
          <div className="eyebrow">01 · RATES</div>
          <h1>
            <em className="verb">read</em>&nbsp;the live pricing and engagement model.
          </h1>
          <p>
            This page is the current ETB source of truth. The downloadable guide is being refreshed, so use the live pricing here when you need an accurate quote path.
          </p>
          <div className="page-hero-meta" aria-label="Pricing model notes">
            <span className="page-hero-chip">Workflow Audit: 85,000 ETB fixed</span>
            <span className="page-hero-chip">ETB only</span>
            <span className="page-hero-chip">International engagements quoted individually</span>
            <span className="page-hero-chip">SaaS is waitlist only</span>
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
        </div>
      </section>

      <section className="section" id="workflow-audit-pricing">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel glass-strong">
              <div className="eyebrow">02 · AUDIT</div>
              <h2>{workflowAudit.title}</h2>
              <p className="editorial-hero-price">{workflowAudit.price}</p>
              <p>{workflowAudit.description}</p>
              <FeatureList items={workflowAudit.outputs} />
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="editorial-panel glass-card">
              <p className="editorial-kicker">Why it exists</p>
              <h3>The audit keeps scope honest.</h3>
              <p>
                It protects you from buying the wrong build and protects us from pretending that every workflow can be priced from a guess. The audit fee is credited if we continue into implementation.
              </p>
              <div className="editorial-note-panel glass">
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
              title="Implementation pricing is anchored, then scoped honestly."
              subtitle="We publish starting prices, the monthly support band, and the scope drivers that raise the work above the starting point."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid">
            {automationTiers.map((tier) => (
              <ScrollReveal key={tier.title}>
                <article className="editorial-card glass-card pricing-tier-editorial-card">
                  <p className="editorial-price-tag">{tier.setupPrice}</p>
                  <h3>{tier.title}</h3>
                  <p className="editorial-meta-line">{tier.bestFor} / {tier.timeline}</p>
                  <p>{tier.scope}</p>
                  <div className="editorial-note-panel glass">
                    <strong>Monthly support:</strong> {tier.monthlySupport}
                  </div>
                  <h4>Setup includes</h4>
                  <FeatureList items={tier.includes} />
                  <h4>Monthly support includes</h4>
                  <FeatureList items={tier.supportIncludes} />
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-dark band-1" id="product-build-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="04 · BUILDS"
              title="Web and mobile are quoted from fixed ETB anchors."
              subtitle="These are not filler side offers. They are scoped from the same commercial discipline: clear starting prices, clear audience fit, and no fake live SaaS catalog."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid editorial-card-grid-dark">
            {webTracks.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card glass-card editorial-track-card">
                  <p className="editorial-price-tag">{item.price}</p>
                  <h3>{item.title}</h3>
                  <p className="editorial-meta-line">{item.timeline}</p>
                  <p>{item.note}</p>
                </article>
              </ScrollReveal>
            ))}

            {mobileTracks.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card glass-card editorial-track-card">
                  <p className="editorial-price-tag">{item.price}</p>
                  <h3>{item.title}</h3>
                  <p className="editorial-meta-line">{item.timeline}</p>
                  <p>{item.note}</p>
                </article>
              </ScrollReveal>
            ))}

            <ScrollReveal>
              <article className="editorial-card glass-card editorial-track-card">
                <p className="editorial-price-tag">Waitlist only</p>
                <h3>SaaS</h3>
                <p className="editorial-meta-line">No live paid offer</p>
                <p>
                  SaaS is not presented as a live priced product. If you want to register interest, use the waitlist page and we will only publish pricing when a real product exists.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section" id="support-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="05 · SUPPORT"
              title="Recurring support is explicit. Supporting services stay secondary."
              subtitle="No buried marketing retainers, no annual maintenance phrasing where the live policy is monthly, and no dual-currency confusion."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-two-column">
            <ScrollReveal>
              <article className="editorial-panel glass-card">
                <p className="editorial-kicker">Support bands</p>
                <h3>Ongoing support</h3>
                <div className="offer-ladder">
                  <article className="offer-ladder-row glass">
                    <div className="offer-ladder-stage">AI support</div>
                    <div className="offer-ladder-main">
                      <p>Hosting, model usage, monitoring, support hours, and response commitments are quoted together.</p>
                    </div>
                    <div className="offer-ladder-price">
                      <strong>30,000 to 70,000 ETB / month</strong>
                      <span>Quoted after implementation scope is known</span>
                    </div>
                  </article>
                  <article className="offer-ladder-row glass">
                    <div className="offer-ladder-stage">Web maintenance</div>
                    <div className="offer-ladder-main">
                      <p>Security patches, plugin updates, backups, and small content changes under a written support commitment.</p>
                    </div>
                    <div className="offer-ladder-price">
                      <strong>5,000 to 15,000 ETB / month</strong>
                      <span>Monthly only</span>
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

          <ScrollReveal delay={0.12}>
            <div className="editorial-note-panel glass-card">
              <strong>Founding-client note:</strong> implementation projects only may qualify for a 15 to 20 percent founding-client rate in exchange for case-study rights, a testimonial, and referral permission. We keep this note here once instead of repeating it across the whole site.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Recommended first move</p>
            <div className="eyebrow">06 · NEXT</div>
            <h2>If you are still clarifying scope, book the Workflow Audit.</h2>
            <p>
              If you already know the build direction and just need a directional number, use the instant quote tool. Otherwise, let the audit set the commercial path properly.
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
