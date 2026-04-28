import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import StaggeredText from '../components/StaggeredText';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
import IconGlyph from '../components/IconGlyph';
import { SITE_CONTACT, DISCOVERY_CALL_MAILTO, buildProjectInquiryMailto } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';
import {
  trackContactChannelClick,
  trackContactFormAttempt,
  trackContactFormOutcome,
  trackDiscoveryCallClick,
} from '../services/analyticsService';

const INITIAL_CONTACT_FORM = {
  name: '',
  email: '',
  message: '',
};

export default function HomePage({ onDownloadClick }) {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT_FORM);
  const [contactStatus, setContactStatus] = useState('idle');

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (contactStatus !== 'idle') {
      setContactStatus('idle');
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactStatus('sending');
    trackContactFormAttempt('home_contact_form');

    const submission = await submitContactInquiry(contactForm);

    if (submission.ok) {
      setContactStatus('sent');
      setContactForm(INITIAL_CONTACT_FORM);
      trackContactFormOutcome('submitted', 'home_contact_form');
      return;
    }

    if (['unconfigured', 'request-failed', 'timeout', 'network-error'].includes(submission.type)) {
      window.location.href = buildProjectInquiryMailto(submission.payload || contactForm);
      setContactStatus('fallback');
      setContactForm(INITIAL_CONTACT_FORM);
      trackContactFormOutcome('fallback_mailto', 'home_contact_form', submission.type);
      return;
    }

    setContactStatus('error');
    trackContactFormOutcome('failed', 'home_contact_form', submission.type);
  };

  return (
    <>
      <section className="hero" id="hero">
        <div className="container hero-shell">
          <div className="hero-copy">
            <ScrollReveal delay={0.1}>
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                2026 Service Menu Available
              </div>
            </ScrollReveal>

            <h1>
              <StaggeredText text="Build better sites, faster" delay={0.2} />
            </h1>

            <ScrollReveal delay={0.45}>
              <p>
                From stunning websites to enterprise SaaS, we deliver end-to-end digital solutions tailored for the Ethiopian market and beyond.
              </p>
              <div className="hero-actions">
                <MagneticButton className="btn btn-primary btn-lg" onClick={() => onDownloadClick('home_hero_pricing')}>
                  Get Pricing Guide
                </MagneticButton>
                <MagneticButton className="btn btn-secondary btn-lg" onClick={() => navigate('/web-development')}>
                  Explore Services
                </MagneticButton>
              </div>
              <div className="hero-trust-row" aria-label="Core trust points">
                <span className="trust-pill">Telebirr and Chapa Integration</span>
                <span className="trust-pill">Multilingual Product Teams</span>
                <span className="trust-pill">Launch Support Included</span>
              </div>
            </ScrollReveal>

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

          <ScrollReveal delay={0.28}>
            <aside className="hero-panel glass-card" aria-label="Core service pillars">
              <div className="hero-panel-label">Core Solutions</div>
              <div className="hero-features">
                <TiltCard className="hero-feature-card">
                  <div className="card-icon" aria-hidden="true"><IconGlyph name="globe" size={20} /></div>
                  <h3>Web Development</h3>
                  <p>Custom websites with modern technology, optimized for performance and conversions across all devices.</p>
                </TiltCard>
                <TiltCard className="hero-feature-card">
                  <div className="card-icon" aria-hidden="true"><IconGlyph name="mobile" size={20} /></div>
                  <h3>Mobile Apps</h3>
                  <p>Cross-platform iOS & Android apps with offline-first architecture and local payment integrations.</p>
                </TiltCard>
                <TiltCard className="hero-feature-card">
                  <div className="card-icon" aria-hidden="true"><IconGlyph name="cloud" size={20} /></div>
                  <h3>SaaS Solutions</h3>
                  <p>Rent-to-use cloud management systems for schools, hospitals, and real estate companies.</p>
                </TiltCard>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </section>

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
                  <span className="about-card-icon" aria-hidden="true"><IconGlyph name="office" size={22} /></span>
                </div>
                <h3>Who We Are</h3>
                <p>
                  We are a premier technology and digital marketing agency specializing in high-performance web architecture, cross-platform mobile application development, and enterprise-grade software. We understand that your digital presence needs to do more than just establish instant credibility, it must function as a dynamic sales tool and a robust operational hub tailored to your business needs.
                </p>
              </TiltCard>

              <TiltCard className="about-card">
                <div className="about-card-icon-wrap">
                  <span className="about-card-icon" aria-hidden="true"><IconGlyph name="settings" size={22} /></span>
                </div>
                <h3>What We Do</h3>
                <p>
                  Our development tiers are meticulously designed to scale with you, accommodating varying technical complexities and platform requirements. We partner with a diverse range of clients, from local startups, personal brands, and NGOs to multi-national corporations, large hotels, and government bureaus. Whether you need a responsive, highly optimized web presence, a custom mobile app, or fully hosted enterprise systems, our packages are built to elevate your operations.
                </p>
              </TiltCard>

              <TiltCard className="about-card">
                <div className="about-card-icon-wrap">
                  <span className="about-card-icon" aria-hidden="true"><IconGlyph name="earth" size={22} /></span>
                </div>
                <h3>Built for the Local &amp; Global Market</h3>
                <p>
                  We proudly engineer software tailored for the Ethiopian market and beyond. Our custom architectures feature seamless multi-language support (English, Amharic, Afaan Oromoo) and direct API integrations with local payment gateways like Telebirr, Chapa, and CBE Birr. Paired with our targeted digital marketing strategies, focusing on everything from local reach to full market domination, we ensure your brand connects with the right audience and drives substantial ROI.
                </p>
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="services">
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
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="globe" size={21} /></div>
                <h3>Web Design & Development</h3>
                <p>From starter websites to enterprise platforms. Custom-built with modern technology, optimized for performance and conversions.</p>
                <span className="arrow"><span>View Packages</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>

              <TiltCard to="/mobile-development" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="mobile" size={21} /></div>
                <h3>Mobile App Development</h3>
                <p>Cross-platform iOS & Android apps built with Flutter and React Native. Designed for the Ethiopian market.</p>
                <span className="arrow"><span>View Packages</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>

              <TiltCard to="/saas-solutions" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="cloud" size={21} /></div>
                <h3>SaaS Cloud Solutions</h3>
                <p>Rent-to-use management systems for schools, hospitals, and real estate. Zero IT overhead.</p>
                <span className="arrow"><span>View Packages</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>

              <TiltCard to="/additional-services" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="palette" size={21} /></div>
                <h3>Branding & Additional</h3>
                <p>Logo design, photography, copywriting, domain hosting, and annual maintenance packages.</p>
                <span className="arrow"><span>View Packages</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="testimonials">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Testimonials"
              title="What Our Clients Say"
              subtitle="Don't take our word for it, here is what businesses we've partnered with have to say."
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-stars">5.0 Rating</div>
                <blockquote>
                  "NovaTech completely transformed our online presence. Our new website loads 3x faster and conversions increased by 40% in the first month."
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">AK</div>
                  <div className="testimonial-author-info">
                    <h4>Abel Kebede</h4>
                    <span>CEO, Habesha Brands</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">5.0 Rating</div>
                <blockquote>
                  "The SaaS platform they built for our school has streamlined everything from attendance to grade reports. Parents love the Telegram notifications."
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">ST</div>
                  <div className="testimonial-author-info">
                    <h4>Sara Tesfaye</h4>
                    <span>Director, Bright Future Academy</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">5.0 Rating</div>
                <blockquote>
                  "Their mobile app with Telebirr integration has been a game-changer for our delivery service. Professional team with exceptional follow-through."
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">DM</div>
                  <div className="testimonial-author-info">
                    <h4>Daniel Mekonnen</h4>
                    <span>Founder, QuickDeliver ET</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Our Process"
              title="How We Work"
              subtitle="A proven 4-step process that takes your project from idea to launch with transparency at every stage."
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="process-grid">
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">01</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="search" size={18} /></span>
                </div>
                <h3>Discovery</h3>
                <p>We learn your business, goals, audience, and competition to define the perfect strategy.</p>
              </div>
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">02</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="palette" size={18} /></span>
                </div>
                <h3>Design</h3>
                <p>Wireframes and high-fidelity mockups crafted for your brand, reviewed until perfect.</p>
              </div>
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">03</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="settings" size={18} /></span>
                </div>
                <h3>Develop</h3>
                <p>Clean, scalable code built with modern frameworks. Rigorous testing at every milestone.</p>
              </div>
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">04</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="rocket" size={18} /></span>
                </div>
                <h3>Deploy</h3>
                <p>Launch with confidence. We handle hosting, SEO, and provide ongoing support and training.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Our Work"
              title="Featured Projects"
              subtitle="A glimpse of the digital experiences we've crafted for businesses across Ethiopia and beyond."
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="portfolio-grid">
              <div className="portfolio-card">
                <div className="portfolio-card-tag">Web Platform</div>
                <div className="portfolio-card-content">
                  <h3>E-Commerce Marketplace</h3>
                  <p>Multi-vendor platform with Chapa payment integration, real-time inventory, and Amharic support.</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="portfolio-card-tag">Mobile App</div>
                <div className="portfolio-card-content">
                  <h3>Delivery Service App</h3>
                  <p>Cross-platform app with live tracking, Telebirr payments, and push notifications via Telegram.</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="portfolio-card-tag">SaaS Platform</div>
                <div className="portfolio-card-content">
                  <h3>School Management System</h3>
                  <p>Cloud-based ERP serving 50+ schools with grading, attendance, fees, and parent portals.</p>
                </div>
              </div>
            </div>
            <div className="portfolio-coming-soon">
              Full portfolio page with detailed case studies coming soon. Stay tuned.
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag="Get In Touch"
              title="Let's Start Your Project"
              subtitle="Have a project in mind? Drop us a message and we'll get back to you within 24 hours."
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="contact-grid">
              <div className="contact-form-card">
                <h3>Send Us a Message</h3>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Hana Bekele"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="team@company.et"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={contactStatus === 'sending'}>
                    {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className={`form-feedback ${contactStatus}`} role="status" aria-live="polite">
                    {contactStatus === 'sent'
                      ? 'Thanks. Your message was submitted successfully and our team will respond within 24 hours.'
                      : contactStatus === 'fallback'
                      ? 'We could not reach our API endpoint, so we opened your email app to complete the request.'
                      : contactStatus === 'error'
                      ? 'Please verify your name, email, and message, then try again.'
                      : contactStatus === 'sending'
                      ? 'Sending your request through our secure contact API...'
                      : 'We usually respond in less than one business day.'}
                  </p>
                </form>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="mail" size={17} /></div>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${SITE_CONTACT.email}`} onClick={() => trackContactChannelClick('email', 'home_contact_info')}>
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="phone" size={17} /></div>
                  <div>
                    <h4>Phone</h4>
                    <a href={SITE_CONTACT.phoneHref} onClick={() => trackContactChannelClick('phone', 'home_contact_info')}>
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="chat" size={17} /></div>
                  <div>
                    <h4>Telegram</h4>
                    <a
                      href={SITE_CONTACT.telegramUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackContactChannelClick('telegram', 'home_contact_info')}
                    >
                      {SITE_CONTACT.telegramHandle}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="pin" size={17} /></div>
                  <div>
                    <h4>Location</h4>
                    <a
                      href={SITE_CONTACT.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackContactChannelClick('maps', 'home_contact_info')}
                    >
                      {SITE_CONTACT.locationLabel}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-sm cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-inner">
              <h2>Ready to Transform Your Business?</h2>
              <p>Download our comprehensive 2026 Service Menu & Pricing Guide to find the perfect package.</p>
              <div className="cta-actions">
                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('home_bottom_pricing')}>
                  Get Your Free Pricing Guide
                </button>
                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('home_bottom_discovery')}>
                  Book Discovery Call
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
