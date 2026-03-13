import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

export default function AdditionalServicesPage({ onDownloadClick }) {
    const services = [
        {
            service: 'Domain Registration',
            description: 'Annual .com, .et, or custom domain registration',
            price: '1,500 – 5,000 ETB',
            type: 'Annual',
        },
        {
            service: 'Cloud Web Hosting',
            description: 'Secure, fast SSD-based hosting with SSL & backups',
            price: '5,000 – 15,000 ETB',
            type: 'Annual',
        },
        {
            service: 'Annual Web Maintenance',
            description: 'Updates, security patches, backups, and uptime monitoring',
            price: '8,000 – 20,000 ETB',
            type: 'Annual',
        },
        {
            service: 'App Store Developer Account (Apple)',
            description: 'Apple Developer Program enrollment and submission',
            price: '5,500 ETB',
            type: 'Annual',
        },
        {
            service: 'App Store Developer Account (Google)',
            description: 'Google Play Console one-time registration',
            price: '1,500 ETB',
            type: 'One-Time',
        },
        {
            service: 'Logo & Visual Identity Design',
            description: 'Professional logo, color palette, typography, & brand guidelines',
            price: '5,000 – 15,000 ETB',
            type: 'One-Time',
        },
        {
            service: 'Professional Copywriting',
            description: 'Website copy, product descriptions, and marketing content',
            price: '3,000 – 10,000 ETB',
            type: 'Per Project',
        },
        {
            service: 'Commercial Photography',
            description: 'Product photography, office/team photos, lifestyle shoots',
            price: '5,000 – 20,000 ETB',
            type: 'Per Session',
        },
    ];

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
                                    {services.map((item, i) => (
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
                                    ))}
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
                        <div className="services-grid">
                            <div className="service-card">
                                <div className="service-card-icon">🌐</div>
                                <h3>Domain & Hosting Bundle</h3>
                                <p>Get your domain registration and cloud hosting together at a discounted annual rate. Includes free SSL, daily backups, and 99.9% uptime SLA.</p>
                                <div style={{ marginTop: 'var(--space-md)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>
                                    Starting at 6,000 ETB/yr
                                </div>
                            </div>

                            <div className="service-card">
                                <div className="service-card-icon">🎨</div>
                                <h3>Complete Brand Identity</h3>
                                <p>Professional logo design, color system, typography selection, and comprehensive brand guidelines document. Includes 3 revision rounds.</p>
                                <div style={{ marginTop: 'var(--space-md)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>
                                    Starting at 5,000 ETB
                                </div>
                            </div>

                            <div className="service-card">
                                <div className="service-card-icon">📸</div>
                                <h3>Professional Photography</h3>
                                <p>High-quality commercial photography for your products, team, and workspace. Includes editing, retouching, and web-optimized deliverables.</p>
                                <div style={{ marginTop: 'var(--space-md)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem' }}>
                                    Starting at 5,000 ETB
                                </div>
                            </div>
                        </div>
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
