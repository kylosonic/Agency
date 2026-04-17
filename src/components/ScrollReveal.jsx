import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;

export default function ScrollReveal({ children, className = '', stagger = false, delay = 0 }) {
    const [inView, setInView] = useState(false);
    // For elements marked as stagger, we will pass down stagger setup.
    // However, since children are often non-motion elements, we just wrap the container.
    // Framer motion allows staggering DOM children easily if we wrap them properly later.
    // For now, replacing the basic fade-up with a premium spring animation.

    const baseVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', damping: 25, stiffness: 80, delay, mass: 0.8 },
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

    // If it's stagger, we apply stagger variants, but to get children to animate, 
    // we would need immediate children to be <motion.div>s with variants. 
    // To remain backward compatible with existing CSS `.stagger-children > *`,
    // we use framer-motion to add the 'visible' class upon intersection.

    if (stagger) {
        return (
            <MotionDiv
                variants={staggerVariants}
                initial="hidden"
                whileInView="visible"
                onViewportEnter={() => setInView(true)}
                viewport={{ once: true, margin: "-50px" }}
                className={`${className} stagger-children ${inView ? 'visible' : ''}`}
            >
                {children}
            </MotionDiv>
        );
    }

    return (
        <MotionDiv
            variants={baseVariants}
            initial="hidden"
            whileInView="visible"
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, margin: "-50px" }}
            className={`${className} ${inView ? 'visible' : ''}`}
        >
            {children}
        </MotionDiv>
    );
}

