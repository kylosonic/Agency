import { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
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
                </div>
            </section>

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
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Loading Services...</td>
                                        </tr>
                                    ) : (
                                        services.map((item, i) => (
                                            <tr key={i}>
                                                <td><strong>{item.service}</strong></td>
                                                <td style={{ color: 'var(--text-secondary)' }}>{item.description}</td>
                                                <td className="price-cell">{item.price}</td>
                                                <td>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        padding: '0.25rem 0.7rem',
                                                        background: 'var(--bg-secondary)',
                                                        border: '1px solid var(--glass-border)',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.78rem',
                                                        color: 'var(--text-secondary)',
                                                        fontWeight: 500,
                                                    }}>
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
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <p>Loading Featured Add-Ons...</p>
                            </div>
                        ) : (
                            <div className="services-grid">
                                {featuredAddons.map((addon, i) => (
                                    <div key={i} className="service-card">
                                        <div className="service-card-icon">{addon.icon}</div>
                                        <h3>{addon.title}</h3>
                                        <p>{addon.description}</p>
                                        <div style={{ 
                                            marginTop: 'var(--space-md)', 
                                            fontFamily: 'var(--font-heading)', 
                                            fontWeight: 700, 
                                            fontSize: '1.15rem' 
                                        }}>
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
