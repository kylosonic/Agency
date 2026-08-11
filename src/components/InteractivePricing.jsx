import { motion, useReducedMotion } from 'framer-motion';
import PricingCard from './PricingCard';

const MotionDiv = motion.div;

export default function InteractivePricing({ packages, onDownloadClick }) {
    /* B47 (TECH-29): same reduced-motion contract as the TECH-28 pass — under
       reduce the cards render static at full opacity with no stagger/delay. */
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="pricing-grid">
            {packages.map((pkg, index) => (
                <MotionDiv
                    key={index}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={prefersReducedMotion
                        ? { duration: 0, delay: 0 }
                        : { duration: 0.5, delay: index * 0.15 }}
                >
                    {/** Keep CTA source stable for analytics attribution. */}
                    <PricingCard
                        {...pkg}
                        ctaSource={pkg.ctaSource || `pricing_card_${index + 1}`}
                        onCtaClick={onDownloadClick}
                    />
                </MotionDiv>
            ))}
        </div>
    );
}
