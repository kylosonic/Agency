import { useState, useEffect } from 'react';
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
import { getWebPackages, getMarketingAddons } from '../services/firebaseService';

export default function WebDevelopmentPage({ onDownloadClick }) {
    const [packages, setPackages] = useState([]);
    const [addons, setAddons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [webData, addonData] = await Promise.all([
                    getWebPackages(),
                    getMarketingAddons()
                ]);
                setPackages(webData);
                setAddons(addonData);
            } catch (error) {
                console.error("Failed to fetch Firebase data:", error);
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
                    <h1>Web Design &<br />Development</h1>
                    <p>Three tailored packages to match your business stage — from establishing your digital presence to dominating your market.</p>
                    <div className="page-hero-meta" aria-label="Web delivery highlights">
                        <span className="page-hero-chip">Conversion-Focused IA</span>
                        <span className="page-hero-chip">SEO and Analytics Baseline</span>
                        <span className="page-hero-chip">Weekly Sprint Reviews</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: 'Kickoff In 48 Hours',
                        text: 'Once scope is approved, we start discovery and wireframing within two business days.',
                    },
                    {
                        title: 'Transparent Build Milestones',
                        text: 'You review clear progress checkpoints every week before we move to the next sprint.',
                    },
                    {
                        title: 'Launch Readiness Included',
                        text: 'Every package includes performance checks, indexing setup, and handover guidance.',
                    },
                ]}
            />

            {/* Pricing Tiers */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="Development Packages"
                            title="Choose Your Package"
                            subtitle="All packages include responsive design, SEO optimization, and 3 months of free support."
                        />
                    </ScrollReveal>

                    {loading ? (
                        <div className="loading-state">
                            <p>Loading Packages...</p>
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

            {/* Monthly Ad Add-Ons */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="Marketing Add-Ons"
                            title="Monthly Digital Marketing Packages"
                            subtitle="Pair your website with a marketing package to generate leads, drive traffic, and dominate search results."
                        />
                    </ScrollReveal>

                    {loading ? (
                        <div className="loading-state">
                            <p>Loading Marketing Add-ons...</p>
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
                                            {addon.fee} ETB<span className="detail">Management Fee /month</span>
                                            <span className="detail">+ {addon.adSpend} ETB Ad Spend</span>
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
                title="Web Growth ROI Estimator"
                subtitle="Estimate potential monthly revenue lift from improved conversion architecture and campaign readiness."
            />

            <FaqAccordion
                title="Web Development FAQs"
                subtitle="Quick answers on ownership, delivery timeline, and post-launch support."
                items={serviceFaqs.web}
            />

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>Need a Custom Quote?</h2>
                            <p>Download our full pricing guide for detailed breakdowns of every package, feature, and add-on.</p>
                            <div className="cta-actions">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('web_page_cta_pricing')}>
                                    Download Full Pricing Guide
                                </button>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('web_page_cta_discovery')}>
                                    Talk To A Strategist
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
