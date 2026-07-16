import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/useLanguage';

export default function ScrollToTopButton() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible ? (
            <button
                type="button"
                onClick={scrollToTop}
                className="scroll-to-top-btn"
                aria-label={t('actions.scrollTop', 'Scroll to top')}
            >
                ↑
            </button>
        ) : null
    );
}
