import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { getPricingGuideSummary } from '../services/pricingData';

const WORKFLOW_AUDIT = getPricingGuideSummary().workflowAudit;

const FIT_SIGNALS = [
  'A process depends on manual re-entry, spreadsheet stitching, or brittle portal work.',
  'The team knows it needs software, but not whether the right move is AI automation, web, mobile, or all three.',
  'Leads, approvals, orders, or support requests are delayed because no one owns the workflow end to end.',
  'A founder or operator is still acting as the system glue between tools, teams, and customers.',
];

const FIVE_DAY_FLOW = [
  {
    title: 'Current-state walkthrough',
    text: 'We review the live workflow, stakeholders, tools, handoffs, and the commercial cost of delay or rework.',
  },
  {
    title: 'Risk and opportunity map',
    text: 'We identify where automation is worth it, where interface work is required, and what should not be built yet.',
  },
  {
    title: 'Implementation blueprint',
    text: 'You receive the recommended path, price anchors, scope drivers, and the fastest credible way to move next.',
  },
];

export default function WorkflowAudit() {
  return (
    <>
      <section className="page-hero ai-audit-hero">
        <div className="container page-hero-content ai-audit-hero-content">
          <div className="eyebrow">01 · ENTRY</div>
          <h1>
            <em className="verb">audit</em>&nbsp;the workflow before the build.
          </h1>
          <p>
            This is the first engagement we want most teams to buy. It gives you a clear operating map,
            a scoped implementation path, and a commercial decision based on what is actually broken.
          </p>
          <div className="page-hero-meta" aria-label="Workflow audit details">
            <span className="page-hero-chip">Fixed fee {WORKFLOW_AUDIT.price}</span>
            <span className="page-hero-chip">Delivered in 5 business days</span>
            <span className="page-hero-chip">Full fee credited toward implementation</span>
          </div>
        </div>
      </section>

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
              subtitle="We keep the audit short, structured, and commercial. The goal is clarity, not theater."
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

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Book the first session</p>
            <div className="eyebrow">04 · FIRST STEP</div>
            <h2>Use the audit when you want the right answer before the expensive answer.</h2>
            <p>
              If you already know the implementation lane, you can still use the instant quote tool. If you do not, the audit saves time, money, and avoidable rework.
            </p>
            <div className="cta-actions">
              <Link to="/book-discovery-call" className="btn btn-primary btn-lg">
                Book Audit Session
              </Link>
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
