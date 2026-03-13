export default function SectionHeader({ tag, title, subtitle, gradient = false }) {
    return (
        <div className="section-header">
            {tag && <div className="section-tag">✦ {tag}</div>}
            <h2 className={gradient ? 'gradient-text' : ''}>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}
