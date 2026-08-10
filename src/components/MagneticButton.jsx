import { motion } from 'framer-motion';

const MotionButton = motion.button;

/**
 * TECH-27 (B47): NEUTRALISED — the pointer-follow / magnetic transform logic
 * is removed (B47 bans cursor followers). The component API is unchanged;
 * the button now offers a simple hover lift (translateY(-2px)) only.
 * Currently imported nowhere in the app — the file is kept neutralised.
 */
export default function MagneticButton({ children, className = '', onClick, ...props }) {
    return (
        <MotionButton
            type="button"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </MotionButton>
    );
}
