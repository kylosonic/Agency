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
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [visible, setVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollTimerRef = useRef(null);
  const sectionPositionsRef = useRef([]);

  const refreshSectionPositions = useCallback(() => {
    const nextPositions = sections
      .map((section) => {
        const element = document.getElementById(section.id);

        if (!element) {
          return null;
        }

        return {
          id: section.id,
          top: element.getBoundingClientRect().top + window.scrollY,
        };
      })
      .filter(Boolean);

    sectionPositionsRef.current = nextPositions;

    if (!nextPositions.length) {
      setActiveSection('');
      setProgress(0);
      return;
    }

    setActiveSection((current) =>
      current && nextPositions.some((position) => position.id === current)
        ? current
        : nextPositions[0].id
    );
  }, [sections]);

  const updateActiveSectionFromScroll = useCallback(() => {
    const positions = sectionPositionsRef.current;

    if (!positions.length) {
      setActiveSection('');
      setProgress(0);
      return;
    }

    const currentScrollY = window.scrollY;
    const probeY = currentScrollY + window.innerHeight * 0.35;

    let nextActive = positions[0].id;
    for (const position of positions) {
      if (position.top <= probeY) {
        nextActive = position.id;
      } else {
        break;
      }
    }

    setActiveSection(nextActive);

    const firstTop = positions[0].top;
    const lastTop = positions[positions.length - 1].top;
    const span = Math.max(lastTop - firstTop, 1);
    const rawProgress = (probeY - firstTop) / span;
    const clampedProgress = Math.min(1, Math.max(0, rawProgress));
    setProgress(clampedProgress);
  }, []);

  useEffect(() => {
    const syncSections = () => {
      refreshSectionPositions();
      updateActiveSectionFromScroll();
    };

    const initialSyncRafId = window.requestAnimationFrame(syncSections);

    const delayedRefreshId = window.setTimeout(() => {
      window.requestAnimationFrame(syncSections);
    }, 350);

    const handleResize = () => {
      syncSections();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(initialSyncRafId);
      window.clearTimeout(delayedRefreshId);
      window.removeEventListener('resize', handleResize);
    };
  }, [refreshSectionPositions, updateActiveSectionFromScroll]);

  useEffect(() => {
    let initialScrollRafId = 0;

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
      updateActiveSectionFromScroll();

      setScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setScrolling(false), 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    initialScrollRafId = window.requestAnimationFrame(handleScroll);

    return () => {
      window.cancelAnimationFrame(initialScrollRafId);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [updateActiveSectionFromScroll]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarOffset = 92;
      const targetY = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, []);

  const progressHeight = activeSection
    ? `${Math.max(progress * 100, 6)}%`
    : '0%';

  return (
    <div className={`section-scrollbar ${visible ? 'visible' : ''} ${scrolling ? 'scrolling' : ''}`}>
      <div className="section-scrollbar-track">
        <div
          className="section-scrollbar-progress"
          style={{ height: progressHeight }}
        />
      </div>

      <div className="section-scrollbar-dots">
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            className={`section-scrollbar-dot ${
              activeSection === section.id ? 'active' : ''
            }`}
            onClick={() => scrollToSection(section.id)}
            onMouseEnter={() => setHoveredDot(section.id)}
            onMouseLeave={() => setHoveredDot(null)}
            aria-label={`Scroll to ${section.label}`}
            aria-current={activeSection === section.id ? 'location' : undefined}
            title={section.label}
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
