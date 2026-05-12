import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import AnimatedMetric from '../components/AnimatedMetric';
import AgentOpsShowcase from '../components/AgentOpsShowcase';
import AutomationImpactCalculator from '../components/AutomationImpactCalculator';

const HERO_METRICS = [
  {
    label: 'Hours Reclaimed',
    value: 1800,
    suffix: '+',
  },
  {
    label: 'Systems Integrated',
    value: 40,
    suffix: '+',
  },
  {
    label: 'Manual Steps Removed',
    value: 92,
    suffix: '%',
  },
];

const SOLUTION_PREVIEWS = [
  {
    title: 'Agentic Operations',
    text: 'Autonomous, multi-step agents that execute repetitive operations without daily supervision.',
    icon: 'settings',
  },
  {
    title: 'Data Pipeline Engineering',
    text: 'Secure ingestion, normalization, and retrieval pipelines for contracts, chats, notes, and internal docs.',
    icon: 'chart',
  },
  {
    title: 'Legacy System Automation',
    text: 'Browser-native and API-native automations that work with brittle portals and outdated software stacks.',
    icon: 'refresh',
  },
];

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'The Workflow Audit',
    description:
      'We embed with your team to map daily operations, identifying manual copy-pasting, data bottlenecks, and slow human handoffs.',
    icon: 'search',
  },
  {
    step: '02',
    title: 'The Architecture',
    description:
      'We design a streamlined technical blueprint detailing exactly where custom agents, local models, and autonomous browser scripts will replace manual labor.',
    icon: 'idea',
  },
  {
    step: '03',
    title: 'Deployment & Integration',
    description:
      'We build, rigorously test, and deploy the system directly into your existing operational tools (Slack, CRM, internal databases), complete with ongoing maintenance to prevent silent degradation as models update.',
    icon: 'rocket',
  },
];

