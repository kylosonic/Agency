import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';

/* B42a (TECH-25): locked filament-apparatus callouts for the Services hero. */
const SERVICES_APPARATUS_CALLOUTS = [
  'AUTOMATION · FROM 40,000 ETB',
  'WEB · FROM 20,000 ETB',
  'MOBILE · FROM 40,000 ETB',
  'MILESTONES · 40/30/30',
];

const AUTOMATION_LANES = [
  {
    title: 'Back-office automation',
    text: 'Invoice intake, approvals, reconciliations, and internal handoffs where repetitive admin work drags on margin.',
    examples: ['Invoice and document processing', 'Approval routing', 'Browser portal automation'],
    icon: 'settings',
  },
  {
    title: 'Knowledge and operations systems',
    text: 'Internal assistants and governed access to process knowledge when the business runs on tribal knowledge and disconnected files.',
    examples: ['Knowledge assistants with citations', 'Operational dashboards', 'Internal search and retrieval'],
    icon: 'book',
  },
  {
    title: 'Customer and revenue workflows',
    text: 'Lead routing, quoting, support triage, and order handling where response speed affects revenue.',
    examples: ['Quote and proposal automation', 'Support triage', 'Sales order execution'],
    icon: 'lightning',
  },
];

const DELIVERY_STEPS = [
  {
    title: 'Audit the current process',
    text: 'We start with the workflow, the people, the systems, and the cost of delay.',
    icon: 'search',
  },
  {
    title: 'Build the right operating layer',
    text: 'Automation, a web system, a mobile product, or a combination — not the same answer for every team.',
    icon: 'idea',
  },
  {
    title: 'Stabilize and support it',
    text: 'We define what needs monitoring, who owns the workflow, and whether support is needed.',
    icon: 'shield',
  },
];

const DELIVERY_TRACKS = [
  {
    title: 'AI automation engagements',
    price: 'from 40,000 ETB',
    text: 'For teams ready to replace repeated manual work with custom agents and governed operating logic.',
    to: '/pricing',
  },
  {
    title: 'Web systems',
    price: 'from 20,000 ETB',
    text: 'For commercial sites, portals, dashboards, and quote flows that support a real process.',
    to: '/web-development',
  },
  {
    title: 'Mobile products',
    price: 'from 40,000 ETB',
    text: 'For field teams, approvals, and customer flows that need a mobile operating layer.',
    to: '/mobile-development',
  },
  {
    title: 'SaaS platforms',
    price: 'from 3,500 ETB / month',
    text: 'Live subscription systems for schools, clinics, and real estate operators — setup plus monthly billing.',
    to: '/saas-solutions',
  },
];

export default function Services() {
  return (
    <>
      <section className="page-hero ai-services-hero" aria-labelledby="services-hero-title">
        <div className="container marquee-hero-grid">
          <div className="page-hero-content">
            {/* M-1 (TECH-33): one choreographed reveal — eyebrow → headline →
                subcopy → meta chips, 150ms apart, ≤ 1.2s total. */}
            <HeroChoreo>
              <div className="eyebrow">01 · OFFER</div>
              <HeroChoreoHeadline id="services-hero-title">
                what we actually <em className="verb">build</em>&nbsp;after the Workflow Audit.
              </HeroChoreoHeadline>
              <p>
                We build specific operating systems for teams that need work to move faster, with less
                dependence on one person.
              </p>
              <div className="page-hero-meta" aria-label="Service delivery priorities">
                <span className="page-hero-chip">Audit first</span>
                <span className="page-hero-chip">AI automation when it solves a real bottleneck</span>
                <span className="page-hero-chip">Web and mobile when an interface layer is needed</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="filament"
              callouts={SERVICES_APPARATUS_CALLOUTS}
              label="Filament apparatus: automation from 40,000 ETB, web from 20,000 ETB, mobile from 40,000 ETB, milestones 40/30/30"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="AUTOMATION · FROM 40,000 ETB" labelRight="MILESTONES · 40/30/30" />

      <section className="section" id="service-lanes">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · LANES"
              title="Three kinds of work come up most often."
              subtitle="These are where time, accuracy, and commercial trust usually break first."
              align="left"
            />
          </ScrollReveal>

          {/* B43 (TECH-26): supporting lanes as hairline rows with real DOM mono
              numerals 01–03 (not CSS ::before counters). */}
          <div className="editorial-card-grid receipt-stack">
            {AUTOMATION_LANES.map((item, index) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card service-lane-card">
                  <span className="receipt-row__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="service-lane-card__body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <ul className="editorial-mini-list">
                      {item.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
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
              eyebrow="03 · MODEL"
              title="The point is clarity first, implementation second."
              subtitle="Scope, commercial terms, and delivery expectations are explicit before a build starts."
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
              eyebrow="04 · TRACKS"
              title="The audit tells us which lane the project belongs in."
              subtitle="A paid audit, the right implementation path, then support where needed."
              align="left"
            />
          </ScrollReveal>

          {/* B43 (TECH-26): commercial tracks as ruled receipt rows with real DOM
              mono numerals 01–04 (not CSS ::before counters). */}
          <div className="editorial-card-grid receipt-stack">
            {DELIVERY_TRACKS.map((item, index) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card editorial-track-card service-track-card">
                  <span className="receipt-row__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="service-track-card__body">
                    <p className="editorial-price-tag">{item.price}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Link className="editorial-inline-link" to={item.to}>
                      Open this page
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <div className="editorial-note-panel">
              <strong>What we do not do:</strong> placeholder demos, invented proof, or price tables that drift from the live offer.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="page-closing-card glass-strong">
            <div className="eyebrow">05 · FIRST STEP</div>
            <h2>If the bottleneck is real, the Workflow Audit is where we begin.</h2>
            <p>
              It gives both sides a clean decision: build now, stage later, or avoid the wrong build.
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
