import { Link } from 'react-router-dom';
import { SITE_CONTACT } from '../config/siteConfig';
import { trackContactChannelClick } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="navbar-logo">
                            <span className="logo-icon">N</span>
                            <span>{t('brand.name', 'NovaTech')}</span>
                        </Link>
                        <p>
                            {t(
                                'footer.description',
                                'Your trusted partner for digital transformation. We craft innovative web, mobile, and SaaS solutions tailored for the Ethiopian market and beyond.',
                            )}
                        </p>
                    </div>

                    <div>
                        <h4>{t('nav.services')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/web-development">{t('nav.web', 'Web Development')}</Link></li>
                            <li><Link to="/mobile-development">{t('nav.mobile', 'Mobile Apps')}</Link></li>
                            <li><Link to="/saas-solutions">{t('nav.saas', 'SaaS Solutions')}</Link></li>
                            <li><Link to="/additional-services">{t('footer.links.additionalServices', 'Additional Services')}</Link></li>
                            <li><Link to="/instant-quote">{t('nav.instantQuote', 'Instant Quote Wizard')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>{t('footer.company', 'Company')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/policy">{t('nav.policy', 'Payment Policy')}</Link></li>
                            <li><Link to="/case-studies">{t('nav.caseStudies', 'Case Studies')}</Link></li>
                            <li><Link to="/portfolio">{t('nav.portfolio', 'Portfolio')}</Link></li>
                            <li><Link to="/book-discovery-call">{t('actions.bookDiscoveryCall', 'Book Discovery Call')}</Link></li>
                            <li><a href="/#about">{t('footer.links.aboutUs', 'About Us')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>{t('footer.connect', 'Connect')}</h4>
                        <ul className="footer-links">
                            <li><a href={`mailto:${SITE_CONTACT.email}`} onClick={() => trackContactChannelClick('email', 'footer')}>{SITE_CONTACT.email}</a></li>
                            <li><a href={SITE_CONTACT.phoneHref} onClick={() => trackContactChannelClick('phone', 'footer')}>{SITE_CONTACT.phoneDisplay}</a></li>
                            <li><a href={SITE_CONTACT.linkedinUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('linkedin', 'footer')}>{t('footer.links.linkedin', 'LinkedIn')}</a></li>
                            <li><a href={SITE_CONTACT.telegramUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('telegram', 'footer')}>{t('channels.telegram', 'Telegram')}</a></li>
                            <li><a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('whatsapp', 'footer')}>{t('channels.whatsapp', 'WhatsApp')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>{t('footer.rights', '© 2026 NovaTech Digital Agency. All rights reserved.')}</span>
                    <a href={SITE_CONTACT.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('maps', 'footer')}>{SITE_CONTACT.locationLabel}</a>
                </div>
            </div>
        </footer>
    );
}
