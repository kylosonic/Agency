import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconGlyph from './IconGlyph';
import { useLanguage } from '../i18n/useLanguage';

const MotionDiv = motion.div;

export default function FloatingCTA({ onClick }) {
    const { t } = useLanguage();
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
                    initial={{ y: 150, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: 150, opacity: 0, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="floating-cta-container"
                >
                    <button type="button" className="floating-cta-btn" onClick={() => onClick('floating_cta')}>
                        <span className="icon" aria-hidden="true">
                            <IconGlyph name="download" size={16} />
                        </span>
                        {t('actions.pricingGuide')}
                    </button>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}
