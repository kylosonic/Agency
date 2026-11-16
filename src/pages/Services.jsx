import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import SectionHeader from '../components/SectionHeader';
import BrutalPriceBoard from '../components/BrutalPriceBoard';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { QUOTE_ANCHORS } from '../services/pricingData';

const SERVICES_PRICE_ROWS = [
  { label: 'Business website', price: `from ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB` },
  { label: 'Mobile product', price: `from ${QUOTE_ANCHORS.mobile[0].toLocaleString()} ETB` },
  { label: 'Custom software', price: `from ${QUOTE_ANCHORS.custom[0].toLocaleString()} ETB` },
  { label: 'SaaS product build', price: 'from 180,000 ETB' },
];

const AUTOMATION_LANES = [
  {
    title: 'Application architecture',
    text: 'We define the data model, services, permissions, and integrations before the interface is built.',
    examples: ['System architecture', 'Database design', 'API contracts'],
    icon: 'settings',
  },
  {
    title: 'System integration',
    text: 'New software connects cleanly to the CRM, ERP, payment, messaging, and internal systems you already use.',
    examples: ['Payment integrations', 'ERP and CRM sync', 'Legacy API adapters'],
    icon: 'book',
  },
  {
    title: 'Release engineering',
    text: 'Automated tests, security checks, monitoring, and deployment runbooks make each release repeatable.',
    examples: ['Automated testing', 'Security review', 'Deployment and monitoring'],
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
    text: 'A scoped annual support allowance and next-business-day response.',
    icon: 'shield',
  },
];

/* Six software development tracks. Prices come from the locked table only. */
const DELIVERY_TRACKS = [
  {
    title: 'Custom Software Development',
    price: 'Quoted from the live ETB table',
    text: 'Business software, enterprise systems, internal platforms, workflow management, and customer portals.',
    to: '/book-discovery-call',
  },
  {
    title: 'Web Development',
    price: `from ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB`,
    text: 'Business websites, web apps, portals, dashboards, e-commerce, and corporate sites.',
    to: '/web-development',
  },
  {
    title: 'Mobile App Development',
    price: `from ${QUOTE_ANCHORS.mobile[0].toLocaleString()} ETB`,
    text: 'Android, iOS, and cross-platform apps for business, customer, and workforce use.',
    to: '/mobile-development',
  },
  {
    title: 'SaaS & Product Development',
    price: 'product builds from 180,000 ETB',
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
    title: 'Platform Modernization',
    price: '75,000 – 250,000 ETB',
    text: 'Upgrade legacy applications, dependencies, data models, and deployment without discarding business logic.',
    to: '/additional-services',
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
                custom software, <em className="verb">engineered</em>&nbsp;for real operations.
              </HeroChoreoHeadline>
              <p>
                From a focused website to a multi-team business platform, we design, build, integrate,
                and support production software.
              </p>
              <div className="page-hero-meta" aria-label="Service delivery priorities">
                <span className="page-hero-chip">Custom Software · Web · Mobile · SaaS · Business Systems</span>
                <span className="page-hero-chip">Architecture, integration, testing, and deployment included</span>
                <span className="page-hero-chip">Fixed ETB anchors where scope is repeatable</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <BrutalPriceBoard
              title="Start with a number"
              rows={SERVICES_PRICE_ROWS}
              note="Blueprint 25,000 ETB, credited to the build. One published table for the full engagement."
            />
          </div>
        </div>
      </section>

      {/* TECH-36 (A2): meter leads with the software anchor. */}
      <MeterStrip
        labelLeft={`WEB · FROM ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB`}
        labelRight={`CUSTOM SOFTWARE · FROM ${QUOTE_ANCHORS.custom[0].toLocaleString()} ETB`}
      />

      <section className="section" id="service-lanes">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · ENGINEERING"
              title="How we turn requirements into reliable software."
              subtitle="Architecture, integrations, and release engineering are part of the build."
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
              subtitle="Choose the software category that matches what needs to be built."
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
              <strong>Every engagement is software development:</strong> scoped, implemented, tested, documented, and handed over.
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
                Review Software Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
