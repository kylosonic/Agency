import { useState, useEffect, useMemo } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import RouteProofStrip from '../components/RouteProofStrip';
import IconGlyph from '../components/IconGlyph';
import FaqAccordion from '../components/FaqAccordion';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { serviceFaqs } from '../config/contentData';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { getAdditionalServices, getFeaturedAddons } from '../services/pricingData';
import { useLanguage } from '../i18n/useLanguage';

export default function AdditionalServicesPage({ onDownloadClick }) {
    const { t } = useLanguage();
    const [services, setServices] = useState([]);
    const [featuredAddons, setFeaturedAddons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, addonsData] = await Promise.all([
                    getAdditionalServices(),
                    getFeaturedAddons()
                ]);
                setServices(servicesData);
                setFeaturedAddons(addonsData);
            } catch (error) {
                console.error("Failed to fetch Firebase additional services data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const localizedFaqItems = useMemo(() => {
        return serviceFaqs.additional.map((item, index) => ({
            question: t(`faqs.additional.${index}.question`, item.question),
            answer: t(`faqs.additional.${index}.answer`, item.answer),
        }));
    }, [t]);


    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1>{t('additional.hero.title', 'Additional Services')}</h1>
                    <p>{t('additional.hero.subtitle', 'Essential one-time and recurring services to complement your digital presence — from hosting to branding.')}</p>
                    <div className="page-hero-meta" aria-label={t('additional.hero.metaAria', 'Additional services highlights')}>
                        <span className="page-hero-chip">{t('additional.hero.chip1', 'Transparent Cost Bands')}</span>
                        <span className="page-hero-chip">{t('additional.hero.chip2', 'One-Time and Recurring Options')}</span>
                        <span className="page-hero-chip">{t('additional.hero.chip3', 'Bundle-Ready Add-Ons')}</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: t('additional.proof.0.title', 'Practical Service Bundles'),
                        text: t('additional.proof.0.text', 'Combine hosting, design, and maintenance services without hidden package lock-ins.'),
                    },
                    {
                        title: t('additional.proof.1.title', 'Predictable Renewals'),
                        text: t('additional.proof.1.text', 'Recurring services are clearly labeled so budgeting and planning stay straightforward.'),
                    },
                    {
                        title: t('additional.proof.2.title', 'Scalable Support Options'),
                        text: t('additional.proof.2.text', 'Start with essentials and layer in creative or technical support as your brand grows.'),
                    },
                ]}
            />

            {/* More Services */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag={t('additional.sections.catalog.tag', 'Service Catalog')}
                            title={t('additional.sections.catalog.title', 'One-Time & Recurring Services')}
                            subtitle={t('additional.sections.catalog.subtitle', 'Everything you need to launch, maintain, and elevate your digital products.')}
                        />
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="services-table-wrapper">
                            <table className="services-table">
                                <thead>
                                    <tr>
                                        <th>{t('additional.table.service', 'Service')}</th>
                                        <th>{t('additional.table.description', 'Description')}</th>
                                        <th>{t('additional.table.cost', 'Estimated Cost')}</th>
                                        <th>{t('additional.table.billing', 'Billing')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="table-loading-cell">{t('states.loadingServices', 'Loading Services...')}</td>
                                        </tr>
                                    ) : (
                                        services.map((item, i) => (
                                            <tr key={i}>
                                                <td><strong>{item.service}</strong></td>
                                                <td className="services-table-description">{item.description}</td>
                                                <td className="price-cell">{item.price}</td>
                                                <td>
                                                    <span className="billing-chip">
                                                        {t(`additional.billing.${String(item.type).toLowerCase()}`, item.type)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Featured add-ons */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag={t('additional.sections.featured.tag', 'Highlights')}
                            title={t('additional.sections.featured.title', 'Featured Add-Ons')}
                            subtitle={t('additional.sections.featured.subtitle', 'Our most popular additional services, packaged to deliver maximum value.')}
                        />
                    </ScrollReveal>

                    <ScrollReveal stagger>
                        {loading ? (
                            <div className="loading-state">
                                <p>{t('states.loadingFeaturedAddons', 'Loading Featured Add-Ons...')}</p>
                            </div>
                        ) : (
                            <div className="services-grid">
                                {featuredAddons.map((addon, i) => (
                                    <div key={i} className="service-card">
                                        <div className="service-card-icon" aria-hidden="true"><IconGlyph name={addon.icon} size={21} /></div>
                                        <h3>{addon.title}</h3>
                                        <p>{addon.description}</p>
                                        <div className="featured-addon-price">
                                            {addon.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollReveal>
                </div>
            </section>

            <FaqAccordion
                title={t('additional.faq.title', 'Additional Services FAQs')}
                subtitle={t('additional.faq.subtitle', 'Understand billing models, bundle flexibility, and custom scoping options.')}
                items={localizedFaqItems}
            />

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>{t('additional.cta.title', 'Need Something Custom?')}</h2>
                            <p>{t('additional.cta.subtitle', 'Contact us for custom quotes on any service. Download our full pricing guide for the complete breakdown.')}</p>
                            <div className="cta-actions">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('additional_page_cta_pricing')}>
                                    {t('actions.downloadFullPricingGuide', 'Download Full Pricing Guide')}
                                </button>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('additional_page_cta_discovery')}>
                                    {t('additional.cta.secondary', 'Request A Custom Quote')}
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
