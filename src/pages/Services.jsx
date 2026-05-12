import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';

const CORE_SERVICES = [
  {
    title: 'Custom Agentic Systems & Orchestration',
    copy:
      'Off-the-shelf software forces you to change how your business operates. We engineer custom, autonomous AI agents from scratch that adapt exactly to your existing tech stack. We handle the complex orchestration of multi-agent systems that can connect hidden APIs, manipulate legacy enterprise software, and execute complex multi-step operations without human intervention.',
    icon: 'settings',
    objectives: ['throughput', 'reliability', 'revenue'],
  },
  {
    title: '100% Private, Air-Gapped Enterprise Assistants',
    copy:
      'For legal, financial, and healthcare sectors, data sovereignty is non-negotiable. We deploy local AI gateways (utilizing frameworks like OpenClaw and models like Hermes or Qwen) running entirely on your own internal hardware. Experience zero token costs, zero cloud telemetry, and complete peace of mind. Features strict role-based access control to protect proprietary strategies.',
    icon: 'shield',
    objectives: ['sovereignty', 'reliability'],
  },
  {
    title: 'Autonomous Browser & Web Agents',
    copy:
      'Bypass the need for clean, official APIs. We build intelligent web navigators utilizing cutting-edge frameworks like Stagehand and Browserbase that mimic human interaction. These agents can login to complex vendor portals, navigate multi-page forms, solve CAPTCHAs, and run unstoppable scraping engines to extract real-time competitor pricing directly to your database.',
    icon: 'globe',
    objectives: ['throughput', 'revenue'],
  },
  {
    title: 'Sales Velocity & Omni-Channel Support',
    copy:
      'Accelerate revenue with RFP engines that automatically pull client data and calculate complex pricing for instant, branded proposals. Deploy omni-channel support triage systems that read incoming floods of tickets, categorize by intent, automatically resolve basic queries, and route VIP clients to priority Slack channels.',
    icon: 'lightning',
    objectives: ['revenue', 'throughput', 'reliability'],
  },
];

const SERVICE_OBJECTIVES = [
  {
    id: 'throughput',
    label: 'Cut Process Latency',
    icon: 'rocket',
    summary: 'Remove repetitive queues and accelerate execution speed across daily operations.',
    flow: ['Capture', 'Classify', 'Execute', 'Verify'],
  },
  {
    id: 'sovereignty',
    label: 'Protect Sensitive Data',
    icon: 'shield',
    summary: 'Deploy air-gapped intelligence with strict access controls and local model ownership.',
    flow: ['Isolate', 'Encrypt', 'Authorize', 'Audit'],
  },
  {
    id: 'revenue',
    label: 'Accelerate Revenue Ops',
    icon: 'chart',
    summary: 'Shorten response cycles for proposals, lead follow-up, and customer communication.',
    flow: ['Listen', 'Prioritize', 'Draft', 'Launch'],
  },
  {
    id: 'reliability',
    label: 'Reduce Failure Risk',
    icon: 'refresh',
    summary: 'Establish deterministic automations with fallback runbooks and resilient monitoring.',
    flow: ['Observe', 'Fallback', 'Recover', 'Report'],
  },
];

const SUPPORTING_SERVICE = {
  title: 'Web, Mobile & SaaS Product Engineering',
  copy:
    'These are active service lines, not legacy offerings. We design and build standalone products and AI-enabled product surfaces, from enterprise web platforms to mobile applications and multi-tenant SaaS systems.',
  icon: 'mobile',
};

const PRODUCT_ENGINEERING_TRACKS = [
  {
    title: 'Web Development',
    summary: 'Platform websites, client portals, and internal systems.',
    icon: 'globe',
    to: '/web-development',
  },
  {
    title: 'Mobile Applications',
    summary: 'Cross-platform apps for operations, sales, and support teams.',
    icon: 'mobile',
    to: '/mobile-development',
  },
  {
    title: 'SaaS Products',
    summary: 'Subscription-ready products with scalable cloud architecture.',
    icon: 'cloud',
    to: '/saas-solutions',
  },
];

