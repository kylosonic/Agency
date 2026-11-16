import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import BrutalPriceBoard from '../components/BrutalPriceBoard';
import {
  getPricingGuideSummary,
  MARKET_SOURCES,
  PRICING_RESEARCH_DATE,
} from '../services/pricingData';

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
  const {
    workflowAudit,
    productEngineeringTiers,
    productEngineering,
    additionalServices,
  } = PRICING_SUMMARY;
  const webTracks = productEngineering.filter((item) => item.category === 'Web Development');
  const mobileTracks = productEngineering.filter((item) => item.category === 'Mobile Apps');
  const saasTracks = productEngineering.filter((item) => item.category === 'Management SaaS');

  // Shared support terms render once instead of repeating in every build card.
  const COMMON_SUPPORT_TERMS = ['Hosting and infrastructure management', 'Monitoring and alerting'];
  const tierSupportIncludes = (tier) => tier.supportIncludes.filter((item) => !COMMON_SUPPORT_TERMS.includes(item));

  return (
    <>
      <section className="page-hero ai-pricing-hero">
        <div className="container marquee-hero-grid">
          <div className="page-hero-content ai-pricing-hero-content">
            <HeroChoreo>
              <div className="eyebrow">01 · RATES</div>
              <HeroChoreoHeadline>
                <em className="verb">read</em>&nbsp;the live pricing and engagement model.
              </HeroChoreoHeadline>
              <p>
                Every price below is for software development and engineering support.
              </p>
              <div className="page-hero-meta" aria-label="Pricing model notes">
                <span className="page-hero-chip">Software Blueprint: {workflowAudit.price} fixed</span>
                <span className="page-hero-chip">ETB only</span>
                <span className="page-hero-chip">International engagements quoted individually</span>
                <span className="page-hero-chip">SaaS: live monthly pricing</span>
              </div>
              <div className="hero-actions pricing-hero-actions">
                <Link className="btn btn-primary btn-lg" to="/#project-intake">
                  Start a Project
                </Link>
                <Link className="btn btn-secondary btn-lg" to="/book-discovery-call">
                  Discuss Your Software Idea
                </Link>
                <Link className="btn btn-dark btn-sm" to="/services">
                  Review Software Services
                </Link>
              </div>
            </HeroChoreo>
          </div>
          <div className="marquee-hero-side">
            <BrutalPriceBoard
              title="The starting rates"
              rows={[
                { label: 'Software blueprint', price: workflowAudit.price },
                { label: 'Business website', price: 'from 30,000 ETB' },
                { label: 'Mobile product', price: 'from 60,000 ETB' },
                { label: 'SaaS product build', price: 'from 180,000 ETB' },
              ]}
              ctaLabel="Jump to market sources"
              ctaTo="/pricing#pricing-evidence"
              note="Reviewed against current Ethiopian market evidence on 2026-11-16."
            />
          </div>
        </div>
      </section>

      <section className="section" id="software-blueprint-pricing">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel">
              <div className="eyebrow">02 · BLUEPRINT</div>
              <h2>{workflowAudit.title}</h2>
              <div className="receipt" aria-label="Software Blueprint rate">
                <div className="receipt-row">
                  <span className="receipt-row__label">Blueprint · {workflowAudit.price} · Fixed</span>
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
              <h3>The blueprint keeps the build honest.</h3>
              <p>
                You get a technical scope the team can implement without guesswork. The fee is credited
                toward the build that follows.
              </p>
              <div className="editorial-note-panel">
                <strong>Timeline:</strong> delivered within 5 business days.
              </div>
              <div className="cta-actions">
                {/* Keep the current software pricing sheet available beside the blueprint. */}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onDownloadClick?.('pricing_page_download_sheet', { variant: 'download_sheet' })}
                >
                  Download Current Pricing Sheet
                </button>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* Fixed product builds lead, followed by larger custom engagements. */}
      <section className="section band-dark band-1" id="product-build-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="03 · BUILDS"
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
              <strong>All product builds include source code and deployment handover.</strong>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="extended-software-pricing">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="04 · EXTENDED BUILDS"
              title="Larger software systems, scoped by complexity."
              subtitle="Custom applications, integrations, and enterprise platforms with published starting anchors."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid receipt-stack">
            {productEngineeringTiers.map((tier) => (
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
                <strong>Every engagement's support includes:</strong> hosting, monitoring, alerting, and
                the response commitment in the selected tier.
              </p>
            </ScrollReveal>
          </div>
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
                    <div className="offer-ladder-stage">Platform support</div>
                    <div className="offer-ladder-main">
                      <p>Hosting, monitoring, maintenance, and response commitments are quoted together.</p>
                    </div>
                    <div className="offer-ladder-price">
                      <strong>15% – 25% of build value</strong>
                      <span>15%–25% of build value for enterprise platforms</span>
                    </div>
                  </article>
                  <article className="offer-ladder-row">
                    <div className="offer-ladder-stage">Web maintenance</div>
                    <div className="offer-ladder-main">
                      <p>Security patches, backups, and content changes under a written commitment.</p>
                    </div>
                    <div className="offer-ladder-price">
                      <strong>18,000 – 60,000 ETB / year</strong>
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

      <section className="section" id="pricing-evidence">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="07 · MARKET BASIS"
              title="The rates are researched in public."
              subtitle={`Anchors reviewed ${PRICING_RESEARCH_DATE} against current Ethiopian website, mobile, hosting, exchange-rate, and software-maintenance references.`}
              align="left"
            />
          </ScrollReveal>

          <div className="market-sources" aria-label="Ethiopian software pricing market sources">
            {MARKET_SOURCES.map((source) => (
              <div key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.name} ↗
                </a>
                <p>{source.evidence}</p>
              </div>
            ))}
            <p className="market-sources__note">
              Published anchors set NovaTech's positioning within these ranges. They are reference
              points, not claims about another firm's final quote, availability, tax treatment, or
              delivery scope.
            </p>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Recommended first move</p>
            <div className="eyebrow">08 · NEXT</div>
            <h2>Clear on scope? Start the project.</h2>
            <p>
              Know the direction? Use instant quote; otherwise start a project and we scope it.
            </p>
            <div className="cta-actions">
              {/* R-6 (TECH-46): Start a Project primary → Home intake form. */}
              <Link to="/#project-intake" className="btn btn-primary btn-lg">
                Start a Project
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
