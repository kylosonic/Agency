export default function StaggeredText({ text, className = '', delay = 0 }) {
    return (
        <span className={`staggered-text ${className}`.trim()} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
            {text}
        </span>
    );
}
