import { useState, useEffect, useMemo } from 'react';
import InteractivePricing from '../components/InteractivePricing';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import RouteProofStrip from '../components/RouteProofStrip';
import IconGlyph from '../components/IconGlyph';
import RoiEstimator from '../components/RoiEstimator';
import FaqAccordion from '../components/FaqAccordion';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { serviceFaqs } from '../config/contentData';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { getMobilePackages, getMarketingAddons } from '../services/pricingData';
import { useLanguage } from '../i18n/useLanguage';

export default function MobileDevelopmentPage({ onDownloadClick }) {
    const { t } = useLanguage();
    const [packages, setPackages] = useState([]);
    const [addons, setAddons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mobileData, addonData] = await Promise.all([
                    getMobilePackages(),
                    getMarketingAddons()
                ]);
                setPackages(mobileData);
                setAddons(addonData);
            } catch (error) {
                console.error("Failed to fetch Firebase data:", error);
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
                        title: t('mobile.proof.0.title', 'User Flow First'),
                        text: t('mobile.proof.0.text', 'Before coding, we align on key user journeys so every screen supports retention and conversion.'),
                    },
                    {
                        title: t('mobile.proof.1.title', 'Testing On Real Devices'),
                        text: t('mobile.proof.1.text', 'Each sprint includes practical QA on target Android and iOS device ranges.'),
                    },
                    {
                        title: t('mobile.proof.2.title', 'Launch and Iterate'),
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

            {/* Mobile Marketing Packages */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag={t('mobile.sections.marketing.tag', 'App Marketing')}
                            title={t('mobile.sections.marketing.title', 'Mobile App Digital Marketing')}
                            subtitle={t('mobile.sections.marketing.subtitle', 'Drive installs, optimize your store listing, and scale your user base with our specialized app marketing services.')}
                        />
                    </ScrollReveal>

                    {loading ? (
                        <div className="loading-state">
                            <p>{t('states.loadingMarketingAddons', 'Loading Marketing Add-ons...')}</p>
                        </div>
                    ) : (
                        <ScrollReveal stagger>
                            <div className="addon-grid">
                                {addons.map((addon) => (
                                    <div key={addon.id} className={`addon-card ${addon.featured ? 'addon-card-featured' : ''}`}>
                                        <h4>
                                            <span className="addon-card-icon" aria-hidden="true"><IconGlyph name={addon.icon} size={16} /></span>
                                            {addon.title}
                                        </h4>
                                        <div className="price">
                                            {addon.fee} ETB<span className="detail">{addon.id === 'launch' ? addon.adSpend : t('mobile.addons.managementFee', 'Management Fee /month')}</span>
                                            {addon.id !== 'launch' && <span className="detail">+ {addon.adSpend} ETB {addon.id === 'growth' ? t('mobile.addons.cpi', 'CPI') + ' ' : ''}{t('mobile.addons.adSpend', 'Ad Spend')}</span>}
                                        </div>
                                        <ul>
                                            {addon.features.map((feature, i) => (
                                                <li key={i}><span className="check" aria-hidden="true"><IconGlyph name="check" size={14} /></span> {feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>

            <RoiEstimator
                title="Mobile Acquisition ROI Estimator"
                subtitle="Estimate expected gain from app-store readiness, paid acquisition, and retention improvements."
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
