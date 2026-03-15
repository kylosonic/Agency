import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/web-development', label: 'Web Dev' },
    { to: '/mobile-development', label: 'Mobile Apps' },
    { to: '/saas-solutions', label: 'SaaS' },
    { to: '/additional-services', label: 'Services' },
    { to: '/policy', label: 'Policy' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">◆</span>
            <span>ጣዉላtech</span>
          </Link>

          <div className="navbar-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
            <button className="btn btn-primary btn-sm navbar-cta" onClick={onDownloadClick}>
              Pricing Guide
            </button>
          </div>

          <div
            className={`mobile-menu-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
        <button className="btn btn-primary" onClick={onDownloadClick}>
          Download Pricing Guide
        </button>
      </div>
    </>
  );
}
