import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import StaggeredText from '../components/StaggeredText';
import MagneticButton from '../components/MagneticButton';

export default function SaasSolutionsPage({ onDownloadClick }) {
    const systems = [
        {
            icon: '🎓',
            name: 'Smart School Management System (SMS)',
            tag: 'Education',
            description: 'Complete school administration platform covering student management, grading, attendance, fees, timetabling, and parent communication.',
            setup: '25,000 ETB',
            monthly: '3,500 ETB',
            annual: '35,000 ETB',
            annualSave: 'Save 2 months',
            modules: [
                'Student Registration & Profiles',
                'Attendance Tracking',
                'Grade & Report Card Management',
                'Fee Collection & Invoicing',
                'Timetable Scheduler',
                'Parent/Guardian Portal',
                'Teacher Management',
                'Library Management',
                'Exam Management',
                'SMS & Email Notifications',
                'Analytics Dashboard',
                'Multi-branch Support',
            ],
        },
        {
            icon: '🏥',
            name: 'Hospital & Clinic Management System (HMS)',
            tag: 'Healthcare',
            description: 'End-to-end healthcare management system for clinics and hospitals — from patient registration to billing and lab results.',
            setup: '35,000 ETB',
            monthly: '5,000 ETB',
            annual: '50,000 ETB',
            annualSave: 'Save 2 months',
            modules: [
                'Patient Registration & Records (EMR)',
                'Appointment Scheduling',
                'Doctor & Staff Management',
                'Prescription Management',
                'Lab Results & Diagnostics',
                'Pharmacy & Inventory',
                'Billing & Insurance Claims',
                'Bed/Ward Management',
                'Telemedicine Integration',
                'Reporting & Analytics',
                'Multi-location Support',
                'HIPAA-aligned Security',
            ],
        },
        {
            icon: '🏘️',
            name: 'Real Estate / Property Management System (PMS)',
            tag: 'Real Estate',
            description: 'Manage properties, tenants, leases, rent collection, and maintenance — all from one centralized cloud dashboard.',
            setup: '20,000 ETB',
            monthly: '3,000 ETB',
            annual: '30,000 ETB',
            annualSave: 'Save 2 months',
            modules: [
                'Property Listing & Management',
                'Tenant & Lease Tracking',
                'Rent Collection & Receipts',
                'Maintenance Request System',
                'Document Storage',
                'Financial Reporting',
                'Vacancy Tracking',
                'Owner Portal',
                'Tenant Portal',
                'Automated Reminders',
                'Multi-property Support',
                'Payment Integration',
            ],
        },
    ];

    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1 className="gradient-text">
                        <StaggeredText text="SaaS Cloud Solutions" delay={0.1} />
                    </h1>
                    <p>Rent-to-use cloud management systems — zero IT overhead, instant deployment, and full support. Pay monthly and scale at your pace.</p>
                </div>
            </section>

            {/* SaaS Catalog */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="Cloud Platform"
                            title="Our Management Systems"
                            subtitle="Enterprise-grade software available as affordable monthly subscriptions. No long-term contracts required."
                        />
                    </ScrollReveal>

                    {systems.map((system, index) => (
                        <ScrollReveal key={index}>
                            <div className="saas-card">
                                <div className="saas-card-header">
                                    <div className="icon">{system.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <h3>{system.name}</h3>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.35rem', lineHeight: 1.6 }}>
                                            {system.description}
                                        </p>
                                    </div>
                                    <div className="tag">{system.tag}</div>
                                </div>

                                <div className="saas-pricing-row">
                                    <div className="saas-price-item">
                                        <div className="label">One-Time Setup & Training</div>
                                        <div className="value">{system.setup}</div>
                                    </div>
                                    <div className="saas-price-item">
                                        <div className="label">Monthly Subscription</div>
                                        <div className="value">{system.monthly}</div>
                                    </div>
                                    <div className="saas-price-item saas-price-item-highlight">
                                        <div className="label">Annual Subscription</div>
                                        <div className="value">{system.annual}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem', fontWeight: 500 }}>
                                            {system.annualSave}
                                        </div>
                                    </div>
                                </div>

                                <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                                    Core Modules Included:
                                </h4>
                                <ul className="saas-modules">
                                    {system.modules.map((mod, i) => (
                                        <li key={i}>
                                            <span className="check">✓</span>
                                            {mod}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>Ready to Modernize Your Operations?</h2>
                            <p>Get started with our cloud management systems. Download the full pricing guide for detailed feature comparisons.</p>
                            <MagneticButton className="btn btn-primary btn-lg" onClick={onDownloadClick}>
                                Download Full Pricing Guide
                            </MagneticButton>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
