import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { SITE_CONTACT, buildProjectInquiryMailto } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import PilotOfferSection from '../components/PilotOfferSection';
import {
  trackContactChannelClick,
  trackContactFormAttempt,
  trackContactFormOutcome,
} from '../services/analyticsService';

const INITIAL_CONTACT_FORM = {
  name: '',
  email: '',
  message: '',
};

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
      'We design a technical blueprint that shows exactly where custom agents, local models, and autonomous browser scripts replace manual labor.',
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
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);
  const [contactStatus, setContactStatus] = useState('idle');

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (contactStatus !== 'idle') {
      setContactStatus('idle');
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus('sending');
    trackContactFormAttempt('home_contact_form');

    // Best-effort, non-blocking durable mirror (TECH-08 G3): the formsubmit rail
    // remains the primary delivery path; this mirror POSTs to /api/leads so the
    // inquiry is also stored in the lead store. Failures are silently ignored —
    // the UI and the primary flow are never blocked or re-routed by it.
    submitLeadIntake({
      type: 'contact_form',
      source: 'home_contact_form',
      channel: 'contact_form',
      routePath: '/',
      lead: contactForm,
      context: { delivery: 'durable_mirror' },
      consent: {
        type: 'contact_form_mirror',
        capturedAt: new Date().toISOString(),
        copy: 'Durable mirror of the homepage contact form submission.',
      },
    }).catch(() => {
      // Silently ignore mirror failures.
    });

    const submission = await submitContactInquiry(contactForm);

    if (submission.ok) {
      setContactStatus('sent');
      setContactForm(INITIAL_CONTACT_FORM);
      queueLeadFollowups({
        source: 'home_contact_form',
        channel: 'contact_form',
        routePath: '/',
        lead: submission.payload,
      });
      trackContactFormOutcome('submitted', 'home_contact_form');
      return;
    }

    if (['unconfigured', 'request-failed', 'timeout', 'network-error'].includes(submission.type)) {
      queueLeadFollowups({
        source: 'home_contact_form_fallback',
        channel: 'contact_form_mailto',
        routePath: '/',
        lead: submission.payload || contactForm,
      });
      if (typeof window !== 'undefined') {
        window.location.assign(buildProjectInquiryMailto(submission.payload || contactForm));
      }
      setContactStatus('fallback');
      setContactForm(INITIAL_CONTACT_FORM);
      trackContactFormOutcome('fallback_mailto', 'home_contact_form', submission.type);
      return;
    }

    setContactStatus('error');
    trackContactFormOutcome('failed', 'home_contact_form', submission.type);
  };

  return (
    <>
      <section className="hero ai-home-hero" id="hero" aria-labelledby="home-hero-title">
        <div className="container hero-shell ai-hero-shell">
          <div className="hero-copy ai-hero-copy">
            <ScrollReveal delay={0.1}>
              <div className="hero-badge ai-hero-badge page-hero-meta">
                <span className="hero-badge-dot"></span>
                AI-First Automation Consultancy
              </div>
            </ScrollReveal>

            <h1 id="home-hero-title">Stop Doing Manual Work. Let Custom AI Agents Run Your Bottlenecks.</h1>

            <ScrollReveal delay={0.2}>
              <p>
                We lead with AI automation because it creates the fastest operational advantage, while actively delivering web, mobile, and SaaS products that turn those systems into real business outcomes.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" to="/workflow-audit">
                  Book a Custom Workflow Audit
                </Link>
                <a className="btn btn-secondary btn-lg" href="#ai-solutions">
                  See What&apos;s Possible
                  <IconGlyph name="chevronDown" size={15} strokeWidth={2} />
                </a>
              </div>
              <div className="hero-trust-row" aria-label="Delivery assurances">
                <span className="trust-pill">ETB pricing · International engagements quoted individually</span>
                <span className="trust-pill">Private deployment options</span>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.18}>
            <div className="hero-facts" aria-label="Core AI operational capabilities">
              <div className="hero-facts-label">Audit blueprint in 5 business days</div>
              <ol className="hero-facts-list">
                {SOLUTION_PREVIEWS.map((item, index) => (
                  <li key={item.title} className="hero-fact-row">
                    <span className="hero-fact-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="hero-fact-body">
                      <span className="hero-fact-title">{item.title}</span>
                      <span className="hero-fact-text">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="ai-solutions">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="AI Solutions"
              title="Automation built for the work your team does every day"
              subtitle="We engineer targeted automation layers that remove repetitive labor, delivered as one of two core tracks alongside full software product engineering."
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
              title="The same delivery standard applies to web, mobile, and SaaS builds"
              subtitle="After the AI-led opening strategy, we execute automation systems and full software products in parallel to ship measurable outcomes."
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

      <section className="section methodology-section band-dark band-1" id="methodology">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              title="What happens after the audit?"
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

      <PilotOfferSection source="home_pilot_offer" />

      <section className="section ai-contact-section" id="contact">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              title="Tell us where the manual work lives."
              subtitle="Share your workflow bottlenecks or product goals and we will reply with next steps within one business day."
              align="left"
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="contact-grid">
              <div className="contact-form-card glass-card">
                <h3>Send Us a Message</h3>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Sara Tesfaye"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="sara.tesfaye@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us about your workflow bottlenecks and current tooling..."
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" disabled={contactStatus === 'sending'}>
                    {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className={`form-feedback ${contactStatus}`} role="status" aria-live="polite">
                    {contactStatus === 'sent'
                      ? 'Thanks. Your message was sent successfully and our team will respond within 24 hours.'
                      : contactStatus === 'fallback'
                      ? 'We opened your email app to complete delivery. Please send the drafted message to finish your request.'
                      : contactStatus === 'error'
                      ? 'Please verify your name, email, and message, then try again.'
                      : contactStatus === 'sending'
                      ? 'Submitting your request to our contact channel...'
                      : 'We usually respond in less than one business day.'}
                  </p>
                </form>
              </div>

              <div className="contact-info-card glass-card">
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="mail" size={17} /></div>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${SITE_CONTACT.email}`} onClick={() => trackContactChannelClick('email', 'home_contact_info')}>
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="phone" size={17} /></div>
                  <div>
                    <h4>Phone</h4>
                    <a href={SITE_CONTACT.phoneHref} onClick={() => trackContactChannelClick('phone', 'home_contact_info')}>
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="chat" size={17} /></div>
                  <div>
                    <h4>Telegram</h4>
                    <a
                      href={SITE_CONTACT.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackContactChannelClick('telegram', 'home_contact_info')}
                    >
                      {SITE_CONTACT.telegramHandle}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="pin" size={17} /></div>
                  <div>
                    <h4>Location</h4>
                    <a
                      href={SITE_CONTACT.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackContactChannelClick('maps', 'home_contact_info')}
                    >
                      {SITE_CONTACT.locationLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section-sm ai-home-cta band-dark band-2" id="workflow-audit-cta">
        <div className="container">
          <div className="ai-home-cta-inner glass-strong">
            <h2>Ready to automate operations or ship a new software product?</h2>
            <p>
              We can map workflow bottlenecks, quantify recoverable hours, and scope production web, mobile, and SaaS builds tied to ROI.
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
