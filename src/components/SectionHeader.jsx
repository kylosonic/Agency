/**
 * Section header — B41 eyebrow system.
 *
 * The Phase 7 "tag" pill is gone (pills are CTA-only in Lumen Night). The
 * leading line now renders as a mono eyebrow in the `NN · ROLE` register:
 * mono, 11px, 0.10em tracking, muted ink, UPPERCASE via CSS (markup stays
 * sentence-case for a11y/SEO). Accepts an explicit `eyebrow` prop; falls
 * back to the legacy `tag` prop so untouched call sites keep working.
 */
export default function SectionHeader({ tag, eyebrow, title, subtitle, align = 'center' }) {
    const alignmentClass = align === 'left' ? '' : 'center';
    const eyebrowText = eyebrow || tag;

    return (
        <div className={`section-header ${alignmentClass}`.trim()}>
            {eyebrowText && <div className="eyebrow">{eyebrowText}</div>}
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}
