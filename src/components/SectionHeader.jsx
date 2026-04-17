export default function SectionHeader({ tag, title, subtitle, gradient = false, align = 'center' }) {
    const alignmentClass = align === 'left' ? '' : 'center';

    return (
        <div className={`section-header ${alignmentClass}`.trim()}>
            {tag && <div className="section-tag">✦ {tag}</div>}
            <h2 className={gradient ? 'gradient-text' : ''}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}
