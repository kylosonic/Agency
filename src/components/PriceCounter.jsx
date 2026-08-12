import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * M-4 (TECH-33) — animated price counter.
 *
 * · SINGLE figures (exactly one number in the string) count 0 → value over
 *   700ms (600–900ms window) with an ease-out curve when the figure enters
 *   the viewport; the counter fires ONCE (IntersectionObserver disconnects
 *   after the first intersect — no re-trigger on scroll).
 * · RANGES and multi-figure strings (e.g. "50,000 – 80,000 ETB") render
 *   static — resolution A4: single figures animate, ranges stay static.
 * · Lands exactly on the locked figure (G-5): the final formatted number is
 *   the original string's number, comma-grouped, with prefix/suffix intact.
 * · prefers-reduced-motion renders the final figure immediately — no count-up
 *   (G-1). The element carries no CSS animation, so the N9 freeze list only
 *   needs the opacity/typography guarantees.
 */
const COUNT_DURATION_MS = 700;

function parseFigure(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const numbers = value.match(/\d[\d,]*/g) ?? [];
  if (numbers.length !== 1) {
    return null; // ranges / multi-figure strings → static
  }

  // Ranges use en/em dashes or slashes — never animate those either.
  if (/[–—/]/.test(value)) {
    return null;
  }

  const raw = numbers[0];
  const numeric = Number(raw.replace(/,/g, ''));
  if (!Number.isFinite(numeric)) {
    return null;
  }

  return {
    numeric,
    prefix: value.slice(0, value.indexOf(raw)),
    suffix: value.slice(value.indexOf(raw) + raw.length),
  };
}

function formatFigure(figure, value) {
  return `${figure.prefix}${value.toLocaleString('en-US')}${figure.suffix}`;
}

export default function PriceCounter({ value, className = '' }) {
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef(null);
  // Stable identity: the count-up effect must not restart on re-render.
  const figure = useMemo(() => parseFigure(value), [value]);
  const [display, setDisplay] = useState(() => (figure && !prefersReducedMotion ? formatFigure(figure, 0) : value));

  useEffect(() => {
    if (!figure || prefersReducedMotion) {
      return undefined;
    }

    const element = elementRef.current;
    if (!element) {
      return undefined;
    }

    let animationFrameId = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }

      observer.disconnect();
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / COUNT_DURATION_MS);
        const eased = 1 - (1 - progress) ** 3; // ease-out cubic
        setDisplay(formatFigure(figure, Math.round(figure.numeric * eased)));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(tick);
        }
      };

      animationFrameId = requestAnimationFrame(tick);
    }, { threshold: 0.2 });

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [figure, prefersReducedMotion]);

  return (
    <span ref={elementRef} className={`price-counter ${className}`.trim()}>
      {display}
    </span>
  );
}
