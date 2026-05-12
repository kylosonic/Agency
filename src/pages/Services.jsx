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
  },
  {
    title: '100% Private, Air-Gapped Enterprise Assistants',
    copy:
      'For legal, financial, and healthcare sectors, data sovereignty is non-negotiable. We deploy local AI gateways (utilizing frameworks like OpenClaw and models like Hermes or Qwen) running entirely on your own internal hardware. Experience zero token costs, zero cloud telemetry, and complete peace of mind. Features strict role-based access control to protect proprietary strategies.',
    icon: 'shield',
  },
  {
    title: 'Autonomous Browser & Web Agents',
    copy:
      'Bypass the need for clean, official APIs. We build intelligent web navigators utilizing cutting-edge frameworks like Stagehand and Browserbase that mimic human interaction. These agents can login to complex vendor portals, navigate multi-page forms, solve CAPTCHAs, and run unstoppable scraping engines to extract real-time competitor pricing directly to your database.',
    icon: 'globe',
  },
  {
    title: 'Sales Velocity & Omni-Channel Support',
    copy:
      'Accelerate revenue with RFP engines that automatically pull client data and calculate complex pricing for instant, branded proposals. Deploy omni-channel support triage systems that read incoming floods of tickets, categorize by intent, automatically resolve basic queries, and route VIP clients to priority Slack channels.',
    icon: 'lightning',
  },
];

const SUPPORTING_SERVICE = {
  title: 'AI Interface & Application Development (Formerly Web/Mobile Dev)',
  copy:
    'We engineer the high-performance React.js and cross-platform mobile front-ends that serve as the interface for your custom AI infrastructure. From secure internal corporate dashboards to sleek client-facing mobile applications, we ensure your AI power is accessible, responsive, and beautifully designed.',
  icon: 'mobile',
};

export default function Services() {
  return (
    <>
      <section className="page-hero ai-services-hero">
        <div className="container page-hero-content ai-services-hero-content">
          <h1>AI Solutions Engineered for Operational Throughput</h1>
          <p>
            We replace repetitive human process chains with deterministic automation systems, private assistants, and agentic execution layers tuned to your internal workflows.
          </p>
          <div className="page-hero-meta" aria-label="Service delivery priorities">
            <span className="page-hero-chip">Agent orchestration first</span>
            <span className="page-hero-chip">Private deployment options</span>
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
              subtitle="Our primary offering stack is designed to remove labor-heavy bottlenecks from operations, compliance, revenue, and customer support."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="ai-service-grid">
              {CORE_SERVICES.map((service) => (
                <article key={service.title} className="ai-service-card glass-card">
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
