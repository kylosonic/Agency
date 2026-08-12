import { Link } from 'react-router-dom';
import { SITE_CONTACT } from '../config/siteConfig';
import { trackContactChannelClick } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';
import LogoMark from './LogoMark';

// TECH-27 (B46): Ft5 Statement footer — one lowercase statement sentence,
// a hairline rule, then a compact row: wordmark | minimal links | muted mono
// contact. Zero new copy: the statement re-uses the existing brand line and
// every label re-uses an existing footer.links.* key. `.footer-grid` survives
// as the compact row container (the E2E statement-footer probe N8 reads its
// columns); the Connect block keeps the mailto: anchor FIRST (E2E hook).
export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-statement">
                    <p>
                        Founder-led digital systems studio for Ethiopian teams that need clearer workflows, sharper commercial surfaces, and builds grounded in real operating constraints.
                    </p>
                </div>

                <div className="footer-grid">
                    <div className="footer-mark">
                        <Link to="/" className="navbar-logo">
                            <LogoMark />
                            <span>{t('brand.name', 'NovaTech')}</span>
                        </Link>
                    </div>

                    <div>
                        <h4>{t('footer.links.aiSolutionsHeading', 'AI Solutions')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">{t('footer.links.aiSolutions', 'AI Solutions')}</Link></li>
                            <li><Link to="/workflow-audit">{t('footer.links.workflowAudit', 'Workflow Audit')}</Link></li>
                            <li><Link to="/pricing">{t('footer.links.pricing', 'Pricing')}</Link></li>
                            <li><Link to="/policy">{t('nav.policy', 'Policy')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
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
                    <span>{t('footer.rights', '© 2026 NovaTech Systems. All rights reserved.')}</span>
                    <a href={SITE_CONTACT.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('maps', 'footer')}>{SITE_CONTACT.locationLabel}</a>
                </div>
            </div>
        </footer>
    );
}
