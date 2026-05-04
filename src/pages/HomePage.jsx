import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';
import StaggeredText from '../components/StaggeredText';
import MagneticButton from '../components/MagneticButton';
import TiltCard from '../components/TiltCard';
import IconGlyph from '../components/IconGlyph';
import RoiEstimator from '../components/RoiEstimator';
import { SITE_CONTACT, DISCOVERY_CALL_MAILTO, buildProjectInquiryMailto } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';
import { queueLeadFollowups } from '../services/leadAutomationService';
import { useLanguage } from '../i18n/useLanguage';
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
  const { t } = useLanguage();
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
      queueLeadFollowups({
        source: 'home_contact_form',
        channel: 'contact_form',
        routePath: '/',
        lead: submission.payload,
      });
      trackContactFormOutcome('submitted', 'home_contact_form');
      return;
    }

    if (['unconfigured', 'request-failed', 'timeout', 'network-error'].includes(submission.type)) {
      queueLeadFollowups({
        source: 'home_contact_form_fallback',
        channel: 'contact_form_mailto',
        routePath: '/',
        lead: submission.payload || contactForm,
      });
      window.open(buildProjectInquiryMailto(submission.payload || contactForm), '_blank');
      setContactStatus('sent');
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
                {t('home.hero.badge', '2026 Service Menu Available')}
              </div>
            </ScrollReveal>

            <h1>
              <StaggeredText text={t('home.hero.title', 'Build better sites, faster')} delay={0.2} />
            </h1>

            <ScrollReveal delay={0.45}>
              <p>
                {t('home.hero.subtitle', 'From stunning websites to enterprise SaaS, we deliver end-to-end digital solutions tailored for the Ethiopian market and beyond.')}
              </p>
              <div className="hero-actions">
                <MagneticButton className="btn btn-primary btn-lg" onClick={() => onDownloadClick('home_hero_pricing')}>
                  {t('actions.downloadPricingGuide')}
                </MagneticButton>
                <MagneticButton className="btn btn-secondary btn-lg" onClick={() => navigate('/web-development')}>
                  {t('actions.exploreServices')}
                </MagneticButton>
              </div>
              <div className="hero-trust-row" aria-label={t('home.hero.trustAria', 'Core trust points')}>
                <span className="trust-pill">{t('home.hero.trust.telebirr', 'Telebirr and Chapa Integration')}</span>
                <span className="trust-pill">{t('home.hero.trust.multilingual', 'Multilingual Product Teams')}</span>
                <span className="trust-pill">{t('home.hero.trust.launchSupport', 'Launch Support Included')}</span>
              </div>
            </ScrollReveal>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">150+</div>
                <div className="hero-stat-label">{t('home.hero.stats.projects', 'Projects Delivered')}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">50+</div>
                <div className="hero-stat-label">{t('home.hero.stats.clients', 'Active Clients')}</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">99%</div>
                <div className="hero-stat-label">{t('home.hero.stats.satisfaction', 'Client Satisfaction')}</div>
              </div>
            </div>
          </div>

          <ScrollReveal delay={0.28}>
            <aside className="hero-panel glass-card" aria-label={t('home.hero.panelAria', 'Core service pillars')}>
              <div className="hero-panel-label">{t('home.hero.panelLabel', 'Core Solutions')}</div>
              <div className="hero-features">
                <TiltCard className="hero-feature-card">
                  <div className="card-icon" aria-hidden="true"><IconGlyph name="globe" size={20} /></div>
                  <h3>{t('home.hero.cards.web.title', 'Web Development')}</h3>
                  <p>{t('home.hero.cards.web.text', 'Custom websites with modern technology, optimized for performance and conversions across all devices.')}</p>
                </TiltCard>
                <TiltCard className="hero-feature-card">
                  <div className="card-icon" aria-hidden="true"><IconGlyph name="mobile" size={20} /></div>
                  <h3>{t('home.hero.cards.mobile.title', 'Mobile Apps')}</h3>
                  <p>{t('home.hero.cards.mobile.text', 'Cross-platform iOS & Android apps with offline-first architecture and local payment integrations.')}</p>
                </TiltCard>
                <TiltCard className="hero-feature-card">
                  <div className="card-icon" aria-hidden="true"><IconGlyph name="cloud" size={20} /></div>
                  <h3>{t('home.hero.cards.saas.title', 'SaaS Solutions')}</h3>
                  <p>{t('home.hero.cards.saas.text', 'Rent-to-use cloud management systems for schools, hospitals, and real estate companies.')}</p>
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
              tag={t('home.about.header.tag', 'About Us')}
              title={t('home.about.header.title', 'Empowering Your Brand with Comprehensive Digital Solutions')}
              subtitle={t('home.about.header.subtitle', 'Cutting-edge development, data-driven marketing, and scalable SaaS platforms built for measurable growth.')}
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="about-grid">
              <TiltCard className="about-card">
                <div className="about-card-icon-wrap">
                  <span className="about-card-icon" aria-hidden="true"><IconGlyph name="office" size={22} /></span>
                </div>
                <h3>{t('home.about.cards.who.title', 'Who We Are')}</h3>
                <p>
                  {t(
                    'home.about.cards.who.text',
                    'We are a premier technology and digital marketing agency specializing in high-performance web architecture, cross-platform mobile application development, and enterprise-grade software. We understand that your digital presence needs to do more than just establish instant credibility, it must function as a dynamic sales tool and a robust operational hub tailored to your business needs.',
                  )}
                </p>
              </TiltCard>

              <TiltCard className="about-card">
                <div className="about-card-icon-wrap">
                  <span className="about-card-icon" aria-hidden="true"><IconGlyph name="settings" size={22} /></span>
                </div>
                <h3>{t('home.about.cards.what.title', 'What We Do')}</h3>
                <p>
                  {t(
                    'home.about.cards.what.text',
                    'Our development tiers are meticulously designed to scale with you, accommodating varying technical complexities and platform requirements. We partner with a diverse range of clients, from local startups, personal brands, and NGOs to multi-national corporations, large hotels, and government bureaus. Whether you need a responsive, highly optimized web presence, a custom mobile app, or fully hosted enterprise systems, our packages are built to elevate your operations.',
                  )}
                </p>
              </TiltCard>

              <TiltCard className="about-card">
                <div className="about-card-icon-wrap">
                  <span className="about-card-icon" aria-hidden="true"><IconGlyph name="earth" size={22} /></span>
                </div>
                <h3>{t('home.about.cards.market.title', 'Built for the Local & Global Market')}</h3>
                <p>
                  {t(
                    'home.about.cards.market.text',
                    'We proudly engineer software tailored for the Ethiopian market and beyond. Our custom architectures feature seamless multi-language support (English, Amharic, Afaan Oromoo) and direct API integrations with local payment gateways like Telebirr, Chapa, and CBE Birr. Paired with our targeted digital marketing strategies, focusing on everything from local reach to full market domination, we ensure your brand connects with the right audience and drives substantial ROI.',
                  )}
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
              tag={t('home.services.header.tag', 'Our Services')}
              title={t('home.services.header.title', 'Comprehensive Digital Solutions')}
              subtitle={t('home.services.header.subtitle', 'Everything you need to establish, grow, and dominate your digital presence.')}
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="services-grid">
              <TiltCard to="/web-development" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="globe" size={21} /></div>
                <h3>{t('home.services.cards.web.title', 'Web Design & Development')}</h3>
                <p>{t('home.services.cards.web.text', 'From starter websites to enterprise platforms. Custom-built with modern technology, optimized for performance and conversions.')}</p>
                <span className="arrow"><span>{t('actions.viewPackages', 'View Packages')}</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>

              <TiltCard to="/mobile-development" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="mobile" size={21} /></div>
                <h3>{t('home.services.cards.mobile.title', 'Mobile App Development')}</h3>
                <p>{t('home.services.cards.mobile.text', 'Cross-platform iOS & Android apps built with Flutter and React Native. Designed for the Ethiopian market.')}</p>
                <span className="arrow"><span>{t('actions.viewPackages', 'View Packages')}</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>

              <TiltCard to="/saas-solutions" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="cloud" size={21} /></div>
                <h3>{t('home.services.cards.saas.title', 'SaaS Cloud Solutions')}</h3>
                <p>{t('home.services.cards.saas.text', 'Rent-to-use management systems for schools, hospitals, and real estate. Zero IT overhead.')}</p>
                <span className="arrow"><span>{t('actions.viewPackages', 'View Packages')}</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>

              <TiltCard to="/additional-services" className="service-card">
                <div className="service-card-icon" aria-hidden="true"><IconGlyph name="palette" size={21} /></div>
                <h3>{t('home.services.cards.additional.title', 'Branding & Additional')}</h3>
                <p>{t('home.services.cards.additional.text', 'Logo design, photography, copywriting, domain hosting, and annual maintenance packages.')}</p>
                <span className="arrow"><span>{t('actions.viewPackages', 'View Packages')}</span><IconGlyph name="arrowRight" size={14} /></span>
              </TiltCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <RoiEstimator
        title={t('home.roi.title', 'Estimate Revenue Impact Before You Commit')}
        subtitle={t('home.roi.subtitle', 'Use your current lead and conversion data to simulate potential growth from a focused digital rollout.')}
      />

      <section className="section" id="testimonials">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('home.testimonials.header.tag', 'Testimonials')}
              title={t('home.testimonials.header.title', 'What Our Clients Say')}
              subtitle={t('home.testimonials.header.subtitle', "Don't take our word for it, here is what businesses we've partnered with have to say.")}
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-stars">{t('home.testimonials.rating', '5.0 Rating')}</div>
                <blockquote>
                  "{t('home.testimonials.items.0.quote', 'NovaTech completely transformed our online presence. Our new website loads 3x faster and conversions increased by 40% in the first month.')}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">AK</div>
                  <div className="testimonial-author-info">
                    <h4>{t('home.testimonials.items.0.name', 'Abel Kebede')}</h4>
                    <span>{t('home.testimonials.items.0.role', 'CEO, Habesha Brands')}</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">{t('home.testimonials.rating', '5.0 Rating')}</div>
                <blockquote>
                  "{t('home.testimonials.items.1.quote', 'The SaaS platform they built for our school has streamlined everything from attendance to grade reports. Parents love the Telegram notifications.')}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">ST</div>
                  <div className="testimonial-author-info">
                    <h4>{t('home.testimonials.items.1.name', 'Sara Tesfaye')}</h4>
                    <span>{t('home.testimonials.items.1.role', 'Director, Bright Future Academy')}</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">{t('home.testimonials.rating', '5.0 Rating')}</div>
                <blockquote>
                  "{t('home.testimonials.items.2.quote', 'Their mobile app with Telebirr integration has been a game-changer for our delivery service. Professional team with exceptional follow-through.')}"
                </blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">DM</div>
                  <div className="testimonial-author-info">
                    <h4>{t('home.testimonials.items.2.name', 'Daniel Mekonnen')}</h4>
                    <span>{t('home.testimonials.items.2.role', 'Founder, QuickDeliver ET')}</span>
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
              tag={t('home.process.header.tag', 'Our Process')}
              title={t('home.process.header.title', 'How We Work')}
              subtitle={t('home.process.header.subtitle', 'A proven 4-step process that takes your project from idea to launch with transparency at every stage.')}
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="process-grid">
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">01</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="search" size={18} /></span>
                </div>
                <h3>{t('home.process.steps.discovery.title', 'Discovery')}</h3>
                <p>{t('home.process.steps.discovery.text', 'We learn your business, goals, audience, and competition to define the perfect strategy.')}</p>
              </div>
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">02</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="palette" size={18} /></span>
                </div>
                <h3>{t('home.process.steps.design.title', 'Design')}</h3>
                <p>{t('home.process.steps.design.text', 'Wireframes and high-fidelity mockups crafted for your brand, reviewed until perfect.')}</p>
              </div>
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">03</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="settings" size={18} /></span>
                </div>
                <h3>{t('home.process.steps.develop.title', 'Develop')}</h3>
                <p>{t('home.process.steps.develop.text', 'Clean, scalable code built with modern frameworks. Rigorous testing at every milestone.')}</p>
              </div>
              <div className="process-step">
                <div className="process-step-emblem" aria-hidden="true">
                  <span className="process-step-emblem-number">04</span>
                  <span className="process-step-emblem-icon"><IconGlyph name="rocket" size={18} /></span>
                </div>
                <h3>{t('home.process.steps.deploy.title', 'Deploy')}</h3>
                <p>{t('home.process.steps.deploy.text', 'Launch with confidence. We handle hosting, SEO, and provide ongoing support and training.')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('home.portfolio.header.tag', 'Our Work')}
              title={t('home.portfolio.header.title', 'Featured Projects')}
              subtitle={t('home.portfolio.header.subtitle', "A glimpse of the digital experiences we've crafted for businesses across Ethiopia and beyond.")}
            />
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="portfolio-grid">
              <div className="portfolio-card">
                <div className="portfolio-card-tag">{t('home.portfolio.cards.web.tag', 'Web Platform')}</div>
                <div className="portfolio-card-content">
                  <h3>{t('home.portfolio.cards.web.title', 'E-Commerce Marketplace')}</h3>
                  <p>{t('home.portfolio.cards.web.text', 'Multi-vendor platform with Chapa payment integration, real-time inventory, and Amharic support.')}</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="portfolio-card-tag">{t('home.portfolio.cards.mobile.tag', 'Mobile App')}</div>
                <div className="portfolio-card-content">
                  <h3>{t('home.portfolio.cards.mobile.title', 'Delivery Service App')}</h3>
                  <p>{t('home.portfolio.cards.mobile.text', 'Cross-platform app with live tracking, Telebirr payments, and push notifications via Telegram.')}</p>
                </div>
              </div>
              <div className="portfolio-card">
                <div className="portfolio-card-tag">{t('home.portfolio.cards.saas.tag', 'SaaS Platform')}</div>
                <div className="portfolio-card-content">
                  <h3>{t('home.portfolio.cards.saas.title', 'School Management System')}</h3>
                  <p>{t('home.portfolio.cards.saas.text', 'Cloud-based ERP serving 50+ schools with grading, attendance, fees, and parent portals.')}</p>
                </div>
              </div>
            </div>
            <div className="portfolio-coming-soon">
              {t('home.portfolio.comingSoon', 'Full portfolio page with detailed case studies coming soon. Stay tuned.')}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              tag={t('home.contact.header.tag', 'Get In Touch')}
              title={t('home.contact.header.title', "Let's Start Your Project")}
              subtitle={t('home.contact.header.subtitle', "Have a project in mind? Drop us a message and we'll get back to you within 24 hours.")}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="contact-grid">
              <div className="contact-form-card">
                <h3>{t('home.contact.form.title', 'Send Us a Message')}</h3>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">{t('home.contact.form.fullName', 'Full Name')}</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder={t('home.contact.form.fullNamePlaceholder', 'Hana Bekele')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">{t('home.contact.form.email', 'Email Address')}</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder={t('home.contact.form.emailPlaceholder', 'team@company.et')}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">{t('home.contact.form.message', 'Your Message')}</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder={t('home.contact.form.messagePlaceholder', 'Tell us about your project...')}
                      rows={5}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={contactStatus === 'sending'}>
                    {contactStatus === 'sending' ? t('states.sending', 'Sending...') : t('home.contact.form.submit', 'Send Message')}
                  </button>
                  <p className={`form-feedback ${contactStatus}`} role="status" aria-live="polite">
                    {contactStatus === 'sent'
                      ? t('home.contact.form.feedback.sent', 'Thanks. Your message was submitted successfully and our team will respond within 24 hours.')
                      : contactStatus === 'fallback'
                      ? t('home.contact.form.feedback.fallback', 'We could not reach our API endpoint, so we opened your email app to complete the request.')
                      : contactStatus === 'error'
                      ? t('home.contact.form.feedback.error', 'Please verify your name, email, and message, then try again.')
                      : contactStatus === 'sending'
                      ? t('home.contact.form.feedback.sending', 'Sending your request through our secure contact API...')
                      : t('home.contact.form.feedback.idle', 'We usually respond in less than one business day.')}
                  </p>
                </form>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="mail" size={17} /></div>
                  <div>
                    <h4>{t('channels.email', 'Email')}</h4>
                    <a href={`mailto:${SITE_CONTACT.email}`} onClick={() => trackContactChannelClick('email', 'home_contact_info')}>
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="phone" size={17} /></div>
                  <div>
                    <h4>{t('channels.phone', 'Phone')}</h4>
                    <a href={SITE_CONTACT.phoneHref} onClick={() => trackContactChannelClick('phone', 'home_contact_info')}>
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon" aria-hidden="true"><IconGlyph name="chat" size={17} /></div>
                  <div>
                    <h4>{t('channels.telegram', 'Telegram')}</h4>
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
                    <h4>{t('channels.location', 'Location')}</h4>
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
              <h2>{t('home.bottomCta.title', 'Ready to Transform Your Business?')}</h2>
              <p>{t('home.bottomCta.subtitle', 'Download our comprehensive 2026 Service Menu & Pricing Guide to find the perfect package.')}</p>
              <div className="cta-actions">
                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('home_bottom_pricing')}>
                  {t('actions.downloadPricingGuide')}
                </button>
                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('home_bottom_discovery')}>
                  {t('actions.bookDiscoveryCall')}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
