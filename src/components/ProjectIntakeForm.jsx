import { useState } from 'react';
import { submitContactInquiry } from '../services/contactService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { buildProjectInquiryMailto } from '../config/siteConfig';
import { QUOTE_BUDGET_BANDS } from '../services/pricingData';
import { useLanguage } from '../i18n/useLanguage';
import {
  trackContactFormAttempt,
  trackContactFormOutcome,
} from '../services/analyticsService';

/**
 * TECH-46 (NB-46 / R-7): inline project-intake form (#project-intake on Home).
 *
 * Fields (R-7): Full name (req) / Email (req) / Phone (req) / Company (opt) /
 * What do you need? (select, req — incl. "Not sure yet") / Budget band
 * (select, opt — QUOTE_BUDGET_BANDS + "Not sure") / What's the problem or
 * idea? (textarea, req).
 *
 * Submission rail mirrors AuditBookingForm exactly: durable mirror
 * (submitLeadIntake, type `project_intake`, context carries need + budget
 * band) → primary email rail (submitContactInquiry) → follow-up queue; on
 * endpoint failure the mailto fallback carries the SAME content so a request
 * never silently vanishes (R-7). Analytics reuse trackContactFormAttempt /
 * trackContactFormOutcome with source `project_intake` (no new events).
 *
 * Confirmation copy (R-7): "Your project request was received. We'll respond
 * within 1 business day with next steps." Status states: sending / sent /
 * fallback / error. Copy resolves through useLanguage with EN fallbacks.
 */
const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  need: '',
  budgetBand: '',
  message: '',
};

const NEED_OPTIONS = [
  'Website',
  'Web application',
  'Mobile app',
  'Business system',
  'SaaS product',
  'AI & automation',
  'Not sure yet',
];

export default function ProjectIntakeForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    trackContactFormAttempt('project_intake');

    const need = form.need || 'Not sure yet';
    const budgetBand = form.budgetBand || 'Not sure';

    const lead = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      message: `Need: ${need} · Budget: ${budgetBand} · Phone: ${form.phone || 'not provided'} · Company: ${form.company || 'not provided'}\n\n${form.message}`,
    };

    submitLeadIntake({
      type: 'project_intake',
      source: 'project_intake',
      channel: 'intake_form',
      routePath: '/',
      lead,
      context: {
        delivery: 'durable_mirror',
        need,
        budgetBand,
      },
      consent: {
        type: 'project_intake_mirror',
        capturedAt: new Date().toISOString(),
        copy: 'Durable mirror of the homepage project intake submission.',
      },
    }).catch(() => {
      // Mirror failures must not block the visitor.
    });

    const submission = await submitContactInquiry(lead);

    if (submission.ok) {
      setStatus('sent');
      setForm(INITIAL_FORM);
      queueLeadFollowups({
        source: 'project_intake',
        channel: 'intake_form',
        routePath: '/',
        lead: submission.payload,
      });
      trackContactFormOutcome('submitted', 'project_intake');
      return;
    }

    if (['unconfigured', 'request-failed', 'timeout', 'network-error'].includes(submission.type)) {
      queueLeadFollowups({
        source: 'project_intake_fallback',
        channel: 'intake_form_mailto',
        routePath: '/',
        lead: submission.payload || lead,
      });
      if (typeof window !== 'undefined') {
        window.location.assign(buildProjectInquiryMailto(submission.payload || lead));
      }
      setStatus('fallback');
      setForm(INITIAL_FORM);
      trackContactFormOutcome('fallback_mailto', 'project_intake', submission.type);
      return;
    }

    setStatus('error');
    trackContactFormOutcome('failed', 'project_intake', submission.type);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label={t('home.intake.form.aria', 'Project intake form')}>
      <div className="form-group">
        <label htmlFor="project-intake-name">{t('home.intake.form.fullName', 'Full name')}</label>
        <input
          id="project-intake-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t('home.intake.form.fullNamePlaceholder', 'Sara Tesfaye')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-intake-email">{t('home.intake.form.email', 'Email address')}</label>
        <input
          id="project-intake-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t('home.intake.form.emailPlaceholder', 'sara@example.com')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-intake-phone">{t('home.intake.form.phone', 'Phone')}</label>
        <input
          id="project-intake-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t('home.intake.form.phonePlaceholder', '+251 9xx xxx xxx')}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-intake-company">{t('home.intake.form.company', 'Company (optional)')}</label>
        <input
          id="project-intake-company"
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder={t('home.intake.form.companyPlaceholder', 'Mesob Trading PLC')}
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-intake-need">{t('home.intake.form.need', 'What do you need?')}</label>
        <select id="project-intake-need" name="need" value={form.need} onChange={handleChange} required>
          <option value="" disabled>{t('home.intake.form.needPlaceholder', 'Select an option')}</option>
          {NEED_OPTIONS.map((option) => (
            <option key={option} value={option}>{t(`home.intake.form.needOptions.${option.replace(/[^a-zA-Z]/g, '')}`, option)}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="project-intake-budget">{t('home.intake.form.budget', 'Budget band')}</label>
        <select id="project-intake-budget" name="budgetBand" value={form.budgetBand} onChange={handleChange}>
          <option value="" disabled>{t('home.intake.form.budgetPlaceholder', 'Select a band')}</option>
          {QUOTE_BUDGET_BANDS.map((band) => (
            <option key={band} value={band}>{band}</option>
          ))}
          <option value="Not sure">{t('home.intake.form.notSureBudget', 'Not sure')}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="project-intake-message">{t('home.intake.form.problem', "What's the problem or idea?")}</label>
        <textarea
          id="project-intake-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={t('home.intake.form.problemPlaceholder', 'Manual approvals, inventory chaos, a new product, or the system you need to replace.')}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
        {status === 'sending'
          ? t('home.intake.form.sending', 'Sending...')
          : t('home.intake.form.submit', 'Start a Project')}
      </button>

      {status === 'sent' ? (
        <p className="form-feedback sent" role="status" aria-live="polite">
          {t('home.intake.confirmation', "Your project request was received. We'll respond within 1 business day with next steps.")}
        </p>
      ) : null}

      {status === 'fallback' ? (
        <p className="form-feedback sent" role="status" aria-live="polite">
          {t('home.intake.confirmation', "Your project request was received. We'll respond within 1 business day with next steps.")}
          {' '}
          {t('home.intake.fallbackNote', 'Your request opened in your email client because the contact endpoint is unavailable right now.')}
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="form-feedback error" role="status" aria-live="polite">
          {t('home.intake.form.error', 'We could not save your request. Please verify your details and try again.')}
        </p>
      ) : null}
    </form>
  );
}
