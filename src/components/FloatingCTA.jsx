import { useEffect, useRef, useState } from 'react';
import IconGlyph from './IconGlyph';
import { useLanguage } from '../i18n/useLanguage';

export default function FloatingCTA({ onClick }) {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const scrollingDown = currentScrollY > lastScrollY.current + 8;
            const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
            const hasScrolledEnough = currentScrollY > 320;

            setIsVisible(hasScrolledEnough && !scrollingDown && !isNearBottom);
            lastScrollY.current = currentScrollY;
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        isVisible ? (
            <div className="floating-cta-container">
                <button type="button" className="floating-cta-btn" onClick={() => onClick('floating_cta')}>
                    <span className="icon" aria-hidden="true">
                        <IconGlyph name="download" size={16} />
                    </span>
                    {t('actions.pricingGuide')}
                </button>
            </div>
        ) : null
    );
}
