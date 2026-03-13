import PricingCard from '../components/PricingCard';
import InteractivePricing from '../components/InteractivePricing';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

export default function MobileDevelopmentPage({ onDownloadClick }) {
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

                    <ScrollReveal stagger>
                        <InteractivePricing
                            onDownloadClick={onDownloadClick}
                            packages={[
                                {
                                    icon: "📲",
                                    title: "Basic Utility App",
                                    subtitle: "Simple & Effective",
                                    price: "40,000 – 60,000",
                                    timeline: "4–6 Weeks Delivery",
                                    features: [
                                        'Cross-platform (iOS + Android)',
                                        'Up to 8 screens',
                                        'Flutter / React Native',
                                        'Push notifications',
                                        'Basic API integration',
                                        'App Store & Play Store submission',
                                        'User authentication (login/signup)',
                                        'Offline data caching',
                                    ],
                                    ctaText: "Start Building"
                                },
                                {
                                    icon: "🛒",
                                    title: "Business & E-Commerce App",
                                    subtitle: "Full-Featured",
                                    price: "80,000 – 150,000",
                                    timeline: "6–10 Weeks Delivery",
                                    recommended: true,
                                    badgeText: "★ Best Value",
                                    features: [
                                        'Everything in Basic Utility',
                                        'Up to 20+ screens',
                                        'Payment integration (Telebirr, CBE, Stripe)',
                                        'Product catalog & cart system',
                                        'Order tracking & notifications',
                                        'Admin panel / dashboard',
                                        'Real-time chat support',
                                        'Analytics & user tracking',
                                        'Multi-language support (Amharic + English)',
                                    ],
                                    ctaText: "Build Your Store"
                                },
                                {
                                    icon: "🏦",
                                    title: "Enterprise / FinTech App",
                                    subtitle: "Mission-Critical",
                                    price: "200,000+",
                                    timeline: "12–16 Weeks Delivery",
                                    features: [
                                        'Everything in Business tier',
                                        'Unlimited screens & features',
                                        'Advanced security & encryption',
                                        'Biometric authentication',
                                        'Complex API & microservices',
                                        'Real-time data synchronization',
                                        'Compliance & audit readiness',
                                        'CI/CD pipeline setup',
                                        'Dedicated development team',
                                        'SLA with 24/7 support',
                                    ],
                                    ctaText: "Contact for Proposal"
                                }
                            ]}
                        />
                    </ScrollReveal>
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

                    <ScrollReveal stagger>
                        <div className="addon-grid">
                            <div className="addon-card">
                                <h4>🚀 App Launch & Visibility Setup</h4>
                                <div className="price">
                                    8,000 ETB<span className="detail">One-time setup + 3,000/mo management</span>
                                </div>
                                <ul>
                                    <li><span className="check">✓</span> App Store Optimization (ASO)</li>
                                    <li><span className="check">✓</span> Keyword research & metadata optimization</li>
                                    <li><span className="check">✓</span> Screenshot & preview video design</li>
                                    <li><span className="check">✓</span> App description copywriting</li>
                                    <li><span className="check">✓</span> Rating & review strategy</li>
                                    <li><span className="check">✓</span> Initial launch campaign setup</li>
                                </ul>
                            </div>

                            <div className="addon-card addon-card-featured">
                                <h4>📈 Growth & Acquisition</h4>
                                <div className="price">
                                    12,000 ETB<span className="detail">Management Fee /month</span>
                                    <span className="detail">+ 10,000–25,000 ETB CPI Ad Spend</span>
                                </div>
                                <ul>
                                    <li><span className="check">✓</span> Everything in Launch & Visibility</li>
                                    <li><span className="check">✓</span> Cost Per Install (CPI) campaigns</li>
                                    <li><span className="check">✓</span> Google UAC & Meta App Install ads</li>
                                    <li><span className="check">✓</span> Audience targeting & retargeting</li>
                                    <li><span className="check">✓</span> Weekly performance reporting</li>
                                    <li><span className="check">✓</span> A/B testing of creatives</li>
                                </ul>
                            </div>

                            <div className="addon-card">
                                <h4>🏆 App Scaling & User Retention</h4>
                                <div className="price">
                                    25,000 ETB<span className="detail">Management Fee /month</span>
                                    <span className="detail">+ 30,000–60,000 ETB Ad Spend</span>
                                </div>
                                <ul>
                                    <li><span className="check">✓</span> Everything in Growth & Acquisition</li>
                                    <li><span className="check">✓</span> Push notification campaigns</li>
                                    <li><span className="check">✓</span> In-app engagement optimization</li>
                                    <li><span className="check">✓</span> User retention & churn analysis</li>
                                    <li><span className="check">✓</span> Referral program setup</li>
                                    <li><span className="check">✓</span> Advanced analytics & cohort analysis</li>
                                    <li><span className="check">✓</span> Dedicated app marketing strategist</li>
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
