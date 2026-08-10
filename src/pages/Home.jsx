import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { SITE_CONTACT, buildProjectInquiryMailto } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { getPricingGuideSummary } from '../services/pricingData';
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

const PRICING_SUMMARY = getPricingGuideSummary();

/* B42a (TECH-25): locked topology-apparatus callouts for the Home hero. */
const HOME_APPARATUS_CALLOUTS = [
  'AUDIT · 85,000 ETB · FIXED',
  'DELIVERY · 5 BUSINESS DAYS',
  'CREDIT · 100% TOWARD BUILD',
  'KICKOFF · 40%',
  'PILOT · 15–20% OFF',
];

const OPERATION_SIGNALS = [
  {
    title: 'Manual re-entry is everywhere',
    text: 'The same order, invoice, or update gets typed into three tools because nothing talks to anything else.',
    icon: 'refresh',
  },
  {
    title: 'Approvals depend on one person',
    text: 'Work stops when a founder, accountant, or operations lead is away from their inbox for a few hours.',
    icon: 'shield',
  },
  {
    title: 'Customer response speed is too slow',
    text: 'Leads wait, support queues grow, and quoting stays trapped inside ad hoc documents and chats.',
    icon: 'lightning',
  },
  {
    title: 'The next build is not clearly scoped',
    text: 'Teams know they need software, but not whether the real fix is AI automation, a web system, or a mobile flow.',
    icon: 'search',
  },
];

const IMPLEMENTATION_TRACKS = [
  {
    title: 'AI automation systems',
    price: 'from 250,000 ETB',
    text: 'Custom agents, document workflows, browser automation, and governed operating systems once the workflow is clear.',
    icon: 'settings',
    to: '/services',
  },
  {
    title: 'Web systems',
    price: 'from 45,000 ETB',
    text: 'Sites, portals, quote flows, dashboards, and internal tools that support a real commercial or operational process.',
    icon: 'globe',
    to: '/web-development',
  },
  {
    title: 'Mobile products',
    price: 'from 200,000 ETB',
    text: 'Field, approval, logistics, and customer-facing apps when the work needs to move with the team.',
    icon: 'mobile',
    to: '/mobile-development',
  },
];

const AUDIT_REASONS = [
  {
    title: 'It prevents the wrong build',
    text: 'A website, app, or automation layer only works when it is tied to the real operational problem instead of the loudest request in the room.',
    icon: 'search',
  },
  {
    title: 'It keeps pricing credible',
    text: 'We can quote from a real ETB anchor once we know what must be built and what can be left out.',
    icon: 'chart',
  },
  {
    title: 'It gives the team one shared view',
    text: 'The process owner, the founder, and the delivery team all leave with the same map instead of different assumptions.',
    icon: 'book',
  },
  {
    title: 'It turns vague interest into a decision',
    text: 'Build now, stage the work, or stop before money goes into the wrong system. The audit is designed to make that call clearly.',
    icon: 'idea',
  },
];

const OFFER_LADDER = [
  {
    stage: 'Start here',
    title: 'Workflow Audit',
    price: PRICING_SUMMARY.workflowAudit.price,
    detail: 'Delivered in 5 business days',
    note: 'We map the current process, surface the real blockers, and define the right implementation path before any build is sold.',
  },
  {
    stage: 'Then build the fix',
    title: 'AI automation',
    price: 'from 250,000 / 750,000 / 1,500,000+ ETB',
    detail: 'Custom agentic systems',
    note: 'Scope rises with integration depth, compliance requirements, and how much of the operation needs to run without manual supervision.',
  },
  {
    stage: 'Add the interface layer',
    title: 'Web and mobile delivery',
    price: 'Web from 45,000 ETB / Mobile from 200,000 ETB',
    detail: 'Sites, portals, dashboards, and apps',
    note: 'Used when the workflow also needs a customer-facing, field, or internal operating surface.',
  },
  {
    stage: 'Keep it stable',
    title: 'Support and maintenance',
    price: 'AI support 30,000 to 70,000 ETB / month / Web maintenance 5,000 to 15,000 ETB / month',
    detail: 'Only after scope is defined',
    note: 'Retainers are quoted from the live ETB table with written commitments instead of vague support promises.',
  },
];

