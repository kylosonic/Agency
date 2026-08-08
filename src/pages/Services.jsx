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
      'For legal, financial, and healthcare sectors, data sovereignty is non-negotiable. We deploy local AI gateways (utilizing frameworks like OpenClaw and models like Hermes or Qwen) running entirely on your own internal hardware. You get zero token costs and zero cloud telemetry leaving your network. Features strict role-based access control to protect proprietary strategies.',
    icon: 'shield',
    objectives: ['sovereignty', 'reliability'],
  },
  {
    title: 'Autonomous Browser & Web Agents',
    copy:
      'Bypass the need for clean, official APIs. We build web navigators on frameworks like Stagehand and Browserbase that work a page the way a person would. These agents log into vendor portals, move through multi-page forms, and run scheduled scraping jobs that pull live competitor pricing into your database.',
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

const AUTOMATION_USE_CASES = [
  {
    title: 'AI Invoice Processing',
    summary:
      'Turn supplier invoices, receipts, and PDF attachments into a verified finance workflow that extracts line items, checks tax totals, matches purchase orders, flags anomalies, and posts clean records into accounting or ERP systems.',
    icon: 'card',
    outcome: 'Manual invoice entry reduced across finance teams.',
    workflow: ['Read PDF/email', 'Extract fields', 'Match PO', 'Post record'],
  },
  {
    title: 'Engineering Knowledge Assistant',
    summary:
      'Deploy an internal software-system assistant that answers questions about architecture, services, data flows, APIs, runbooks, incidents, and code ownership with citations from approved repositories and documentation.',
    icon: 'book',
    outcome: 'Engineers get internal-system answers without waiting on tribal knowledge.',
    workflow: ['Index code/docs', 'Apply access rules', 'Answer with citations', 'Refresh on change'],
  },
  {
    title: 'Sales Order Automation',
    summary:
      'When a customer places an order, AI agents validate customer details, check inventory, calculate pricing and tax, create the sales order, trigger payment or fulfillment, and notify the customer without routine human handoff.',
    icon: 'lightning',
    outcome: 'Customer orders move from intake to fulfillment automatically.',
    workflow: ['Capture order', 'Validate stock', 'Create order', 'Trigger fulfillment'],
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
    'This is a co-equal service line. We design and build standalone products and AI-enabled product surfaces, from enterprise web platforms to mobile applications and multi-tenant SaaS systems.',
  icon: 'mobile',
};

const DATA_INTELLIGENCE_STEPS = [
  {
    title: 'Ingest Unstructured Sources',
    text: 'Contracts, invoices, chats, audio notes, PDFs, spreadsheets, and portal exports are normalized into one governed knowledge layer.',
    icon: 'download',
  },
  {
    title: 'Structure Company Knowledge',
    text: 'Code repositories, architecture docs, API specs, tickets, incidents, and deployment notes are indexed with permissions so every answer traces back to approved sources.',
    icon: 'search',
  },
  {
    title: 'Ship an AI Workbench',
    text: 'Teams can ask finance, operations, and engineering questions, inspect evidence, and route verified summaries into reports, CRMs, ERPs, and approval flows.',
    icon: 'spark',
  },
];

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
    summary: 'Coming soon',
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
      <section className="page-hero ai-services-hero" aria-labelledby="services-hero-title">
        <div className="container page-hero-content ai-services-hero-content">
          <h1 id="services-hero-title">AI Solutions Engineered for Operational Throughput</h1>
          <p>
            We lead with AI automation to remove operational drag, then scope AI systems and full software engineering with equal delivery priority based on your roadmap.
          </p>
          <div className="page-hero-meta" aria-label="Service delivery priorities">
            <span className="page-hero-chip">Agent orchestration first</span>
            <span className="page-hero-chip">Private deployment options</span>
            <span className="page-hero-chip">Web/Mobile/SaaS co-equal track</span>
            <span className="page-hero-chip">ROI-backed implementation</span>
          </div>
        </div>
      </section>

      <section className="section" id="ai-service-catalog" aria-labelledby="ai-service-catalog-title">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Core Offerings"
              title={<span id="ai-service-catalog-title">AI Automation Track</span>}
              subtitle="This automation track removes labor-heavy bottlenecks and runs in parallel with our product engineering track."
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

          <ScrollReveal delay={0.14}>
            <div className="automation-use-case-panel glass-strong" aria-labelledby="automation-use-cases-title">
              <div className="automation-use-case-head">
                <p className="automation-use-case-kicker">High-Impact Automations</p>
                <h3 id="automation-use-cases-title">Ready-made AI workflows for finance, engineering, and sales operations.</h3>
                <p>
                  These modules can run as standalone automations or connect into a larger agentic operating system for the business.
                </p>
              </div>

              <div className="automation-use-case-grid">
                {AUTOMATION_USE_CASES.map((useCase) => (
                  <article key={useCase.title} className="automation-use-case-card glass">
                    <span className="automation-use-case-icon" aria-hidden="true">
                      <IconGlyph name={useCase.icon} size={18} />
                    </span>
                    <h4>{useCase.title}</h4>
                    <p>{useCase.summary}</p>
                    <strong>{useCase.outcome}</strong>
                    <div className="automation-use-case-flow" aria-label={`${useCase.title} workflow`}>
                      {useCase.workflow.map((step) => (
                        <span key={step}>{step}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section searchable-brain-section ai-service-data-section band-dark band-1" id="searchable-brain" aria-labelledby="searchable-brain-title">
        <div className="container searchable-brain-shell">
          <ScrollReveal>
            <div className="searchable-brain-copy">
              <p className="searchable-brain-kicker">The Searchable Brain</p>
              <h2 id="searchable-brain-title">Turn Your Business&apos;s Chaos into a Searchable Brain.</h2>
              <p>
                Most businesses operate on a chaotic mix of unstructured data: PDF contracts, scattered emails, Telegram chat histories, audio notes, and messy spreadsheets. We engineer secure data pipelines that ingest this unstructured mess, categorize it, and structure it into clean vector databases so your team can ask operational questions and receive verifiable answers with exact citations.
              </p>
              <div className="ai-data-layer-list" role="list" aria-label="Searchable brain implementation steps">
                {DATA_INTELLIGENCE_STEPS.map((item) => (
                  <article key={item.title} className="ai-data-layer-item glass" role="listitem">
                    <span className="ai-data-layer-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={16} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <aside className="searchable-brain-proof glass-strong" aria-label="Example audit response">
              <span className="searchable-brain-proof-label">Live Query Pattern</span>
              <p className="searchable-brain-proof-query">
                Which service creates invoices, how does it validate sales orders, and what changed in the fulfillment flow last sprint?
              </p>
              <p className="searchable-brain-proof-result">
                Response cites the relevant repository files, architecture notes, API contracts, and deployment runbooks so teams can trust the answer.
              </p>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="section ai-supporting-service band-dark band-2" id="engineering">
        <div className="container">
          <ScrollReveal>
            <div className="ai-supporting-service-card glass-strong">
              <div className="ai-supporting-service-header">
                <span className="ai-supporting-service-icon" aria-hidden="true">
                  <IconGlyph name={SUPPORTING_SERVICE.icon} size={22} />
                </span>
                <div>
                  <p className="ai-supporting-kicker">Parallel Delivery Track</p>
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
