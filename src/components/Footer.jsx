import { Link } from 'react-router-dom';
import { SITE_CONTACT } from '../config/siteConfig';
import { trackContactChannelClick } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';
import LogoMark from './LogoMark';

// TECH-19 (B35): lean, ordered footer — brand row, four link columns,
// legal bar. Zero new copy: every label reuses an existing footer.links.*
// key. The Connect column keeps the mailto: anchor FIRST (E2E hook).
export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="navbar-logo">
                            <LogoMark />
                            <span>{t('brand.name', 'NovaTech AI')}</span>
                        </Link>
                        <p>
                            Founder-led digital systems studio for Ethiopian teams that need clearer workflows, sharper commercial surfaces, and builds grounded in real operating constraints.
                        </p>
                    </div>

                    <div>
                        <h4>{t('footer.links.aiSolutionsHeading', 'AI Solutions')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">{t('footer.links.aiSolutions', 'AI Solutions')}</Link></li>
                            <li><Link to="/workflow-audit">{t('footer.links.workflowAudit', 'Workflow Audit')}</Link></li>
                            <li><Link to="/pricing">{t('footer.links.pricing', 'Pricing')}</Link></li>
                            <li><Link to="/book-discovery-call">{t('footer.links.strategyCall', 'Discovery Call')}</Link></li>
                            <li><Link to="/instant-quote">Instant Quote</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>{t('footer.company', 'Company')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/services#delivery-tracks">Web, Mobile & SaaS</Link></li>
                            <li><Link to="/web-development">Web systems</Link></li>
                            <li><Link to="/mobile-development">Mobile products</Link></li>
                            <li><Link to="/saas-solutions">SaaS waitlist</Link></li>
                            <li><Link to="/policy">Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>How we work</h4>
                        <ul className="footer-links">
                            <li><a href="/#why-audit-first">Why the audit comes first</a></li>
                            <li><a href="/#offer-ladder">Offer ladder</a></li>
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
