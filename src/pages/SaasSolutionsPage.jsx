import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';

const SAAS_INTEREST_AREAS = [
  {
    title: 'School operations',
    text: 'Interest around admissions, grading, attendance, payments, and parent communication when institutions want one operating system instead of disconnected spreadsheets and chats.',
    icon: 'book',
  },
  {
    title: 'Clinic and hospital operations',
    text: 'Interest around appointments, billing, pharmacy, lab flow, and patient coordination when the process is still stitched together manually.',
    icon: 'hospital',
  },
  {
    title: 'Property and tenant workflows',
    text: 'Interest around lease tracking, rent reminders, maintenance, and owner reporting where operators want one consistent tenant system.',
    icon: 'building',
  },
];

export default function SaasSolutionsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>SaaS is waitlist only right now.</h1>
          <p>
            We are not presenting a live SaaS catalog or charging for products that do not exist yet. If your team wants one of these systems, register interest and we will talk when there is a truthful offer to discuss.
          </p>
          <div className="page-hero-meta" aria-label="SaaS availability notes">
            <span className="page-hero-chip">No published SaaS prices</span>
            <span className="page-hero-chip">No billing until a real product exists</span>
            <span className="page-hero-chip">Register interest honestly</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Where interest exists"
              title="These are the three SaaS areas people ask us about most often."
              subtitle="We list them as areas of demand, not as live subscription products."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid">
            {SAAS_INTEREST_AREAS.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card glass-card">
                  <div className="editorial-card-top">
                    <span className="ai-preview-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={18} />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-dark band-1">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel glass-card">
              <p className="editorial-kicker">What we will not do</p>
              <h2>No placeholder pricing. No fake availability.</h2>
              <ul className="editorial-checklist compact">
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>We do not publish setup, monthly, or annual prices for non-live products.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>We do not market a waitlist like a released product line.</span>
                </li>
                <li>
                  <IconGlyph name="check" size={14} />
                  <span>When a real product exists, pricing and terms will be published plainly.</span>
                </li>
              </ul>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="editorial-panel glass-strong">
              <p className="editorial-kicker">If you want one of these systems now</p>
              <h3>Start with a Workflow Audit or register waitlist interest.</h3>
              <p>
                If what you need is really a custom system today, the Workflow Audit is still the correct first commercial step. If what you want is a future SaaS product, tell us which one and we will keep the conversation honest.
              </p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Choose the honest path</p>
            <h2>Need a system now? Book the audit. Want a future SaaS product? Register interest.</h2>
            <p>
              We would rather under-sell a non-live offer than weaken trust by pretending a waitlist is a finished product.
            </p>
            <div className="cta-actions">
              <Link to="/workflow-audit" className="btn btn-primary btn-lg">
                Book Workflow Audit
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-lg">
                Register Interest
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
