import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import AuditBookingForm from '../components/AuditBookingForm';
import SupportPathLinks from '../components/SupportPathLinks';
import { getPricingGuideSummary } from '../services/pricingData';

const WORKFLOW_AUDIT = getPricingGuideSummary().workflowAudit;

/* B42a (TECH-25): locked indicator-dial callouts for the audit hero. */
const AUDIT_APPARATUS_CALLOUTS = [
  'AUDIT · 15,000 ETB · FIXED',
  'DELIVERY · 5 BUSINESS DAYS',
  'CREDIT · 100% TOWARD BUILD',
];

const FIT_SIGNALS = [
  'A process depends on manual re-entry, spreadsheet stitching, or brittle portal work.',
  'The team needs software but not whether the move is AI, web, mobile, or all three.',
  'Leads, approvals, orders, or support requests are delayed because no one owns the workflow.',
  'A founder or operator is still the system glue between tools, teams, and customers.',
];

const FIVE_DAY_FLOW = [
  {
    title: 'Current-state walkthrough',
    text: 'We review the live workflow, stakeholders, tools, handoffs, and the cost of delay.',
  },
  {
    title: 'Risk and opportunity map',
    // TECH-36 (A10): web/mobile named as first-class surfaces, not a layer of AI.
    text: 'We identify where automation pays, where a web or mobile surface is needed, and what not to build yet.',
  },
  {
    title: 'Implementation blueprint',
    text: 'You receive the recommended path, price anchors, scope drivers, and the fastest next move.',
  },
];

export default function WorkflowAudit() {
  return (
    <>
      <section className="page-hero ai-audit-hero">
        <div className="container marquee-hero-grid">
          <div className="page-hero-content">
            {/* M-1 (TECH-33): one choreographed reveal — eyebrow → headline →
                subcopy → meta chips, 150ms apart, ≤ 1.2s total. */}
            <HeroChoreo>
              <div className="eyebrow">01 · ENTRY</div>
              <HeroChoreoHeadline>
                <em className="verb">audit</em>&nbsp;the workflow before the build.
              </HeroChoreoHeadline>
              <p>
                The first engagement we want most teams to buy: a clear operating map, a scoped
                implementation path, and a decision based on what is actually broken.
              </p>
              <div className="page-hero-meta" aria-label="Workflow audit details">
                <span className="page-hero-chip">Fixed fee {WORKFLOW_AUDIT.price}</span>
                <span className="page-hero-chip">Delivered in 5 business days</span>
                <span className="page-hero-chip">100% credited toward implementation</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="dial"
              callouts={AUDIT_APPARATUS_CALLOUTS}
              label="Indicator dial apparatus: fixed audit, delivery in 5 business days, credit 100% toward build"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="AUDIT · 15,000 ETB · FIXED" labelRight="DELIVERY · 5 BUSINESS DAYS" />

      <section className="section ai-audit-section">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <div className="editorial-panel glass-card">
              <SectionHeader
                eyebrow="02 · RECEIVE"
                title="A real blueprint for the next move."
                subtitle={WORKFLOW_AUDIT.description}
                align="left"
              />

              <ul className="editorial-checklist">
                {WORKFLOW_AUDIT.outputs.map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="editorial-panel glass-strong">
              <p className="editorial-kicker">Best fit when</p>
              <h3>The team knows the pain, but not the right build yet.</h3>
              <ul className="editorial-checklist">
                {FIT_SIGNALS.map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section band-dark band-1" id="audit-timeline">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="03 · TIMELINE"
              title="What happens between kickoff and the blueprint."
              subtitle="Short, structured, and commercial. Clarity, not theater."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-step-grid">
            {FIVE_DAY_FLOW.map((item, index) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-step-card glass-card">
                  <div className="methodology-step-top">
                    <span className="methodology-step-number">0{index + 1}</span>
                    <span className="methodology-step-icon" aria-hidden="true">
                      <IconGlyph name="search" size={18} />
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH-39 (NB-43 / C-2, C-3, A1, A6): the booking section hosts the
          audit form + confirmation, then the supporting paths (C-4). Sits
          BEFORE the closing band so the brass final-CTA band stays the last
          main section (N2). */}
      <section className="section" id="booking">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="04 · BOOK"
              title="Book the audit in one step."
              subtitle="Hold your slot now. Pay by bank transfer after the invoice arrives by email."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-two-column">
            {/* M-2 (TECH-29): the booking form is a form surface — it renders
                stable immediately so submit controls settle before the user
                (or the E2E click) reaches them. */}
            <ScrollReveal static>
              <div className="contact-form-card glass-card">
                <h3>Workflow Audit booking</h3>
                <AuditBookingForm />
              </div>
            </ScrollReveal>

            {/* M-2: the support-path selects are interactive surfaces too. */}
            <ScrollReveal static>
              <SupportPathLinks />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Book the first session</p>
            <div className="eyebrow">05 · FIRST STEP</div>
            <h2>Use the audit when you want the right answer before the expensive answer.</h2>
            <p>
              Know the lane? Use the instant quote tool. Otherwise the audit saves time and rework.
            </p>
            <div className="cta-actions">
              {/* TECH-40 (C-1): primary CTA anchors to the in-page #booking
                  section (was "Book Audit Session" -> /book-discovery-call). */}
              <a href="#booking" className="btn btn-primary btn-lg">
                Book Workflow Audit
              </a>
              <Link to="/pricing" className="btn btn-secondary btn-lg">
                Review Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
