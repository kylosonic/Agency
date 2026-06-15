import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../i18n/useLanguage';
import logoMark from '../assets/logo-mark.png';

const PRIMARY_LINKS = [
  { to: '/services', labelKey: 'nav.services', fallback: 'AI Solutions' },
  { to: '/workflow-audit', labelKey: 'nav.workflowAudit', fallback: 'Workflow Audit' },
  { to: '/pricing', labelKey: 'footer.links.pricing', fallback: 'Pricing' },
];

const ENGINEERING_LINKS = [
  { to: '/web-development', labelKey: 'web.hero.title', fallback: 'Web Design & Development' },
  { to: '/mobile-development', labelKey: 'mobile.hero.title', fallback: 'Mobile App Development' },
  { to: '/saas-solutions', labelKey: 'saas.hero.title', fallback: 'SaaS Cloud Solutions' },
  { to: '/additional-services', labelKey: 'additional.hero.title', fallback: 'Additional Services' },
  { to: '/case-studies', labelKey: 'nav.caseStudies', fallback: 'Case Studies' },
  { to: '/portfolio', labelKey: 'nav.portfolio', fallback: 'Portfolio' },
];

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

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setEngineeringOpen(false);
      setMobileOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);

  const isWorkflowActive = WORKFLOW_ROUTES.has(location.pathname);
  const isEngineeringActive = ENGINEERING_LINKS.some((link) => location.pathname === link.to);

  const primaryLinks = PRIMARY_LINKS.map((link) => ({
    ...link,
    label: t(link.labelKey, link.fallback),
  }));

  const engineeringLinks = ENGINEERING_LINKS.map((link) => ({
    ...link,
    label: t(link.labelKey, link.fallback),
  }));

  const engineeringLabel = t('nav.engineering', 'Product Engineering');
  const workflowAuditLabel = t('nav.workflowAudit', 'Workflow Audit');

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
            <span className="logo-icon" aria-hidden="true">
              <img src={logoMark} alt="" loading="eager" decoding="async" />
            </span>
            <span>{t('brand.name', 'NovaTech AI')}</span>
          </Link>

          <div className="navbar-desktop">
            <div className="navbar-links">
              {primaryLinks.map((link) => (
                <Link
                  key={link.to}
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
                  aria-haspopup="menu"
                  aria-controls="navbar-engineering-menu"
                  onClick={() => setEngineeringOpen((current) => !current)}
                >
                  {engineeringLabel}
                  <span className="navbar-engineering-caret" aria-hidden="true">v</span>
                </button>

                <div
                  id="navbar-engineering-menu"
                  className="navbar-engineering-menu"
                  role="menu"
                  aria-label={t('nav.engineeringLinks', 'Product engineering links')}
                >
                  {engineeringLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      role="menuitem"
                      className={location.pathname === link.to ? 'active' : ''}
                      onClick={() => setEngineeringOpen(false)}
                    >
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
                {workflowAuditLabel}
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
        {primaryLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isPrimaryLinkActive(link.to) ? 'active' : ''}
            onClick={closeMobileNav}
          >
            {link.label}
          </Link>
        ))}

        <div className="mobile-nav-group" aria-label={t('nav.engineeringLinks', 'Product engineering links')}>
          <p className="mobile-nav-group-title">{engineeringLabel}</p>
          {engineeringLinks.map((link) => (
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
          {workflowAuditLabel}
        </Link>
      </nav>
    </>
  );
}
