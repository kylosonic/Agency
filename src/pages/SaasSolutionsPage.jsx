import { useState, useEffect, useMemo } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import StaggeredText from '../components/StaggeredText';
import MagneticButton from '../components/MagneticButton';
import RouteProofStrip from '../components/RouteProofStrip';
import IconGlyph from '../components/IconGlyph';
import RoiEstimator from '../components/RoiEstimator';
import FaqAccordion from '../components/FaqAccordion';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { serviceFaqs } from '../config/contentData';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { getSaasPackages } from '../services/firebaseService';
import { useLanguage } from '../i18n/useLanguage';

export default function SaasSolutionsPage({ onDownloadClick }) {
    const { t } = useLanguage();
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
                        ? t('saas.systems.school.description', 'Complete school administration platform covering student management, grading, attendance, fees, timetabling, and parent communication.')
                        : item.title === 'Clinic/Hospital ERP'
                        ? t('saas.systems.clinic.description', 'End-to-end healthcare management system for clinics and hospitals — from patient registration to billing and lab results.')
                        : t('saas.systems.property.description', 'Manage properties, tenants, leases, rent collection, and maintenance — all from one centralized cloud dashboard.'),
                    setup: item.title === 'School Management System' ? '25,000 ETB' : item.title === 'Clinic/Hospital ERP' ? '35,000 ETB' : '20,000 ETB',
                    monthly: `${item.price} ETB`,
                    annual: item.title === 'School Management System' ? '35,000 ETB' : item.title === 'Clinic/Hospital ERP' ? '50,000 ETB' : '30,000 ETB',
                    annualSave: t('saas.labels.annualSave', 'Save 2 months'),
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
    }, [t]);

    const localizedFaqItems = useMemo(() => {
        return serviceFaqs.saas.map((item, index) => ({
            question: t(`faqs.saas.${index}.question`, item.question),
            answer: t(`faqs.saas.${index}.answer`, item.answer),
        }));
    }, [t]);


    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1 className="gradient-text">
                        <StaggeredText text={t('saas.hero.title', 'SaaS Cloud Solutions')} delay={0.1} />
                    </h1>
                    <p>{t('saas.hero.subtitle', 'Rent-to-use cloud management systems — zero IT overhead, instant deployment, and full support. Pay monthly and scale at your pace.')}</p>
                    <div className="page-hero-meta" aria-label={t('saas.hero.metaAria', 'SaaS delivery highlights')}>
                        <span className="page-hero-chip">{t('saas.hero.chip1', 'Rapid Team Onboarding')}</span>
                        <span className="page-hero-chip">{t('saas.hero.chip2', 'Managed Backups and Security')}</span>
                        <span className="page-hero-chip">{t('saas.hero.chip3', 'Annual Plan Savings')}</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: t('saas.proof.0.title', 'Fast Deployment Path'),
                        text: t('saas.proof.0.text', 'Most organizations complete setup and staff orientation in a short onboarding cycle.'),
                    },
                    {
                        title: t('saas.proof.1.title', 'Operational Visibility'),
                        text: t('saas.proof.1.text', 'Dashboards and reporting modules are configured around your daily workflows.'),
                    },
                    {
                        title: t('saas.proof.2.title', 'Continuous Improvements'),
                        text: t('saas.proof.2.text', 'Security updates and platform enhancements are rolled out without heavy IT overhead.'),
                    },
                ]}
            />

            {/* SaaS Catalog */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag={t('saas.sections.catalog.tag', 'Cloud Platform')}
                            title={t('saas.sections.catalog.title', 'Our Management Systems')}
                            subtitle={t('saas.sections.catalog.subtitle', 'Enterprise-grade software available as affordable monthly subscriptions. No long-term contracts required.')}
                        />
                    </ScrollReveal>

                    {loading ? (
                        <div className="loading-state">
                            <p>{t('states.loadingCloudPlatforms', 'Loading Cloud Platforms...')}</p>
                        </div>
                    ) : (
                        systems.map((system, index) => (
                            <ScrollReveal key={index}>
                                <div className="saas-card">
                                    <div className="saas-card-header">
                                        <div className="icon" aria-hidden="true"><IconGlyph name={system.icon} size={22} /></div>
                                        <div className="saas-card-content">
                                            <h3>{system.name}</h3>
                                            <p className="saas-card-description">
                                                {system.description}
                                            </p>
                                        </div>
                                        <div className="tag">{system.tag}</div>
                                    </div>

                                    <div className="saas-pricing-row">
                                        <div className="saas-price-item">
                                            <div className="label">{t('saas.pricing.setup', 'One-Time Setup & Training')}</div>
                                            <div className="value">{system.setup}</div>
                                        </div>
                                        <div className="saas-price-item">
                                            <div className="label">{t('saas.pricing.monthly', 'Monthly Subscription')}</div>
                                            <div className="value">{system.monthly}</div>
                                        </div>
                                        <div className="saas-price-item saas-price-item-highlight">
                                            <div className="label">{t('saas.pricing.annual', 'Annual Subscription')}</div>
                                            <div className="value">{system.annual}</div>
                                            <div className="saas-annual-save">
                                                {system.annualSave}
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="saas-modules-title">
                                        {t('saas.modulesTitle', 'Core Modules Included:')}
                                    </h4>
                                    <ul className="saas-modules">
                                        {system.modules.map((mod, i) => (
                                            <li key={i}>
                                                <span className="check" aria-hidden="true"><IconGlyph name="check" size={14} /></span>
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

            <RoiEstimator
                title="SaaS Operations ROI Estimator"
                subtitle="Model the business impact of process automation, reduced admin workload, and better collection discipline."
            />

            <FaqAccordion
                title={t('saas.faq.title', 'SaaS Solution FAQs')}
                subtitle={t('saas.faq.subtitle', 'Clarify onboarding, billing cadence, backup practices, and support expectations.')}
                items={localizedFaqItems}
            />

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>{t('saas.cta.title', 'Ready to Modernize Your Operations?')}</h2>
                            <p>{t('saas.cta.subtitle', 'Get started with our cloud management systems. Download the full pricing guide for detailed feature comparisons.')}</p>
                            <div className="cta-actions">
                                <MagneticButton className="btn btn-primary btn-lg" onClick={() => onDownloadClick('saas_page_cta_pricing')}>
                                    {t('actions.downloadFullPricingGuide', 'Download Full Pricing Guide')}
                                </MagneticButton>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('saas_page_cta_discovery')}>
                                    {t('saas.cta.secondary', 'Request SaaS Consultation')}
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