const PRODUCT_DELIVERY_TRACKS = [
  {
    title: 'Web Development',
    description:
      'Conversion-focused websites, portals, and internal web platforms delivered as standalone or AI-enabled builds.',
    icon: 'globe',
    to: '/web-development',
  },
  {
    title: 'Mobile App Development',
    description:
      'Cross-platform iOS and Android applications for field teams, approvals, and customer workflows.',
    icon: 'mobile',
    to: '/mobile-development',
  },
  {
    title: 'SaaS Product Engineering',
    description:
      'Scalable SaaS platforms with multi-tenant architecture, billing, and operational analytics built for growth.',
    icon: 'cloud',
    to: '/saas-solutions',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero ai-home-hero" id="hero">
        <div className="container hero-shell ai-hero-shell">
          <div className="hero-copy ai-hero-copy">
            <ScrollReveal delay={0.1}>
              <div className="hero-badge ai-hero-badge">
                <span className="hero-badge-dot"></span>
                AI-First Automation Consultancy
              </div>
            </ScrollReveal>

            <h1>Stop Doing Manual Work. Let Custom AI Agents Run Your Bottlenecks.</h1>

            <ScrollReveal delay={0.2}>
              <p>
                We lead with AI automation because it creates the fastest operational advantage, while actively delivering web, mobile, and SaaS products that turn those systems into real business outcomes.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" to="/workflow-audit">
                  Book a Custom Workflow Audit
                </Link>
                <a className="btn btn-secondary btn-lg" href="#ai-solutions">
                  See What&apos;s Possible ↓
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="hero-stats ai-hero-stats" aria-label="Operational performance metrics">
                {HERO_METRICS.map((metric) => (
                  <div key={metric.label} className="hero-stat glass-card ai-hero-stat">
                    <div className="hero-stat-value">
                      <AnimatedMetric value={metric.value} suffix={metric.suffix} />
                    </div>
                    <div className="hero-stat-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.18}>
            <aside className="hero-panel glass-card ai-hero-panel" aria-label="Core AI operational capabilities">
              <div className="hero-panel-label">Execution Surface</div>
              <div className="hero-features ai-hero-features">
                {SOLUTION_PREVIEWS.map((item) => (
                  <article key={item.title} className="hero-feature-card glass ai-signal-card">
                    <div className="card-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={20} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="section searchable-brain-section" id="searchable-brain">
        <div className="container searchable-brain-shell">
          <ScrollReveal>
            <div className="searchable-brain-copy">
              <p className="searchable-brain-kicker">The Searchable Brain</p>
              <h2>Turn Your Business&apos;s Chaos into a Searchable Brain.</h2>
              <p>
                Most businesses operate on a chaotic mix of unstructured data: PDF contracts, scattered emails, Telegram chat histories, audio notes, and messy spreadsheets. We engineer secure data pipelines that automatically ingest this unstructured mess, categorize it, and structure it into clean vector databases. The Result: You get a central AI interface where you can literally &apos;talk&apos; to your entire business history. Ask questions like, &apos;Summarize our monthly overhead from these 50 raw invoice PDFs,&apos; and receive instant, verifiable answers with exact citations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <aside className="searchable-brain-proof glass-strong" aria-label="Example audit response">
              <span className="searchable-brain-proof-label">Live Query Pattern</span>
              <p className="searchable-brain-proof-query">
                Summarize our monthly overhead from these 50 raw invoice PDFs.
              </p>
              <p className="searchable-brain-proof-result">
                Response includes line-by-line totals, supplier anomalies, and exact source citations back to the original files.
              </p>
            </aside>
          </ScrollReveal>
        </div>
      </section>

      <section className="section ai-agent-demo-section" id="agent-demo">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Agentic Replay"
              title="Watch an End-to-End Agent Pipeline Execute"
              subtitle="A sample autonomous sequence from data collection to reporting, visualized as an operational control surface."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <AgentOpsShowcase />
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="ai-solutions">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="AI Solutions"
              title="Systems Built for Throughput, Not Busywork"
              subtitle="We engineer targeted automation layers that remove repetitive labor from operations, finance, support, and delivery teams."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="ai-preview-grid">
              <article className="ai-preview-card glass-card">
                <div className="ai-preview-icon" aria-hidden="true">
                  <IconGlyph name="shield" size={20} />
                </div>
                <h3>Private Model Deployments</h3>
                <p>Air-gapped assistants deployed on your hardware for legal-grade privacy and zero cloud telemetry.</p>
              </article>

              <article className="ai-preview-card glass-card">
                <div className="ai-preview-icon" aria-hidden="true">
                  <IconGlyph name="globe" size={20} />
                </div>
                <h3>Autonomous Browser Agents</h3>
                <p>Persistent web agents that authenticate, navigate, and extract data from vendor portals at scale.</p>
              </article>

              <article className="ai-preview-card glass-card">
                <div className="ai-preview-icon" aria-hidden="true">
                  <IconGlyph name="chart" size={20} />
                </div>
                <h3>Revenue Operations Automations</h3>
                <p>RFP generation engines, support triage flows, and lead orchestration loops that accelerate response speed.</p>
              </article>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section ai-product-track-section" id="product-engineering">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Product Engineering"
              title="Web, Mobile, and SaaS Delivery Is Still Core to Our Stack"
              subtitle="AI is the primary growth lever, and we continue shipping full product surfaces that operationalize your workflows in production."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="ai-preview-grid">
              {PRODUCT_DELIVERY_TRACKS.map((track) => (
                <article key={track.title} className="ai-preview-card glass-card ai-product-track-card">
                  <div className="ai-preview-icon" aria-hidden="true">
                    <IconGlyph name={track.icon} size={20} />
                  </div>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                  <Link className="ai-product-track-link" to={track.to}>
                    Explore Track
                  </Link>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section methodology-section" id="methodology">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="The Methodology"
              title="How We Engineer Production-Grade AI Workflows"
              subtitle="A transparent three-step implementation model designed for reliability, accountability, and measurable operational gains."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="methodology-timeline">
              {METHODOLOGY_STEPS.map((item) => (
                <article key={item.step} className="methodology-step glass-card">
                  <div className="methodology-step-top">
                    <span className="methodology-step-number">{item.step}</span>
                    <span className="methodology-step-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={18} />
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section ai-impact-section" id="impact-calculator">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="ROI Modeling"
              title="Quantify Recoverable Margin Before You Commit"
              subtitle="Dial in your current operational drag and estimate the projected savings from automation-first implementation."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <AutomationImpactCalculator />
          </ScrollReveal>
        </div>
      </section>

      <section className="section section-sm ai-home-cta" id="workflow-audit-cta">
        <div className="container">
          <div className="ai-home-cta-inner glass-strong">
            <h2>If your team is still copy-pasting between systems, your operation is leaking margin.</h2>
            <p>
              We will map your workflows, quantify recoverable hours, and deliver a technical implementation blueprint tied to ROI.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/workflow-audit">
                Book a Custom Workflow Audit
              </Link>
              <Link className="btn btn-secondary btn-lg" to="/pricing">
                Review Pricing Structure
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
