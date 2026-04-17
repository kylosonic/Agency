import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const MotionButton = motion.button;

export default function MagneticButton({ children, className = '', onClick, ...props }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

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
            style={{ x: mouseXSpring, y: mouseYSpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </MotionButton>
    );
}
