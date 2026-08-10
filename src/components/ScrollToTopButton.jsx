import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/useLanguage';

const MotionButton = motion.button;

export default function ScrollToTopButton() {
    const { t } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionButton
                    type="button"
                    /* B47 (TECH-28): entrance fade gated — under reduced motion
                       the button renders at final state, duration 0. */
                    initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={scrollToTop}
                    className="scroll-to-top-btn"
                    aria-label={t('actions.scrollTop', 'Scroll to top')}
                >
                    ↑
                </MotionButton>
            )}
        </AnimatePresence>
    );
}
