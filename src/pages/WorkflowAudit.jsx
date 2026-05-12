import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';

const AUDIT_OUTPUTS = [
  'Operational map of human handoffs and manual data movement',
  'Automation architecture blueprint with agent responsibilities',
  'Integration plan for Slack, CRM, email, and internal databases',
  'ROI model with estimated hours recovered and cost impact',
];

export default function WorkflowAudit() {
  return (
    <>
      <section className="page-hero ai-audit-hero">
        <div className="container page-hero-content ai-audit-hero-content">
          <h1>Workflow Audit Engagement</h1>
          <p>
            We run a technical discovery sprint to expose where manual labor, fragmented data, and delayed handoffs are costing your team time and margin.
          </p>
          <div className="page-hero-meta" aria-label="Workflow audit details">
            <span className="page-hero-chip">1-2 week audit cycle</span>
            <span className="page-hero-chip">Systems + process mapping</span>
            <span className="page-hero-chip">Implementation blueprint included</span>
          </div>
        </div>
      </section>

      <section className="section ai-audit-section">
        <div className="container ai-audit-grid">
          <ScrollReveal>
            <div className="ai-audit-card glass-card">
              <SectionHeader
                tag="Audit Deliverables"
                title="What You Receive"
                subtitle="Every engagement produces a concrete implementation plan your team can execute immediately."
                align="left"
              />
              <ul className="ai-audit-list">
                {AUDIT_OUTPUTS.map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="ai-audit-card glass-strong">
              <h3>Schedule the Session</h3>
              <p>
                Book a focused session with our engineering team. We will gather your current process stack, then return a prioritized automation plan tied to measurable ROI.
              </p>
              <div className="ai-audit-actions">
                <Link to="/book-discovery-call" className="btn btn-primary btn-lg">
                  Book Audit Session
                </Link>
                <Link to="/pricing" className="btn btn-secondary btn-lg">
                  Review Pricing
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
