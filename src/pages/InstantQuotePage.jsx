import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { quoteWizardOptions } from '../config/contentData';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { trackEvent } from '../services/analyticsService';

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
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState(INITIAL_STATE);

  const quoteRange = useMemo(() => calculateRange(formState), [formState]);

  const updateValue = (field) => (event) => {
    const value = event.target.value;
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const [minEstimate, maxEstimate] = quoteRange;

    queueLeadFollowups({
      source: 'instant_quote_wizard',
      channel: 'quote_wizard',
      routePath: '/instant-quote',
      lead: {
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: `${formState.serviceType} | ${formState.budgetRange} | ${formState.timelineRange} | Integrations: ${formState.integrations.join(', ') || 'None'} | Goals: ${formState.goals}`,
      },
    });

    trackEvent('instant_quote_submitted', {
      serviceType: formState.serviceType,
      budgetRange: formState.budgetRange,
      timelineRange: formState.timelineRange,
      minEstimate: Math.round(minEstimate),
      maxEstimate: Math.round(maxEstimate),
    });

    setSubmitted(true);
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, 3));
  const previousStep = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>Instant Quote Wizard</h1>
          <p>Answer a few questions and get a working estimate range in under two minutes.</p>
        </div>
      </section>

      <section className="section quote-wizard-section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Fast Estimate"
              title="Plan Scope, Budget, and Timeline"
              subtitle="This estimate is directional and helps us prepare the right architecture and proposal for your team."
            />
          </ScrollReveal>

          <div className="quote-step-indicator" aria-label="Quote wizard progress">
            {[1, 2, 3, 4].map((index) => (
              <span key={index} className={`quote-step-dot ${step >= index - 1 ? 'active' : ''}`.trim()}>
                {index}
              </span>
            ))}
          </div>

          {!submitted ? (
            <form className="quote-wizard-card glass-card" onSubmit={handleSubmit}>
              {step === 0 ? (
                <div className="quote-step">
                  <h3>Project Type</h3>
                  <p>Select the primary service for this estimate.</p>
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
                        <span>{serviceType}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="quote-step">
                  <h3>Budget and Timeline</h3>
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
                      Delivery timeline
                      <select value={formState.timelineRange} onChange={updateValue('timelineRange')}>
                        {quoteWizardOptions.timelineRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="quote-step">
                  <h3>Technical Requirements</h3>
                  <p>Choose integrations and notes that apply to your project.</p>
                  <div className="quote-option-grid">
                    {quoteWizardOptions.integrations.map((integration) => (
                      <label key={integration} className={`quote-option ${formState.integrations.includes(integration) ? 'selected' : ''}`.trim()}>
                        <input
                          type="checkbox"
                          checked={formState.integrations.includes(integration)}
                          onChange={() => toggleIntegration(integration)}
                        />
                        <span>{integration}</span>
                      </label>
                    ))}
                  </div>
                  <label>
                    Project goals
                    <textarea
                      value={formState.goals}
                      onChange={updateValue('goals')}
                      placeholder="Describe goals, priorities, and constraints."
                      rows={4}
                    />
                  </label>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="quote-step">
                  <h3>Contact Details</h3>
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
                </div>
              ) : null}

              <div className="quote-navigation">
                <button type="button" className="btn btn-secondary" onClick={previousStep} disabled={step === 0}>
                  Previous
                </button>
                {step < 3 ? (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Generate Estimate
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="quote-result-card glass-card" role="status" aria-live="polite">
              <h3>Your estimated range</h3>
              <p className="quote-result-range">{formatCurrency(quoteRange[0])} - {formatCurrency(quoteRange[1])}</p>
              <p>
                This range is based on your selected scope, timeline, and integration complexity. Our team has queued a follow-up and can deliver a final proposal after a 30-minute discovery session.
              </p>
              <div className="quote-result-actions">
                <Link className="btn btn-primary" to="/book-discovery-call">Book Discovery Call</Link>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setFormState(INITIAL_STATE);
                }}>
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
