import { useState } from 'react';
import IconGlyph from './IconGlyph';
import { submitContactInquiry } from '../services/contactService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { buildProjectInquiryMailto } from '../config/siteConfig';
import {
  trackContactFormAttempt,
  trackContactFormOutcome,
} from '../services/analyticsService';

/**
 * TECH-39 (NB-43 / C-2, C-3, A1, A6): Workflow Audit booking form.
 *
 * - Fields: Full Name / Email / Phone / Company (optional) — A6 field set.
 * - Submission rail mirrors the Home contact form exactly: durable mirror
 *   (submitLeadIntake) + primary email rail (submitContactInquiry) +
 *   follow-up queue; on endpoint failure the mailto fallback carries the SAME
 *   content so a booking never silently vanishes (C-2).
 * - Duplicate guard (C-2 edge case): same email within 48h shows the
 *   confirmation state instead of re-submitting (localStorage TTL).
 * - Confirmation copy family (A6/A1): "Slot held for 48 hours", invoice +
 *   bank transfer (CBE Birr) by email, "Telebirr when activated" — NEVER a
 *   live-Telebirr claim — human confirmation within 1 business day, and the
 *   risk-reversal guarantee (C-3). No payment/checkout UI anywhere.
 * - Copy is hardcoded EN matching the audit page pattern (pages are hardcoded
 *   EN; nav/footer/modal use i18n). New strings flagged NB-09 in
 *   src/i18n/translations.js.
 */
const INITIAL_FORM = { name: '', email: '', phone: '', company: '' };

const DEDUPE_KEY_PREFIX = 'novatech-audit-booking:';
const DEDUPE_TTL_MS = 48 * 60 * 60 * 1000;

function dedupeKey(email) {
  return `${DEDUPE_KEY_PREFIX}${String(email || '').trim().toLowerCase()}`;
}

function hasRecentBooking(email) {
  if (typeof window === 'undefined') {
    return false;
  }

  const raw = window.localStorage.getItem(dedupeKey(email));
  if (!raw) {
    return false;
  }

  const submittedAt = Number(raw);
  return Number.isFinite(submittedAt) && Date.now() - submittedAt < DEDUPE_TTL_MS;
}

function markBooking(email) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(dedupeKey(email), String(Date.now()));
}

export default function AuditBookingForm() {
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
    setStatus('submitting');

    if (hasRecentBooking(form.email)) {
      // C-2 edge case: same email within 48h must not double-book.
      setStatus('confirmed');
      return;
    }

    trackContactFormAttempt('workflow_audit_booking');

    const lead = {
      name: form.name,
      email: form.email,
      message: `Workflow Audit booking — Phone: ${form.phone || 'not provided'} · Company: ${form.company || 'not provided'}`,
    };

    submitLeadIntake({
      type: 'workflow_audit_booking',
      source: 'workflow_audit_booking',
      channel: 'booking_form',
      routePath: '/workflow-audit',
      lead,
      context: {
        delivery: 'durable_mirror',
        slotHoldHours: 48,
      },
      consent: {
        type: 'workflow_audit_booking_mirror',
        capturedAt: new Date().toISOString(),
        copy: 'Durable mirror of the workflow audit booking submission.',
      },
    }).catch(() => {
      // Mirror failures must not block the visitor.
    });

    const submission = await submitContactInquiry(lead);

    if (submission.ok) {
      markBooking(form.email);
      setStatus('confirmed');
      setForm(INITIAL_FORM);
      queueLeadFollowups({
        source: 'workflow_audit_booking',
        channel: 'booking_form',
        routePath: '/workflow-audit',
        lead: submission.payload,
      });
      trackContactFormOutcome('submitted', 'workflow_audit_booking');
      return;
    }

    if (['unconfigured', 'request-failed', 'timeout', 'network-error'].includes(submission.type)) {
      queueLeadFollowups({
        source: 'workflow_audit_booking_fallback',
        channel: 'booking_form_mailto',
        routePath: '/workflow-audit',
        lead: submission.payload || lead,
      });
      if (typeof window !== 'undefined') {
        window.location.assign(buildProjectInquiryMailto(submission.payload || lead));
      }
      setStatus('fallback');
      setForm(INITIAL_FORM);
      trackContactFormOutcome('fallback_mailto', 'workflow_audit_booking', submission.type);
      return;
    }

    setStatus('error');
    trackContactFormOutcome('failed', 'workflow_audit_booking', submission.type);
  };

  if (status === 'confirmed' || status === 'fallback') {
    return (
      <div className="quote-result-card glass-card" role="status" aria-live="polite">
        <div className="modal-success-icon" aria-hidden="true">
          <IconGlyph name="check" size={30} />
        </div>
        <h3>Slot held for 48 hours</h3>
        <p>
          Your invoice and bank transfer (CBE Birr) details arrive by email. Telebirr when activated.
        </p>
        <p>Human confirmation within 1 business day.</p>
        <p>
          If the audit doesn&apos;t produce a usable blueprint, you don&apos;t pay.
        </p>
        {status === 'fallback' ? (
          <p className="form-feedback sent" role="note">
            Your booking details opened in your email client because the booking endpoint is unavailable right now.
          </p>
        ) : null}
        <p className="editorial-note">No payment step on this page — the invoice arrives by email with bank transfer details.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="audit-booking-name">Full Name</label>
        <input
          id="audit-booking-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Sara Tesfaye"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="audit-booking-email">Email Address</label>
        <input
          id="audit-booking-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="sara@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="audit-booking-phone">Phone</label>
        <input
          id="audit-booking-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+251 9xx xxx xxx"
        />
      </div>

      <div className="form-group">
        <label htmlFor="audit-booking-company">Company (optional)</label>
        <input
          id="audit-booking-company"
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Mesob Trading PLC"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Booking...' : 'Book Workflow Audit'}
      </button>

      <p className="editorial-note">
        If the audit doesn&apos;t produce a usable blueprint, you don&apos;t pay.
      </p>

      {status === 'error' ? (
        <p className="form-feedback error" role="status" aria-live="polite">
          We could not save your booking. Please verify your email and try again.
        </p>
      ) : null}
    </form>
  );
}
