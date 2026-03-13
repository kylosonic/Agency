export default function PricingCard({
    icon,
    title,
    subtitle,
    price,
    currency = 'ETB',
    period,
    timeline,
    features,
    recommended = false,
    badgeText = 'Recommended',
    ctaText = 'Get Started',
    onCtaClick,
}) {
    return (
        <div className={`pricing-card ${recommended ? 'recommended' : ''}`}>
            {recommended && <div className="pricing-badge">{badgeText}</div>}

            <div className="pricing-card-header">
                <div className="pricing-card-icon">{icon}</div>
                <h3>{title}</h3>
                {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>

            <div className="pricing-amount">
                <span className="currency">{currency} </span>
                {price}
                {period && <span className="period"> {period}</span>}
            </div>

            {timeline && (
                <div className="pricing-timeline">
                    ⏱ {timeline}
                </div>
            )}

            <ul className="pricing-features">
                {features.map((feature, i) => (
                    <li key={i}>
                        <span className="check">✓</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className="btn btn-primary" onClick={onCtaClick}>
                {ctaText}
            </button>
        </div>
    );
}
