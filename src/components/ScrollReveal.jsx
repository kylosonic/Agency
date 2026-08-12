import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const VIEWPORT_OPTIONS = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' };

export default function ScrollReveal({ children, className = '', stagger = false, delay = 0, static: isStatic = false }) {
    const [inView, setInView] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const isVisible = inView || prefersReducedMotion;

    /* TECH-29 (D2): form surfaces render statically — a plain div, no motion
       wrapper, no hidden initial state — so controls settle instantly. Form
       pages are function-first (design.md) and may be static; B47 calm motion
       stays intact on marketing surfaces. */
    if (isStatic) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }

    /* M-2 (TECH-33): gentle lift-and-fade on enter — hidden y 20 (16–24px
       window), tween 0.6s ease-out (500–700ms window), stagger 0.06 (60–100ms
       window). Fires ONCE per viewport entry (viewport.once), transform/opacity
       only (G-4 — no layout shift). Content already in the viewport on load
       reveals immediately and never re-animates. The reduced-motion branch
       renders everything visible with duration 0 (static page, G-1). */
    const baseVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: prefersReducedMotion
                ? { duration: 0 }
                : { type: 'tween', duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
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

