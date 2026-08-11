/**
 * TECH-25 · B42 — one hand-built apparatus per marketing hero.
 *
 * Pure CSS + inline SVG. No <img>, no icon fonts, no external assets,
 * no glowing orb: the only radial accent is the flat diffuse emission
 * wash behind the art (--color-glow). The art itself is flat hairlines
 * and solid fills — no glow borders, no rings.
 *
 * type: 'topology' | 'filament' | 'dial'
 * callouts: 3–5 locked mono label strings (B42a), leader-lined.
 *
 * Motion: 3% intensity pulse on a 4s period (--dur-pulse). Never
 * rotates. prefers-reduced-motion users see it static at full intensity.
 *
 * Gradients: the filament chamber carries the single allowed gradient
 * (G4); topology and dial use none.
 */
import { useId } from 'react';

const DIAL_CX = 200;
const DIAL_CY = 192;
const DIAL_R = 118;

function polar(cx, cy, radius, deg) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}

/* Topology graph (Home — traverses the workflow): a circuit loop with
   a brass spine from entry to delivery. Flat 3px node dots — never
   orbs, no gradients. */
function TopologyArt() {
  return (
    <svg className="apparatus__svg" viewBox="0 0 400 340" role="presentation" focusable="false">
      <path
        d="M60 60 L340 60 L340 280 L60 280 Z"
        fill="none"
        stroke="var(--color-rule-2)"
        strokeWidth="1"
      />
      <path
        d="M60 60 L200 170 L340 280"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
      />
      <path
        d="M340 60 L200 170 L60 280"
        fill="none"
        stroke="var(--color-rule-2)"
        strokeWidth="1"
      />
      <circle cx="60" cy="60" r="3.5" fill="var(--color-accent)" />
      <circle cx="340" cy="60" r="3" fill="var(--color-ink-2)" />
      <circle cx="340" cy="280" r="3" fill="var(--color-ink-2)" />
      <circle cx="60" cy="280" r="3" fill="var(--color-ink-2)" />
      <circle cx="200" cy="170" r="3" fill="var(--color-ink)" />
    </svg>
  );
}

/* Filament chamber (Services/Web/Mobile/SaaS — produces output): a flat
   hairline chamber outline with a molten-brass zig-zag filament — the
   one allowed gradient in the system (G4). */
function FilamentArt({ gradientId }) {
  return (
    <svg className="apparatus__svg" viewBox="0 0 400 340" role="presentation" focusable="false">
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="340"
          x2="0"
          y2="60"
        >
          <stop className="apparatus__grad-stop-a" offset="0%" />
          <stop className="apparatus__grad-stop-b" offset="100%" />
        </linearGradient>
      </defs>
      {/* chamber glass — flat hairline outline, flat fill, no glow border */}
      <path
        d="M200 70 L312 118 L312 252 L88 252 L88 118 Z"
        fill="var(--color-paper-2)"
        fillOpacity="0.5"
        stroke="var(--color-rule-2)"
        strokeWidth="1"
      />
      {/* base cap + stem */}
      <rect x="178" y="252" width="44" height="10" fill="var(--color-ink-2)" />
      <rect x="170" y="262" width="60" height="6" fill="var(--color-rule-2)" />
      {/* filament zig-zag */}
      <path
        d="M200 246 L164 212 L236 180 L164 148 L236 116 L200 86"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Indicator dial (Workflow Audit — measures): an open 240° gauge arc
   (never a full ring), hairline ticks, a static brass needle. */
function DialArt() {
  const start = polar(DIAL_CX, DIAL_CY, DIAL_R, 150);
  const end = polar(DIAL_CX, DIAL_CY, DIAL_R, 30);
  const needleTip = polar(DIAL_CX, DIAL_CY, DIAL_R - 26, 96);
  const ticks = [];
  for (let deg = 150; deg >= 30; deg -= 20) {
    const inner = polar(DIAL_CX, DIAL_CY, DIAL_R - 12, deg);
    const outer = polar(DIAL_CX, DIAL_CY, DIAL_R, deg);
    ticks.push({ x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y, key: deg });
  }

  return (
    <svg className="apparatus__svg" viewBox="0 0 400 340" role="presentation" focusable="false">
      <path
        d={`M ${start.x} ${start.y} A ${DIAL_R} ${DIAL_R} 0 1 1 ${end.x} ${end.y}`}
        fill="none"
        stroke="var(--color-rule-2)"
        strokeWidth="1"
      />
      {ticks.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="var(--color-ink-3)"
          strokeWidth="1"
        />
      ))}
      {/* needle — brass, static, never rotates */}
      <line
        x1={DIAL_CX}
        y1={DIAL_CY}
        x2={needleTip.x}
        y2={needleTip.y}
        stroke="var(--color-accent)"
        strokeWidth="2"
      />
      <circle cx={DIAL_CX} cy={DIAL_CY} r="4" fill="var(--color-ink-2)" />
    </svg>
  );
}

const ART = {
  topology: TopologyArt,
  filament: FilamentArt,
  dial: DialArt,
};

export default function Apparatus({ type = 'topology', callouts = [], label }) {
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const Art = ART[type] || TopologyArt;

  return (
    <div className={`apparatus apparatus--${type}`} role="img" aria-label={label || `${type} apparatus`}>
      <div className="apparatus__wash" aria-hidden="true" />
      <div className="apparatus__art" aria-hidden="true">
        <Art gradientId={gradientId} />
      </div>
      <ul className="apparatus__callouts" aria-hidden="true">
        {callouts.map((callout) => (
          <li key={callout} className="callout">
            <span className="callout__leader" aria-hidden="true" />
            <span className="callout__text">{callout}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
