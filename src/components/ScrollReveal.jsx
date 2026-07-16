import { useEffect, useRef, useState } from 'react';

const OBSERVER_OPTIONS = {
    threshold: 0.14,
    rootMargin: '0px 0px -12% 0px',
};

export default function ScrollReveal({ children, className = '', stagger = false, delay = 0 }) {
    const containerRef = useRef(null);
    const supportsObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;
    const [isVisible, setIsVisible] = useState(!supportsObserver);

    useEffect(() => {
        const node = containerRef.current;
        if (!node || !supportsObserver) {
            return;
        }

        let hasRevealed = false;
        const observer = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasRevealed) {
                    hasRevealed = true;
                    setIsVisible(true);
                    observer.disconnect();
                }
            });
        }, OBSERVER_OPTIONS);

        observer.observe(node);

        return () => observer.disconnect();
    }, [supportsObserver]);

    const safeDelay = Number.isFinite(delay) && delay > 0 ? delay : 0;
    const revealClass = stagger ? 'stagger-children' : 'fade-up';
    const classes = [revealClass, className, isVisible ? 'visible' : '']
        .filter(Boolean)
        .join(' ');

    return (
        <div ref={containerRef} className={classes} style={{ '--reveal-delay': `${safeDelay}s` }}>
            {children}
        </div>
    );
}

