import { motion } from 'framer-motion';

export default function StaggeredText({ text, className = '', delay = 0 }) {
    // Split text into words to animate them individually
    const words = text.split(' ');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -20 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { type: 'spring', damping: 15, stiffness: 200 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
            style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
        >
            {words.map((word, index) => (
                <motion.span key={index} variants={wordVariants} style={{ display: 'inline-block' }}>
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
