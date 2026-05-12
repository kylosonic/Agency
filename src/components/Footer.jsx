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
                            <span>{t('brand.name', 'NovaTech AI')}</span>
                        </Link>
                        <p>
                            {t(
                                'footer.description',
                                'AI-first automation consultancy delivering custom agentic workflows while actively building web platforms, mobile apps, and SaaS products for scaling teams.',
                            )}
                        </p>
                    </div>

                    <div>
                        <h4>{t('footer.links.aiSolutionsHeading', 'AI Solutions')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">{t('footer.links.aiSolutions', 'AI Solutions')}</Link></li>
                            <li><Link to="/workflow-audit">{t('footer.links.workflowAudit', 'Workflow Audit')}</Link></li>
                            <li><Link to="/pricing">{t('footer.links.pricing', 'Pricing')}</Link></li>
                            <li><Link to="/book-discovery-call">{t('footer.links.strategyCall', 'Strategy Call')}</Link></li>
                            <li><Link to="/instant-quote">{t('footer.links.automationBrief', 'Automation Brief Wizard')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>{t('footer.company', 'Company')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/services#engineering">{t('footer.links.engineeringLayer', 'Product Engineering (Web, Mobile, SaaS)')}</Link></li>
                            <li><Link to="/web-development">{t('web.hero.title', 'Web Design & Development')}</Link></li>
                            <li><Link to="/mobile-development">{t('mobile.hero.title', 'Mobile App Development')}</Link></li>
                            <li><Link to="/saas-solutions">{t('saas.hero.title', 'SaaS Cloud Solutions')}</Link></li>
                            <li><Link to="/policy">{t('nav.policy', 'Payment Policy')}</Link></li>
                            <li><Link to="/case-studies">{t('nav.caseStudies', 'Case Studies')}</Link></li>
                            <li><Link to="/portfolio">{t('nav.portfolio', 'Portfolio')}</Link></li>
                            <li><a href="/#methodology">{t('footer.links.methodology', 'Methodology')}</a></li>
                            <li><a href="/#searchable-brain">{t('footer.links.searchableBrain', 'The Searchable Brain')}</a></li>
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
                    <span>{t('footer.rights', '© 2026 NovaTech AI Systems. All rights reserved.')}</span>
                    <a href={SITE_CONTACT.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('maps', 'footer')}>{SITE_CONTACT.locationLabel}</a>
                </div>
            </div>
        </footer>
    );
}
