import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/useLanguage';

const PRIMARY_LINKS = [
  { to: '/services', label: 'AI Solutions' },
  { to: '/workflow-audit', label: 'Workflow Audit' },
  { to: '/pricing', label: 'Pricing' },
];

const ENGINEERING_LINKS = [
  { to: '/web-development', label: 'Web Development' },
  { to: '/mobile-development', label: 'Mobile Applications' },
  { to: '/saas-solutions', label: 'SaaS Products' },
  { to: '/additional-services', label: 'Additional Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/portfolio', label: 'Portfolio' },
];

const ENGINEERING_LABEL = 'Product Engineering';

const WORKFLOW_ROUTES = new Set(['/workflow-audit', '/book-discovery-call']);

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [engineeringOpen, setEngineeringOpen] = useState(false);
  const engineeringRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!engineeringOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!engineeringRef.current?.contains(event.target)) {
        setEngineeringOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setEngineeringOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [engineeringOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

  const closeMobileNav = () => setMobileOpen(false);

  const isWorkflowActive = WORKFLOW_ROUTES.has(location.pathname);
  const isEngineeringActive = ENGINEERING_LINKS.some((link) => location.pathname === link.to);

  const isPrimaryLinkActive = (to) => {
    if (to === '/workflow-audit') {
      return isWorkflowActive;
    }

    return location.pathname === to;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">N</span>
            <span>NovaTech AI</span>
          </Link>

          <div className="navbar-desktop">
            <div className="navbar-links">
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={isPrimaryLinkActive(link.to) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              ))}

              <div
                className={`navbar-engineering ${engineeringOpen ? 'open' : ''}`}
                ref={engineeringRef}
                onMouseEnter={() => setEngineeringOpen(true)}
                onMouseLeave={() => setEngineeringOpen(false)}
              >
                <button
                  type="button"
                  className={`navbar-engineering-trigger ${isEngineeringActive ? 'active' : ''}`.trim()}
                  aria-expanded={engineeringOpen}
                  aria-haspopup="true"
                  onClick={() => setEngineeringOpen((current) => !current)}
                >
                  {ENGINEERING_LABEL}
                  <span className="navbar-engineering-caret" aria-hidden="true">v</span>
                </button>

                <div className="navbar-engineering-menu" role="menu" aria-label="Product engineering links">
                  {ENGINEERING_LINKS.map((link) => (
                    <Link key={link.to} to={link.to} role="menuitem">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="navbar-controls">
              <LanguageSwitcher compact />
              <DarkModeToggle />
              <Link to="/workflow-audit" className="btn btn-primary btn-sm navbar-cta">
                Book Audit
              </Link>
            </div>
          </div>

          <div className="navbar-mobile-actions">
            <LanguageSwitcher compact />
            <DarkModeToggle />
            <button
              type="button"
              className={`mobile-menu-toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`} onClick={closeMobileNav} aria-hidden="true" />

      <nav
        id="mobile-navigation"
        className={`mobile-nav ${mobileOpen ? 'open' : ''}`}
        aria-label={t('nav.mobileNavigation', 'Mobile navigation')}
        aria-hidden={!mobileOpen}
      >
        {PRIMARY_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isPrimaryLinkActive(link.to) ? 'active' : ''}
            onClick={closeMobileNav}
          >
            {link.label}
          </Link>
        ))}

        <div className="mobile-nav-group" aria-label="Product engineering links">
          <p className="mobile-nav-group-title">{ENGINEERING_LABEL}</p>
          {ENGINEERING_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
              onClick={closeMobileNav}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link to="/workflow-audit" className="btn btn-primary" onClick={closeMobileNav}>
          Book Audit
        </Link>
      </nav>
    </>
  );
}
