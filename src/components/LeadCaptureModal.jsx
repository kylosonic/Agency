import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, trackPricingGuideOpened } from '../services/analyticsService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import IconGlyph from './IconGlyph';
import { useLanguage } from '../i18n/useLanguage';

const INITIAL_FORM = { name: '', email: '', company: '' };
const MotionDiv = motion.div;

const VARIANT_CONTENT = {
    pricing_guide: {
        title: 'Get Our 2026 Pricing Guide',
        subtitle: 'Download our complete overview of development, digital marketing, and SaaS packages, with full ETB pricing.',
        submitLabel: 'Download Pricing Guide',
        successTitle: 'Thank You!',
        successSubtitle: 'Your guide is open in a new tab. You can also reopen it below.',
        successPrimaryLabel: 'Open Guide Again',
        successPrimaryAction: 'guide',
    },
    quote_offer: {
        title: 'Get a Tailored Project Estimate',
        subtitle: 'Share your details and continue to our Instant Quote Wizard for a custom estimate range in minutes.',
        submitLabel: 'Continue to Instant Quote',
        successTitle: 'Great, You Are In!',
        successSubtitle: 'Your request was saved. Continue to the quote wizard for your tailored estimate.',
        successPrimaryLabel: 'Open Instant Quote',
        successPrimaryAction: 'quote',
    },
    book_call_offer: {
        title: 'Book a Discovery Strategy Call',
        subtitle: 'Leave your details and continue to booking. We will prepare a focused strategy agenda for your goals.',
        submitLabel: 'Continue to Booking',
        successTitle: 'Almost Done!',
        successSubtitle: 'Your request was captured. Select your preferred session slot on the booking page.',
        successPrimaryLabel: 'Open Booking Page',
        successPrimaryAction: 'booking',
    },
};

export default function LeadCaptureModal({ isOpen, onClose, source = 'modal', variant = 'pricing_guide', routePath = '/' }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle');
    const activeVariantConfig = VARIANT_CONTENT[variant] || VARIANT_CONTENT.pricing_guide;
    const activeVariant = {
        title: t(`leadCapture.${variant}.title`, activeVariantConfig.title),
        subtitle: t(`leadCapture.${variant}.subtitle`, activeVariantConfig.subtitle),
        submitLabel: t(`leadCapture.${variant}.submitLabel`, activeVariantConfig.submitLabel),
        successTitle: t(`leadCapture.${variant}.successTitle`, activeVariantConfig.successTitle),
        successSubtitle: t(`leadCapture.${variant}.successSubtitle`, activeVariantConfig.successSubtitle),
        successPrimaryLabel: t(`leadCapture.${variant}.successPrimaryLabel`, activeVariantConfig.successPrimaryLabel),
        successPrimaryAction: activeVariantConfig.successPrimaryAction,
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const requestClose = useCallback((source = 'modal_dismissed') => {
        trackEvent('pricing_guide_modal_closed', { source, variant });
        setStatus('idle');
        setFormData(INITIAL_FORM);
        onClose();
    }, [onClose, variant]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                requestClose('escape_key');
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, requestClose]);

    const openVariantPrimaryAction = (actionSource = 'lead_modal_primary_action') => {
        if (activeVariant.successPrimaryAction === 'guide') {
            trackPricingGuideOpened(actionSource);
            window.open('/pricing-guide.pdf', '_blank', 'noopener,noreferrer');
            return;
        }

        if (activeVariant.successPrimaryAction === 'quote') {
            window.location.assign('/instant-quote');
            return;
        }

        if (activeVariant.successPrimaryAction === 'booking') {
            window.location.assign('/book-discovery-call');
        }
    };

    const closeAndReset = () => {
        requestClose('success_close');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        trackEvent('pricing_guide_form_submitted', {
            source: 'lead_modal',
            triggerSource: source,
            variant,
            hasCompany: Boolean(formData.company.trim()),
        });

        queueLeadFollowups({
            source,
            channel: 'lead_capture_modal',
            routePath,
            lead: {
                name: formData.name,
                email: formData.email,
                company: formData.company,
                message: `${activeVariant.title} | Variant: ${variant}`,
            },
        });

        if (activeVariant.successPrimaryAction === 'guide') {
            trackPricingGuideOpened('lead_modal_submit');
            window.open('/pricing-guide.pdf', '_blank', 'noopener,noreferrer');
        }

        setStatus('success');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <MotionDiv 
                    className="modal-backdrop-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => requestClose('backdrop_click')}
                    role="presentation"
                >
                    <MotionDiv 
                        className="modal-slide-panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="pricing-guide-title"
                    >
                            <button
                                type="button"
                                className="modal-close-new"
                                onClick={() => requestClose('close_button')}
                                aria-label={t('leadCapture.closeAria', 'Close pricing guide modal')}
                            >
                                <IconGlyph name="close" size={16} />
                            </button>

                        {status !== 'success' ? (
                            <>
                                <h3 id="pricing-guide-title">{activeVariant.title}</h3>
                                <p className="modal-subtitle">
                                    {activeVariant.subtitle}
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="lead-name">{t('leadCapture.form.fullName', 'Full Name')}</label>
                                        <input
                                            id="lead-name"
                                            type="text"
                                            name="name"
                                            placeholder={t('leadCapture.form.fullNamePlaceholder', 'Hana Bekele')}
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lead-email">{t('leadCapture.form.email', 'Email Address')}</label>
                                        <input
                                            id="lead-email"
                                            type="email"
                                            name="email"
                                            placeholder={t('leadCapture.form.emailPlaceholder', 'team@company.et')}
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lead-company">{t('leadCapture.form.company', 'Company (optional)')}</label>
                                        <input
                                            id="lead-company"
                                            type="text"
                                            name="company"
                                            placeholder={t('leadCapture.form.companyPlaceholder', 'Aster Ventures')}
                                            value={formData.company}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
                                        {status === 'submitting' ? t('leadCapture.form.submitting', 'Submitting...') : activeVariant.submitLabel}
                                    </button>
                                </form>
                                <p className="privacy-note">
                                    <IconGlyph name="shield" size={14} className="privacy-icon" />
                                    {t('leadCapture.privacy', 'We respect your privacy. No spam, ever.')}
                                </p>
                            </>
                        ) : (
                            <div className="modal-success-state" role="status" aria-live="polite">
                                <div className="modal-success-icon" aria-hidden="true">
                                    <IconGlyph name="check" size={30} />
                                </div>
                                <h3>{activeVariant.successTitle}</h3>
                                <p className="modal-subtitle">{activeVariant.successSubtitle}</p>
                                <div className="modal-success-actions">
                                    <button type="button" className="btn btn-primary" onClick={() => openVariantPrimaryAction('lead_modal_success_primary')}>
                                        {activeVariant.successPrimaryLabel}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={closeAndReset}>
                                        {t('actions.close', 'Close')}
                                    </button>
                                </div>
                            </div>
                        )}
                    </MotionDiv>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
