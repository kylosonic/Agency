import PricingCard from './PricingCard';

export default function InteractivePricing({ packages, onDownloadClick }) {
    return (
        <div className="pricing-grid">
            {packages.map((pkg, index) => (
                <div key={index}>
                    {/** Keep CTA source stable for analytics attribution. */}
                    <PricingCard
                        {...pkg}
                        ctaSource={pkg.ctaSource || `pricing_card_${index + 1}`}
                        onCtaClick={onDownloadClick}
                    />
                </div>
            ))}
        </div>
    );
}
