import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';

/* B42a (TECH-25) + TECH-36 (S-1): locked filament-apparatus callouts for the
   Services hero — software callouts lead (WEB → MOBILE → SAAS), automation is
   the second track. */
const SERVICES_APPARATUS_CALLOUTS = [
  'WEB · FROM 20,000 ETB',
  'MOBILE · FROM 40,000 ETB',
  'SAAS · FROM 3,500 ETB / MO',
  'AUTOMATION · FROM 40,000 ETB',
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
    title: 'Discovery and scope',
    text: 'A free call first, then a fixed ETB proposal from the published table.',
    icon: 'search',
  },
  {
    title: 'Build in milestones',
    text: 'Milestone billing 40/30/30 with full ownership on final payment.',
    icon: 'idea',
  },
  {
    title: 'Support and maintain',
    text: 'Written commitments: 40 support hours a year, next-business-day response.',
    icon: 'shield',
  },
];

/* TECH-44 (R-5): six tracks — the software builds lead; AI & Automation is
   the named specialist track. Prices come from the locked table only. */
const DELIVERY_TRACKS = [
  {
    title: 'Custom Software Development',
    price: 'Quoted from the live ETB table',
    text: 'Business software, enterprise systems, internal platforms, workflow management, and customer portals.',
    to: '/book-discovery-call',
  },
  {
    title: 'Web Development',
    price: 'from 20,000 ETB',
    text: 'Business websites, web apps, portals, dashboards, e-commerce, and corporate sites.',
    to: '/web-development',
  },
  {
    title: 'Mobile App Development',
    price: 'from 40,000 ETB',
    text: 'Android, iOS, and cross-platform apps for business, customer, and workforce use.',
    to: '/mobile-development',
  },
  {
    title: 'SaaS & Product Development',
    price: 'from 3,500 ETB / month',
    text: 'SaaS platforms, MVPs, and subscription software with billing and onboarding built in.',
    to: '/saas-solutions',
  },
  {
    title: 'Business Systems',
    price: 'Quoted from the live ETB table',
    text: 'Inventory, CRM, ERP-style, HR, finance, logistics, school, and retail systems.',
    to: '/book-discovery-call',
  },
  {
    title: 'AI & Automation',
    price: 'from 40,000 ETB',
    text: 'AI assistants, agents, document processing, and intelligent automation for existing software.',
    to: '/pricing',
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
                {/* TECH-44 (R-5): software tracks first; AI named as the specialist track. */}
                <span className="page-hero-chip">Custom Software · Web · Mobile · SaaS · Business Systems</span>
                <span className="page-hero-chip">Software builds and AI automation — scoped to the bottleneck</span>
                <span className="page-hero-chip">AI automation when it solves a real bottleneck</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="filament"
              callouts={SERVICES_APPARATUS_CALLOUTS}
              label="Filament apparatus: web from 20,000 ETB, mobile from 40,000 ETB, SaaS from 3,500 ETB per month, automation from 40,000 ETB"
            />
          </div>
        </div>
      </section>

      {/* TECH-36 (A2): meter leads with the software anchor. */}
      <MeterStrip labelLeft="WEB · FROM 20,000 ETB" labelRight="MILESTONES · 40/30/30" />

      <section className="section" id="service-lanes">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · AUTOMATION LANES"
              title="Where AI automation pays for itself."
              subtitle="Intelligent automation on top of the software your business already runs."
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
              title="Six build lanes, quoted from the live ETB table."
              subtitle="Software tracks lead; AI automation is the named specialist track."
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
            <h2>Tell us what to build — we scope it from the live ETB table.</h2>
            <p>
              Start a project with scope and budget context; we respond within 1 business day.
            </p>
            <div className="cta-actions">
              {/* R-6 (TECH-46): Start a Project primary → Home intake form. */}
              <Link to="/#project-intake" className="btn btn-primary btn-lg">
                Start a Project
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-lg">
                Discuss Your Software Idea
              </Link>
              <Link to="/pricing" className="btn btn-dark btn-sm">
                Explore AI &amp; Automation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
