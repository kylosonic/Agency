import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const VIEWPORT_OPTIONS = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' };

export default function ScrollReveal({ children, className = '', stagger = false, delay = 0 }) {
    const [inView, setInView] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const isVisible = inView || prefersReducedMotion;

    const baseVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', damping: 25, stiffness: 80, delay, mass: 0.8 },
        },
    };

    const staggerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: delay,
            },
        },
    };

    if (stagger) {
        return (
            <MotionDiv
                variants={staggerVariants}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                onViewportEnter={() => setInView(true)}
                viewport={VIEWPORT_OPTIONS}
                className={`${className} stagger-children ${isVisible ? 'visible' : ''}`}
            >
                {children}
            </MotionDiv>
        );
    }

    return (
        <MotionDiv
            variants={baseVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            onViewportEnter={() => setInView(true)}
            viewport={VIEWPORT_OPTIONS}
            className={`${className} ${isVisible ? 'visible' : ''}`}
        >
            {children}
        </MotionDiv>
    );
}

