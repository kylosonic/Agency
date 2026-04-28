import IconGlyph from './IconGlyph';

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
    ctaSource,
    onCtaClick,
}) {
    return (
        <div className={`pricing-card ${recommended ? 'recommended' : ''}`}>
            {recommended && <div className="pricing-badge">{badgeText}</div>}

            <div className="pricing-card-header">
                <div className="pricing-card-icon">
                    <IconGlyph name={icon} size={20} className="pricing-card-icon-svg" />
                </div>
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
                    <IconGlyph name="clock" size={14} className="pricing-timeline-icon" />
                    <span>{timeline}</span>
                </div>
            )}

            <ul className="pricing-features">
                {features.map((feature, i) => (
                    <li key={i}>
                        <span className="check" aria-hidden="true">
                            <IconGlyph name="check" size={14} />
                        </span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button type="button" className="btn btn-primary" onClick={() => onCtaClick?.(ctaSource)}>
                {ctaText}
            </button>
        </div>
    );
}
