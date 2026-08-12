import { useEffect, useRef, useState } from 'react';

/**
 * M-5 (TECH-33) — one slow editorial marquee per page (G-2: exactly one).
 *
 * · Speed ≤ 20 px/s: the track width is measured and the animation duration
 *   derived as `width / 18` seconds (18 px/s nominal, 24s floor) — declared
 *   on the track as `--marquee-duration` so the E2E can verify the speed.
 * · Seamless loop: the item set renders twice in two `.marquee-strip__group`
 *   containers; the track translates -50% on a linear infinite loop.
 * · Pause on hover: `.marquee-strip:hover .marquee-strip__track` sets
 *   animation-play-state: paused (CSS).
 * · Content is locked-table strings only (G-5 — figures come from the P-1 table).
 * · Reduced motion: the CSS freeze list kills the animation and hides the
 *   duplicated group, so the strip renders as a static single line (G-1).
 * · The duplicate group is aria-hidden so screen readers hear the set once.
 * · Placement: Home, directly after the MeterStrip (never duplicating its
 *   position — the meter stays a static printed readout, the marquee is the
 *   only moving strip, and no page carries both at the same spot).
 */
const NOMINAL_PX_PER_SEC = 18; // ≤ 20 px/s contract
const MIN_DURATION_S = 24;

export default function MarqueeStrip({ items = [], className = '' }) {
  const trackRef = useRef(null);
  const [duration, setDuration] = useState(MIN_DURATION_S);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    // scrollWidth covers both groups — one copy is half the track.
    const copyWidth = track.scrollWidth / 2;
    const derived = Math.max(MIN_DURATION_S, Math.ceil(copyWidth / NOMINAL_PX_PER_SEC));
    setDuration(derived);

    return undefined;
  }, [items]);

  return (
    <div className={`marquee-strip ${className}`.trim()}>
      <div
        className="marquee-strip__track"
        ref={trackRef}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="marquee-strip__group"
            aria-hidden={copyIndex === 1}
          >
            {items.map((item) => (
              <span key={item} className="marquee-strip__item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
