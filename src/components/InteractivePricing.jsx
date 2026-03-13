import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from './PricingCard';

export default function InteractivePricing({ packages, onDownloadClick }) {
    return (
        <div className="pricing-grid">
            {packages.map((pkg, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                    <PricingCard
                        {...pkg}
                        onCtaClick={onDownloadClick}
                    />
                </motion.div>
            ))}
        </div>
    );
}
