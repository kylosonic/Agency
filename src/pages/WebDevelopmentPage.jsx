import PricingCard from '../components/PricingCard';
import InteractivePricing from '../components/InteractivePricing';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

export default function WebDevelopmentPage({ onDownloadClick }) {
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

                    <ScrollReveal stagger>
                        <InteractivePricing
                            onDownloadClick={onDownloadClick}
                            packages={[
                                {
                                    icon: "🚀",
                                    title: 'The "Digital Presence" Package',
                                    subtitle: "Starter",
                                    price: "20,000",
                                    period: "starting",
                                    timeline: "2–3 Weeks Delivery",
                                    features: [
                                        'Up to 5 custom-designed pages',
                                        'Mobile-responsive design',
                                        'Basic SEO setup',
                                        'Contact form integration',
                                        'Social media linking',
                                        'Google Analytics setup',
                                        'SSL certificate & basic security',
                                        '3 months free maintenance',
                                    ],
                                    ctaText: "Start Your Presence"
                                },
                                {
                                    icon: "📈",
                                    title: 'The "Growth & Conversion" Package',
                                    subtitle: "Recommended",
                                    price: "50,000 – 80,000",
                                    timeline: "3–5 Weeks Delivery",
                                    recommended: true,
                                    badgeText: "★ Most Popular",
                                    features: [
                                        'Up to 15 custom pages',
                                        'Advanced UI/UX design',
                                        'CMS integration (WordPress/Headless)',
                                        'E-commerce ready (up to 50 products)',
                                        'Payment gateway integration',
                                        'Advanced SEO & speed optimization',
                                        'Blog/News section',
                                        'Email marketing integration',
                                        'Live chat widget',
                                        'Admin dashboard',
                                    ],
                                    ctaText: "Accelerate Growth"
                                },
                                {
                                    icon: "🏛️",
                                    title: 'The "Enterprise" Package',
                                    subtitle: "Custom",
                                    price: "150,000+",
                                    timeline: "6–8 Weeks Delivery",
                                    features: [
                                        'Unlimited custom pages',
                                        'Custom web application development',
                                        'Advanced database architecture',
                                        'API development & integrations',
                                        'Multi-language support',
                                        'Role-based admin panel',
                                        'Custom analytics dashboard',
                                        'Load testing & optimization',
                                        'Dedicated project manager',
                                        'Priority 24/7 support',
                                        'SLA guarantee',
                                    ],
                                    ctaText: "Contact for Quote"
                                }
                            ]}
                        />
                    </ScrollReveal>
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

                    <ScrollReveal stagger>
                        <div className="addon-grid">
                            <div className="addon-card">
                                <h4>🔍 The Visibility Boost</h4>
                                <div className="price">
                                    5,000 ETB<span className="detail">Management Fee /month</span>
                                    <span className="detail">+ 3,000–5,000 ETB Ad Spend</span>
                                </div>
                                <ul>
                                    <li><span className="check">✓</span> Google Business Profile optimization</li>
                                    <li><span className="check">✓</span> Basic social media ads (Facebook/Instagram)</li>
                                    <li><span className="check">✓</span> Monthly performance report</li>
                                    <li><span className="check">✓</span> Keyword research & basic SEO</li>
                                </ul>
                            </div>

                            <div className="addon-card addon-card-featured">
                                <h4>🎯 The Lead Generator</h4>
                                <div className="price">
                                    10,000 ETB<span className="detail">Management Fee /month</span>
                                    <span className="detail">+ 7,000–15,000 ETB Ad Spend</span>
                                </div>
                                <ul>
                                    <li><span className="check">✓</span> Everything in Visibility Boost</li>
                                    <li><span className="check">✓</span> Google Ads (Search + Display)</li>
                                    <li><span className="check">✓</span> Landing page optimization</li>
                                    <li><span className="check">✓</span> A/B testing & conversion tracking</li>
                                    <li><span className="check">✓</span> Lead nurturing email sequences</li>
                                    <li><span className="check">✓</span> Bi-weekly strategy calls</li>
                                </ul>
                            </div>

                            <div className="addon-card">
                                <h4>👑 The Market Dominator</h4>
                                <div className="price">
                                    20,000 ETB<span className="detail">Management Fee /month</span>
                                    <span className="detail">+ 20,000–50,000 ETB Ad Spend</span>
                                </div>
                                <ul>
                                    <li><span className="check">✓</span> Everything in Lead Generator</li>
                                    <li><span className="check">✓</span> Full omnichannel campaigns</li>
                                    <li><span className="check">✓</span> Video ad production</li>
                                    <li><span className="check">✓</span> Influencer partnership management</li>
                                    <li><span className="check">✓</span> Advanced analytics & attribution</li>
                                    <li><span className="check">✓</span> Dedicated marketing strategist</li>
                                    <li><span className="check">✓</span> Weekly strategy sessions</li>
                                </ul>
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
