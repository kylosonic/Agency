import { Link, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import StaggeredText from '../components/StaggeredText';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';

export default function HomePage({ onDownloadClick }) {
    const navigate = useNavigate();

    return (
        <>
            {/* ===== HERO ===== */}
            <section className="hero">
                <div className="container hero-content">
                    <ScrollReveal delay={0.1}>
                        <div className="hero-badge">
                            <span className="hero-badge-dot"></span>
                            2026 Service Menu Available
                        </div>
                    </ScrollReveal>
                    
                    <h1>
                        <StaggeredText text="Build better sites, faster" delay={0.2} />
                    </h1>
                    
                    <ScrollReveal delay={0.6}>
                        <p>
                            From stunning websites to enterprise SaaS — we deliver end-to-end digital solutions tailored for the Ethiopian market and beyond.
                        </p>
                        <div className="hero-actions">
                            <MagneticButton className="btn btn-primary btn-lg" onClick={onDownloadClick}>
                                Get Pricing Guide
                            </MagneticButton>
                            <MagneticButton className="btn btn-secondary btn-lg" onClick={() => navigate('/web-development')}>
                                Explore Services
                            </MagneticButton>
                        </div>
                    </ScrollReveal>

                    {/* Feature cards — glass bento */}
                    <div className="hero-features">
                        <TiltCard className="hero-feature-card">
                            <div className="card-icon">🌐</div>
                            <h3>Web Development</h3>
                            <p>Custom websites with modern technology, optimized for performance and conversions across all devices.</p>
                        </TiltCard>
                        <TiltCard className="hero-feature-card">
                            <div className="card-icon">📱</div>
                            <h3>Mobile Apps</h3>
                            <p>Cross-platform iOS & Android apps with offline-first architecture and local payment integrations.</p>
                        </TiltCard>
                        <TiltCard className="hero-feature-card">
                            <div className="card-icon">☁️</div>
                            <h3>SaaS Solutions</h3>
                            <p>Rent-to-use cloud management systems for schools, hospitals, and real estate companies.</p>
                        </TiltCard>
                    </div>

                    {/* Stats row */}
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">150+</div>
                            <div className="hero-stat-label">Projects Delivered</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">50+</div>
                            <div className="hero-stat-label">Active Clients</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">99%</div>
                            <div className="hero-stat-label">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT US ===== */}
            <section className="section about-section" id="about">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="About Us"
                            title="Empowering Your Brand with Comprehensive Digital Solutions"
                            subtitle="Cutting-edge development, data-driven marketing, and scalable SaaS platforms built for measurable growth."
                        />
                    </ScrollReveal>

                    <ScrollReveal stagger>
                        <div className="about-grid">
                            <TiltCard className="about-card">
                                <div className="about-card-icon-wrap">
                                    <span className="about-card-icon">🏢</span>
                                </div>
                                <h3>Who We Are</h3>
                                <p>
                                    We are a premier technology and digital marketing agency specializing in high-performance web architecture, cross-platform mobile application development, and enterprise-grade software. We understand that your digital presence needs to do more than just establish instant credibility—it must function as a dynamic sales tool and a robust operational hub tailored to your business needs.
                                </p>
                            </TiltCard>

                            <TiltCard className="about-card">
                                <div className="about-card-icon-wrap">
                                    <span className="about-card-icon">⚙️</span>
                                </div>
                                <h3>What We Do</h3>
                                <p>
                                    Our development tiers are meticulously designed to scale with you, accommodating varying technical complexities and platform requirements. We partner with a diverse range of clients, from local startups, personal brands, and NGOs to multi-national corporations, large hotels, and government bureaus. Whether you need a responsive, highly optimized web presence, a custom mobile app, or fully hosted enterprise systems, our packages are built to elevate your operations.
                                </p>
                            </TiltCard>

                            <TiltCard className="about-card">
                                <div className="about-card-icon-wrap">
                                    <span className="about-card-icon">🌍</span>
                                </div>
                                <h3>Built for the Local &amp; Global Market</h3>
                                <p>
                                    We proudly engineer software tailored for the Ethiopian market and beyond. Our custom architectures feature seamless multi-language support (English, Amharic, Afaan Oromoo) and direct API integrations with local payment gateways like Telebirr, Chapa, and CBE Birr. Paired with our targeted digital marketing strategies—focusing on everything from local reach to full market domination—we ensure your brand connects with the right audience and drives substantial ROI.
                                </p>
                            </TiltCard>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== SERVICES OVERVIEW ===== */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="Our Services"
                            title="Comprehensive Digital Solutions"
                            subtitle="Everything you need to establish, grow, and dominate your digital presence."
                        />
                    </ScrollReveal>

                    <ScrollReveal stagger>
                        <div className="services-grid">
                            <TiltCard to="/web-development" className="service-card">
                                <div className="service-card-icon">🌐</div>
                                <h3>Web Design & Development</h3>
                                <p>From starter websites to enterprise platforms. Custom-built with modern technology, optimized for performance and conversions.</p>
                                <span className="arrow">View Packages →</span>
                            </TiltCard>

                            <TiltCard to="/mobile-development" className="service-card">
                                <div className="service-card-icon">📱</div>
                                <h3>Mobile App Development</h3>
                                <p>Cross-platform iOS & Android apps built with Flutter and React Native. Designed for the Ethiopian market.</p>
                                <span className="arrow">View Packages →</span>
                            </TiltCard>

                            <TiltCard to="/saas-solutions" className="service-card">
                                <div className="service-card-icon">☁️</div>
                                <h3>SaaS Cloud Solutions</h3>
                                <p>Rent-to-use management systems for schools, hospitals, and real estate. Zero IT overhead.</p>
                                <span className="arrow">View Packages →</span>
                            </TiltCard>

                            <TiltCard to="/additional-services" className="service-card">
                                <div className="service-card-icon">🎨</div>
                                <h3>Branding & Additional</h3>
                                <p>Logo design, photography, copywriting, domain hosting, and annual maintenance packages.</p>
                                <span className="arrow">View Packages →</span>
                            </TiltCard>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <SectionHeader
                            tag="Why ጣዉላtech"
                            title="Built Different. Delivered Better."
                            subtitle="We don't just build products — we build digital ecosystems that scale."
                        />
                    </ScrollReveal>

                    <ScrollReveal stagger>
                        <div className="services-grid">
                            <div className="service-card">
                                <div className="service-card-icon">⚡</div>
                                <h3>Performance First</h3>
                                <p>Every pixel is optimized for speed. Our solutions load fast even on 3G connections.</p>
                            </div>
                            <div className="service-card">
                                <div className="service-card-icon">🔒</div>
                                <h3>Enterprise Security</h3>
                                <p>Bank-grade encryption, regular audits, and compliance-ready architecture.</p>
                            </div>
                            <div className="service-card">
                                <div className="service-card-icon">🇪🇹</div>
                                <h3>Ethiopian Market Expertise</h3>
                                <p>Local payment integrations, telecom APIs, and bilingual support built in.</p>
                            </div>
                            <div className="service-card">
                                <div className="service-card-icon">📈</div>
                                <h3>Growth-Driven Marketing</h3>
                                <p>Optional digital marketing add-ons to reach the right audience at the right time.</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>Ready to Transform Your Business?</h2>
                            <p>Download our comprehensive 2026 Service Menu & Pricing Guide to find the perfect package.</p>
                            <button className="btn btn-primary btn-lg" onClick={onDownloadClick}>
                                Get Your Free Pricing Guide
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
