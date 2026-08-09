import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const VIEWPORT_OPTIONS = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' };

export default function ScrollReveal({ children, className = '', stagger = false, delay = 0 }) {
    const [inView, setInView] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const isVisible = inView || prefersReducedMotion;

    /* B37 (TECH-20): gentle fade-and-rise — hidden y 12, tween 0.45s ease-out
       (no spring overshoot), stagger 0.06. The reduced-motion branch renders
       everything visible with duration 0 (static page). */
    const baseVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: prefersReducedMotion
                ? { duration: 0 }
                : { type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
        },
    };

    const staggerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.06,
                delayChildren: prefersReducedMotion ? 0 : delay,
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

