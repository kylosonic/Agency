import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadCaptureModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: '', email: '', company: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Lead captured:', formData);
        setSubmitted(true);

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '/pricing-guide.pdf';
            link.download = 'ጣዉላtech-2026-Service-Menu-Pricing-Guide.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', company: '' });
                onClose();
            }, 2000);
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="modal-backdrop-blur"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div 
                        className="modal-slide-panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close-new" onClick={onClose}>✕</button>

                        {!submitted ? (
                            <>
                                <h3>Get Our 2026 Pricing Guide</h3>
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
                                        <label htmlFor="lead-company">Company</label>
                                        <input
                                            id="lead-company"
                                            type="text"
                                            name="company"
                                            placeholder="Acme Corp"
                                            value={formData.company}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        Download Pricing Guide
                                    </button>
                                </form>
                                <p className="privacy-note">🔒 We respect your privacy. No spam, ever.</p>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <h3>Thank You!</h3>
                                <p className="modal-subtitle">Your download is starting automatically...</p>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
