import { useState, useEffect } from 'react';
import IconGlyph from './IconGlyph';
import { useLanguage } from '../i18n/useLanguage';

export default function DarkModeToggle() {
    const { t } = useLanguage();
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('novatech-theme');
            if (saved) return saved === 'dark';
            return true;
        }
        return true;
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
            aria-label={dark ? t('theme.switchLight', 'Switch to light mode') : t('theme.switchDark', 'Switch to dark mode')}
            title={dark ? t('theme.light', 'Light mode') : t('theme.dark', 'Dark mode')}
        >
            <span className={`toggle-icon ${dark ? 'moon' : 'sun'}`}>
                <IconGlyph name={dark ? 'sun' : 'moon'} size={16} />
            </span>
        </button>
    );
}