const WHAT_WE_NEED = [
  'A walkthrough of the current workflow and where work stalls.',
  'Access to the tools, exports, or screenshots that show how the process actually runs today.',
  'The person who owns the process and the person who feels the pain when it breaks.',
  'Any deadlines, compliance constraints, or commercial targets that change the scope.',
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
      // Mirror failures must not block the visitor.
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
      <section className="hero ai-home-hero redesign-home-hero" id="hero" aria-labelledby="home-hero-title">
        <div className="container marquee-hero-grid">
          <div className="hero-copy">
            <ScrollReveal delay={0.08}>
              <div className="eyebrow">01 · ENTRY</div>
            </ScrollReveal>

            <h1 id="home-hero-title">
              <em className="verb">fix</em>&nbsp;the workflow before you commission the build.
            </h1>

            <ScrollReveal delay={0.16}>
              <p>
                Founder-led digital systems for Ethiopian operators. NovaTech starts with one paid first step:
                the Workflow Audit. It is a fixed 85,000 ETB engagement delivered in 5 business days. You leave
                with a clear map of the bottlenecks, the right implementation path, and the audit fee is credited
                if we build the system.
              </p>

              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" to="/workflow-audit">
                  Book Workflow Audit
                </Link>
                <Link className="btn btn-secondary btn-lg" to="/pricing">
                  View Live Pricing
                </Link>
              </div>

              <div className="hero-trust-row" aria-label="Workflow audit terms">
                <span className="trust-pill">85,000 ETB fixed</span>
                <span className="trust-pill">Delivered in 5 business days</span>
                <span className="trust-pill">Fee credited toward implementation</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <div className="hero-facts editorial-facts-panel" aria-label="Common workflow problems we audit first">
                <div className="hero-facts-label">What usually brings teams to us</div>
                <div className="editorial-note">The audit blueprint lands in 5 business days.</div>
                <ol className="hero-facts-list">
                  {OPERATION_SIGNALS.map((item, index) => (
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

          <div className="marquee-hero-side">
            <Apparatus
              type="topology"
              callouts={HOME_APPARATUS_CALLOUTS}
              label="Workflow audit apparatus: fixed audit, delivery in 5 business days, credit 100% toward build, kickoff 40%, pilot 15 to 20 percent off"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="AUDIT · 85,000 ETB · FIXED" labelRight="DELIVERY · 5 BUSINESS DAYS" />

      <section className="section" id="why-audit-first">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · WHY AUDIT"
              title="A premium site or automation stack is only useful when it fixes the real point of friction."
              subtitle="We do not start by selling a generic package. We start by understanding where work is delayed, duplicated, or left to chance."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid">
            {AUDIT_REASONS.map((item) => (
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

      <section className="section" id="audit-deliverables">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <div className="editorial-panel glass-card">
              <SectionHeader
                eyebrow="03 · DELIVERABLES"
                title="A practical blueprint, not a vague discovery summary."
                subtitle={PRICING_SUMMARY.workflowAudit.description}
                align="left"
              />

              <ul className="editorial-checklist">
                {PRICING_SUMMARY.workflowAudit.outputs.map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="editorial-panel glass-strong">
              <p className="editorial-kicker">What we need from you</p>
              <h3>A short list of inputs. That is all.</h3>
              <ul className="editorial-checklist">
                {WHAT_WE_NEED.map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="editorial-note">
                If you already know the build direction, you can use the instant quote tool. If the scope still feels
                fuzzy, start with the audit and we will define it properly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section band-dark band-1" id="implementation-tracks">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="04 · TRACKS"
              title="We build the system the audit proves you actually need."
              subtitle="The audit can lead into AI automation, a web operating layer, a mobile product, or a combination of them. SaaS stays waitlist-only until a real product exists."
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid editorial-card-grid-dark">
            {IMPLEMENTATION_TRACKS.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card glass-card editorial-track-card">
                  <div className="editorial-card-top">
                    <span className="ai-preview-icon" aria-hidden="true">
                      <IconGlyph name={item.icon} size={18} />
                    </span>
                    <div>
                      <p className="editorial-price-tag">{item.price}</p>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <p>{item.text}</p>
                  <Link className="editorial-inline-link" to={item.to}>
                    Explore this track
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="offer-ladder">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="05 · LADDER"
              title="The commercial path is simple on purpose."
              subtitle="One paid first step. Then the right implementation tier. Then the right level of support. No fake urgency, no hidden currency logic, and no live SaaS pricing where no live product exists."
              align="left"
            />
          </ScrollReveal>

          <div className="offer-ladder">
            {OFFER_LADDER.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="offer-ladder-row glass-card">
                  <div className="offer-ladder-stage">{item.stage}</div>
                  <div className="offer-ladder-main">
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                  </div>
                  <div className="offer-ladder-price">
                    <strong>{item.price}</strong>
                    <span>{item.detail}</span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <div className="editorial-note-panel glass-card">
              <strong>SaaS note:</strong> SaaS is waitlist only. We do not present it like a live paid offer until a real product exists and a truthful price can be published.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section ai-contact-section" id="contact">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="06 · CONTACT"
              title="Tell us where work breaks today."
              subtitle="If the bottleneck is obvious, we will tell you whether the Workflow Audit is the right first step or whether you already have enough clarity to scope a build."
              align="left"
            />
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal>
              <div className="contact-info-card glass-card editorial-contact-card">
                <p className="editorial-kicker">Direct contact</p>
                <h3>Prefer to speak first?</h3>
                <p>
                  Use the contact form, book the Workflow Audit, or reach us directly if you already know the process that is slowing the business down.
                </p>
                <ul className="editorial-contact-list">
                  <li>
                    <a href={`mailto:${SITE_CONTACT.email}`} onClick={() => trackContactChannelClick('email', 'home_contact_card')}>
                      {SITE_CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a href={SITE_CONTACT.phoneHref} onClick={() => trackContactChannelClick('phone', 'home_contact_card')}>
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <Link to="/workflow-audit">Review the Workflow Audit</Link>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="contact-form-card glass-card">
                <h3>Send us a message</h3>
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
                      placeholder="sara@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">What is breaking?</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Manual approvals, invoice re-entry, quoting delays, portal updates, customer follow-up, or the product build you are trying to scope."
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" disabled={contactStatus === 'sending'}>
                    {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  {contactStatus === 'sent' ? (
                    <p className="form-feedback sent" role="status" aria-live="polite">
                      Thanks. Your message was sent successfully and our team will respond within 24 hours.
                    </p>
                  ) : null}

                  {contactStatus === 'fallback' ? (
                    <p className="form-feedback sent" role="status" aria-live="polite">
                      Your message opened in your email client because the contact endpoint is unavailable right now.
                    </p>
                  ) : null}

                  {contactStatus === 'error' ? (
                    <p className="form-feedback error" role="status" aria-live="polite">
                      We could not send your message. Please try again or contact us directly.
                    </p>
                  ) : null}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
