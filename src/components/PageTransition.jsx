import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;

/* B37 (TECH-20): one choreographed page-open reveal at ~0.55s with a modest
   fade-and-rise (y 12 → 0, exit y -8). Calm cubic-bezier ease — no spring
   overshoot. Under prefers-reduced-motion the reveal is fully static
   (duration 0, no movement) so content renders immediately (N8). */
export default function PageTransition({ children }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <MotionDiv
            className="page-transition"
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </MotionDiv>
    );
}
