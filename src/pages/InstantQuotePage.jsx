import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { quoteWizardOptions } from '../config/contentData';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { trackEvent } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

const SERVICE_TYPE_LABEL_KEYS = {
  'Web Development': 'instantQuote.options.service.web',
  'Mobile App Development': 'instantQuote.options.service.mobile',
  'SaaS Platform': 'instantQuote.options.service.saas',
  'AI Invoice Processing': 'instantQuote.options.service.invoiceProcessing',
  'Engineering Knowledge Assistant': 'instantQuote.options.service.engineeringKnowledge',
  'Sales Order Automation': 'instantQuote.options.service.salesOrderAutomation',
  'Branding and Additional Services': 'instantQuote.options.service.additional',
};

const BUDGET_LABEL_KEYS = {
  'Under 50k ETB': 'instantQuote.options.budget.under50',
  '50k - 120k ETB': 'instantQuote.options.budget.mid',
  '120k - 250k ETB': 'instantQuote.options.budget.high',
  '250k+ ETB': 'instantQuote.options.budget.enterprise',
};

const TIMELINE_LABEL_KEYS = {
  '2-4 weeks': 'instantQuote.options.timeline.fast',
  '1-2 months': 'instantQuote.options.timeline.standard',
  '2-4 months': 'instantQuote.options.timeline.extended',
  'Flexible timeline': 'instantQuote.options.timeline.flexible',
};

const INTEGRATION_LABEL_KEYS = {
  Telebirr: 'instantQuote.options.integrations.telebirr',
  Chapa: 'instantQuote.options.integrations.chapa',
  'CRM Sync': 'instantQuote.options.integrations.crm',
  'ERP/Accounting Sync': 'instantQuote.options.integrations.erpAccounting',
  'Inventory Sync': 'instantQuote.options.integrations.inventory',
  'Internal Knowledge Base': 'instantQuote.options.integrations.internalKnowledge',
  'Analytics Dashboard': 'instantQuote.options.integrations.analytics',
  'Multilingual Content': 'instantQuote.options.integrations.multilingual',
};

const STEP_LABELS = [
  { titleKey: 'instantQuote.progress.projectType', fallback: 'Project' },
  { titleKey: 'instantQuote.progress.budget', fallback: 'Budget' },
  { titleKey: 'instantQuote.progress.requirements', fallback: 'Details' },
  { titleKey: 'instantQuote.progress.contact', fallback: 'Contact' },
];

const INITIAL_STATE = {
  serviceType: quoteWizardOptions.serviceTypes[0],
  budgetRange: quoteWizardOptions.budgetRanges[1],
  timelineRange: quoteWizardOptions.timelineRanges[1],
  integrations: [],
  goals: '',
  name: '',
  email: '',
  phone: '',
};

const SERVICE_BASE_RANGES = {
  'Web Development': [35000, 90000],
  'Mobile App Development': [95000, 220000],
  'SaaS Platform': [140000, 320000],
  'AI Invoice Processing': [85000, 190000],
  'Engineering Knowledge Assistant': [120000, 280000],
  'Sales Order Automation': [95000, 240000],
  'Branding and Additional Services': [20000, 70000],
};

const BUDGET_MODIFIER = {
  'Under 50k ETB': 0.7,
  '50k - 120k ETB': 1,
  '120k - 250k ETB': 1.25,
  '250k+ ETB': 1.55,
};

function formatCurrency(value) {
  return `${Math.round(value).toLocaleString()} ETB`;
}

function calculateRange(formState) {
  const base = SERVICE_BASE_RANGES[formState.serviceType] || [40000, 100000];
  const modifier = BUDGET_MODIFIER[formState.budgetRange] || 1;
  const integrationLoad = formState.integrations.length * 0.06;

  const min = base[0] * modifier * (1 + integrationLoad);
  const max = base[1] * modifier * (1 + integrationLoad);

  return [min, max];
}

