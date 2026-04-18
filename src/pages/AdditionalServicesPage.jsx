import { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import RouteProofStrip from '../components/RouteProofStrip';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { getAdditionalServices, getFeaturedAddons } from '../services/firebaseService';

export default function AdditionalServicesPage({ onDownloadClick }) {
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


    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1>Additional<br />Services</h1>
                    <p>Essential one-time and recurring services to complement your digital presence — from hosting to branding.</p>
                    <div className="page-hero-meta" aria-label="Additional services highlights">
                        <span className="page-hero-chip">Transparent Cost Bands</span>
                        <span className="page-hero-chip">One-Time and Recurring Options</span>
                        <span className="page-hero-chip">Bundle-Ready Add-Ons</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: 'Practical Service Bundles',
                        text: 'Combine hosting, design, and maintenance services without hidden package lock-ins.',
                    },
                    {
                        title: 'Predictable Renewals',
                        text: 'Recurring services are clearly labeled so budgeting and planning stay straightforward.',
                    },
                    {
                        title: 'Scalable Support Options',
                        text: 'Start with essentials and layer in creative or technical support as your brand grows.',
                    },
                ]}
            />

            {/* More Services */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="Service Catalog"
                            title="One-Time & Recurring Services"
                            subtitle="Everything you need to launch, maintain, and elevate your digital products."
                        />
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="services-table-wrapper">
                            <table className="services-table">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Description</th>
                                        <th>Estimated Cost</th>
                                        <th>Billing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="table-loading-cell">Loading Services...</td>
                                        </tr>
                                    ) : (
                                        services.map((item, i) => (
                                            <tr key={i}>
                                                <td><strong>{item.service}</strong></td>
                                                <td className="services-table-description">{item.description}</td>
                                                <td className="price-cell">{item.price}</td>
                                                <td>
                                                    <span className="billing-chip">
                                                        {item.type}
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
                            tag="Highlights"
                            title="Featured Add-Ons"
                            subtitle="Our most popular additional services, packaged to deliver maximum value."
                        />
                    </ScrollReveal>

                    <ScrollReveal stagger>
                        {loading ? (
                            <div className="loading-state">
                                <p>Loading Featured Add-Ons...</p>
                            </div>
                        ) : (
                            <div className="services-grid">
                                {featuredAddons.map((addon, i) => (
                                    <div key={i} className="service-card">
                                        <div className="service-card-icon">{addon.icon}</div>
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

            {/* CTA */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>Need Something Custom?</h2>
                            <p>Contact us for custom quotes on any service. Download our full pricing guide for the complete breakdown.</p>
                            <div className="cta-actions">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('additional_page_cta_pricing')}>
                                    Download Full Pricing Guide
                                </button>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('additional_page_cta_discovery')}>
                                    Request A Custom Quote
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
