import { useState, useEffect } from 'react';
import IconGlyph from './IconGlyph';

export default function DarkModeToggle() {
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('novatech-theme');
            if (saved) return saved === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('novatech-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
            localStorage.setItem('novatech-theme', 'light');
        }
    }, [dark]);

    return (
        <button
            type="button"
            className="dark-mode-toggle"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
        >
            <span className={`toggle-icon ${dark ? 'moon' : 'sun'}`}>
                <IconGlyph name={dark ? 'sun' : 'moon'} size={16} />
            </span>
        </button>
    );
}
