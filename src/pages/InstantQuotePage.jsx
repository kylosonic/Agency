import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { quoteWizardOptions } from '../config/contentData';
import { deriveEstimateBand } from '../services/pricingData';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { trackEvent } from '../services/analyticsService';

const SERVICE_OPTIONS = [
  {
    value: 'Web Development',
    label: 'Web system',
    note: 'Sites, portals, dashboards, and quote flows.',
  },
  {
    value: 'Mobile App Development',
    label: 'Mobile product',
    note: 'Field operations, approvals, customer flows, and apps.',
  },
  {
    value: 'AI Invoice Processing',
    label: 'AI automation',
    note: 'Document, process, and back-office workflow automation.',
  },
  {
    value: 'Engineering Knowledge Assistant',
    label: 'Knowledge assistant',
    note: 'Internal search, retrieval, and governed business knowledge.',
  },
  {
    value: 'Sales Order Automation',
    label: 'Revenue workflow automation',
    note: 'Lead, quote, order, and fulfillment automation.',
  },
  {
    value: 'SaaS Platform',
    label: 'Future SaaS interest',
    note: 'Waitlist only. No live pricing is published.',
  },
];

const INITIAL_STATE = {
  serviceType: 'Web Development',
  budgetRange: quoteWizardOptions.budgetRanges[1],
  timelineRange: quoteWizardOptions.timelineRanges[1],
  goals: '',
  name: '',
  email: '',
  phone: '',
};

function formatCurrency(value) {
  return `${Math.round(value).toLocaleString()} ETB`;
}

