import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import FloatingCTA from './components/FloatingCTA';
import LiveChatDock from './components/LiveChatDock';
import ScrollToTopButton from './components/ScrollToTopButton';
import SectionScrollbar from './components/SectionScrollbar';
import PageTransition from './components/PageTransition';
import { trackPageView, trackPricingGuideIntent } from './services/analyticsService';
import { setDocumentMetadata } from './services/seoService';
import { LanguageProvider } from './i18n/LanguageContext';
import { useLanguage } from './i18n/useLanguage';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import WorkflowAudit from './pages/WorkflowAudit';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import MobileDevelopmentPage from './pages/MobileDevelopmentPage';
import SaasSolutionsPage from './pages/SaasSolutionsPage';
import AdditionalServicesPage from './pages/AdditionalServicesPage';
import PolicyPage from './pages/PolicyPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import PortfolioPage from './pages/PortfolioPage';
import IndustryLandingPage from './pages/IndustryLandingPage';
import InstantQuotePage from './pages/InstantQuotePage';
import DiscoveryCallPage from './pages/DiscoveryCallPage';

const AUTO_LEAD_CAPTURE_ROUTES = new Set([
  '/',
  '/services',
  '/pricing',
  '/workflow-audit',
  '/web-development',
  '/mobile-development',
  '/saas-solutions',
  '/additional-services',
]);

const AUTO_LEAD_CAPTURE_MIN_VIEW_MS = 12000;
const AUTO_LEAD_CAPTURE_MIN_SCROLL_PX = 420;
const AUTO_LEAD_CAPTURE_MIN_SCROLL_DEPTH = 0.72;
const AUTO_LEAD_CAPTURE_SESSION_KEY = 'lead-capture-auto:shown';
const AUTO_LEAD_CAPTURE_LAST_SHOWN_KEY = 'lead-capture-auto:last-shown-at';
const AUTO_LEAD_CAPTURE_COOLDOWN_MS = 1000 * 60 * 60 * 10;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function getLeadCaptureVariant(pathname, trigger) {
  const normalized = pathname.toLowerCase();

  if (normalized.includes('workflow-audit') || normalized.includes('book-discovery-call')) {
    return 'book_call_offer';
  }

  if (normalized.includes('policy') && trigger === 'scroll') {
    return 'book_call_offer';
  }

  if (
    normalized.includes('services') ||
    normalized.includes('pricing') ||
    normalized.includes('web-development') ||
    normalized.includes('mobile-development') ||
    normalized.includes('saas-solutions') ||
    normalized.includes('additional-services') ||
    normalized.includes('portfolio') ||
    normalized.includes('industries')
  ) {
    return 'quote_offer';
  }

  return 'pricing_guide';
}

function isAutoLeadCaptureRoute(pathname) {
  return AUTO_LEAD_CAPTURE_ROUTES.has(pathname);
}

function hasAutoLeadCaptureCooldown() {
  if (typeof window === 'undefined') {
    return false;
  }

  const lastShownRaw = window.localStorage.getItem(AUTO_LEAD_CAPTURE_LAST_SHOWN_KEY);
  if (!lastShownRaw) {
    return false;
  }

  const lastShownAt = Number(lastShownRaw);
  if (!Number.isFinite(lastShownAt)) {
    return false;
  }

  return Date.now() - lastShownAt < AUTO_LEAD_CAPTURE_COOLDOWN_MS;
}

function markAutoLeadCaptureShown() {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.setItem(AUTO_LEAD_CAPTURE_SESSION_KEY, '1');
  window.localStorage.setItem(AUTO_LEAD_CAPTURE_LAST_SHOWN_KEY, String(Date.now()));
}

function hasFocusedFormField() {
  if (typeof document === 'undefined') {
    return false;
  }

  const active = document.activeElement;
  if (!active) {
    return false;
  }

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName);
}

