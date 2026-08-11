import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';

export default function PolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="eyebrow">01 · POLICY</div>
          <h1>
            commercial terms, plainly <em className="verb">stated</em>.
          </h1>
          <p>
            This page exists to remove ambiguity before a project starts: how payment works, when ownership transfers, what is available now, and what is still future-facing.
          </p>
          <div className="page-hero-meta" aria-label="Policy highlights">
            <span className="page-hero-chip">40 / 30 / 30 milestone billing</span>
            <span className="page-hero-chip">Bank transfer only for now</span>
            <span className="page-hero-chip">Client owns custom work after final payment</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel glass-card">
              <SectionHeader
                eyebrow="02 · PAYMENT TERMS"
                title="Custom projects follow milestone billing."
                subtitle="We use visible checkpoints so both sides know what is being approved and what payment unlocks next."
                align="left"
              />

              <div className="milestone-grid">
                <div className="milestone-card">
                  <div className="percentage">40%</div>
                  <div className="description">
                    <strong>Kickoff</strong>
                    <br />
                    Paid when the project is agreed and work begins.
                  </div>
                </div>
                <div className="milestone-card">
                  <div className="percentage">30%</div>
                  <div className="description">
                    <strong>Design or prototype approval</strong>
                    <br />
                    Paid when the direction is approved and full build begins.
                  </div>
                </div>
                <div className="milestone-card">
                  <div className="percentage">30%</div>
                  <div className="description">
                    <strong>Before deployment</strong>
                    <br />
                    Paid before final handover and go-live.
                  </div>
                </div>
              </div>

              <div className="policy-note">
                <span className="icon" aria-hidden="true"><IconGlyph name="check" size={14} /></span>
                <span>
                  <strong>Ownership:</strong> after final payment, the client owns the custom design assets, source code, and intellectual property produced for the project.
                </span>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="editorial-panel glass-card">
              <SectionHeader
                eyebrow="03 · PAYMENT METHODS"
                title="Bank transfer is the only live payment method today."
                subtitle="We would rather state the current truth clearly than imply payment capabilities we do not have yet."
                align="left"
              />

              <div className="services-grid policy-services-grid">
                <div className="service-card">
                  <div className="service-card-icon" aria-hidden="true"><IconGlyph name="card" size={21} /></div>
                  <h3>Bank transfer (CBE Birr)</h3>
                  <p>Payments are currently accepted by direct bank transfer in Ethiopian Birr only.</p>
                </div>
                <div className="service-card">
                  <div className="service-card-icon" aria-hidden="true"><IconGlyph name="phone" size={21} /></div>
                  <h3>Telebirr after licensing</h3>
                  <p>Telebirr merchant payment is planned for after licensing. It is not active today.</p>
                </div>
                <div className="service-card">
                  <div className="service-card-icon" aria-hidden="true"><IconGlyph name="globe" size={21} /></div>
                  <h3>Chapa and cards after licensing</h3>
                  <p>Card and checkout options may be added after licensing. Until then, we do not claim them as live capabilities.</p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section band-dark band-1">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel glass-card">
              <p className="editorial-kicker">SaaS policy</p>
              <div className="eyebrow">04 · SAAS</div>
              <h2>SaaS is waitlist only until a real product exists.</h2>
              <ul className="editorial-checklist compact">
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>No SaaS setup, monthly, or annual pricing is published today.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>No one is billed for a product that is still in development.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>When a product is real, its terms will be published before payment is ever requested.</span>
                </li>
              </ul>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="editorial-panel glass-strong">
              <p className="editorial-kicker">General terms</p>
              <h3>Other things worth saying clearly</h3>
              <ul className="editorial-checklist compact">
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>All published pricing is in Ethiopian Birr.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>International engagements are quoted individually.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>Timelines depend on scope, approvals, and client-side readiness.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>Major scope changes are quoted separately instead of being smuggled into the original agreement.</span>
                </li>
              </ul>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Need clarity before committing?</p>
            <div className="eyebrow">05 · FIRST STEP</div>
            <h2>Book a call and we will walk through the commercial path with you.</h2>
            <p>
              If the real question is still what should be built first, go back one step and use the Workflow Audit as the starting point.
            </p>
            <div className="cta-actions">
              <Link to="/book-discovery-call" className="btn btn-primary btn-lg">
                Book Discovery Call
              </Link>
              <Link to="/workflow-audit" className="btn btn-secondary btn-lg">
                Review Workflow Audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
