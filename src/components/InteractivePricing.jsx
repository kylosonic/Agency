import { motion } from 'framer-motion';
import PricingCard from './PricingCard';

const MotionDiv = motion.div;

export default function InteractivePricing({ packages, onDownloadClick }) {
    return (
        <div className="pricing-grid">
            {packages.map((pkg, index) => (
                <MotionDiv
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
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