function AppContent() {
  const { language } = useLanguage();
  const [leadCapture, setLeadCapture] = useState({
    isOpen: false,
    source: '',
    variant: 'pricing_guide',
    routePath: '/',
  });
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    setDocumentMetadata({
      pathname: location.pathname,
      language,
    });
  }, [location.pathname, language]);

  const openLeadCapture = useCallback((eventOrSource, options = {}) => {
    let source = `route:${location.pathname}`;
    let variant = options.variant || 'pricing_guide';

    if (typeof eventOrSource === 'string' && eventOrSource) {
      source = eventOrSource;
    }

    if (eventOrSource?.currentTarget?.dataset?.ctaSource) {
      source = eventOrSource.currentTarget.dataset.ctaSource;
    }

    if (eventOrSource?.currentTarget?.dataset?.ctaVariant) {
      variant = eventOrSource.currentTarget.dataset.ctaVariant;
    }

    if (options.trackIntent !== false) {
      trackPricingGuideIntent(source);
    }

    setLeadCapture({
      isOpen: true,
      source,
      variant,
      routePath: location.pathname,
    });
  }, [location.pathname]);

  const closeLeadCapture = () => {
    setLeadCapture((current) => ({
      ...current,
      isOpen: false,
    }));
  };

  useEffect(() => {
    if (!isAutoLeadCaptureRoute(location.pathname)) {
      return undefined;
    }

    if (sessionStorage.getItem(AUTO_LEAD_CAPTURE_SESSION_KEY) === '1') {
      return undefined;
    }

    if (hasAutoLeadCaptureCooldown()) {
      return undefined;
    }

    const exitKey = `lead-capture-exit:${location.pathname}`;
    const scrollKey = `lead-capture-scroll:${location.pathname}`;

    const hasExitFired = sessionStorage.getItem(exitKey) === '1';
    const hasScrollFired = sessionStorage.getItem(scrollKey) === '1';
    let exitTriggered = hasExitFired;
    let scrollTriggered = hasScrollFired;
    const pageOpenedAt = Date.now();

    const canUseExitIntent = window.matchMedia('(pointer:fine)').matches;

    const handleMouseOut = (event) => {
      if (!canUseExitIntent || exitTriggered || leadCapture.isOpen) {
        return;
      }

      if (Date.now() - pageOpenedAt < AUTO_LEAD_CAPTURE_MIN_VIEW_MS) {
        return;
      }

      if (window.scrollY < AUTO_LEAD_CAPTURE_MIN_SCROLL_PX || hasFocusedFormField()) {
        return;
      }

      if (event.clientY > 8 || event.relatedTarget || event.toElement) {
        return;
      }

      const variant = getLeadCaptureVariant(location.pathname, 'exit');
      exitTriggered = true;
      sessionStorage.setItem(exitKey, '1');
      markAutoLeadCaptureShown();
      openLeadCapture(`exit_intent:${location.pathname}`, {
        variant,
        trackIntent: true,
      });
    };

    const handleScroll = () => {
      if (scrollTriggered || leadCapture.isOpen) {
        return;
      }

      if (Date.now() - pageOpenedAt < AUTO_LEAD_CAPTURE_MIN_VIEW_MS) {
        return;
      }

      if (hasFocusedFormField()) {
        return;
      }

      const docHeight = Math.max(document.documentElement.scrollHeight, 1);
      const depth = (window.scrollY + window.innerHeight) / docHeight;

      if (depth < AUTO_LEAD_CAPTURE_MIN_SCROLL_DEPTH || window.scrollY < AUTO_LEAD_CAPTURE_MIN_SCROLL_PX) {
        return;
      }

      const variant = getLeadCaptureVariant(location.pathname, 'scroll');
      scrollTriggered = true;
      sessionStorage.setItem(scrollKey, '1');
      markAutoLeadCaptureShown();
      openLeadCapture(`scroll_depth:${location.pathname}`, {
        variant,
        trackIntent: true,
      });
    };

    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [leadCapture.isOpen, location.pathname, openLeadCapture]);

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" className="site-main">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/workflow-audit" element={<WorkflowAudit />} />
              <Route path="/web-development" element={<WebDevelopmentPage onDownloadClick={openLeadCapture} />} />
              <Route path="/mobile-development" element={<MobileDevelopmentPage onDownloadClick={openLeadCapture} />} />
              <Route path="/saas-solutions" element={<SaasSolutionsPage onDownloadClick={openLeadCapture} />} />
              <Route path="/additional-services" element={<AdditionalServicesPage onDownloadClick={openLeadCapture} />} />
              <Route path="/policy" element={<PolicyPage onDownloadClick={openLeadCapture} />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/industries/:industrySlug" element={<IndustryLandingPage onDownloadClick={openLeadCapture} />} />
              <Route path="/instant-quote" element={<InstantQuotePage />} />
              <Route path="/book-discovery-call" element={<DiscoveryCallPage />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingCTA onClick={openLeadCapture} />
      <LiveChatDock />
      <ScrollToTopButton />
      {location.pathname === '/' && <SectionScrollbar />}
      <LeadCaptureModal
        isOpen={leadCapture.isOpen}
        onClose={closeLeadCapture}
        source={leadCapture.source}
        variant={leadCapture.variant}
        routePath={leadCapture.routePath}
      />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
