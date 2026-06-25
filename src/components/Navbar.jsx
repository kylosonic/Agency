import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconGlyph from './IconGlyph';
import LanguageSwitcher from './LanguageSwitcher';
import LogoMark from './LogoMark';
import { useLanguage } from '../i18n/useLanguage';

const PRIMARY_LINKS = [
  { to: '/workflow-audit', labelKey: 'nav.workflowAudit', fallback: 'Workflow Audit' },
  { to: '/pricing', labelKey: 'footer.links.pricing', fallback: 'Pricing' },
];

const SERVICE_LINKS = [
  { to: '/services', labelKey: 'nav.services', fallback: 'AI Solutions' },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const closeTimerRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!servicesRef.current?.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [servicesOpen]);

  useEffect(() => () => {
    window.clearTimeout(closeTimerRef.current);
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

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setServicesOpen(false);
      setMobileOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);

  const isWorkflowActive = WORKFLOW_ROUTES.has(location.pathname);
  const isServicesActive = SERVICE_LINKS.some((link) => location.pathname === link.to)
    || location.pathname.startsWith('/industries/');

  const primaryLinks = PRIMARY_LINKS.map((link) => ({
    ...link,
    label: t(link.labelKey, link.fallback),
  }));

  const serviceLinks = SERVICE_LINKS.map((link) => ({
    ...link,
    label: t(link.labelKey, link.fallback),
  }));

  const servicesLabel = t('nav.services', 'Services');
  const servicesMenuLabel = t('nav.servicesMenu', 'Services list');
  const workflowAuditLabel = t('nav.workflowAudit', 'Workflow Audit');

  const canUseHoverMenu = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  const clearServicesCloseTimer = () => {
    window.clearTimeout(closeTimerRef.current);
  };

  const openServicesMenu = ({ fromPointer = false } = {}) => {
    if (fromPointer && !canUseHoverMenu()) {
      return;
    }

    clearServicesCloseTimer();
    setServicesOpen(true);
  };

  const scheduleServicesClose = () => {
    clearServicesCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const toggleServicesMenu = (event) => {
    clearServicesCloseTimer();

    if (servicesOpen && canUseHoverMenu() && event.detail > 0) {
      return;
    }

    setServicesOpen((current) => !current);
  };

  const handleServicesBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      scheduleServicesClose();
    }
  };

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
            <LogoMark />
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
                className={`navbar-services ${servicesOpen ? 'open' : ''}`}
                ref={servicesRef}
                onPointerEnter={() => openServicesMenu({ fromPointer: true })}
                onPointerLeave={scheduleServicesClose}
                onFocus={() => openServicesMenu()}
                onBlur={handleServicesBlur}
              >
                <button
                  type="button"
                  className={`navbar-services-trigger ${isServicesActive ? 'active' : ''}`.trim()}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  aria-controls="navbar-services-menu"
                  onClick={toggleServicesMenu}
                >
                  {servicesLabel}
                  <IconGlyph name="chevronDown" size={13} strokeWidth={2} className="navbar-services-caret" />
                </button>

                <div
                  id="navbar-services-menu"
                  className="navbar-services-menu"
                  role="menu"
                  aria-label={servicesMenuLabel}
                >
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      role="menuitem"
                      className={location.pathname === link.to ? 'active' : ''}
                      onClick={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="navbar-controls">
              <LanguageSwitcher compact />
              <Link to="/workflow-audit" className="btn btn-primary btn-sm navbar-cta">
                {workflowAuditLabel}
              </Link>
            </div>
          </div>

          <div className="navbar-mobile-actions">
            <LanguageSwitcher compact />
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

        <div className="mobile-nav-group" aria-label={servicesMenuLabel}>
          <p className="mobile-nav-group-title">{servicesLabel}</p>
          {serviceLinks.map((link) => (
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
