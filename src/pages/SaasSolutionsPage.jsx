import { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import StaggeredText from '../components/StaggeredText';
import MagneticButton from '../components/MagneticButton';
import RouteProofStrip from '../components/RouteProofStrip';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { getSaasPackages } from '../services/firebaseService';

export default function SaasSolutionsPage({ onDownloadClick }) {
    const [systems, setSystems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSaasPackages();
                // Map the data into the structure expected by the component if needed.
                // The current hardcoded data has different keys than the packages (setup/monthly vs price/period).
                // Let's adapt the mocked firebase service data to the UI format.
                const formattedSystems = data.map(item => ({
                    icon: item.icon,
                    name: item.title,
                    tag: item.subtitle,
                    description: item.title === 'School Management System' 
                        ? 'Complete school administration platform covering student management, grading, attendance, fees, timetabling, and parent communication.'
                        : item.title === 'Clinic/Hospital ERP'
                        ? 'End-to-end healthcare management system for clinics and hospitals — from patient registration to billing and lab results.'
                        : 'Manage properties, tenants, leases, rent collection, and maintenance — all from one centralized cloud dashboard.',
                    setup: item.title === 'School Management System' ? '25,000 ETB' : item.title === 'Clinic/Hospital ERP' ? '35,000 ETB' : '20,000 ETB',
                    monthly: `${item.price} ETB`,
                    annual: item.title === 'School Management System' ? '35,000 ETB' : item.title === 'Clinic/Hospital ERP' ? '50,000 ETB' : '30,000 ETB',
                    annualSave: 'Save 2 months',
                    modules: item.features
                }));
                setSystems(formattedSystems);
            } catch (error) {
                console.error("Failed to fetch Firebase SaaS data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1 className="gradient-text">
                        <StaggeredText text="SaaS Cloud Solutions" delay={0.1} />
                    </h1>
                    <p>Rent-to-use cloud management systems — zero IT overhead, instant deployment, and full support. Pay monthly and scale at your pace.</p>
                    <div className="page-hero-meta" aria-label="SaaS delivery highlights">
                        <span className="page-hero-chip">Rapid Team Onboarding</span>
                        <span className="page-hero-chip">Managed Backups and Security</span>
                        <span className="page-hero-chip">Annual Plan Savings</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: 'Fast Deployment Path',
                        text: 'Most organizations complete setup and staff orientation in a short onboarding cycle.',
                    },
                    {
                        title: 'Operational Visibility',
                        text: 'Dashboards and reporting modules are configured around your daily workflows.',
                    },
                    {
                        title: 'Continuous Improvements',
                        text: 'Security updates and platform enhancements are rolled out without heavy IT overhead.',
                    },
                ]}
            />

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

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p>Loading Cloud Platforms...</p>
                        </div>
                    ) : (
                        systems.map((system, index) => (
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
                        ))
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>Ready to Modernize Your Operations?</h2>
                            <p>Get started with our cloud management systems. Download the full pricing guide for detailed feature comparisons.</p>
                            <div className="cta-actions">
                                <MagneticButton className="btn btn-primary btn-lg" onClick={() => onDownloadClick('saas_page_cta_pricing')}>
                                    Download Full Pricing Guide
                                </MagneticButton>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('saas_page_cta_discovery')}>
                                    Request SaaS Consultation
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