export default function Services() {
  const [activeObjective, setActiveObjective] = useState(SERVICE_OBJECTIVES[0].id);

  const currentObjective = useMemo(
    () => SERVICE_OBJECTIVES.find((objective) => objective.id === activeObjective) || SERVICE_OBJECTIVES[0],
    [activeObjective]
  );

  const focusedServiceCount = useMemo(
    () => CORE_SERVICES.filter((service) => service.objectives.includes(activeObjective)).length,
    [activeObjective]
  );

  return (
    <>
      <section className="page-hero ai-services-hero">
        <div className="container page-hero-content ai-services-hero-content">
          <h1>AI Solutions Engineered for Operational Throughput</h1>
          <p>
            We lead with AI automation to remove operational drag, while continuing full-scale web, mobile, and SaaS product delivery for teams that need complete software systems.
          </p>
          <div className="page-hero-meta" aria-label="Service delivery priorities">
            <span className="page-hero-chip">Agent orchestration first</span>
            <span className="page-hero-chip">Private deployment options</span>
            <span className="page-hero-chip">Web/Mobile/SaaS delivery active</span>
            <span className="page-hero-chip">ROI-backed implementation</span>
          </div>
        </div>
      </section>

      <section className="section" id="ai-service-catalog">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Core Offerings"
              title="AI-First Taxonomy"
              subtitle="Our primary offering stack removes labor-heavy bottlenecks while connecting directly to active product engineering tracks."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="ai-service-objective-board glass-card" aria-label="service objective selector">
              <div className="ai-service-objective-head">
                <p className="ai-service-objective-kicker">Outcome Focus</p>
                <h3>{currentObjective.label}</h3>
                <p>{currentObjective.summary}</p>
              </div>

              <div className="ai-service-objective-chips" aria-label="service objectives">
                {SERVICE_OBJECTIVES.map((objective) => (
                  <button
                    key={objective.id}
                    type="button"
                    aria-pressed={activeObjective === objective.id}
                    className={`ai-service-objective-chip ${activeObjective === objective.id ? 'active' : ''}`}
                    onClick={() => setActiveObjective(objective.id)}
                  >
                    <IconGlyph name={objective.icon} size={15} />
                    <span>{objective.label}</span>
                  </button>
                ))}
              </div>

              <div className="ai-service-objective-flow" aria-label="execution flow">
                {currentObjective.flow.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>

              <p className="ai-service-objective-meta">
                {focusedServiceCount} core services most relevant to this objective.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="ai-service-grid">
              {CORE_SERVICES.map((service) => (
                <article
                  key={service.title}
                  className={`ai-service-card glass-card ${
                    service.objectives.includes(activeObjective) ? 'is-focus' : 'is-muted'
                  }`}
                >
                  <div className="ai-service-card-top">
                    <span className="ai-service-icon" aria-hidden="true">
                      <IconGlyph name={service.icon} size={20} />
                    </span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section ai-supporting-service" id="engineering">
        <div className="container">
          <ScrollReveal>
            <div className="ai-supporting-service-card glass-strong">
              <div className="ai-supporting-service-header">
                <span className="ai-supporting-service-icon" aria-hidden="true">
                  <IconGlyph name={SUPPORTING_SERVICE.icon} size={22} />
                </span>
                <div>
                  <p className="ai-supporting-kicker">Supporting Delivery Layer</p>
                  <h2>{SUPPORTING_SERVICE.title}</h2>
                </div>
              </div>
              <p>{SUPPORTING_SERVICE.copy}</p>
              <div className="ai-supporting-track-grid" aria-label="active product engineering tracks">
                {PRODUCT_ENGINEERING_TRACKS.map((track) => (
                  <Link key={track.title} to={track.to} className="ai-supporting-track-pill glass">
                    <span className="ai-supporting-track-icon" aria-hidden="true">
                      <IconGlyph name={track.icon} size={16} />
                    </span>
                    <span>
                      <strong>{track.title}</strong>
                      <small>{track.summary}</small>
                    </span>
                  </Link>
                ))}
              </div>
              <div className="ai-supporting-actions">
                <Link to="/pricing" className="btn btn-primary">
                  View Pricing
                </Link>
                <Link to="/workflow-audit" className="btn btn-secondary">
                  Scope Your Workflow Audit
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
