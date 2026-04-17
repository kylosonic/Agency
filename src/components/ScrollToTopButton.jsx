import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionButton = motion.button;

export default function ScrollToTopButton() {
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
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onClick={scrollToTop}
                    className="scroll-to-top-btn"
                    aria-label="Scroll to top"
                >
                    ↑
                </MotionButton>
            )}
        </AnimatePresence>
    );
}