export default function InstantQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [formState, setFormState] = useState(INITIAL_STATE);

  const estimateBand = useMemo(() => deriveEstimateBand(formState), [formState]);
  const quoteRange = estimateBand ? [estimateBand.min, estimateBand.max] : null;

  const updateValue = (field) => (event) => {
    const value = event.target.value;
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    if (submissionStatus === 'error') {
      setSubmissionStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionStatus('submitting');

    const lead = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: `${formState.serviceType} | ${formState.budgetRange} | ${formState.timelineRange} | Notes: ${formState.goals}`,
    };

    const submission = await submitLeadIntake({
      type: 'instant_quote',
      source: 'instant_quote_form',
      channel: 'quote_form',
      routePath: '/instant-quote',
      lead,
      context: {
        serviceType: formState.serviceType,
        budgetRange: formState.budgetRange,
        timelineRange: formState.timelineRange,
        goals: formState.goals,
        ...(quoteRange
          ? {
              minEstimate: Math.round(quoteRange[0]),
              maxEstimate: Math.round(quoteRange[1]),
            }
          : {}),
      },
      consent: {
        type: 'quote_follow_up',
        copy: 'We use this information to prepare a directional estimate and the right next conversation.',
      },
    });

    if (!submission.ok) {
      setSubmissionStatus('error');
      trackEvent('instant_quote_outcome', {
        outcome: submission.type,
      });
      return;
    }

    if (submission.type === 'local-fallback') {
      queueLeadFollowups({
        source: 'instant_quote_form_fallback',
        channel: 'quote_form',
        routePath: '/instant-quote',
        lead,
      });
    }

    trackEvent('instant_quote_submitted', {
      serviceType: formState.serviceType,
      budgetRange: formState.budgetRange,
      timelineRange: formState.timelineRange,
      ...(quoteRange
        ? {
            minEstimate: Math.round(quoteRange[0]),
            maxEstimate: Math.round(quoteRange[1]),
          }
        : {}),
      delivery: submission.type,
    });

    trackEvent('instant_quote_outcome', {
      outcome: submission.type,
    });

    setSubmissionStatus(submission.type === 'local-fallback' ? 'fallback' : 'submitted');
    setSubmitted(true);
  };

  const selectedService = SERVICE_OPTIONS.find((item) => item.value === formState.serviceType) || SERVICE_OPTIONS[0];

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="eyebrow">01 · QUOTE</div>
          <h1>
            <em className="verb">get</em>&nbsp;a working range without a long intake flow.
          </h1>
          <p>
            Use this form when you already have a direction and want a fast estimate. If you are still unsure what should be built first, stop here and book the Workflow Audit instead.
          </p>
          <div className="page-hero-meta" aria-label="Instant quote process notes">
            <span className="page-hero-chip">Directional ETB estimate</span>
            <span className="page-hero-chip">SaaS is waitlist only</span>
            <span className="page-hero-chip">Workflow Audit recommended when scope is unclear</span>
          </div>
        </div>
      </section>

      <section className="section quote-wizard-section band-dark band-1">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="02 · FAST ESTIMATE"
              title="A simpler quote path"
              subtitle="Choose the project type, budget band, timeline, and key notes. We will use that to prepare the right follow-up instead of forcing a long questionnaire."
            />
          </ScrollReveal>

          {!submitted ? (
            <div className="editorial-two-column quote-redesign-layout">
              <ScrollReveal>
                <form className="editorial-panel glass-card quote-form-redesign" onSubmit={handleSubmit}>
                  <h3>Project details</h3>
                  <div className="quote-option-grid">
                    {SERVICE_OPTIONS.map((service) => (
                      <label key={service.value} className={`quote-option ${formState.serviceType === service.value ? 'selected' : ''}`.trim()}>
                        <input
                          type="radio"
                          name="serviceType"
                          value={service.value}
                          checked={formState.serviceType === service.value}
                          onChange={updateValue('serviceType')}
                        />
                        <span>{service.label}</span>
                        <span className="quote-option-note">{service.note}</span>
                      </label>
                    ))}
                  </div>

                  <div className="quote-two-column">
                    <label>
                      Budget range
                      <select value={formState.budgetRange} onChange={updateValue('budgetRange')}>
                        {quoteWizardOptions.budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Timeline
                      <select value={formState.timelineRange} onChange={updateValue('timelineRange')}>
                        {quoteWizardOptions.timelineRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label>
                    Key notes
                    <textarea
                      value={formState.goals}
                      onChange={updateValue('goals')}
                      placeholder="What are you trying to fix, launch, or replace? Mention important constraints or systems if they matter."
                      rows={4}
                    />
                  </label>

                  <div className="quote-two-column">
                    <label>
                      Full name
                      <input type="text" value={formState.name} onChange={updateValue('name')} required />
                    </label>
                    <label>
                      Work email
                      <input type="email" value={formState.email} onChange={updateValue('email')} required />
                    </label>
                  </div>

                  <label>
                    Phone (optional)
                    <input type="text" value={formState.phone} onChange={updateValue('phone')} />
                  </label>

                  <button type="submit" className="btn btn-primary btn-lg" disabled={submissionStatus === 'submitting'}>
                    {submissionStatus === 'submitting' ? 'Sending...' : 'Send Estimate Request'}
                  </button>

                  {submissionStatus === 'error' ? (
                    <p className="form-feedback error" role="status" aria-live="polite">
                      We could not save your estimate request. Please verify your email and try again.
                    </p>
                  ) : null}
                </form>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="editorial-panel glass-strong quote-preview-panel">
                  <p className="editorial-kicker">Live preview</p>
                  <h3>{selectedService.label}</h3>
                  <p>{selectedService.note}</p>

                  {quoteRange ? (
                    <>
                      <p className="editorial-hero-price">{formatCurrency(quoteRange[0])} - {formatCurrency(quoteRange[1])}</p>
                      <p>
                        This is a directional estimate based on the current service and budget band. We use 85,000 ETB as the floor and then scope upward from the locked pricing table.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="editorial-hero-price">Waitlist only</p>
                      <p>
                        SaaS is not quoted like a live paid offer. We will capture interest and only publish pricing when a real product exists.
                      </p>
                    </>
                  )}

                  <div className="editorial-note-panel glass">
                    <strong>Not sure yet?</strong> The Workflow Audit is the better first step when the build direction is still unclear.
                  </div>
                  <div className="cta-actions quote-side-actions">
                    <Link className="btn btn-secondary" to="/workflow-audit">
                      Review Workflow Audit
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ) : quoteRange ? (
            <div className="quote-result-card glass-card" role="status" aria-live="polite">
              <h3>Your estimated range</h3>
              <p className="quote-result-range">{formatCurrency(quoteRange[0])} - {formatCurrency(quoteRange[1])}</p>
              <p>
                {submissionStatus === 'fallback'
                  ? 'This estimate was generated and saved locally because the intake endpoint is temporarily unavailable. Please book a discovery call if the request is urgent.'
                  : 'We will follow up with a written proposal path after reviewing your notes. If the details show that the workflow is still fuzzy, we may recommend the Workflow Audit before a direct build quote.'}
              </p>
              <div className="quote-result-actions">
                <Link className="btn btn-primary" to="/book-discovery-call">Book Discovery Call</Link>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionStatus('idle');
                    setFormState(INITIAL_STATE);
                  }}
                >
                  Start Again
                </button>
              </div>
            </div>
          ) : (
            <div className="quote-result-card glass-card" role="status" aria-live="polite">
              <h3>SaaS is in development — tell us you want it</h3>
              <p>
                We will add you to the waitlist and contact you when a product is ready for your organization. No prices are published until a real product exists.
              </p>
              <div className="quote-result-actions">
                <Link className="btn btn-primary" to="/book-discovery-call">Book Discovery Call</Link>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionStatus('idle');
                    setFormState(INITIAL_STATE);
                  }}
                >
                  Start Again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
