import { useState, useEffect } from 'react';
import PricingCard from '../components/PricingCard';
import InteractivePricing from '../components/InteractivePricing';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import { getMobilePackages, getAppMarketingAddons } from '../services/firebaseService';

export default function MobileDevelopmentPage({ onDownloadClick }) {
    const [packages, setPackages] = useState([]);
    const [addons, setAddons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mobileData, addonData] = await Promise.all([
                    getMobilePackages(),
                    getAppMarketingAddons()
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
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1>Mobile App<br />Development</h1>
                    <p>Cross-platform and native iOS & Android apps built with Flutter and React Native — designed for the Ethiopian market.</p>
                </div>
            </section>

            {/* App Development Tiers */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="App Packages"
                            title="Build Your Mobile App"
                            subtitle="From simple utility apps to complex FinTech platforms — we've got you covered."
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

            {/* Mobile Marketing Packages */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="App Marketing"
                            title="Mobile App Digital Marketing"
                            subtitle="Drive installs, optimize your store listing, and scale your user base with our specialized app marketing services."
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
                                            {addon.fee} ETB<span className="detail">{addon.id === 'launch' ? addon.adSpend : `Management Fee /month`}</span>
                                            {addon.id !== 'launch' && <span className="detail">+ {addon.adSpend} ETB {addon.id === 'growth' ? 'CPI ' : ''}Ad Spend</span>}
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
                            <h2>Have an App Idea?</h2>
                            <p>Let's turn your vision into a market-ready mobile application. Download our full guide for detailed specs and pricing.</p>
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
