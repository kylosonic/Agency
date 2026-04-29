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
import HomePage from './pages/HomePage';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function getLeadCaptureVariant(pathname, trigger) {
  const normalized = pathname.toLowerCase();

  if (normalized.includes('policy') && trigger === 'scroll') {
    return 'book_call_offer';
  }

  if (
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
    const exitKey = `lead-capture-exit:${location.pathname}`;
    const scrollKey = `lead-capture-scroll:${location.pathname}`;

    const hasExitFired = sessionStorage.getItem(exitKey) === '1';
    const hasScrollFired = sessionStorage.getItem(scrollKey) === '1';
    let exitTriggered = hasExitFired;
    let scrollTriggered = hasScrollFired;

    const canUseExitIntent = window.matchMedia('(pointer:fine)').matches;

    const handleMouseOut = (event) => {
      if (!canUseExitIntent || exitTriggered || leadCapture.isOpen) {
        return;
      }

      if (event.clientY > 8 || event.relatedTarget || event.toElement) {
        return;
      }

      const variant = getLeadCaptureVariant(location.pathname, 'exit');
      exitTriggered = true;
      sessionStorage.setItem(exitKey, '1');
      openLeadCapture(`exit_intent:${location.pathname}`, {
        variant,
        trackIntent: true,
      });
    };

    const handleScroll = () => {
      if (scrollTriggered || leadCapture.isOpen) {
        return;
      }

      const docHeight = Math.max(document.documentElement.scrollHeight, 1);
      const depth = (window.scrollY + window.innerHeight) / docHeight;

      if (depth < 0.65) {
        return;
      }

      const variant = getLeadCaptureVariant(location.pathname, 'scroll');
      scrollTriggered = true;
      sessionStorage.setItem(scrollKey, '1');
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
      <Navbar onDownloadClick={openLeadCapture} />
      <main id="main-content" className="site-main">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage onDownloadClick={openLeadCapture} />} />
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
