import { Link } from 'react-router-dom';
import { SITE_CONTACT } from '../config/siteConfig';
import { trackContactChannelClick } from '../services/analyticsService';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="navbar-logo">
                            <span className="logo-icon">N</span>
                            <span>NovaTech</span>
                        </Link>
                        <p>
                            Your trusted partner for digital transformation. We craft innovative web, mobile, and SaaS solutions tailored for the Ethiopian market and beyond.
                        </p>
                    </div>

                    <div>
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/web-development">Web Development</Link></li>
                            <li><Link to="/mobile-development">Mobile Apps</Link></li>
                            <li><Link to="/saas-solutions">SaaS Solutions</Link></li>
                            <li><Link to="/additional-services">Additional Services</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Company</h4>
                        <ul className="footer-links">
                            <li><Link to="/policy">Payment Policy</Link></li>
                            <li><a href="/#about">About Us</a></li>
                            <li><a href="/#process">Our Process</a></li>
                            <li><a href="/#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Connect</h4>
                        <ul className="footer-links">
                            <li><a href={`mailto:${SITE_CONTACT.email}`} onClick={() => trackContactChannelClick('email', 'footer')}>{SITE_CONTACT.email}</a></li>
                            <li><a href={SITE_CONTACT.phoneHref} onClick={() => trackContactChannelClick('phone', 'footer')}>{SITE_CONTACT.phoneDisplay}</a></li>
                            <li><a href={SITE_CONTACT.linkedinUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('linkedin', 'footer')}>LinkedIn</a></li>
                            <li><a href={SITE_CONTACT.telegramUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('telegram', 'footer')}>Telegram</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 NovaTech Digital Agency. All rights reserved.</span>
                    <a href={SITE_CONTACT.mapsUrl} target="_blank" rel="noreferrer" onClick={() => trackContactChannelClick('maps', 'footer')}>{SITE_CONTACT.locationLabel}</a>
                </div>
            </div>
        </footer>
    );
}
