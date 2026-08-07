import { useState, useEffect, useMemo } from 'react';
import InteractivePricing from '../components/InteractivePricing';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import RouteProofStrip from '../components/RouteProofStrip';
import RoiEstimator from '../components/RoiEstimator';
import FaqAccordion from '../components/FaqAccordion';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { serviceFaqs } from '../config/contentData';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { getMobilePackages } from '../services/pricingData';
import { useLanguage } from '../i18n/useLanguage';

export default function MobileDevelopmentPage({ onDownloadClick }) {
    const { t } = useLanguage();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mobileData = await getMobilePackages();
                setPackages(mobileData);
            } catch (error) {
                console.error("Failed to load mobile pricing data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const localizedFaqItems = useMemo(() => {
        return serviceFaqs.mobile.map((item, index) => ({
            question: t(`faqs.mobile.${index}.question`, item.question),
            answer: t(`faqs.mobile.${index}.answer`, item.answer),
        }));
    }, [t]);
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1>{t('mobile.hero.title', 'Mobile App Development')}</h1>
                    <p>{t('mobile.hero.subtitle', 'Cross-platform and native iOS & Android apps built with Flutter and React Native — designed for the Ethiopian market.')}</p>
                    <div className="page-hero-meta" aria-label={t('mobile.hero.metaAria', 'Mobile delivery highlights')}>
                        <span className="page-hero-chip">{t('mobile.hero.chip1', 'Store Submission Support')}</span>
                        <span className="page-hero-chip">{t('mobile.hero.chip2', 'Offline-Ready Architecture')}</span>
                        <span className="page-hero-chip">{t('mobile.hero.chip3', 'Telebirr and Chapa Integration')}</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: t('mobile.proof.0.title', 'The flow comes first'),
                        text: t('mobile.proof.0.text', 'Before coding, we align on key user journeys so every screen supports retention and conversion.'),
                    },
                    {
                        title: t('mobile.proof.1.title', 'Testing On Real Devices'),
                        text: t('mobile.proof.1.text', 'Each sprint includes practical QA on target Android and iOS device ranges.'),
                    },
                    {
                        title: t('mobile.proof.2.title', 'Launch, then iterate'),
                        text: t('mobile.proof.2.text', 'Post-launch analytics and backlog priorities are prepared before release day.'),
                    },
                ]}
            />

            {/* App Development Tiers */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag={t('mobile.sections.packages.tag', 'App Packages')}
                            title={t('mobile.sections.packages.title', 'Build Your Mobile App')}
                            subtitle={t('mobile.sections.packages.subtitle', "From simple utility apps to complex FinTech platforms — we've got you covered.")}
                        />
                    </ScrollReveal>

                    {loading ? (
                        <div className="loading-state">
                            <p>{t('states.loadingPackages', 'Loading Packages...')}</p>
                        </div>
                    ) : (
                        <ScrollReveal stagger>
                            <InteractivePricing
                                onDownloadClick={onDownloadClick}
                                packages={packages}
                            />
                        </ScrollReveal>
                    )}
                </div>
            </section>

            <RoiEstimator
                title={t('mobile.roi.title', 'Mobile Acquisition ROI Estimator')}
                subtitle={t('mobile.roi.subtitle', 'Estimate expected gain from app-store readiness, paid acquisition, and retention improvements.')}
            />

            <FaqAccordion
                title={t('mobile.faq.title', 'Mobile Development FAQs')}
                subtitle={t('mobile.faq.subtitle', 'Answers on store submission, platform coverage, and local payment integrations.')}
                items={localizedFaqItems}
            />

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>{t('mobile.cta.title', 'Have an App Idea?')}</h2>
                            <p>{t('mobile.cta.subtitle', "Let's turn your vision into a market-ready mobile application. Download our full guide for detailed specs and pricing.")}</p>
                            <div className="cta-actions">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('mobile_page_cta_pricing')}>
                                    {t('actions.downloadFullPricingGuide', 'Download Full Pricing Guide')}
                                </button>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('mobile_page_cta_discovery')}>
                                    {t('mobile.cta.secondary', 'Schedule App Strategy Call')}
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
