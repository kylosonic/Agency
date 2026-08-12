import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import MarqueeStrip from '../components/MarqueeStrip';
import PriceCounter from '../components/PriceCounter';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import { SITE_CONTACT, buildProjectInquiryMailto } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { getPricingGuideSummary, QUOTE_ANCHORS } from '../services/pricingData';
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

/* TECH-36/37 (S-3): ladder and track prices render from the locked pricing
   data only — never hardcoded figures. SaaS uses the published first-tier
   monthly price from the locked table; web/mobile/AI use the ADR-003 numeric
   anchors; the AI ladder range is composed from the tier setup prices. */
const SAAS_ENTRY_PRICE = PRICING_SUMMARY.productEngineering.find(
  (item) => item.category === 'Management SaaS'
)?.price;

const SOFTWARE_LADDER_PRICE = `Web from ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB · Mobile from ${QUOTE_ANCHORS.mobile[0].toLocaleString()} ETB · SaaS from ${SAAS_ENTRY_PRICE}`;

const AI_LADDER_PRICE = `from ${PRICING_SUMMARY.automationTiers
  .map((tier) => tier.setupPrice.replace(/^from /, '').replace(/ ETB$/, ''))
  .join(' / ')} ETB`;

const PRICE_FROM_ANCHOR = (anchor) => `from ${anchor.toLocaleString()} ETB`;

/* B42a (TECH-25): locked topology-apparatus callouts for the Home hero. */
const HOME_APPARATUS_CALLOUTS = [
  'AUDIT · 15,000 ETB · FIXED',
  'DELIVERY · 5 BUSINESS DAYS',
  'CREDIT · 100% TOWARD BUILD',
  'KICKOFF · 40%',
  'BUNDLE · WEB+AI · 10% OFF',
];

const OPERATION_SIGNALS = [
  {
    title: 'Manual re-entry is everywhere',
    text: 'The same order is typed into three disconnected tools.',
    icon: 'refresh',
  },
  {
    title: 'Approvals depend on one person',
    text: 'Work stops when the owner is away.',
    icon: 'shield',
  },
  {
    title: 'Customer response speed is too slow',
    text: 'Leads wait; quoting is trapped in docs.',
    icon: 'lightning',
  },
  {
    title: 'The next build is not clearly scoped',
    text: 'Teams need software but not which build.',
    icon: 'search',
  },
];

/* TECH-36 (S-1): software tracks (web → mobile → SaaS) render before AI on
   every track surface; AI stays the named second track. */
const IMPLEMENTATION_TRACKS = [
  {
    title: 'Web systems',
    price: PRICE_FROM_ANCHOR(QUOTE_ANCHORS.web[0]),
    text: 'Sites, portals, quote flows, and internal tools for a real commercial process.',
    icon: 'globe',
    to: '/web-development',
  },
  {
    title: 'Mobile products',
    price: PRICE_FROM_ANCHOR(QUOTE_ANCHORS.mobile[0]),
    text: 'Field, approval, and customer-facing apps that move with the team.',
    icon: 'mobile',
    to: '/mobile-development',
  },
  {
    title: 'SaaS platforms',
    price: `from ${SAAS_ENTRY_PRICE}`,
    text: 'Live subscription systems for schools, clinics, and real estate operators.',
    icon: 'cloud',
    to: '/saas-solutions',
  },
  {
    title: 'AI automation systems',
    price: PRICE_FROM_ANCHOR(QUOTE_ANCHORS.ai[0]),
    text: 'Custom agents, document workflows, browser automation, and governed systems.',
    icon: 'settings',
    to: '/services',
  },
];

const AUDIT_REASONS = [
  {
    title: 'Prevents the wrong build',
    text: 'Software works when tied to the real problem.',
    icon: 'search',
  },
  {
    title: 'Keeps pricing credible',
    text: 'Quotes need knowing what to build and leave out.',
    icon: 'chart',
  },
  {
    title: 'Gives everyone one shared view',
    text: 'Owner, founder, and team share one map.',
    icon: 'book',
  },
  {
    title: 'Turns vague interest into a decision',
    text: 'Build now, stage it, or stop early.',
    icon: 'idea',
  },
];

/* TECH-37 (S-3): exactly 4 rows — Audit → Software development → AI
   automation → Support. Both build rows render through the same ladder card
   treatment (equal weight); prices come from the locked data sources. */
const OFFER_LADDER = [
  {
    stage: 'Start here',
    title: 'Workflow Audit',
    price: PRICING_SUMMARY.workflowAudit.price,
    detail: '5-day delivery',
    note: 'We map the current process and define the right build path.',
  },
  {
    stage: 'Software development',
    title: 'Software development',
    price: SOFTWARE_LADDER_PRICE,
    detail: 'Sites, portals, dashboards, apps, and SaaS platforms',
    note: 'Web, mobile, and SaaS scoped from the live ETB table.',
  },
  {
    stage: 'AI automation',
    title: 'AI automation',
    price: AI_LADDER_PRICE,
    detail: 'Custom agentic systems',
    note: 'Scope rises with integration depth, compliance needs, and how much runs without supervision.',
  },
  {
    stage: 'Keep it stable',
    title: 'Support and maintenance',
    price: 'AI support 10,000 – 25,000 ETB / month / Web maintenance 8,000 – 20,000 ETB / year',
    detail: 'After scope is defined',
    note: 'Quoted from the live ETB table with written commitments.',
  },
];

