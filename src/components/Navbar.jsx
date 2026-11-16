import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconGlyph from './IconGlyph';
import LanguageSwitcher from './LanguageSwitcher';
import LogoMark from './LogoMark';
import { useLanguage } from '../i18n/useLanguage';

// TECH-19 (B34): five destinations — the Services dropdown trigger is rendered
// separately (`.navbar-services`), so PRIMARY_LINKS holds the four flat links.
const PRIMARY_LINKS = [
  { to: '/pricing', labelKey: 'footer.links.pricing', fallback: 'Pricing' },
  { to: '/instant-quote', labelKey: 'nav.instantQuote', fallback: 'Instant Quote' },
  { to: '/policy', labelKey: 'nav.policy', fallback: 'Policy' },
  { to: '/book-discovery-call', labelKey: 'nav.contact', fallback: 'Contact' },
];

// TECH-19 (B34): the single Services dropdown — exactly five destinations.
const SERVICE_LINKS = [
  { to: '/services', labelKey: 'nav.allServices', fallback: 'All Software Services' },
  { to: '/web-development', labelKey: 'nav.dropdownWeb', fallback: 'Web Development' },
  { to: '/mobile-development', labelKey: 'nav.dropdownMobile', fallback: 'Mobile App Development' },
  { to: '/saas-solutions', labelKey: 'nav.dropdownSaas', fallback: 'SaaS Development' },
  { to: '/additional-services', labelKey: 'nav.engineeringSupport', fallback: 'Engineering Support' },
];

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
  const servicesMenuLabel = t('nav.exploreMenu', 'Explore software development services');

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

  const isPrimaryLinkActive = (to) => location.pathname === to;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <LogoMark />
            <span>{t('brand.name', 'NovaTech')}</span>
          </Link>

          <div className="navbar-desktop">
            <div className="navbar-links">
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

              {primaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={isPrimaryLinkActive(link.to) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="navbar-controls">
              <LanguageSwitcher compact />
              {/* A7 (TECH-46): nav CTA → Start a Project → Home intake form. */}
              <Link to="/#project-intake" className="btn btn-primary btn-sm navbar-cta">
                {t('actions.startProject', 'Start a Project')}
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
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
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

        {/* A7 (TECH-46): mobile nav CTA → Start a Project → Home intake form. */}
        <Link to="/#project-intake" className="btn btn-primary" onClick={closeMobileNav}>
          {t('actions.startProject', 'Start a Project')}
        </Link>
      </nav>
    </>
  );
}
