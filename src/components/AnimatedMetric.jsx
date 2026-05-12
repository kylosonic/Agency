import { useEffect, useMemo, useRef, useState } from 'react';

export default function AnimatedMetric({
  value = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1300,
}) {
  const ref = useRef(null);
  const canObserve = typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined';
  const [isVisible, setIsVisible] = useState(!canObserve);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!canObserve || !ref.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [canObserve]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const startAt = performance.now();
    let rafId = 0;

    const tick = (now) => {
      const progress = Math.min((now - startAt) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayValue(value * eased);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [duration, isVisible, value]);

  const formattedValue = useMemo(() => {
    return Number(displayValue).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, [decimals, displayValue]);

  return (
    <span ref={ref} className="animated-metric" aria-live="polite">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
