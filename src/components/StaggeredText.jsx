export default function StaggeredText({ text, className = '', delay = 0 }) {
    const content = typeof text === 'string' ? text.trim() : '';
    if (!content) {
        return null;
    }

    const words = content.split(/\s+/);
    const safeDelay = Number.isFinite(delay) && delay > 0 ? delay : 0;

    return (
        <span className={`staggered-text ${className}`.trim()} style={{ '--stagger-base-delay': `${safeDelay}s` }}>
            {words.map((word, index) => (
                <span key={`${word}-${index}`} className="staggered-text-word" style={{ '--stagger-index': index }}>
                    {word}
                </span>
            ))}
        </span>
    );
}
