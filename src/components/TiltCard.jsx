import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Create a motion version of react-router's Link
const MotionLink = motion.create(Link);

export default function TiltCard({ children, className = '', to, onClick }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const MotionComponent = to ? MotionLink : motion.div;
    const props = to ? { to } : { onClick };

    return (
        <MotionComponent
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                display: "block",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            {...props}
        >
            <div style={{ transform: "translateZ(20px)", height: "100%" }}>
                {children}
            </div>
        </MotionComponent>
    );
}
