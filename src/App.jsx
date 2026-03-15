import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTopButton from './components/ScrollToTopButton';
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <ScrollToTop />
      <Navbar onDownloadClick={openModal} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onDownloadClick={openModal} />} />
          <Route path="/web-development" element={<WebDevelopmentPage onDownloadClick={openModal} />} />
          <Route path="/mobile-development" element={<MobileDevelopmentPage onDownloadClick={openModal} />} />
          <Route path="/saas-solutions" element={<SaasSolutionsPage onDownloadClick={openModal} />} />
          <Route path="/additional-services" element={<AdditionalServicesPage onDownloadClick={openModal} />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA onClick={openModal} />
      <ScrollToTopButton />
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
