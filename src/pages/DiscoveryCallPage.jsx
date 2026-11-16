import { useMemo, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import IconGlyph from '../components/IconGlyph';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { submitLeadIntake } from '../services/leadIntakeService';
import { trackEvent } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  agenda: '',
};

function generateUpcomingBookingSlotsUtc({
  slotsNeeded = 8,
  slotHoursUtc = [9, 12],
  businessDays = [1, 2, 3, 4, 5],
} = {}) {
  const slots = [];
  const cursor = new Date();

  cursor.setUTCMinutes(0, 0, 0);

  while (slots.length < slotsNeeded) {
    const day = cursor.getUTCDay();
    if (businessDays.includes(day)) {
      for (const hour of slotHoursUtc) {
        if (slots.length >= slotsNeeded) {
          break;
        }

        const slot = new Date(Date.UTC(
          cursor.getUTCFullYear(),
          cursor.getUTCMonth(),
          cursor.getUTCDate(),
          hour,
          0,
          0,
          0
        ));

        if (slot.getTime() > Date.now()) {
          slots.push(slot.toISOString());
        }
      }
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return slots;
}

const bookingSlotsUtc = generateUpcomingBookingSlotsUtc();

function formatSlotForTimezone(slotIso, timezone, locale) {
  const date = new Date(slotIso);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(date);
}

const CALL_EXPECTATIONS = [
  'We review the workflow, tools, stakeholders, and commercial constraints behind the request.',
  'We tell you whether the next move is a direct scoped build, a software blueprint, or a live SaaS subscription.',
  'If the fit is right, we follow with the next commercial step instead of leaving it vague.',
];

export default function DiscoveryCallPage() {
  const { language, t } = useLanguage();
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Addis_Ababa', []);
  const [selectedSlot, setSelectedSlot] = useState(bookingSlotsUtc[0] || '');
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const dateLocale = useMemo(() => {
    if (language === 'am') {
      return 'am-ET';
    }

    if (language === 'om') {
      return 'om-ET';
    }

    return 'en-ET';
  }, [language]);

  const localizedSlots = useMemo(() => {
    return bookingSlotsUtc.map((slot) => ({
      value: slot,
      label: formatSlotForTimezone(slot, timezone, dateLocale),
    }));
  }, [dateLocale, timezone]);

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedSlot) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const selectedSlotLabel = localizedSlots.find((slot) => slot.value === selectedSlot)?.label || selectedSlot;
    const lead = {
      name: form.name,
      email: form.email,
      company: form.company,
      message: `${t('discovery.booking.requestedSlot', 'Requested slot')}: ${selectedSlotLabel}. ${t('discovery.booking.agendaLabel', 'Agenda')}: ${form.agenda}`,
    };

    const submission = await submitLeadIntake({
      type: 'discovery_booking',
      source: 'discovery_call_booking',
      channel: 'booking_form',
      routePath: '/book-discovery-call',
      lead,
      context: {
        selectedSlot,
        selectedSlotLabel,
        timezone,
        agenda: form.agenda,
      },
      consent: {
        type: 'calendar_follow_up',
        copy: t('discovery.form.hint', 'You will receive confirmation by email with next steps and preparation notes.'),
      },
    });

    if (!submission.ok) {
      setStatus('error');
      trackEvent('discovery_call_booking_outcome', {
        source: 'booking_page',
        outcome: submission.type,
      });
      return;
    }

    if (submission.type === 'local-fallback') {
      queueLeadFollowups({
        source: 'discovery_call_booking_fallback',
        channel: 'booking_form',
        routePath: '/book-discovery-call',
        lead,
      });
    }

    trackEvent('discovery_call_booking_outcome', {
      source: 'booking_page',
      outcome: submission.type,
    });

    trackEvent('discovery_call_booked', {
      source: 'booking_page',
      slot: selectedSlot,
      timezone,
      delivery: submission.type,
    });

    setStatus(submission.type === 'local-fallback' ? 'fallback' : 'submitted');
    setForm(INITIAL_FORM);
  };

  const feedbackClass = status === 'submitted'
    ? 'sent'
    : status === 'fallback'
    ? 'fallback'
    : status === 'error'
    ? 'error'
    : '';

  const feedbackMessage = (() => {
    if (status === 'submitted') {
      return `${t('discovery.form.success', 'Thanks. Your booking details were captured and our team will send a calendar invite shortly.')} ${t('discovery.form.sla', 'We respond within one business day, schedule your discovery call within three, and deliver a proposal within five business days of discovery.')}`;
    }

    if (status === 'fallback') {
      return t('discovery.form.fallback', 'Thanks. Your booking details were captured locally because the booking endpoint is temporarily unavailable. Please message us by email or Telegram if this is urgent.');
    }

    if (status === 'error') {
      return t('discovery.form.slotError', 'Please select a valid future session before confirming.');
    }

    if (status === 'submitting') {
      return t('discovery.form.submitting', 'Confirming your session request...');
    }

    return t('discovery.form.hint', 'You will receive confirmation by email with next steps and preparation notes.');
  })();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <div className="eyebrow">01 · DISCOVERY</div>
          <h1>
            <em className="verb">book</em>&nbsp;a discovery call.
          </h1>
          <p>
            Use this for a direct conversation before choosing a custom software scope or product build.
            We keep the call practical and specific.
          </p>
          <div className="page-hero-meta" aria-label="Booking support details">
            <span className="page-hero-chip">Timezone-aware scheduling</span>
            <span className="page-hero-chip">30-minute working session</span>
            <span className="page-hero-chip">Clear next step after the call</span>
          </div>
        </div>
      </section>

      <section className="section discovery-section band-dark band-1">
        <div className="container">
          <ScrollReveal static>
            <SectionHeader
              eyebrow="02 · BOOKING"
              title="Choose a slot and tell us what the business is trying to fix."
              subtitle={`Detected timezone: ${timezone}`}
            />
          </ScrollReveal>

          <div className="editorial-two-column discovery-layout-redesign">
            <ScrollReveal static>
              <div className="editorial-panel glass-card">
                <p className="editorial-kicker">What this call is for</p>
                <h3>A fast decision on the right commercial path.</h3>
                <ul className="editorial-checklist compact">
                  {CALL_EXPECTATIONS.map((item) => (
                    <li key={item}>
                      <IconGlyph name="check" size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="discovery-card glass">
                  <h3>Available sessions</h3>
                  <div className="discovery-slot-list">
                    {localizedSlots.map((slot) => (
                      <label key={slot.value} className={`discovery-slot ${selectedSlot === slot.value ? 'selected' : ''}`.trim()}>
                        <input
                          type="radio"
                          name="discovery-slot"
                          value={slot.value}
                          checked={selectedSlot === slot.value}
                          onChange={() => setSelectedSlot(slot.value)}
                        />
                        <span>{slot.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal static>
              <div className="editorial-panel glass-card">
                <h3>Meeting details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="booking-name">Full name</label>
                    <input id="booking-name" value={form.name} onChange={updateField('name')} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="booking-email">Work email</label>
                    <input id="booking-email" type="email" value={form.email} onChange={updateField('email')} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="booking-company">Company</label>
                    <input id="booking-company" value={form.company} onChange={updateField('company')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="booking-agenda">What should we prepare for?</label>
                    <textarea
                      id="booking-agenda"
                      rows={4}
                      value={form.agenda}
                      onChange={updateField('agenda')}
                      placeholder="Describe the workflow, system, quote, or product decision you want help making."
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Confirming...' : 'Confirm Session'}
                  </button>
                  <p className={`form-feedback ${feedbackClass}`} role="status" aria-live="polite">
                    {feedbackMessage}
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