const WHAT_WE_NEED = [
  'A walkthrough of the current workflow.',
  'Access to the tools and exports that show how it runs today.',
  'The process owner and the person who feels the pain.',
  'Deadlines, compliance, or commercial targets that change scope.',
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
            {/* M-1 (TECH-33): one choreographed hero reveal — eyebrow →
                headline → subcopy → CTA row → trust row → facts panel, each
                150ms apart, all settling ≤ 1.2s. EN headline per-word stagger;
                AM/OM one block via :lang overrides. */}
            <HeroChoreo>
              <div className="eyebrow">01 · ENTRY</div>

              <HeroChoreoHeadline id="home-hero-title">
                <em className="verb">fix</em>&nbsp;the workflow before you commission the build.
              </HeroChoreoHeadline>

              {/* TECH-37 (A2): software-first hero subcopy, <=2 sentences. */}
              <p>
                Software systems — web, mobile, and SaaS — with AI automation where it solves a real
                bottleneck. Start with one paid first step: the Workflow Audit.
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
                <span className="trust-pill">15,000 ETB fixed</span>
                <span className="trust-pill">Delivered in 5 business days</span>
                <span className="trust-pill">100% credited toward implementation</span>
              </div>

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
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="topology"
              callouts={HOME_APPARATUS_CALLOUTS}
              label="Workflow audit apparatus: fixed audit, delivery in 5 business days, credit 100% toward build, kickoff 40%, bundle web plus AI 10 percent off"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="AUDIT · 15,000 ETB · FIXED" labelRight="DELIVERY · 5 BUSINESS DAYS" />

      {/* M-5 (TECH-33): exactly ONE marquee on the site — below the hero, after
          the meter strip (never duplicating its position). Content is locked
          P-1 figures/discount strings only (G-5). */}
      <MarqueeStrip
        items={[
          'AUDIT 15,000 ETB',
          'WEB FROM 20,000 ETB',
          'MOBILE FROM 40,000 ETB',
          'AI FROM 40,000 ETB',
          '3 MONTHS FREE MAINTENANCE',
          'SAVE 2 MONTHS ANNUAL',
        ]}
      />

      <section className="section" id="why-audit-first">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · WHY AUDIT"
              title="Software only helps when it fixes the real friction."
              subtitle="We find where work is delayed, duplicated, or left to chance before selling anything."
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
              <p className="editorial-kicker">What we need</p>
              <h3>A short list of inputs.</h3>
              <ul className="editorial-checklist">
                {WHAT_WE_NEED.map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="editorial-note">
                Know the build? Use the instant quote tool. Unsure? Start with the audit.
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
              title="We build what the audit proves you need."
              subtitle="The audit leads into AI, web, mobile, or a combination."
              align="left"
            />
          </ScrollReveal>

          {/* B43 (TECH-26): implementation tracks as ruled receipt rows with real
              DOM mono numerals 01–03 and mono tabular prices (locked figures). */}
          <div className="editorial-card-grid editorial-card-grid-dark receipt-stack">
            {IMPLEMENTATION_TRACKS.map((item, index) => (
              <ScrollReveal key={item.title}>
                <article className="editorial-card editorial-track-card home-track-card">
                  <span className="receipt-row__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="home-track-card__body">
                    <p className="editorial-price-tag">{item.price}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Link className="editorial-inline-link" to={item.to}>
                      Explore this track
                    </Link>
                  </div>
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
              subtitle="One paid first step, then the right tier, then support."
              align="left"
            />
          </ScrollReveal>

          <div className="offer-ladder">
            {OFFER_LADDER.map((item) => (
              <ScrollReveal key={item.title}>
                <article className="offer-ladder-row">
                  <div className="offer-ladder-stage">{item.stage}</div>
                  <div className="offer-ladder-main">
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                  </div>
                  <div className="offer-ladder-price">
                    {/* M-4 (TECH-33): single figures count 0 → value once on
                        viewport entry; ranges/multi-figure strings render static
                        (resolution A4). Lands exactly on the locked figure (G-5). */}
                    <strong><PriceCounter value={item.price} /></strong>
                    <span>{item.detail}</span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section ai-contact-section" id="contact">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="06 · CONTACT"
              title="Tell us where work breaks."
              subtitle="We will tell you whether the audit or a scoped build comes first."
              align="left"
            />
          </ScrollReveal>

          <div className="contact-grid">
            <ScrollReveal>
              <div className="contact-info-card glass-card editorial-contact-card">
                <p className="editorial-kicker">Direct contact</p>
                <h3>Prefer to speak first?</h3>
                <p>Message us, book the audit, or reach out directly.</p>
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

            {/* TECH-29 (D2): the contact form is a form surface — it renders
                stable immediately so submit controls settle before the user
                (or the E2E click) reaches them. The rest of the marketing
                page keeps B47 calm motion. */}
            <ScrollReveal static>
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
