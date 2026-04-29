import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { bookingSlotsUtc } from '../config/contentData';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { trackEvent } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  agenda: '',
};

function formatSlotForTimezone(slotIso, timezone, locale) {
  const date = new Date(slotIso);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(date);
}

export default function DiscoveryCallPage() {
  const { language, t } = useLanguage();
  const timezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Addis_Ababa', []);
  const [selectedSlot, setSelectedSlot] = useState(bookingSlotsUtc[0]);
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
        message: `${t('discovery.booking.requestedSlot', 'Requested slot')}: ${selectedSlot}. ${t('discovery.booking.agendaLabel', 'Agenda')}: ${form.agenda}`,
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
          <h1>{t('discovery.hero.title', 'Book a Discovery Call')}</h1>
          <p>{t('discovery.hero.subtitle', 'Choose a slot in your timezone and share key priorities so we can prepare a focused strategy session.')}</p>
          <div className="page-hero-meta" aria-label={t('discovery.hero.metaAria', 'Booking support details')}>
            <span className="page-hero-chip">{t('discovery.hero.chip1', 'Timezone-aware scheduling')}</span>
            <span className="page-hero-chip">{t('discovery.hero.chip2', '30-minute strategic session')}</span>
            <span className="page-hero-chip">{t('discovery.hero.chip3', 'Actionable roadmap output')}</span>
          </div>
        </div>
      </section>

      <section className="section discovery-section">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('discovery.header.tag', 'Scheduling')}
              title={t('discovery.header.title', 'Pick a Session Slot')}
              subtitle={`${t('discovery.header.timezone', 'Detected timezone')}: ${timezone}`}
            />
          </ScrollReveal>

          <div className="discovery-grid">
            <div className="discovery-card glass-card">
              <h3>{t('discovery.sessions.title', 'Available Sessions')}</h3>
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
              <h3>{t('discovery.form.title', 'Meeting Details')}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="booking-name">{t('discovery.form.fullName', 'Full name')}</label>
                  <input id="booking-name" value={form.name} onChange={updateField('name')} required />
                </div>
                <div className="form-group">
                  <label htmlFor="booking-email">{t('discovery.form.workEmail', 'Work email')}</label>
                  <input id="booking-email" type="email" value={form.email} onChange={updateField('email')} required />
                </div>
                <div className="form-group">
                  <label htmlFor="booking-company">{t('discovery.form.company', 'Company')}</label>
                  <input id="booking-company" value={form.company} onChange={updateField('company')} />
                </div>
                <div className="form-group">
                  <label htmlFor="booking-agenda">{t('discovery.form.agenda', 'Session agenda')}</label>
                  <textarea
                    id="booking-agenda"
                    rows={4}
                    value={form.agenda}
                    onChange={updateField('agenda')}
                    placeholder={t('discovery.form.agendaPlaceholder', 'Share project goals, blockers, and timeline expectations.')}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">{t('discovery.form.submit', 'Confirm Session')}</button>
                <p className={`form-feedback ${status === 'submitted' ? 'sent' : ''}`}>
                  {status === 'submitted'
                    ? t('discovery.form.success', 'Thanks. Your booking details were captured and our team will send a calendar invite shortly.')
                    : t('discovery.form.hint', 'You will receive confirmation by email with next steps and preparation notes.')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
