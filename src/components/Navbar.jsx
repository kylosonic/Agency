import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/useLanguage';

const NAV_LINKS = [
  { to: '/', labelKey: 'nav.home', desktop: true },
  { to: '/web-development', labelKey: 'nav.web', desktop: true },
  { to: '/mobile-development', labelKey: 'nav.mobile', desktop: true },
  { to: '/saas-solutions', labelKey: 'nav.saas', desktop: true },
  { to: '/portfolio', labelKey: 'nav.portfolio', desktop: true },
  { to: '/case-studies', labelKey: 'nav.caseStudies', desktop: true, desktopSecondary: true },
  { to: '/additional-services', labelKey: 'nav.services', desktop: false },
  { to: '/policy', labelKey: 'nav.policy', desktop: false },
];

const DESKTOP_NAV_LINKS = NAV_LINKS.filter((link) => link.desktop !== false);

export default function Navbar({ onDownloadClick }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handlePricingClick = (source) => {
    closeMobileNav();
    onDownloadClick(source);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">N</span>
            <span>{t('brand.name', 'NovaTech')}</span>
          </Link>

          <div className="navbar-desktop">
            <div className="navbar-links">
              {DESKTOP_NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${location.pathname === link.to ? 'active' : ''} ${link.desktopSecondary ? 'desktop-secondary' : ''}`.trim()}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>

            <div className="navbar-controls">
              <LanguageSwitcher compact />
              <DarkModeToggle />
              <Link to="/instant-quote" className="btn btn-secondary btn-sm navbar-cta">
                {t('nav.instantQuote')}
              </Link>
              <Link to="/book-discovery-call" className="btn btn-secondary btn-sm navbar-cta navbar-cta-secondary">
                {t('nav.bookCall')}
              </Link>
              <button type="button" className="btn btn-primary btn-sm navbar-cta" onClick={() => handlePricingClick('navbar_desktop')}>
                {t('actions.pricingGuide')}
              </button>
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
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? 'active' : ''}
            onClick={closeMobileNav}
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <Link to="/instant-quote" className="btn btn-secondary" onClick={closeMobileNav}>
          {t('nav.instantQuote')}
        </Link>
        <Link to="/book-discovery-call" className="btn btn-secondary" onClick={closeMobileNav}>
          {t('nav.bookCall')}
        </Link>
        <button type="button" className="btn btn-primary" onClick={() => handlePricingClick('navbar_mobile')}>
          {t('actions.downloadPricingGuide')}
        </button>
      </nav>
    </>
  );
}
