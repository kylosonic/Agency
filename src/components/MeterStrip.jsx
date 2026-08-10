/**
 * TECH-25 · B45 — static meter strip under every marketing hero.
 *
 * A full-bleed 32–48px band: hairline top/bottom, 72 procedurally
 * varied vertical ticks (sine envelope + seeded mulberry32 jitter,
 * FIXED module seed — deterministic, never random per render), and
 * mono UPPERCASE end-labels (B45a locked strings, verbatim).
 *
 * The strip never animates — a printed readout. Reduced-motion users
 * see it unchanged (it never moves anyway).
 */

const TICK_COUNT = 72;
const SEED = 0x5eed1234; // fixed module constant — deterministic output

function mulberry32(seed) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTickHeights(count) {
  const rand = mulberry32(SEED);
  const heights = [];
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const envelope = Math.sin(Math.PI * t); // sine hump: low edges, tall centre
    const jitter = 0.72 + rand() * 0.56; // 0.72–1.28
    heights.push(Math.round(Math.min(34, Math.max(8, (12 + envelope * 22) * jitter))));
  }
  return heights;
}

const TICK_HEIGHTS = buildTickHeights(TICK_COUNT);

export default function MeterStrip({ labelLeft, labelRight }) {
  return (
    <div className="meter-strip">
      <div className="meter-strip__ticks" aria-hidden="true">
        {TICK_HEIGHTS.map((height, index) => (
          <span key={index} className="meter-strip__tick" style={{ height: `${height}px` }} />
        ))}
      </div>
      <span className="meter-strip__label meter-strip__label--left">{labelLeft}</span>
      <span className="meter-strip__label meter-strip__label--right">{labelRight}</span>
    </div>
  );
}
