import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;

/* M-6 (TECH-34): route changes fade the INCOMING page in over 250ms (200–300ms
   contract window) with a small rise (y 10 → 0); the exit keeps a small y but
   runs only 150ms so it never delays the next hero choreography (M-1). Calm
   cubic-bezier ease — no spring overshoot. `data-transition-duration` exposes
   the declared duration (ms) so the E2E gate can assert the contract value.
   First load renders with no transition (AnimatePresence initial={false} in
   App.jsx) — only the hero choreography runs. Under prefers-reduced-motion
   the swap is instant (duration 0, no movement) so content renders immediately
   (G-1); the same value is declared on the attribute for the E2E. */
const ENTER_DURATION_S = 0.25;
const EXIT_DURATION_S = 0.15;

export default function PageTransition({ children }) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <MotionDiv
            className="page-transition"
            data-transition-duration={prefersReducedMotion ? '0' : String(Math.round(ENTER_DURATION_S * 1000))}
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -6 }}
            transition={{
                duration: prefersReducedMotion ? 0 : ENTER_DURATION_S,
                exit: { duration: prefersReducedMotion ? 0 : EXIT_DURATION_S },
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </MotionDiv>
    );
}
