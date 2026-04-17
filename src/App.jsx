import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTopButton from './components/ScrollToTopButton';
import SectionScrollbar from './components/SectionScrollbar';
import PageTransition from './components/PageTransition';
import { trackPageView, trackPricingGuideIntent } from './services/analyticsService';
import HomePage from './pages/HomePage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import MobileDevelopmentPage from './pages/MobileDevelopmentPage';
import SaasSolutionsPage from './pages/SaasSolutionsPage';
import AdditionalServicesPage from './pages/AdditionalServicesPage';
import PolicyPage from './pages/PolicyPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const openModal = (eventOrSource) => {
    let source = `route:${location.pathname}`;

    if (typeof eventOrSource === 'string' && eventOrSource) {
      source = eventOrSource;
    }

    if (eventOrSource?.currentTarget?.dataset?.ctaSource) {
      source = eventOrSource.currentTarget.dataset.ctaSource;
    }

    trackPricingGuideIntent(source);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar onDownloadClick={openModal} />
      <main id="main-content" className="site-main">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage onDownloadClick={openModal} />} />
              <Route path="/web-development" element={<WebDevelopmentPage onDownloadClick={openModal} />} />
              <Route path="/mobile-development" element={<MobileDevelopmentPage onDownloadClick={openModal} />} />
              <Route path="/saas-solutions" element={<SaasSolutionsPage onDownloadClick={openModal} />} />
              <Route path="/additional-services" element={<AdditionalServicesPage onDownloadClick={openModal} />} />
              <Route path="/policy" element={<PolicyPage onDownloadClick={openModal} />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingCTA onClick={openModal} />
      <ScrollToTopButton />
      {location.pathname === '/' && <SectionScrollbar />}
      <LeadCaptureModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
