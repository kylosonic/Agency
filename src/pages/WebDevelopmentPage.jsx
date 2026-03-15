import { useState, useEffect } from 'react';
import PricingCard from '../components/PricingCard';
import InteractivePricing from '../components/InteractivePricing';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
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
                </div>
            </section>

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
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
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
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p>Loading Marketing Add-ons...</p>
                        </div>
                    ) : (
                        <ScrollReveal stagger>
                            <div className="addon-grid">
                                {addons.map((addon) => (
                                    <div key={addon.id} className={`addon-card ${addon.featured ? 'addon-card-featured' : ''}`}>
                                        <h4>{addon.icon} {addon.title}</h4>
                                        <div className="price">
                                            {addon.fee} ETB<span className="detail">Management Fee /month</span>
                                            <span className="detail">+ {addon.adSpend} ETB Ad Spend</span>
                                        </div>
                                        <ul>
                                            {addon.features.map((feature, i) => (
                                                <li key={i}><span className="check">✓</span> {feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>Need a Custom Quote?</h2>
                            <p>Download our full pricing guide for detailed breakdowns of every package, feature, and add-on.</p>
                            <button className="btn btn-primary btn-lg" onClick={onDownloadClick}>
                                Download Full Pricing Guide
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
