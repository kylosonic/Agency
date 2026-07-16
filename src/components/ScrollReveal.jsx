export default function ScrollReveal({ children, className = '', stagger = false }) {
    const classes = [className, stagger ? 'stagger-children' : '', 'visible']
        .filter(Boolean)
        .join(' ');

    return <div className={classes}>{children}</div>;
}

