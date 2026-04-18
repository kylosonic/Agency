import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const MotionButton = motion.button;

export default function MagneticButton({ children, className = '', onClick, ...props }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [interactive, setInteractive] = useState(true);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    useEffect(() => {
        if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
            return undefined;
        }

        const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
        const handleMediaChange = () => {
            const canHover = mediaQuery.matches;
            setInteractive(canHover);
            if (!canHover) {
                x.set(0);
                y.set(0);
            }
        };

        handleMediaChange();

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleMediaChange);
            return () => mediaQuery.removeEventListener('change', handleMediaChange);
        }

        mediaQuery.addListener(handleMediaChange);
        return () => mediaQuery.removeListener(handleMediaChange);
    }, [x, y]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.2);
        y.set(middleY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <MotionButton
            ref={ref}
            type="button"
            style={interactive ? { x: mouseXSpring, y: mouseYSpring } : undefined}
            onMouseMove={interactive ? handleMouseMove : undefined}
            onMouseLeave={interactive ? handleMouseLeave : undefined}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </MotionButton>
    );
}