export default function InstantQuotePage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [formState, setFormState] = useState(INITIAL_STATE);

  const quoteRange = useMemo(() => calculateRange(formState), [formState]);

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

  const toggleIntegration = (integration) => {
    setFormState((current) => {
      const alreadyIncluded = current.integrations.includes(integration);
      return {
        ...current,
        integrations: alreadyIncluded
          ? current.integrations.filter((item) => item !== integration)
          : [...current.integrations, integration],
      };
    });

    if (submissionStatus === 'error') {
      setSubmissionStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const [minEstimate, maxEstimate] = quoteRange;
    setSubmissionStatus('submitting');

    const lead = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: `${formState.serviceType} | ${formState.budgetRange} | ${formState.timelineRange} | Integrations: ${formState.integrations.join(', ') || t('common.none', 'None')} | ${t('instantQuote.labels.projectGoals', 'Project goals')}: ${formState.goals}`,
    };

    const submission = await submitLeadIntake({
      type: 'instant_quote',
      source: 'instant_quote_wizard',
      channel: 'quote_wizard',
      routePath: '/instant-quote',
      lead,
      context: {
        serviceType: formState.serviceType,
        budgetRange: formState.budgetRange,
        timelineRange: formState.timelineRange,
        integrations: formState.integrations,
        goals: formState.goals,
        minEstimate: Math.round(minEstimate),
        maxEstimate: Math.round(maxEstimate),
      },
      consent: {
        type: 'quote_follow_up',
        copy: t('instantQuote.result.subtitle', 'This range is based on your selected scope, timeline, and integration complexity. Our team has queued a follow-up and can deliver a final proposal after a 30-minute discovery session.'),
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
        source: 'instant_quote_wizard_fallback',
        channel: 'quote_wizard',
        routePath: '/instant-quote',
        lead,
      });
    }

    trackEvent('instant_quote_submitted', {
      serviceType: formState.serviceType,
      budgetRange: formState.budgetRange,
      timelineRange: formState.timelineRange,
      minEstimate: Math.round(minEstimate),
      maxEstimate: Math.round(maxEstimate),
      delivery: submission.type,
    });

    trackEvent('instant_quote_outcome', {
      outcome: submission.type,
    });

    setSubmissionStatus(submission.type === 'local-fallback' ? 'fallback' : 'submitted');
    setSubmitted(true);
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, 3));
  const previousStep = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>{t('instantQuote.hero.title', 'Instant Quote Wizard')}</h1>
          <p>{t('instantQuote.hero.subtitle', 'Answer a few questions and get a working estimate range in under two minutes.')}</p>
        </div>
      </section>

      <section className="section quote-wizard-section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('instantQuote.header.tag', 'Fast Estimate')}
              title={t('instantQuote.header.title', 'Plan Scope, Budget, and Timeline')}
              subtitle={t('instantQuote.header.subtitle', 'This estimate is directional and helps us prepare the right architecture and proposal for your team.')}
            />
          </ScrollReveal>

          <div className="quote-step-indicator" aria-label={t('instantQuote.progressAria', 'Quote wizard progress')}>
            {STEP_LABELS.map((item, index) => (
              <span
                key={item.titleKey}
                className={`quote-step-dot ${step >= index ? 'active' : ''}`.trim()}
                aria-current={step === index ? 'step' : undefined}
              >
                <span className="quote-step-number">{index + 1}</span>
                <span className="quote-step-label">{t(item.titleKey, item.fallback)}</span>
              </span>
            ))}
          </div>

          {!submitted ? (
            <form className="quote-wizard-card glass-card" onSubmit={handleSubmit}>
              {step === 0 ? (
                <div className="quote-step">
                  <h3>{t('instantQuote.steps.projectType.title', 'Project Type')}</h3>
                  <p>{t('instantQuote.steps.projectType.subtitle', 'Select the primary service for this estimate.')}</p>
                  <div className="quote-option-grid">
                    {quoteWizardOptions.serviceTypes.map((serviceType) => (
                      <label key={serviceType} className={`quote-option ${formState.serviceType === serviceType ? 'selected' : ''}`.trim()}>
                        <input
                          type="radio"
                          name="serviceType"
                          value={serviceType}
                          checked={formState.serviceType === serviceType}
                          onChange={updateValue('serviceType')}
                        />
                        <span>{t(SERVICE_TYPE_LABEL_KEYS[serviceType], serviceType)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="quote-step">
                  <h3>{t('instantQuote.steps.budget.title', 'Budget and Timeline')}</h3>
                  <div className="quote-two-column">
                    <label>
                      {t('instantQuote.labels.budgetRange', 'Budget range')}
                      <select value={formState.budgetRange} onChange={updateValue('budgetRange')}>
                        {quoteWizardOptions.budgetRanges.map((range) => (
                          <option key={range} value={range}>{t(BUDGET_LABEL_KEYS[range], range)}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      {t('instantQuote.labels.deliveryTimeline', 'Delivery timeline')}
                      <select value={formState.timelineRange} onChange={updateValue('timelineRange')}>
                        {quoteWizardOptions.timelineRanges.map((range) => (
                          <option key={range} value={range}>{t(TIMELINE_LABEL_KEYS[range], range)}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="quote-step">
                  <h3>{t('instantQuote.steps.requirements.title', 'Technical Requirements')}</h3>
                  <p>{t('instantQuote.steps.requirements.subtitle', 'Choose integrations and notes that apply to your project.')}</p>
                  <div className="quote-option-grid">
                    {quoteWizardOptions.integrations.map((integration) => (
                      <label key={integration} className={`quote-option ${formState.integrations.includes(integration) ? 'selected' : ''}`.trim()}>
                        <input
                          type="checkbox"
                          checked={formState.integrations.includes(integration)}
                          onChange={() => toggleIntegration(integration)}
                        />
                        <span>{t(INTEGRATION_LABEL_KEYS[integration], integration)}</span>
                      </label>
                    ))}
                  </div>
                  <label>
                    {t('instantQuote.labels.projectGoals', 'Project goals')}
                    <textarea
                      value={formState.goals}
                      onChange={updateValue('goals')}
                      placeholder={t('instantQuote.labels.projectGoalsPlaceholder', 'Describe goals, priorities, and constraints.')}
                      rows={4}
                    />
                  </label>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="quote-step">
                  <h3>{t('instantQuote.steps.contact.title', 'Contact Details')}</h3>
                  <div className="quote-two-column">
                    <label>
                      {t('instantQuote.labels.fullName', 'Full name')}
                      <input type="text" value={formState.name} onChange={updateValue('name')} required />
                    </label>
                    <label>
                      {t('instantQuote.labels.workEmail', 'Work email')}
                      <input type="email" value={formState.email} onChange={updateValue('email')} required />
                    </label>
                  </div>
                  <label>
                    {t('instantQuote.labels.phoneOptional', 'Phone (optional)')}
                    <input type="text" value={formState.phone} onChange={updateValue('phone')} />
                  </label>
                </div>
              ) : null}

              <div className="quote-navigation">
                <button type="button" className="btn btn-secondary" onClick={previousStep} disabled={step === 0}>
                  {t('actions.previous', 'Previous')}
                </button>
                {step < 3 ? (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    {t('actions.continue', 'Continue')}
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled={submissionStatus === 'submitting'}>
                    {submissionStatus === 'submitting'
                      ? t('instantQuote.actions.generating', 'Generating...')
                      : t('instantQuote.actions.generate', 'Generate Estimate')}
                  </button>
                )}
              </div>
              {submissionStatus === 'error' ? (
                <p className="form-feedback error" role="status" aria-live="polite">
                  {t('instantQuote.result.error', 'We could not save your estimate request. Please verify your email and try again.')}
                </p>
              ) : null}
            </form>
          ) : (
            <div className="quote-result-card glass-card" role="status" aria-live="polite">
              <h3>{t('instantQuote.result.title', 'Your estimated range')}</h3>
              <p className="quote-result-range">{formatCurrency(quoteRange[0])} - {formatCurrency(quoteRange[1])}</p>
              <p>
                {submissionStatus === 'fallback'
                  ? t('instantQuote.result.fallback', 'This estimate was generated and saved locally because the intake endpoint is temporarily unavailable. Please book a discovery call or message us if this request is urgent.')
                  : t('instantQuote.result.subtitle', 'This range is based on your selected scope, timeline, and integration complexity. Our team has queued a follow-up and can deliver a final proposal after a 30-minute discovery session.')}
              </p>
              <div className="quote-result-actions">
                <Link className="btn btn-primary" to="/book-discovery-call">{t('actions.bookDiscoveryCall', 'Book Discovery Call')}</Link>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setSubmissionStatus('idle');
                  setFormState(INITIAL_STATE);
                }}>
                  {t('actions.startAgain', 'Start Again')}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
