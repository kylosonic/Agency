import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';

const AUTOMATION_LANES = [
  {
    title: 'Back-office automation',
    text: 'Invoice intake, approvals, reconciliations, portal updates, and internal handoffs where repetitive admin work keeps dragging on margin.',
    examples: ['Invoice and document processing', 'Approval routing', 'Browser portal automation'],
    icon: 'settings',
  },
  {
    title: 'Knowledge and operations systems',
    text: 'Internal assistants, reporting layers, and governed access to process knowledge when the business depends on tribal knowledge and disconnected files.',
    examples: ['Knowledge assistants with citations', 'Operational dashboards', 'Internal search and retrieval'],
    icon: 'book',
  },
  {
    title: 'Customer and revenue workflows',
    text: 'Lead routing, quoting, support triage, order handling, and service delivery flows where response speed directly affects revenue or trust.',
    examples: ['Quote and proposal automation', 'Support triage', 'Sales order execution'],
    icon: 'lightning',
  },
];

const DELIVERY_STEPS = [
  {
    title: 'Audit the current process',
    text: 'We start with the workflow, the people involved, the systems in play, and the commercial cost of delay or rework.',
    icon: 'search',
  },
  {
    title: 'Build the right operating layer',
    text: 'That can mean automation, a web system, a mobile product, or a combination of them. We do not force the same answer onto every team.',
    icon: 'idea',
  },
  {
    title: 'Stabilize and support it',
    text: 'We define what needs monitoring, who owns the workflow, and whether ongoing support belongs in a monthly retainer or not.',
    icon: 'shield',
  },
];

const DELIVERY_TRACKS = [
  {
    title: 'AI automation engagements',
    price: 'from 250,000 ETB',
    text: 'For teams ready to replace repeated manual work with custom agents, integrations, and governed operating logic.',
    to: '/pricing',
  },
  {
    title: 'Web systems',
    price: 'from 45,000 ETB',
    text: 'For commercial sites, portals, dashboards, and quote flows that need to support a real operational process.',
    to: '/web-development',
  },
  {
    title: 'Mobile products',
    price: 'from 200,000 ETB',
    text: 'For field teams, approvals, customer flows, and operations that need a mobile operating layer.',
    to: '/mobile-development',
  },
  {
    title: 'SaaS waitlist',
    price: 'Waitlist only',
    text: 'We are not presenting live SaaS pricing for products that do not exist yet. Interest is collected honestly through a waitlist only.',
    to: '/saas-solutions',
  },
];

export default function Services() {
  return (
    <>
      <section className="page-hero ai-services-hero" aria-labelledby="services-hero-title">
        <div className="container page-hero-content ai-services-hero-content">
          <h1 id="services-hero-title">What we actually build after the Workflow Audit.</h1>
          <p>
            NovaTech is not selling abstract AI transformation. We build specific operating systems for teams that
            need work to move faster, more accurately, and with less dependence on one overloaded person.
          </p>
          <div className="page-hero-meta" aria-label="Service delivery priorities">
            <span className="page-hero-chip">Audit first</span>
            <span className="page-hero-chip">AI automation when it solves a real bottleneck</span>
            <span className="page-hero-chip">Web and mobile when an interface layer is needed</span>
          </div>
        </div>
      </section>

      <section className="section" id="service-lanes">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Core work"
              title="Three kinds of work come up most often."
              subtitle="Not because they are trendy, but because these are the places where time, accuracy, and commercial trust usually break first."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid">
            {AUTOMATION_LANES.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card glass-card service-lane-card">
                  <div className="editorial-card-top">
                    <span className="ai-preview-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={18} />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                  <ul className="editorial-mini-list">
                    {item.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-dark band-1" id="delivery-model">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="How the work moves"
              title="The point is clarity first, implementation second."
              subtitle="We keep the process intentionally narrow so scope, commercial terms, and delivery expectations are explicit before a build starts."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-step-grid">
            {DELIVERY_STEPS.map((item, index) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-step-card glass-card">
                  <div className="methodology-step-top">
                    <span className="methodology-step-number">0{index + 1}</span>
                    <span className="methodology-step-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={18} />
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

      <section className="section" id="delivery-tracks">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Commercial tracks"
              title="The audit tells us which lane the project belongs in."
              subtitle="This is the whole ladder: a paid audit, the right implementation path, then support only where it is actually needed."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid">
            {DELIVERY_TRACKS.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card glass-card editorial-track-card">
                  <p className="editorial-price-tag">{item.price}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link className="editorial-inline-link" to={item.to}>
                    Open this page
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <div className="editorial-note-panel glass-card">
              <strong>What we do not do:</strong> placeholder pilots, invented proof, inflated AI claims, or price tables that drift away from the live offer.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <p className="editorial-kicker">Start with the right first step</p>
            <h2>If the bottleneck is real, the Workflow Audit is where we begin.</h2>
            <p>
              It gives both sides a clean commercial decision: build now, sequence later, or avoid building the wrong thing.
            </p>
            <div className="cta-actions">
              <Link to="/workflow-audit" className="btn btn-primary btn-lg">
                Book Workflow Audit
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
