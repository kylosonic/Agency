import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { bookingSlotsUtc } from '../config/contentData';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { trackEvent } from '../services/analyticsService';

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  agenda: '',
};

function formatSlotForTimezone(slotIso, timezone) {
  const date = new Date(slotIso);
  return new Intl.DateTimeFormat('en-ET', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(date);
}

export default function DiscoveryCallPage() {
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Addis_Ababa', []);
  const [selectedSlot, setSelectedSlot] = useState(bookingSlotsUtc[0]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  const localizedSlots = useMemo(() => {
    return bookingSlotsUtc.map((slot) => ({
      value: slot,
      label: formatSlotForTimezone(slot, timezone),
    }));
  }, [timezone]);

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    queueLeadFollowups({
      source: 'discovery_call_booking',
      channel: 'booking_form',
      routePath: '/book-discovery-call',
      lead: {
        name: form.name,
        email: form.email,
        company: form.company,
        message: `Requested slot: ${selectedSlot}. Agenda: ${form.agenda}`,
      },
    });

    trackEvent('discovery_call_booked', {
      source: 'booking_page',
      slot: selectedSlot,
      timezone,
    });

    setStatus('submitted');
    setForm(INITIAL_FORM);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <h1>Book a Discovery Call</h1>
          <p>Choose a slot in your timezone and share key priorities so we can prepare a focused strategy session.</p>
          <div className="page-hero-meta" aria-label="Booking support details">
            <span className="page-hero-chip">Timezone-aware scheduling</span>
            <span className="page-hero-chip">30-minute strategic session</span>
            <span className="page-hero-chip">Actionable roadmap output</span>
          </div>
        </div>
      </section>

      <section className="section discovery-section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Scheduling"
              title="Pick a Session Slot"
              subtitle={`Detected timezone: ${timezone}`}
            />
          </ScrollReveal>

          <div className="discovery-grid">
            <div className="discovery-card glass-card">
              <h3>Available Sessions</h3>
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

            <div className="discovery-card glass-card">
              <h3>Meeting Details</h3>
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
                  <label htmlFor="booking-agenda">Session agenda</label>
                  <textarea id="booking-agenda" rows={4} value={form.agenda} onChange={updateField('agenda')} placeholder="Share project goals, blockers, and timeline expectations." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">Confirm Session</button>
                <p className={`form-feedback ${status === 'submitted' ? 'sent' : ''}`}>
                  {status === 'submitted'
                    ? 'Thanks. Your booking details were captured and our team will send a calendar invite shortly.'
                    : 'You will receive confirmation by email with next steps and preparation notes.'}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
