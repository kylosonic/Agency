import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import IconGlyph from './IconGlyph';
import { useLanguage } from '../i18n/useLanguage';

const MotionDiv = motion.div;

export default function FloatingCTA() {
    const { t } = useLanguage();
    const prefersReducedMotion = useReducedMotion();
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const scrollingDown = currentScrollY > lastScrollY.current + 8;
            const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
            const hasScrolledEnough = currentScrollY > 320;

            setIsVisible(hasScrolledEnough && !scrollingDown && !isNearBottom);
            lastScrollY.current = currentScrollY;
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionDiv
                    /* B47 (TECH-28): entrance fade+rise gated — under reduced
                       motion the CTA renders at final state, duration 0. */
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="floating-cta-container"
                >
                    <Link to="/workflow-audit" className="floating-cta-btn">
                        <span className="icon" aria-hidden="true">
                            <IconGlyph name="search" size={16} />
                        </span>
                        {t('actions.bookWorkflowAudit', 'Book Workflow Audit')}
                    </Link>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
