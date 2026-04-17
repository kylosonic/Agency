import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, trackPricingGuideOpened } from '../services/analyticsService';

const INITIAL_FORM = { name: '', email: '', company: '' };
const MotionDiv = motion.div;

export default function LeadCaptureModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const requestClose = useCallback((source = 'modal_dismissed') => {
        trackEvent('pricing_guide_modal_closed', { source });
        setStatus('idle');
        setFormData(INITIAL_FORM);
        onClose();
    }, [onClose]);

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

    const openGuide = (source = 'lead_modal_open_guide') => {
        trackPricingGuideOpened(source);
        window.open('/pricing-guide.pdf', '_blank', 'noopener,noreferrer');
    };

    const closeAndReset = () => {
        requestClose('success_close');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        trackEvent('pricing_guide_form_submitted', {
            source: 'lead_modal',
            hasCompany: Boolean(formData.company.trim()),
        });

        openGuide('lead_modal_submit');
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
                        <button type="button" className="modal-close-new" onClick={() => requestClose('close_button')}>✕</button>

                        {status !== 'success' ? (
                            <>
                                <h3 id="pricing-guide-title">Get Our 2026 Pricing Guide</h3>
                                <p className="modal-subtitle">
                                    Download our exhaustive overview of development, digital marketing, and SaaS packages — with full ETB pricing.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="lead-name">Full Name</label>
                                        <input
                                            id="lead-name"
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lead-email">Email Address</label>
                                        <input
                                            id="lead-email"
                                            type="email"
                                            name="email"
                                            placeholder="john@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lead-company">Company (optional)</label>
                                        <input
                                            id="lead-company"
                                            type="text"
                                            name="company"
                                            placeholder="Acme Corp"
                                            value={formData.company}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
                                        {status === 'submitting' ? 'Preparing Your Guide...' : 'Download Pricing Guide'}
                                    </button>
                                </form>
                                <p className="privacy-note">🔒 We respect your privacy. No spam, ever.</p>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} role="status" aria-live="polite">
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h3>Thank You!</h3>
                                <p className="modal-subtitle">Your guide is open in a new tab. You can also reopen it below.</p>
                                <div className="modal-success-actions">
                                    <button type="button" className="btn btn-primary" onClick={() => openGuide('lead_modal_reopen')}>
                                        Open Guide Again
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={closeAndReset}>
                                        Close
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
