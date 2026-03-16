import { Link } from 'react-router-dom';

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
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#careers">Careers</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Connect</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:hello@novatech.et">hello@novatech.et</a></li>
                            <li><a href="tel:+251911000000">+251 911 000 000</a></li>
                            <li><a href="#">LinkedIn</a></li>
                            <li><a href="#">Telegram</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 NovaTech Digital Agency. All rights reserved.</span>
                    <span>Addis Ababa, Ethiopia 🇪🇹</span>
                </div>
            </div>
        </footer>
    );
}
