import { useState, useEffect, useCallback, useRef } from 'react';

const DEFAULT_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'process', label: 'Process' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionScrollbar({ sections = DEFAULT_SECTIONS }) {
  const [activeSection, setActiveSection] = useState('');
  const [visible, setVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimerRef = useRef(null);

  // Show scrollbar after scrolling past hero + track scroll activity for mobile
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);

      // Mobile auto-hide: mark as scrolling, clear after 1.2s idle
      setScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setScrolling(false), 1200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observers = [];
    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (sectionEls.length === 0) return;

    sectionEls.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Find active index for the progress indicator
  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <div className={`section-scrollbar ${visible ? 'visible' : ''} ${scrolling ? 'scrolling' : ''}`}>
      <div className="section-scrollbar-track">
        {/* Progress line */}
        <div
          className="section-scrollbar-progress"
          style={{
            height:
              activeIndex >= 0
                ? `${(activeIndex / (sections.length - 1)) * 100}%`
                : '0%',
          }}
        />
      </div>

      <div className="section-scrollbar-dots">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`section-scrollbar-dot ${
              activeSection === section.id ? 'active' : ''
            }`}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredDot(section.id)}
            onMouseLeave={() => setHoveredDot(null)}
            aria-label={`Scroll to ${section.label}`}
          >
            <span className="section-scrollbar-dot-inner" />
            <span
              className={`section-scrollbar-label ${
                hoveredDot === section.id ? 'visible' : ''
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
