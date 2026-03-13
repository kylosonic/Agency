import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCTA({ onClick }) {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show after scrolling down 300px
            if (currentScrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
            
            // Hide if near the very bottom (in case it overlaps the footer)
            const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
            if (isNearBottom) setIsVisible(false);

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 150, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: 150, opacity: 0, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="floating-cta-container"
                >
                    <button className="floating-cta-btn" onClick={onClick}>
                        <span className="icon">📄</span> Get Pricing Guide
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
