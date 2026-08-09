import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

/* B37 (TECH-20): staggered word reveal — flat rise only (y 10, no 3D tilt),
   spring damping 25 — no overshoot. Under prefers-reduced-motion the words
   render in their visible state immediately (static). */
export default function StaggeredText({ text, className = '', delay = 0 }) {
    const prefersReducedMotion = useReducedMotion();

    // Split text into words to animate them individually
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
                delayChildren: prefersReducedMotion ? 0 : delay,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', damping: 25, stiffness: 200 },
        },
    };

    return (
        <MotionDiv
            variants={containerVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`staggered-text ${className}`.trim()}
        >
            {words.map((word, index) => (
                <MotionSpan key={index} variants={wordVariants} className="staggered-text-word">
                    {word}
                </MotionSpan>
            ))}
        </MotionDiv>
    );
}
